require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');

// Add debug logging
console.log('Environment variables loaded:', {
  hasConsumerKey: !!process.env.TWITTER_CONSUMER_KEY,
  hasConsumerSecret: !!process.env.TWITTER_CONSUMER_SECRET,
  hasAccessToken: !!process.env.TWITTER_ACCESS_TOKEN,
  hasAccessSecret: !!process.env.TWITTER_ACCESS_SECRET,
});

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_CONSUMER_KEY,
  appSecret: process.env.TWITTER_CONSUMER_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

async function testTwitterAuth() {
  try {
    // Verify credentials
    const user = await twitterClient.v2.me();
    console.log('Authentication successful:', user);
    return true;
  } catch (error) {
    console.error('Authentication failed:', error);
    return false;
  }
}

// Replace the postTweet function with the updated version:
async function postTweet(text, imageBuffer) {
  try {
    if (!await testTwitterAuth()) {
      throw new Error('Twitter authentication failed');
    }

    let response;
    // If an image buffer is provided, upload and include media in the tweet.
    if (imageBuffer) {
      // Upload image using Twitter v1.1 endpoint.
      const mediaId = await twitterClient.v1.uploadMedia(imageBuffer, { mimeType: 'image/jpeg' });
      response = await twitterClient.v2.tweet({
        text: text,
        media: { media_ids: [mediaId] },
      });
    } else {
      response = await twitterClient.v2.tweet({ text: text });
    }
    console.log('Tweet posted successfully:', response);
    return response;
  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      data: error.data,
    });
    throw error;
  }
}

// Test tweet
if (require.main === module) {
  postTweet('Test tweet ' + new Date().toISOString())
    .then(response => {
      console.log('Test complete:', response);
      process.exit(0);
    })
    .catch(error => {
      console.error('Test failed:', error);
      process.exit(1);
    });
}

module.exports = { postTweet };