import { createContext, useState } from "react";

export const ThemeContext = createContext()

export function ThemeContextProvider({children}){
    const [ThemeState,setThemeState] = useState({color: "black"})



return (
    <ThemeContext.Provider value={{ThemeState, setThemeState}}>
        {children}
    </ThemeContext.Provider>
)
}