import { MapPin, TrendingUp, Eye } from "lucide-react";

interface CompetitorSpyProps {
  expanded?: boolean;
}

export function CompetitorSpy({ expanded = false }: CompetitorSpyProps) {
  const competitors = [
    { name: "Fashion Hub", distance: "0.5 km", strength: "High", sales: "₹50K/month" },
    { name: "Style Corner", distance: "1.2 km", strength: "Medium", sales: "₹35K/month" },
    { name: "Trend Bazaar", distance: "2.1 km", strength: "Low", sales: "₹20K/month" },
  ];

  return (
    <div className={`glass-card rounded-2xl p-6 w-full dashboard-component ${expanded ? 'h-auto' : 'h-full'}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">AI Competitor Spy</h3>
        <span className="text-sm text-gray-600">प्रतिस्पर्धी जासूसी</span>
      </div>
      
      {/* Map Placeholder */}
      <div className="relative bg-gradient-to-br from-blue-100 to-green-100 rounded-xl h-48 mb-4 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Local Competition Map</p>
            <p className="text-xs text-gray-500">स्थानीय प्रतिस्पर्धा मानचित्र</p>
          </div>
        </div>
        
        {/* Competitor markers */}
        <div className="absolute top-4 left-6 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
        <div className="absolute top-8 right-8 w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
        <div className="absolute bottom-6 left-1/3 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
        <div className="absolute bottom-4 right-1/4 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
      </div>

      {expanded ? (
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-800">Detailed Competitor Analysis</h4>
          {competitors.map((competitor, index) => (
            <div key={index} className="p-4 bg-white/50 rounded-xl border border-white/30">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium text-gray-800">{competitor.name}</h5>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  competitor.strength === 'High' ? 'bg-red-100 text-red-600' :
                  competitor.strength === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-green-100 text-green-600'
                }`}>
                  {competitor.strength}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div>Distance: {competitor.distance}</div>
                <div>Sales: {competitor.sales}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Fashion Hub</span>
            </div>
            <span className="text-xs text-gray-500">0.5km</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Style Corner</span>
            </div>
            <span className="text-xs text-gray-500">1.2km</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-blue-600 mt-4">
            <Eye className="w-4 h-4" />
            <span>View Insights / अंतर्दृष्टि देखें</span>
          </div>
        </div>
      )}
    </div>
  );
}