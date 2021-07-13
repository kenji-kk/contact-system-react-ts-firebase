import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    root: {
        gridRow:2,
    },
});

export const ContactInputField = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            
        </div>
    )
}
