import React from 'react'
import {  auth } from "../../firebase";

export const ContactListPage = () => {
    return (
        <div>
            <p>お問い合わせ一覧ページです</p>
            <button onClick={async () => {
              await auth.signOut();
            }}>サインアウト</button>
        </div>
    )
}
