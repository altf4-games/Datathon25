import React, { useState } from "react";
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

const COLORS = {
  primary: "#0ea5e9",
  secondary: "#f43f5e",
  tertiary: "#eab308",
  success: "#22c55e",
  warning: "#f97316",
  neutral: "#64748b",
  background: "#f8fafc",
};

const SENTIMENT_COLORS = {
  positive: "#22c55e",
  neutral: "#64748b",
  negative: "#ef4444",
};

// Dummy data
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
    ],
  },
  {
    uri: "2",
    text: "Check out our latest feature update",
    likeCount: 1398,
    repostCount: 300,
    replies: [
      { text: "Not what I expected", sentiment: [{ label: "negative" }] },
      { text: "Great improvement!", sentiment: [{ label: "positive" }] },
    ],
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
    ],
  },
]
  .map((post) => ({
    ...post,
    engagementScore:
      post.likeCount + post.repostCount * 2 + post.replies.length * 3,
  }))
  .sort((a, b) => b.engagementScore - a.engagementScore);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-gray-100 p-3 rounded-lg shadow-lg">
        <p className="font-semibold text-gray-800">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value.toLocaleString()}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const MetricCard = ({ title, value, icon, color }) => (
  <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className={`text-2xl font-bold ${color}`}>
          {value.toLocaleString()}
        </p>
      </div>
      <span className="text-2xl">{icon}</span>
    </div>
  </div>
);

const EnhancedAnalyticsDashboard = () => {
  const [posts] = useState(dummyPosts);

  const totalEngagement = posts.reduce(
    (acc, post) => acc + post.engagementScore,
    0
  );
  const totalLikes = posts.reduce((acc, post) => acc + post.likeCount, 0);
  const totalReposts = posts.reduce((acc, post) => acc + post.repostCount, 0);

  const sentimentData = posts.reduce((acc, post) => {
    post.replies.forEach((reply) => {
      const sentiment = reply.sentiment[0].label;
      acc[sentiment] = (acc[sentiment] || 0) + 1;
    });
    return acc;
  }, {});

  const sentimentChartData = Object.entries(sentimentData).map(
    ([label, count]) => ({
      label,
      count,
    })
  );

  return (
    <div className="ml-20 mt-20 min-h-screen w-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Posts Analytics Dashboard
      </h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard
          title="Total Engagement"
          value={totalEngagement}
          icon="⭐"
          color="text-blue-500"
        />
        <MetricCard
          title="Total Likes"
          value={totalLikes}
          icon="👍"
          color="text-pink-500"
        />
        <MetricCard
          title="Total Reposts"
          value={totalReposts}
          icon="🔄"
          color="text-yellow-500"
        />
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8 w-full">
        <div className="bg-white p-6 rounded-xl shadow-sm ">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Engagement Metrics by Post
          </h3>
          <div className="w-full" style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={posts.map((post, index) => ({
                  name: `Post ${index + 1}`,
                  likes: post.likeCount,
                  reposts: post.repostCount,
                  replies: post.replies.length,
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="likes" fill={COLORS.primary} name="Likes" />
                <Bar dataKey="reposts" fill={COLORS.tertiary} name="Reposts" />
                <Bar dataKey="replies" fill={COLORS.secondary} name="Replies" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm w-full">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Sentiment Distribution
          </h3>
          <div className="w-full" style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentChartData}
                  dataKey="count"
                  nameKey="label"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ label, count }) => `${label} (${count})`}
                >
                  {sentimentChartData.map((entry) => (
                    <Cell
                      key={`cell-${entry.label}`}
                      fill={SENTIMENT_COLORS[entry.label]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div className="bg-white rounded-xl shadow-sm p-6 w-full">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          Top Performing Posts
        </h3>
        <div className="space-y-6">
          {posts.map((post, idx) => (
            <div
              key={post.uri}
              className="border-b border-gray-100 last:border-0 pb-6 last:pb-0"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-semibold text-gray-800">
                  Post {idx + 1}
                </h4>
                <span className="text-sm font-medium text-blue-500">
                  Score: {post.engagementScore.toLocaleString()}
                </span>
              </div>
              <p className="text-gray-600 mb-3">{post.text}</p>

              <div className="flex flex-wrap gap-4 mb-3 text-sm">
                <span className="inline-flex items-center text-blue-500">
                  <span className="mr-1">👍</span>
                  {post.likeCount.toLocaleString()} likes
                </span>
                <span className="inline-flex items-center text-yellow-500">
                  <span className="mr-1">🔄</span>
                  {post.repostCount.toLocaleString()} reposts
                </span>
                <span className="inline-flex items-center text-pink-500">
                  <span className="mr-1">💬</span>
                  {post.replies.length} replies
                </span>
              </div>

              {post.replies.length > 0 && (
                <div className="mt-4 pl-4 border-l-2 border-gray-100">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">
                    Latest Replies
                  </h5>
                  <div className="space-y-2">
                    {post.replies.map((reply, i) => (
                      <div key={i} className="bg-gray-50 rounded-lg p-3">
                        <p className="text-gray-600 text-sm">{reply.text}</p>
                        <span
                          className={`inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full ${
                            reply.sentiment[0].label === "positive"
                              ? "bg-green-100 text-green-600"
                              : reply.sentiment[0].label === "negative"
                              ? "bg-red-100 text-red-600"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {reply.sentiment[0].label}
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
