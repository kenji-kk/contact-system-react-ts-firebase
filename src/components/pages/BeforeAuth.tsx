import React from 'react'
import { Route } from 'react-router-dom'
import { NewGuestPage } from './NewGuestPage'
import { NewStaffPage } from './NewStaffPage'
import { LoginGuestPage } from './LoginGuestPage'
import { LoginStaffPage } from './LoginStaffPage'

export const BeforAuth = () => {
    return (
        <>
            <Route exact path={'/'}>
                <NewGuestPage />
                <LoginGuestPage />
            </Route>
            <Route exact path={'/staff'}>
                <NewStaffPage />
                <LoginStaffPage />
            </Route>  
        </>
    )
}
