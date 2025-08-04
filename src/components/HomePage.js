import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import '../styles/HomePage.css';

function HomePage({ onGetStarted, darkMode, setDarkMode }) {
  return (
    <div className={`home-container ${darkMode ? "dark-mode" : ""}`}>
      <div className="hero-content">
        <img 
          src="book.gif"
          alt="Animated book opening and closing" 
          className="book-animation"
        />
        <h1 className="app-title">VerboX</h1>
        <p className="app-tagline">Your modern dictionary for precise definitions, pronunciations, and word exploration</p>
        <button 
          onClick={onGetStarted}
          className="cta-button"
        >
          Explore Dictionary
        </button>
        <button 
          className="theme-toggle home-theme-toggle" 
          onClick={() => setDarkMode(!darkMode)}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </div>
  );
}

export default HomePage;
