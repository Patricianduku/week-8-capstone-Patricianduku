import React, { useState, useEffect, useRef, useContext } from 'react';
import { ArrowLeft, Send, Users, Shield, MoreVertical } from 'lucide-react';
import AnonymousTag from './AnonymousTag';
import { SocketContext } from "../contexts/SocketContext";

const ChatRoom = ({ room, onBack }) => {
  const socket = useContext(SocketContext);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [currentUser] = useState(`User${Math.floor(Math.random() * 1000)}`);
  const [activeUsers, setActiveUsers] = useState(0);
  const messagesEndRef = useRef(null);

  // Mock messages for demonstration
  useEffect(() => {
    const mockMessages = [
      {
        id: 1,
        user: 'User123',
        message: 'Hi everyone, having a tough day with anxiety. Anyone else feeling this way?',
        timestamp: new Date(Date.now() - 300000),
        isCurrentUser: false
      },
      {
        id: 2,
        user: 'User456',
        message: 'I understand completely. You\'re not alone in this. What helps me is deep breathing exercises.',
        timestamp: new Date(Date.now() - 240000),
        isCurrentUser: false
      },
      {
        id: 3,
        user: 'User789',
        message: 'Thank you for sharing. It takes courage to reach out. Have you tried the 4-7-8 breathing technique?',
        timestamp: new Date(Date.now() - 180000),
        isCurrentUser: false
      },
      {
        id: 4,
        user: 'User123',
        message: 'I haven\'t tried that specific technique. Could you explain how it works?',
        timestamp: new Date(Date.now() - 120000),
        isCurrentUser: false
      },
      {
        id: 5,
        user: 'User456',
        message: 'Sure! Breathe in for 4 counts, hold for 7, then exhale for 8. It really helps calm the nervous system.',
        timestamp: new Date(Date.now() - 60000),
        isCurrentUser: false
      }
    ];
    setMessages(mockMessages);
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.emit("joinRoom", { room, anonymousTag: "User" + Math.floor(Math.random() * 1000) });
    socket.on("activeUsers", setActiveUsers);
    return () => {
      socket.off("activeUsers", setActiveUsers);
    };
  }, [socket, room]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        user: currentUser,
        message: message.trim(),
        timestamp: new Date(),
        isCurrentUser: true
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4 transition-colors duration-200">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-colors duration-200"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {room.name}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{activeUsers} active</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Shield className="h-4 w-4" />
                  <span>Anonymous</span>
                </div>
              </div>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 bg-gray-50 dark:bg-gray-900 overflow-hidden transition-colors duration-200">
        <div className="max-w-4xl mx-auto h-full flex flex-col">
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isCurrentUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md ${msg.isCurrentUser ? 'order-2' : 'order-1'}`}>
                  <div className="flex items-center space-x-2 mb-1">
                    <AnonymousTag username={msg.user} />
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                  <div
                    className={`px-4 py-2 rounded-lg ${
                      msg.isCurrentUser
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-gray-900 border border-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.message}</p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-4 transition-colors duration-200">
            <form onSubmit={handleSendMessage} className="flex space-x-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a supportive message..."
                className="flex-1 input-field"
                maxLength={500}
              />
              <button
                type="submit"
                disabled={!message.trim()}
                className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </form>
            <div className="flex justify-between items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
              <span>Be kind, supportive, and respectful</span>
              <span>{message.length}/500</span>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-t border-yellow-200 dark:border-yellow-800 px-4 py-3 transition-colors duration-200">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-yellow-800 dark:text-yellow-200 text-center">
            <Shield className="inline h-3 w-3 mr-1" />
            This is a peer support space. For crisis situations, please contact emergency services or visit our resources page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;