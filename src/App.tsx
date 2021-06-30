import React from 'react';
import logo from './logo.svg';
import './App.css';
import { NewGuestPage } from './components/pages/NewGuestPage';
import { LoginGuestPage } from './components/pages/LoginGuestPage';

function App() {
  return (
    <>
      <NewGuestPage />
      <LoginGuestPage />
    </>
  );
}

export default App;
