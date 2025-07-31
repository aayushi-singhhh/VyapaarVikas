"use client";

import { useState } from "react";
import { Mic, MicOff } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export function VoiceButton() {
  const [isListening, setIsListening] = useState(false);

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    
    // Simulate listening for 3 seconds (visual only)
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
      }, 3000);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleVoiceToggle}
            className={`fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 animate-float z-50 ${
              isListening 
                ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700' 
                : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
            }`}
          >
            {isListening ? (
              <MicOff className="w-6 h-6 text-white animate-pulse" />
            ) : (
              <Mic className="w-6 h-6 text-white" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left" className="bg-gray-800 text-white">
          <p className="text-sm">
            {isListening ? 'Stop Listening' : 'Speak to Navigate'}
          </p>
          <p className="text-xs opacity-75">
            {isListening ? 'सुनना बंद करें' : 'बोलिए, चलिए'}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}