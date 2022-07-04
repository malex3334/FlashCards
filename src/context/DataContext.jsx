import { createContext, useState, useEffect } from "react";
import Data from "../data/data.json";

export const DataContext = createContext();

export function ThemeProvider({ children }) {
  const [data, setData] = useState(
    !localStorage.getItem("data") || localStorage.getItem("data") === []
      ? Data
      : JSON.parse(localStorage.getItem("data"))
  );
  // const [dark, setDark] = useState(true);
  const [dark, setDark] = useState(
    !localStorage.getItem("theme") || localStorage.getItem("theme") === []
      ? true
      : JSON.parse(localStorage.getItem("theme"))
  );
  const [mute, setMute] = useState(
    !localStorage.getItem("mute") || localStorage.getItem("mute") === []
      ? false
      : JSON.parse(localStorage.getItem("mute"))
  );
  const [hint, setHint] = useState(false);
  const [newCard, setNewCard] = useState(false);
  const [dictionary, setDictionary] = useState("");

  // change theme
  const handleToggleTheme = () => {
    setDark(!dark);
  };

  const handleToggleMute = () => {
    setMute(!mute);
  };

  useEffect(() => {
    localStorage.setItem("mute", JSON.stringify(mute));
  });

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(dark));
  }, [dark]);

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
        mute,
        setMute,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
