import { createContext, useState } from "react";
import Data from "../data/data.json";

export const DataContext = createContext();

export function ThemeProvider({ children }) {
  const [data, setData] = useState(Data);
  const [dark, setDark] = useState(true);
  const [hint, setHint] = useState(false);
  const [newCard, setNewCard] = useState(false);
  const [dictionary, setDictionary] = useState("");
  // change theme
  const handleToggleTheme = () => {
    setDark(!dark);
    console.log(dark);
  };

  return (
    <DataContext.Provider
      value={{
        dark,
        setDark,
        handleToggleTheme,
        data,
        setData,
        hint,
        setHint,
        dictionary,
        setDictionary,
        newCard,
        setNewCard,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
