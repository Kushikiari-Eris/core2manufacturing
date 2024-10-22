import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import Product from './products/Product';
import { Outlet } from 'react-router-dom';
<<<<<<< HEAD
import Dashboard from './Dashboard';
=======
>>>>>>> 17e54ee1d090ce19e37c289bdadfdc85dc1313cf

const AdminPanel = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
    <Navbar toggleSidebar={toggleSidebar}/>
    <Sidebar isSidebarOpen={isSidebarOpen}/>
    <Outlet className='bg-gray-200'/>
    </>
  )
}

export default AdminPanel