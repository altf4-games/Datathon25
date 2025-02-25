const express = require("express");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fetch = require("node-fetch");
const cors = require("cors");
const { fal } = require("@fal-ai/client");
const sharp = require("sharp");
const { HfInference } = require("@huggingface/inference");
const { BskyAgent } = require("@atproto/api");
const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");
const path = require("path");
const { postTweet } = require("./twitterbot");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const RECENT_POSTS_FILE = path.join(__dirname, "recentPosts.txt");

// Load recent posts from file if it exists
let recentPosts = [];
if (fs.existsSync(RECENT_POSTS_FILE)) {
  try {
    const data = fs.readFileSync(RECENT_POSTS_FILE, "utf8");
    recentPosts = JSON.parse(data);
  } catch (error) {
    console.error("Error parsing recent posts file:", error);
    recentPosts = [];
  }
}

const clientHF = new HfInference(process.env.HF);
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
  maxBudget,
  userPrompt,
  festival,
  companyName,
  callToAction,
  city,
}) {
  return `Create a marketing campaign for a product in under 300 characters; don't use markdown. Company: ${companyName}. Product: ${product}. Target Audience: ${targetAudience}. Max Budget: ${maxBudget}. ${
    userPrompt ? `Campaign Details: ${userPrompt}.` : ""
  } ${
    festival ? `Align with ${festival} festival.` : "General campaign."
  } Call to Action: ${callToAction}. Keep it very short.`;
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
    const image = await clientHF.textToImage({
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

/**
 * Save recent posts array to file.
 */
function saveRecentPosts() {
  try {
    fs.writeFileSync(RECENT_POSTS_FILE, JSON.stringify(recentPosts, null, 2));
  } catch (error) {
    console.error("Error saving recent posts to file:", error);
  }
}

/**
 * SendPost creates a BlueSky post. It converts the image (either a base64 string or URL)
 * into a buffer and uploads it via agent.uploadBlob. After posting, it stores the post URI
 * in the recentPosts array (only keeping the most recent 2) and saves the data to a file.
 */
async function SendPost(txt, image, isBase64 = false) {
  try {
    await agent.login({
      identifier: process.env.BSKY_USERNAME,
      password: process.env.BSKY_PASSWORD,
    });

    let embedData;
    let imageBuffer;

    if (isBase64) {
      imageBuffer = Buffer.from(image, "base64");
    } else {
      const response = await fetch(image);
      if (!response.ok) {
        throw new Error("Failed to fetch image from URL");
      }
      imageBuffer = await response.buffer();
    }

    const uploadResponse = await agent.uploadBlob(imageBuffer, {
      encoding: "image/jpeg",
    });

    embedData = {
      $type: "app.bsky.embed.images",
      images: [
        {
          alt: "Generated Image",
          image: uploadResponse.data.blob,
          aspectRatio: { width: 1000, height: 500 },
        },
      ],
    };

    const post = await agent.post({
      text: txt,
      embed: embedData,
      createdAt: new Date().toISOString(),
    });

    // Store the post URI. Keep only the two most recent posts.
    recentPosts.unshift({ uri: post.uri });
    if (recentPosts.length > 2) {
      recentPosts = recentPosts.slice(0, 2);
    }
    // Post the campaign text and generated image to Twitter.
    await postTweet(txt, imageBuffer);
    // Save the updated posts array to file.
    saveRecentPosts();

    return post;
  } catch (error) {
    console.error("Error posting to BlueSky or Twitter:", error);
    throw error;
  }
}

async function generateCampaign(data) {
  const {
    product,
    targetAudience,
    maxBudget,
    userPrompt,
    companyName,
    callToActionLink,
    city,
  } = data;

  if (
    !product ||
    !targetAudience ||
    !maxBudget ||
    !userPrompt ||
    !companyName ||
    !callToActionLink ||
    !city
  ) {
    throw new Error("Missing required fields.");
  }

  const festival = getCurrentFestival();
  // Build prompt for Gemini
  const prompt = generateMarketingPrompt({
    product,
    targetAudience,
    maxBudget,
    userPrompt,
    festival,
    companyName,
    callToAction: callToActionLink,
    city,
  });

  // Ensure calling Gemini generation with valid prompt
  const result = await model.generateContent(prompt);
  const text = result.response.text();

  const imageDescription = `${product} campaign in ${city} with a max budget of ${maxBudget} featuring ${
    festival || "a general theme"
  } targeting ${targetAudience}. Company: ${companyName}. ${userPrompt}`;
  const imageUrl = await generateImage(imageDescription);

  return {
    text,
    imageUrl,
    bestCampaignTime: getBestCampaignTime(),
    currentFestival: festival || "None",
  };
}

app.post("/generate-campaign", async (req, res) => {
  try {
    const campaignDetails = await generateCampaign(req.body);
    res.json({
      success: true,
      details: campaignDetails,
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
      maxBudget,
      userPrompt,
      companyName,
      callToActionLink,
      city,
    } = req.body;
    if (
      !product ||
      !targetAudience ||
      !maxBudget ||
      !userPrompt ||
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
      maxBudget,
      userPrompt,
      festival,
      companyName,
      callToAction: callToActionLink,
      city,
    });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const imageBase64 = await generateImageb(
      `${product} campaign in ${city} with a max budget of ${maxBudget} featuring ${
        festival || "a general theme"
      } targeting ${targetAudience}. Company: ${companyName}. ${userPrompt}`
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

app.post("/generate-campaign-plans", async (req, res) => {
  try {
    const {
      companyName,
      product,
      targetAudience,
      maxBudget,
      userPrompt,
      callToActionLink,
      campaignDate,
      city,
    } = req.body;

    if (
      !product ||
      !targetAudience ||
      !maxBudget ||
      !userPrompt ||
      !companyName ||
      !callToActionLink ||
      !city
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields.",
      });
    }

    const prompt = `Based on the following campaign details:
Company: ${companyName}
Product: ${product}
Target Audience: ${targetAudience}
Max Budget: ${maxBudget}
Campaign Details: ${userPrompt}
Call to Action Link: ${callToActionLink}
Campaign Date: ${campaignDate || "Not specified"}
City: ${city}

Generate three distinct campaign plans. For each plan, provide a detailed description and an estimated cost. Sort the plans by increasing cost. Format your answer with:
Plan 1:
Description: <detailed description>
Estimated Cost: <cost>

Plan 2:
Description: <detailed description>
Estimated Cost: <cost>

Plan 3:
Description: <detailed description>
Estimated Cost: <cost>`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Split and parse plans
    const plansArray = text
      .split(/Plan\s*\d+:/)
      .map((plan) => plan.trim())
      .filter((plan) => plan.length > 0);

    const plans = plansArray.map((plan) => {
      const costMatch = plan.match(/Estimated Cost:\s*([^\n]+)/);
      const cost = costMatch ? costMatch[1].trim() : "N/A";
      return { text: plan, cost };
    });

    res.json({
      success: true,
      details: plans,
    });
  } catch (error) {
    console.error("Error generating campaign plans:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate campaign plans",
    });
  }
});

// NEW ENDPOINT: Retrieve the most recent 2 posts with replies and sentiment analysis on each reply.
app.get("/recent-posts", async (req, res) => {
  try {
    const postsData = [];
    await agent.login({
      identifier: process.env.BSKY_USERNAME,
      password: process.env.BSKY_PASSWORD,
    });

    console.log(recentPosts);

    // Loop through each stored post
    for (const storedPost of recentPosts) {
      // Retrieve the complete thread for the post.
      const threadResponse = await agent.getPostThread({ uri: storedPost.uri });
      const thread = threadResponse.data.thread;
      // Assume the main post is available as thread.post
      const { text, likeCount, repostCount } = thread.post;

      // Process replies: for each reply, run sentiment analysis.
      const repliesWithSentiment = [];
      for (const reply of thread.replies || []) {
        const replyText = reply.text;
        const classification = await client.textClassification({
          model: "nlptown/bert-base-multilingual-uncased-sentiment",
          inputs: replyText,
          provider: "hf-inference",
        });
        console.log(
          "Classification result for reply:",
          replyText,
          classification
        );
        repliesWithSentiment.push({
          text: replyText,
          sentiment: classification,
        });
      }

      postsData.push({
        uri: storedPost.uri,
        text,
        likeCount,
        repostCount,
        replies: repliesWithSentiment,
      });
    }

    res.json({ success: true, posts: postsData });
  } catch (error) {
    console.error("Error retrieving recent posts:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Initialize Telegram Bot
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome to the Marketing Campaign Bot!");
});

bot.onText(/\/generate_campaign (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const params = match[1].split(",");
  const [
    product,
    targetAudience,
    maxBudget,
    userPrompt,
    companyName,
    callToActionLink,
    city,
  ] = params;

  try {
    // 1. Generate the campaign
    const campaignDetails = await generateCampaign({
      product,
      targetAudience,
      maxBudget,
      userPrompt,
      companyName,
      callToActionLink,
      city,
    });

    // 2. Post to BlueSky (use imageUrl or buffer depending on your implementation)
    await SendPost(campaignDetails.text, campaignDetails.imageUrl, false);

    // 3. Respond in Telegram
    bot.sendMessage(
      chatId,
      `Campaign posted to BlueSky! and X!\n\nText: ${campaignDetails.text}`
    );
  } catch (error) {
    console.error("Error generating campaign:", error);
    bot.sendMessage(chatId, "Error generating campaign. Please try again.");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
