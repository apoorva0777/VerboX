import React from "react";
import { FaArrowLeft, FaMoon, FaSun } from "react-icons/fa";

function Header({ 
  onBackHome, 
  currentView, 
  setCurrentView, 
  bookmarksCount, 
  darkMode, 
  setDarkMode 
}) {
  return (
    <header className="app-header">
      <button onClick={onBackHome} className="back-button">
        <FaArrowLeft />
      </button>
      <h1>VerboX</h1>
      <nav>
        <button 
          onClick={() => setCurrentView("search")}
          className={currentView === "search" ? "active" : ""}
        >
          Search
        </button>
        <button 
          onClick={() => setCurrentView("bookmarks")}
          className={currentView === "bookmarks" ? "active" : ""}
        >
          Bookmarks ({bookmarksCount})
        </button>
      </nav>
      <button 
        className="theme-toggle" 
        onClick={() => setDarkMode(!darkMode)}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>
    </header>
  );
}

export default Header;
