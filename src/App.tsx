import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "./features/userSlice";
import { auth } from "./firebase";
import { db } from "./firebase";
import './App.css';
import { Route, useHistory } from 'react-router';
import { ChatPage } from "./components/pages/ChatPage";
import { ContactListPage } from "./components/pages/ContactListPage";
import { NewGuestPage } from "./components/pages/NewGuestPage";
import { LoginGuestPage } from "./components/pages/LoginGuestPage";
import { NewStaffPage } from "./components/pages/NewStaffPage";
import { LoginStaffPage } from "./components/pages/LoginStaffPage";
import { StaffChatPage } from "./components/pages/StaffChatPage";
import { ContactListNowPage } from "./components/pages/ContactListNowPage";
import { ContactListCompletePage } from "./components/pages/ContactListCompletePage";


export const App: React.VFC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const historyContact = () => {
    history.push('/contactList');
  }
  const historyChat = () => {
    history.push('/chat');
  }
  
  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      
      if (authUser) {
        const docRef = db.collection("users").doc(authUser?.uid);

        docRef.get().then(function(doc) {
            if (doc.exists) {
              dispatch(
                login({
                  uid: doc.data()?.uid,
                  lastName: doc.data()?.lastName,
                  firstName: doc.data()?.firstName, 
                  email: doc.data()?.email, 
                  tel: doc.data()?.tel, 
                  productType: doc.data()?.productType, 
                  staff: doc.data()?.staff, 
                  timestamp: doc.data()?.timestamp, 
                  content: doc.data()?.content,
                })
              );
              if (doc.data()?.staff){
                historyContact();
              } else if (!doc.data()?.staff){
                historyChat();
              } 
            } else {
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
      } else {
        dispatch(logout());
      }
    });
    return () => {
      unSub();
    };
  }, [dispatch]);

  return (
    <>
        <Route exact path={'/'}>
          <NewGuestPage />
          <LoginGuestPage />
        </Route>
        <Route exact path={'/chat'}>
          <ChatPage />
        </Route>
        <Route exact path={'/staffChat/:id'}>
          <StaffChatPage />
        </Route>
        <Route exact path={'/contactList'}>
          <ContactListPage />
        </Route>
        <Route exact path={'/contactListNow'}>
          <ContactListNowPage />
        </Route>
        <Route exact path={'/contactListComplete'}>
          <ContactListCompletePage />
        </Route>
        <Route exact path={'/staff'}>
          <NewStaffPage />
          <LoginStaffPage />
        </Route>
    </>
  )
}

