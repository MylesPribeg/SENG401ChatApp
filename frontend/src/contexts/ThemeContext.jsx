import { color } from "@mui/system";
import { createContext, useReducer, useState } from "react";

export const ThemeContext = createContext()



  
// export const changeFontReducer = (state, action) =>{

// }



export function ThemeContextProvider({children}){
    // const [colorState, changeBackgroundColorDispatch] = useReducer(changeBackgroundColorReducer, { red: 0, green: 0, blue: 0 });
    // const [fontState, changefontStateDispatch] = useReducer(changeFontReducer,{font:"", fontStyle:"", fontColour:""})

    // const [Theme, changeThemeDispatch] = useReducer(ChangeThemeReducer,({colorState,fontState}))
    
    const [ThemeState,setThemeState] = useState({
        fontStyle: "normal",
        fontColour: 100,
        font:"Times New Roman",
        PBGred:150,
        PBGgreen:150,
        PBGblue:150,
        SBGred:50,
        SBGgreen:50,
        SBGblue:50,
        updated:false,
        
        
    })
    const loadThemes = (ThemeObject) =>{
      setThemeState(ThemeObject)
  }

    const setThemes = () =>{
      console.log(ThemeState)
        var r = document.querySelector(':root');
        r.style.setProperty('--font-colour',`rgb(${ThemeState.fontColour}, ${ThemeState.fontColour}, ${ThemeState.fontColour})`)
        r.style.setProperty('--font-style',ThemeState.fontStyle)
        r.style.setProperty('--pBG',`rgb(${ThemeState.PBGred}, ${ThemeState.PBGgreen}, ${ThemeState.PBGblue})`)
        r.style.setProperty('--sBG',`rgb(${ThemeState.SBGred}, ${ThemeState.SBGgreen}, ${ThemeState.SBGblue})`)
        r.style.setProperty('--font',ThemeState.font)

        ThemeState.updated = !ThemeState.updated



    
    }

    const setThemeColor = (red,green,blue) =>{

        console.log("setting theme colour")
        setThemeState({...ThemeState,BGred:red?red:null, BGgreen:green, BGblue:blue})
    }
    const setThemeFont = ({style, color, type}) =>{
        setThemeState(...ThemeState,fontStyle=style, fontColour=color, font=type)
    }



    // const changeBackgroundColorReducer = (state, action) => {
    //     var someState
    //     switch (action.type) {
            
    //       case "RED":
    //         someState =  { ...state, red: action.red };
    //         break
    //       case "GREEN":
    //         someState = { ...state, green: action.green };
    //         break
    //       case "BLUE":
    //         someState = { ...state, blue: action.blue };
    //         break
    //       case "ALL":
    //         someState= {...state, blue:action.blue, red:action.red, green:action.green}
    //         break
    //       default:
    //         someState = state
            
    //         setThemeState(...ThemeState, someState)
    //         return someState;
    //     }
    //   };
    // useEffect(()=>{
    //     setThemeState(colorState,fontState)

    // },[changeBackgroundColorDispatch,changeFontReducer])



return (
    <ThemeContext.Provider value={{ThemeState, setThemeState, setThemes, loadThemes}}>
        {children}
    </ThemeContext.Provider>
)
}