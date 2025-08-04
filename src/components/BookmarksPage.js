import React from "react";

function BookmarksPage({ bookmarks, onWordSelect }) {
  return (
    <div className="bookmarks-page">
      <h2>Your Saved Words</h2>
      {bookmarks.length === 0 ? (
        <p className="no-bookmarks">No bookmarks yet. Search for words to save them!</p>
      ) : (
        <ul className="bookmarks-list">
          {bookmarks.map((item) => (
            <li key={item.word}>
              <button 
                onClick={() => onWordSelect(item)}
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
  );
}

export default BookmarksPage;
