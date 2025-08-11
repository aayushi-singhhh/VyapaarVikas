"use client";

import { useState } from "react";
import { Eye, EyeOff, Mail, Phone, ArrowRight, Users, Zap, DollarSign } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface StudentLoginProps {
  onLoginSuccess: () => void;
  onSwitchToSignup?: () => void;
}

export function StudentLogin({ onLoginSuccess, onSwitchToSignup }: StudentLoginProps) {
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSendOtp = () => {
    setIsOtpSent(true);
  };

  const handleLogin = () => {
    // In real implementation, verify OTP and authenticate
    onLoginSuccess();
  };

  return (
    <div className="space-y-6">
      {/* Quick Login Header */}
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">
          Login to <span className="text-gradient bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">CreatorHub</span>
        </h3>
        <p className="text-sm text-gray-600">
          Connect with MSMEs and start earning! 
        </p>
      </div>

      {/* Login Form */}
      <div className="space-y-6">
        <Tabs value={loginMethod} onValueChange={(value) => setLoginMethod(value as 'email' | 'phone')}>
          <TabsList className="grid w-full grid-cols-2 bg-white/60 p-1 rounded-xl max-w-md mx-auto">
            <TabsTrigger value="email" className="flex items-center gap-2 rounded-lg py-2">
              <Mail className="w-4 h-4" />
              <span className="text-sm">Email</span>
            </TabsTrigger>
            <TabsTrigger value="phone" className="flex items-center gap-2 rounded-lg py-2">
              <Phone className="w-4 h-4" />
              <span className="text-sm">Phone</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="email" className="space-y-4">
            {!isOtpSent ? (
              <div className="space-y-4 max-w-md mx-auto">
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl"
                  />
                </div>
                <Button 
                  onClick={handleSendOtp}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl"
                >
                  Send OTP
                </Button>
              </div>
            ) : (
              <div className="space-y-4 max-w-md mx-auto">
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl text-center text-lg tracking-wider"
                    maxLength={6}
                  />
                </div>
                <Button 
                  onClick={handleLogin}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl"
                >
                  Verify & Login
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setIsOtpSent(false)}
                  className="w-full rounded-xl"
                >
                  Change Email
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="phone" className="space-y-4">
            {!isOtpSent ? (
              <div className="space-y-4 max-w-md mx-auto">
                <div className="space-y-2">
                  <Input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl"
                  />
                </div>
                <Button 
                  onClick={handleSendOtp}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl"
                >
                  Send OTP
                </Button>
              </div>
            ) : (
              <div className="space-y-4 max-w-md mx-auto">
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl text-center text-lg tracking-wider"
                    maxLength={6}
                  />
                </div>
                <Button 
                  onClick={handleLogin}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl"
                >
                  Verify & Login
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setIsOtpSent(false)}
                  className="w-full rounded-xl"
                >
                  Change Phone
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Social Login Options */}
        <div className="space-y-3 max-w-md mx-auto">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="rounded-xl bg-white/60 hover:bg-white/80"
              onClick={handleLogin}
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </Button>
            <Button 
              variant="outline" 
              className="rounded-xl bg-white/60 hover:bg-white/80"
              onClick={handleLogin}
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </Button>
          </div>
        </div>

        {/* Switch to Signup */}
        {onSwitchToSignup && (
          <div className="text-center max-w-md mx-auto mt-6">
            <p className="text-sm text-gray-600">
              New to CreatorHub?{' '}
              <button
                onClick={onSwitchToSignup}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Create an account
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
