import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import Suggestions from "./Suggestions"; // استيراد مكون الاقتراحات

const ChatMessage = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [sessionId, setSessionId] = useState(
    localStorage.getItem("session_id") || generateSessionId()
  );
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(true);
  const [typingTimeout, setTypingTimeout] = useState(null);

  const messagesEndRef = useRef(null);

  function generateSessionId() {
    const newSessionId = uuidv4();
    localStorage.setItem("session_id", newSessionId);
    return newSessionId;
  }

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory]);

  const sendMessage = async (messageText = userInput, answer = null) => {
    if (typeof messageText !== "string" || !messageText.trim()) return; // التحقق من النوع

    const currentTime = new Date().toLocaleTimeString();
    const newMessage = { role: "user", text: messageText, time: currentTime };
    setChatHistory((prev) => [...prev, newMessage]);

    // إذا تم إرسال إجابة، إضافة الإجابة من البوت
    if (answer) {
      const botMessage = {
        role: "bot",
        text: answer,
        time: currentTime,
      };
      setChatHistory((prev) => [...prev, botMessage]);
    } else {
      // إرسال استفسار إلى البوت إذا لم يكن هناك جواب
      try {
        const response = await fetch("http://127.0.0.1:8000/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: messageText, session_id: sessionId }),
        });

        const data = await response.json();
        if (data.answer) {
          const botMessage = {
            role: "bot",
            text: data.answer,
            time: currentTime,
          };
          setChatHistory((prev) => [...prev, botMessage]);
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }

    setUserInput("");
  };

  const clearHistory = async () => {
    await fetch("http://127.0.0.1:8000/clear_history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId }),
    });
    setChatHistory([]);
  };

  const handleQuestionSelect = (questionText, answer) => {
    sendMessage(questionText, answer); 
  };

  return (
    <div className="flex flex-col h-[590px]">
      <div className="flex-1 overflow-y-auto bg-white p-2" id="chatBox">
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
          {msg.role === "bot" && (
  <div>
    <div className="flex gap-2 items-center">
      <p className="text-sm font-jaldi font-bold ml-16 opacity-70 flex-shrink-0">
        Algerie Post
      </p>
    </div>

    <div className="flex items-start ml-2 gap-2">
      <div className="flex flex-col justify-start items-center">
        <Image
          src="/algeriePostLogo.svg"
          alt="Algerie Post"
          width={60}
          height={60}
          className="rounded-full border-2 border-blue p-1 mb-2" 
        />
      </div>

      <div className="flex-grow">
        <div
          className="p-3 rounded-xl font-jaldi text-left text-md bg-yellow text-black"
          style={{ maxWidth: "80%", wordBreak: "break-word" }}
        >
          {msg.text}
        </div>
        <p className="text-xs ml-2 font-jaldi opacity-70 flex-shrink-0">
          {msg.time}
        </p>
      </div>
    </div>
  </div>
)}

            {msg.role === "user" && (
              <div>
                <p className="text-xs font-jaldi text-end mr-1  mt-1 opacity-70">
                  {msg.time}
                </p>
                <div className="flex justify-end">
                  <div
                    className="p-3 rounded-xl text-left mr-3 font-jaldi text-md bg-blue text-white"
                    style={{
                      maxWidth: "100%",
                      wordBreak: "break-word",
                      maxHeight: "200px",
                      overflowY: "auto",
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <Suggestions
        onQuestionSelect={handleQuestionSelect}
        setIsSuggestionsVisible={setIsSuggestionsVisible}
      />

      <div className="relative bg-transparent p-2 flex items-center w-full mt-auto">
        <div className="flex items-center w-full relative">
          <input
            type="text"
            placeholder="Write a message..."
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
              setIsSuggestionsVisible(false);
              if (typingTimeout) clearTimeout(typingTimeout);
              const timeout = setTimeout(() => {
                setIsSuggestionsVisible(true);
              }, 1000);
              setTypingTimeout(timeout);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && userInput.trim()) {
                sendMessage();
              }
            }}
            className="flex-1 border border-zinc-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0066FF]  placeholder:text-sm"
          />

          <button
            className="absolute right-12 text-white bg-transparent px-2 py-1"
            onClick={clearHistory}
          >
            <Image src="/delete.png" alt="Clear Chat" width={20} height={20} />
          </button>

          <button
            className="absolute right-2 text-white bg-yellow-500 px-4 py-2 rounded-lg"
            onClick={() => sendMessage()}
          >
            <Image
              src="/send.svg"
              alt="Send"
              width={20}
              height={20}
              className=""
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
