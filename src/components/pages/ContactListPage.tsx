import React, {useState, useEffect}from 'react'
import {  auth, db } from "../../firebase";

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
    const [contacts, setContacts] = useState<CONTACT[]>([

    ]);

    useEffect(() => {
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
      }, []);
      
    return (
        <div>
            <p>お問い合わせ一覧ページです</p>
            {contacts[0]?.gid && (
                <>
                {contacts.map((contact) => (
                    <>
                    <p>ユーザーID：{contact.gid}</p>
                    <p>苗字：{contact.lastName}</p>
                    <p>名前：{contact.firstName}</p>
                    <p>お問い合わせ内容：{contact.content}</p>
                    <p>お問い合わせ日時：{new Date(contact.timestamp?.toDate()).toLocaleString()}</p>
                    <p>---------------------</p>
                    </>
                ))}
                </>
            )}
            <button onClick={async () => {
              await auth.signOut();
            }}>サインアウト</button>
        </div>
    )
}
