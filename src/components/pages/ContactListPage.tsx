import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { selectUser } from "./../../features/userSlice";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { ButtonGroup } from "@material-ui/core";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import MailIcon from "@material-ui/icons/Mail";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { SignoutButton } from "../atomos/buttons/SignoutButton";
import { StateChangeBackBackButtons } from "../atomos/buttons/StateChangeBackButtons";
import { DoubleInCompleteButtons } from "../atomos/buttons/DoubleInCompleteButtons";
import { Loading } from "./Loading";
import { NoEffectLoadingPage } from "./NoEffectLoadingPage";

interface CONTACT {
  gid: string;
  lastName: string;
  firstName: string;
  email: string;
  tel: string;
  productType: string;
  staff: boolean;
  timestamp: any;
  content: string;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  head: {
    fontWeight: "bold",
  },
  link: {
    textDecoration: "none",
    color: "blue",
  },
  headerWrap: {
    textAlign: "center",
  },
  title: {
    fontSize: "2vw",
    fontWeight: "bold",
    backgroundColor: "#FFD700",
    padding: "10px 0",
  },
  buttonWrap: {
    textAlign: "right",
  },
}));

export const ContactListPage: React.VFC = () => {
  const user = useSelector(selectUser);
  const classes = useStyles();
  const [contacts, setContacts] = useState<CONTACT[]>([]);
  const history = useHistory();

  useEffect(() => {
    if (!user.staff) {
      history.goBack();
    } else {
      const unSub = db
        .collection("users")
        .where("staff", "==", false)
        .where("state", "==", "?????????")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setContacts(
            snapshot.docs.map((doc) => ({
              gid: doc.id,
              lastName: doc.data().lastName,
              firstName: doc.data().firstName,
              email: doc.data().email,
              tel: doc.data().tel,
              productType: doc.data().productType,
              staff: doc.data().staff,
              timestamp: doc.data().timestamp,
              content: doc.data().content,
            }))
          )
        );
      return () => {
        unSub();
      };
    }
  }, []);
  if (!user.staff) {
    return <NoEffectLoadingPage />;
  }

  return (
    <div>
      <div className={classes.headerWrap}>
        <p className={classes.title}>???????????????????????????????????????(?????????)</p>
        <StateChangeBackBackButtons />
        <div className={classes.buttonWrap}>
          <SignoutButton />
        </div>
      </div>
      <hr />
      <Timeline align="alternate">
        {contacts[0]?.gid && (
          <>
            {contacts.map((contact, index) => (
              <TimelineItem>
                <TimelineOppositeContent>
                  <Typography variant="body2" color="textSecondary">
                    {(index + 1) % 2 == 1
                      ? new Date(contact.timestamp?.toDate()).toLocaleString() +
                        "???"
                      : "???" +
                        new Date(contact.timestamp?.toDate()).toLocaleString()}
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="primary">
                    <MailIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Paper elevation={3} className={classes.paper}>
                    <Typography variant="h6" component="h1">
                      <p className={classes.head}>
                        {index + 1}????????????????????????
                      </p>
                    </Typography>
                    <Typography>
                      ????????? {contact.lastName}
                      {contact.firstName}
                    </Typography>
                    <Typography>??????????????? {contact.tel}</Typography>
                    <Typography>????????????: {contact.productType}</Typography>
                    <Typography>?????????????????????: {contact.content}</Typography>
                    <Typography>???</Typography>
                    <Typography>
                      <DoubleInCompleteButtons gid={contact.gid} />
                    </Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            ))}
          </>
        )}
      </Timeline>
    </div>
  );
};
