// VideoCallPage.js
import React from "react";
import VideoScreen from "./VideoScreen";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";
import { useEffect, useState } from "react";

const VideoCallPage = () => {
  const navigate = useNavigate();
  const { data } = useParams();
  const { user } = useAuthContext();
  const name = user?.username;
  console.log(data + "in video call screen");
  const [rightRoom, setRightRoom] = useState(false);

  const goBack = () => {
    navigate("/");
  };

  async function checkIfUserInGroup(groupId, username) {
    try {
      
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/groups/isUserInGroup/${groupId}/${username}`
      );
      console.log(
        `User ${username} is in group ${groupId}:`,
        response.data.userInGroup
      );
      return response.data.userInGroup;
    } catch (error) {
      console.error(
        "Error checking if user is in group:",
        error.response?.data || error
      );
      return false;
    }
  }

  useEffect(() => {
    async function checkRoom() {
      if (await checkIfUserInGroup(data, name)) {
        setRightRoom(true);
      } else {
        console.log("user not in group");
        navigate("*");
      }
    }

    function handlePopState() {
      checkRoom();
    }

    window.addEventListener("popstate", handlePopState);

    checkRoom();

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [data, name, navigate]);

  return rightRoom ? (
    <div>
      <VideoScreen groupId={data} />
      <button onClick={goBack}>Go Back</button>
    </div>
  ) : (
    <></>
  );
};

export default VideoCallPage;
