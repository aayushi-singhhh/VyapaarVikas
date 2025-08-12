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
  isImmersive?: boolean;
}

export function StudentCreatorDashboard({ activeTab = "dashboard", isImmersive = false }: StudentCreatorDashboardProps) {
  const dashboardStats = {
    earningsThisMonth: 24500,
    activeProjects: 3,
    pendingPayouts: 8200,
    contentViews: 125000,
    totalEarnings: 89500,
    completedProjects: 12
  };

  return (
    <div className={isImmersive ? "w-full min-h-screen" : "space-y-6"}>
      {/* Immersive full-width content for personalized sections */}
      {isImmersive && activeTab === "marketplace" && (
        <div className="w-full min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
          {/* Hero Section */}
          <div className="relative w-full h-96 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
              <div className="text-white space-y-6 max-w-4xl">
                <h1 className="text-5xl md:text-6xl font-bold">
                  Discover Amazing <span className="text-yellow-300">Campaigns</span>
                </h1>
                <p className="text-xl md:text-2xl text-blue-100 max-w-3xl">
                  Connect with MSMEs across India and earn while promoting authentic businesses
                </p>
                <div className="flex flex-wrap gap-4 mt-8">
                  <div className="bg-white/20 backdrop-blur-lg rounded-lg px-6 py-3">
                    <span className="text-2xl font-bold">1000+</span>
                    <p className="text-sm">Active MSMEs</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-lg rounded-lg px-6 py-3">
                    <span className="text-2xl font-bold">₹5K</span>
                    <p className="text-sm">Avg. Campaign Value</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-lg rounded-lg px-6 py-3">
                    <span className="text-2xl font-bold">50K+</span>
                    <p className="text-sm">Happy Creators</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="container mx-auto px-6 py-8">
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/30 mb-8">
              <div className="flex flex-col lg:flex-row gap-6 items-center">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search campaigns by category, brand, or location..."
                      className="w-full pl-12 pr-4 py-4 text-lg rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none bg-white/80"
                    />
                  </div>
                </div>
                <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 text-lg rounded-xl">
                  Find Campaigns
                </Button>
              </div>
            </div>

            {/* Campaign Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Card key={i} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-lg border border-white/30">
                  <div className="relative h-48 bg-gradient-to-br from-purple-400 to-blue-500 rounded-t-lg overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-lg rounded-full px-3 py-1 text-sm font-semibold text-purple-600">
                      ₹{(Math.random() * 4000 + 1000).toFixed(0)}
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-bold text-lg">Campaign #{i}</h3>
                      <p className="text-sm opacity-90">MSME Brand</p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <p className="text-gray-600">Create engaging content for a local handicraft business looking to expand their digital presence.</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Ends in 5 days</span>
                        <Button size="sm" className="bg-purple-500 hover:bg-purple-600 text-white">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {isImmersive && activeTab === "projects" && (
        <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-100">
          {/* Projects Hero */}
          <div className="relative w-full h-80 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
              <div className="text-white space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold">
                  Your <span className="text-yellow-300">Active Projects</span>
                </h1>
                <p className="text-xl text-blue-100 max-w-2xl">
                  Track progress, submit content, and manage your ongoing campaigns
                </p>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-6 py-8">
            {/* Project Timeline */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {["In Progress", "Under Review", "Completed"].map((status, index) => (
                <div key={status} className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/30">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      index === 0 ? 'bg-yellow-500' : 
                      index === 1 ? 'bg-blue-500' : 'bg-green-500'
                    }`}></div>
                    {status}
                  </h3>
                  <div className="space-y-4">
                    {[1, 2].map((project) => (
                      <Card key={project} className="bg-white/80 border border-white/40">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-gray-800">Project {project}</h4>
                          <p className="text-sm text-gray-600 mt-1">MSME Brand Campaign</p>
                          <div className="mt-3 flex items-center justify-between">
                            <span className="text-sm font-medium text-green-600">₹{(Math.random() * 3000 + 1500).toFixed(0)}</span>
                            <Button size="sm" variant="outline" className="text-xs">
                              View Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {isImmersive && activeTab === "content" && (
        <div className="w-full min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100">
          {/* Content Library Hero */}
          <div className="relative w-full h-80 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
              <div className="text-white space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold">
                  Your <span className="text-yellow-300">Content Library</span>
                </h1>
                <p className="text-xl text-green-100 max-w-2xl">
                  Manage, edit, and showcase your best creator content
                </p>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-6 py-8">
            {/* Upload Zone */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/30 mb-8">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-green-500 transition-colors">
                <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Upload New Content</h3>
                <p className="text-gray-600 mb-6">Drag & drop files or click to browse</p>
                <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Choose Files
                </Button>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Card key={i} className="group hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-lg border border-white/30">
                  <div className="relative h-48 bg-gradient-to-br from-green-400 to-teal-500 rounded-t-lg">
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-lg rounded-full px-2 py-1 text-xs font-semibold text-green-600">
                      Video
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h4 className="font-semibold">Content {i}</h4>
                      <p className="text-xs opacity-90">Campaign #123</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{Math.floor(Math.random() * 10 + 1)}K views</span>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" className="text-xs">Edit</Button>
                        <Button size="sm" variant="outline" className="text-xs">Share</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {isImmersive && activeTab === "earnings" && (
        <div className="w-full min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-100">
          {/* Earnings Hero */}
          <div className="relative w-full h-80 bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
              <div className="text-white space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold">
                  Your <span className="text-yellow-300">Earnings Dashboard</span>
                </h1>
                <p className="text-xl text-orange-100 max-w-2xl">
                  Track your income, manage payouts, and analyze your creator growth
                </p>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-6 py-8">
            {/* Earnings Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-white/70 backdrop-blur-lg border border-white/30 shadow-xl">
                <CardContent className="p-6 text-center">
                  <DollarSign className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-green-600">₹{dashboardStats.totalEarnings.toLocaleString()}</h3>
                  <p className="text-gray-600">Total Earnings</p>
                </CardContent>
              </Card>
              <Card className="bg-white/70 backdrop-blur-lg border border-white/30 shadow-xl">
                <CardContent className="p-6 text-center">
                  <Clock className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-orange-600">₹{dashboardStats.pendingPayouts.toLocaleString()}</h3>
                  <p className="text-gray-600">Pending Payout</p>
                </CardContent>
              </Card>
              <Card className="bg-white/70 backdrop-blur-lg border border-white/30 shadow-xl">
                <CardContent className="p-6 text-center">
                  <Target className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-blue-600">{dashboardStats.completedProjects}</h3>
                  <p className="text-gray-600">Completed Projects</p>
                </CardContent>
              </Card>
              <Card className="bg-white/70 backdrop-blur-lg border border-white/30 shadow-xl">
                <CardContent className="p-6 text-center">
                  <Star className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-purple-600">4.8</h3>
                  <p className="text-gray-600">Average Rating</p>
                </CardContent>
              </Card>
            </div>

            {/* Payout Section */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/30">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Request Payout</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="p-6 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl border border-green-200">
                    <h4 className="text-lg font-semibold text-green-800 mb-2">Available Balance</h4>
                    <p className="text-3xl font-bold text-green-600">₹{dashboardStats.pendingPayouts.toLocaleString()}</p>
                    <p className="text-sm text-green-700 mt-2">Minimum payout: ₹500</p>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-4 text-lg">
                    Request Payout
                  </Button>
                </div>
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800">Recent Transactions</h4>
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/50 rounded-lg border border-white/40">
                      <div>
                        <p className="font-medium text-gray-800">Project Payment #{i}</p>
                        <p className="text-sm text-gray-600">Campaign completed</p>
                      </div>
                      <span className="text-lg font-bold text-green-600">+₹{(Math.random() * 3000 + 1000).toFixed(0)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Regular dashboard content for non-immersive tabs */}
      {!isImmersive && (
        <>
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
        </>
      )}
    </div>
  );
}