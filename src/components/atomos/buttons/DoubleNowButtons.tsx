import React from 'react'
import { useHistory } from 'react-router';
import { ButtonGroup, Button }  from '@material-ui/core';
import { useSelector } from "react-redux";
import { selectUser } from "./../../../features/userSlice";
import {  auth, db } from "../../../firebase";

interface PROPS {
    gid:string;
}

export const DoubleNowButtons:React.VFC<PROPS> = ({gid}) => {
    const user = useSelector(selectUser);
    const history = useHistory();

    const changeStateComplete = (state:string) => {
        const userData  = db.collection("users").doc(state);

        // Set the "capital" field of the city 'DC'
        return userData.update({
            state: '対応済み'
        })
        .then(() => {
            console.log("Document successfully updated!");
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }

    const changeStateInComplete = (state:string) => {
        const userData  = db.collection("users").doc(state);

        // Set the "capital" field of the city 'DC'
        return userData.update({
            state: '未対応'
        })
        .then(() => {
            console.log("Document successfully updated!");
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }

    return (
        <ButtonGroup variant="contained"  >
            <Button style={{ backgroundColor: '#FFD700'}} onClick={() => changeStateInComplete(gid)}>未対応</Button>
            <Button style={{ backgroundColor: '#CD853F'}} onClick={() => changeStateComplete(gid)}>対応済み</Button>
        </ButtonGroup>
    )
}
