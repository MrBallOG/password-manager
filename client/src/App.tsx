import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './views/Home';
import { Login } from './views/Login';
import { Register } from './views/Register';
import { Vault } from './views/Vault';
import { Logout } from './views/Logout';
import { AddPassword } from './views/AddPassword';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './reducers';
import { useEffect, useState } from 'react';
import { checkIfLoggedIn } from './utils/LoginUtils';

function App() {
  const [ready, setReady] = useState(false)
  const token = useSelector((state: RootState) => state.token)
  const refreshTokenSent = useSelector((state: RootState) => state.refreshToken)
  const dispatch = useDispatch()

  useEffect(() => {
    const checkLoggedIn = async () => {
      await checkIfLoggedIn(token.token, refreshTokenSent, dispatch, setReady)
    }
    const ac = new AbortController()
    checkLoggedIn()
    return () => ac.abort()
  }, [dispatch, token.token, refreshTokenSent])

  if (!ready) {
    return (<></>)
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/vault" element={<Vault />} />
          <Route path="/vault/add" element={<AddPassword />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
