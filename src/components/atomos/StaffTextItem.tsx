import React, { useEffect,useRef } from 'react'
import { makeStyles } from '@material-ui/core'
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import Typography from '@material-ui/core/Typography';
import {Person} from '@material-ui/icons';

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


export const StaffTextItem:React.VFC<any> = ({text, isLastItem}) => {
    const classes = useStyles();
    const ref:any = useRef(null);

    useEffect(() => {
        if(isLastItem){
            ref?.current?.scrollIntoView({ behavior: 'smooth' });
        }
    },[isLastItem]);

    return (
        <div>
             {text.who !== 'お客様' ? 
                          <TimelineItem >
                            <TimelineSeparator>
                              <Person style={{ color: '#00a968'}}/>
                              <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                              <Typography>
                                <div className={classes.flexWrap} ref={ref}>
                                  <div className={classes.lineWrap}>
                                    <div className={classes.line}></div>
                                  </div>
                                  <div className={classes.textWrap}>
                                    <div className={classes.borderWrap}>
                                      <div className={classes.rightName}>{text.who}</div>
                                      <div className={classes.content}>{text.text}</div>
                                    </div>
                                    <div className={classes.timelineWrap}>{text.timestamp?.toDate().toLocaleString()}</div>
                                  </div>
                                </div>
                                </Typography>
                            </TimelineContent>
                          </TimelineItem>
                         :
                         <TimelineItem>
                          <TimelineOppositeContent>
                            <Typography>
                                <div className={classes.flexWrapRight} ref={ref}>
                                  <div className={classes.textWrap}>
                                    <div className={classes.borderWrap}>
                                      <div className={classes.leftName}>{text.who}</div>
                                      <div className={classes.content}>{text.text}</div>
                                    </div>
                                    <div className={classes.timelineWrapLeft}>{text.timestamp?.toDate().toLocaleString()}</div>
                                  </div>
                                  <div className={classes.lineWrap}>
                                    <div className={classes.line}></div>
                                  </div>
                                </div>
                            </Typography>
                            
                          </TimelineOppositeContent>
                          <TimelineSeparator>
                            <Person style={{ color: '#32abdc'}}/>
                            <TimelineConnector />
                          </TimelineSeparator>
                          <TimelineContent>
                          </TimelineContent>
                        </TimelineItem>}
        </div>
    )
}
