import { useState } from 'react';
import Axios from 'axios';

export function useDictionary() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchWord = async (word) => {
    if (!word.trim()) {
      setError('Please enter a word.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await Axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      setData(response.data[0]);
    } catch (err) {
      setError('Word not found. Try another one.');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const playAudio = () => {
    const audioUrl = data?.phonetics?.find((phonetic) => phonetic.audio)?.audio;
    if (audioUrl) {
      new Audio(audioUrl).play();
    } else {
      setError('Audio not available for this word.');
    }
  };

  return {
    data,
    loading,
    error,
    searchWord,
    playAudio,
    setError
  };
}
