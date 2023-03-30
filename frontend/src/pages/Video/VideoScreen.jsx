// import { useState, useEffect } from "react";
// import AgoraUIKit from "agora-react-uikit";
// import React from "react";
// import { v4 as uuidv4 } from "uuid";
// import AgoraRTC, { RtcRole, RtcTokenBuilder } from "agora-rtc-sdk-ng";

// const VideoScreen = ({ groupId }) => {
//   const [videoCall, setVideoCall] = useState(true);
//   const [rtcToken, setRtcToken] = useState("");
//   const [uid, setUid] = useState("");
//   const agoraAppId = "bc0326d2aa374e21a27f892bc75c4ba4";
//   console.log("app id is " + agoraAppId);
//   useEffect(() => {
//     // Get the App ID and App Certificate from environment variables

//     const agoraAppCertificate = import.meta
//       .VITE_REACT_APP_AGORA_APP_CERTIFICATE;

//     // Generate a new UID
//     const newUid = uuidv4();
//     setUid(newUid);

//     // Fetch the token from the server
//     const fetchToken = async () => {
//       try {
//         const input = {
//           channel: groupId,
//           isPublisher: "true",
//         };

//         const response = await fetch("http://localhost:8000/token", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(input),
//         });

//         const data = await response.json();
//         setRtcToken(data.token);
//         setUid(data.uid);
//       } catch (error) {
//         console.log("Failed to fetch token and UID:", error);
//       }
//     };
//     fetchToken();
//   }, [groupId]);

//   const callbacks = {
//     EndCall: () => setVideoCall(false),
//   };

//   console.log("token is " + rtcToken);
//   console.log("uid is " + uid);

//   return (
//     <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
//       <AgoraUIKit
//         rtcProps={{
//           appId: agoraAppId,
//           channel: groupId,
//           token: rtcToken,
//           uid: uid,
//         }}
//         callbacks={callbacks}
//       />
//     </div>
//   );
// };

// export default VideoScreen;
import { useState, useEffect } from "react";
import AgoraUIKit from "agora-react-uikit";
import React from "react";

const VideoScreen = ({ groupId }) => {
  const [videoCall, setVideoCall] = useState(true);
  const [rtcToken, setRtcToken] = useState("");
  const [uid, setUid] = useState("");

  const agoraAppId = import.meta.env.VITE_REACT_APP_AGORA_APP_ID;

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch(`${VITE_REACT_APP_API_URL}token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ channel: groupId }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setRtcToken(data.token);
        setUid(data.uid);
        console.log("Fetched token:", data.token);
        console.log("Fetched UID:", data.uid);
      } catch (error) {
        console.log("Failed to fetch token and UID:", error);
      }
    };
    fetchToken();
    console.log("token is " + rtcToken);
    console.log("uid is " + uid);
  }, [groupId]);

  useEffect(() => {
    console.log("Updated rtcToken:", rtcToken);
    console.log("Updated uid:", uid);
  }, [rtcToken, uid]);

  const rtcProps = {
    appId: agoraAppId,
    channel: groupId,
    token: rtcToken,
    uid: uid,
  };

  const callbacks = {
    EndCall: () => setVideoCall(false),
  };

  return videoCall && rtcToken ? (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
    </div>
  ) : (
    <div>
      {videoCall ? (
        <h3>Loading...</h3>
      ) : (
        <h3 onClick={() => setVideoCall(true)}>Start Call</h3>
      )}
    </div>
  );
};

export default VideoScreen;

// import AgoraUIKit from "agora-react-uikit";
// import React, { useState } from "react";

// const appId = import.meta.env.VITE_REACT_APP_AGORA_APP_ID;
// const certificate = import.meta.env.VITE_REACT_APP_AGORA_APP_CERTIFICATE;

// const VideoScreen = ({ groupId }) => {
//   const [videoCall, setVideoCall] = useState(true);
//   console.log(groupId + "in video MAIN DRIVER");

//   const rtcProps = {
//     appId: appId,
//     channel: groupId,
//     token: certificate,
//   };

//   const callbacks = {
//     EndCall: () => setVideoCall(false),
//   };

//   return videoCall ? (
//     <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
//       <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
//     </div>
//   ) : (
//     <h3 onClick={() => setVideoCall(true)}>Start Call</h3>
//   );
// };

// export default VideoScreen;

// import { useState } from "react";
// import AgoraUIKit from "agora-react-uikit";
// import React from "react";

// const VideoScreen = ({ groupId }) => {
//   const [videoCall, setVideoCall] = useState(true);
//   console.log(groupId + "in video MAIN DRIVER");
//   const rtcProps = {
//     appId: import.meta.env.VITE_REACT_APP_AGORA_APP_ID,
//     channel: groupId,
//     token: null,
//   };
//   const callbacks = {
//     EndCall: () => setVideoCall(false),
//   };
//   return videoCall ? (
//     <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
//       <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
//     </div>
//   ) : (
//     <h3 onClick={() => setVideoCall(true)}>Start Call</h3>
//   );
// };

// export default VideoScreen;
