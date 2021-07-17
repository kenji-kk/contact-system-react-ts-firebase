import React from 'react'
import { useHistory } from 'react-router';
import { ButtonGroup, Button }  from '@material-ui/core';

export const StateChangeBackBackButtons = () => {
    const history = useHistory();

    return (
        <ButtonGroup variant="contained"  >
            <Button style={{ backgroundColor: '#FFD700'}} onClick={() => {history.push('/contactList')}}>未対応</Button>
            <Button style={{ backgroundColor: '#9ACD32'}} onClick={() => {history.push('/contactListNow')}}>対応中</Button>
            <Button style={{ backgroundColor: '#CD853F'}} onClick={() => {history.push('/contactListComplete')}}>対応済み</Button>
        </ButtonGroup>
    )
}
