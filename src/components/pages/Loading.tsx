import React, { memo, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { auth } from "./../../firebase";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { selectUser } from "./../../features/userSlice";

const useStyles = makeStyles({
  text: {
    fontSize: "3vw",
    textAlign: "center",
    marginTop: "300px",
  },
});

export const Loading: React.FC = memo(() => {
  const user = useSelector(selectUser);
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    if (!auth.currentUser) {
      history.push("/");
    } else if (user.staff) {
      history.push("/contactList");
    } else if (!user.staff) {
      history.push("/chat");
    }
  }, []);

  return <div className={classes.text}>Loading...</div>;
});
