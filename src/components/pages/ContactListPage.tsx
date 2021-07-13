import React, {useState, useEffect}from 'react'
import {  auth, db } from "../../firebase";
import { useHistory } from 'react-router';
import { useSelector } from "react-redux";
import { selectUser } from "./../../features/userSlice";
import { Link } from 'react-router-dom'

interface CONTACT  {
    gid: string;
    lastName: string; 
    firstName: string; 
    email: string; 
    tel: string;
    productType: string;
    staff: boolean; 
    timestamp: any; 
    content: string; 
}

export const ContactListPage: React.VFC = () => {
    const user = useSelector(selectUser);
    const [contacts, setContacts] = useState<CONTACT[]>([
    ]);
    const history = useHistory();
    if(user.staff){
        
    }
    useEffect(() => {
        if(!user.staff){
            history.push('/staff');
        }else{
            const unSub = db
            .collection("users")
            .where("staff", "==", false)
            .orderBy("timestamp", "asc")
            .onSnapshot((snapshot) =>
                setContacts(
                snapshot.docs.map((doc) => (
                    {
                    gid: doc.id,
                    lastName: doc.data().lastName,
                    firstName: doc.data().firstName, 
                    email: doc.data().email, 
                    tel: doc.data().tel,
                    productType: doc.data().productType,
                    staff: doc.data().staff, 
                    timestamp: doc.data().timestamp, 
                    content: doc.data().content, 
                }))
                )
            );
            return () => {
            unSub();
            };
        }
      }, []);
      
    return (
        <div>
            <p>お問い合わせ一覧ページです</p>
            {contacts[0]?.gid && (
                <>
                {contacts.map((contact) => (
                    <div key={contact.gid}>
                        <p>ユーザーID：{contact.gid}</p>
                        <p>苗字：{contact.lastName}</p>
                        <p>名前：{contact.firstName}</p>
                        <p>お問い合わせ内容：{contact.content}</p>
                        <p>お問い合わせ日時：{new Date(contact.timestamp?.toDate()).toLocaleString()}</p>
                        <Link to={"/staffChat/" + contact.gid}>チャットページへ</Link>
                        <p>---------------------</p>
                    </div>
                ))}
                </>
            )}
            <button onClick={async () => {
              await auth.signOut();
              history.push('/staff');
            }}>サインアウト</button>
        </div>
    )
}
