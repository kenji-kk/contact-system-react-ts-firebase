import './App.css';
import { NewGuestPage } from './components/pages/NewGuestPage';
import { LoginGuestPage } from './components/pages/LoginGuestPage';
import { LoginStaffPage } from './components/pages/LoginStaffPage'
import { NewStaffPage } from './components/pages/NewStaffPage';

function App() {
  return (
    <>
      <NewGuestPage />
      <LoginGuestPage />
      <NewStaffPage />
      <LoginStaffPage />
    </>
  );
}

export default App;
