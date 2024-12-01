"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import WelcomePage from "./WelcomePage";
import ChatMessages from "./ChatMessages";
import ChatInpute from "./ChatInput";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isWelcomePage, setIsWelcomePage] = useState(true);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const messagesEndRef = useRef(null);

  const toggleChatbox = () => {
    if (isOpen) {
      setIsOpen(false);
      setIsWelcomePage(true);
      setMessages([]);
    } else {
      setIsOpen(true);
      setIsWelcomePage(true);
    }
  };

  const startChat = () => {
    setIsWelcomePage(false);
    setMessages([]);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="fixed  bottom-8 right-8 z-50">
      {isOpen && isWelcomePage && (
        <div className="flex flex-col bg-white shadow-lg rounded-lg w-[380px] h-[500px] overflow-hidden border border-gray">
          <div className="text-white  w-[380px] bg-blue h-[90px] border-b border-slate-200 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center ml-8 gap-8">
              <div className="rounded-full bg-white border-2 border-blue p-2">
                <Image
                  src="/algeriePostLogo.svg"
                  alt="Chatbot Logo"
                  width={40}
                  height={40}
                />
              </div>
              <div className="flex flex-col">
                <h2 className="font-jaldi text-2xl">Chatbot</h2>
                <h2 className="font-jaldi text-xl opacity-50">
                  Support Agent
                </h2>
              </div>
            </div>
            <div>
              <button onClick={toggleChatbox} className="text-2xl font-bold">
                &times;
              </button>
            </div>
          </div>
          <WelcomePage startChat={startChat} />
        </div>
      )}
{isOpen && !isWelcomePage && (
  <div className="flex flex-col bg-white shadow-lg rounded-lg w-[380px] h-[680px] overflow-hidden border border-gray">
   
    <div className="text-white bg-blue h-[80px] border-b px-4 py-3 border-slate-200 flex items-center justify-between fixed  w-[380px] z-20">
      <div className="flex gap-6 mx-4">
        <div className="rounded-full bg-white -border2 border-blue p-2">
          <Image
            src="/algeriePostLogo.svg"
            alt="Chatbot Logo"
            width={40}
            height={40}
          />
        </div>
        <div className="flex flex-col">
          <h2 className="font-jaldi text-2xl">Chatbot</h2>
          <h2 className="font-jaldi text-xl opacity-50">
            Support Agent
          </h2>
        </div>
      </div>
      <div>
        <button onClick={toggleChatbox} className="text-2xl font-bold">
          &times;
        </button>
      </div>
    </div>

    <div className="mt-[80px] overflow-y-auto h-[calc(100%-80px)]">
      <ChatMessages messages={messages} />
    </div>
  </div>
)}


      {!isOpen && (
        <button
          onClick={toggleChatbox}
          className="px-4 py-2 rounded-full shadow-md text-white"
        >
          <Image src="iconPopup.svg" alt="iconPopup" width={60} height={60} />
        </button>
      )}
    </div>
  );
};

export default Chatbot;
