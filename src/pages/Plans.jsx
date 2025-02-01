import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactMarkdown from "react-markdown";
import { GoogleGenerativeAI } from "@google/generative-ai";

function Plans() {
  const { control, handleSubmit } = useForm();
  const [plansData, setPlansData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateCampaignPlans = async (data) => {
    const response = await fetch("http://localhost:3000/generate-campaign-plans", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error("Failed to generate campaign plans");
    }
    
    const result = await response.json();
    return result.details;
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const plans = await generateCampaignPlans(data);
      setPlansData(plans);
    } catch (error) {
      console.error("Error generating campaign plans:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row p-4 md:p-8">
      <div className="bg-gray-200 text-gray-700 p-4 md:p-6 mt-16 ml-32 rounded-lg shadow-lg w-full md:w-1/3">
        <h2 className="text-2xl font-bold mb-4">Campaign Settings</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="companyName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Company Name"
                className="w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400"
                required
              />
            )}
          />
          <Controller
            name="product"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Product Name"
                className="w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400"
                required
              />
            )}
          />
          <Controller
            name="targetAudience"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Target Audience"
                className="w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400"
                required
              />
            )}
          />
          <Controller
            name="maxBudget"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                type="number"
                placeholder="Max Budget"
                className="w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400"
                required
              />
            )}
          />
          <Controller
            name="userPrompt"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <textarea
                {...field}
                placeholder="Campaign details (themes, tone, style, etc.)"
                className="w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400"
                required
              />
            )}
          />
          <Controller
            name="callToActionLink"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Call to Action Link"
                className="w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400"
                required
              />
            )}
          />
          <Controller
            name="campaignDate"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <DatePicker
                {...field}
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                placeholderText="Select Campaign Date"
                className="w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400"
              />
            )}
          />
          <Controller
            name="city"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="City"
                className="w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400"
                required
              />
            )}
          />
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg shadow-md">
            Generate Campaign Plans
          </button>
        </form>
      </div>

      <div className="flex-1 mt-6 md:mt-0 bg-white md:ml-6">
        {isLoading && (
          <div className="flex justify-center items-center h-full">
            <span className="text-xl text-neutral-400 font-semibold">Generating Plans...</span>
          </div>
        )}
        {plansData && (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-center">Campaign Plans</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {plansData.map((plan, index) => (
                <div key={index} className="bg-gray-200 rounded-lg shadow-lg p-4 sm:p-6">
                  <h3 className="text-2xl font-semibold text-blue-400 mb-4 text-center">Option {index + 1}</h3>
                  <div className="text-sm text-black">
                    <ReactMarkdown>{plan.text}</ReactMarkdown>
                    <p className="mt-2"><strong>Estimated Cost:</strong> {plan.cost}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Plans;
