"use client";

import { useState, useEffect } from "react";
import { X, Send, Mic, MicOff, Bot, User, MessageCircle, Volume2, VolumeX } from "lucide-react";
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
      content: 'नमस्ते! मैं आपका AI-powered Vyapaar सहायक हूँ। Google Gemini द्वारा संचालित, मैं आपके व्यापार से जुड़े सभी सवालों के जवाब दे सकता हूँ। क्या मदद कर सकता हूँ? 🚀',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);

  const recommendedQuestions = [
    "Loan Ready Score क्या होता है?",
    "कैसे स्टूडेंट से reel बनवाऊं?",
    "अपना बिजनेस कैसे रजिस्टर करूं?",
    "Waste2Worth पर scrap कैसे बेचूं?"
  ];

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize Speech Recognition
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'hi-IN'; // Hindi primary, but also supports English
        
        recognition.onstart = () => {
          setIsListening(true);
        };
        
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputMessage(transcript);
          setIsListening(false);
          // Automatically send the voice message
          setTimeout(() => handleSendMessage(transcript), 500);
        };
        
        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };
        
        recognition.onend = () => {
          setIsListening(false);
        };
        
        setRecognition(recognition);
      }
      
      // Initialize Speech Synthesis
      if (window.speechSynthesis) {
        setSpeechSynthesis(window.speechSynthesis);
      }
    }
  }, []);

  // Function to speak text
  const speakText = (text: string) => {
    if (speechSynthesis && 'speechSynthesis' in window) {
      // Stop any current speech
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      // Try to use Hindi voice if available, fallback to English
      const voices = speechSynthesis.getVoices();
      const hindiVoice = voices.find(voice => voice.lang.includes('hi') || voice.lang.includes('Hindi'));
      const englishVoice = voices.find(voice => voice.lang.includes('en'));
      
      if (hindiVoice) {
        utterance.voice = hindiVoice;
      } else if (englishVoice) {
        utterance.voice = englishVoice;
      }
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      speechSynthesis.speak(utterance);
    }
  };

  // Function to stop speaking
  const stopSpeaking = () => {
    if (speechSynthesis) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleSendMessage = async (message: string) => {
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

    try {
      // Call Gemini API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if (response.ok) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: data.response,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        
        // Auto-speak the response if user used voice input
        if (isListening || inputMessage === message) {
          setTimeout(() => speakText(data.response), 300);
        }
      } else {
        // Fallback to local response if API fails
        const fallbackResponse = generateBotResponse(message);
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: fallbackResponse,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
      console.error('Error calling chat API:', error);
      // Fallback to local response
      const fallbackResponse = generateBotResponse(message);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: fallbackResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('loan') || lowerMessage.includes('ऋण') || lowerMessage.includes('ready score')) {
      return 'आपका Loan Readiness Score आपकी financial health का एक comprehensive measure है। यह आपके business revenue, GST compliance, credit history, और financial statements के आधार पर calculate होता है। एक अच्छा score (750+) आपको better interest rates और faster loan approval में मदद करता है। हमारे platform पर आप अपना score check कर सकते हैं और improvement के लिए personalized suggestions भी मिलती हैं। 📊💰';
    }
    
    if (lowerMessage.includes('student') || lowerMessage.includes('reel') || lowerMessage.includes('स्टूडेंट') || lowerMessage.includes('marketing')) {
      return 'Student AdGenie के through आप talented student creators के साथ collaborate कर सकते हैं। यहाँ आप budget-wise filtering कर सकते हैं, creators के previous work देख सकते हैं, और cost-effective marketing campaigns चला सकते हैं। Students को real project experience मिलता है और आपको affordable, creative content मिलता है। यह एक win-win situation है! 🎥✨📱';
    }
    
    if (lowerMessage.includes('register') || lowerMessage.includes('रजिस्टर') || lowerMessage.includes('business') || lowerMessage.includes('udyam')) {
      return 'Business registration के लिए सबसे important है Udyam Registration। आपको ये documents चाहिए होंगे: Aadhaar Card, PAN Card, bank account details, और business address proof। Process online होती है और usually 7-15 days लगती हैं। Registration के बाद आपको government schemes, subsidies, और easier loan access मिलता है। हमारे Mini MBA section में step-by-step guide भी उपलब्ध है। 📋✅';
    }
    
    if (lowerMessage.includes('waste') || lowerMessage.includes('scrap') || lowerMessage.includes('अपशिष्ट') || lowerMessage.includes('waste2worth')) {
      return 'Waste2Worth marketplace में आप अपना industrial waste और scrap material बेच सकते हैं। Current rates: Plastic ₹12-18/kg, Paper ₹6-10/kg, Metal ₹20-35/kg (quality के according)। आपको बस photo upload करनी होगी, approximate weight बताना होगा, और pickup schedule करना होगा। यह circular economy को promote करता है और आपकी additional income भी होती है। 🌱♻️💚';
    }
    
    if (lowerMessage.includes('competitor') || lowerMessage.includes('spy') || lowerMessage.includes('competition')) {
      return 'Competitor Spy tool आपको market insights देता है - competitors की pricing strategy, their marketing approaches, customer reviews analysis, और market positioning। यह data-driven decisions लेने में helpful है। आप अपने niche में top performers को track कर सकते हैं और उनकी best practices को adapt कर सकते हैं। Knowledge is power in business! 🔍📈';
    }
    
    return 'मैं आपका AI-powered व्यापार सहायक हूँ और यहाँ आपकी हर business query में मदद करने के लिए हूँ। आप किसी भी specific topic के बारे में पूछ सकते हैं - loan assistance, marketing strategies, business registration, competitor analysis, या कुछ और भी। मैं आपको practical और actionable advice देने की कोशिश करूंगा। 😊🚀';
  };
       
  const toggleVoice = () => {
    if (!recognition) {
      alert('Speech recognition not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      try {
        recognition.start();
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        setIsListening(false);
      }
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
                <p className="text-sm opacity-75">Vyapaar सहायक 🤖 | Voice Enabled 🎤</p>
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
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs opacity-60">
                      {message.timestamp.toLocaleTimeString('hi-IN', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                    {message.type === 'bot' && (
                      <button
                        onClick={() => isSpeaking ? stopSpeaking() : speakText(message.content)}
                        className="ml-2 p-1 rounded-full hover:bg-gray-200 transition-colors"
                        title={isSpeaking ? "Stop speaking" : "Read aloud"}
                      >
                        {isSpeaking ? (
                          <VolumeX className="w-3 h-3 text-gray-600" />
                        ) : (
                          <Volume2 className="w-3 h-3 text-gray-600" />
                        )}
                      </button>
                    )}
                  </div>
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
            <h4 className="text-sm font-medium text-gray-700 mb-2">Suggested Questions:</h4>
            <p className="text-xs text-gray-500 mb-3">💡 Click or use voice command (🎤)</p>
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
            <div className="mt-3 p-2 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-700">
                <Mic className="w-3 h-3 inline mr-1" />
                <strong>Voice Commands:</strong> Hindi & English supported
              </p>
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
            <div className="text-xs text-red-500 mt-2 text-center animate-pulse">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                <span>🎤 सुन रहा हूँ... अपना सवाल बोलें / Listening... Speak your question</span>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
              </div>
            </div>
          )}
          {isSpeaking && (
            <div className="text-xs text-blue-500 mt-2 text-center animate-pulse">
              <div className="flex items-center justify-center gap-2">
                <Volume2 className="w-3 h-3" />
                <span>🔊 बोल रहा हूँ... / Speaking...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}