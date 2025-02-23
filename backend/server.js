require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
    console.error("Error: GEMINI_API_KEY is missing in .env file");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

app.post("/chat", async (req, res) => {
    const { message } = req.body;
    
    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    try {
        const result = await model.generateContent(message);
        const reply = result.response.text() || "No response from AI";

        res.json({ reply });
    } catch (error) {
        console.error("Gemini API error:", error);
        res.status(500).json({ error: "Failed to generate response" });
    }
});

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
