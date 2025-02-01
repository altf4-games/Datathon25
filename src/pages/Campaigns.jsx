// src/pages/CampaignPage.js
import React from 'react';

const campaigns = [
  {
    id: 1,
    title: "Summer Sale Campaign",
    date: "2023-06-15",
    description: "A campaign promoting our summer sale with discounts up to 50%! ",
    status: "Completed",
  },
  {
    id: 2,
    title: "New Year Promotion",
    date: "2023-12-31",
    description: "Celebrate the new year with our special promotions and offers.",
    status: "Active",
  },
  {
    id: 3,
    title: "Back to School Campaign",
    date: "2023-08-01",
    description: "A campaign to promote school supplies for the upcoming school year.",
    status: "Completed",
  },
];

function CampaignPage() {
  return (
    <div className="p-8 ml-32 min-h-screen w-[90vw] bg-gradient-to-b to-gray-900 via-gray-900 from-gray-800 text-white mt-16">
      <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Previous Campaigns</h2>
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-xl font-semibold">{campaign.title}</h3>
              <p><strong>Date:</strong> {campaign.date}</p>
              <p><strong>Description:</strong> {campaign.description}</p>
              <p><strong>Status:</strong> {campaign.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CampaignPage;