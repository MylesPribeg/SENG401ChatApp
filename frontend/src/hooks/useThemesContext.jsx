import { ThemesContext } from "../contexts/ThemesContext";
import { useContext } from "react";

export const useThemesContext = () => {
  const context = useContext(ThemesContext);

  if (!context) {
    throw new Error("useThemesContext must be used within ThemeContextProvider");
  }

  return context;
};
