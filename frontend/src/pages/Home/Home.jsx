import React, { useEffect, useState, useRef } from "react";
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
import {io} from 'socket.io-client'
import AddGroup from "./AddGroup";
import AddUser from "./AddUser";
export default function Home() {
  const [addGroup, setAddGroup] = useState(false)
  const { logOut } = useLogOut();
  const { user } = useAuthContext();
  const [message, setMessage] = useState("");
  const [addUser, setAddUser] = useState(false)
  //web sockets...
  const scrollRef = useRef();

  const socket = useRef();

  const navigate = useNavigate();

  const {getBackGroundColor} = useColour();

  // const [currentActiveGroupIndex, setCurrentActiveGroupIndex] = useState(0)
  const {groupsState,groupsStateDispatch} = useGroups()
  const [activeIdx, setActiveIdx] = useState()

  const username = user?.username;

  // set socket for current user
  useEffect(()=> {
    socket.current = io("ws://localhost:8001");
  },[]);

  //send user info to socket serv
  useEffect(()=>{
    if(user!=null){
      socket.current.emit("send-user", user);
    }
  }, [user]);

  //get groups after sending user info
  useEffect(()=>{
    socket.current.on("send-groups", (groups)=>{
      console.log(groups);
      groupsStateDispatch({type:"SET_GROUPS", grps:groups});
    });
  }, []);

  // receive message
  useEffect(()=>{
    socket.current.on("receive-message", (message, groupid)=>{
      console.log("received " + message);
      groupsStateDispatch({type:"ADDMESSAGE", idx:groupid,msg:message});
    })

  }, [groupsState])

  const renderMessages = (groupsState) => {
    if(activeIdx!=null){
      return groupsState[activeIdx].messages.map((message, index) => (
      <UserMessage key={index} message={message} />
      ))
    }
  }

  const renderGroups = (groupsState) => {
    return groupsState.map((group, index) => {
      return <Group key={index} val={group} clickHandler={ () => {
        groupsStateDispatch({type:"GROUPCLICKED",idx:index,prevIdx:activeIdx})
        setActiveIdx(index)
      }
      }></Group>
    })
  }
 

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    socket.current.emit("send-message", message, groupsState[activeIdx].id);
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
  {addGroup?<AddGroup state={setAddGroup}/> :""}
  {addUser ?<AddUser state={setAddUser}/> :""}

      <Box className="top">
        <Box className="groups">
          {renderGroups(groupsState)}
        </Box>
        <Box>
          <button onClick={()=>setAddGroup(true)}
          
          > add group </button>
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
 
            </div>
            <div className="addUsers">
              <button onClick={()=>{
                setAddUser(true)
              }}>Add Users</button>
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
              {renderMessages(groupsState)}
              </div>
            </div>
            <div className="chat-box">
              <form className="sub-form" onSubmit={handleMessageSubmit}>
                <input
                  type="textarea"
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
