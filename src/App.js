import React,{useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';
import Users from './pages/Users';
import UserDetails from './pages/UserDetails';
import NotFound from './pages/NotFound';
import NavBar from './components/NavBar';
import ProductDetails from './pages/ProductDetails';
import AddProduct from './pages/AddProduct';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const token = localStorage.getItem('token');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
        <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
      <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={token ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/products" element={<ProtectedRoute element={<Products />} />} />
        <Route path="/products/:id" element={<ProtectedRoute element={<ProductDetails />} />} />
        <Route path="/addproducts" element={<ProtectedRoute element={<AddProduct />} />} />
        <Route path="/orders" element={<ProtectedRoute element={<Orders />} />} />
        <Route path="/orders/:id" element={<ProtectedRoute element={<OrderDetails />} />} />
        <Route path="/users" element={<ProtectedRoute element={<Users />} />} />
        <Route path="/users/:id" element={<ProtectedRoute element={<UserDetails />} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
