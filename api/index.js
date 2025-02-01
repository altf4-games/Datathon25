const express = require("express");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fetch = require("node-fetch");
const cors = require("cors");
const { fal } = require("@fal-ai/client");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const festivals = [
  { name: "Diwali", start: "10-25", end: "11-30" },
  { name: "Holi", start: "03-01", end: "03-15" },
  { name: "Dussehra", start: "10-01", end: "10-15" },
  { name: "Raksha Bandhan", start: "08-10", end: "08-25" },
];

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
  return null;
}

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
  return result.data.images?.[0]?.url || "";
}

async function generateImageb(description) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
    {
      headers: {
        Authorization: `Bearer ${process.env.HF}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ inputs: description }),
    }
  );
  const result = await response.blob();
  const buffer = Buffer.from(await result.arrayBuffer());
  return buffer.toString("base64");
}

function getBestCampaignTime() {
  const currentHour = new Date().getHours();
  return currentHour < 12
    ? "Afternoon"
    : currentHour < 18
    ? "Evening"
    : "Tomorrow Morning";
}

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
    if (
      !product ||
      !targetAudience ||
      !campaignGoal ||
      !tone ||
      !companyName ||
      !callToActionLink ||
      !city
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields." });
    }
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
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const imageDescription = `${product} campaign in ${city} as background and featuring ${
      festival || "a general theme"
    } with a focus on ${targetAudience}. Company: ${companyName}. Tone: ${tone}. ${
      promptTemplate || ""
    }`;
    const imageUrl = await generateImage(imageDescription);
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
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.post("/generate-campaign-hf", async (req, res) => {
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
    if (
      !product ||
      !targetAudience ||
      !campaignGoal ||
      !tone ||
      !companyName ||
      !callToActionLink ||
      !city
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields." });
    }
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
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const imageDescription = `${product} campaign in ${city} as background and featuring ${
      festival || "a general theme"
    } with a focus on ${targetAudience}. Company: ${companyName}. Tone: ${tone}. ${
      promptTemplate || ""
    }`;
    const imageBase64 = await generateImageb(imageDescription);
    res.json({
      success: true,
      details: {
        text,
        imageBase64,
        bestCampaignTime: getBestCampaignTime(),
        currentFestival: festival || "None",
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.get("/displayImage", (req, res) => {
  res.json({
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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
