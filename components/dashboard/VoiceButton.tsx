"use client";

import { useState } from "react";
import { Mic, MicOff } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface VoiceButtonProps {
  hide?: boolean;
  onClick?: () => void;
  isListening?: boolean;
  onVoiceToggle?: () => void;
}

export function VoiceButton({ hide, onClick, isListening: externalListening, onVoiceToggle }: VoiceButtonProps) {
  if (hide) return null;

  const [internalListening, setInternalListening] = useState(false);
  const isListening = externalListening !== undefined ? externalListening : internalListening;

  const handleVoiceToggle = () => {
    if (onVoiceToggle) {
      // If AI Assistant is managing the voice state
      onVoiceToggle();
    } else if (onClick) {
      // Fallback: open AI Assistant
      onClick();
      setInternalListening(true);
      setTimeout(() => {
        setInternalListening(false);
      }, 3000);
    }
  };

  return (
    <TooltipProvider>
      <div className="fixed bottom-6 right-6 flex flex-col items-center z-50">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleVoiceToggle}
              className={`w-16 h-16 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 animate-float ${
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
            <p className="text-sm">{isListening ? 'Stop Listening' : 'Open AI Assistant & Speak'}</p>
            <p className="text-xs opacity-75">{isListening ? 'सुनना बंद करें' : 'AI सहायक खोलें और बोलें'}</p>
          </TooltipContent>
        </Tooltip>

        <span className="mt-2 text-xs text-gray-700 bg-white/70 backdrop-blur-sm px-2 py-1 rounded-full shadow">
          AI Assistant
        </span>
      </div>
    </TooltipProvider>
  );
}
