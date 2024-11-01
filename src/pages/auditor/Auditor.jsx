import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import { Outlet } from 'react-router-dom';

const Auditor = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
    <Navbar toggleSidebar={toggleSidebar}/>
    <Sidebar isSidebarOpen={isSidebarOpen}/>
    </>
  )
}

export default Auditor