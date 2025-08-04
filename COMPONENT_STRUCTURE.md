# VerboX Dictionary - Component Structure

This project has been refactored into a modular component structure for better maintainability and reusability.

## Project Structure

```
src/
├── components/
│   ├── index.js              # Component exports
│   ├── HomePage.js           # Landing page component
│   ├── Dictionary.js         # Main dictionary application
│   ├── Header.js             # Navigation header
│   ├── Footer.js             # Application footer
│   ├── SearchBox.js          # Search input component
│   ├── WordResult.js         # Word definition display
│   ├── BookmarksPage.js      # Saved words page
│   └── ErrorMessage.js       # Error display component
├── hooks/
│   ├── useLocalStorage.js    # Custom hook for localStorage
│   └── useDictionary.js      # Custom hook for dictionary API
├── App.js                    # Main app component
├── App.css                   # Styles
└── index.js                  # App entry point
```

## Components

### HomePage
- Landing page with animated book GIF
- Theme toggle button
- Call-to-action button to enter dictionary

### Dictionary
- Main container for dictionary functionality
- Manages state for search, bookmarks, and current view
- Uses custom hooks for cleaner code

### Header
- Navigation between search and bookmarks
- Theme toggle button
- Back to home button

### SearchBox
- Search input with loading state
- Enter key support
- Loading spinner animation

### WordResult
- Displays word definitions, pronunciations, examples
- Bookmark toggle functionality
- Audio playback button

### BookmarksPage
- Lists all saved words
- Click to view word details
- Empty state message

### ErrorMessage
- Conditional error display
- Styled error messages

## Custom Hooks

### useLocalStorage
- Handles localStorage operations safely
- Automatic JSON parsing/stringifying
- Error handling

### useDictionary
- Manages dictionary API calls
- Loading and error states
- Audio playback functionality

## Features

- ✅ Dark mode support across all components
- ✅ Responsive design
- ✅ Loading states and error handling
- ✅ Bookmark functionality with localStorage
- ✅ Audio pronunciation
- ✅ Clean, modular component structure
- ✅ Custom hooks for reusable logic
- ✅ Proper error boundaries and loading states

## Benefits of This Structure

1. **Modularity**: Each component has a single responsibility
2. **Reusability**: Components can be easily reused or modified
3. **Maintainability**: Easier to debug and update specific features
4. **Testability**: Smaller components are easier to unit test
5. **Performance**: Can optimize individual components as needed
6. **Developer Experience**: Cleaner imports and better organization
