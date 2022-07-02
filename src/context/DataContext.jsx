import { createContext, useState, useEffect } from "react";
import Data from "../data/data.json";

export const DataContext = createContext();

export function ThemeProvider({ children }) {
  const [data, setData] = useState(
    // localStorage.getItem("data")
    //   ? JSON.parse(localStorage.getItem("data"))
    //   : Data
    !localStorage.getItem("data") || localStorage.getItem("data") === []
      ? Data
      : JSON.parse(localStorage.getItem("data"))
  );
  const [dark, setDark] = useState(true);
  const [hint, setHint] = useState(false);
  const [newCard, setNewCard] = useState(false);
  const [dictionary, setDictionary] = useState("");
  // change theme
  const handleToggleTheme = () => {
    setDark(!dark);
  };

  useEffect(() => {
    if (data.length == 0) {
      setData(Data);
    }
  }, [data]);

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
