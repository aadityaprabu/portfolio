require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Simple route
app.get("/", (req, res) => {
  res.send("✅ Express server is running!");
});

// Test API endpoint
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express!", time: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
