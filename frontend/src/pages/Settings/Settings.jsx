import React from "react";
import Button from "@mui/material/Button";
import "./Settings.css";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import UserSettings from "./UserSettings/UserSettings";
export default function Settings(props) {


  return (
    <div className="settingsParent">
      <Box
        sx={{
          width: '30%',
          height: '100%',
          backgroundColor: "white",
          // marginBottom: 5,
        }}
      >
        {/* <UserSettings>
{
        </UserSettings> } */}
      </Box>

    </div>
  );
  // const element = (
  //   <div className="pop-up">
  //     <div className="inner">
  //       <img
  //         onClick={handleClose}
  //         className="close-img"
  //         src={close}
  //         alt="close"
  //       />
  //       <h1>Settings</h1>
  //       {props.children}
  //     </div>
  //   </div>
  // );

}
