import React from "react";
import { FcSpeaker } from "react-icons/fc";

function WordResult({ data, onToggleBookmark, onPlayAudio, isBookmarked }) {
  return (
    <div className="dictionary-result">
      <div className="word-header">
        <h2>{data.word}</h2>
        <div className="word-actions">
          <button 
            onClick={onToggleBookmark}
            className="bookmark-btn"
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            {isBookmarked ? '★' : '☆'}
          </button>
          {data.phonetic && <span className="phonetic">{data.phonetic}</span>}
          <button onClick={onPlayAudio} className="speaker-btn">
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
