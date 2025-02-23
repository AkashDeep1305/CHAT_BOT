import './App.css';

import React from "react";
import ChatBot from "./components/ChatBot";

const App = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <ChatBot />
    </div>
  );
};

export default App;
