import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/LogIn";
import Home from "./pages/Home/Home";
import Settings from "./pages/Settings/Settings";
import VideoCallPage from "./pages/Video/VideoCallPage";
import VideoScreen from "./pages/Video/VideoScreen";

function App() {
  return (
    // <div style={{backgroundColor:}}>

    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
      <Route path="/video-call/:data" element={<VideoCallPage />} />
    </Routes>
    // </div>
  );
}

export default App;
