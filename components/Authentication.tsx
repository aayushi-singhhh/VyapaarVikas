"use client";

import { useState } from "react";
import { ArrowLeft, User, Users, Mail, Phone, Lock, Eye, EyeOff, Building, GraduationCap, Flag, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface AuthenticationProps {
  onNavigate: (page: string) => void;
  initialMode?: 'login' | 'signup';
}

export function Authentication({ onNavigate, initialMode = 'login' }: AuthenticationProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [userType, setUserType] = useState<'msme' | 'creator'>('msme');
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState('en');

  const content = {
    en: {
      login: "Login",
      signup: "Sign Up", 
      msmeOwner: "MSME Owner",
      studentCreator: "Student Creator",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      phone: "Phone Number",
      password: "Password",
      confirmPassword: "Confirm Password",
      registerMSME: "Register as MSME Owner",
      registerCreator: "Register as Student Creator",
      loginButton: "Login",
      alreadyAccount: "Already have an account?",
      signInHere: "Sign in here",
      noAccount: "Don't have an account?",
      signUpHere: "Sign up here",
      backToHome: "Back to Home",
      businessName: "Business Name",
      collegeName: "College/University",
      specialization: "Specialization",
      companyRegNumber: "Company Registration Number",
      gstNumber: "GST Number (Optional)"
    },
    hi: {
      login: "लॉगिन",
      signup: "साइन अप",
      msmeOwner: "एमएसएमई मालिक", 
      studentCreator: "छात्र रचनाकार",
      firstName: "पहला नाम",
      lastName: "अंतिम नाम",
      email: "ईमेल",
      phone: "फ़ोन नंबर",
      password: "पासवर्ड",
      confirmPassword: "पासवर्ड की पुष्टि करें",
      registerMSME: "एमएसएमई मालिक के रूप में रजिस्टर करें",
      registerCreator: "छात्र रचनाकार के रूप में रजिस्टर करें",
      loginButton: "लॉगिन",
      alreadyAccount: "क्या आपका पहले से खाता है?",
      signInHere: "यहां साइन इन करें",
      noAccount: "क्या आपका खाता नहीं है?",
      signUpHere: "यहां साइन अप करें",
      backToHome: "होम पर वापस जाएं",
      businessName: "व्यापार का नाम",
      collegeName: "कॉलेज/विश्वविद्यालय",
      specialization: "विशेषज्ञता",
      companyRegNumber: "कंपनी पंजीकरण संख्या",
      gstNumber: "जीएसटी नंबर (वैकल्पिक)"
    }
  };

  const currentContent = content[language as keyof typeof content];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the authentication
    // For now, we'll just navigate to the dashboard
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 25%, #ddd6fe 75%, #fef3c7 100%)'
        }}
      >
        {/* Enhanced decorative elements */}
        <div className="absolute top-20 left-20 w-40 h-40 bg-blue-200/30 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-yellow-200/40 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-1/2 left-10 w-32 h-32 bg-purple-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-10 right-1/4 w-36 h-36 bg-green-200/25 rounded-full blur-2xl animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center p-6">
          <Button 
            variant="ghost" 
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 hover:bg-white/50 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4" />
            {currentContent.backToHome}
          </Button>
          
          {/* Flag icons for language toggle */}
          <div className="flex items-center gap-2">
            <div className="glass-card rounded-xl p-1 flex items-center gap-1">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 ${
                  language === 'en' 
                    ? 'bg-blue-500 text-white shadow-lg' 
                    : 'text-gray-700 hover:bg-white/50'
                }`}
              >
                <Flag className="w-4 h-4" />
                <span className="text-sm font-medium">EN</span>
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 ${
                  language === 'hi' 
                    ? 'bg-blue-500 text-white shadow-lg' 
                    : 'text-gray-700 hover:bg-white/50'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">हिन्दी</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 flex items-center justify-center px-6 py-8">
          <div className="w-full max-w-4xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                {mode === 'login' ? currentContent.login : currentContent.signup}
              </h1>
              <p className="text-gray-600">
                {mode === 'login' ? 'Welcome back to VyapaarVikas' : 'Join the VyapaarVikas community'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {mode === 'login' ? 'वापस आपका स्वागत है' : 'VyapaarVikas समुदाय से जुड़ें'}
              </p>
            </div>

            {/* Enhanced Authentication form with soft shadows */}
            <div className="glass-card rounded-3xl p-8 max-w-2xl mx-auto shadow-2xl">
              <Tabs value={userType} onValueChange={(value) => setUserType(value as 'msme' | 'creator')}>
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/60 p-1 rounded-2xl">
                  <TabsTrigger value="msme" className="flex items-center gap-2 rounded-xl py-3">
                    <Building className="w-4 h-4" />
                    <div className="text-center">
                      <div className="text-sm font-medium">{currentContent.msmeOwner}</div>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger value="creator" className="flex items-center gap-2 rounded-xl py-3">
                    <GraduationCap className="w-4 h-4" />
                    <div className="text-center">
                      <div className="text-sm font-medium">{currentContent.studentCreator}</div>
                    </div>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="msme">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {mode === 'signup' && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-gray-700">
                              {currentContent.firstName} / {content.hi.firstName}
                            </Label>
                            <Input
                              id="firstName"
                              placeholder={currentContent.firstName}
                              className="bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl shadow-sm focus:shadow-md transition-all duration-200"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-gray-700">
                              {currentContent.lastName} / {content.hi.lastName}
                            </Label>
                            <Input
                              id="lastName"
                              placeholder={currentContent.lastName}
                              className="bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl shadow-sm focus:shadow-md transition-all duration-200"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="businessName" className="text-gray-700">
                            {currentContent.businessName} / {content.hi.businessName}
                          </Label>
                          <div className="relative">
                            <Building className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                              id="businessName"
                              placeholder={currentContent.businessName}
                              className="pl-10 bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl shadow-sm focus:shadow-md transition-all duration-200"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="companyRegNumber" className="text-gray-700">
                            {currentContent.companyRegNumber} / {content.hi.companyRegNumber}
                          </Label>
                          <Input
                            id="companyRegNumber"
                            placeholder="e.g., U12345TN2020PTC123456"
                            className="bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl shadow-sm focus:shadow-md transition-all duration-200"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="gstNumber" className="text-gray-700">
                            {currentContent.gstNumber} / {content.hi.gstNumber}
                          </Label>
                          <Input
                            id="gstNumber"
                            placeholder="e.g., 29GGGGG1314R9Z6"
                            className="bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl shadow-sm focus:shadow-md transition-all duration-200"
                          />
                        </div>
                      </>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700">
                        {currentContent.email} / {content.hi.email}
                      </Label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder={currentContent.email}
                          className="pl-10 bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl shadow-sm focus:shadow-md transition-all duration-200"
                          required
                        />
                      </div>
                    </div>

                    {mode === 'signup' && (
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-700">
                          {currentContent.phone} / {content.hi.phone}
                        </Label>
                        <div className="relative">
                          <Phone className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+91 9876543210"
                            className="pl-10 bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl shadow-sm focus:shadow-md transition-all duration-200"
                            required
                          />
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-gray-700">
                        {currentContent.password} / {content.hi.password}
                      </Label>
                      <div className="relative">
                        <Lock className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder={currentContent.password}
                          className="pl-10 pr-10 bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl shadow-sm focus:shadow-md transition-all duration-200"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {mode === 'signup' && (
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-gray-700">
                          {currentContent.confirmPassword} / {content.hi.confirmPassword}
                        </Label>
                        <div className="relative">
                          <Lock className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input
                            id="confirmPassword"
                            type="password"
                            placeholder={currentContent.confirmPassword}
                            className="pl-10 bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl shadow-sm focus:shadow-md transition-all duration-200"
                            required
                          />
                        </div>
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                    >
                      {mode === 'login' ? currentContent.loginButton : currentContent.registerMSME}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="creator">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {mode === 'signup' && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="creatorFirstName" className="text-gray-700">
                              {currentContent.firstName} / {content.hi.firstName}
                            </Label>
                            <Input
                              id="creatorFirstName"
                              placeholder={currentContent.firstName}
                              className="bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl shadow-sm focus:shadow-md transition-all duration-200"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="creatorLastName" className="text-gray-700">
                              {currentContent.lastName} / {content.hi.lastName}
                            </Label>
                            <Input
                              id="creatorLastName"
                              placeholder={currentContent.lastName}
                              className="bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl shadow-sm focus:shadow-md transition-all duration-200"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="collegeName" className="text-gray-700">
                            {currentContent.collegeName} / {content.hi.collegeName}
                          </Label>
                          <div className="relative">
                            <GraduationCap className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                              id="collegeName"
                              placeholder={currentContent.collegeName}
                              className="pl-10 bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl shadow-sm focus:shadow-md transition-all duration-200"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="specialization" className="text-gray-700">
                            {currentContent.specialization} / {content.hi.specialization}
                          </Label>
                          <Input
                            id="specialization"
                            placeholder="e.g., Content Creation, Video Editing, Photography"
                            className="bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl shadow-sm focus:shadow-md transition-all duration-200"
                            required
                          />
                        </div>
                      </>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="creatorEmail" className="text-gray-700">
                        {currentContent.email} / {content.hi.email}
                      </Label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                          id="creatorEmail"
                          type="email"
                          placeholder={currentContent.email}
                          className="pl-10 bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl shadow-sm focus:shadow-md transition-all duration-200"
                          required
                        />
                      </div>
                    </div>

                    {mode === 'signup' && (
                      <div className="space-y-2">
                        <Label htmlFor="creatorPhone" className="text-gray-700">
                          {currentContent.phone} / {content.hi.phone}
                        </Label>
                        <div className="relative">
                          <Phone className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input
                            id="creatorPhone"
                            type="tel"
                            placeholder="+91 9876543210"
                            className="pl-10 bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl shadow-sm focus:shadow-md transition-all duration-200"
                            required
                          />
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="creatorPassword" className="text-gray-700">
                        {currentContent.password} / {content.hi.password}
                      </Label>
                      <div className="relative">
                        <Lock className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                          id="creatorPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder={currentContent.password}
                          className="pl-10 pr-10 bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl shadow-sm focus:shadow-md transition-all duration-200"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {mode === 'signup' && (
                      <div className="space-y-2">
                        <Label htmlFor="creatorConfirmPassword" className="text-gray-700">
                          {currentContent.confirmPassword} / {content.hi.confirmPassword}
                        </Label>
                        <div className="relative">
                          <Lock className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input
                            id="creatorConfirmPassword"
                            type="password"
                            placeholder={currentContent.confirmPassword}
                            className="pl-10 bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl shadow-sm focus:shadow-md transition-all duration-200"
                            required
                          />
                        </div>
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      className="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                    >
                      {mode === 'login' ? currentContent.loginButton : currentContent.registerCreator}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              {/* Switch between login/signup */}
              <div className="text-center mt-6 pt-6 border-t border-white/30">
                {mode === 'login' ? (
                  <p className="text-gray-600">
                    {currentContent.noAccount}{' '}
                    <button
                      onClick={() => setMode('signup')}
                      className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-all duration-200"
                    >
                      {currentContent.signUpHere}
                    </button>
                  </p>
                ) : (
                  <p className="text-gray-600">
                    {currentContent.alreadyAccount}{' '}
                    <button
                      onClick={() => setMode('login')}
                      className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-all duration-200"
                    >
                      {currentContent.signInHere}
                    </button>
                  </p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}