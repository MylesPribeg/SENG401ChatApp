// VideoCallPage.js
import React from "react";
import VideoScreen from "./VideoScreen";
import { useNavigate } from "react-router-dom";

const VideoCallPage = (groupid) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };

  return (
    <div>
      <VideoScreen groupId={"farts"} />
      <button onClick={goBack}>Go Back</button>
    </div>
  );
};

export default VideoCallPage;
