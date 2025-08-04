import React from "react";
import { FaSearch, FaSpinner } from "react-icons/fa";

function SearchBox({ searchWord, setSearchWord, onSearch, searchInputRef, loading }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="search-container">
      <div className="search-box">
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search for a word..."
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />
        <button onClick={onSearch} disabled={loading}>
          {loading ? <FaSpinner className="spinning" /> : <FaSearch />}
        </button>
      </div>
    </div>
  );
}

export default SearchBox;
