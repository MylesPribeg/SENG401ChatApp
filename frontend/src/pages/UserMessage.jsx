import React from "react";
import avater from "../assets/avater.svg";
export default function userMessage(props) {
  return (
    <div className="message-div">
       <img src={avater} alt="" />
      <h1>{props.message}</h1>
    </div>
  );
}
