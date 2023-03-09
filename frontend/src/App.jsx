import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/LogIn";
import Home from "./pages/Home";
import { useAuthContext } from "./hooks/useAuthContext";
import { Navigate } from "react-router-dom";

function App() {
  const { user } = useAuthContext();

  return (
    <Routes>
      <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUp />} />
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}

export default App;
