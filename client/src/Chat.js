import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './Chat.css';

const socket = io("http://localhost:8080");

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    // Listen for new messages from the server
    socket.on('message', (newMessage) => {
      // Add the received message to the messages array 
      setMessages(prevMessages => [...prevMessages, { text: newMessage, type: 'text' }]);
        
    });

    // Listen for image URL from the server
    socket.on('image', (imageUrl) => {
      setImageUrl(imageUrl);
      // Add the received image URL to the messages array
      setMessages(prevMessages => [...prevMessages, { type: 'image', content: imageUrl }]);
    });

    // Clean up the socket listener when component unmounts
    return () => {
      socket.off('message');
      socket.off('image');
    };
  }, []);

  const sendMessage = () => {
    // Add the sent message to the messages array 
    console.log(newMessage)
    setMessages(prevMessages => [...prevMessages, { text: newMessage, type: 'sent' }]);
    // Emit the new message to the server
    console.log(newMessage)
    socket.emit('sendMessage', newMessage);
    // Clear the input field after sending the message
  };

  return (
    <div className="chat-container">
      <div className="message-container">
        {/* Display messages */}
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.type === 'sent' ? 'sent' : 'received'}`}>
            {msg.type === 'text' || msg.type === 'sent' ? (
              <div className="message-text">{msg.text}</div>
            ) : (
              <img className="image-message" src={msg.content} alt="Received Image" />
            )}
          </div>
        ))}
      </div>
      <div className="input-container">
        {/* Input field for new message */}
        <input
          className="message-input"
          placeholder="Ask Something..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="send-button" onClick={sendMessage}>Send Message</button>
      </div>
    </div>
  );
};

export default Chat;






