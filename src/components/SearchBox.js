import React from "react";
import { FaSearch, FaSpinner, FaTimes } from "react-icons/fa";
import '../styles/SearchBox.css';

function SearchBox({ searchWord, setSearchWord, onSearch, searchInputRef, loading }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  const handleClear = () => {
    setSearchWord('');
    searchInputRef.current?.focus();
  };

  return (
    <div className="search-container">
      <div className="search-box">
        <div className="search-input-container">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search for any word..."
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
          />
          {searchWord && (
            <button 
              className="clear-btn" 
              onClick={handleClear}
              type="button"
              title="Clear search"
            >
              <FaTimes />
            </button>
          )}
        </div>
        <button onClick={onSearch} disabled={loading || !searchWord.trim()}>
          {loading ? <FaSpinner className="spinning" /> : <FaSearch />}
        </button>
      </div>
      {searchWord && !loading && (
        <div className="search-suggestions">
          <small>Press Enter or click search to find "{searchWord}"</small>
        </div>
      )}
    </div>
  );
}

export default SearchBox;
