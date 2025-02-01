import React from "react";
import { FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          {/* Links Section */}
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
            <a
              href="#about"
              className="hover:text-teal-400 transition duration-300"
            >
              About Us
            </a>
            <a
              href="#terms"
              className="hover:text-teal-400 transition duration-300"
            >
              Terms of Service
            </a>
            <a
              href="#privacy"
              className="hover:text-teal-400 transition duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#contact"
              className="hover:text-teal-400 transition duration-300"
            >
              Contact Information
            </a>
          </div>

          {/* Newsletter Subscription */}
          <div className="mt-4 md:mt-0">
            <form className="flex space-x-2">
              <input
                type="email"
                placeholder="Subscribe to our newsletter"
                className="px-4 py-2 rounded-lg text-gray-900 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-teal-500 hover:bg-teal-400 text-gray-900 px-4 py-2 rounded-lg font-bold transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4 mb-4">
          <a
            href="#"
            className="text-gray-400 hover:text-teal-400 transition duration-300"
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

        {/* Tagline */}
        <p className="text-center text-gray-500 mb-4">
          Adapting marketing strategies to meet Indian consumer needs.
        </p>

        {/* Copyright Notice */}
        <p className="text-center text-gray-500">
          © 2024 Marketing Platform. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
