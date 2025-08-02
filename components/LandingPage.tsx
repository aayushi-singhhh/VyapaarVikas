"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Globe, Play, Flag } from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const [language, setLanguage] = useState("en");
  const [imageLoaded, setImageLoaded] = useState(false);

  // Use the renamed image file without spaces in the name
  const backgroundImage = "/rural-shop-bg.png";

  // Preload the image
  useEffect(() => {
    const img = new Image();
    img.src = backgroundImage;
    img.onload = () => setImageLoaded(true);
    img.onerror = (e) => console.error("Failed to load background image:", e);
  });

  const content = {
    en: {
      tagline: "छोटी दुकान, बड़ी उड़ान 🚀",
      subtitle: "Empowering Indian MSMEs and Student Creators",
      description:
        "Connect, grow, and scale your business with our comprehensive platform designed for Indian entrepreneurs and creative minds.",
      login: "Login",
      signup: "Sign Up",
      watchDemo: "Watch Demo",
      demoTitle: "How to use VyapaarVikas",
      features: [
        "Business Analytics & Growth Tracking",
        "AI-Powered Competitor Analysis",
        "Loan Assistance & Financial Support",
        "Mini MBA Learning Programs",
        "Student Creator Collaborations",
        "Buy and sell Scrap",
        "Voice one Platform",
        "Ai assistance for all doubts",
      ],
    },
    hi: {
      tagline: "छोटी दुकान, बड़ी उड़ान 🚀",
      subtitle:
        "भारतीय एमएसएमई और छात्र रचनाकारों को सशक्त बनाना",
      description:
        "भारतीय उद्यमियों और रचनात्मक दिमागों के लिए डिज़ाइन किए गए हमारे व्यापक प्लेटफॉर्म के साथ जुड़ें, बढ़ें और अपने व्यापार को बढ़ाएं।",
      login: "लॉगिन",
      signup: "साइन अप",
      watchDemo: "डेमो देखें",
      demoTitle: "VyapaarVikas का उपयोग कैसे करें",
      features: [
        "व्यापार विश्लेषण और वृद्धि ट्रैकिंग",
        "एआई-संचालित प्रतिस्पर्धी विश्लेषण",
        "ऋण सहायता और वित्तीय समर्थन",
        "मिनी एमबीए शिक्षा कार्यक्रम",
        "छात्र रचनाकार सहयोग",
        "एकीकृत वॉइस प्लेटफ़ॉर्म",
        "सभी सवालों के लिए एआई सहायता",
        "धातु और पुनर्चक्रण सामग्री की खरीद एवं बिक् ",
        "एकीकृत वॉइस-आधारित प्लेटफ़ॉर्म"
        
      ],
    },
  };

  const currentContent =
    content[language as keyof typeof content];

  return (

    <div className="min-h-screen relative overflow-hidden">
      {/* Fallback background in case image doesn't load */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-50 to-purple-100 z-0"></div>
      
      {/* Background with image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: imageLoaded ? 1 : 0,
          transition: "opacity 0.5s ease-in-out"
        }}
      >
        {/* Optional overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header with enhanced language toggle */}
        <header className="flex justify-between items-center p-6">
          {/* <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-yellow-500"></div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">
                VyapaarVikas
              </h2>
              <p className="text-sm text-gray-600">
                व्यापार विकास
              </p>
            </div>
          </div> */}

          {/* Enhanced Language Toggle */}
          <div className="flex items-center gap-2">
            <div className="glass-card rounded-xl p-1 flex items-center gap-1">
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 ${
                  language === "en"
                    ? "bg-blue-500 text-white shadow-lg"
                    : "text-gray-700 hover:bg-white/50"
                }`}
              >
                <Flag className="w-4 h-4" />
                <span className="text-sm font-medium">EN</span>
              </button>
              <button
                onClick={() => setLanguage("hi")}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 ${
                  language === "hi"
                    ? "bg-blue-500 text-white shadow-lg"
                    : "text-gray-700 hover:bg-white/50"
                }`}
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">
                  हिन्दी
                </span>
              </button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
          {/* Hero Section */}
          <div className="glass-card rounded-2xl p-6 max-w-4xl mx-auto mb-12">
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-4">
              VyapaarVikas
            </h1>
            <p className="text-2xl md:text-3xl text-gray-700 mb-4 font-medium">
              {currentContent.tagline}
            </p>
            <p className="text-lg md:text-xl text-gray-600 mb-2">
              {currentContent.subtitle}
            </p>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
              {currentContent.description}
            </p>
          </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="px-8 py-4 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                onClick={() => onNavigate("login")}
              >
                {currentContent.login}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-4 text-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm"
                onClick={() => onNavigate("signup")}
              >
                {currentContent.signup}
              </Button>
            </div>
          </div>

          {/* Features preview - Now positioned above demo video */}
          <div className="glass-card rounded-2xl p-6 max-w-4xl mx-auto mb-12">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {language === "en"
                ? "Platform Features"
                : "प्लेटफॉर्म सुविधाएं"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentContent.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-white/50 rounded-lg hover:bg-white/70 transition-colors duration-200"
                >
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-sm text-gray-700">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Demo Video Section - Now positioned below features */}
          <div className="mb-12 w-full max-w-4xl">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              {currentContent.demoTitle}
            </h3>
            <div className="glass-card rounded-2xl p-6">
              <div className="relative aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300">
                {/* Video Thumbnail Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    <Play
                      className="w-8 h-8 text-blue-600 ml-1"
                      fill="currentColor"
                    />
                  </div>
                </div>

                {/* Video Preview Elements */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between">
                    <div className="glass-card rounded-lg px-3 py-1">
                      <span className="text-sm text-gray-700">
                        5:30 mins
                      </span>
                    </div>
                    <div className="glass-card rounded-lg px-3 py-1">
                      <span className="text-sm text-gray-700">
                        HD Quality
                      </span>
                    </div>
                  </div>
                </div>

                {/* Decorative elements to make it look like a video */}
                <div className="absolute top-4 left-4 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <div className="absolute top-4 left-10 text-sm text-gray-600">
                  ● LIVE DEMO
                </div>
              </div>

              <Button className="mt-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <Play className="w-4 h-4 mr-2" />
                {currentContent.watchDemo}
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}