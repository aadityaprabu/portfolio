import React, { useState, useEffect, useRef } from "react";
import backendApi from "../utils/backendApi";

const maxChatHistoryLimit = import.meta.env.VITE_MAX_CHAT_HISTORY_LIMIT;
const maxChatCharacters = import.meta.env.VITE_MAX_CHAT_CHARACTERS;

const Chat = ({ canLoadChat }) => {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const chatWindowRef = useRef(null);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (question.length > maxChatCharacters) {
      alert(
        `Your question is too long. Please keep it under ${maxChatCharacters} characters.`
      );
      return;
    }

    setLoading(true);
    setError(null);

    const recentHistory = chatHistory.slice(-maxChatHistoryLimit);
    const newUserMessage = {
      role: "user",
      content: question,
    };
    const payload = {
      chatHistory: recentHistory,
      message: newUserMessage,
    };
    const headers = {
      "Content-Type": "application/json",
      "User-Agent": import.meta.env.VITE_USER_AGENT,
    };
    setChatHistory((prevHistory) => [...prevHistory, newUserMessage]);
    setQuestion("");
    console.log(payload);

    const response = await backendApi.post("/chat", payload, headers);
    if (response.status == "success") {
      setChatHistory((prevHistory) => [
        ...prevHistory,
        {
          role: "assistant",
          content: response.data.reply,
        },
      ]);
    } else {
      setError(response.message);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Chat with Aaditya Prabu K's personal assistant</h2>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <div
        ref={chatWindowRef}
        style={{
          border: "1px solid #ccc",
          height: "400px",
          overflowY: "auto",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        {chatHistory.map((chat, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <p
              style={{
                fontWeight: "bold",
                color: chat.role === "user" ? "#007bff" : "#28a745",
              }}
            >
              {chat.role === "user" ? "You:" : "Assistant:"}
            </p>
            <p>{chat.content}</p>
          </div>
        ))}
        {loading && <p>Loading...</p>}
      </div>

      {!canLoadChat ? (
        <p>Loading chat...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your question here..."
            disabled={loading}
            style={{ width: "100%", minHeight: "100px", marginBottom: "10px" }}
          />
          <p style={{ fontSize: "12px", color: "gray" }}>
            Character count: {question.length} / {maxChatCharacters}
          </p>
          <button type="submit" disabled={loading || !question.trim()}>
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Chat;
