import React, { useContext } from "react";

import { useState } from "react";
import Button from '@mui/material/Button';
import { Box, Slide } from "@mui/material";
import { Typography,Slider } from "@mui/material";
import "./Colour.css";
import { useColour } from "../../hooks/useColour";
// import Slider from "@mui/material";
export default function Colour(props) {
    // 'white', 'yellow', 'red', 'blue', 'green'
    const { setColor, setGreen,setBlue,setRed } = useColour()

    
    const colors = [
        {
            name:"white",
            red: 255,
            green:255, 
            blue:255
        },
        {
            name:"yellow",
            red: 255,
            green:255, 
            blue:0
        }, {
            name:"blue",
            red: 0,
            green:0, 
            blue:255
        }, {
            name:"green",
            red: 0,
            green:255, 
            blue:0
        }, {
            name:"red",
            red: 255,
            green:0,
            blue:0
        }]

    const renderButtons = colors => {
        return colors.map( (object_color, index) => {
            return ( <button key={index}
            className = { ' colourButtons ' + object_color.name }
            onClick={() => {
                setColor(object_color.red,object_color.green, object_color.blue )
            }}
            >
            
            {object_color.name}
            </button> )
        })
    }


  return (
    <Box
    sx={{
        display: "flex",
        flexFlow: "column",
        backgroundColor: "inherit",
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
          <Typography
                variant="h3"
                color="black"
                fontSize={20}
                boxSizing="border-box"
                textAlign= "center">
            
                red
            </Typography>
            <Box className = "colourOptions"
            sx={{
                display:"flex",
                flexFlow: "row wrap",
                boxSizing:"border-box",
                padding: "0 50px 0 50px"
            }}>
           <Slider
            aria-label="Custom marks"
                
            defaultValue={150}
            max={255}
            step={10}
            valueLabelDisplay="auto"
            onChange={(event, number) =>{
                setRed(number)

              }}
           
           />
           </Box>
           


           <Typography
                variant="h3"
                color="black"
                fontSize={20}
                boxSizing="border-box"
                textAlign= "center">
            
                green
            </Typography>
            <Box className = "colourOptions"
            sx={{
                display:"flex",
                flexFlow: "row wrap",
                boxSizing:"border-box",
                padding: "0 50px 0 50px"
            }}>
           <Slider
            aria-label="Custom marks"
                
            defaultValue={150}
            max={255}
            step={10}
            valueLabelDisplay="auto"
            onChange={(event, number) =>{
                setGreen(number)
              }}
           
           />
           </Box>


           <Typography
                variant="h3"
                color="black"
                fontSize={20}
                boxSizing="border-box"
               
                textAlign= "center">
            
                blue
            </Typography>
            <Box className = "colourOptions"
            sx={{
                display:"flex",
                flexFlow: "row wrap",
                boxSizing:"border-box",
                padding: "0 50px 0 50px"
            }}>
           <Slider
            aria-label="Custom marks"
                
            defaultValue={150}
            max={255}
            step={10}
            valueLabelDisplay="auto"
            onChange={(event, number) =>{
                setBlue(number)
              }}
           />
           </Box>


         
        </Box>
       
    </Box>
  );


}
