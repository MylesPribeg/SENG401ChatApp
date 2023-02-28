import React, { useState } from "react";
import { useLogOut } from "../hooks/useLogOut";
import { useAuthContext } from "../hooks/useAuthContext";
import "../Home.css";

export default function Home() {
  const { logOut } = useLogOut();
  const { user } = useAuthContext();
  const [message, setMessage] = useState("");

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    console.log(`Message submitted: ${message}`);
    setMessage("");
  };

  return (
    <div className="parent">
      <div className="top">
        <div className="group-container">
          <h1>Groups</h1>
        </div>
      </div>
      <div className="main">
        <div className="chats">
          <h1>Chats</h1>
        </div>
        <div className="chat-chatbox-area">
          <div className="message-area">
            <div className="message-container">
              <h1>First MESSAGE</h1>
              <h1>Stuff</h1>
              <h1>Stuff</h1>
              <h1>Stuff</h1>
              <h1>Stuff</h1>
              <h1>Stuff</h1>
              <h1>Stuff</h1>
              <h1>Stuff</h1>
              <h1>Stuff</h1>
              <h1>Stuff</h1>
              <h1>Stuff</h1>
              <h1>LAST mesSAGE</h1>
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
