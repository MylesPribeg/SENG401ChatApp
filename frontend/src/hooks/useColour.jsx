import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "./useThemeContext";

export const useColour = () => {
  const {ThemeState, setThemeState} = useThemeContext()


  const getBackGroundColor = () =>{
    var val = `rgb(${ThemeState.BGred}, ${ThemeState.BGgreen}, ${ThemeState.BGblue})`
    return val

  }

  const setColor = (red,green,blue) =>{
    setThemeState({...ThemeState,BGred:red,BGgreen:green,BGblue:blue})
  }

  const setGreen =(green)=>{
    setThemeState({...ThemeState, BGgreen:green})
  }
  const setBlue =(blue)=>{
    setThemeState({...ThemeState, BGblue:blue})
  }
  const setRed =(red)=>{
    setThemeState({...ThemeState, BGred:red})
  }

  
  return { getBackGroundColor, setColor,setRed,setGreen,setBlue };
};