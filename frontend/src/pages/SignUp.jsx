import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { width } from "@mui/system";
import logo from "../assets/snake-background.png";
import "../SignUp.css";
import { useSignUp } from "../hooks/useSignUp";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formInputs, setinput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { signUp, error, isLoading } = useSignUp();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setinput({ ...formInputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formInputs);
    await signUp(formInputs.username, formInputs.email, formInputs.password);
  };
  return (
    <div className="mainContent">
      <Box
        className="main"
        sx={{
          
          "& .MuiTextField-root": { m: 1, width: "45ch" },
          width: 500,
          height: 400,
          backgroundColor: "white",
          borderRadius: 10,
        }}
      >
        <Typography
          paddingBottom={2}
          variant="h1"
          color="black"
          fontSize={50}
          padding={0}
          margin={0}
        >
          Welcome to Rattle!
        </Typography>

        <form className="form" onSubmit={handleSubmit}>
          <TextField
            value={formInputs.username}
            onChange={handleChange}
            name="username"
            required
            id="username"
            label="Username"
            variant="outlined"
            color="primary"
          />
          <TextField
            value={formInputs.email}
            onChange={handleChange}
            name="email"
            required
            id="outlined-basic"
            label="email"
            variant="outlined"
          />
          <TextField
            value={formInputs.password}
            onChange={handleChange}
            name="password"
            required
            type={"password"}
            id="outlined-basic"
            label="Password"
            variant="outlined"
          />
          <div className="buttons">
            <Button
            className="mainButton"
              disabled={isLoading}
              type="submit"
              size="large"
              color="primary"
              variant="contained"
              
            >
              SignUp
            </Button>
            <Button
            className="sideButton"
              size="large"
              color="primary"
              variant="contained"
              onClick={() => navigate("/login")}
              sx={{margin: 1.5}}
            >
              Back
            </Button>
          </div>
        </form>
      </Box>
      {<h1>{error && <div className="error">{error}</div>}</h1>}
    </div>
  );
}
