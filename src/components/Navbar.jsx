// src/Navbar.js
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaUserSecret } from "react-icons/fa6";

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

  const handleAnonymousLogin = async () => {
    try {
      const result = await signInAnonymously(auth);
      setUser(result.user);
      setIsLoginModalOpen(false);
    } catch (error) {
      console.error("Error with Anonymous sign-in:", error.message);
    }
  };

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white fixed w-full z-20 shadow-md transition-shadow duration-300 hover:shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex-shrink-0">
            <h1
              onClick={handleLogoClick}
              className={`text-3xl font-extrabold text-teal-400 tracking-wide cursor-pointer hover:scale-105 transition-transform duration-300 ${
                isSpinning ? "animate-spin" : ""
              }`}
            >
              Marketing Platform
            </h1>
          </div>

          {/* Menu Items */}
          <div className="hidden md:flex space-x-8 font-medium">
            {["Home", "Features", "Pricing", "Contact Us"].map((item) => (
              <button
                key={item}
                onClick={() => handleScroll(item.toLowerCase().replace(" ", "-"))}
                className="relative group transition duration-300 text-white hover:text-teal-400 font-semibold"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-2">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full" />
                ) : (
                  <span className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white">
                    {user.displayName ? user.displayName[0] : "A"}
                  </span>
                )}
                <span className="font-semibold text-teal-400">
                  {user.displayName || "Anonymous User"}
                </span>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="hidden md:inline-block bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600 text-gray-900 px-5 py-2 rounded-full font-bold transition duration-300 transform hover:scale-105 shadow-lg"
              >
                Login / Sign Up
              </button>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden focus:outline-none"
            >
              <svg className="w-6 h-6 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="px-4 py-2 space-y-2">
            {["Home", "Features", "Pricing", "Contact Us"].map((item) => (
              <button
                key={item}
                onClick={() => handleScroll(item.toLowerCase().replace(" ", "-"))}
                className="block text-left py-2 hover:text-teal-400 transition duration-300 font-semibold text-white"
              >
                {item}
              </button>
            ))}
            {!user && (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="block bg-teal-500 hover:bg-teal-400 text-gray-900 px-4 py-2 rounded-full font-bold transition duration-300 text-center shadow-lg transform hover:scale-105"
              >
                Login / Sign Up
              </button>
            )}
          </div>
        </div>
      )}

      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Welcome to Marketing Platform</h2>
            <button
              onClick={handleGoogleLogin}
              className="bg-blue-500 text-white flex items-center justify-center gap-4 px-4 py-2 rounded-full mb-4 w-full transition hover:bg-blue-600"
            >
              <FcGoogle size={25} /> Sign in with Google
            </button>
            <button
              onClick={handleAnonymousLogin}
              className="bg-gray-500 text-white flex items-center justify-center gap-4 px-4 py-2 rounded-full w-full transition hover:bg-gray-600"
            >
              <FaUserSecret size={25} color="black" /> Sign in Anonymously
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
    </nav>
  );
}

export default Navbar;
