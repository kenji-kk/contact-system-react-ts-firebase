import React, { useState } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { auth, db } from "../../firebase";
import firebase from "firebase/app";


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/kenji-kk/">
        筧圭吾
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export function NewStaffPage() {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("");

  const signUpEmail = async () => {
    const authUser = await auth.createUserWithEmailAndPassword(email, password);
    await db.collection("Users").add({
      uid:authUser.user?.uid,
      email: email,
      password:password,
      staff:true,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            スタッフ用新規アカウント登録
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="staffEmail"
                  label="メールアドレス"
                  name="email"
                  autoComplete="email"
                  inputProps={{
                    maxLength: 200,
                  }}
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value);
                  }
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="パスワード"
                  type="password"
                  id="staffPassword"
                  autoComplete="current-password"
                  inputProps={{
                    maxLength: 30,
                  }}
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.target.value);
                  }
                  }
                />
              </Grid>
            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={
                async () =>{
                  try {
                    await signUpEmail();
                  } catch (err) {
                    alert(err.message);
                  }
                }
              }
            >
              登録
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  既にアカウントをお持ちの方はこちら
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
  );
}