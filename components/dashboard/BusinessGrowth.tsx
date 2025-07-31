import { TrendingUp, Package, Users, Calendar } from "lucide-react";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, BarChart, Bar } from "recharts";

interface BusinessGrowthProps {
  expanded?: boolean;
}

export function BusinessGrowth({ expanded = false }: BusinessGrowthProps) {
  const weeklyData = [
    { day: 'Mon', sales: 4500, orders: 12 },
    { day: 'Tue', sales: 5200, orders: 15 },
    { day: 'Wed', sales: 4800, orders: 11 },
    { day: 'Thu', sales: 6100, orders: 18 },
    { day: 'Fri', sales: 7200, orders: 21 },
    { day: 'Sat', sales: 8500, orders: 25 },
    { day: 'Sun', sales: 6800, orders: 19 },
  ];

  const productTrends = [
    { name: "Handmade Kurtas", growth: "+25%", trend: "up" },
    { name: "Ethnic Jewelry", growth: "+18%", trend: "up" },
    { name: "Traditional Bags", growth: "-5%", trend: "down" },
    { name: "Decorative Items", growth: "+12%", trend: "up" },
  ];

  return (
    <div className={`glass-card rounded-2xl p-6 ${expanded ? 'h-auto' : 'h-full'}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Business Growth</h3>
        <span className="text-sm text-gray-600">व्यापार विकास</span>
      </div>
      
      {/* Weekly Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-gray-600">This Week</span>
          </div>
          <p className="text-xl font-bold text-gray-800">₹42,100</p>
          <p className="text-sm text-green-600">+15% from last week</p>
        </div>

        <div className="p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-5 h-5 text-purple-500" />
            <span className="text-sm text-gray-600">Orders</span>
          </div>
          <p className="text-xl font-bold text-gray-800">121</p>
          <p className="text-sm text-green-600">+8% increase</p>
        </div>
      </div>

      {/* Weekly Chart */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-800 mb-3">Weekly Sales / साप्ताहिक बिक्री</h4>
        <div className="h-40 bg-white/30 rounded-lg p-3">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis hide />
              <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {expanded ? (
        <div className="space-y-6">
          {/* Detailed Analytics */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Detailed Analytics</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/50 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600">New Customers</span>
                </div>
                <p className="text-2xl font-bold text-gray-800">24</p>
                <p className="text-sm text-green-600">+20% this week</p>
              </div>
              <div className="p-4 bg-white/50 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  <span className="text-sm text-gray-600">Avg Order Value</span>
                </div>
                <p className="text-2xl font-bold text-gray-800">₹348</p>
                <p className="text-sm text-red-600">-3% from last week</p>
              </div>
            </div>
          </div>

          {/* Product Performance */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Product Performance</h4>
            <div className="space-y-3">
              {productTrends.map((product, index) => (
                <div key={index} className="p-3 bg-white/50 rounded-lg border border-white/30">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-800">{product.name}</span>
                    <div className={`flex items-center gap-1 ${
                      product.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <TrendingUp className={`w-4 h-4 ${product.trend === 'down' ? 'rotate-180' : ''}`} />
                      <span className="text-sm font-bold">{product.growth}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-800">Top Performers</h4>
          {productTrends.slice(0, 2).map((product, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
              <span className="text-sm text-gray-700">{product.name}</span>
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp className="w-3 h-3" />
                <span className="text-sm">{product.growth}</span>
              </div>
            </div>
          ))}
          
          <button className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all">
            View Detailed Analytics / विस्तृत विश्लेषण देखें
          </button>
        </div>
      )}
    </div>
  );
}