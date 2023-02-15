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

export default function SignUp() {
  const [formInputs, setinput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { signUp, error, isLoading } = useSignUp();

  const handleChange = (e) => {
    setinput({ ...formInputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formInputs);
    await signUp(formInputs.username, formInputs.email, formInputs.password);
  };
  return (
    <div>
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1, width: "45ch" },
          width: 500,
          height: 400,
          backgroundColor: "white",
          borderRadius: 10,
          marginBottom: 25,
        }}
      >
        <Typography
          paddingBottom={2}
          variant="h1"
          color="black"
          fontSize={50}
          paddingTop={5}
        >
          Welcome to Rattle!
        </Typography>

        <form onSubmit={handleSubmit}>
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

          <Button
            disabled={isLoading}
            type="submit"
            size="large"
            color="primary"
            variant="contained"
            sx={
              ({ marginRight: 43 }, { paddingLeft: 20 }, { paddingRight: 40 })
            }
          >
            SignUp
          </Button>
        </form>
      </Box>
      {<h1>{error && <div className="error">{error}</div>}</h1>}
    </div>
  );
}
