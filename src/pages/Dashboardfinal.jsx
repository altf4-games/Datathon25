import React, { useState } from "react";
import { IoOptionsOutline } from "react-icons/io5";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Tooltip } from "@mui/material";
import ReactMarkdown from "react-markdown";
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

function TwoColumnForm() {
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [campaignDetails, setCampaignDetails] = useState(null);
  const { control, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    setIsLoading(true);
    try {
      const [falRes, hfRes] = await Promise.all([
        fetch("http://localhost:3000/generate-campaign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }),
        fetch("http://localhost:3000/generate-campaign-hf", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }),
      ]);
      const falResult = await falRes.json();
      const hfResult = await hfRes.json();
      console.log("Fal Response:", falResult);
      console.log("HF Response:", hfResult);
      setCampaignDetails({
        fal: falResult.details,
        hf: hfResult.details,
      });
      setIsLoading(false);
    } catch (error) {
      console.error("Error submitting campaign data:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row p-4 md:p-8">
      <div
        className={`bg-gray-200 text-grey-700 p-4 md:p-6 pt-6 mt-16 ml-32 rounded-lg shadow-lg transition-all duration-500 ease-in-out ${
          isOpen ? "w-full md:w-1/3" : "w-full md:w-[75px]"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2
            onClick={() => setIsOpen((prev) => !prev)}
            className="text-2xl font-bold cursor-pointer flex items-center hover:scale-105 transition"
          >
            <IoOptionsOutline size={35} />
            {isOpen && <span className="ml-2">Campaign Settings</span>}
          </h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`space-y-4 transition-opacity duration-500 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <Controller
            name="companyName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Company Name"
                className="w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 transition placeholder-gray-400"
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
                className="w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 transition placeholder-gray-400"
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
                className="w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 transition placeholder-gray-400"
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
                className="w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 transition placeholder-gray-400"
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
                placeholder="Enter campaign details including themes, tone, style, etc."
                className="w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 transition placeholder-gray-400"
                required
              ></textarea>
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
                className="w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 transition placeholder-gray-400"
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
                className="w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 transition"
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
                className="w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 transition placeholder-gray-400"
                required
              />
            )}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg shadow-md transition duration-300"
          >
            Generate Campaign
          </button>
        </form>
      </div>

      <div className="flex-1 mt-6 md:mt-0 bg-white md:ml-6">
        {isLoading && (
          <div className="flex justify-center items-center h-full">
            <span className="text-xl text-neutral-200 font-semibold">
              Generating...
            </span>
          </div>
        )}
        {campaignDetails && (
          <div>
            <h2 className="text-3xl text-white font-bold mb-6 text-center">
              A/B Test Results
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-gray-200 rounded-lg shadow-lg p-4 sm:p-6">
                <h3 className="text-2xl font-semibold text-blue-400 mb-4 text-center">
                  Option A
                </h3>
                <div className="text-sm text-black">
                  <ReactMarkdown className="mb-2">
                    {String(campaignDetails.fal.text)}
                  </ReactMarkdown>
                  <p className="mb-2">
                    <strong>Best Time to Campaign:</strong>{" "}
                    {campaignDetails.fal.bestCampaignTime}
                  </p>
                  <p className="mb-2">
                    <strong>Current Festival:</strong>{" "}
                    {campaignDetails.fal.currentFestival}
                  </p>
                  {campaignDetails.fal.imageUrl && (
                    <img
                      src={campaignDetails.fal.imageUrl}
                      alt="Fal AI Campaign"
                      className="mt-4 rounded-lg w-full"
                    />
                  )}
                </div>
              </div>
              <div className="bg-gray-200 rounded-lg shadow-lg p-4 sm:p-6">
                <h3 className="text-2xl font-semibold text-blue-400 mb-4 text-center">
                  Option B
                </h3>
                <div className="text-sm text-black">
                  <ReactMarkdown className="mb-2">
                    {String(campaignDetails.hf.text)}
                  </ReactMarkdown>
                  <p className="mb-2">
                    <strong>Best Time to Campaign:</strong>{" "}
                    {campaignDetails.hf.bestCampaignTime}
                  </p>
                  <p className="mb-2">
                    <strong>Current Festival:</strong>{" "}
                    {campaignDetails.hf.currentFestival}
                  </p>
                  {campaignDetails.hf.imageBase64 && (
                    <img
                      src={`data:image/png;base64,${campaignDetails.hf.imageBase64}`}
                      alt="HF Campaign"
                      className="mt-4 rounded-lg w-full"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TwoColumnForm;
