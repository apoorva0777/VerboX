import React, { useState, useMemo } from "react";
import { 
  FaBookmark, 
  FaTrash, 
  FaSearch, 
  FaSortAlphaDown, 
  FaSortAlphaUp, 
  FaClock, 
  FaTag, 
  FaDownload, 
  FaCopy,
  FaVolumeUp,
  FaList,
  FaTh
} from 'react-icons/fa';
import '../styles/BookmarksPage.css';

function BookmarksPage({ bookmarks, onWordSelect, onRemoveBookmark }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('word'); // 'word', 'date', 'partOfSpeech'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc', 'desc'
  const [filterBy, setFilterBy] = useState('all'); // 'all', 'noun', 'verb', 'adjective', etc.
  const [viewMode, setViewMode] = useState('list'); // 'list', 'grid'
  const [selectedBookmarks, setSelectedBookmarks] = useState(new Set());

  // Get unique parts of speech for filtering
  const partsOfSpeech = useMemo(() => {
    const parts = new Set();
    bookmarks.forEach(item => {
      item.meanings?.forEach(meaning => {
        if (meaning.partOfSpeech) {
          parts.add(meaning.partOfSpeech);
        }
      });
    });
    return Array.from(parts).sort();
  }, [bookmarks]);

  // Filter and sort bookmarks
  const filteredAndSortedBookmarks = useMemo(() => {
    let filtered = bookmarks.filter(item => {
      const matchesSearch = item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.meanings?.some(meaning => 
                             meaning.definitions?.some(def => 
                               def.definition.toLowerCase().includes(searchTerm.toLowerCase())
                             )
                           );
      
      const matchesFilter = filterBy === 'all' || 
                           item.meanings?.some(meaning => meaning.partOfSpeech === filterBy);
      
      return matchesSearch && matchesFilter;
    });

    // Sort bookmarks
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'word':
          comparison = a.word.localeCompare(b.word);
          break;
        case 'date':
          comparison = (a.dateAdded || 0) - (b.dateAdded || 0);
          break;
        case 'partOfSpeech':
          const aPos = a.meanings?.[0]?.partOfSpeech || '';
          const bPos = b.meanings?.[0]?.partOfSpeech || '';
          comparison = aPos.localeCompare(bPos);
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [bookmarks, searchTerm, sortBy, sortOrder, filterBy]);

  const handleSelectBookmark = (word) => {
    const newSelected = new Set(selectedBookmarks);
    if (newSelected.has(word)) {
      newSelected.delete(word);
    } else {
      newSelected.add(word);
    }
    setSelectedBookmarks(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedBookmarks.size === filteredAndSortedBookmarks.length) {
      setSelectedBookmarks(new Set());
    } else {
      setSelectedBookmarks(new Set(filteredAndSortedBookmarks.map(item => item.word)));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedBookmarks.size > 0 && onRemoveBookmark) {
      selectedBookmarks.forEach(word => {
        onRemoveBookmark(word);
      });
      setSelectedBookmarks(new Set());
    }
  };

  const handleExportBookmarks = () => {
    const dataStr = JSON.stringify(filteredAndSortedBookmarks, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'verbox-bookmarks.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const speakWord = (word) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown date';
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className="enhanced-bookmarks-page">
      {/* Header Section */}
      <div className="bookmarks-header">
        <div className="header-title">
          <FaBookmark className="header-icon" />
          <div>
            <h1>Your Saved Words</h1>
            <p className="bookmark-count">{filteredAndSortedBookmarks.length} word{filteredAndSortedBookmarks.length !== 1 ? 's' : ''} saved</p>
          </div>
        </div>
        
        {bookmarks.length > 0 && (
          <div className="header-actions">
            <button 
              className="export-btn"
              onClick={handleExportBookmarks}
              title="Export bookmarks"
            >
              <FaDownload />
              Export
            </button>
          </div>
        )}
      </div>

      {bookmarks.length === 0 ? (
        <div className="empty-bookmarks">
          <div className="empty-icon">
            <FaBookmark />
          </div>
          <h2>No saved words yet</h2>
          <p>Start exploring words and save your favorites to build your personal vocabulary collection!</p>
        </div>
      ) : (
        <>
          {/* Search and Filter Section */}
          <div className="bookmarks-controls">
            <div className="search-section">
              <div className="search-input-wrapper">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search your saved words..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>

            <div className="filter-section">
              <div className="filter-group">
                <label>Sort by:</label>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="word">Word</option>
                  <option value="date">Date Added</option>
                  <option value="partOfSpeech">Part of Speech</option>
                </select>
                
                <button
                  className="sort-order-btn"
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  title={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
                >
                  {sortOrder === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}
                </button>
              </div>

              <div className="filter-group">
                <label>Filter:</label>
                <select 
                  value={filterBy} 
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Types</option>
                  {partsOfSpeech.map(pos => (
                    <option key={pos} value={pos}>
                      {pos.charAt(0).toUpperCase() + pos.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>View:</label>
                <div className="view-toggle">
                  <button
                    className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}
                    title="List view"
                  >
                    <FaList />
                  </button>
                  <button
                    className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                    title="Grid view"
                  >
                    <FaTh />
                  </button>
                </div>
              </div>
            </div>

            {filteredAndSortedBookmarks.length > 0 && (
              <div className="bulk-actions">
                <button
                  className="select-all-btn"
                  onClick={handleSelectAll}
                >
                  {selectedBookmarks.size === filteredAndSortedBookmarks.length ? 'Deselect All' : 'Select All'}
                </button>
                
                {selectedBookmarks.size > 0 && (
                  <button
                    className="delete-selected-btn"
                    onClick={handleDeleteSelected}
                  >
                    <FaTrash />
                    Delete ({selectedBookmarks.size})
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Bookmarks List */}
          {filteredAndSortedBookmarks.length === 0 ? (
            <div className="no-results">
              <FaSearch className="no-results-icon" />
              <h3>No words found</h3>
              <p>Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <div className={`bookmarks-container ${viewMode}`}>
              {filteredAndSortedBookmarks.map((item) => (
                <div 
                  key={item.word} 
                  className={`enhanced-bookmark-item ${selectedBookmarks.has(item.word) ? 'selected' : ''}`}
                >
                  <div className="bookmark-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedBookmarks.has(item.word)}
                      onChange={() => handleSelectBookmark(item.word)}
                    />
                  </div>

                  <div className="bookmark-content" onClick={() => onWordSelect(item)}>
                    <div className="bookmark-header">
                      <h3 className="bookmark-word">{item.word}</h3>
                      <div className="bookmark-actions">
                        <button
                          className="action-btn speak-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            speakWord(item.word);
                          }}
                          title="Pronounce word"
                        >
                          <FaVolumeUp />
                        </button>
                        <button
                          className="action-btn copy-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(item.word);
                          }}
                          title="Copy word"
                        >
                          <FaCopy />
                        </button>
                        {onRemoveBookmark && (
                          <button
                            className="action-btn remove-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              onRemoveBookmark(item.word);
                            }}
                            title="Remove bookmark"
                          >
                            <FaTrash />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="bookmark-details">
                      {item.meanings?.[0] && (
                        <div className="bookmark-meaning">
                          <span className="part-of-speech">
                            <FaTag />
                            {item.meanings[0].partOfSpeech}
                          </span>
                          <p className="definition">
                            {item.meanings[0].definitions?.[0]?.definition}
                          </p>
                        </div>
                      )}
                      
                      <div className="bookmark-meta">
                        <span className="date-added">
                          <FaClock />
                          Added {formatDate(item.dateAdded)}
                        </span>
                        {item.phonetics?.[0]?.text && (
                          <span className="phonetic">
                            /{item.phonetics[0].text}/
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default BookmarksPage;
