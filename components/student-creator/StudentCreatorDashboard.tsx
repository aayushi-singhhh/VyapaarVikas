"use client";

import { 
  DollarSign, 
  Briefcase, 
  Eye, 
  Clock, 
  Search, 
  Upload, 
  Trophy, 
  Book,
  MessageCircle, 
  Star, 
  CheckCircle, 
  Target, 
  Plus, 
  Send
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface StudentCreatorDashboardProps {
  activeTab?: string;
}

export function StudentCreatorDashboard({ activeTab = "dashboard" }: StudentCreatorDashboardProps) {
  const dashboardStats = {
    earningsThisMonth: 24500,
    activeProjects: 3,
    pendingPayouts: 8200,
    contentViews: 125000,
    totalEarnings: 89500,
    completedProjects: 12
  };

  return (
    <div className="space-y-6">
      {/* Main Dashboard Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Earnings This Month</p>
                <p className="text-2xl font-bold text-green-600">₹{dashboardStats.earningsThisMonth.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Projects</p>
                <p className="text-2xl font-bold text-blue-600">{dashboardStats.activeProjects}</p>
              </div>
              <Briefcase className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Payouts</p>
                <p className="text-2xl font-bold text-orange-600">₹{dashboardStats.pendingPayouts.toLocaleString()}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Content Views</p>
                <p className="text-2xl font-bold text-purple-600">{(dashboardStats.contentViews / 1000).toFixed(0)}K</p>
              </div>
              <Eye className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Based on Active Tab */}
      {activeTab === "marketplace" && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Project Marketplace
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Find Amazing Campaigns</h3>
              <p className="text-gray-600 mb-6">Browse through available MSME campaigns and start earning</p>
              <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                Browse Campaigns
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "projects" && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              My Active Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No Active Projects</h3>
              <p className="text-gray-600 mb-6">Apply to campaigns to start working on projects</p>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                Find Projects
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "content" && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Content Upload & Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Upload Your Content</h3>
              <p className="text-gray-600 mb-6">Drag & drop files or click to browse</p>
              <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Choose Files
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "earnings" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">Total Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600">₹{dashboardStats.totalEarnings.toLocaleString()}</p>
                <p className="text-sm text-gray-600">From {dashboardStats.completedProjects} completed projects</p>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-blue-600">₹{dashboardStats.earningsThisMonth.toLocaleString()}</p>
                <p className="text-sm text-gray-600">+24% from last month</p>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">Pending Payout</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-orange-600">₹{dashboardStats.pendingPayouts.toLocaleString()}</p>
                <Button size="sm" className="mt-2 bg-green-500 hover:bg-green-600 text-white">
                  Request Payout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "leaderboard" && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Creator Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Leaderboard</h3>
              <p className="text-gray-600 mb-6">See how you stack up against other creators</p>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
                View Rankings
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "skills" && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="w-5 h-5" />
              Skill Development Hub
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Book className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Enhance Your Skills</h3>
              <p className="text-gray-600 mb-6">Take courses to improve your creator skills</p>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                Browse Courses
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "messages" && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Messages & Communication
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No new messages</h3>
              <p className="text-gray-600 mb-6">Your conversations with MSMEs will appear here</p>
              <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                <Send className="w-4 h-4 mr-2" />
                Start a Conversation
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Default dashboard content */}
      {activeTab === "dashboard" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button className="h-16 bg-purple-500 hover:bg-purple-600 text-white flex-col">
                    <Search className="w-5 h-5 mb-1" />
                    Browse Campaigns
                  </Button>
                  <Button className="h-16 bg-blue-500 hover:bg-blue-600 text-white flex-col">
                    <Upload className="w-5 h-5 mb-1" />
                    Upload Content
                  </Button>
                  <Button className="h-16 bg-green-500 hover:bg-green-600 text-white flex-col">
                    <DollarSign className="w-5 h-5 mb-1" />
                    View Earnings
                  </Button>
                  <Button className="h-16 bg-orange-500 hover:bg-orange-600 text-white flex-col">
                    <Book className="w-5 h-5 mb-1" />
                    Learn Skills
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Getting Started
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-white/30 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Complete your profile</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/30 rounded-lg">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                    <span className="text-sm">Apply to your first campaign</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/30 rounded-lg">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                    <span className="text-sm">Upload your first content</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}