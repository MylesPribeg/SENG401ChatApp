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
import { useGroups } from "../../hooks/useGroups";
import { useRef } from "react"
import { useEffect } from "react";
export default function Home() {
  const { logOut } = useLogOut();
  const { user } = useAuthContext();
  const [message, setMessage] = useState("");
  const scrollRef = useRef();

  

  const navigate = useNavigate();

  const {getBackGroundColor} = useColour()

  // const [currentActiveGroupIndex, setCurrentActiveGroupIndex] = useState(0)
  const {groupsState,groupsStateDispatch} = useGroups()
  const [activeIdx, setActiveIdx] = useState(0)

  const username = user?.username;


  

  const renderGroups = (groupsState) => {
    return groupsState.map((group, index) => {
      return <Group key={index} val={group} clickHandler={ () => {
        // console.log("group index pressed: " + index + "previously active index " +  currentActiveGroupIndex)
        // groups[currentActiveGroupIndex].active=false
        groupsStateDispatch({type:"GROUPCLICKED",idx:index,prevIdx:activeIdx})
        setActiveIdx(index)
        // groups[index].active=true
        // setCurrentActiveGroupIndex(index)


      }

      }></Group>
    })
  }
 

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    groupsStateDispatch({type:"ADDMESSAGE", idx:activeIdx,msg:message})
    setMessage("");

    // setMessages([...messages, message]);
    
  };

  const handleSettingsClick = () => {
    navigate("/settings")
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior: "smooth"});
  },[groupsState])

  return (
    <Box className="parent" style={{backgroundColor:getBackGroundColor()}}
      
    
    >
      <Box className="top">
        <Box className="groups">
          {renderGroups(groupsState)}
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
          // backgroundColor:"red",
          // flex:0         
        }}>
          <Box className="userList" sx={{  }}>
            
            <div className="users">
              <h2 className="member">UsernameUsernameUsernameUsername</h2>
              <h2 className="member">Username</h2>
              <h2 className="member">Username</h2>
              <h2 className="member">Username</h2>
              <h2 className="member">nuts</h2>
              <h2 className="member">Username</h2>
              <h2 className="member">Username</h2>
              <h2 className="member">nuts</h2>
              <h2 className="member">Username</h2>
              <h2 className="member">Username</h2>
              <h2 className="member">deez</h2>
              <h2 className="member">Username</h2>
              <h2 className="member">Username</h2>
              <h2 className="member">deez</h2>
              <h2 className="member">Username</h2>
              <h2 className="member">Username</h2>
              <h2 className="member">deez</h2>
              <h2 className="member">nuts</h2>
              <h2 className="member">Username</h2>
              <h2 className="member">Username</h2>
              <h2 className="member">deez</h2>
              <h2 className="member">Username</h2>
              <h2 className="member">nuts</h2>
              <h2 className="member">Username</h2>
              <h2 className="member">Username</h2>
            </div>
            <div className="addUsers">
              <button>Add Users</button>
            </div>
            
          </Box>

          <Box className="sideview-bottom">  
            <p className="username">{username}</p>        
            <div className="options">
              <img
              className="settings-svg"
              onClick={handleSettingsClick}
              src={settingssvg}
              alt=""
              />
              <button onClick={logOut}>Log Out</button>
            </div>
          </Box>

        </Box>

        <Box className="textArea chat-chatbox-area" sx={{
          // backgroundColor:"white",
          // flex:3
        }}>

            
            <div className="message-area">
              {/* <div className="chats">
                <p>Chats</p>
              </div> */}
              <div className="message-container">
                {groupsState[activeIdx].messages.map((message, index) => (
                  <div ref={scrollRef}>
                    <UserMessage key={index} message={message} />
                  </div>
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
          <h2>Chats</h2>
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
