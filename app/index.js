const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const rateLimiterMiddleware = require("./middlewares/rateLimiter");
const groqService = require("./services/groq");

const port = process.env.PORT || 3000;
const env = process.env.ENV || "UNSET";
console.log(`Environment: ${env}`);

const app = express();
app.set("trust proxy", true);
app.use(express.json());

app.use(rateLimiterMiddleware);
app.post("/chat", async (req, res) => {
  try {
    const body = req.body;
    const message = {
      role: "user",
      content: body.message,
    };
    const reply = await groqService(message);
    res.json({ reply: reply });
  } catch (error) {
    console.error("Error in chat controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
