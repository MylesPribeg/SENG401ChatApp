import React from "react";
import avater from "../../assets/avater.svg";
export default function userMessage(props) {
  return (
    <div className="message-div">
      <img src={avater} alt="" />
      <h2 className="message-uname">{props.username}</h2>
      <h1 className="message-text">{props.message}</h1>
      <h3 className="message-time">{props.time}</h3>
    </div>
  );
}
