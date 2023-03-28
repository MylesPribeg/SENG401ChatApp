import { useState } from "react";
import AgoraUIKit from "agora-react-uikit";
import React from "react";

const VideoScreen = ({ groupId }) => {
  const [videoCall, setVideoCall] = useState(true);
  const rtcProps = {
    appId: "bc0326d2aa374e21a27f892bc75c4ba4",
    channel: groupId, // use the passed groupId prop as the channel
    token: null,
  };
  const callbacks = {
    EndCall: () => setVideoCall(false),
  };
  return videoCall ? (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
    </div>
  ) : (
    <h3 onClick={() => setVideoCall(true)}>Start Call</h3>
  );
};

export default VideoScreen;
