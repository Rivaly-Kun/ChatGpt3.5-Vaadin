require("dotenv").config(); // Load environment variables from .env file
console.log("Using OpenAI API key:", process.env.OPENAI_API_KEY);

const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai"); // Correct import

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Ensure the API key is loaded
if (!process.env.OPENAI_API_KEY) {
    console.error("Missing OpenAI API Key in environment variables.");
    process.exit(1);
}

// Create OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Delay function to prevent overloading requests
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Handle query requests
app.post("/query", async (req, res) => {
    const { query } = req.body;

    if (!query) {
        return res.status(400).json({ error: "Query is required" });
    }

    try {
        console.log("Sending request to OpenAI...");

        // Wait for a short period before making the request to avoid rate limiting
        await sleep(1000); // Delay of 1 second

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: query }],
        });

        const aiResponse = response.choices[0].message.content.trim();
        res.json({ response: aiResponse });

    } catch (error) {
        console.error("Error communicating with OpenAI API:", error.response?.data || error.message);

        if (error.response?.status === 429) {
            console.error("Rate Limit exceeded. Please check your OpenAI account limits.");
        }

        res.status(500).json({ error: "Failed to process the query" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Node.js server running on http://localhost:${PORT}`);
});
