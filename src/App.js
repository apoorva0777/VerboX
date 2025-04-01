import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import "./App.css";
import { FaSearch, FaMoon, FaSun, FaArrowLeft } from "react-icons/fa";
import { FcSpeaker } from "react-icons/fc";
// import bookGif from "./book.gif"; // Import your book GIF

function HomePage({ onGetStarted }) {
  return (
    <div className="home-container">
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
      </div>
    </div>
  );
}

function Dictionary({ onBackHome }) {
  const [data, setData] = useState(null);
  const [searchWord, setSearchWord] = useState("");
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "enabled"
  );
  const [bookmarks, setBookmarks] = useState(
    JSON.parse(localStorage.getItem("bookmarks")) || []
  );
  const [currentView, setCurrentView] = useState("search");
  const searchInputRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode ? "enabled" : "disabled");
    searchInputRef.current?.focus();
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const getMeaning = () => {
    if (!searchWord.trim()) {
      setError("Please enter a word.");
      return;
    }

    Axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`)
      .then((response) => {
        setData(response.data[0]);
        setError("");
      })
      .catch(() => {
        setError("Word not found. Try another one.");
        setData(null);
      });
  };

  const playAudio = () => {
    const audioUrl = data?.phonetics?.find((phonetic) => phonetic.audio)?.audio;
    if (audioUrl) {
      new Audio(audioUrl).play();
    } else {
      setError("Audio not available for this word.");
    }
  };

  const toggleBookmark = () => {
    if (!data) return;
    
    const isBookmarked = bookmarks.some(b => b.word === data.word);
    
    if (isBookmarked) {
      setBookmarks(bookmarks.filter(b => b.word !== data.word));
    } else {
      setBookmarks([...bookmarks, data]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      getMeaning();
    }
  };

  return (
    <div className={`dictionary-container ${darkMode ? "dark" : ""}`}>
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
            Bookmarks ({bookmarks.length})
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

      <main className="app-main">
        {currentView === "search" ? (
          <>
            <div className="search-container">
              <div className="search-box">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search for a word..."
                  value={searchWord}
                  onChange={(e) => setSearchWord(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button onClick={getMeaning}>
                  <FaSearch />
                </button>
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            {data && (
              <div className="dictionary-result">
                <div className="word-header">
                  <h2>{data.word}</h2>
                  <div className="word-actions">
                    <button 
                      onClick={toggleBookmark}
                      className="bookmark-btn"
                      aria-label={
                        bookmarks.some(b => b.word === data.word) 
                          ? "Remove bookmark" 
                          : "Add bookmark"
                      }
                    >
                      {bookmarks.some(b => b.word === data.word) 
                        ? '★' 
                        : '☆'}
                    </button>
                    {data.phonetic && <span className="phonetic">{data.phonetic}</span>}
                    <button onClick={playAudio} className="speaker-btn">
                      <FcSpeaker />
                    </button>
                  </div>
                </div>

                {data.meanings?.map((meaning, index) => (
                  <div key={index} className="meaning-section">
                    <h3 className="part-of-speech">{meaning.partOfSpeech}</h3>
                    
                    <div className="definition">
                      <p><strong>Definition:</strong> {meaning.definitions[0]?.definition || "N/A"}</p>
                    </div>

                    {meaning.definitions[0]?.example && (
                      <div className="example">
                        <p><strong>Example:</strong> "{meaning.definitions[0].example}"</p>
                      </div>
                    )}

                    {meaning.synonyms?.length > 0 && (
                      <div className="synonyms">
                        <h4>Synonyms</h4>
                        <p>{meaning.synonyms.join(", ")}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="bookmarks-page">
            <h2>Your Saved Words</h2>
            {bookmarks.length === 0 ? (
              <p className="no-bookmarks">No bookmarks yet. Search for words to save them!</p>
            ) : (
              <ul className="bookmarks-list">
                {bookmarks.map((item) => (
                  <li key={item.word}>
                    <button 
                      onClick={() => {
                        setData(item);
                        setCurrentView("search");
                      }}
                      className="bookmark-item"
                    >
                      <h3>{item.word}</h3>
                      <p>
                        {item.meanings[0]?.partOfSpeech} •{" "}
                        {item.meanings[0]?.definitions[0]?.definition.substring(0, 60)}...
                      </p>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>© {new Date().getFullYear()} VerboX Dictionary</p>
      </footer>
    </div>
  );
}

function App() {
  const [showHome, setShowHome] = useState(true);

  return (
    <div className="app-wrapper">
      {showHome ? (
        <HomePage onGetStarted={() => setShowHome(false)} />
      ) : (
        <Dictionary onBackHome={() => setShowHome(true)} />
      )}
    </div>
  );
}

export default App;