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

import {ProductSelectButton} from '../atomos/buttons/ProductSelectButton';
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

export function NewGuestPage() {
  const classes = useStyles();

  const [lastName, setLastName] =useState("");
  const [firstName, setFirstName] =useState("");
  const [email, setEmail] =useState("");
  const [tel, setTel] =useState("");
  const [password, setPassword] =useState("");
  const [productType, setProductType] =useState("");
  const [content, setContent] =useState("");
  const signUpEmail = async () => {
    const authUser = await auth.createUserWithEmailAndPassword(email, password);
    await db.collection("users").doc(authUser.user?.uid).set({
      uid:authUser.user?.uid,
      lastName: lastName,
      firstName: firstName,
      email: email,
      tel:tel,
      password:password,
      productType:productType,
      content:content,
      staff:false,
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
            お問い合わせアカウント新規登録
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="姓"
                  name="lastName"
                  autoComplete="lname"
                  inputProps={{
                    maxLength: 8,
                  }}
                  value={lastName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setLastName(e.target.value);
                  }
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="名"
                  autoFocus
                  inputProps={{
                    maxLength: 8,
                  }}
                  value={firstName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFirstName(e.target.value);
                  }
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
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
                  id="tel"
                  label="電話番号"
                  name="tel"
                  autoComplete="tel"
                  inputProps={{
                    maxLength: 12,
                  }}
                  value={tel}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setTel(e.target.value);
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
                  id="password"
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
              <Grid item xs={12}>
                <ProductSelectButton productType={productType} setProductType={setProductType}/>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="content"
                  label="問い合わせ内容*"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  inputProps={{
                    maxLength: 2000,
                  }}
                  value={content}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setContent(e.target.value);
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
        <button onClick={async () => {
              await auth.signOut();
            }}>サインアウト</button>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
  );
}