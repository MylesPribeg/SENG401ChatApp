import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/Login" element={<Login />} />
    </Routes>
  );
}

export default App;
