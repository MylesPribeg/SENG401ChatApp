import { useAuthContext } from "./useAuthContext";
import { useThemeContext } from "./useThemeContext"


export const useFont = () => {

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



  const setFont = (input) =>{
    var r = document.querySelector(':root');
    r.style.setProperty('--font',input)

    setThemeState({...ThemeState, font:input })
    updateTheme(user,ThemeState)
  }

  const setFontStyle =(input)=>{
    var r = document.querySelector(':root');
    r.style.setProperty('--font-style',input)

    setThemeState({...ThemeState, fontStyle:input})
    updateTheme(user,ThemeState)

  }
  const setFontColour =(input)=>{
    var r = document.querySelector(':root');
    r.style.setProperty('--font-colour',`rgb(${input}, ${input}, ${input})`)

    setThemeState({...ThemeState, fontColour:input})
    updateTheme(user,ThemeState)

  }



    return {setFont, setFontColour, setFontStyle}
}
