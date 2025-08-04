import { useState } from 'react';


const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

export function useChatbot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your AI vocabulary assistant powered by Google Gemini. I can help you with:\n• Word meanings and usage\n• Grammar questions\n• Vocabulary building\n• Creative descriptions and explanations\n• Language learning support\n\nJust ask me anything about words and language!",
      timestamp: new Date()
    }
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (userMessage) => {
    const userMsgObj = {
      id: Date.now(),
      type: 'user',
      content: userMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsgObj]);
    setLoading(true);

    try {
     
      const isImageRequest = /generate image|create image|show image|draw|picture|visual/i.test(userMessage);
      
      if (isImageRequest) {
        await generateImage(userMessage);
      } else {
        await generateTextResponse(userMessage);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg = {
        id: Date.now() + 1,
        type: 'bot',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const generateTextResponse = async (userMessage) => {
    
    console.log('API Key available:', GEMINI_API_KEY ? 'Yes' : 'No');
    console.log('API Key length:', GEMINI_API_KEY ? GEMINI_API_KEY.length : 0);
    
    if (GEMINI_API_KEY) {
      try {
        console.log('Making Gemini API call...');
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are a helpful vocabulary and language assistant. Help users with word meanings, usage, grammar, and language learning. Be concise but informative. User question: ${userMessage}`
              }]
            }],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 300,
            }
          })
        });

        console.log('Response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Gemini API error response:', errorText);
          throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        console.log('Gemini response received:', data);
        
        const botResponse = {
          id: Date.now() + 1,
          type: 'bot',
          content: data.candidates[0].content.parts[0].text,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
        return;
      } catch (error) {
        console.error('Gemini API error:', error);
        
        
        const errorMsg = {
          id: Date.now() + 1,
          type: 'bot',
          content: `I encountered an issue with the AI service: ${error.message}. Let me help you with a fallback response instead.`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMsg]);
      }
    }

    
    console.log('Using fallback response');
    const botResponse = generateFallbackResponse(userMessage);
    setMessages(prev => [...prev, botResponse]);
  };

  const generateImage = async (userMessage) => {
    
    const imagePrompt = userMessage.replace(/generate image|create image|show image|draw|picture|visual/i, '').trim();
    console.log('Image request for:', imagePrompt);
    
   
    const fallbackMsg = {
      id: Date.now() + 1,
      type: 'bot',
      content: `I'd love to generate an image for "${imagePrompt}", but I'm currently using Google's Gemini AI which focuses on text responses. However, I can help you with:\n\n• Detailed descriptions of "${imagePrompt}"\n• Creative writing about the concept\n• Finding related vocabulary words\n• Suggesting where to find similar images online\n\nWould you like me to describe "${imagePrompt}" in detail instead?`,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, fallbackMsg]);
  };

  const generateFallbackResponse = (userMessage) => {
    const lowerMsg = userMessage.toLowerCase();
    
    
    const extractWord = (msg) => {
      const patterns = [
        /what does "?([a-zA-Z]+)"? mean/i,
        /define "?([a-zA-Z]+)"?/i,
        /meaning of "?([a-zA-Z]+)"?/i,
        /what is "?([a-zA-Z]+)"?/i,
        /synonyms? for "?([a-zA-Z]+)"?/i,
        /examples? (?:of|with) "?([a-zA-Z]+)"?/i
      ];
      
      for (const pattern of patterns) {
        const match = msg.match(pattern);
        if (match) return match[1];
      }
      return null;
    };

    const extractedWord = extractWord(userMessage);
    
    
    if (lowerMsg.includes('meaning') || lowerMsg.includes('define') || lowerMsg.includes('what is')) {
      if (extractedWord) {
        return {
          id: Date.now() + 1,
          type: 'bot',
          content: `I'd be happy to help you with "${extractedWord}"! While I don't have my full AI powers available right now, I recommend:\n\n• Use the Search tab to look up "${extractedWord}" in our dictionary\n• The dictionary will provide definitions, pronunciations, and examples\n• You can also bookmark it for later reference\n\nFor AI-powered responses, make sure to add your Google Gemini API key to the .env file!`,
          timestamp: new Date()
        };
      }
      return {
        id: Date.now() + 1,
        type: 'bot',
        content: 'I can help you find word meanings! Try asking: "What does [word] mean?" or use the Search tab to look up any word in our comprehensive dictionary.',
        timestamp: new Date()
      };
    }
    
    if (lowerMsg.includes('synonym') || lowerMsg.includes('similar word')) {
      if (extractedWord) {
        return {
          id: Date.now() + 1,
          type: 'bot',
          content: `Looking for synonyms for "${extractedWord}"? Here's what I suggest:\n\n• Search for "${extractedWord}" in the Search tab\n• Our dictionary often includes synonyms in the word definitions\n• You can also try searching for related words\n\nWith a Google Gemini API key, I could provide comprehensive synonym lists instantly!`,
          timestamp: new Date()
        };
      }
      return {
        id: Date.now() + 1,
        type: 'bot',
        content: 'I can help you find synonyms! Try asking "What are synonyms for [word]?" For now, use the Search tab to look up words - many definitions include synonyms and related terms.',
        timestamp: new Date()
      };
    }
    
    if (lowerMsg.includes('example') || lowerMsg.includes('sentence')) {
      if (extractedWord) {
        return {
          id: Date.now() + 1,
          type: 'bot',
          content: `Want to see "${extractedWord}" in context? Here are some quick examples:\n\n• "The ${extractedWord} was impressive."\n• "She demonstrated great ${extractedWord}."\n• "This is a perfect example of ${extractedWord}."\n\nFor more detailed and contextual examples, search for "${extractedWord}" in our dictionary, or add a Google Gemini API key for AI-generated examples!`,
          timestamp: new Date()
        };
      }
      return {
        id: Date.now() + 1,
        type: 'bot',
        content: 'I can help create example sentences! Tell me which word you\'d like to see in context. You can also use the Search tab to find real examples in our dictionary definitions.',
        timestamp: new Date()
      };
    }
    
    if (lowerMsg.includes('grammar') || lowerMsg.includes('usage')) {
      return {
        id: Date.now() + 1,
        type: 'bot',
        content: 'I can help with grammar and word usage! Here are some quick tips:\n\n• For specific words, use the Search tab to see proper usage\n• Pay attention to the part of speech (noun, verb, adjective, etc.)\n• Look at example sentences in definitions\n\nWith a Google Gemini API key, I could provide detailed grammar explanations and usage rules!',
        timestamp: new Date()
      };
    }

    
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
      return {
        id: Date.now() + 1,
        type: 'bot',
        content: 'Hello! 👋 I\'m your vocabulary assistant powered by Google Gemini. I can help you with words, meanings, and language questions. Try asking me about any word, or use the Search tab to explore our dictionary!\n\nFor full AI capabilities, add your Google Gemini API key to unlock advanced features.',
        timestamp: new Date()
      };
    }
    
    
    return {
      id: Date.now() + 1,
      type: 'bot',
      content: 'I\'m here to help with vocabulary and language! You can:\n\n📚 Ask about word meanings: "What does [word] mean?"\n🔍 Request synonyms: "Synonyms for [word]?"\n✍️ Get example sentences: "Example sentences with [word]"\n📖 Use the Search tab for full dictionary lookups\n\n💡 Add a Google Gemini API key for advanced AI responses and detailed explanations!',
      timestamp: new Date()
    };
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: "Chat cleared! How can I help you with vocabulary today?",
        timestamp: new Date()
      }
    ]);
  };

  return {
    messages,
    loading,
    sendMessage,
    clearChat
  };
}
