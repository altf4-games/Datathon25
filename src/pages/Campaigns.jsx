import React from "react";

const campaigns = [
  {
    id: 1,
    title: "Summer Sale Campaign",
    date: "2023-06-15",
    description:
      "A campaign promoting our summer sale with discounts up to 50%!",
    status: "Completed",
  },
  {
    id: 2,
    title: "New Year Promotion",
    date: "2023-12-31",
    description:
      "Celebrate the new year with our special promotions and offers.",
    status: "Active",
  },
  {
    id: 3,
    title: "Back to School Campaign",
    date: "2023-08-01",
    description:
      "A campaign to promote school supplies for the upcoming school year.",
    status: "Completed",
  },
];

const StatusBadge = ({ status }) => {
  const statusStyles = {
    Active: "bg-green-100 text-green-700 border-green-200",
    Completed: "bg-gray-100 text-gray-600 border-gray-200",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium border ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
};

function CampaignPage() {
  return (
    <div className="ml-20 mt-10 min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-8 border-b border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900">
              Campaign Dashboard
            </h2>
            <p className="mt-2 text-gray-600">
              Track and manage your marketing campaigns
            </p>
          </div>

          {/* Added fadeIn effect */}
          <div className="p-6 animate-fadeIn">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {campaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200 border border-gray-100"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {campaign.title}
                    </h3>
                    <StatusBadge status={campaign.status} />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Launch Date</p>
                      <p className="text-gray-900">
                        {new Date(campaign.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-1">Description</p>
                      <p className="text-gray-700">{campaign.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampaignPage;
