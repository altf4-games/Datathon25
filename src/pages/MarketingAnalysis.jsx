import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const COLORS = [
  "#34d399",
  "#3b82f6",
  "#fbbf24",
  "#fb7185",
  "#8b5cf6",
  "#fca5a1",
  "#eab308",
];

const RecentPostsAnalytics = () => {
  const [posts, setPosts] = useState([]);
  const [sentimentData, setSentimentData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch recent posts and aggregate sentiment on mount.
  useEffect(() => {
    fetch("http://localhost:3000/recent-posts")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPosts(data.posts);

          // Aggregate sentiment counts from all replies
          const sentimentCounts = {};
          data.posts.forEach((post) => {
            (post.replies || []).forEach((reply) => {
              // Assume each reply.sentiment is an array; use the first label.
              const sentimentLabel = reply.sentiment?.[0]?.label || "unknown";
              sentimentCounts[sentimentLabel] =
                (sentimentCounts[sentimentLabel] || 0) + 1;
            });
          });
          const sentimentArray = Object.entries(sentimentCounts).map(
            ([label, count]) => ({ label, count })
          );
          setSentimentData(sentimentArray);
        }
      })
      .catch((err) => {
        console.error("Error fetching recent posts:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading recent posts...</div>;

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Recent Posts Analytics</h2>

      {/* Display a bar chart for post statistics */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-4">
          Post Stats (Likes, Reposts, Replies)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={posts.map((post, index) => ({
              name: `Post ${index + 1}`,
              likes: post.likeCount || 0,
              reposts: post.repostCount || 0,
              replies: (post.replies && post.replies.length) || 0,
            }))}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#374151" />
            <YAxis stroke="#374151" />
            <Tooltip contentStyle={{ backgroundColor: "#ffffff" }} />
            <Legend />
            <Bar dataKey="likes" fill="#3b82f6" name="Likes" />
            <Bar dataKey="reposts" fill="#fbbf24" name="Reposts" />
            <Bar dataKey="replies" fill="#fb7185" name="Replies" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Display aggregated sentiment analysis in a Pie Chart */}
      {/* <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-4">Aggregated Sentiment</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={sentimentData}
              dataKey="count"
              nameKey="label"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ label, count }) => `${label} (${count})`}
              animationDuration={800}
              animationEasing="ease-in-out"
            >
              {sentimentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div> */}

      {/* List out each post and its replies with sentiment */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Posts Details</h3>
        {posts.map((post, idx) => (
          <div key={post.uri} className="mb-6 p-4 border border-gray-300 rounded">
            <h4 className="text-xl font-bold mb-2">Post {idx + 1}</h4>
            <p className="mb-2">
              <span className="font-semibold">Text:</span> {post.text}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Likes:</span> {post.likeCount || 0} |{" "}
              <span className="font-semibold">Reposts:</span> {post.repostCount || 0} |{" "}
              <span className="font-semibold">Replies:</span>{" "}
              {(post.replies && post.replies.length) || 0}
            </p>
            {post.replies && post.replies.length > 0 && (
              <div className="ml-4">
                <h5 className="font-semibold mb-1">Replies:</h5>
                <ul>
                  {post.replies.map((reply, i) => (
                    <li key={i} className="mb-1">
                      <span className="italic">"{reply.text}"</span> — Sentiment:{" "}
                      <span className="font-semibold">
                        {reply.sentiment?.[0]?.label || "unknown"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPostsAnalytics;
