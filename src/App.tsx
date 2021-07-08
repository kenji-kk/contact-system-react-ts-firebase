import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "./features/userSlice";
import { auth } from "./firebase";
import { db } from "./firebase";
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Switch } from 'react-router';
import { AfterAuth } from "./components/pages/AfterAuth";
import { BeforAuth } from "./components/pages/BeforeAuth";


export const App: React.VFC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      
      if (authUser) {
        var docRef = db.collection("users").doc(authUser?.uid);

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
    <BrowserRouter>
      <Switch>
      {user.uid  ? (
        <AfterAuth />
      ) : (
        <BeforAuth />
      )}
      </Switch>
    </BrowserRouter>
    </>
  )
}

