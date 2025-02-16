import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Profile from './Profile';
import jjm from '../assets/image/jjm.jpg'

function Navbar({ toggleSidebar }) {
    const { loggedIn, role } = useContext(AuthContext);

    return (
        <>
            <nav className="fixed top-0 z-50 w-full bg-white border-b">
                <div className="flex flex-wrap justify-between items-center p-4">
                    <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="flex flex-shrink-0 items-center">
                            {/* Conditional rendering of logo or text */}
                            {loggedIn && role === 'admin' ? (
                                <span className=" text-1xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl dark:text-gray-900">CORE 2 DEPARTMENT</span>
                            ) : (
                                <img
                                    className="h-10 w-auto"
                                    src={jjm}
                                    alt="Your Company"
                                />
                            )}
                        </div>
                    </a>

                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        {/* Menu for non-logged-in users */}
                        {loggedIn === false && (
                            <>
                                <Link to="/login" className="btn btn-outline btn-accent">
                                    Login
                                </Link>
                                <Link to="/register" className="btn btn-outline btn-accent">
                                    Register
                                </Link>
                            </>
                        )}

                        {/* Menu for logged-in users */}
                        {loggedIn === true && role === 'user' && (
                            <>
                                <Link to="/market/cart" className="rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-green-400 hover:text-white">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                        />
                                    </svg>
                                </Link>
                                <Profile />
                            </>
                        )}

                        {/* Menu for logged-in admins */}
                        {loggedIn === true && role === 'admin' && (
                            <>
                                <button
                                    onClick={toggleSidebar}
                                    type="button"
                                    className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                >
                                    <span className="sr-only">Open sidebar</span>
                                    <svg
                                        className="w-6 h-6"
                                        aria-hidden="true"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            clipRule="evenodd"
                                            fillRule="evenodd"
                                            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                        ></path>
                                    </svg>
                                </button>
                                <Profile />
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
