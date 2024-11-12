const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
dotenv.config();

const { GoogleGenerativeAI } = require("@google/generative-ai");
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

let chatHistory = [];

app.post('/ask', async (req, res) => {
    try {
        const { category, options, answers } = req.body;

        // Create a prompt for Gemini to generate dynamic questions
        const questionPrompt = `
            Category: ${category}
            Options: ${options.join(', ')}
            User has answered the following questions: ${answers.join('; ')}
            Please generate 5 more questions to help the user make a decision.
        `;

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const response = await model.generateContent(questionPrompt);
        const dynamicQuestions = response.response.candidates[0].content.parts[0].text.split('\n');

        chatHistory.push({ role: 'User', text: `Category: ${category}, Options: ${options.join(', ')}` });
        chatHistory.push({ role: 'Bot', text: `Dynamic Questions: ${dynamicQuestions.join(', ')}` });

        
        res.json({ dynamicQuestions, chatHistory });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while processing your request.');
    }
});

app.post('/decision', async (req, res) => {
    try {
        const { category, options, answers, dynamicAnswers } = req.body;

        // Create a prompt for Gemini to make a decision
        const decisionPrompt = `
            Category: ${category}
            Options: ${options.join(', ')}
            User has answered the following questions: ${answers.concat(dynamicAnswers).join('; ')}
            Please provide the best decision and a short explanation.
        `;

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const response = await model.generateContent(decisionPrompt);
        const decisionText = response.response.candidates[0].content.parts[0].text;

        chatHistory.push({ role: 'User', text: `Final Answers: ${answers.concat(dynamicAnswers).join('; ')}` });
        chatHistory.push({ role: 'Bot', text: `Decision: ${decisionText}` });

        console.log(chatHistory);

        res.json({ decision: decisionText, chatHistory });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while processing your request.');
    }
});

// Serve the frontend HTML
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
