import React, { useState, useEffect, useRef } from 'react';
import './Chatbox.css';

const Chatbox = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: 'bot', text: 'سلام! چطور می‌تونم بهت کمک کنم؟' }]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws/chat');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, { sender: data.sender, text: data.message }]);
    };
    return () => ws.close();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (input.trim()) {
      setMessages((prev) => [...prev, { sender: 'user', text: input }]);
      const ws = new WebSocket('ws://localhost:8000/ws/chat');
      ws.onopen = () => {
        ws.send(JSON.stringify({ message: input }));
        ws.close();
      };
      setInput('');
    }
  };

  return (
    <div className={`chatbox ${isOpen ? 'active' : ''}`}>
      <div className="chatbox-header">
        <h5>پشتیبانی Royal Jeans</h5>
        <div className="user-status">
          <span>{user?.first_name} {user?.last_name}</span>
          <span className={`status ${user?.status === 'online' ? 'online' : user?.status === 'away' ? 'away' : ''}`}></span>
        </div>
        <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'بستن' : 'باز'}</button>
      </div>
      <div className="chatbox-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === 'bot' ? 'bot-message' : 'user-message'}`}>
            <p>{msg.text}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {isOpen && (
        <div className="chatbox-footer">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="پیام خود را بنویسید..."
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button onClick={sendMessage}>ارسال</button>
        </div>
      )}
    </div>
  );
};

export default Chatbox;