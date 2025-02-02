import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactMarkdown from "react-markdown";
import marketingBudgetData from "../data/marketing-budget.json";

function Plans() {
  const { control, handleSubmit } = useForm();
  const [plansData, setPlansData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateCampaignPlans = (data) => {
    const maxBudget = Number(data.maxBudget);
    const campaignDateStr = data.campaignDate
      ? new Date(data.campaignDate).toLocaleDateString("en-US")
      : "Not set";

    const userInputDetails = `**Campaign Details:**  
- **Company Name:** ${data.companyName}  
- **Product:** ${data.product}  
- **Target Audience:** ${data.targetAudience}  
- **Campaign Date:** ${campaignDateStr}  
- **Maximum Budget:** ₹${maxBudget.toLocaleString()}`;

    const userBudgetKey = `budget_${maxBudget}`;
    let selectedBudget = marketingBudgetData.marketing_channels[userBudgetKey];

    // Log the selectedBudget value to verify it
    console.log("selectedBudget before fallback:", selectedBudget);

    // Ensure selectedBudget is set to maxBudget if undefined
    if (selectedBudget === undefined) {
      selectedBudget = maxBudget;
    }

    // Log after fallback to check if maxBudget is being used
    console.log("selectedBudget after fallback:", selectedBudget);

    const budgetRanges = [
      {
        name: "Basic",
        percentage: 0.3,
        suggestedChannels: ["Social Media Ads", "Email Marketing"],
      },
      {
        name: "Standard",
        percentage: 0.6,
        suggestedChannels: ["Social Media Ads", "Content Marketing", "Email Marketing"],
      },
      {
        name: "Premium",
        percentage: 1.0,
        suggestedChannels: [
          "Social Media Ads",
          "Content Marketing",
          "SEO Optimization",
          "Analytics Tools",
          "Influencer Marketing",
        ],
      },
    ];

    return budgetRanges.map((plan) => ({
      text: `${userInputDetails}## ${plan.name} Marketing Plan

### Features:
- ${plan.suggestedChannels.join("\n- ")}
- **Estimated Cost:** ₹${Math.round(selectedBudget * plan.percentage).toLocaleString()}`,
    }));
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    try {
      const plans = generateCampaignPlans(data);
      setPlansData(plans);
    } catch (error) {
      console.error("Error generating campaign plans:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col p-4 md:p-8 mt-20">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="bg-gray-200 text-gray-700 p-6 rounded-lg shadow-lg w-full md:w-1/3">
          <h2 className="text-2xl font-bold mb-4">Campaign Settings</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {[
              { name: "companyName", placeholder: "Company Name" },
              { name: "product", placeholder: "Product Name" },
              { name: "targetAudience", placeholder: "Target Audience" },
              { name: "maxBudget", placeholder: "Max Budget (₹)", type: "number" },
            ].map(({ name, placeholder, type = "text" }) => (
              <Controller
                key={name}
                name={name}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input {...field} type={type} placeholder={placeholder} className="w-full p-2 border border-gray-600 rounded-lg" required />
                )}
              />
            ))}
            <Controller
              name="campaignDate"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <DatePicker {...field} selected={field.value} onChange={(date) => field.onChange(date)} className="w-full p-2 border border-gray-600 rounded-lg" placeholderText="Select Campaign Date" />
              )}
            />
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600" disabled={isLoading}>
              {isLoading ? "Generating..." : "Generate Campaign Plans"}
            </button>
          </form>
        </div>
        <div className="w-full md:w-2/3">
          {plansData?.length > 0 && (
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Generated Campaign Plans</h2>
              {plansData.map((plan, index) => (
                <div key={index} className="mb-6 border-b pb-4 last:border-b-0">
                  <ReactMarkdown className="prose max-w-none">{plan.text}</ReactMarkdown>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Plans;
