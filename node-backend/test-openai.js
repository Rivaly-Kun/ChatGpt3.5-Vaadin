require("dotenv").config(); // Load environment variables

// Test if the API key is loaded
if (process.env.OPENAI_API_KEY) {
    console.log("API key loaded successfully:", process.env.OPENAI_API_KEY.slice(0, 6) + "...");
} else {
    console.error("Error: OPENAI_API_KEY not found in the .env file.");
}
