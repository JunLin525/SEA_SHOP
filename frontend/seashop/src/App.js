import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import PrivateRoute from './utils/PrivateRoute';
//import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home';
import Food from './pages/Food';
import About from './pages/About';
import Shop from './pages/Shop';
import Login from './pages/Login';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Food" element={<Food />} />
        <Route path="/About" element={<About />} />
        <Route path="/Shop" element={<Shop />} />
        <Route path="/Login" element={<Login />} />
      </Routes >
    </Router >

  );
}


export default App;