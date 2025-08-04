import React, { useState, useRef, useEffect } from 'react';
import { 
  FaPaperPlane, 
  FaTrash, 
  FaRobot, 
  FaUser, 
  FaMicrophone, 
  FaStop, 
  FaCopy, 
  FaThumbsUp, 
  FaThumbsDown,
  FaExpand,
  FaCompress,
  FaVolumeUp,
  FaBrain,
  FaLightbulb,
  FaRandom,
  FaHeart
} from 'react-icons/fa';
import { useChatbot } from '../hooks/useChatbot';
import '../styles/ChatBot.css';

function ChatBot() {
  const [inputMessage, setInputMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [messageRatings, setMessageRatings] = useState({});
  const { messages, loading, sendMessage, clearChat } = useChatbot();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const quickActions = [
    { icon: FaRandom, label: 'Random Word', action: () => setInputMessage('Give me a random interesting word with its meaning') },
    { icon: FaLightbulb, label: 'Word Quiz', action: () => setInputMessage('Create a vocabulary quiz for me') },
    { icon: FaHeart, label: 'Daily Tip', action: () => setInputMessage('Give me a daily language learning tip') },
    { icon: FaBrain, label: 'Challenge', action: () => setInputMessage('Give me a challenging word puzzle') }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || loading) return;
    
    sendMessage(inputMessage);
    setInputMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsRecording(false);
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } else {
      alert('Voice recognition not supported in this browser');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      // Could add a toast notification here
    });
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const rateMessage = (messageId, rating) => {
    setMessageRatings(prev => ({
      ...prev,
      [messageId]: rating
    }));
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const renderMessage = (message) => {
    return (
      <div key={message.id} className={`enhanced-message ${message.type}`}>
        <div className="message-avatar">
          {message.type === 'bot' ? (
            <div className="bot-avatar">
              <FaRobot />
            </div>
          ) : (
            <div className="user-avatar">
              <FaUser />
            </div>
          )}
        </div>
        <div className="message-content">
          <div className="message-bubble">
            <div className="message-text">
              {message.content}
            </div>
            {message.image && (
              <div className="message-image">
                <img src={message.image} alt="Generated" />
              </div>
            )}
          </div>
          <div className="message-actions">
            <span className="message-time">
              {formatTimestamp(message.timestamp)}
            </span>
            {message.type === 'bot' && (
              <div className="action-buttons">
                <button 
                  className="action-btn copy-btn"
                  onClick={() => copyToClipboard(message.content)}
                  title="Copy message"
                >
                  <FaCopy />
                </button>
                <button 
                  className="action-btn speak-btn"
                  onClick={() => speakText(message.content)}
                  title="Read aloud"
                >
                  <FaVolumeUp />
                </button>
                <button 
                  className={`action-btn rating-btn ${messageRatings[message.id] === 'up' ? 'active' : ''}`}
                  onClick={() => rateMessage(message.id, 'up')}
                  title="Helpful"
                >
                  <FaThumbsUp />
                </button>
                <button 
                  className={`action-btn rating-btn ${messageRatings[message.id] === 'down' ? 'active' : ''}`}
                  onClick={() => rateMessage(message.id, 'down')}
                  title="Not helpful"
                >
                  <FaThumbsDown />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`modern-chatbot-container ${isExpanded ? 'expanded' : ''}`}>
      {/* Enhanced Header Section */}
      <div className="modern-chat-header">
        <div className="header-content">
          <div className="header-icon">
            <FaRobot className="robot-icon" />
          </div>
          <div className="header-text">
            <h1 className="header-title">VerboX AI Assistant</h1>
            <p className="header-subtitle">Your intelligent language companion</p>
          </div>
          <div className="header-controls">
            <button 
              className="expand-btn"
              onClick={() => setIsExpanded(!isExpanded)}
              title={isExpanded ? "Minimize" : "Expand"}
            >
              {isExpanded ? <FaCompress /> : <FaExpand />}
            </button>
            {messages.length > 1 && (
              <button 
                onClick={clearChat} 
                className="clear-btn"
                title="Clear conversation"
              >
                <FaTrash />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      {showQuickActions && messages.length <= 1 && (
        <div className="quick-actions-section">
          <h3 className="section-title">Quick Actions</h3>
          <div className="quick-actions-grid">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="quick-action-btn"
                onClick={action.action}
                title={action.label}
              >
                <action.icon className="action-icon" />
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Messages Area */}
      <div className="modern-chat-messages">
        {messages.map(message => renderMessage(message))}
        {loading && (
          <div className="enhanced-message bot">
            <div className="message-avatar">
              <div className="bot-avatar">
                <FaRobot />
              </div>
            </div>
            <div className="message-content">
              <div className="message-bubble typing">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Enhanced Input Section */}
      <div className="modern-input-section">
        <form onSubmit={handleSubmit} className="modern-input-form">
          <div className="input-wrapper">
            <div className="input-controls">
              <button
                type="button"
                className={`voice-btn ${isRecording ? 'recording' : ''}`}
                onClick={handleVoiceInput}
                title={isRecording ? "Stop recording" : "Voice input"}
              >
                {isRecording ? <FaStop /> : <FaMicrophone />}
              </button>
            </div>
            
            <textarea
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about words, grammar, language learning, or anything else..."
              className="modern-input"
              rows="1"
              disabled={loading}
            />
            
            <button 
              type="submit" 
              className={`modern-send-btn ${inputMessage.trim() ? 'active' : ''}`}
              disabled={!inputMessage.trim() || loading}
              title="Send message"
            >
              <FaPaperPlane />
            </button>
          </div>
        </form>
        
        {/* Input Tips */}
        <div className="input-tips">
          <span className="tip">💡 Pro tip: Ask me to explain etymology, create examples, or help with grammar!</span>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
