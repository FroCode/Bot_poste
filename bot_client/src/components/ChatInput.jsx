"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from 'uuid';
import ReactMarkdown from 'react-markdown';

const ChatInpute = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [sessionId, setSessionId] = useState(localStorage.getItem('session_id') || generateSessionId());
  const [lastInput, setLastInput] = useState("");  // Track the last valid input

  function generateSessionId() {
      const newSessionId = uuidv4();
      localStorage.setItem('session_id', newSessionId);
      return newSessionId;
  }

  function isValidInput(input) {
      return input.trim() !== "" && input !== lastInput;
  }

  const sendMessage = async () => {
      if (!isValidInput(userInput)) {
          setUserInput("");
          return;
      }

      const conversationText = chatHistory.map(msg => `${msg.role}: ${msg.text}`).join("\n");
      const currentQuery = conversationText + "\nUser: " + userInput;

      const response = await fetch("http://127.0.0.1:8000/ask", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              query: currentQuery,
              session_id: sessionId,
          }),
      });

      const data = await response.json();
      if (data.answer) {
          // Handle next steps or actionable suggestions
          let suggestedNextStep = "";
          if (userInput.toLowerCase().includes("where")) {
              suggestedNextStep = "Can you specify the city or region you're interested in? For example, Algiers, Oran, or Constantine.";
          } else if (userInput.toLowerCase().includes("how")) {
              suggestedNextStep = "Are you asking about the process or service? Let me know more details, and I can help you further!";
          }

          setChatHistory(prev => [
              ...prev,
              { role: 'user', text: userInput },
              { role: 'bot', text: data.answer + " " + suggestedNextStep }
          ]);
          setLastInput(userInput);
          setUserInput("");
      }
  };

  const clearHistory = async () => {
      await fetch("http://127.0.0.1:8000/clear_history", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              session_id: sessionId,
          }),
      });
      setChatHistory([]);
  };

  useEffect(() => {
      const chatBox = document.getElementById("chatBox");
      chatBox.scrollTop = chatBox.scrollHeight;
  }, [chatHistory]);

  return (
    <div className="p-4 border-t bg-blue flex items-center">
      <div className="relative flex items-center w-full">
      
        <input
          type="text"
          placeholder="Write a message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && userInput.trim()) {
              sendMessage();
            }
          }}
          className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0066FF] pr-12"
        />
        <button
          className="absolute right-2 text-white px-4 py-2 rounded-lg"
          onClick={sendMessage}
        >
          <Image
            src="send.svg"
            alt="Send"
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </button>
      </div>  
    </div>
  );
};

export default ChatInpute;
