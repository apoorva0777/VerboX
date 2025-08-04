import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import SearchBox from "./SearchBox";
import WordResult from "./WordResult";
import BookmarksPage from "./BookmarksPage";
import ErrorMessage from "./ErrorMessage";
import { useDictionary } from "../hooks/useDictionary";
import { useLocalStorage } from "../hooks/useLocalStorage";

function Dictionary({ onBackHome, darkMode, setDarkMode }) {
  const { data, loading, error, searchWord, playAudio } = useDictionary();
  const [searchInputValue, setSearchInputValue] = useState("");
  const [bookmarks, setBookmarks] = useLocalStorage("bookmarks", []);
  const [currentView, setCurrentView] = useState("search");
  const searchInputRef = useRef(null);

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  const handleSearch = () => {
    searchWord(searchInputValue);
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

  const handleWordSelect = (item) => {
    // Update the search input and the dictionary data
    setSearchInputValue(item.word);
    setCurrentView("search");
    // We can also set the data directly to avoid re-fetching
    searchWord(item.word);
  };

  const isBookmarked = data && bookmarks.some(b => b.word === data.word);

  return (
    <div className={`dictionary-container ${darkMode ? "dark-mode" : ""}`}>
      <Header 
        onBackHome={onBackHome}
        currentView={currentView}
        setCurrentView={setCurrentView}
        bookmarksCount={bookmarks.length}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main className="app-main">
        {currentView === "search" ? (
          <>
            <SearchBox 
              searchWord={searchInputValue}
              setSearchWord={setSearchInputValue}
              onSearch={handleSearch}
              searchInputRef={searchInputRef}
              loading={loading}
            />

            <ErrorMessage error={error} />

            {data && (
              <WordResult 
                data={data}
                onToggleBookmark={toggleBookmark}
                onPlayAudio={playAudio}
                isBookmarked={isBookmarked}
              />
            )}
          </>
        ) : (
          <BookmarksPage 
            bookmarks={bookmarks}
            onWordSelect={handleWordSelect}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Dictionary;
