import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "./useThemeContext";
export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const {setThemes, loadThemes} = useThemeContext()
  // const API_URL =
  //   process.env.production.REACT_APP_API_URL || "http://localhost:8000";

  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);

    console.log(
      "CALLED TO: " + `${import.meta.env.VITE_REACT_APP_API_URL}users/login`
    );
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}users/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.message);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      console.log("themes" )
      console.log(json.theme)
      loadThemes(json.theme)
      setThemes()
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
      navigate("/");
    }
  };
  return { login, error, isLoading };
};
