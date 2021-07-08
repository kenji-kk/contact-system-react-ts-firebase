import React from 'react'
import {  auth } from "../../firebase";

export const ChatPage = () => {
    return (
        <div>
            <p>チャットページです</p>
            <button onClick={async () => {
              await auth.signOut();
            }}>サインアウト</button>
        </div>
    )
}
