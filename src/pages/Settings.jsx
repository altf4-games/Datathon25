// SettingsPage.js
import React, { useState } from "react";
import { FaUser, FaBell, FaLock, FaCreditCard } from "react-icons/fa";

const SettingsPage = () => {
  // State to manage collapsed sections
  const [isAccountOpen, setAccountOpen] = useState(false);
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);
  const [isPrivacyOpen, setPrivacyOpen] = useState(false);
  const [isBillingOpen, setBillingOpen] = useState(false);

  return (
    <div className="p-8 ml-32 min-h-screen w-[90vw] bg-white text-white mt-16">
      <h2 className="text-4xl font-bold text-center text-teal-400 mb-8">Settings</h2>

      {/* Settings Container */}
      <div className="space-y-4">

        {/* Account Settings Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <button
            onClick={() => setAccountOpen(!isAccountOpen)}
            className="flex items-center justify-between w-full text-xl font-semibold text-teal-400"
          >
            <div className="flex items-center">
              <FaUser className="mr-2 text-blue-500" />
              Account Settings
            </div>
            <span>{isAccountOpen ? "−" : "+"}</span>
          </button>
          {isAccountOpen && (
            <div className="mt-4 space-y-4 transition duration-300">
              <div>
                <label className="text-sm text-gray-400">Username</label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="w-full mt-1 p-2 bg-white text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full mt-1 p-2 bg-white text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>
              <button className="mt-4 w-full bg-teal-400 text-gray-900 font-semibold py-2 rounded hover:bg-teal-500">
                Save Changes
              </button>
            </div>
          )}
        </div>

        {/* Notification Preferences Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <button
            onClick={() => setNotificationsOpen(!isNotificationsOpen)}
            className="flex items-center justify-between w-full text-xl font-semibold text-teal-400"
          >
            <div className="flex items-center">
              <FaBell className="mr-2 text-blue-500" />
              Notification Preferences
            </div>
            <span>{isNotificationsOpen ? "−" : "+"}</span>
          </button>
          {isNotificationsOpen && (
            <div className="mt-4 space-y-4 transition duration-300">
              <div className="flex items-center text-gray-700 justify-between">
                <span>Email Notifications</span>
                <input
                  type="checkbox"
                  className="w-5 h-5 text-teal-400 bg-gray-700 border-gray-600 focus:ring-teal-400"
                />
              </div>
              <div className="flex items-center text-gray-700 justify-between">
                <span>Push Notifications</span>
                <input
                  type="checkbox"
                  className="w-5 h-5 text-teal-400 bg-gray-700 border-gray-600 focus:ring-teal-400"
                />
              </div>
              <button className="mt-4 w-full bg-teal-400 text-gray-900 font-semibold py-2 rounded hover:bg-teal-500">
                Save Changes
              </button>
            </div>
          )}
        </div>

        {/* Privacy & Security Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <button
            onClick={() => setPrivacyOpen(!isPrivacyOpen)}
            className="flex items-center justify-between w-full text-xl font-semibold text-teal-400"
          >
            <div className="flex items-center">
              <FaLock className="mr-2 text-blue-500" />
              Privacy & Security
            </div>
            <span>{isPrivacyOpen ? "−" : "+"}</span>
          </button>
          {isPrivacyOpen && (
            <div className="mt-4 space-y-4 transition duration-300">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Two-Factor Authentication</span>
                <input
                  type="checkbox"
                  className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Change Password</label>
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full mt-1 p-2 bg-white border border-gray-300 text-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700">
                Save Changes
              </button>
            </div>
          )}
        </div>

        {/* Billing Information Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <button
            onClick={() => setBillingOpen(!isBillingOpen)}
            className="flex items-center justify-between w-full text-xl font-semibold text-teal-400"
          >
            <div className="flex items-center">
              <FaCreditCard className="mr-2 text-blue-500" />
              Billing Information
            </div>
            <span>{isBillingOpen ? "−" : "+"}</span>
          </button>
          {isBillingOpen && (
            <div className="mt-4 space-y-4 transition duration-300">
              <div>
                <label className="text-sm text-gray-400">Card Number</label>
                <input
                  type="text"
                  placeholder="Enter your card number"
                  className="w-full mt-1 p-2 bg-white text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="text-sm text-gray-400">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full mt-1 p-2 bg-white text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm text-gray-400">CVV</label>
                  <input
                    type="text"
                    placeholder="CVV"
                    className="w-full mt-1 p-2 bg-white text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>
              </div>
              <button className="mt-4 w-full bg-teal-400 text-gray-900 font-semibold py-2 rounded hover:bg-teal-500">
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;