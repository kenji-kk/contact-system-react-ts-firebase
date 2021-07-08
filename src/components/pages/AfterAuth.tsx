import React from 'react'
import { ChatPage } from './ChatPage'
import { ContactListPage } from './ContactListPage'
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { Route } from 'react-router-dom'

export const AfterAuth = () => {
    const user = useSelector(selectUser);
    return (
        <>
        {user.staff === true  ? (
            <Route exact path={'/staff'}>
                <ContactListPage />
            </Route>
        ) : (
            <Route exact path={'/'}>
                <ChatPage />
            </Route>
            
        )}
       </>
    )
}
