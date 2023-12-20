import React, { useState, useEffect } from 'react';

const EmojiPicker = ({ onSelect }) => {
  const [emojis, setEmojis] = useState([]);

  useEffect(() => {
    const fetchEmojis = async () => {
      try {
       
        const response = await fetch('https://emojiapi.dev/api/v1/emojis');
        const data = await response.json();
        setEmojis(data);
      } catch (error) {
        console.error('Erro ao obter emojis:', error);
      }
    };

    fetchEmojis();
  }, []);

  return (
    <div className="emoji-picker">
      {emojis.map((emoji, index) => (
        <span key={index} onClick={() => onSelect(emoji)}>
          {emoji}
        </span>
      ))}
    </div>
  );
};

export default EmojiPicker;
