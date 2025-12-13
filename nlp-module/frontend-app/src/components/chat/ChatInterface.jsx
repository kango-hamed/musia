import { useEffect, useRef, useState } from 'react';
import { useMuseumStore } from '../../store/museumStore';

import { museumService } from '../../services/api';

function ChatInterface() {
  const { messages, addMessage, isChatOpen, toggleChat, sessionId, setSessionId } = useMuseumStore();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);
  const [isSending, setIsSending] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || isSending) return;

    const text = inputText;
    setInputText('');
    addMessage('user', text);
    setIsSending(true);

    try {
        // If no session, might need to start one or just send (backend depends)
        // For this demo, let's assume we send text. 
        // If we need to init session, we'd do it elsewhere or check here.
        let currentSession = sessionId;
        if (!currentSession) {
            // Mock session init or handle appropriately
            currentSession = 'demo-session'; 
            setSessionId(currentSession);
        }

        const data = await museumService.sendMessage(currentSession, text);
        addMessage('bot', data.response || "J'ai bien reçu votre message.");
    } catch (error) {
        console.error(error);
        addMessage('bot', "Désolé, je n'arrive pas à joindre le serveur.");
    } finally {
        setIsSending(false);
    }
  };

  if (!isChatOpen) {
    return (
      <button 
        onClick={toggleChat}
        className="bg-museum-light hover:bg-red-600 text-white rounded-full p-4 shadow-lg transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-2xl w-80 md:w-96 flex flex-col h-[500px] overflow-hidden">
      {/* Header */}
      <div className="bg-museum-primary text-white p-4 flex justify-between items-center">
        <h3 className="font-bold">Guide Virtuel</h3>
        <button onClick={toggleChat} className="hover:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-lg p-3 ${
              msg.sender === 'user' 
                ? 'bg-museum-accent text-white rounded-br-none' 
                : 'bg-white text-gray-800 shadow-md rounded-bl-none border border-gray-100'
            }`}>
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Posez une question..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-museum-accent"
          />
          <button 
            type="submit"
            disabled={!inputText.trim()}
            className="bg-museum-primary text-white rounded-full p-2 hover:bg-museum-accent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatInterface;
