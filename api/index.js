const express = require("express");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fetch = require("node-fetch");
const cors = require("cors");
const { fal } = require("@fal-ai/client");
const sharp = require("sharp");
const { HfInference } = require("@huggingface/inference");
const { BskyAgent } = require("@atproto/api");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const client = new HfInference(process.env.HF);
const agent = new BskyAgent({ service: "https://bsky.social" });
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
  return (
    festivals.find(
      (festival) =>
        currentMonthDay >= festival.start && currentMonthDay <= festival.end
    )?.name || null
  );
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
  return `Create a marketing campaign for a product in under 300 characters also don't use markdown. Company: ${companyName}. Product: ${product}. Target Audience: ${targetAudience}. Campaign Goal: ${campaignGoal}. Tone: ${tone}. Festival: ${
    festival ? `Align with ${festival} festival.` : "General campaign"
  } ${
    promptTemplate ? `Custom Prompt: ${promptTemplate}.` : ""
  } You're only supposed to provide a tagline, captions, and recommended hashtags. Call to Action: ${callToAction}. Keep it very short.`;
}

async function generateImage(description) {
  try {
    const result = await fal.subscribe("fal-ai/recraft-v3", {
      input: { prompt: description },
      logs: true,
    });
    return result.data?.images?.[0]?.url || "";
  } catch (error) {
    console.error("Error generating image:", error);
    return "";
  }
}

async function generateImageb(description) {
  try {
    const image = await client.textToImage({
      model: "ZB-Tech/Text-to-Image",
      inputs: description,
      parameters: { num_inference_steps: 100 },
    });
    const buffer = Buffer.from(await image.arrayBuffer());
    const resizedBuffer = await sharp(buffer)
      .resize(800)
      .jpeg({ quality: 80 })
      .toBuffer();
    return resizedBuffer.toString("base64");
  } catch (error) {
    console.error("Error generating image (HF):", error);
    return "";
  }
}

function getBestCampaignTime() {
  const currentHour = new Date().getHours();
  return currentHour < 12
    ? "Afternoon"
    : currentHour < 18
    ? "Evening"
    : "Tomorrow Morning";
}

async function SendPost(txt, image, isBase64 = false) {
  try {
    await agent.login({
      identifier: process.env.BSKY_USERNAME,
      password: process.env.BSKY_PASSWORD,
    });

    let embedData;

    if (isBase64) {
      // Convert base64 to a buffer.
      const imageBuffer = Buffer.from(image, "base64");
      // Upload the blob to BlueSky.
      const uploadResponse = await agent.uploadBlob(imageBuffer, {
        encoding: "image/jpeg",
      });
      // The uploadResponse contains a blob reference that we can use.
      embedData = {
        $type: "app.bsky.embed.images",
        images: [
          {
            alt: "Generated Image",
            image: uploadResponse.data.blob, // blob ref returned by the uploadBlob call
            aspectRatio: { width: 1000, height: 500 },
          },
        ],
      };
    } else {
      // If you already have a URL from Fal AI, attach it as an external embed.
      embedData = {
        $type: "app.bsky.embed.external",
        external: {
          uri: image,
          title: "Marketing Campaign Image",
          description: "AI-generated campaign image",
        },
      };
    }

    const post = await agent.post({
      text: txt,
      embed: embedData,
      createdAt: new Date().toISOString(),
    });
    //console.log("Post Created:", post);
  } catch (error) {
    console.error("Error posting to BlueSky:", error);
  }
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
    const imageUrl = await generateImage(
      `${product} campaign in ${city} featuring ${
        festival || "a general theme"
      }.`
    );
    await SendPost(text, imageUrl, false);
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
    console.error("Error generating campaign:", error);
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
    const imageBase64 = await generateImageb(
      `${product} campaign in ${city} featuring ${
        festival || "a general theme"
      }.`
    );
    await SendPost(text, imageBase64, true);
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
    console.error("Error generating campaign (HF):", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.listen(3000, () => console.log("Server is running on port 3000"));
