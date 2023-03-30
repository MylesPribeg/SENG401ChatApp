import React, { useEffect, useState, useRef } from "react";
import { useLogOut } from "../../hooks/useLogOut";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./Home.css";
import settingssvg from "../../assets/settings.svg";
import UserMessage from "./UserMessage";
import Group from "./Group";
import { useNavigate } from "react-router-dom";
import { useColour } from "../../hooks/useColour";
// import { useColour } from "../../hooks/useColour";
import { Box } from "@mui/system";
import { useGroups } from "../../hooks/useGroups";
import { io } from "socket.io-client";
import AddGroup from "./AddGroup";
import AddUser from "./AddUser";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import VideoScreen from "../Video/VideoScreen";
import VideoCallPage from "../Video/VideoCallPage";
import { useThemeContext } from "../../hooks/useThemeContext";
import axios from "axios";

export default function Home() {
  var alreadyConnected = useRef(false);
  const [addGroup, setAddGroup] = useState(false);
  const { logOut } = useLogOut();
  const { user } = useAuthContext();
  const [message, setMessage] = useState("");
  const [addUser, setAddUser] = useState(false);
  //web sockets...
  const socket = useRef();
  const scrollRef = useRef();
  const navigate = useNavigate();

  // const [currentActiveGroupIndex, setCurrentActiveGroupIndex] = useState(0)
  const { groupsState, groupsStateDispatch } = useGroups();
  const [activeIdx, setActiveIdx] = useState(-1);

  const username = user?.username;
  //console.log(groupsState);
  //set socket for current user
  const [trigger, setTrigger] = useState(0)
  const {setThemes, loadThemes } = useThemeContext();
  const [theme, setTheme] = useState()

  const getThemeByUsername  = async (username) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}themes/${username}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        return { error: error.response.data, status: error.response.status };
      } else if (error.request) {
        return { error: 'No response received', request: error.request };
      } else {
        return { error: error.message };
      }
    }
  }

  useEffect(()=>{
    if(user){
      const getThemeByUsername  = async (username) => {
        try {
          const theme = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}themes/${username}`);
          loadThemes(theme);
          setThemes();
          setTrigger(1)

        } catch (error) {
          if (error.response) {
            return { error: error.response.data, status: error.response.status };
          } else if (error.request) {
            return { error: 'No response received', request: error.request };
          } else {
            return { error: error.message };
          }
        }
      }
      getThemeByUsername(user.username)

      
    }
    
  },[])
  useEffect(() => {
    //console.log("connecting with user: " + user.username)
    
    if (user != null && alreadyConnected.current === false) {
      console.log("connected")
      alreadyConnected.current = true;
      socket.current = io(import.meta.env.VITE_REACT_APP_SOCKET_URL, {
        auth: {
          token: user,
        },
      });

      //receive groups from server
      socket.current.on("send-groups", (groups) => {
        console.log("sending groups");
        groups.map((group) => {
          group.active = false;
        });
        groupsStateDispatch({ type: "SET_GROUPS", grps: groups });
      });

      //receive messages from server
      socket.current.on("receive-message", (message, groupid) => {
        console.log("received ",message.content, " from ", message.user );
        console.log("adding message")
        groupsStateDispatch({ type: "ADDMESSAGE", grp: groupid, msg: message });

      });

      //receive message that user left group
      socket.current.on("left-group", (username, groupid) => {
        if (username != user.username) {
          console.log(username + " leaving " + groupid);
          groupsStateDispatch({
            type: "REMOVE_USER",
            user: username,
            grp: groupid,
          });
        }
      });
    }
  }, [user]);

  //handle sockets and state when user leaves group
  const handleUserLeave = (e) => {
    e.preventDefault();
    console.log("user leave ", user.username);
    socket.current.emit(
      "leave-group",
      groupsState[activeIdx]._id,
      user.username
    );
    groupsStateDispatch({
      type: "REMOVE_USER",
      user: user.username,
      grp: groupsState[activeIdx]._id,
    });

    groupsStateDispatch({
      type: "DELETEGROUP",
      grp: groupsState[activeIdx]._id,
    });
    setActiveIdx(-1);
  };

  const renderMessages = (groupsState) => {
    if (activeIdx >= 0) {
      return groupsState[activeIdx].messages.map((message, index) => (
        <div ref={scrollRef}>
          <UserMessage key={index} val={message} />
        </div>

      ));
    }
  };

  const renderGroups = (groupsState) => {
    return groupsState.map((group, index) => {
      return (
        <Group
          key={index}
          val={group}
          clickHandler={() => {
            groupsStateDispatch({
              type: "GROUPCLICKED",
              idx: index,
              prevIdx: activeIdx,
            });
            setActiveIdx(index);
          }}
        ></Group>
      );
    });
  };

  const renderUsernames = (groupsState) => {
    if (activeIdx >= 0) {
      return groupsState[activeIdx].users.map((user, index) => {
        return (
          <h2 className="member" key={index}>
            {user.username}
          </h2>
        );
      });
    }
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    console.log("submit message");
    const messageObj = {
      content: message,
      createdAt: new Date(),
      user: user.username,
    };
    //send message to socket server
    socket.current.emit("send-message", messageObj, groupsState[activeIdx]._id);
    groupsStateDispatch({
      type: "ADDMESSAGE",
      idx: activeIdx,
      msg: messageObj,
    });
    setMessage("");
    // setMessages([...messages, message]);
  };

  const handleSettingsClick = () => {
    navigate("/settings");
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [groupsState]);

  const startVideoCall = () => {
    console.log("before use nav " + groupsState[activeIdx]._id);
    navigate("/video-call/" + groupsState[activeIdx]._id);
  };

  return (
    <Box className="parent">
      {addGroup ? <AddGroup state={setAddGroup} /> : ""}
      {addUser ? (
        <AddUser state={setAddUser} groupid={groupsState[activeIdx]} />
      ) : (
        ""
      )}

      <Box className="top primaryBackground">
        <Box className="groups">{renderGroups(groupsState)}</Box>
        <Box>
          <button onClick={() => setAddGroup(true)}> Create Group </button>
        </Box>
      </Box>
      <Box className="body" sx={{}}>
        <Box
          className="sideview primaryBackground"
          sx={
            {
              // backgroundColor:"red",
              // flex:0
            }
          }
        >
          <Box className="userList" sx={{}}>
            <div className="users">{renderUsernames(groupsState)}</div>
            <div className="addUsers">
              <button onClick={() => {setAddUser(true);}}>
                Add Users
              </button>
              <button onClick={handleUserLeave}>Leave Group</button>

              <button onClick={startVideoCall}>Start Video Call</button>
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

        <Box
          className="textArea chat-chatbox-area"
          sx={
            {
              // backgroundColor:"white",
              // flex:3
            }
          }
        >
          <div className="message-area secondaryBackground">
            {/* <div className="chats">
                <p>Chats</p>
              </div> */}
            <div className="message-container">
              {renderMessages(groupsState)}
            </div>
          </div>
          <div className="chat-box primaryBackground">
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
    </Box>
    
  );
}
