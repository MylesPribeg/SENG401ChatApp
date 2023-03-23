import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/LogIn";
import Home from "./pages/Home/Home";
import Settings from "./pages/Settings/Settings";

function App() {

  return (
    // <div style={{backgroundColor:}}>

      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<h1>404 Not Found</h1>} /> 
      </Routes>
    // </div>
    
  );
}

export default App;
