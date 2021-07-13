import React,{ useState, useRef ,memo} from 'react'
import { makeStyles, Grid } from '@material-ui/core'
import { useSelector } from "react-redux";
import { selectUser } from "./../../features/userSlice";
import { MessageField } from '../atomos/forms/MessageField';
import { MessageSubmitButton } from '../atomos/buttons/MessageSubmitButton';
import { auth } from "../../firebase";
import { useHistory } from 'react-router';
import { db } from "../../firebase";
import firebase from "firebase/app";


const useStyles = makeStyles({
    root: {
        gridRow:2,
        margin:'26px',
    },
});

export const ContactInputField:React.VFC = memo(() => {
    const inputEl = useRef(null);
    const classes = useStyles();
    const user = useSelector(selectUser);
    const [text, setText] = useState(""); 
    const history = useHistory();
    const newComment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        db.collection("users").doc(user.uid).collection("comments").add({
          text: text,
          who: 'お客様',
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setText("");
      };

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={2}>{user.staff ? "スタッフ入力フォーム" : "お客様入力フォーム" }</Grid>
                <Grid item xs={8}><MessageField inputEl={inputEl} text={text} setText={setText} staff={user.staff} newComment={newComment}/></Grid>
                <Grid item xs={1}><MessageSubmitButton inputEl={inputEl} text={text} setText={setText} staff={user.staff} newComment={newComment}/></Grid>
                <Grid item xs={1}><button onClick={async () => {await auth.signOut();history.push('/');}}>サインアウト</button></Grid>
            </Grid>
        </div>
    )
})
