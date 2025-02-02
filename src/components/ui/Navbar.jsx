// src/Navbar.js
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaUserSecret } from "react-icons/fa6";
import { FaBars } from "react-icons/fa";

function Navbar() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogoClick = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 1000);
    window.location.href = "/";
  };

  return (
    <nav
      className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[80%] bg-white bg-opacity-20 backdrop-blur-lg border border-white/20 shadow-2xl shadow-black/10 
      rounded-2xl px-6 py-3 transition-all duration-500 ease-in-out z-50"
    >
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div
          className={`text-3xl font-extrabold text-teal-400 tracking-wide cursor-pointer hover:text-teal-600 transition-colors duration-300
          }`}
          onClick={handleLogoClick}
        >
          AdFlow AI
        </div>

        {/* Menu Button (Mobile) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white text-2xl md:hidden hover:scale-110 transition duration-300"
        >
          <FaBars />
        </button>

        {/* Menu (Desktop) */}
        <div className="hidden md:flex items-center space-x-8">
          {!user && (
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 
                text-white px-5 py-2 rounded-full font-bold shadow-lg transform transition-all 
                duration-300"
            >
              Login / Sign Up
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="md:hidden mt-4 flex flex-col space-y-3 bg-white bg-opacity-20 backdrop-blur-lg border 
          border-white/20 shadow-lg rounded-xl p-4 text-center transition-all duration-500"
        >
          {!user && (
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="bg-blue-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-full 
                font-bold shadow-md transition duration-300 transform hover:scale-105"
            >
              Login / Sign Up
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
