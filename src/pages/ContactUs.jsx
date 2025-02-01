import React, { useState } from 'react';
import { FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    console.log(formData);

    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitted(true);
    setIsLoading(false);

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white min-h-screen w-full flex flex-col items-center justify-center p-4 relative">
      {/* Decorative background patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bg-gradient-radial from-teal-500 opacity-20 h-80 w-80 rounded-full -top-20 -left-20"></div>
        <div className="absolute bg-gradient-radial from-blue-500 opacity-10 h-96 w-96 rounded-full -bottom-10 -right-16"></div>
      </div>

      <h1 className="text-5xl font-extrabold mb-10 text-teal-400 animate-fade-in">Contact Us</h1>

      {isSubmitted ? (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg text-center animate-fade-in-up">
          <h2 className="text-3xl font-semibold mb-4 text-teal-400">Thank You!</h2>
          <p className="text-gray-300">Your message has been sent successfully. We'll get back to you shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-lg w-full animate-fade-in-up">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-1" htmlFor="name">Name</label>
              <input
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-teal-500"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1" htmlFor="email">Email</label>
              <input
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-teal-500"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1" htmlFor="subject">Subject</label>
              <input
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-teal-500"
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1" htmlFor="message">Message</label>
              <textarea
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-teal-500"
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-3 mt-6 rounded-lg font-bold transition duration-300 ${isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-teal-500 hover:bg-teal-400 text-gray-900"}`}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}

      {/* Contact Information */}
      <div className="mt-10 text-center animate-fade-in-up">
        <h2 className="text-2xl font-bold mb-2 text-teal-400">Get In Touch</h2>
        <p className="text-gray-300">Address: 123 Marketing St, Mumbai, India</p>
        <p className="text-gray-300">Phone: +91 123 456 7890</p>
        <p className="text-gray-300">Email: contact@marketingplatform.com</p>
      </div>

      {/* Google Maps Embed */}
      <div className="mt-10 w-full max-w-3xl animate-fade-in-up">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.792765995658!2d72.89735127502728!3d19.072846982131118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c627a20bcaa9%3A0xb2fd3bcfeac0052a!2sK.%20J.%20Somaiya%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1729907307577!5m2!1sen!2sin"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Company Location"
        />
      </div>

      {/* Social Media Links */}
      <div className="mt-8 flex justify-center space-x-6 animate-fade-in-up">
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-400 transition duration-300">
          <FaLinkedin size={28} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-400 transition duration-300">
          <FaTwitter size={28} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-400 transition duration-300">
          <FaInstagram size={28} />
        </a>
      </div>
    </div>
  );
};

export default ContactUs;
