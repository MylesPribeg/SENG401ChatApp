import { useThemeContext } from "./useThemeContext"


export const useFont = () => {

    const {ThemeState, setThemeState} = useThemeContext()
  const setFont = (input) =>{
    var r = document.querySelector(':root');
    r.style.setProperty('--font',input)

    setThemeState({...ThemeState, font:input })
  }

  const setFontStyle =(input)=>{
    var r = document.querySelector(':root');
    r.style.setProperty('--font-style',input)

    setThemeState({...ThemeState, fontStyle:input})
  }
  const setFontColour =(input)=>{
    var r = document.querySelector(':root');
    r.style.setProperty('--font-colour',`rgb(${input}, ${input}, ${input})`)

    setThemeState({...ThemeState, fontColour:input})
  }



    return {setFont, setFontColour, setFontStyle}
}
