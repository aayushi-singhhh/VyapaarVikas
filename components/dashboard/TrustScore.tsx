import { Shield, TrendingUp, Users, Star, CheckCircle } from "lucide-react";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface TrustScoreProps {
  expanded?: boolean;
}

export function TrustScore({ expanded = false }: TrustScoreProps) {
  const trustData = [
    { month: 'Jan', score: 65 },
    { month: 'Feb', score: 68 },
    { month: 'Mar', score: 72 },
    { month: 'Apr', score: 75 },
    { month: 'May', score: 78 },
    { month: 'Jun', score: 82 },
  ];

  const improvements = [
    { action: "Add customer testimonials", impact: "+5 points", icon: Star },
    { action: "Complete business verification", impact: "+8 points", icon: CheckCircle },
    { action: "Improve response time", impact: "+3 points", icon: TrendingUp },
  ];

  return (
    <div className={`glass-card rounded-2xl p-6 ${expanded ? 'h-auto' : 'h-full'}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Trust Score</h3>
        <span className="text-sm text-gray-600">परिशंसा</span>
      </div>
      
      {/* Current Score */}
      <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-green-500" />
            <div>
              <p className="text-sm font-medium text-gray-800">Current Score</p>
              <p className="text-xs text-gray-600">वर्तमान स्कोर</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-3xl font-bold text-green-600">82</span>
            <p className="text-sm text-green-600">Excellent</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-green-600">
          <TrendingUp className="w-4 h-4" />
          <span>+17 points this month</span>
        </div>
      </div>

      {/* Growth Chart */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-800 mb-2">Trust Growth / विश्वास वृद्धि</h4>
        <div className="h-32 bg-white/30 rounded-lg p-3">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trustData}>
              <XAxis dataKey="month" hide />
              <YAxis hide />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#22c55e" 
                strokeWidth={3}
                dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Improvement Suggestions */}
      {expanded ? (
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-800">Improvement Suggestions</h4>
          {improvements.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="p-3 bg-white/50 rounded-lg border border-white/30">
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-blue-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{item.action}</p>
                    <p className="text-xs text-gray-600">Expected impact: {item.impact}</p>
                  </div>
                  <button className="px-3 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600">
                    Start
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-800">Quick Improvements</h4>
          {improvements.slice(0, 2).map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                <Icon className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-700 flex-1">{item.action}</span>
                <span className="text-xs text-green-600">{item.impact}</span>
              </div>
            );
          })}
          
          <button className="w-full py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all">
            View All Suggestions / सभी सुझाव देखें
          </button>
        </div>
      )}
    </div>
  );
}