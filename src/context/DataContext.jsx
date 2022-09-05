import { createContext, useState, useEffect } from "react";
import Data from "../data/data.json";
import DataES from "../data/dataES.json";

export const DataContext = createContext();

export const handleLang = (language) => {
  if (language === "ENGLISH") {
    if (!localStorage.getItem("data") || localStorage.getItem("data") === []) {
      return Data;
    } else return JSON.parse(localStorage.getItem("data"));
  }
  if (language === "SPANISH") {
    if (
      !localStorage.getItem("dataES") ||
      localStorage.getItem("dataES") === []
    ) {
      return DataES;
    } else {
      return JSON.parse(localStorage.getItem("dataES"));
    }
  }
};

export function ThemeProvider({ children }) {
  const [lang, setLang] = useState("ENGLISH");

  const [data, setData] = useState(handleLang(lang));
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
  const [filteredData, setFilteredData] = useState([]);

  // change theme
  const handleToggleTheme = () => {
    setDark(!dark);
  };

  useEffect(() => {
    localStorage.setItem("mute", JSON.stringify(mute));
  });

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(dark));
  }, [dark]);

  useEffect(() => {
    setFilteredData(data);
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
        filteredData,
        setFilteredData,
        lang,
        setLang,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

//test //
