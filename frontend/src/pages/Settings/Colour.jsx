import React, { useContext } from "react";

import { useState } from "react";
import Button from '@mui/material/Button';
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import "./Colour.css";
import { useThemeContext } from "../../hooks/useThemeContext";
export default function Colour(props) {

    const [color, setColor] = useState('white')
    const {ThemeState, setThemeState, } = useThemeContext()
    const colors = ['white', 'yellow', 'red', 'blue', 'green']

    const renderButtons = colors => {
        return colors.map( (object_color, index) => {
            return ( <button key={index}
            className = { ' colourButtons ' + object_color }
            onClick={() => setThemeState({...ThemeState, color: object_color })}>
            
            {object_color}
            </button> )
        })
    }


  return (
    <Box
    sx={{
        display: "flex",
        flexFlow: "column",
        backgroundColor: ThemeState.color,
        flex: 1,


    }}>

        <Box
        sx={{
            
            backgroundColor: "inherit",
            flex: 1,
            display:"flex",
            flexDirection:"column",
        }}>

            <Typography
                paddingBottom={2}
                variant="h3"
                color="black"
                fontSize={20}
                boxSizing="border-box"
                paddingTop={5}
                textAlign= "center">
            
                Colours
            </Typography>
            <Box className = "colourOptions"
            sx={{
                display:"flex",
                flexFlow: "row wrap",
                boxSizing:"border-box"
            }}>
                {renderButtons(colors)}
            </Box> 
        </Box>

        <Box
            sx={{
                display: "flex",
                backgroundColor: "inherit",
                flex: 2,
                flexDirection:"column"
            }}>
             <Typography
                paddingBottom={2}
                variant="h3"
                color="black"
                fontSize={20}
                boxSizing="border-box"
                paddingTop={5}
                textAlign= "center">
            
                Custom Colours
          </Typography>
        </Box>
       
    </Box>
  );


}
