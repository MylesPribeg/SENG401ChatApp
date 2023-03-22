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
        fontStyle: "",
        fontColour: "",
        font:"",
        BGred:100,
        BGgreen:100,
        BGblue:100,
        
        
    })
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
    <ThemeContext.Provider value={{ThemeState, setThemeColor, setThemeFont, setThemeState}}>
        {children}
    </ThemeContext.Provider>
)
}