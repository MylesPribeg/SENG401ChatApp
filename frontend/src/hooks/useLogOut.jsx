import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogOut = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    navigate("/login"); // Redirect to the login page using useNavigate
  };

  return { logOut };
};
