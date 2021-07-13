import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    root: {
        gridRow:1,
    },
});

export const ContactItems = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            
        </div>
    )
}
