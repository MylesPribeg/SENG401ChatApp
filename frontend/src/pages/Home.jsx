import React, { useState } from "react";
import { useLogOut } from "../hooks/useLogOut";
import { useAuthContext } from "../hooks/useAuthContext";
import "../Home.css";

export default function Home() {
  const { logOut } = useLogOut();
  const { user } = useAuthContext();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    console.log(`Message submitted: ${message}`);
    setMessages([...messages, message]);
    setMessage("");
  };

  return (
    <div className="parent">
      <div className="top">
        <div className="groups">
          <h1>Group1 </h1>
          <h1>Group2 </h1>
          <h1>Group3 </h1>
        </div>
        <div className="info-sidebar">
          <button onClick={logOut}>Log Out</button>
        </div>
      </div>
      <div className="main">
        <div className="chats">
          <h1>Chats</h1>
        </div>
        <div className="chat-chatbox-area">
          <div className="message-area">
            <div className="message-container">
              {messages.map((message, index) => (
                <h1 key={index}>{message}</h1>
              ))}
            </div>
          </div>
          <div className="chat-box">
            <form onSubmit={handleMessageSubmit}>
              <input
                type="text"
                placeholder="Type a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
