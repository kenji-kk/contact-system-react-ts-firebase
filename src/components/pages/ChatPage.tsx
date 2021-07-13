import React, { useEffect } from 'react'
import { useHistory } from 'react-router';
import { TextItems } from '../organisms/TextItems';
import { ContactInputField } from '../organisms/ContactInputField';
import { makeStyles } from '@material-ui/core'
import { useSelector } from "react-redux";
import { selectUser } from "./../../features/userSlice";

const useStyles = makeStyles({
    root: {
        display: 'grid',
        height: '100vh',
        gridTemplateRows: '1fr auto',
        margin: '10px',
    },
});

export const ChatPage:React.VFC = () => {
    const history = useHistory();
    const classes = useStyles();
    const user = useSelector(selectUser);

    useEffect(() => {
        if(user.staff !== false)
        history.push('/')
    },[])
    return (
        <>
            <div className={classes.root}>
                <TextItems />
                <ContactInputField />
            </div>
        </>
    )
}
