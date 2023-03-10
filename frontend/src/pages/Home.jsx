import React, { useState } from "react";
import { useLogOut } from "../hooks/useLogOut";
import { useAuthContext } from "../hooks/useAuthContext";
import "../Home.css";
import settingssvg from "../assets/settings.svg";
import Settings from "./Settings/Settings";
import UserMessage from "./UserMessage";
import Group from "./Group";

export default function Home() {
  const { logOut } = useLogOut();
  const { user } = useAuthContext();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [trigger, setTrigger] = useState(false);

  const username = user?.username;
  console.log("username: ", username);

  
 

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    console.log(`Message submitted: ${message}`);
    setMessages([...messages, message]);
    setMessage("");
  };

  const handleSettingsClick = () => {
    setTrigger(!trigger);
  };

  return (
    <div className="parent">
      <div className="top">
        <div className="groups">
          <Group />
          <Group />
          <Group />
          <Group />
          <Group />
          <Group />
          <Group />
          <Group />
        </div>

        <div className="info-sidebar">
          <p className="username">{username}</p>
          <img
            className="settings-svg"
            onClick={handleSettingsClick}
            src={settingssvg}
            alt=""
          />
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
                <UserMessage key={index} message={message} />
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
      {trigger && <Settings trigger={trigger} />}
    </div>
  );
}
