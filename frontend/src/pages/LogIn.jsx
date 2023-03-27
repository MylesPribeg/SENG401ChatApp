import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../SignUp.css";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formInputs, setinput] = useState({
    username: "",
    password: "",
  });

  const { login, error, isLoading } = useLogin();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setinput({ ...formInputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formInputs);
    await login(formInputs.username, formInputs.password);
  };
  return (
    <div className="mainContent">
      <Box
        className="main"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "45ch" },
          width: 500,
          height: 320,
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
            className="textField"
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
            className="textField"
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
              disabled={isLoading}
              type="submit"
              size="large"
              color="primary"
              variant="contained"
              className="mainButton"
            >
              Login
            </Button>
            <Button
              size="large"
              color="primary"
              variant="contained"
              className="sideButton"
              onClick={() => navigate("/signup")}
              sx={{margin: 1.5}}
            >
              Sign Up
            </Button>
          </div>
        </form>
      </Box>
      {<h1>{error && <div className="error">{error}</div>}</h1>}
    </div>
  );
}
