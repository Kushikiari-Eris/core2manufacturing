import { Navigate, Route, Routes } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Market from './pages/market/Market';
import AuthContext, { AuthContextProvider } from './context/AuthContext';
import React, { useContext } from 'react';
import AdminPanel from './pages/admin/AdminPanel';
import Product from './pages/admin/products/Product';
import ProductDetail from './pages/market/ProductDetail';
import Cart from './pages/market/Cart';

function App() {
  return (
    <AuthContextProvider>
      <RoutesWrapper />
    </AuthContextProvider>
  );
}

function RoutesWrapper() {
  const { loggedIn, role, loading } = useContext(AuthContext);

  // If still loading the auth state, show a loading screen
  if (loading) {
    return <div>Loading...</div>;  // Replace with a proper loading component if you want
  }

  return (
    <Routes>
      <Route path='/' element={<Home />} />

      {/**Auth */}
      <Route path='/register' element={!loggedIn ? <Register /> : role === 'admin' ? <Navigate to='/admin' /> : <Navigate to='/market' />} />
      <Route path='/login' element={!loggedIn ? <Login /> : role === 'admin' ? <Navigate to='/admin' /> : <Navigate to='/market' />} />

      {/**MarketPage */}
      <Route path='/market' element={loggedIn && role === 'user' ? <Market /> : <Navigate to='/login' />} />
      <Route path='/market/product/:id' element={<ProductDetail />} />
      <Route path='/market/cart' element={<Cart/>}/>

      {/**AdminPage */}
      <Route path='/admin' element={loggedIn && role === 'admin' ? <AdminPanel /> : <Navigate to='/login' />} >
        <Route path='product' element={<Product />} />
      </Route>
    </Routes>
  );
}

export default App;
