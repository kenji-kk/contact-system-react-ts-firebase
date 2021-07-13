import React from 'react'
import { makeStyles, Grid } from '@material-ui/core'
import { useSelector } from "react-redux";
import { selectUser } from "./../../features/userSlice";

const useStyles = makeStyles({
    root: {
        gridRow:2,
        margin:'26px',
    },
});

export const ContactInputField = () => {
    const classes = useStyles();
    const user = useSelector(selectUser);

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid xs={4}>{user.staff ? "スタッフ入力フォーム" : "お客様入力フォーム" }</Grid>
                <Grid xs={7}></Grid>
                <Grid xs={1}></Grid>
            </Grid>
        </div>
    )
}
