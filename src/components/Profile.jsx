// Profile.js
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { MdOutlineDarkMode } from 'react-icons/md';
import { IoMdNotificationsOutline } from 'react-icons/io';
import Cookies from 'js-cookie';
import axios from 'axios';
import ProfileModal from './ProfileModal'; // Import the ProfileModal

const Profile = () => {
  const { getLoggedIn } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [userData, setUserData] = useState({ name: '', email: '', role: '' });
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get('http://localhost:7684/api/loggedIn');
        const { loggedIn, role, user } = response.data;

        if (loggedIn) {
          setRole(role);
          setUserData(user); // Assuming user data is returned from the API
          Cookies.set('userRole', role, { expires: 7 });
        }
      } catch (error) {
        console.log('Error fetching user role:', error);
      }
    };

    fetchUserRole();
  }, []);

  const navigate = useNavigate();

  const logout = async () => {
    await axios.get('http://localhost:7684/api/logout');
    const userId = Cookies.get('userId');
    if (userId) {
      const cartKey = `cart_${userId}`;
      localStorage.removeItem(cartKey);
    }
    Cookies.remove('userId');
    await getLoggedIn();
    navigate('/');
  };

  return (
    <>
      {/**Search bar */}
      <form className="flex items-center max-w-sm mx-auto">   
        <label htmlFor="simple-search" className="sr-only">Search</label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
            </svg>
          </div>
          <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search branch name..." required />
        </div>
        <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </form>

      <div className="flex gap-3 items-center">
        <MdOutlineDarkMode className="size-6 cursor-pointer" />
        <IoMdNotificationsOutline className="size-6 cursor-pointer" />
        <div className="dropdown dropdown-end">
          <img src="https://i.pinimg.com/736x/ea/21/05/ea21052f12b135e2f343b0c5ca8aeabc.jpg" tabIndex={0} role="button" alt="/" className="size-10 rounded-full" />
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-white rounded-box z-[1] w-52 p-2 mt-2 shadow"
          >
            <li>
              <a onClick={() => setModalOpen(true)}>Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            {role === 'user' && (
              <li>
                <Link to="/market/orders">Orders</Link>
              </li>
            )}
            <li>
              <a onClick={logout}>Log out</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        userData={userData}
      />
    </>
  );
};

export default Profile;
