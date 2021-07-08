import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "./features/userSlice";
import { auth } from "./firebase";
import { db } from "./firebase";
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Switch } from 'react-router';
import { NewGuestPage } from "./components/pages/NewGuestPage";


export const App: React.VFC = () => {

  const dispatch = useDispatch();
  

  return (
    <BrowserRouter>
      <Switch>
        <NewGuestPage />
      </Switch>
    </BrowserRouter>
  )
}

