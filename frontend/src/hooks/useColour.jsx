import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "./useThemeContext";
import axios from "axios";

export const useColour = () => {

  const {ThemeState, setThemeState} = useThemeContext()
  const {user} = useAuthContext()

  const updateTheme = async (user,ThemeState) => {
    try {
      const username = user.username
      const themeObject = ThemeState

      console.log(ThemeState)
      console.log(`${user.username} this is username from useColour` )
      const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}updateTheme`, { username, themeObject });
      const updatedUser = response.data;
      localStorage.setItem("user", JSON.stringify(updatedUser));

      console.log('User theme updated successfully:', updatedUser);
      
    } catch (error) {
      console.error('Error updating user theme:', error);
      
    }
};


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
    updateTheme(user, ThemeState)
  }

  const setPGreen =(green)=>{
    setThemeState({...ThemeState, PBGgreen:green})
    setBackGroundColor()
    updateTheme(user, ThemeState)

  }
  const setPBlue =(blue)=>{
    setThemeState({...ThemeState, PBGblue:blue})
    setBackGroundColor()
    updateTheme(user, ThemeState)

  }
  const setPRed =(red)=>{
    setThemeState({...ThemeState, PBGred:red})
    setBackGroundColor()
    updateTheme(user, ThemeState)

  }

  const setSColor = (red,green,blue) =>{
    setThemeState({...ThemeState,SBGred:red,SBGgreen:green,SBGblue:blue})
    setSecondaryColor()
    updateTheme(user, ThemeState)

  }

  const setSGreen =(green)=>{
    setThemeState({...ThemeState, SBGgreen:green})
    setSecondaryColor()
    updateTheme(user, ThemeState)



  }
  const setSBlue =(blue)=>{
    setThemeState({...ThemeState, SBGblue:blue})
    setSecondaryColor()
    updateTheme(user, ThemeState)



  }
  const setSRed =(red)=>{
    setThemeState({...ThemeState, SBGred:red})
    setSecondaryColor()
    updateTheme(user, ThemeState)


  }

  
  return {setBackGroundColor, setSecondaryColor, setPColor,setPRed,setPGreen,setPBlue,setSColor,setSRed,setSGreen,setSBlue };
};
