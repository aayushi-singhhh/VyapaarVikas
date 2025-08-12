"use client";

import { useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { Authentication } from "./components/Authentication";
import { Dashboard } from "./components/Dashboard";
import { CreatorHub } from "./components/student-creator/CreatorHub";

type PageType = 'landing' | 'login' | 'signup' | 'dashboard' | 'student-creator';

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
      case 'student-creator':
        return <CreatorHub onNavigate={handleNavigate} />;
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