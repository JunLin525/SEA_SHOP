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
import CommentDetail from './pages/CommentDetail';
import ShopUpdate from './pages/ShopUpdate'
import ShopEdit from './pages/ShopEdit';
import FoodDetail from './pages/FoodDetail';
import FoodCommentDetail from './pages/FoodCommentDetail';
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Food" element={<Food />} />
          <Route path="/About" element={<About />} />
          <Route path="/Shop" element={<Shop />} />
          <Route path="/Food-Detail/:foodID" element={<FoodDetail />} />
          <Route element={<PrivateRoute isLogged={true} />}>
            <Route path="/Shop/add" element={<ShopUpdate />} />
          </Route>
          <Route element={<PrivateRoute isLogged={true} />}>
            <Route path="/Shop/edit/:shopID" element={<ShopEdit />} />
          </Route>
          <Route element={<PrivateRoute isLogged={true} />}>
            <Route path="Shop/filter" element={<ShopSearch />} />
          </Route>
          <Route element={<PrivateRoute isLogged={true} />}>
            <Route path="/Shop-Detail/:shopID" element={<ShopDetail />} />
          </Route>
          <Route element={<PrivateRoute isLogged={true} />}>
            <Route path="/CommentDetail/:commentID" element={<CommentDetail />} />
          </Route>
          <Route element={<PrivateRoute isLogged={true} />}>
            <Route path="/FoodCommentDetail/:commentID" element={<FoodCommentDetail />} />
          </Route>
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
        </Routes >
      </AuthProvider>
    </Router >

  );
}


export default App;