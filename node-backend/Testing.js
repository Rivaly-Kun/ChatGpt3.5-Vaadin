require("dotenv").config(); // Load environment variables from .env file
console.log("Using OpenAI API key:", process.env.OPENAI_API_KEY);

const { OpenAI } = require("openai"); // Correct import

// Ensure the API key is loaded
if (!process.env.OPENAI_API_KEY) {
    console.error("Missing OpenAI API Key in environment variables.");
    process.exit(1);
}

// Create OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

(async () => {
    try {
        console.log("Sending hardcoded request to OpenAI...");

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: "What is paracetamol?" }],
        });

        const aiResponse = response.choices[0].message.content.trim();
        console.log("AI Response:", aiResponse);
    } catch (error) {
        console.error("Error communicating with OpenAI API:", error.response?.data || error.message);

        if (error.response?.status === 429) {
            console.error("Rate Limit exceeded. Please check your OpenAI account limits.");
        }
    }
})();
