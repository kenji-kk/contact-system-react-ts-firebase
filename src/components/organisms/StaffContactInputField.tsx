import React,{ useState, useRef ,memo} from 'react'
import { makeStyles, Grid } from '@material-ui/core'
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { StaffMessageField } from '../atomos/forms/StaffMessageField';
import { StaffMessageSubmitButton } from '../atomos/buttons/StaffMessageSubmitButton';
import { auth } from "../../firebase";
import { useHistory } from 'react-router';
import { db } from "../../firebase";
import firebase from "firebase/app";
import { SignoutButton } from '../atomos/buttons/SignoutButton';


const useStyles = makeStyles({
    root: {
        gridRow:2,
        margin:'0 10px 10px 10px',
        paddingTop: '15px',
        backgroundColor: '#e0e0e0',
    },
    nameWrap: {
        backgroundColor: '#32abdc',
        display: 'inline-block',
        padding: '7px',
        borderRadius: '2px',
        color: 'white',
        marginLeft: '2vw'
    },
});

interface PROPS {
    id:any;
}

export const StaffContactInputField:React.VFC<PROPS> = memo(({id}) => {
    const inputEl = useRef(null);
    const classes = useStyles();
    const user = useSelector(selectUser);
    const [text, setText] = useState(""); 
    const history = useHistory();
    const newComment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        db.collection("comments").add({
          text: text,
          who: '問い合わせ対応スタッフ',
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          uid: id,
        });
        setText("");
      };

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={2}><div className={classes.nameWrap}>{user.staff ? "スタッフ入力フォーム" : "お客様入力フォーム" }</div></Grid>
                <Grid item xs={7}><StaffMessageField inputEl={inputEl} text={text} setText={setText} staff={user.staff} newComment={newComment}/></Grid>
                <Grid item xs={1}><StaffMessageSubmitButton inputEl={inputEl} text={text} setText={setText} staff={user.staff} newComment={newComment}/></Grid>
                <Grid item xs={2}><SignoutButton /></Grid>
            </Grid>
        </div>
    )
})
