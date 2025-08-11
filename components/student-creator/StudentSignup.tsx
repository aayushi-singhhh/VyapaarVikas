"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Progress } from "../ui/progress";

interface StudentSignupProps {
  onSignupSuccess: () => void;
  onSwitchToLogin?: () => void;
}

export function StudentSignup({ onSignupSuccess, onSwitchToLogin }: StudentSignupProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    year: '',
    skills: [] as string[],
    agreedToTerms: false,
  });

  const [otpVerification, setOtpVerification] = useState({
    isPhoneVerified: false,
    otp: '',
    isOtpSent: false
  });

  const availableSkills = [
    'Content Writing', 'Video Editing', 'Photography', 'Graphic Design', 
    'Social Media Marketing', 'Digital Marketing', 'Web Development', 'App Development'
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      onSignupSuccess();
    }
  };

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill) 
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const sendOtp = () => {
    setOtpVerification(prev => ({ ...prev, isOtpSent: true }));
  };

  const verifyOtp = () => {
    setOtpVerification(prev => ({ ...prev, isPhoneVerified: true }));
    handleNext();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center space-y-2 mb-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Join <span className="text-gradient bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">CreatorHub</span>
              </h3>
              <p className="text-sm text-gray-600">Let's get you started with your creator journey!</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl"
                />
                
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl"
                />

                <Select value={formData.year} onValueChange={(value) => setFormData(prev => ({ ...prev, year: value }))}>
                  <SelectTrigger className="bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl">
                    <SelectValue placeholder="Year of Study" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1st">1st Year</SelectItem>
                    <SelectItem value="2nd">2nd Year</SelectItem>
                    <SelectItem value="3rd">3rd Year</SelectItem>
                    <SelectItem value="4th">4th Year</SelectItem>
                    <SelectItem value="postgrad">Post Graduate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Input
                placeholder="College/University"
                value={formData.college}
                onChange={(e) => setFormData(prev => ({ ...prev, college: e.target.value }))}
                className="bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl"
              />
            </div>

            <Button 
              onClick={handleNext}
              disabled={!formData.name || !formData.email || !formData.phone || !formData.college}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl"
            >
              Continue
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center space-y-2 mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Your Skills</h3>
              <p className="text-sm text-gray-600">Select your areas of expertise</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {availableSkills.map((skill) => (
                <div
                  key={skill}
                  onClick={() => handleSkillToggle(skill)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all duration-200 text-center text-sm ${
                    formData.skills.includes(skill)
                      ? 'bg-gradient-to-r from-purple-100 to-blue-100 border-purple-300 text-purple-700'
                      : 'bg-white/70 border-white/30 hover:bg-purple-50'
                  }`}
                >
                  {skill}
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline"
                onClick={() => setCurrentStep(1)}
                className="flex-1 rounded-xl"
              >
                Back
              </Button>
              <Button 
                onClick={handleNext}
                disabled={formData.skills.length === 0}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl"
              >
                Continue
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center space-y-2 mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Verify Phone</h3>
              <p className="text-sm text-gray-600">We'll send an OTP to {formData.phone}</p>
            </div>

            {!otpVerification.isOtpSent ? (
              <Button 
                onClick={sendOtp}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl"
              >
                Send OTP
              </Button>
            ) : (
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otpVerification.otp}
                  onChange={(e) => setOtpVerification(prev => ({ ...prev, otp: e.target.value }))}
                  className="bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl text-center text-lg tracking-wider"
                  maxLength={6}
                />
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreedToTerms}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, agreedToTerms: checked as boolean }))}
                  />
                  <label htmlFor="terms" className="text-xs text-gray-600">
                    I agree to the Terms & Conditions and Privacy Policy
                  </label>
                </div>

                <div className="flex gap-3">
                  <Button 
                    variant="outline"
                    onClick={() => setCurrentStep(2)}
                    className="flex-1 rounded-xl"
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={verifyOtp}
                    disabled={otpVerification.otp.length !== 6 || !formData.agreedToTerms}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl"
                  >
                    Create Account
                  </Button>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Step {currentStep} of 3</span>
          <span>{Math.round((currentStep / 3) * 100)}%</span>
        </div>
        <Progress value={(currentStep / 3) * 100} className="h-2" />
      </div>

      {renderStep()}

      {/* Switch to Login */}
      {onSwitchToLogin && currentStep === 1 && (
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Sign in here
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
