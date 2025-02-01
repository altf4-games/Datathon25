import React from 'react';
import { FaBrain, FaRobot, FaUserTie } from 'react-icons/fa';

const FeaturesSection = () => {
  const features = [
    {
      icon: <FaBrain className="text-blue-600 w-12 h-12" />,
      title: 'AI-Driven Insights',
      description:
        'Gain valuable insights from vast data to enhance your marketing strategy with data-backed decisions.',
    },
    {
      icon: <FaRobot className="text-blue-600 w-12 h-12" />,
      title: 'Automated Campaigns',
      description:
        'Automate and optimize marketing campaigns with ease, saving time and maximizing reach across platforms.',
    },
    {
      icon: <FaUserTie className="text-blue-600 w-12 h-12" />,
      title: 'Customer Personalization',
      description:
        'Deliver personalized experiences that engage customers, boost loyalty, and increase conversions.',
    },
  ];

  return (
    <section className="bg-gray-50 text-gray-900 py-16 overflow-x-hidden">
      <div className="container mx-auto px-6 text-center max-w-5xl overflow-x-hidden">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Powerful Features to Enhance Your Marketing
        </h2>
        <p className="text-gray-600 mb-12">
          Our AI-driven platform offers the tools you need to elevate your marketing strategy and drive real results.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center justify-center w-full mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
