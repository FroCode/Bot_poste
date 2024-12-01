import React from "react";
import Chatbot from "../components/Chatbot.js";

export default function Home() {
  return (
    <>
      {/* Main Page Content */}
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Welcome to Algerie Poste</h1>
        <p className="text-gray-600 mb-6">
          Explore our services and get instant support through our chatbot.
        </p>
      </div>

      {/* Chatbot Component */}
      <Chatbot />
    </>
  );
}
