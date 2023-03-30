import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "./useThemeContext";
import axios from "axios";

export const useColour = () => {




  const setBackGroundColor = () =>{
    var r = document.querySelector(':root');
    console.log("primary background " + `rgb(${ThemeState.PBGred}, ${ThemeState.PBGgreen}, ${ThemeState.PBGblue})`)
    r.style.setProperty('--pBG',`rgb(${ThemeState.PBGred}, ${ThemeState.PBGgreen}, ${ThemeState.PBGblue})`)

    ThemeState.updated = !ThemeState.updated
    console.log(ThemeState.updated)

  }

  const setSecondaryColor = () =>{
    var r = document.querySelector(':root');
    // console.log("secondary " + `rgb(${ThemeState.SBGred}, ${ThemeState.SBGgreen}, ${ThemeState.SBGblue})`)

    r.style.setProperty('--sBG',`rgb(${ThemeState.SBGred}, ${ThemeState.SBGgreen}, ${ThemeState.SBGblue})`)
  }


  const setPColor = (red,green,blue) =>{
    console.log(red,green,blue)
    setThemeState({...ThemeState,PBGred:red,PBGgreen:green,PBGblue:blue})
    setBackGroundColor()
  }

  const setPGreen =(green)=>{
    setThemeState({...ThemeState, PBGgreen:green})
    setBackGroundColor()
  }
  const setPBlue =(blue)=>{
    setThemeState({...ThemeState, PBGblue:blue})
    setBackGroundColor()
  }
  const setPRed =(red)=>{
    setThemeState({...ThemeState, PBGred:red})
    setBackGroundColor()
  }

  const setSColor = (red,green,blue) =>{
    setThemeState({...ThemeState,SBGred:red,SBGgreen:green,SBGblue:blue})
    setSecondaryColor()
  }

  const setSGreen =(green)=>{
    setThemeState({...ThemeState, SBGgreen:green})
    setSecondaryColor()


  }
  const setSBlue =(blue)=>{
    setThemeState({...ThemeState, SBGblue:blue})
    setSecondaryColor()


  }
  const setSRed =(red)=>{
    setThemeState({...ThemeState, SBGred:red})
    setSecondaryColor()

  }

  
  return {setBackGroundColor, setSecondaryColor, setPColor,setPRed,setPGreen,setPBlue,setSColor,setSRed,setSGreen,setSBlue };
};
