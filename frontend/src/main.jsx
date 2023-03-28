import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import { ThemesContextProvider} from "./contexts/ThemesContext"


ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
    
      <AuthContextProvider>
      <ThemesContextProvider> 
          
            <App/>
          
            </ThemesContextProvider> 
      </AuthContextProvider>
      
    </BrowserRouter>
);
