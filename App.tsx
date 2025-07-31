"use client";

import { useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { Authentication } from "./components/Authentication";
import { Dashboard } from "./components/Dashboard";

type PageType = 'landing' | 'login' | 'signup' | 'dashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('landing');

  const handleNavigate = (page: string) => {
    setCurrentPage(page as PageType);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'login':
        return <Authentication onNavigate={handleNavigate} initialMode="login" />;
      case 'signup':
        return <Authentication onNavigate={handleNavigate} initialMode="signup" />;
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="app">
      {renderCurrentPage()}
    </div>
  );
}