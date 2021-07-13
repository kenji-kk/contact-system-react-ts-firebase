import React, { useEffect } from 'react'
import { auth } from "../../firebase";
import { useHistory } from 'react-router';
import { ContactItems } from '../organisms/ContactItems';
import { ContactInputField } from '../organisms/ContactInputField';
import { makeStyles } from '@material-ui/core'
import { useSelector } from "react-redux";
import { selectUser } from "./../../features/userSlice";

const useStyles = makeStyles({
    root: {
        display: 'grid',
        height: '100vh',
        gridTemplateRows: '1fr auto',
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
            <ContactItems />
            <ContactInputField />
        </div>
        <button onClick={async () => {
            await auth.signOut();
            history.push('/');
          }}>サインアウト</button>
        </>
    )
}
