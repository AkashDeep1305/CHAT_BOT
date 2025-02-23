import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css';


const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const chatEndRef = useRef(null);
  const editorWrapperRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleEditorClick = () => {
    const textarea = editorWrapperRef.current?.querySelector("textarea");
    if (textarea) {
      textarea.focus();
    }
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
  };

  const checkForBotName = (message) => {
    const lowerCaseMessage = message.toLowerCase();
    if (
      lowerCaseMessage.includes("your name") ||
      lowerCaseMessage.includes("who are you") ||
      lowerCaseMessage.includes("introduce yourself") ||
      lowerCaseMessage.includes("you are called as")
    ) {
      return "I am Raya, your AI assistant! How can I help you today?";
    }
    return null;
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages([...messages, newMessage]);
    setLoading(true);
    setError(null);

    const botResponse = checkForBotName(input);
    if (botResponse) {
      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
      setLoading(false);
      setInput("");
      return;
    }

    try {
      const response = await axios.post("http://localhost:2000/chat", { message: input });
      const botMessage = { sender: "bot", text: response.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to fetch response. Please try again.");
    }

    setLoading(false);
    setInput("");
  };

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto p-4 bg-gray-100 rounded-lg border shadow-md">
      <div className="h-160 w-98 overflow-y-auto p-2 border-bt rounded-lg hide-scrollbar">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 my-2 mx-2 rounded  ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-400 text-white break-word whitespace-normal"}`}>
            <ReactMarkdown components={{
              pre: ({ children }) => {
                const codeText = children.props.children; // Extract text inside <pre>
                return (
                  <div className="relative bg-gray-900 text-white rounded-lg p-2 mt-2">
                    {/* Bash label */}
                    <div className="absolute top-0 left-0 bg-gray-600 text-sm bold px-2 pb-3 pr-3 py-1 rounded-tl-lg ">
                      Bash
                    </div>
                    {/* Copy button */}
                    <button
                      onClick={() => handleCopy(codeText)}
                      className="absolute top-0 right-0 pb-2 bg-gray-600 text-white text-xs px-2 py-1 rounded-tr-lg hover:bg-gray-700"
                    >
                      Copy
                    </button>
                    <pre style={{ marginTop: '4rem' }}>
                      {children}
                    </pre>
                  </div>
                );
              },
            }} >{msg.text}</ReactMarkdown>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className=" relative flex w-full mt-4 ml-4 mb-4 h-8">
        <div ref={editorWrapperRef}
          className="flex-1 scrollable-editor glow-border rounded cursor-text" onClick={handleEditorClick}
        >
          <Editor
            value={input}
            onValueChange={setInput}
            highlight={input => Prism.highlight(input, Prism.languages.javascript, "javascript")}
            padding={10}
            className="p-2 text-white h-auto"
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16
            }}
            placeholder="Type a message..."
            disabled={loading}

          />
        </div>
        <div onClick={!loading ? sendMessage : undefined} className="mr-3 mt-10 text-white  cursor absolute position-icon" disabled={loading}>
          {loading ? (
            <div className="spinner"></div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="28"
              className="bi bi-send"
              viewBox="0 0 16 16"
            >
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="40%" stopColor="#0071e3" />
                  <stop offset="100%" stopColor="#00bcd4" />
                </linearGradient>
              </defs>
              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" fill="url(#gradient)" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
