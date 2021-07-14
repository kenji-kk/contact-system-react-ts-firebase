import React, {useEffect, useState, memo} from 'react'
import { makeStyles } from '@material-ui/core'
import { db } from "../../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "./../../features/userSlice";
import { useHistory } from 'react-router';

const useStyles = makeStyles({
    root: {
        gridRow:1,
        overflow:'auto',
    },
});

interface PROPS {
    id:any;
}

interface TEXT {
    who: string;
    text:string;
    timestamp:any;
}

export const StaffTextItems:React.VFC<PROPS> = memo(({id}) => {
    const classes = useStyles();
    const user = useSelector(selectUser);
    const [texts, setTexts] = useState<TEXT[]>([])
    const history = useHistory();

    useEffect(() => {
        const unSub = db
          .collection("comments")
          .where("uid", "==", id)
          .orderBy("timestamp", "desc")
          .onSnapshot((snapshot) => {
            setTexts(
              snapshot.docs.map((doc) => ({
                who: doc.data().who,
                text: doc.data().text,
                timestamp: doc.data().timestamp,
              }))
            );
          });
    
        return () => {
          unSub();
        };
      }, [user.uid]);

    return (
        <div className={classes.root}>
            {texts[0]?.who && (
                <>
                {texts.map((text,index) => (
                    <div key={index}>
                        <p>{text.who}:　　{text.text}　　{new Date(text.timestamp?.toDate()).toLocaleString()}</p>
                        <p>-----------------------------------------------------------------------</p>
                    </div>
                ))}
                </>
            )}
        </div>
    )
})