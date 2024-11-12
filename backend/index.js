const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authroutes.js");
require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

app.use(express.json());

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: "GET, POST, OPTIONS,PUT,DELETE",
  allowedHeaders: ["Content-Type", "X-Auth-Token", "Origin", "Authorization"],
};

app.use(cors(corsOptions));

mongoose
  .connect(
    `mongodb://localhost:27017/decision_making`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("CONNECTED TO MONGODB");
  })
  .catch((err) => {
    console.error("FAILED TO CONNECT TO MONGODB");
    console.error(err);
  });

app.use("/api/", authRouter);

let chatHistory = [];

app.post("/ask", async (req, res) => {
  try {
    const { category, options, answers } = req.body;

    // Create a prompt for Gemini to generate dynamic questions
    const questionPrompt = `
            Category: ${category}
            Options: ${options.join(", ")}
            User has answered the following questions: ${answers.join("; ")}
            Please generate 5 more questions to help the user make a decision.
        `;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const response = await model.generateContent(questionPrompt);
    const dynamicQuestions =
      response.response.candidates[0].content.parts[0].text.split("\n");

    chatHistory.push({
      role: "User",
      text: `Category: ${category}, Options: ${options.join(", ")}`,
    });
    chatHistory.push({
      role: "Bot",
      text: `Dynamic Questions: ${dynamicQuestions.join(", ")}`,
    });

    res.json({ dynamicQuestions, chatHistory });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while processing your request.");
  }
});

app.post("/decision", async (req, res) => {
  try {
    const { category, options, answers, dynamicAnswers } = req.body;

    // Create a prompt for Gemini to make a decision
    const decisionPrompt = `
            Category: ${category}
            Options: ${options.join(", ")}
            User has answered the following questions: ${answers
              .concat(dynamicAnswers)
              .join("; ")}
            Please provide the best decision and a short explanation.
        `;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const response = await model.generateContent(decisionPrompt);
    const decisionText = response.response.candidates[0].content.parts[0].text;

    chatHistory.push({
      role: "User",
      text: `Final Answers: ${answers.concat(dynamicAnswers).join("; ")}`,
    });
    chatHistory.push({ role: "Bot", text: `Decision: ${decisionText}` });

    console.log(chatHistory);

    res.json({ decision: decisionText, chatHistory });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while processing your request.");
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server is starting on " + PORT);
});
