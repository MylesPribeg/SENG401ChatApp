// App.js
import "./Settings.css"
import React, { useEffect } from 'react';
import { useThemesContext } from "../../hooks/useThemesContext";
import { useNavigate } from "react-router-dom";
function Settings() {

  // const [color, setColor] = useState('white')
  const { theme, dispatch } = useThemesContext();
  const colors = ['white', 'yellow', 'red', 'blue', 'green']
  const navigate = useNavigate()

  const renderButtons = colors => {
    return colors.map( (color, index) => {
      return ( <li key={index}
        className={'color-selector ' + color}
        onClick={() => {dispatch({type: "SET_THEMES", payload: color})
                      console.log(color)}}>
      </li> )
    })
  }

  return (
    <div>
    <div className="settings">
      <div id='area' className={theme}> </div>
      <div id='toolbox'>
        { renderButtons(colors) }
      </div>
      
    </div>
    <button onClick={()=>{navigate("/")}}>press me</button>
  
     </div>
  );
}

export default Settings;