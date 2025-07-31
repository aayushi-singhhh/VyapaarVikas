"use client";

import { useState } from "react";
import { X, Send, Mic, MicOff, Bot, User, MessageCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export function AIAssistant({ isOpen, onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'नमस्ते! मैं आपका Vyapaar सहायक हूँ। क्या मदद कर सकता हूँ?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const recommendedQuestions = [
    "Loan Ready Score क्या होता है?",
    "कैसे स्टूडेंट से reel बनवाऊं?",
    "अपना बिजनेस कैसे रजिस्टर करूं?",
    "Waste2Worth पर scrap कैसे बेचूं?"
  ];

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(message);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('loan') || lowerMessage.includes('ऋण')) {
      return 'Loan Readiness Score आपकी financial health को दर्शाता है। यह आपके business revenue, GST compliance, और credit history के आधार पर बनता है। अच्छा score होने से आपको बेहतर interest rates मिल सकते हैं। 📊';
    }
    
    if (lowerMessage.includes('student') || lowerMessage.includes('reel') || lowerMessage.includes('स्टूडेंट')) {
      return 'Student creators के साथ collaborate करने के लिए Student AdGenie section में जाएं। वहाँ आप अपने budget के अनुसार creators को filter कर सकते हैं और उनके portfolio देख सकते हैं। 🎥✨';
    }
    
    if (lowerMessage.includes('register') || lowerMessage.includes('रजिस्टर')) {
      return 'Business registration के लिए आपको Udyam Registration portal पर जाना होगा। आपको ये documents चाहिए: Aadhaar Card, PAN Card, Bank Account Details। हमारा Mini MBA section में detailed guide मिलेगी। 📋';
    }
    
    if (lowerMessage.includes('waste') || lowerMessage.includes('scrap') || lowerMessage.includes('अपशिष्ट')) {
      return 'Waste2Worth में आप अपना waste sell कर सकते हैं। Plastic ₹15/kg, Paper ₹8/kg, Metal ₹25/kg पर मिलता है। Photo upload करें, weight बताएं, और pickup schedule करें। 🌱♻️';
    }
    
    return 'मैं आपकी मदद करने के लिए यहाँ हूँ! आप specific questions पूछ सकते हैं या फिर recommended questions में से कोई choose कर सकते हैं। 😊';
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
    // In a real implementation, you would integrate with Web Speech API
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        setInputMessage("आपका voice message यहाँ आएगा...");
      }, 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        className="flex-1 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Chat Panel */}
      <div className="w-full max-w-md bg-white/95 backdrop-blur-lg shadow-2xl slide-in-right flex flex-col h-full max-h-screen">
        {/* Header */}
        <div className="p-4 border-b border-gray-200/50 bg-gradient-to-r from-blue-500 to-purple-500 text-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">AI Assistant</h3>
                <p className="text-sm opacity-75">Vyapaar सहायक 🤖</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id}
                className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'bot' && (
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                
                <div 
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className="text-xs opacity-60 mt-1">
                    {message.timestamp.toLocaleTimeString('hi-IN', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>

                {message.type === 'user' && (
                  <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-none">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Recommended Questions */}
        {messages.length === 1 && (
          <div className="p-4 border-t border-gray-200/50 bg-gray-50/50 flex-shrink-0">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Suggested Questions:</h4>
            <div className="space-y-2">
              {recommendedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(question)}
                  className="w-full text-left p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 text-sm"
                >
                  <MessageCircle className="w-4 h-4 inline mr-2 text-blue-500" />
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-gray-200/50 bg-white/80 flex-shrink-0">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message... / संदेश टाइप करें..."
                className="pr-12 rounded-full border-gray-300 focus:border-blue-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage(inputMessage);
                  }
                }}
              />
              <Button
                size="sm"
                variant="ghost"
                onClick={toggleVoice}
                className={`absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full w-8 h-8 p-0 ${
                  isListening ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-blue-500'
                }`}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
            </div>
            <Button
              onClick={() => handleSendMessage(inputMessage)}
              disabled={!inputMessage.trim()}
              className="rounded-full w-10 h-10 p-0 bg-blue-500 hover:bg-blue-600"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          {isListening && (
            <p className="text-xs text-red-500 mt-2 text-center animate-pulse">
              🎤 Listening... / सुन रहा हूँ...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}