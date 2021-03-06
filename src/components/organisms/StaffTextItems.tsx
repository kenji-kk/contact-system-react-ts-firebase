import React, {useEffect, useState, memo} from 'react'
import { makeStyles } from '@material-ui/core'
import { db } from "../../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "./../../features/userSlice";
import { useHistory } from 'react-router';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import Typography from '@material-ui/core/Typography';
import {Person} from '@material-ui/icons';
import { StaffTextItem } from '../atomos/StaffTextItem';

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
      backgroundColor: '#00a968',
      display: 'inline-block',
      padding: '7px',
      borderRadius: '2px',
      color: 'white',
      
    },
    leftName: {
      backgroundColor: '#32abdc',
      display: 'inline-block',
      padding: '7px',
      borderRadius: '2px',
      color: 'white',
      
    },
    content: {
      marginTop: '10px',
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
                        return <StaffTextItem key={index} text={text} isLastItem={isLastItem}/>
                    })}
                  </Timeline>
                </>
            )}
          </div>
    )
})
