import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home';
import Food from './pages/Food';
import About from './pages/About';
import Shop from './pages/Shop';
import ShopSearch from './pages/ShopSearch';
import Login from './pages/Login';
import ShopDetail from './pages/ShopDetail';
import Register from './pages/Register';
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<PrivateRoute isLogged={true} />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<PrivateRoute isLogged={true} />}>
            <Route path="/Food" element={<Food />} />
          </Route>
          <Route element={<PrivateRoute isLogged={true} />}>
            <Route path="/About" element={<About />} />
          </Route>
          <Route element={<PrivateRoute isLogged={true} />}>
            <Route path="/Shop" element={<Shop />} />
          </Route>
          <Route element={<PrivateRoute isLogged={true} />}>
            <Route path="/ShopSearch/Price/:PriceNum/People/:PeopleNum/Rating/:RatingNum" element={<ShopSearch />} />
          </Route>
          <Route element={<PrivateRoute isLogged={true} />}>
            <Route path="/Shop-Detail/:shopID" element={<ShopDetail />} />
          </Route>
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
        </Routes >
      </AuthProvider>
    </Router >

  );
}


export default App;