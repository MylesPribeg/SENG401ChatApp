import { createContext, useReducer } from 'react'

export const ThemesContext = createContext()

export const themesReducer = (state, action) => {

    switch (action.type) {
      case "SET_THEMES":
        console.log("Theme changed")
        return {
          theme: action.payload
          
        }
      default:
        return state;
    }
}

export const ThemesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themesReducer, { 
    theme: "green"
  })
  
  return (
    <ThemesContext.Provider value={{ ...state, dispatch }}>
      { children }
    </ThemesContext.Provider>
  )
}