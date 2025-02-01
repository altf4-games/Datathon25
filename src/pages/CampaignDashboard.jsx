// src/components/CampaignDashboard.js

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../index.css"; // Import Tailwind base styles
import { Tooltip } from "@mui/material"; // For better descriptions

const CampaignDashboard = () => {
  const [campaignDetails, setCampaignDetails] = useState(null);
  const { control, handleSubmit, watch } = useForm();
  const selectedTemplate = watch("promptTemplate", "Billboard in a city");

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    // Send data to the backend
    try {
      const response = await fetch("https://cultur-ai-backend.onrender.com/generate-campaign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log("Response from server:", result);
      setCampaignDetails(result.details); // Store campaign details in state
    } catch (error) {
      console.error("Error submitting campaign data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-3xl">
        <h1 className="text-3xl font-semibold text-center mb-6">Campaign Dashboard</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Company Name */}
          <Controller
            name="companyName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Company Name"
                className="input input-bordered w-full"
                required
              />
            )}
          />

          {/* Product Name */}
          <Controller
            name="product"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Product Name"
                className="input input-bordered w-full"
                required
              />
            )}
          />

          {/* Target Audience */}
          <Controller
            name="targetAudience"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Target Audience"
                className="input input-bordered w-full"
                required
              />
            )}
          />

          {/* Campaign Goal with Tooltip */}
          <Controller
            name="campaignGoal"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Tooltip title="Define the main objective, like increasing brand awareness, driving sales, or promoting a new product">
                <input
                  {...field}
                  type="text"
                  placeholder="Campaign Goal"
                  className="input input-bordered w-full"
                  required
                />
              </Tooltip>
            )}
          />

          {/* Tone */}
          <Controller
            name="tone"
            control={control}
            defaultValue="Professional"
            render={({ field }) => (
              <select {...field} className="select select-bordered w-full">
                <option value="Professional">Professional</option>
                <option value="Friendly">Friendly</option>
                <option value="Humorous">Humorous</option>
                <option value="Inspirational">Inspirational</option>
              </select>
            )}
          />

          {/* Call to Action Link */}
          <Controller
            name="callToActionLink"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Call to Action Link"
                className="input input-bordered w-full"
                required
              />
            )}
          />

          {/* Campaign Date */}
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
                className="input input-bordered w-full"
              />
            )}
          />

          {/* Prompt Template */}
          <Controller
            name="promptTemplate"
            control={control}
            defaultValue="Billboard in a city"
            render={({ field }) => (
              <select {...field} className="select select-bordered w-full">
                <option value="Billboard in a city">Billboard in a city</option>
                <option value="Social media post">Social media post</option>
                <option value="Magazine ad">Magazine ad</option>
                <option value="Product packaging">Product packaging</option>
                <option value="Custom">Custom</option>
              </select>
            )}
          />

          {/* Custom Prompt Text Area */}
          {selectedTemplate === "Custom" && (
            <Controller
              name="customPrompt"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <textarea
                  {...field}
                  placeholder="Enter custom prompt details"
                  className="textarea textarea-bordered w-full"
                  onChange={(e) => field.onChange(e.target.value)} // Ensure value is passed correctly
                ></textarea>
              )}
            />
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full"
          >
            Generate Campaign
          </button>
        </form>

        {/* Display campaign details after submission */}
        {campaignDetails && (
          <div className="mt-8 bg-gray-700 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Campaign Details</h2>
            <p className="mb-2">Text: {campaignDetails.text}</p>
            <p className="mb-2">Best Time to Campaign: {campaignDetails.bestCampaignTime}</p>
            <p className="mb-2">Current Festival: {campaignDetails.currentFestival}</p>
            {campaignDetails.imageBase64 && (
              <img
                src={campaignDetails.imageBase64}
                alt="Campaign"
                className="mt-4 rounded-lg"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignDashboard;
