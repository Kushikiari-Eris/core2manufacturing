import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import Product from './products/Product';
import { Outlet } from 'react-router-dom';

const AdminPanel = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
    <Navbar toggleSidebar={toggleSidebar}/>
    <Sidebar isSidebarOpen={isSidebarOpen}/>
    <Outlet/>
    </>
  )
}

export default AdminPanel