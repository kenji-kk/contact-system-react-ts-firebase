import React from 'react'
import { NewGuestPage } from './NewGuestPage'
import { NewStaffPage } from './NewStaffPage'

export const BeforAuth = () => {
    return (
        <>
            <NewGuestPage />
            <NewStaffPage />
        </>
    )
}
