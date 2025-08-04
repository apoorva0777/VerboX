import React, { useState } from "react";
import HomePage from "./HomePage";
import Dictionary from "./Dictionary";
import { useTheme } from "../hooks/useTheme";

function AppRouter() {
  const [showHome, setShowHome] = useState(true);
  const { darkMode, setDarkMode } = useTheme();

  return (
    <div className={`app-wrapper ${darkMode ? "dark-mode" : ""}`}>
      {showHome ? (
        <HomePage 
          onGetStarted={() => setShowHome(false)} 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
        />
      ) : (
        <Dictionary 
          onBackHome={() => setShowHome(true)} 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
        />
      )}
    </div>
  );
}

export default AppRouter;
