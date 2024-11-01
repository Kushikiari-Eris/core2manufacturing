import { useContext, useState } from "react";
import { NavLink } from "react-router-dom"; // Import NavLink
import jjm from '../assets/image/jjm.jpg';
import AuthContext from "../context/AuthContext";

const Sidebar = ({ isSidebarOpen }) => {

    const { role } = useContext(AuthContext);

    // State to track the dropdown visibility
    const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
    const [isAuditDashboardDropdownOpen, setIsAuditDasnhboardDropdownOpen ] = useState(false);
    const [isInventoryDropdownOpen, setIsInventoryDropdownOpen] = useState(false);
    const [isMaintenanceDropdownOpen, setIsMaintenanceDropdownOpen] = useState(false);
    const [isStockInventoryDropdownOpen, setIsStockInventoryDropdownOpen] = useState(false);
    const [isCustomerDropdownOpen, setIsCustomerDropdownOpen] = useState(false);
    const [isAuditMaintenanceDropDownOpen, setIsAuditMaintenanceDropDownOpen] = useState(false)

    // Function to toggle dropdowns
    const toggleProductDropdown = () => {
        setIsProductDropdownOpen(!isProductDropdownOpen);
    };
    const toggleAuditDashboardDropdown = () => {
        setIsAuditDasnhboardDropdownOpen(!isAuditDashboardDropdownOpen);
    };
    const toggleInventoryDropdown = () => {
        setIsInventoryDropdownOpen(!isInventoryDropdownOpen);
    };
    const toggleMaintenanceDropdown = () => {
        setIsMaintenanceDropdownOpen(!isMaintenanceDropdownOpen);
    };
    const toggleStockDropdown = () => {
        setIsStockInventoryDropdownOpen(!isStockInventoryDropdownOpen);
    };
    const toggleCustomerDropdown = () => {
        setIsCustomerDropdownOpen(!isCustomerDropdownOpen);
    };
    const toggleAuditMaintenanceDropdown = () => {
        setIsAuditMaintenanceDropDownOpen(!isAuditMaintenanceDropDownOpen);
    };

    return (
        <aside className={`fixed top-0 left-0 z-40 w-64 h-full pt-20 transition-transform transform sm:translate-x-0 dark:border-gray-700 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} border-r border-gray-200`}>
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center justify-center mb-4">
                    <img src={jjm} alt="Logo" className="w-40 h-40" /> {/* Add your logo here */}
                </div>
                {/* Admin Section */}
                {role === 'admin' && (
                <ul className="space-y-2 font-medium">
                    <li>
                        <NavLink 
                            to="/admin/dashboard" 
                            className={({ isActive }) => `flex items-center p-2 text-gray-900 rounded-lg dark:text-white ${isActive ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                        >
                            <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                            </svg>
                            <span className="ms-3">Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <button type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" onClick={toggleProductDropdown}>
                            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                                <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                            </svg>
                            <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Product Execution</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                            </svg>
                        </button>
                        <ul className={`${isProductDropdownOpen ? 'block' : 'hidden'} py-2 space-y-2`}>
                            <li>
                                <NavLink to="/admin/productTracking" className={({ isActive }) => `flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${isActive ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>
                                    Production Tracking & Monitoring
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/product" className={({ isActive }) => `flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${isActive ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>
                                    Product Launcher
                                </NavLink>
                            </li>
                            <button type="button" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" onClick={toggleCustomerDropdown}>
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                                    <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                                </svg>
                                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Customer</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                </svg>
                            </button>
                            <ul className={`${isCustomerDropdownOpen ? 'block' : 'hidden'} py-2 space-y-2 px-10`}>
                                <li>
                                    <NavLink to="/admin/orders" className={({ isActive }) => `flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${isActive ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>
                                        Orders
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/admin/users" className={({ isActive }) => `flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${isActive ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>
                                        Users
                                    </NavLink>
                                </li>
                            </ul>
                        </ul>
                    </li> 
                    <li>
                        <button type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" onClick={toggleInventoryDropdown}>
                            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                                <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                            </svg>
                            <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Inventory </span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                            </svg>
                        </button>
                        <ul className={`${isInventoryDropdownOpen ? 'block' : 'hidden'} py-2 space-y-2`}>
                            <li>
                            <button type="button" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" onClick={toggleStockDropdown}>
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                                    <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                                </svg>
                                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Stocks</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                </svg>
                            </button>
                            <ul className={`${isStockInventoryDropdownOpen ? 'block' : 'hidden'} py-2 space-y-2 px-10`}>
                                <li>
                                    <NavLink to="/admin/raw" className={({ isActive }) => `flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${isActive ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>
                                        Raw Material
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/admin/finish" className={({ isActive }) => `flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${isActive ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>
                                        Finish Goods
                                    </NavLink>
                                </li>
                            </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
                )}

                {/* Auditor Section */}
                {role === 'auditor' && (
                    <ul>
                        <li>
                            <NavLink to="/admin/dashboard" className={({ isActive }) => `flex items-center p-2 text-gray-900 rounded-lg dark:text-white ${isActive ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                                <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                                </svg>
                                <span className="ms-3">Dashboard</span>
                            </NavLink>
                        </li>
                        <button type="button" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" onClick={toggleAuditDashboardDropdown}>
                            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                                <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                            </svg>
                            <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Audit</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                            </svg>
                        </button>
                        <ul className={`${isAuditDashboardDropdownOpen ? 'block' : 'hidden'} py-2 space-y-2 px-10`}>
                            <li>
                                <NavLink to="/admin/orders" className={({ isActive }) => `flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-3 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${isActive ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>
                                    Planning/Scheduling
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/users" className={({ isActive }) => `flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-3 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${isActive ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>
                                    Execution
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/users" className={({ isActive }) => `flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-3 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${isActive ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>
                                    Trail Documentation
                                </NavLink>
                            </li>
                        </ul>
                        <button type="button" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" onClick={toggleAuditMaintenanceDropdown}>
                            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                                <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                            </svg>
                            <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Maintenance</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                            </svg>
                        </button>
                        <ul className={`${isAuditMaintenanceDropDownOpen ? 'block' : 'hidden'} py-2 space-y-2 px-10`}>
                            <li>
                                <NavLink to="/admin/orders" className={({ isActive }) => `flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-3 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${isActive ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>
                                    Preventive Maintenance
                                </NavLink>
                            </li>
                        </ul>
                    </ul> 
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
