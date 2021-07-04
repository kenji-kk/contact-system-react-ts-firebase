import './App.css';
import { NewGuestPage } from './components/pages/NewGuestPage';
import { LoginGuestPage } from './components/pages/LoginGuestPage';
import { LoginStaffPage } from './components/pages/LoginStaffPage'

function App() {
  return (
    <>
      <NewGuestPage />
      <LoginGuestPage />
      <LoginStaffPage />
    </>
  );
}

export default App;
