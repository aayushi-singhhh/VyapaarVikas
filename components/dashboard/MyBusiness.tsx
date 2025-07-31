import { TrendingUp, Package, IndianRupee, BarChart3, PieChart } from "lucide-react";

export function MyBusiness() {
  // Mock data for visual charts
  const todaysSales = 15750;
  const weeklyGrowth = 23.5;
  const activeProducts = 12;
  
  // Weekly sales data for mini bar chart
  const weeklySales = [12000, 15000, 18000, 14000, 17000, 20000, 15750];
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  
  // Product categories for mini pie representation
  const categories = [
    { name: 'Textiles', percentage: 45, color: '#3b82f6' },
    { name: 'Electronics', percentage: 30, color: '#10b981' },
    { name: 'Food', percentage: 15, color: '#f59e0b' },
    { name: 'Others', percentage: 10, color: '#ef4444' }
  ];

  return (
    <div className="glass-card rounded-2xl p-6 h-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">My Business</h3>
          <span className="text-lg text-gray-600">मेरा व्यापार</span>
        </div>
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
          <BarChart3 className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Key Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Today's Sales */}
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-500 rounded-lg">
                <IndianRupee className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Sales</p>
                <p className="text-xs text-gray-500">आज की बिक्री</p>
              </div>
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-2">₹{todaysSales.toLocaleString()}</div>
          <div className="text-sm text-green-600 flex items-center gap-1">
            <span>+12% vs yesterday</span>
          </div>
        </div>

        {/* Weekly Growth */}
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Weekly Growth</p>
                <p className="text-xs text-gray-500">साप्ताहिक वृद्धि</p>
              </div>
            </div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
          <div className="text-3xl font-bold text-blue-600 mb-2">+{weeklyGrowth}%</div>
          <div className="text-sm text-blue-600">Above target by 8%</div>
        </div>

        {/* Active Products */}
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-500 rounded-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Active Products</p>
                <p className="text-xs text-gray-500">सक्रिय उत्पाद</p>
              </div>
            </div>
            <PieChart className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-3xl font-bold text-purple-600 mb-2">{activeProducts}</div>
          <div className="text-sm text-purple-600">3 new this week</div>
        </div>
      </div>

      {/* Visual Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Sales Mini Bar Chart */}
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Weekly Sales Trend</h4>
          <p className="text-sm text-gray-600 mb-4">साप्ताहिक बिक्री प्रवृत्ति</p>
          <div className="flex items-end justify-between h-32 gap-2">
            {weeklySales.map((sale, index) => {
              const maxSale = Math.max(...weeklySales);
              const height = (sale / maxSale) * 100;
              const isToday = index === weeklySales.length - 1;
              
              return (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className={`w-full rounded-t-lg transition-all duration-700 ${
                      isToday ? 'bg-gradient-to-t from-green-400 to-green-500' : 'bg-gradient-to-t from-blue-400 to-blue-500'
                    }`}
                    style={{ height: `${height}%` }}
                    title={`₹${sale.toLocaleString()}`}
                  ></div>
                  <span className="text-xs text-gray-600 mt-2 font-medium">{days[index]}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Product Categories Mini Chart */}
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Product Categories</h4>
          <p className="text-sm text-gray-600 mb-4">उत्पाद श्रेणियां</p>
          <div className="space-y-4">
            {categories.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="text-sm font-medium text-gray-700">{category.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-1000"
                      style={{ 
                        width: `${category.percentage}%`,
                        backgroundColor: category.color 
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-600 w-8">{category.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Quick Business Insights</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Peak sales time: 2-4 PM / चरम बिक्री समय: दोपहर 2-4</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Top performing day: Saturday / शनिवार सबसे अच्छा</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Customer return rate: 78% / ग्राहक वापसी दर</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span>Avg order value: ₹1,250 / औसत ऑर्डर मूल्य</span>
          </div>
        </div>
      </div>
    </div>
  );
}