  import { useState } from "react";
  import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";


  export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();


  const signUp = async (username, email, password) => {
    
    setIsLoading(true);
    setError(null);

    const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.message);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      console.log("on baby?")
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
      navigate("/");
    }
  };
  return { signUp, error, isLoading };
};

