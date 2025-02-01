import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

const sampleData = [
  { name: "Jan", clicks: 2400, conversions: 400, rate: 1.5 },
  { name: "Feb", clicks: 1398, conversions: 300, rate: 2.5 },
  { name: "Mar", clicks: 9800, conversions: 2100, rate: 3.1 },
  { name: "Apr", clicks: 3908, conversions: 1000, rate: 1.8 },
  { name: "May", clicks: 4800, conversions: 1300, rate: 2.1 },
  { name: "Jun", clicks: 3800, conversions: 1100, rate: 2.4 },
  { name: "Jul", clicks: 4300, conversions: 1500, rate: 2.7 },
];

const COLORS = ["#34d399", "#3b82f6", "#fbbf24", "#fb7185", "#8b5cf6", "#fca5a1", "#eab308"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 border border-teal-400 p-2 rounded-lg">
        <p className="text-teal-400">{`${payload[0].name}: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const MarketingAnalytics = () => {
  return (
    <div className="p-8 ml-32 min-h-screen w-[90vw] bg-gradient-to-b to-gray-900 via-gray-900 from-gray-800 text-white mt-16"> {/* Added mt-16 */}
      <h2 className="text-4xl font-bold text-center text-teal-400 mb-8">Marketing Analytics</h2>
      
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Line Chart */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg transition hover:shadow-xl hover:scale-105 transform duration-300">
          <h3 className="text-xl font-semibold text-teal-400 mb-4">Conversion Rate Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#555" />
              <XAxis dataKey="name" stroke="#ddd" />
              <YAxis stroke="#ddd" />
              <Tooltip contentStyle={{ backgroundColor: "#222", border: "none" }} />
              <Legend />
              <Line type="monotone" dataKey="rate" stroke="#34d399" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg transition hover:shadow-xl hover:scale-105 transform duration-300">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">Clicks & Conversions</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#555" />
              <XAxis dataKey="name" stroke="#ddd" />
              <YAxis stroke="#ddd" />
              <Tooltip contentStyle={{ backgroundColor: "#222", border: "none" }} />
              <Legend />
              <Bar dataKey="clicks" fill="#3b82f6" />
              <Bar dataKey="conversions" fill="#fbbf24" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Improved Pie Chart */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg transition hover:shadow-xl hover:scale-105 transform duration-300">
          <h3 className="text-xl font-semibold text-pink-400 mb-4">Click-Through Rates by Month</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Tooltip content={<CustomTooltip />} />
              <Pie
                data={sampleData}
                dataKey="rate"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#34d399"
                label={({ name, value }) => `${name} (${value})`} // Corrected here
                animationDuration={800}
                animationEasing="ease-in-out"
              >
                {sampleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table of Metrics */}
      <div className="mt-10 bg-gray-800 p-8 rounded-lg shadow-lg transition hover:shadow-xl hover:scale-105 transform duration-300">
        <h3 className="text-2xl font-semibold text-teal-400 mb-4">Detailed Performance Data</h3>
        <table className="w-full text-left">
          <thead className="text-teal-400 border-b border-gray-600">
            <tr>
              <th className="px-4 py-2">Month</th>
              <th className="px-4 py-2">Clicks</th>
              <th className="px-4 py-2">Conversions</th>
              <th className="px-4 py-2">Conversion Rate (%)</th>
            </tr>
          </thead>
          <tbody>
            {sampleData.map((row, index) => (
              <tr
                key={index}
                className="border-b border-gray-700 hover:bg-gray-700 transition duration-300"
              >
                <td className="px-4 py-2">{row.name}</td>
                <td className="px-4 py-2">{row.clicks}</td>
                <td className="px-4 py-2">{row.conversions}</td>
                <td className="px-4 py-2">{row.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketingAnalytics;
