import React, { useReducer, useState, useEffect,useContext } from "react";
import Button from "@mui/material/Button";
import "./Settings.css";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Font from "./Font";
import Colour from "./Colour";
import Profile from "./Profile";
import Account from "./Account";
import { boxSizing } from "@mui/system";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import settingssvg from "../../assets/settings.svg"
import { useThemeContext } from "../../hooks/useThemeContext";

function SettingsOptionsView({someState}){

    if( someState == "Account")
      return <Account></Account>;
    else if( someState == "Profile")
      return <Profile></Profile>;
    else if( someState == "Font")
      return <Font></Font>;
    else if( someState == "Colour")
      return <Colour></Colour>;
    else
      return null


  
}
const reducer = (state, action) =>{
  return {type: action.type}

}

export default function Settings(props) {
  const [state, dispatch] = useReducer(reducer, {type: "" })
  const navigate = useNavigate()
  const {ThemeState} = useThemeContext()

  return (
    
      <div className="settingsParent" style={{backgroundColor:`rgb(${ThemeState.RGred}, ${ThemeState.RGgreen}, ${ThemeState.RGblue})`}} >
        <Box className = "settingsOptions"
          sx={{
            // width: '20%',
            // height: '100%',
            flex: 1,
            backgroundColor: "grey",
            mixBlendMode:"multiply",
            paddingTop: '50px',
            paddingLeft: '30px',
            boxSizing: 'border-box'
            // margin: '60px'
            // marginBottom: 5,
          }}
        >
          {/* <button onClick={Test}>Account</button> */}
          <div>
            <div>
              <h3>
                User Settings
              </h3>
              <div>
                <Button type="text" onClick={() => { dispatch({type: "Profile"})}}>Profile</Button>
              </div>
              <div>
              <Button type="text" onClick={() => { dispatch({type: "Account"})}}>Account</Button>
              </div>
            </div>

            <div>
              <h3>
                Theme Settings
              </h3>
              <div>
              <Button type="text" onClick={() => { dispatch({type: "Colour"})}}>Colour</Button>
              </div>
              <div>
              <Button type="text" onClick={() => { dispatch({type: "Font"})}}>Font</Button>
              </div>
            </div>
            
          </div>
          

        </Box>


        <Box className = "settingsSelector"
        sx={{
          flex: 3,
          backgroundColor: "inherit",
          
          display:"flex",
          flexDirection:"column",
          justifyContent: "flex-start",
          boxSizing:"border-box",

        }}
        >
          <Container sx={{
            flex: 0.5,
            backgroundColor: "inherit",

          }}>
            <Typography
            paddingBottom={2}
            variant="h1"
            color="black"
            fontSize={30}
            boxSizing="border-box"
            paddingTop={5}
            textAlign= "center">
              
            <div>{state.type} </div>
              
            </Typography>
            
        
          </Container>
          <Box
          sx={{
            flex: 5,
            backgroundColor: "inherit",
            display: "flex"

          }} >
              
            <SettingsOptionsView  someState={state.type}/>

          </Box>
        

        </Box>
        <Box className = "settingsEscape"
          sx={{
            flex: 0.7,
            backgroundColor: "grey",
            mixBlendMode:"multiply",

          }}
        >
          <img
              className="settings-svg"
              onClick={()=>{
                navigate("/")
              }}
              src={settingssvg}
              alt=""
            />

        </Box>

      </div>

  );


}
