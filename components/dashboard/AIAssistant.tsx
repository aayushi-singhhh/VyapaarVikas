"use client";

import { useState, useEffect } from "react";
import { X, Send, Mic, MicOff, Bot, User, MessageCircle, Volume2, VolumeX } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { VoiceButton } from "./VoiceButton";

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  autoStartVoice?: boolean; // New prop to auto-start voice when opened
}

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export function AIAssistant({ isOpen, onClose, autoStartVoice = false }: AIAssistantProps) {
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

  // Auto-start voice when opened via VoiceButton
  useEffect(() => {
    if (isOpen && autoStartVoice && recognition && !isListening) {
      setTimeout(() => {
        try {
          recognition.start();
        } catch (error) {
          console.error('Error auto-starting speech recognition:', error);
        }
      }, 500); // Small delay to ensure component is fully rendered
    }
  }, [isOpen, autoStartVoice, recognition, isListening]);

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
      return `💳 **Loan Readiness Score समझें:**

🎯 **यह क्या है:**
Loan Readiness Score आपकी financial health का comprehensive measure है।

📊 **मुख्य factors:**
• Business revenue patterns
• GST compliance record
• Credit history & repayment track
• Financial statements accuracy
• Bank transaction analysis

✅ **Score ranges:**
• 750+: Excellent (बेहतरीन interest rates)
• 650-749: Good (अच्छी loan terms)
• 550-649: Average (standard rates)
• Below 550: Needs improvement

🚀 **अगला कदम:**
हमारे platform पर free score check करें और personalized improvement tips पाएं!`;
    }
    
    if (lowerMessage.includes('student') || lowerMessage.includes('reel') || lowerMessage.includes('स्टूडेंट') || lowerMessage.includes('marketing')) {
      return `🎬 **Student AdGenie - Smart Marketing:**

💡 **Concept:**
Cost-effective marketing through talented student creators।

🎯 **Key benefits:**
• Budget-friendly rates (₹500-5000 per project)
• Creative, fresh content ideas
• Multiple format options (Reels, Posts, Videos)
• Students get real experience

📋 **How to start:**
1. Define your budget & requirements
2. Browse student portfolios
3. Review previous work samples
4. Collaborate & create content

🚀 **Platform feature:**
Student AdGenie section में जाकर अभी explore करें!`;
    }
    
    if (lowerMessage.includes('register') || lowerMessage.includes('रजिस्टर') || lowerMessage.includes('business') || lowerMessage.includes('udyam')) {
      return `📋 **Business Registration Guide:**

🎯 **Primary registration: Udyam Registration**

📄 **Required documents:**
• Aadhaar Card (mandatory)
• PAN Card (business/individual)
• Bank account details
• Business address proof
• GST registration (if applicable)

⏱️ **Timeline:**
• Online application: 1-2 hours
• Processing time: 7-15 working days
• Certificate download: Instant after approval

💰 **Benefits unlock:**
• Government scheme access
• Subsidy eligibility
• Easier loan approval
• Priority in tenders

🚀 **Expert help:**
Mini MBA section में detailed step-by-step guide available है!`;
    }
    
    if (lowerMessage.includes('waste') || lowerMessage.includes('scrap') || lowerMessage.includes('अपशिष्ट') || lowerMessage.includes('waste2worth')) {
      return `♻️ **Waste2Worth Marketplace:**

🌱 **Concept:**
Turn your business waste into additional revenue stream।

💰 **Current market rates:**
• Plastic waste: ₹12-18/kg
• Paper/Cardboard: ₹6-10/kg
• Metal scrap: ₹20-35/kg
• Electronic waste: ₹5-15/kg
(Rates vary by quality & quantity)

📱 **Simple process:**
1. Upload waste photos
2. Specify approximate weight
3. Get instant price quotes
4. Schedule pickup
5. Receive payment

🎯 **Impact:**
• Generate extra income
• Support circular economy
• Reduce disposal costs
• Environmental contribution

🚀 **Start selling:**
Waste2Worth section पर अभी list करें!`;
    }
    
    if (lowerMessage.includes('competitor') || lowerMessage.includes('spy') || lowerMessage.includes('competition')) {
      return `🔍 **Competitor Spy - Market Intelligence:**

🎯 **Purpose:**
Stay ahead with data-driven competitive insights।

📊 **Key analytics:**
• Pricing strategy analysis
• Marketing approach study
• Customer review sentiment
• Market positioning data
• Growth pattern tracking

💡 **Actionable insights:**
• Identify pricing opportunities
• Discover content gaps
• Learn from their mistakes
• Find untapped markets
• Improve your USP

📈 **Business impact:**
• Better pricing decisions
• Improved marketing ROI
• Faster market adaptation
• Competitive advantage

🚀 **Platform access:**
Competitor Spy tool से अपने niche को analyze करें!`;
    }
    
    return `🤖 **आपका AI व्यापार सहायक:**

मैं यहाँ आपकी हर business query में professional help करने के लिए हूँ।

🎯 **मैं इन topics में expert हूँ:**
• Loan assistance & credit improvement
• Marketing strategies & student collaboration
• Business registration & compliance
• Competitor analysis & market insights
• Waste management & additional revenue
• Growth strategies & best practices

💬 **बेझिझक पूछें:**
Specific questions, detailed guidance, या practical tips - सब कुछ!

🚀 **Pro tip:**
Voice command भी use कर सकते हैं! 🎤`;
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
                  <div className="text-sm leading-relaxed whitespace-pre-line">
                    {message.content.split('\n').map((line, index) => {
                      // Handle bold text **text**
                      if (line.includes('**')) {
                        const parts = line.split('**');
                        return (
                          <div key={index} className="mb-1">
                            {parts.map((part, partIndex) => 
                              partIndex % 2 === 1 ? (
                                <strong key={partIndex} className="font-semibold">{part}</strong>
                              ) : (
                                <span key={partIndex}>{part}</span>
                              )
                            )}
                          </div>
                        );
                      }
                      // Handle bullet points
                      else if (line.trim().startsWith('•')) {
                        return (
                          <div key={index} className="ml-3 mb-1 flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            <span>{line.replace('•', '').trim()}</span>
                          </div>
                        );
                      }
                      // Handle numbered points
                      else if (/^\d+\./.test(line.trim())) {
                        return (
                          <div key={index} className="ml-3 mb-1 flex items-start">
                            <span className="text-blue-500 mr-2 font-medium">
                              {line.trim().match(/^\d+\./)?.[0]}
                            </span>
                            <span>{line.replace(/^\d+\./, '').trim()}</span>
                          </div>
                        );
                      }
                      // Handle headings (lines with emojis at start)
                      else if (/^[🎯💡📊💰🚀🔍📋⭐✅📈🌱♻️💬🤖]/.test(line.trim())) {
                        return (
                          <div key={index} className="font-medium text-gray-900 mb-2 mt-3 first:mt-0">
                            {line}
                          </div>
                        );
                      }
                      // Regular lines
                      else if (line.trim()) {
                        return (
                          <div key={index} className="mb-1">
                            {line}
                          </div>
                        );
                      }
                      // Empty lines
                      return <div key={index} className="mb-1"></div>;
                    })}
                  </div>
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
                <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-none max-w-[80%]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-xs text-gray-600">Generating structured response...</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    📋 Organizing information with headings, bullet points, and actionable insights...
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