import React, { useState } from 'react';
import {
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

const COLORS = ["#34d399", "#3b82f6", "#fbbf24", "#fb7185", "#8b5cf6", "#fca5a1", "#eab308"];

// Dummy data to simulate posts
const dummyPosts = [
  {
    uri: "1",
    text: "Excited to announce our new product launch!",
    likeCount: 2400,
    repostCount: 400,
    replies: [
      { text: "This is amazing!", sentiment: [{ label: "positive" }] },
      { text: "Can't wait to try it", sentiment: [{ label: "positive" }] },
      { text: "Interesting approach", sentiment: [{ label: "neutral" }] },
    ]
  },
  {
    uri: "2",
    text: "Check out our latest feature update",
    likeCount: 1398,
    repostCount: 300,
    replies: [
      { text: "Not what I expected", sentiment: [{ label: "negative" }] },
      { text: "Great improvement!", sentiment: [{ label: "positive" }] },
    ]
  },
  {
    uri: "3",
    text: "Share your thoughts on our new design",
    likeCount: 9800,
    repostCount: 2100,
    replies: [
      { text: "Love the new look!", sentiment: [{ label: "positive" }] },
      { text: "Could use some work", sentiment: [{ label: "neutral" }] },
      { text: "Not a fan", sentiment: [{ label: "negative" }] },
    ]
  }
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 p-2 rounded-lg shadow-lg">
        <p className="font-semibold">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const EnhancedAnalyticsDashboard = () => {
  const [posts] = useState(dummyPosts);

  // Calculate sentiment data
  const sentimentData = posts.reduce((acc, post) => {
    post.replies.forEach(reply => {
      const sentiment = reply.sentiment[0].label;
      acc[sentiment] = (acc[sentiment] || 0) + 1;
    });
    return acc;
  }, {});

  const sentimentChartData = Object.entries(sentimentData).map(([label, count]) => ({
    label,
    count
  }));

  return (
    <div className="p-10 mt-16 min-h-screen bg-gradient-to-b to-white via-white from-white text-black" align="center">
      <h2 className="text-4xl  font-bold text-center text-teal-400 mb-8">Posts Analytics Dashboard</h2>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Engagement Stats */}
        <div className="bg-white p-6 pl-8 ml-16 rounded-lg shadow-lg transition hover:shadow-xl hover:scale-105 transform duration-300">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">Post Engagement Metrics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={posts.map((post, index) => ({
                name: `Post ${index + 1}`,
                likes: post.likeCount,
                reposts: post.repostCount,
                replies: post.replies.length,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="name" stroke="#555" />
              <YAxis stroke="#555" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="likes" fill="#3b82f6" name="Likes" />
              <Bar dataKey="reposts" fill="#fbbf24" name="Reposts" />
              <Bar dataKey="replies" fill="#fb7185" name="Replies" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Sentiment Analysis */}
        <div className="bg-white p-6 ml-16 rounded-lg shadow-lg transition hover:shadow-xl hover:scale-105 transform duration-300">
          <h3 className="text-xl font-semibold text-pink-400 mb-4">Sentiment Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sentimentChartData}
                dataKey="count"
                nameKey="label"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ label, count }) => `${label} (${count})`}
                labelLine={true}
              >
                {sentimentChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Posts List */}
      <div className="bg-white p-6 ml-16 rounded-lg shadow-lg transition hover:shadow-xl transform duration-300">
        <h3 className="text-2xl font-semibold text-teal-400 mb-6">Detailed Post Analysis</h3>
        <div className="space-y-6">
          {posts.map((post, idx) => (
            <div key={post.uri} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition duration-300">
              <h4 className="text-xl font-bold text-gray-800 mb-2">Post {idx + 1}</h4>
              <p className="mb-3 text-gray-600">{post.text}</p>
              <div className="flex gap-4 mb-3 text-sm">
                <span className="text-blue-500">👍 {post.likeCount} likes</span>
                <span className="text-yellow-500">🔄 {post.repostCount} reposts</span>
                <span className="text-pink-500">💬 {post.replies.length} replies</span>
              </div>
              {post.replies.length > 0 && (
                <div className="ml-4 border-l-2 border-gray-200 pl-4">
                  <h5 className="font-semibold text-gray-700 mb-2">Replies:</h5>
                  <div className="space-y-2">
                    {post.replies.map((reply, i) => (
                      <div key={i} className="bg-gray-50 p-2 rounded">
                        <p className="text-gray-600 italic">"{reply.text}"</p>
                        <span className={`text-sm font-medium ${
                          reply.sentiment[0].label === 'positive' ? 'text-green-500' :
                          reply.sentiment[0].label === 'negative' ? 'text-red-500' :
                          'text-yellow-500'
                        }`}>
                          Sentiment: {reply.sentiment[0].label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnhancedAnalyticsDashboard;