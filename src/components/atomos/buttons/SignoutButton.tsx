import React from 'react'
import { auth } from "./../../../firebase";
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';

export const SignoutButton = () => {
    const history = useHistory();
    
    return (
        <Button variant="contained" color="secondary"　
              onClick={async () => {
              await auth.signOut();
              history.push('/');
            }}>
                サインアウト
        </Button>
    )
}
