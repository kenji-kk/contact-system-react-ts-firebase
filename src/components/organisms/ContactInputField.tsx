import React,{ useState } from 'react'
import { makeStyles, Grid } from '@material-ui/core'
import { useSelector } from "react-redux";
import { selectUser } from "./../../features/userSlice";
import { MessageField } from '../atomos/forms/MessageField';
import { MessageSubmitButton } from '../atomos/buttons/MessageSubmitButton';
import { auth } from "../../firebase";
import { useHistory } from 'react-router';


const useStyles = makeStyles({
    root: {
        gridRow:2,
        margin:'26px',
    },
});

export const ContactInputField:React.VFC = () => {
    const classes = useStyles();
    const user = useSelector(selectUser);
    const [text, setText] = useState(""); 
    const history = useHistory();

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={2}>{user.staff ? "スタッフ入力フォーム" : "お客様入力フォーム" }</Grid>
                <Grid item xs={8}><MessageField text={text} setText={setText} staff={user.staff}/></Grid>
                <Grid item xs={1}><MessageSubmitButton text={text} setText={setText} staff={user.staff}/></Grid>
                <Grid item xs={1}><button onClick={async () => {await auth.signOut();history.push('/');}}>サインアウト</button></Grid>
            </Grid>
        </div>
    )
}
