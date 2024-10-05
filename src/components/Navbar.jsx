import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'
import Profile from './Profile'

function Navbar({toggleSidebar}) {

    const { loggedIn, role } = useContext(AuthContext)

  return (
    <>
      <nav className=" fixed top-0 z-50 w-full bg-white border-b   ">
                <div className="flex flex-wrap justify-between items-center p-4">
                <button onClick={toggleSidebar} type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                    <span className="sr-only">Open sidebar</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                    </svg>
                </button>
                    <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="flex flex-shrink-0 items-center ">
                        <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company"/>
                    </div>
                    </a>
                  
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                           {/* Menu for non-logged-in users */}
                            {loggedIn === false && (
                              <>
                              <Link
                              to="/login"
                              className="btn btn-outline btn-accent"
                              >
                              Login
                            </Link>
                            <Link
                              to="/register"
                              className="btn btn-outline btn-accent"
                              >
                              Register
                            </Link>
                              </>
                              )}
                           {/* Menu for logged-in users */}
                          {loggedIn === true && role === 'user' && (
                                      <>
                                      <Link
                                          to="/market"
                                          className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                            >
                                          Market
                                      </Link>
                                          <Profile />
                                          </>
                                          )}

                                          {/* Menu for logged-in admins */}
                                          {loggedIn === true && role === 'admin' && (
                                        <>
                                          <Profile />
                                        </>
                              )}
                        </div>
                    </div>
            </nav>
            

    </>
  )
}

export default Navbar