import React from "react";
import avater from "../../assets/avater.svg";
import "./UserMessage.css"
import formatDistanceToNow from "date-fns/formatDistanceToNow"

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

export default function UserMessage(props) {
  return (
    
    <div className="messageCard">
      <div className="avatar"><img src={avater} alt=""/></div>
      <div className="messageContainer">
        <div className="messageTop"> 
          <h2 className="messageSender">{props.val.user}</h2>
          <h4 className="messageTime">{formatDistanceToNow(new Date(props.val.createdAt), { addSuffix: true })}</h4>
        </div>
        <h3 className="messageContent">{props.val.content}</h3>
      </div>
    </div>
  );
}

