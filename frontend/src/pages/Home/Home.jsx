import React, { useEffect, useState, useRef } from "react";
import { useLogOut } from "../../hooks/useLogOut";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./Home.css";
import settingssvg from "../../assets/settings.svg";
import UserMessage from "./UserMessage";
import Group from "./Group";
import { useNavigate } from "react-router-dom";
import { useBackgroundColour } from "../../hooks/useBackgroundColour";
import { Box } from "@mui/system";
import { useGroups } from "../../hooks/useGroups";
import { io } from "socket.io-client";
import AddGroup from "./AddGroup";
import AddUser from "./AddUser";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

export default function Home() {
  const [addGroup, setAddGroup] = useState(false);
  const { logOut } = useLogOut();
  const { user } = useAuthContext();
  const [message, setMessage] = useState("");
  const [addUser, setAddUser] = useState(false);
  //web sockets...
  const socket = useRef();
  const scrollRef = useRef();
  const navigate = useNavigate();

  const {getBackGroundColor} = useBackgroundColour();

  // const [currentActiveGroupIndex, setCurrentActiveGroupIndex] = useState(0)
  const { groupsState, groupsStateDispatch } = useGroups();
  const [activeIdx, setActiveIdx] = useState(-1);

  const username = user?.username;
  console.log(groupsState);
  // set socket for current user
  useEffect(() => {
    //console.log("connecting with user: " + user.username)
    if (user != null) {
      socket.current = io("ws://localhost:8001", {
        auth: {
          token: user,
        },
      });

      socket.current.on("send-groups", (groups) => {
        console.log(groups);
        groups.map((group) => {
          group.active = false;
        });
        groupsStateDispatch({ type: "SET_GROUPS", grps: groups });
      });

      socket.current.on("receive-message", (message, groupid) => {
        console.log("received " + message);
        groupsStateDispatch({ type: "ADDMESSAGE", idx: groupid, msg: message });
      });
    }
  }, [user]);

  //receive message from socket
  // useEffect(()=>{
  //   console.log(groupsState)
  //   socket.current.on("receive-message", (message, groupid)=>{
  //     console.log("received ");
  //     console.log(groupsState);
  //     console.log(message);
  //     const groupidx = groupsState.findIndex(group => group._id = groupid);
  //     console.log(groupid);
  //     console.log(groupsState);
  //     console.log(groupidx);
  //     console.log(groupsState[groupidx]);
  //     groupsStateDispatch({type:"ADDMESSAGE", idx:groupidx, msg:message});
  //   })

  // }, [])

  const renderMessages = (groupsState) => {
    if (activeIdx >= 0) {
      console.log("rendienr messg");
      console.log(groupsState);
      return groupsState[activeIdx].messages.map((message, index) => (
        <UserMessage key={index} val={message} />
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

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    console.log("submit message");
    console.log();
    const messageObj = {
      content: message,
      createdAt: new Date(),
      user: user.username,
    };
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

  return (
    <Box className="parent" style={{ backgroundColor: getBackGroundColor() }}>
      {addGroup ? <AddGroup state={setAddGroup} /> : ""}
      {addUser ? <AddUser state={setAddUser} /> : ""}

      <Box className="top">
        <Box className="groups">{renderGroups(groupsState)}</Box>
        <Box>
          <button onClick={() => setAddGroup(true)}> Create Group </button>
        </Box>
      </Box>
      <Box className="body" sx={{}}>
        <Box
          className="sideview"
          sx={
            {
              // backgroundColor:"red",
              // flex:0
            }
          }
        >
          <Box className="userList" sx={{}}>
            <div className="users">
              <h2 className="member">UsernameUsernameUsernameUsername</h2>
              <h2 className="member">Username</h2>
              <h2 className="member">Username</h2>
              <h2 className="member">Username</h2>
            </div>
            <div className="addUsers">
              <button
                onClick={() => {
                  setAddUser(true);
                }}
              >
                Add Users
              </button>
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
    </Box>
    
  );
}
