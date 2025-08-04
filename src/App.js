import React, { useState } from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import Dictionary from "./components/Dictionary";
import { useTheme } from "./hooks/useTheme";

function App() {
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

export default App;