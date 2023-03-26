import { useState } from "react";
import "./Video.css";
import AgoraUIKit from "agora-react-uikit";
import React from "react";

const App = () => {
  const [videoCall, setVideoCall] = useState(true);
  const rtcProps = {
    appId: "48f8086408c741e581c50833ea1f5550",
    channel: "test", // your agora channel
    token:
      "007eJxTYCh7tCz/ZhK/Guslo9PiKyN4shhNtVcfjtdTPemRtkbQ3kaBwcQizcLAwszEwCLZ3MQw1dTCMNnUwMLYODXRMM3U1NSA/Y58SkMgIwODkCkjIwMEgvgsDCWpxSUMDAD8wxmi", // use null or skip if using app in testing mode
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

export default App;
