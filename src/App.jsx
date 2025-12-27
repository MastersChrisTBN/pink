import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Settings, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    const savedKey = localStorage.getItem('ai_api_key');
    if (savedKey) setApiKey(savedKey);
  }, [messages]);

  const saveKey = (key) => {
    setApiKey(key);
    localStorage.setItem('ai_api_key', key);
    setShowSettings(false);
  };

  const handleSend = async () => {
    if (!input.trim() || !apiKey) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [...messages, userMessage],
        })
      });

      const data = await response.json();
      if (data.choices) {
        setMessages(prev => [...prev, data.choices[0].message]);
      } else {
        throw new Error(data.error?.message || 'Something went wrong');
      }
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-600 rounded-lg text-white">
            <Bot size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">AI Assistant</h1>
        </div>
        <button 
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors"
        >
          <Settings size={20} className="text-slate-600" />
        </button>
      </header>

      {/* Settings Modal */}
      {showSettings && (
        <div className="absolute top-16 right-6 z-50 bg-white p-4 rounded-xl border shadow-xl w-80">
          <label className="block text-sm font-medium mb-2">OpenAI API Key</label>
          <input 
            type="password" 
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full p-2 border rounded-md mb-3 text-sm"
            placeholder="sk-..."
          />
          <button 
            onClick={() => saveKey(apiKey)}
            className="w-full bg-blue-600 text-white py-2 rounded-md text-sm font-medium"
          >
            Save Key
          </button>
          <p className="text-[10px] text-slate-400 mt-2 italic">
            Key disimpan secara lokal di browser Anda.
          </p>
        </div>
      )}

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-slate-400">
            <Bot size={48} className="mb-4 opacity-20" />
            <p>Masukkan API Key di pengaturan dan mulai chatting!</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'user' ? 'bg-blue-100 text-blue-600' : 'bg-slate-200 text-slate-600'
              }`}>
                {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
              </div>
              <div className={`p-4 rounded-2xl ${
                msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white border shadow-sm'
              }`}>
                <ReactMarkdown className="prose prose-sm max-w-none">
                  {msg.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
              <Loader2 size={18} className="animate-spin text-slate-600" />
            </div>
            <div className="p-4 rounded-2xl bg-white border shadow-sm">
              <span className="text-slate-400 animate-pulse">Berpikir...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* Input Area */}
      <footer className="p-4 bg-white border-t">
        <div className="max-w-4xl mx-auto relative">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ketik pesan..."
            className="w-full pl-4 pr-12 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
          />
          <button 
            onClick={handleSend}
            disabled={!apiKey || loading}
            className="absolute right-2 top-1.5 p-1.5 bg-blue-600 text-white rounded-full disabled:opacity-50 hover:bg-blue-700 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </footer>
    </div>
  );
}