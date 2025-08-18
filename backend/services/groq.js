const api = require("./api");
const { Groq } = require("groq-sdk/index.mjs");
const groqApiKey = process.env.BACKEND_GROQ_API_KEY;
const groqApiUrl = process.env.BACKEND_GROQ_API_URL;
const groq = new Groq({ apiKey: groqApiKey });
const maxChatHistoryLimit = process.env.BACKEND_MAX_CHAT_HISTORY_LIMIT;
const maxChatCharacters = process.env.BACKEND_MAX_CHAT_CHARACTERS;

const getRandomWittyFallback = () => {
  const wittyFallbacks = require("../database/wittyFallbacks.json");
  const randomIndex = Math.floor(Math.random() * wittyFallbacks.length);
  return wittyFallbacks[randomIndex];
};
const isAllowedQuery = (query) => {
  const defenseLayer = require("../database/defenseLayer.json");
  const allowedTopics = defenseLayer.allowedTopics;
  const notAllowedTopics = defenseLayer.notAllowedTopics;
  const forbiddenPatterns = defenseLayer.forbiddenPatterns;
  query = query.toLowerCase();
  const isAllowedTopic = allowedTopics.some((topic) => query.includes(topic));
  const isNotAllowedTopic = notAllowedTopics.some((topic) =>
    query.includes(topic)
  );
  const forbiddenRegexes = forbiddenPatterns.map((p) => new RegExp(p, "i"));
  const isForbidden = forbiddenRegexes.some((regex) => regex.test(query));
  return (
    isAllowedTopic &&
    !isForbidden &&
    !isNotAllowedTopic &&
    query.length <= maxChatCharacters
  );
};

const groqService = async (chatHistory, message) => {
  if (!isAllowedQuery(message.content)) {
    return getRandomWittyFallback();
  }

  const systemInstruction =
    require("../database/systemInstruction.json").instruction;
  const portfolioData = require("../database/portfolio.json");

  const systemMessage = {
    role: "system",
    content: systemInstruction + JSON.stringify(portfolioData),
  };

  chatHistory = chatHistory.slice(-maxChatHistoryLimit);
  const messages = [systemMessage, ...chatHistory, message];
  const payload = {
    model: "meta-llama/llama-4-scout-17b-16e-instruct",
    messages: messages,
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${groqApiKey}`,
  };
  const response = await api.post(groqApiUrl, payload, headers);
  if (response.error) {
    console.error("Error in GROQ service:", response.error);
    return "Hi, my AI is currently unavailable.";
  }
  const reply = response.data.choices[0].message.content;
  return reply;
};

module.exports = groqService;
