import React from "react";

function LandingPage() {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-white min-h-screen pt-32 font-sans">

      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center text-center py-32 px-6 space-y-6 animate-fadeIn">
        <h2 className="text-5xl md:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 animate-slideUp">
          AI-Driven Marketing Solutions
        </h2>
        <p className="text-lg md:text-2xl text-gray-300 max-w-2xl opacity-80 leading-relaxed animate-fadeIn">
          Our platform leverages AI to provide insights tailored for Indian consumers, maximizing the effectiveness of your marketing efforts.
        </p>
        <button
          onClick={() => {window.location.href = "/dashboard"}}
        className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-blue-500 hover:to-teal-500 text-white py-3 px-8 rounded-full font-semibold text-lg transition duration-500 transform hover:scale-105 shadow-lg animate-bounceSlow">
          Get Started
        </button>
      </header>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-16">
        <h3 className="text-3xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-12 animate-slideUp">
          Key Features
        </h3>
        <div className="grid md:grid-cols-3 gap-12">
          
          {/* Feature 1 */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl  transition duration-500 transform hover:scale-105 animate-fadeIn">
            <div className="flex justify-center items-center text-teal-400 text-5xl mb-6 animate-pulse">
              🌍
            </div>
            <h4 className="text-2xl font-semibold mb-3 text-white">Location-Based Marketing</h4>
            <p className="text-gray-400 text-base leading-relaxed">
              Enhance your campaigns by using AI to target specific locations, allowing for more precise and effective marketing.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl  duration-500 transform hover:scale-105 animate-fadeIn">
            <div className="flex justify-center items-center text-teal-400 text-5xl mb-6 animate-pulse">
              🎨
            </div>
            <h4 className="text-2xl font-semibold mb-3 text-white">Prompt-to-Image Generation</h4>
            <p className="text-gray-400 text-base leading-relaxed">
              Generate high-quality marketing images instantly from text prompts, leveraging the power of AI for content creation.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl  duration-500 transform hover:scale-105 animate-fadeIn">
            <div className="flex justify-center items-center text-teal-400 text-5xl mb-6 animate-pulse">
              📊
            </div>
            <h4 className="text-2xl font-semibold mb-3 text-white">Advanced Analytics</h4>
            <p className="text-gray-400 text-base leading-relaxed">
              Make data-driven decisions with comprehensive analytics that provide insights into consumer behavior.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
