import { createContext, useState } from "react";
import Data from "../data/data.json";

export const DataContext = createContext();

export function ThemeProvider({ children }) {
  const [data, setData] = useState(Data);
  const [dark, setDark] = useState(false);

  // change theme
  const handleToggleTheme = () => {
    setDark(!dark);
    console.log(dark);
  };

  return (
    <DataContext.Provider
      value={{ dark, setDark, handleToggleTheme, data, setData }}
    >
      {children}
    </DataContext.Provider>
  );
}
