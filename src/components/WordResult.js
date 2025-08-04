import React from "react";
import { FcSpeaker } from "react-icons/fc";
import { FaBookmark, FaRegBookmark, FaCopy } from "react-icons/fa";
import '../styles/WordResult.css';

function WordResult({ data, onToggleBookmark, onPlayAudio, isBookmarked }) {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="dictionary-result">
      <div className="word-header">
        <div className="word-title">
          <h2>{data.word}</h2>
          {data.phonetic && <span className="phonetic">{data.phonetic}</span>}
        </div>
        <div className="word-actions">
          <button 
            onClick={onToggleBookmark}
            className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
            title={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
          >
            {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
          </button>
          <button 
            onClick={() => copyToClipboard(data.word)} 
            className="copy-btn"
            title="Copy word"
          >
            <FaCopy />
          </button>
          <button onClick={onPlayAudio} className="speaker-btn" title="Pronounce word">
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
  );
}

export default WordResult;
