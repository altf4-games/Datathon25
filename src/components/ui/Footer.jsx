import React from "react";
import { FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-4 mb-4">
          <a
            href="#"
            className="text-gray-400 hover:text-blue-600 transition duration-300"
          >
            <FaTwitter className="w-6 h-6" />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-teal-400 transition duration-300"
          >
            <FaLinkedin className="w-6 h-6" />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-teal-400 transition duration-300"
          >
            <FaInstagram className="w-6 h-6" />
          </a>
        </div>
        
        <p className="text-center text-gray-600 mb-4">
          Adapting marketing strategies to meet Indian consumer needs.
        </p>
        
        <p className="text-center text-gray-500">
          © 2024 AdFlow AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
