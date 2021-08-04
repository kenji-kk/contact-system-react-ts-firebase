import React, { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  text: {
    fontSize: "3vw",
    textAlign: "center",
    marginTop: "300px",
  },
});

export const NoEffectLoadingPage: React.FC = memo(() => {
  const classes = useStyles();

  return <div className={classes.text}>Loading...</div>;
});
