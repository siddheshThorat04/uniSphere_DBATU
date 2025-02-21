import { createContext, useContext, useState } from "react";

export const DarkThemeContext=createContext()

export const useDarkThemeContext=()=>{
    return  useContext(DarkThemeContext)
}
export const DarkThemeContextProvider=({children})=>{
    const [isDark, setDark] = useState(localStorage.getItem("mbTheme")||false  );
    return <DarkThemeContext.Provider value={{isDark, setDark}}>
        {children}
        </DarkThemeContext.Provider>
        
} 