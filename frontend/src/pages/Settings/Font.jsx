import React, { useContext } from "react";

import { Box } from "@mui/material";
import { Typography, Slider } from "@mui/material";
import { useFont } from "../../hooks/useFont";
import "./Fonts.css"

export default function Font(props) {

    const{setFont, setFontColour, setFontStyle} = useFont()
    const fontStyles = ['normal', 'italic', 'oblique']
    const marks = [
      {
        value: 0,
        label: 'black',
      },

      {
        value: 255,
        label: 'white',
      },
    ];
    const fonts = ['Courier', 'Times', 'Arial']
    const renderFonts = fonts => {
      return fonts.map( (buttonFont, index) => {
          return ( <button key={index}
          className = { 'colourButtons ' + buttonFont }
          onClick={() => setFont(buttonFont)}>
          
          {buttonFont}
          </button> )
      })
  }
    const renderFontStyles = fonts => {
        return fonts.map( (buttonStyle, index) => {
            return ( <button key={index}
            className = { 'colourButtons ' + buttonStyle }
            onClick={() => setFontStyle(buttonStyle)}>
            
            {buttonStyle}
            </button> )
        })
    }



  
  
  return (
    <Box
    sx={{
        display: "flex",
        flexFlow: "column",
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
                
                defaultValue={150}
                max={255}
                step={10}
                valueLabelDisplay="auto"
                marks={marks}
                onChange={(event, number) =>{
                    setFontColour(number)
                }}
              />
            </Box> 
        </Box>
       
    </Box>
  );


}
