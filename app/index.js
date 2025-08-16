require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();

const PORT = process.env.PORT;

app.use(cors());
// Simple route
app.get("/", (req, res) => {
  const data = {
    status: "✅ Express server is running!",
  };
  res.json(data);
});

// Test API endpoint
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express!", time: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
