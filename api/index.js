const express = require("express");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fetch = require("node-fetch");
const cors = require("cors");
const { fal } = require("@fal-ai/client"); // Updated import

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Predefined festival table
const festivals = [
  { name: "Diwali", start: "10-25", end: "11-30" },
  { name: "Holi", start: "03-01", end: "03-15" },
  { name: "Dussehra", start: "10-01", end: "10-15" },
  { name: "Raksha Bandhan", start: "08-10", end: "08-25" },
  // Add other festivals as needed
];

// Helper function to get the current festival if any
function getCurrentFestival() {
  const today = new Date();
  const currentMonthDay = `${String(today.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(today.getDate()).padStart(2, "0")}`;

  for (const festival of festivals) {
    if (currentMonthDay >= festival.start && currentMonthDay <= festival.end) {
      return festival.name;
    }
  }
  return null; // No current festival
}

// Helper function to generate a marketing prompt
function generateMarketingPrompt({
  product,
  targetAudience,
  campaignGoal,
  tone,
  festival,
  companyName,
  callToAction,
  promptTemplate,
  city,
}) {
  return `Create a marketing campaign for a product. 
          Company: ${companyName}.
          Product: ${product}. 
          Target Audience: ${targetAudience}. 
          Campaign Goal: ${campaignGoal}. 
          Tone: ${tone}. 
          Festival: ${
            festival ? `Align with ${festival} festival.` : "General campaign"
          }
          ${promptTemplate ? `Custom Prompt: ${promptTemplate}.` : ""}
          You're only supposed to provide a tagline, captions, and recommended hashtags. Call to Action: ${callToAction} Keep it very short and don't try to use markdown`;
}

// Cleaned-up helper function to generate an image using fal-ai
async function generateImage(description) {
  const result = await fal.subscribe("fal-ai/recraft-v3", {
    input: { prompt: description },
    logs: true,
    onQueueUpdate: (update) => {
      if (update.status === "IN_PROGRESS") {
        update.logs.map((log) => log.message).forEach(console.log);
      }
    },
  });

  // Return just the image URL
  return result.data.images?.[0]?.url || "";
}

/**
 * Simply returns the image URL without converting it.
 */
function displayImage(image) {
  // Instead of fetching or converting, just return the original URL
  return image.url;
}

// Generate best campaign time
function getBestCampaignTime() {
  const currentHour = new Date().getHours();
  return currentHour < 12
    ? "Afternoon"
    : currentHour < 18
    ? "Evening"
    : "Tomorrow Morning";
}

// Main POST endpoint
app.post("/generate-campaign", async (req, res) => {
  try {
    const {
      product,
      targetAudience,
      campaignGoal,
      tone,
      companyName,
      callToActionLink,
      promptTemplate,
      city,
    } = req.body;

    // Validate required fields
    if (
      !product ||
      !targetAudience ||
      !campaignGoal ||
      !tone ||
      !companyName ||
      !callToActionLink ||
      !city
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields.",
      });
    }

    // Get the current festival, build prompt, etc. (existing code)...
    const festival = getCurrentFestival();
    const prompt = generateMarketingPrompt({
      product,
      targetAudience,
      campaignGoal,
      tone,
      festival,
      companyName,
      callToAction: callToActionLink,
      promptTemplate,
      city,
    });

    // Generate marketing text (existing code)...
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Call fal-ai for the campaign image
    const imageDescription = `${product} campaign in ${city} as background and featuring ${
      festival || "a general theme"
    } with a focus on ${targetAudience}. Company: ${companyName}. Tone: ${tone}. ${promptTemplate}`;
    const imageUrl = await generateImage(imageDescription);

    // Respond with campaign details (image as a simple URL)
    res.json({
      success: true,
      details: {
        text,
        imageUrl,
        bestCampaignTime: getBestCampaignTime(),
        currentFestival: festival || "None",
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

app.get("/displayImage", (req, res) => {
  return res.json({
    images: [
      {
        url: "https://v3.fal.media/files/kangaroo/9kKGTsmuNePNDkqKAkAyX_image.webp",
        file_name: "image.webp",
        file_size: 342384,
        content_type: "image/webp",
      },
    ],
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
