import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import { ThemeContextProvider} from "./contexts/ThemeContext"
import { GroupsContextProvider } from "./contexts/GroupsContext"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <GroupsContextProvider>
      <AuthContextProvider>
        <ThemeContextProvider>
          
            <App/>
          
        </ThemeContextProvider>  
      </AuthContextProvider>
      </GroupsContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
