import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import ProductPage from './Pages/ProductPage';
import AddProduct from './Pages/AddProduct';
import Profile from './Pages/Profile';
import Home from './Pages/Home';
import Products from './Pages/Products';
import EditProduct from './Pages/EditProduct';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import AboutUs from './Pages/AboutUs.jsx';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/about" element={<AboutUs />} />

        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/products/:productId" element={<ProductPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:id" element={<ResetPassword />} />
      </Routes>

    </>
  );
}

export default App;
