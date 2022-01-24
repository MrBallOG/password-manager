import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './components/views/Home';
import { Login } from './components/views/Login';
import { Register } from './components/views/Register';
import { Vault } from './components/views/Vault';
import { useState } from 'react';


function App() {
  const [logged, setLogged] = useState(false);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home logged={logged} setLogged={setLogged} />} />
          <Route path="/login" element={<Login logged={logged} setLogged={setLogged} />} />
          <Route path="/register" element={<Register logged={logged} setLogged={setLogged} />} />
          <Route path="/vault" element={<Vault logged={logged} setLogged={setLogged} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
