'use client';

import React, { useState } from 'react';
import { Send, Terminal, Cpu, Globe } from 'lucide-react';

export const ChatInterface = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();
      
      setMessages(prev => [...prev, { role: 'ai', content: data.data }]);
    } catch (err) {
      console.error("Failed to fetch AI response");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Header */}
      <header className="p-6 border-b border-white/10 flex justify-between items-center bg-black/50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Cpu size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">AI ARCHITECT CORE</h1>
        </div>
        <div className="flex gap-4 text-sm text-gray-400">
          <span className="flex items-center gap-1"><Globe size={14}/> Network: Active</span>
          <span className="text-green-500 underline underline-offset-4">API Connected</span>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl ${
              msg.role === 'user' 
              ? 'bg-blue-600 text-white rounded-tr-none' 
              : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none'
            }`}>
              <p className="leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && <div className="animate-pulse text-blue-400">Architect is thinking...</div>}
      </main>

      {/* Input Area */}
      <footer className="p-6 bg-gradient-to-t from-black to-transparent">
        <div className="max-w-4xl mx-auto relative">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your instruction (Web, App, or Logic)..."
            className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 pr-16 focus:outline-none focus:border-blue-500 transition-all"
          />
          <button 
            onClick={handleSend}
            className="absolute right-2 top-2 p-3 bg-blue-600 hover:bg-blue-500 rounded-full transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-center text-[10px] text-gray-500 mt-4 uppercase tracking-[0.2em]">
          Powered by Advanced LLM Engine • Secured Environment
        </p>
      </footer>
    </div>
  );
};