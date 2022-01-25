import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './components/views/Home';
import { Login } from './components/views/Login';
import { Register } from './components/views/Register';
import { Vault } from './components/views/Vault';



function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/vault" element={<Vault />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
