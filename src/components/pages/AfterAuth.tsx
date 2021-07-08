import React from 'react'
import { ChatPage } from './ChatPage'
import { ContactListPage } from './ContactListPage'
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

export const AfterAuth = () => {
    const user = useSelector(selectUser);
    return (
        <>
        {user.staff === true  ? (
            <ContactListPage />
        ) : (
            <ChatPage />
        )}
       </>
    )
}
