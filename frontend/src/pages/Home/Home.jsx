import React, { useState } from "react";
import { useLogOut } from "../../hooks/useLogOut";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./Home.css";
import settingssvg from "../../assets/settings.svg";
import UserMessage from "./UserMessage";
import Group from "./Group";
import { useNavigate } from "react-router-dom";
import { useColour } from "../../hooks/useColour";
import { Box } from "@mui/system";
export default function Home() {
  const { logOut } = useLogOut();
  const { user } = useAuthContext();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);


  const navigate = useNavigate();

  const {getBackGroundColor} = useColour()

  const [currentActiveGroupIndex, setCurrentActiveGroupIndex] = useState(0)
  const username = user?.username;


  const groups = [

    {
      id:0,
      index:0,
      active:true,
      name:"hello world",
      messages:[
        "dummy message 1",
        "dummy message 2"
      ]
    },{
      id:1,
      index:1,
      active:false,
      name:"test",
      messages:[
        "dummy message 1",
        "dummy message 2"
      ]
    },{
      id:2,
      index:2,
      active:false,
      name:"not pog",
      messages:[
        "dummy message 1",
        "dummy message 2"
      ]
    },
  ]
  const test = (index) =>{
    
  }
  const renderGroups = (groups) => {
    return groups.map((group, index) => {
      return <Group key={index} val={group} currentGroup={currentActiveGroupIndex} clickHandler={ () => {
        console.log("group index pressed: " + index + "previously active index " +  currentActiveGroupIndex)
        groups[currentActiveGroupIndex].active=false
        groups[index].active=true
        setCurrentActiveGroupIndex(index)


      }

      }></Group>
    })
  }
 

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    console.log(`Message submitted: ${message}`);
    setMessages([...messages, message]);
    setMessage("");
  };

  const handleSettingsClick = () => {
    navigate("/settings")
  };

  return (
    <Box className="parent" style={{backgroundColor:getBackGroundColor()}}
      
    
    >
      <Box className="top">
        <Box className="groups">
          {renderGroups(groups)}
        </Box>
        <Box>
          <button> add group </button>
        </Box>


      </Box>
      <Box className="body"
      sx={{
    

      }}  
      >
        <Box className="sideview" sx={{
          backgroundColor:"yellow",
          flex:1
          
        }}>
          <Box className="users" sx={{

            
          }}>
            <div>user1</div>
            <div>user1</div>
            <div>user1</div>

            <div>user1</div>

          </Box>
          <Box className="optionPlaceHolder">

          <p className="username">{username}</p>
          
          <img
            className="settings-svg"
            onClick={handleSettingsClick}
            src={settingssvg}
            alt=""
          />
          <button onClick={logOut}>Log Out</button>

          </Box>
        </Box>

        <Box className="textArea chat-chatbox-area" sx={{
          backgroundColor:"white",
          flex:3
        }}>

            
            <div className="message-area">
            <div className="chats">
              <p>Chats</p>
            </div>
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
          

        </Box>


        
      </Box>



{/*         
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
        </div> */}
      
    </Box>
  );
}
