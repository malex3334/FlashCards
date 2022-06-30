import { createContext, useState } from "react";

export const DataContext = createContext();

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);

  // change theme
  const handleToggleTheme = () => {
    setDark(!dark);
    console.log(dark);
  };

  return (
    <DataContext.Provider value={{ dark, setDark, handleToggleTheme }}>
      {children}
    </DataContext.Provider>
  );
}
