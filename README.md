# 📚 VerboX Dictionary

A modern, feature-rich dictionary application built with React that provides comprehensive word definitions, pronunciations, and an intelligent AI assistant for language learning.

![VerboX Dictionary](public/logo192.png)

## ✨ Features

### 🔍 **Smart Word Search**
- **Enhanced Search Interface**: Clean, intuitive search with real-time suggestions
- **Clear Button**: Easily clear search terms with one click
- **Keyboard Shortcuts**: Press Enter to search quickly
- **Loading States**: Visual feedback during API calls with spinning indicators

### 📖 **Comprehensive Word Information**
- **Detailed Definitions**: Multiple meanings and parts of speech
- **Phonetic Pronunciations**: IPA notation and audio playback
- **Usage Examples**: Real-world sentence examples for better understanding
- **Synonyms & Antonyms**: Expand your vocabulary with related words
- **Interactive Actions**:
  - 🔊 **Audio Pronunciation**: Click to hear the correct pronunciation
  - 📋 **Copy to Clipboard**: Instantly copy words to clipboard
  - ⭐ **Bookmark Words**: Save favorite words for later review

### 📚 **Advanced Bookmark Management**
- **Comprehensive Organization**:
  - 🔍 **Smart Search**: Find bookmarks by word or definition
  - 🔄 **Multi-level Sorting**: Sort by word, date added, or part of speech
  - 🏷️ **Filter by Type**: Filter by noun, verb, adjective, etc.
  - 📋 **View Modes**: Switch between list and grid layouts
  
- **Bulk Operations**:
  - ✅ **Select All/Deselect**: Manage multiple bookmarks at once
  - 🗑️ **Bulk Delete**: Remove multiple bookmarks simultaneously
  - 📥 **Export Feature**: Download bookmarks as JSON file
  
- **Individual Actions**:
  - 🔊 **Pronounce**: Audio playback for saved words
  - 📋 **Copy**: Quick word copying
  - 🗑️ **Remove**: Delete individual bookmarks
  - 📅 **Date Tracking**: See when words were added

### 🤖 **AI Language Assistant**
- **Intelligent Chat Interface**: Modern, expandable chat design
- **Voice Input**: Speech-to-text functionality for hands-free interaction
- **Quick Actions**: Pre-configured prompts for common tasks:
  - 🎲 **Random Words**: Discover new vocabulary
  - 🧠 **Word Quizzes**: Test your knowledge
  - 💡 **Learning Tips**: Daily language improvement advice
  - 🧩 **Word Puzzles**: Challenging vocabulary games
  
- **Interactive Features**:
  - 🔊 **Text-to-Speech**: Listen to AI responses
  - 📋 **Copy Messages**: Save helpful responses
  - 👍👎 **Rate Responses**: Provide feedback on AI answers
  - 🗑️ **Clear Chat**: Start fresh conversations

### 🎨 **Modern User Experience**
- **Dark/Light Mode**: Toggle between themes for comfortable viewing
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Polished interactions and transitions
- **Accessibility**: Screen reader support and keyboard navigation
- **Local Storage**: Automatically save bookmarks and preferences

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/apoorva0777/VerboX.git
   cd VerboX/dictionary-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 🛠️ Available Scripts

### `npm start`
Runs the app in development mode with hot reloading enabled.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production with optimized performance:
- Minified and optimized code
- Static assets with hashed filenames
- Ready for deployment

### `npm run eject`
**⚠️ Warning: This is a one-way operation!**
Ejects from Create React App to customize build configuration.

## 📁 Project Structure

```
dictionary-app/
├── public/                 # Static assets
│   ├── book.gif           # Animated logo
│   ├── favicon.ico        # App icon
│   └── manifest.json      # PWA configuration
├── src/
│   ├── components/        # React components
│   │   ├── HomePage.js    # Landing page
│   │   ├── Dictionary.js  # Main dictionary container
│   │   ├── SearchBox.js   # Enhanced search input
│   │   ├── WordResult.js  # Word display component
│   │   ├── BookmarksPage.js # Advanced bookmark management
│   │   ├── ChatBot.js     # AI assistant interface
│   │   ├── Header.js      # Navigation header
│   │   └── Footer.js      # App footer
│   ├── hooks/             # Custom React hooks
│   │   ├── useDictionary.js # Dictionary API logic
│   │   ├── useChatbot.js    # AI chat functionality
│   │   ├── useTheme.js      # Theme management
│   │   └── useLocalStorage.js # Persistent storage
│   ├── styles/            # Modular CSS files
│   │   ├── variables.css  # CSS custom properties
│   │   ├── global.css     # Global styles
│   │   └── [Component].css # Component-specific styles
│   └── App.js             # Root application component
└── package.json           # Dependencies and scripts
```

## 🔧 Key Technologies

- **Frontend Framework**: React 19.1.0 with Hooks
- **HTTP Client**: Axios for API requests
- **Icons**: React Icons library with Font Awesome
- **Styling**: Modular CSS with CSS custom properties
- **Storage**: Local Storage for data persistence
- **API**: Free Dictionary API for word definitions
- **Build Tool**: Create React App (Webpack + Babel)

## 🌐 API Integration

VerboX uses the [Free Dictionary API](https://api.dictionaryapi.dev/) to fetch:
- Word definitions and meanings
- Phonetic pronunciations with audio
- Parts of speech classification
- Usage examples and synonyms

## 🎯 Core Features in Detail

### Enhanced Search Experience
- **Smart Input**: Auto-focus and keyboard shortcuts
- **Visual Feedback**: Loading states and clear actions
- **Suggestion System**: Helpful search tips and guidance

### Comprehensive Bookmark System
- **Advanced Filtering**: Search by word content or definitions
- **Multiple Sort Options**: Alphabetical, chronological, or by word type
- **Data Export**: Download your vocabulary collection as JSON
- **Bulk Management**: Select and manage multiple items efficiently

### AI-Powered Learning
- **Natural Conversations**: Chat naturally about language topics
- **Learning Assistance**: Grammar help, etymology, and usage tips
- **Interactive Features**: Voice input and text-to-speech output
- **Personalized Experience**: Rate responses for better interactions

## 📱 Responsive Design

VerboX is fully responsive and optimized for:
- 🖥️ **Desktop**: Full-featured experience with all capabilities
- 📱 **Mobile**: Touch-optimized interface with mobile-first design
- 📟 **Tablet**: Adapted layouts for medium screen sizes

## 🔒 Privacy & Storage

- **Local Storage**: All bookmarks and preferences stored locally
- **No User Accounts**: No sign-up required, complete privacy
- **API Usage**: Only word lookup requests sent to dictionary API
- **Offline Capability**: Bookmarks available without internet connection

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Free Dictionary API](https://api.dictionaryapi.dev/) for comprehensive word data
- [React Icons](https://react-icons.github.io/react-icons/) for beautiful iconography
- [Create React App](https://create-react-app.dev/) for the development foundation

## 📧 Support

For support, questions, or suggestions:
- 🐛 **Issues**: [GitHub Issues](https://github.com/apoorva0777/VerboX/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/apoorva0777/VerboX/discussions)
- 📧 **Contact**: Open an issue for direct communication

---

**Made with ❤️ for language learners and word enthusiasts**

*VerboX - Your intelligent companion for vocabulary exploration and language mastery.*
