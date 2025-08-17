const { Groq } = require("groq-sdk");
const groqApiKey = process.env.GROQ_API_KEY;
const groq = new Groq({ apiKey: groqApiKey });

const groqService = async (message) => {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: message.content }],
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
    });
    return chatCompletion.choices[0].message.content;
  } catch (error) {
    console.error("Error in groq service:", error);
    throw new Error("Failed to get response from Groq API");
  }
};

module.exports = groqService;
