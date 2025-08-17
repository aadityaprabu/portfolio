const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const express = require("express");
const rateLimiterMiddleware = require("./middlewares/rateLimiter");
const groqService = require("./services/groq");

const port = process.env.BACKEND_PORT || undefined;
const env = process.env.ENV || "UNSET";

console.log(`Environment: ${env}`);
console.log(`Backend port: ${port}`);

const app = express();
app.use(cors());
app.set("trust proxy", true);
app.use(express.json());

app.post("/chat", rateLimiterMiddleware, async (req, res) => {
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

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
