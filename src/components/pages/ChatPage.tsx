import React, { useEffect } from 'react'
import { auth } from "../../firebase";
import { useHistory } from 'react-router';

export const ChatPage:React.VFC = () => {
    const history = useHistory();

    useEffect(() => {
        history.push('/')
    },[])
    return (
        <div>
            <p>チャットページです</p>
            <button onClick={async () => {
              await auth.signOut();
              history.push('/');
            }}>サインアウト</button>
        </div>
    )
}
