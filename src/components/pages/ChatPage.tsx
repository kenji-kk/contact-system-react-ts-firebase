import React, { useEffect,useState, memo } from 'react'
import { useHistory } from 'react-router';
import { TextItems } from '../organisms/TextItems';
import { ContactInputField } from '../organisms/ContactInputField';
import { makeStyles } from '@material-ui/core'
import { useSelector } from "react-redux";
import { selectUser } from "./../../features/userSlice";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'grid',
        height: '100vh',
        gridTemplateRows: '1fr auto',
        backgroundColor: '#F2F2F2',
        
    },
}));

export const ChatPage:React.VFC = memo(() => {
    const history = useHistory();
    const classes = useStyles();
    const user = useSelector(selectUser);

    useEffect(() => {
        if(user.staff !== false)
        history.push('/')
    },[user.uid])
    return (
        <>
            <div className={classes.root}>
                <TextItems />
                <ContactInputField />
            </div>
        </>
    )
})
