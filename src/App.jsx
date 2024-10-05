import { Navigate, Route, Routes } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Market from './pages/Market';
import AuthContext, { AuthContextProvider } from './context/AuthContext';
import React, { useContext } from 'react';
import AdminPanel from './pages/admin/AdminPanel';
import Product from './pages/admin/products/Product';

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

      <Route 
        path='/register' 
        element={!loggedIn ? <Register /> : role === 'admin' ? <Navigate to='/admin' /> : <Navigate to='/market' />} 
      />
      <Route 
        path='/login' 
        element={!loggedIn ? <Login /> : role === 'admin' ? <Navigate to='/admin' /> : <Navigate to='/market' />} 
      />
      <Route 
        path='/market' 
        element={loggedIn && role === 'user' ? <Market /> : <Navigate to='/login' />} 
      />
      <Route 
        path='/admin' 
        element={loggedIn && role === 'admin' ? <AdminPanel /> : <Navigate to='/login' />} 
      >
        <Route path='product' element={<Product />} />
      </Route>
    </Routes>
  );
}

export default App;
