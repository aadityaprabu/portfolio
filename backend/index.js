const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const util = require("util");
const express = require("express");
const rateLimiterMiddleware = require("./middlewares/rateLimiter");
const groqService = require("./services/groq");
const { FINGERPRINT_ID } = require("./constants/contants");
const response = require("./models/response");
const requestLogger = require("./middlewares/requestLogger");
const port = process.env.BACKEND_PORT || undefined;
const env = process.env.ENV || "UNSET";

console.log(`Environment: ${env}`);
console.log(`Backend port: ${port}`);

const app = express();
app.use(cors());
app.set("trust proxy", true);
app.use(express.json());
app.use(requestLogger);

app.get("/portfolio", async (req, res) => {
  try {
    const portfolioData = require("./database/portfolio.json");
    const successResponse = response.success(
      portfolioData,
      "portfolio data",
      200
    );
    res.json(successResponse);
  } catch (error) {
    console.error("Error loading portfolio data:", error);
    const errorResponse = response.error("internal server error", 500);
    res.status(500).json(errorResponse);
  }
});
app.post("/chat", rateLimiterMiddleware, async (req, res) => {
  try {
    const body = req.body;
    const chatHistory = body.chatHistory;
    const message = body.message;
    
    const reply = await groqService(chatHistory, message);

    const successResponse = response.success(
      { reply: reply },
      "chat response",
      200
    );
    res.json(successResponse);
  } catch (error) {
    console.error("Error in chat controller:", error);
    const errorResponse = response.error("internal server error", 500);
    res.status(500).json(errorResponse);
  }
});
app.post("/set-fingerprint-id", async (req, res) => {
  try {
    const { visitorId } = req.body;
    res.cookie(FINGERPRINT_ID, visitorId, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    const successResponse = response.success(
      null,
      "fingerprint cookie set successfully",
      200
    );
    res.json(successResponse);
  } catch (error) {
    console.error("Error setting fingerprint cookie:", error);
    const errorResponse = response.error("internal server error", 500);
    res.status(500).json(errorResponse);
  }
});
app.get("/ping", (req, res) => {
  const successResponse = response.success(null, "pong", 200);
  res.json(successResponse);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
