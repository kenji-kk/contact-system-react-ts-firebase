import React, { useEffect,useState, memo } from 'react'
import { useHistory } from 'react-router';
import { StaffTextItems } from '../organisms/StaffTextItems';
import { StaffContactInputField } from '../organisms/StaffContactInputField';
import { makeStyles } from '@material-ui/core'
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { useParams } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        display: 'grid',
        height: '100vh',
        gridTemplateRows: '1fr auto',
        backgroundColor: '#F2F2F2',
        
    },
});

export const StaffChatPage:React.VFC = memo(() => {
    const history = useHistory();
    const classes = useStyles();
    const user = useSelector(selectUser);
    const  { id }  = useParams<any>();

    useEffect(() => {
        if(user.staff !== true)
        history.push('/staff')
    },[user.uid])
    return (
        <>
            <div className={classes.root}>
                <StaffTextItems id={id}/>
                <StaffContactInputField id={id}/>
            </div>
        </>
    )
})
