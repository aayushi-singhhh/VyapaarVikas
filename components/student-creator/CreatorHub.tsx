"use client";

import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  Search, 
  Briefcase, 
  Upload, 
  DollarSign,
  Trophy,
  Book,
  MessageCircle,
  LogOut,
  Users,
  Target,
  Star,
  Menu
} from "lucide-react";
import { StudentLogin } from "./StudentLogin";
import { StudentSignup } from "./StudentSignup";
import { StudentCreatorDashboard } from "./StudentCreatorDashboard";
import { Button } from "../ui/button";

type AuthState = 'login' | 'signup' | 'dashboard';
type DashboardTab = 'dashboard' | 'marketplace' | 'projects' | 'content' | 'earnings' | 'leaderboard' | 'skills' | 'messages';

interface CreatorHubProps {
  mode?: 'login' | 'signup';
  onNavigate?: (page: string) => void;
}

export function CreatorHub({ mode = 'login', onNavigate }: CreatorHubProps) {
  const [authState, setAuthState] = useState<AuthState>(mode);
  const [activeTab, setActiveTab] = useState<DashboardTab>("dashboard");
  const [user, setUser] = useState(null);

  // Update authState when mode prop changes
  useEffect(() => {
    if (authState !== 'dashboard') {
      setAuthState(mode);
    }
  }, [mode, authState]);

  const handleLoginSuccess = () => {
    setAuthState('dashboard');
    // In real app, set user data here
  };

  const handleSignupSuccess = () => {
    setAuthState('dashboard');
    // In real app, set user data here
  };

  const handleLogout = () => {
    setAuthState('login');
    setUser(null);
    if (onNavigate) {
      onNavigate('landing');
    }
  };

  const menuItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard", hindi: "डैशबोर्ड" },
    { id: "marketplace", icon: Search, label: "Marketplace", hindi: "मार्केटप्लेस" },
    { id: "projects", icon: Briefcase, label: "My Projects", hindi: "मेरे प्रोजेक्ट्स" },
    { id: "content", icon: Upload, label: "Content Library", hindi: "कंटेंट लाइब्रेरी" },
    { id: "earnings", icon: DollarSign, label: "Earnings", hindi: "कमाई" },
    { id: "leaderboard", icon: Trophy, label: "Leaderboard", hindi: "लीडरबोर्ड" },
    { id: "skills", icon: Book, label: "Skill Development", hindi: "कौशल विकास" },
    { id: "messages", icon: MessageCircle, label: "Messages", hindi: "संदेश" },
  ];

  const handleMenuClick = (itemId: DashboardTab) => {
    setActiveTab(itemId);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
      case "marketplace":
      case "projects":
      case "content":
      case "earnings":
      case "leaderboard":
      case "skills":
      case "messages":
        return <StudentCreatorDashboard activeTab={activeTab} />;
      default:
        return <StudentCreatorDashboard activeTab="dashboard" />;
    }
  };

  // Check if current tab should be immersive/full-width
  const isImmersiveTab = () => {
    return ['marketplace', 'projects', 'content', 'earnings'].includes(activeTab);
  };

  // Auth screens with full-width layout
  if (authState === 'login' || authState === 'signup') {
    return (
      <div className="min-h-screen w-full" style={{ background: 'linear-gradient(135deg, #E8F4FD 0%, #F0E6FF 100%)' }}>
        <div className="flex h-screen w-full">
          {/* Left Side - Branding */}
          <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12" style={{ background: 'linear-gradient(135deg, #6B46C1 0%, #3B82F6 100%)' }}>
            <div className="text-center text-white space-y-6">
              <h1 className="text-5xl font-bold mb-4">
                Creator<span className="text-yellow-300">Hub</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Where Student Creators Meet MSMEs
              </p>
              <div className="space-y-4 text-left max-w-md">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-yellow-300" />
                  <span>Connect with 1000+ MSMEs</span>
                </div>
                <div className="flex items-center gap-3">
                  <Target className="w-6 h-6 text-yellow-300" />
                  <span>Earn ₹500-5000 per campaign</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-6 h-6 text-yellow-300" />
                  <span>Build your creator portfolio</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
            <div className="w-full max-w-md space-y-6">
              {authState === 'signup' ? (
                <StudentSignup 
                  onSignupSuccess={handleSignupSuccess}
                  onSwitchToLogin={() => setAuthState('login')}
                />
              ) : (
                <StudentLogin 
                  onLoginSuccess={handleLoginSuccess}
                  onSwitchToSignup={() => setAuthState('signup')}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard with full-width sidebar layout
  return (
    <div className="min-h-screen w-full" style={{ background: 'linear-gradient(135deg, #E8F4FD 0%, #F0E6FF 100%)' }}>
      {isImmersiveTab() ? (
        // Full-width immersive layout for personalized content
        <div className="w-full h-screen overflow-hidden">
          {/* Floating navigation bar for immersive mode */}
          <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-white/30">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-bold text-gray-800">CreatorHub</span>
                </div>
                
                {/* Navigation pills */}
                <div className="hidden md:flex items-center gap-2 ml-8">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleMenuClick(item.id as DashboardTab)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
                          isActive
                            ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
          
          {/* Full-width content */}
          <div className="pt-20 h-full w-full overflow-auto">
            <StudentCreatorDashboard activeTab={activeTab} isImmersive={true} />
          </div>
        </div>
      ) : (
        // Regular sidebar layout for dashboard and other tabs
        <div className="flex h-screen w-full">
          {/* Sidebar */}
          <div className="hidden md:flex flex-shrink-0">
            <div className="w-64 flex flex-col shadow-lg" style={{ background: 'linear-gradient(135deg, #6B46C1 0%, #3B82F6 100%)' }}>
              <div className="p-6 flex-1 overflow-y-auto">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-white">CreatorHub</h1>
                    <p className="text-sm text-white/80">Student Creator Platform</p>
                  </div>
                </div>
                
                <nav className="space-y-2 flex-1">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleMenuClick(item.id as DashboardTab)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                          isActive
                            ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm'
                            : 'text-white/90 hover:bg-white/10'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <div className="text-left">
                          <div className="text-sm font-medium">{item.label}</div>
                          <div className="text-xs opacity-75">{item.hindi}</div>
                        </div>
                      </button>
                    );
                  })}
                </nav>

                {/* Logout button */}
                <div className="mt-auto pt-4 border-t border-white/20">
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 p-3 text-white/90 hover:bg-white/10 rounded-lg"
                  >
                    <LogOut className="w-5 h-5 text-white" />
                    <div className="text-left">
                      <div className="text-sm font-medium text-white">Logout</div>
                      <div className="text-xs opacity-75 text-white/80">लॉगआउट</div>
                    </div>
                  </Button>
                </div>
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
          <div className="flex-1 overflow-auto min-w-0">
            <div className="p-4 md:p-6 w-full">
              {/* Header */}
              <div className="mb-6 flex items-center justify-between w-full">
                <div className="min-w-0 flex-1">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {activeTab === "dashboard" ? "Creator Dashboard डैशबोर्ड" : 
                     menuItems.find(item => item.id === activeTab)?.label + " " + 
                     menuItems.find(item => item.id === activeTab)?.hindi}
                  </h1>
                  <p className="text-gray-600">Welcome back to your creator journey</p>
                </div>
                
                {/* Quick Actions */}
                <div className="flex items-center gap-3">
                  <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-lg">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Messages
                  </Button>
                </div>
              </div>
              
              <div className="w-full">
                <StudentCreatorDashboard activeTab={activeTab} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
