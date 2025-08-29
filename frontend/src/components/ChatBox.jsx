import React, { useState, useEffect, useRef } from "react";
import backendApi from "../utils/backendApi.js";

const maxChatHistoryLimit = import.meta.env.VITE_MAX_CHAT_HISTORY_LIMIT || 5;
const maxChatCharacters = import.meta.env.VITE_MAX_CHAT_CHARACTERS || 500;

const ChatBox = ({ canLoadChat, handleAnimationChange }) => {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      role: "assistant",
      content: "Hello! How can I assist you today?",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleError = (message) => {
    setError(message);
    handleAnimationChange("Angry");
  };

  const chatWindowRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    if (question.length > maxChatCharacters) {
      alert(
        `Your question is too long. Please keep it under ${maxChatCharacters} characters.`
      );
      return;
    }

    setLoading(true);
    setError(null);

    const recentHistory = chatHistory.slice(-maxChatHistoryLimit);

    const newUserMessage = { role: "user", content: question };
    setChatHistory((prev) => [...prev, newUserMessage]);
    setQuestion("");

    const payload = {
      chatHistory: recentHistory,
      message: newUserMessage,
    };

    const headers = {
      "Content-Type": "application/json",
      "User-Agent": import.meta.env.VITE_USER_AGENT || "default-user-agent",
    };

    try {
      const response = await backendApi.post("/chat", payload, headers);

      if (response.status === "success") {
        handleAnimationChange("Talking");
        setTimeout(() => {
          handleAnimationChange("Idle");
        }, 3000);
        setChatHistory((prev) => [
          ...prev,
          { role: "assistant", content: response.data.reply },
        ]);
      } else {
        handleError(response.message || "Something went wrong.");
      }
    } catch (err) {
      handleError("Network error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white/80 rounded-xl shadow-lg border border-gray-200 flex flex-col md:w-full md:max-w-lg sm:max-w-full sm:w-full">
      <div className="flex flex-col flex-1 p-4">
        {error && (
          <div className="bg-red-100 text-red-700 rounded-lg px-4 py-2 text-sm text-center mb-2 sticky top-0 z-10">
            Error: {error}
          </div>
        )}
        <div
          className="overflow-y-auto flex-1 mb-2 space-y-2 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-blue-50"
          ref={chatWindowRef}
          style={{ maxHeight: "350px", minHeight: "200px" }}
        >
          {chatHistory.map((message, index) => (
            <div
              key={index}
              className={
                message.role === "user"
                  ? "bg-green-100 text-green-800 rounded-lg px-4 py-2 shadow w-full text-justify"
                  : "bg-blue-100 text-blue-800 rounded-lg px-4 py-2 shadow w-full text-justify"
              }
            >
              <span className="font-semibold">
                {message.role === "user" ? "You:" : "Assistant:"}
              </span>{" "}
              {message.content}
            </div>
          ))}
          {loading && <p className="text-gray-500">Loading...</p>}
        </div>
        {!canLoadChat ? (
          <p className="text-center text-gray-400">Loading chat...</p>
        ) : (
          <form className="flex flex-col gap-2" onSubmit={handleSend}>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your message..."
              disabled={loading}
              className="resize-none rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800"
              style={{ minHeight: "48px", maxHeight: "120px" }}
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                {question.length} / {maxChatCharacters}
              </span>
              <button
                type="submit"
                disabled={loading || !question.trim()}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg shadow transition-all duration-150 disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
