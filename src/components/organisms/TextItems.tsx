import React, {useEffect, useState, memo} from 'react'
import { makeStyles } from '@material-ui/core'
import { db } from "../../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "./../../features/userSlice";
import { useHistory } from 'react-router';
import Timeline from '@material-ui/lab/Timeline';

import { TextItem } from '../atomos/TextItem';


const useStyles = makeStyles({
    root: {
        gridRow:1,
        overflow:'auto',
    },
    lineWrap: {
      
    },
    textWrap: {
      textAlign: 'left',
    },
    line: {
      height: '2px',
      width: '10vw',
      backgroundColor: 'gray',
      display: 'inline-block',
    },
    flexWrap: {
      display: 'flex',
    },
    flexWrapRight: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    timelineWrap: {
      textAlign: 'right',
    },
    timelineWrapLeft: {
      textAlign: 'left',
    },
    borderWrap: {
      border: 'solid 2px gray',
      padding: '15px',
      borderRadius: '10px'
    },
    rightName: {
      backgroundColor: '#32abdc',
      display: 'inline-block',
      padding: '7px',
      borderRadius: '2px',
      color: 'white',
      
    },
    leftName: {
      backgroundColor: '#00a968',
      display: 'inline-block',
      padding: '7px',
      borderRadius: '2px',
      color: 'white',
      
    },
    content: {
      marginTop: '10px',
    },
});

interface TEXT {
    who: string;
    text:string;
    timestamp:any;
}

export const TextItems:React.VFC = memo(() => {
    const classes = useStyles();
    const user = useSelector(selectUser);
    const [texts, setTexts] = useState<TEXT[]>([])
    const history = useHistory();

    useEffect(() => {
        const unSub = db
          .collection("comments")
          .where("uid", "==", user.uid)
          .orderBy("timestamp", "asc")
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

      const length = texts.length;

    return (
        <div className={classes.root}>
           {texts[0]?.who && (
                <>
                  <Timeline align="left">
                    {texts.map((text,index) => {
                       const isLastItem = length === index + 1;
                        return <TextItem key={index} text={text} isLastItem={isLastItem}/>
                    })}
                  </Timeline>
                </>
            )}
          </div>
    )
})
