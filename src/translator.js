const translateText = async (text, targetLanguage) => {
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '48b0909c96mshee84fde120bc08bp1bfd2fjsndbe9e61ae400',  // Replace with your actual Rapid API key
            'X-RapidAPI-Host': 'claude-ai-claude-ai.p.rapidapi.com'
        },
        body: JSON.stringify({
            prompt: `Translate the following text to ${targetLanguage}:\n"${text}"`,
            model: "claude-3-opus-20240229"
        })
    };

    try {
        const response = await fetch('https://claude-ai-claude-ai.p.rapidapi.com/ai-assistant', options);
        const result = await response.json();
        return result.content;
    } catch (error) {
        console.error('Translation error:', error);
        throw new Error('Failed to translate text');
    }
};

// Example usage:
const translate = async () => {
    const languages = ['Marathi', 'Hindi', 'Gujarati', 'Bengali', 'Punjabi'];
    const textToTranslate = "Hello, how are you?";

    for (const language of languages) {
        try {
            const translatedText = await translateText(textToTranslate, language);
            console.log(`${language} translation:`, translatedText);
        } catch (error) {
            console.error(`Error translating to ${language}:`, error);
        }
    }
};

// Function to handle single translation
const translateToLanguage = async (text, language) => {
    try {
        const translatedText = await translateText(text, language);
        return translatedText;
    } catch (error) {
        console.error(`Error translating to ${language}:`, error);
        throw error;
    }
};

// Example of how to use the single translation function:
// translateToLanguage("Hello, how are you?", "Hindi")
//     .then(result => console.log("Translation:", result))
//     .catch(error => console.error("Error:", error));