"use client";

import { useState } from "react";
import { 
  LayoutDashboard, 
  Search, 
  GraduationCap, 
  Shield, 
  Recycle, 
  Users,     
  CreditCard, 
  ShoppingCart,
  Menu,
  LogOut,
  Bot
} from "lucide-react";
import { MyBusiness } from "./dashboard/MyBusiness";
import { CompetitorSpy } from "./dashboard/CompetitorSpy";
import { LoanBuddy } from "./dashboard/LoanBuddy";
import { MiniMBA } from "./dashboard/MiniMBA";
import { StudentAdGenie } from "./dashboard/StudentAdGenie";
import { TrustScore } from "./dashboard/TrustScore";
import { Waste2Worth } from "./dashboard/Waste2Worth";
import { BusinessGrowth } from "./dashboard/BusinessGrowth";
import { BuyScrap } from "./dashboard/BuyScrap";
import { AIAssistant } from "./dashboard/AIAssistant";
import { VoiceButton } from "./dashboard/VoiceButton";
import { Button } from "./ui/button";

interface DashboardProps {
  onNavigate?: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
 
  const menuItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard", hindi: "डैशबोर्ड" },
    { id: "competitor-spy", icon: Search, label: "Competitor Spy", hindi: "प्रतिस्पर्धी जासूसी" },
    { id: "mini-mba", icon: GraduationCap, label: "Mini MBA", hindi: "मिनी एमबीए" },
    { id: "trust", icon: Shield, label: "Trust Score", hindi: "विश्वास स्कोर" },
    { id: "waste2worth", icon: Recycle, label: "Waste2Worth", hindi: "अपशिष्ट उपयोग" },
    { id: "marketing", icon: Users, label: "Marketing Collab", hindi: "मार्केटिंग सहयोग" },
    { id: "loans", icon: CreditCard, label: "Loans", hindi: "ऋण" },
    { id: "ai-assistant", icon: Bot, label: "AI Assistant", hindi: "एआई सहायक", special: true },
    { id: "buy-scrap", icon: ShoppingCart, label: "Buy Scrap", hindi: "सस्ता कच्चा माल" },
  ];

  const handleMenuClick = (itemId: string) => {
    if (itemId === "ai-assistant") {
      setIsAIAssistantOpen(true);
    } else {
      setActiveTab(itemId);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="flex justify-center">
            <MyBusiness />
          </div>
        );
      case "competitor-spy":
        return (
          <div className="w-full">
            <CompetitorSpy expanded />
          </div>
        );
      case "mini-mba":
        return (
          <div className="w-full">
            <MiniMBA expanded />
          </div>
        );
      case "trust":
        return (
          <div className="w-full">
            <TrustScore expanded />
          </div>
        );
      case "waste2worth":
        return (
          <div className="w-full">
            <Waste2Worth expanded />
          </div>
        );
      case "marketing":
        return (
          <div className="w-full">
            <StudentAdGenie expanded />
          </div>
        );
      case "loans":
        return (
          <div className="w-full">
            <LoanBuddy expanded />
          </div>
        );
      case "buy-scrap":
        return (
          <div className="w-full">
            <BuyScrap expanded />
          </div>
        );
      default:
        return (
          <div className="flex justify-center">
            <MyBusiness />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen w-full" style={{ background: 'linear-gradient(135deg, var(--vyapaar-beige) 0%, var(--vyapaar-light-grey) 100%)' }}>
      <div className="flex h-screen w-full">
        {/* Sidebar */}
        <div className="hidden md:flex flex-shrink-0">
          <div className="w-64 flex flex-col shadow-lg" style={{ background: 'linear-gradient(135deg, var(--vyapaar-royal-blue) 0%, var(--vyapaar-mustard) 100%)' }}>
              <div className="p-6 flex-1 overflow-y-auto">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl" style={{ background: 'linear-gradient(135deg, #1e40af 0%, #eab308 100%)' }}></div>
                  <div>
                    <h1 className="text-xl font-bold text-white">VyapaarVikas</h1>
                    <p className="text-sm text-white/80">व्यापार विकास</p>
                  </div>
                </div>
                
                <nav className="space-y-2 flex-1">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    const isSpecial = item.special;
                    
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleMenuClick(item.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                          isActive
                            ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm'
                            : isSpecial
                            ? 'text-yellow-200 hover:bg-purple-500/20 border border-purple-300/50'
                            : 'text-white/90 hover:bg-white/10'
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${isSpecial ? 'animate-pulse' : ''}`} />
                        <div className="text-left">
                          <div className="text-sm font-medium flex items-center gap-1">
                            {item.label}
                            {isSpecial && <span className="text-xs">🤖</span>}
                          </div>
                          <div className="text-xs opacity-75">{item.hindi}</div>
                        </div>
                      </button>
                    );
                  })}
                </nav>

                {/* Logout button */}
                {onNavigate && (
                  <div className="mt-auto pt-4 border-t border-white/20">
                    <Button
                      variant="ghost"
                      onClick={() => onNavigate('landing')}
                      className="w-full flex items-center gap-3 p-3 text-white/90 hover:bg-white/10 rounded-lg"
                    >
                      <LogOut className="w-5 h-5 text-white" />
                      <div className="text-left">
                        <div className="text-sm font-medium text-white">Logout</div>
                        <div className="text-xs opacity-75 text-white/80">लॉगआउट</div>
                      </div>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden fixed top-4 left-4 z-50">
            <button className="p-2 rounded-lg bg-white/80 backdrop-blur-lg shadow-lg">
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto min-w-0 dashboard-main-content">
            <div className="p-4 md:p-6 w-full dashboard-container">
              {/* Header with AI Assistant CTA */}
              <div className="mb-6 flex items-center justify-between w-full">
                <div className="min-w-0 flex-1">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {activeTab === "dashboard" ? "Dashboard डैशबोर्ड" : 
                     menuItems.find(item => item.id === activeTab)?.label + " " + 
                     menuItems.find(item => item.id === activeTab)?.hindi}
                  </h1>
                  <p className="text-gray-600">Welcome back to your business growth center</p>
                </div>
                
                {/* Floating AI Assistant Button */}
                <Button
                  onClick={() => setIsAIAssistantOpen(true)}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3"
                >
                  <Bot className="w-5 h-5 mr-2 animate-pulse" />
                  <span className="hidden sm:inline">AI Assistant</span>
                  <span className="sm:hidden">🤖</span>
                </Button>
              </div>
              
              <div className="w-full dashboard-component">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>

      {/* AI Assistant Panel */}
      <AIAssistant 
        isOpen={isAIAssistantOpen} 
        onClose={() => setIsAIAssistantOpen(false)} 
      />

      {/* Floating Voice Button */}
      <VoiceButton />
    </div>
  );
}