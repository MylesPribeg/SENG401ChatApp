import React from "react";
import avater from "../../assets/avater.svg";
import "./UserMessage.css"
// export default function userMessage(props) {
//   return (
//     <div className="message-div">
//       <img src={avater} alt="" />
//       <h2 className="message-uname">{props.username}</h2>
//       <h1 className="message-text">{props.message}</h1>
//       <h3 className="message-time">{props.time}</h3>
//     </div>
//   );
// }

export default function userMessage(props) {
  return (
    <div className="messageCard">
      <div className="avatar"><img src={avater} alt=""/></div>
      
      <div className="messageContainer">
        
        <div className="messageTop"> 
          <h2 className="messageSender">Username</h2>
          <h4 className="messageTime">2 Hours ago</h4>
        </div>

        <h3 className="messageContent">
        {props.message}
        </h3>

      </div>

    </div>
  )
}