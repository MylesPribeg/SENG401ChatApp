import { createContext, useState } from "react";

export const ThemeContext = createContext()

export function ThemeContextProvider({children}){
    const [ThemeState,setThemeState] = useState({
        color: "white",
        fontStyle: "x",
        fontColour: "",
        font:"",
        BGred:"100",
        BGgreen:"100",
        BGblue:"100",
        uniqueColour:false
        
        
    }
        )
    useEffect(()=>
    
    
    
    
    
    ,[ThemeState.BGred,])



return (
    <ThemeContext.Provider value={{ThemeState, setThemeState}}>
        {children}
    </ThemeContext.Provider>
)
}