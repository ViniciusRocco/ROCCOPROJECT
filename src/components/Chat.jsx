import React, { useState, useEffect } from 'react';
import EmojiPicker from './EmojiPicker';
import useLocalStorage from '../hooks/useLocalStorage';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useLocalStorage('chat-messages', []);

  const sendMessage = () => {
    if (message.trim() !== '') {
      const newMessage = { text: message, timestamp: new Date().toISOString() };
      setMessages([...messages, newMessage]);

      window.postMessage({ type: 'NEW_MESSAGE', payload: newMessage }, '*');

      setMessage('');
    }
  };

  const handleEmojiSelect = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji);
  };

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'NEW_MESSAGE') {
        const receivedMessage = event.data.payload;
        setMessages([...messages, receivedMessage]);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="message-history">
        {messages.map((msg, index) => (
          <div key={index}>{msg.text}</div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Enviar</button>
        <EmojiPicker onSelect={handleEmojiSelect} />
      </div>
    </div>
  );
};

export default Chat;
