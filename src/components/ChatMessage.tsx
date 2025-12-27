import { User, Bot } from 'lucide-react';
import { clsx } from 'clsx';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === 'user';
  
  return (
    <div className={clsx(
      "flex w-full mb-6 animate-in fade-in slide-in-from-bottom-2",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={clsx(
        "flex max-w-[80%] gap-3 px-4 py-3 rounded-2xl shadow-sm",
        isUser 
          ? "bg-blue-600 text-white rounded-tr-none" 
          : "bg-white text-slate-800 border border-slate-200 rounded-tl-none"
      )}>
        <div className="mt-1">
          {isUser ? <User size={18} /> : <Bot size={18} className="text-blue-600" />}
        </div>
        <div className="flex-1 text-sm leading-relaxed whitespace-pre-wrap">
          {content}
        </div>
      </div>
    </div>
  );
}