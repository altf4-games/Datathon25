import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { FaTachometerAlt, FaChartLine, FaFileAlt, FaCog, FaUserCircle, FaSignOutAlt, FaUserSecret } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

function Sidebar() {
  const [user, setUser] = useState(null);
  const router = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleGoogleLogin = async () => {
    // Handle Google login logic here
    setIsLoginModalOpen(false);
    setUser({ displayName: 'Google User' });
  };

  const handleAnonymousLogin = async () => {
    // Handle anonymous login logic here
    setIsLoginModalOpen(false);
    setUser({ displayName: 'Anonymous User' });
  };

  const handleLogout = async () => {
    // Handle logout logic here
    setUser(null); // Clear the user state on logout
    handleNavigation('/');
  };

  const handleNavigation = (route) => {
    router(route);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`flex flex-col fixed z-40 h-screen bg-white text-white transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} p-4 shadow-lg`}>
      <button 
        onClick={toggleSidebar} 
        className="text-teal-400 mb-4 focus:outline-none hover:bg-gray-700 rounded w-10 p-2 transition duration-300"
        aria-label="Toggle sidebar"
      >
        {isCollapsed ? '☰' : '❎'}
      </button>

      {!isCollapsed && (
        <div className="flex items-center mb-6">
          {/* <h1 className="text-xl font-bold text-teal-900">Marketing</h1>
          <span className="text-xl font-bold text-teal-900 ml-1">Platform</span> */}
        </div>
      )}

      <nav className="flex-grow">
        <ul className="space-y-4 text-gray-700">
          {[
            { name: 'Dashboard', icon: <FaTachometerAlt className="w-5 h-5" />, route: '/dashboard' },
            { name: 'Analytics', icon: <FaChartLine className="w-5 h-5" />, route: '/analytics' },
            { name: 'Reports', icon: <FaFileAlt className="w-5 h-5" />, route: '/reports' },
            { name: 'Plans', icon: <FaFileAlt className="w-5 h-5" />, route: '/plans' },
            { name: 'Settings', icon: <FaCog className="w-5 h-5" />, route: '/settings' },
          ].map((item, index) => (
            <li 
              key={index} 
              onClick={() => handleNavigation(item.route)}
              className={`flex items-center space-x-2 rounded-lg p-2 hover:cursor-pointer transition duration-300 transform hover:scale-105 ${isCollapsed ? 'justify-center' : 'justify-start'} hover:bg-gray-200`}
            >
              {item.icon}
              {!isCollapsed && (
                <span className="text-lg transition duration-300 transform hover:translate-x-1">
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto flex items-center space-x-2 text-gray-700 mb-4 hover:text-teal-400 transition duration-300">
        <FaUserCircle className="w-8 h-8" />
        {!isCollapsed && <span className="text-sm">{user ? user.displayName : 'User Name'}</span>}
      </div>
      {/* <button
        onClick={handleLogout}
        className="flex items-center mt-4 space-x-2 text-red-500 hover:text-red-400 transition duration-300"
      >
        <FaSignOutAlt className="w-5 h-5" />
        {!isCollapsed && <span>Logout</span>}
      </button> */}

      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Welcome to Marketing Platform
            </h2>
            <button
              onClick={handleGoogleLogin}
              className="bg-blue-500 text-white flex items-center justify-center gap-4 px-4 py-2 rounded-full mb-4 w-full transition hover:bg-blue-600"
            >
              <FcGoogle size={25}/> Sign in with Google
            </button>
            <button
              onClick={handleAnonymousLogin}
              className="bg-gray-500 text-black flex items-center justify-center gap-4 px-4 py-2 rounded-full w-full transition hover:bg-gray-600"
            >
              <FaUserSecret size={25} color="black"/> Sign in Anonymously
            </button>
            <button
              onClick={() => setIsLoginModalOpen(false)}
              className="mt-4 text-gray-600 underline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;