"use client";

import { useState } from "react";
import { ArrowLeft, User, Users, Mail, Phone, Lock, Eye, EyeOff, Building, GraduationCap, Flag, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { CreatorHub } from "./student-creator/CreatorHub";

interface AuthenticationProps {
  onNavigate: (page: string) => void;
  initialMode?: 'login' | 'signup';
}

export function Authentication({ onNavigate, initialMode = 'login' }: AuthenticationProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [userType, setUserType] = useState<'msme' | 'creator'>('msme');
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const content = {
    en: {
      login: "Login",
      signup: "Sign Up", 
      msmeOwner: "MSME Owner",
      studentCreator: "Student Creator",
      firstName: "First Name",
      lastName: "Last Name",
      fullName: "Full Name",
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
      gstNumber: "GST Number (Optional)",
      bio: "Bio",
      dateOfBirth: "Date of Birth"
    },
    hi: {
      login: "लॉगिन",
      signup: "साइन अप",
      msmeOwner: "एमएसएमई मालिक", 
      studentCreator: "छात्र रचनाकार",
      firstName: "पहला नाम",
      lastName: "अंतिम नाम",
      fullName: "पूरा नाम",
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
      gstNumber: "जीएसटी नंबर (वैकल्पिक)",
      bio: "बायो",
      dateOfBirth: "जन्म तिथि"
    }
  };

  const currentContent = content[language as keyof typeof content];

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      setLoading(true);
      setError('');
      
      // Decode the JWT token to get user info
      const credential = credentialResponse.credential;
      const base64Url = credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      
      const userInfo = JSON.parse(jsonPayload);
      
      // Create user data for API
      const userData = {
        name: userInfo.name,
        email: userInfo.email,
        password: `google_${userInfo.sub}`, // Use Google ID as password placeholder
        phoneNumber: '', // Will be collected later or made optional
        userType: 'creator',
        collegeName: '', // Will be collected in profile completion
        specialization: '',
        isGoogleAuth: true
      };

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        // If user already exists, try to login instead
        if (data.error && data.error.includes('already exists')) {
          // Try Google login
          const loginResponse = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: userInfo.email,
              password: `google_${userInfo.sub}`,
            }),
          });

          const loginData = await loginResponse.json();
          
          if (loginResponse.ok) {
            localStorage.setItem('authToken', loginData.token);
            localStorage.setItem('user', JSON.stringify(loginData.user));
            onNavigate('dashboard');
            return;
          }
        }
        
        setError(data.error || 'Google authentication failed');
        return;
      }

      // Store token and navigate
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      onNavigate('dashboard');
      
    } catch (error) {
      console.error('Google authentication error:', error);
      setError('Google authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError('Google authentication was cancelled or failed');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.target as HTMLFormElement);
    
    try {
      if (mode === 'login') {
        // Login API call
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.get('email'),
            password: formData.get('password'),
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || 'Login failed');
          return;
        }

        // Store token in localStorage
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Navigate to dashboard
        onNavigate('dashboard');
      } else {
        // Signup validation
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirmPassword') as string;
        
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        
        if (password.length < 6) {
          setError('Password must be at least 6 characters long');
          return;
        }

        // Signup API call
        const userData: any = {
          name: `${formData.get('firstName')} ${formData.get('lastName')}`.trim() || formData.get('fullName'),
          email: formData.get('email'),
          password: password,
          phoneNumber: formData.get('phone'),
          userType,
        };

        // Add type-specific fields
        if (userType === 'msme') {
          userData.businessName = formData.get('businessName');
          userData.companyRegNumber = formData.get('companyRegNumber');
          userData.gstNumber = formData.get('gstNumber');
        } else if (userType === 'creator') {
          userData.collegeName = formData.get('collegeName');
          userData.specialization = formData.get('specialization');
        }

        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || 'Signup failed');
          return;
        }

        // Store token in localStorage
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Navigate to dashboard
        onNavigate('dashboard');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
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
          <div className="w-full max-w-6xl">
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
            <div className="glass-card rounded-3xl p-10 max-w-4xl mx-auto shadow-2xl">
              {error && (
                <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg">
                  {error}
                </div>
              )}
              
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
                              name="firstName"
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
                              name="lastName"
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
                              name="businessName"
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
                            name="companyRegNumber"
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
                            name="gstNumber"
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
                          name="email"
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
                            name="phone"
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
                          name="password"
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
                            name="confirmPassword"
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
                      disabled={loading}
                      className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Please wait...' : (mode === 'login' ? currentContent.loginButton : currentContent.registerMSME)}
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
                              name="firstName"
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
                              name="lastName"
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
                              name="collegeName"
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
                            name="specialization"
                            placeholder="e.g., Marketing, Design, Computer Science"
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
                          name="email"
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
                            name="phone"
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
                          name="password"
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
                            name="confirmPassword"
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
                      disabled={loading}
                      className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-700 hover:from-purple-700 hover:to-blue-800 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Please wait...' : (mode === 'login' ? currentContent.loginButton : currentContent.registerCreator)}
                    </Button>

                    {/* Google Authentication Option for Student Creators */}
                    <div className="mt-4">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white text-gray-500">
                            {language === 'en' ? 'Or continue with' : 'या इसके साथ जारी रखें'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-center">
                        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID || ''}>
                          <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleError}
                            theme="outline"
                            size="large"
                            text={mode === 'login' ? 'signin_with' : 'signup_with'}
                            shape="rectangular"
                            width="300"
                          />
                        </GoogleOAuthProvider>
                      </div>
                    </div>
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