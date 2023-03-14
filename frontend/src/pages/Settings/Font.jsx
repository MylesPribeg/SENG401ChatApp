import React, { useContext } from "react";

import { useState } from "react";
import Button from '@mui/material/Button';
import { Box } from "@mui/material";
import { Typography, Slider } from "@mui/material";
import { useThemeContext } from "../../hooks/useThemeContext";
import "./Fonts.css"

export default function Font(props) {

    const [color, setColor] = useState('white')
    const {ThemeState, setThemeState, } = useThemeContext()
    const fontStyles = ['normal', 'italic', 'oblique']
    const marks = [
      {
        value: 0,
        label: 'white',
      },

      {
        value: 255,
        label: 'black',
      },
    ];
    const fonts = ['Courier', 'Times', 'Arial']
    const renderFonts = fonts => {
      return fonts.map( (buttonFont, index) => {
          return ( <button key={index}
          className = { 'colourButtons ' + buttonFont }
          onClick={() => setThemeState({...ThemeState, font: buttonFont })}>
          
          {buttonFont}
          </button> )
      })
  }
    const renderFontStyles = fonts => {
        return fonts.map( (buttonStyle, index) => {
            return ( <button key={index}
            className = { 'colourButtons ' + buttonStyle }
            onClick={() => setThemeState({...ThemeState, fontStyles: buttonStyle })}>
            
            {buttonStyle}
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
            
                Font Type
            </Typography>
            <Box className = "colourOptions"
            sx={{
                display:"flex",
                flexFlow: "row wrap",
                boxSizing:"border-box"
            }}>
                {renderFonts(fonts)}
            </Box> 
        </Box>
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
            
                Font Styles
            </Typography>
            <Box className = "colourOptions"
            sx={{
                display:"flex",
                flexFlow: "row wrap",
                boxSizing:"border-box"
            }}>
                {renderFontStyles(fontStyles)}
            </Box> 
        </Box>

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
            
                Font Colour
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
                
                defaultValue={255}
                max={255}
                step={10}
                valueLabelDisplay="auto"
                marks={marks}
                onChange={(event, number) =>{
                  setThemeState({...ThemeState, fontColour: number })
                }}
              />
            </Box> 
        </Box>
       
    </Box>
  );


}
