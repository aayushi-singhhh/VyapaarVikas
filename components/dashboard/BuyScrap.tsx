import { ShoppingCart, Package, Star, MapPin, Truck, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";

interface BuyScrapProps {
  expanded?: boolean;
}

export function BuyScrap({ expanded = false }: BuyScrapProps) {
  const scrapItems = [
    {
      id: 1,
      seller: "Sharma Textiles",
      material: "Cotton Fabric Waste",
      materialHindi: "कॉटन कपड़े का कचरा",
      type: "Fabric",
      quantity: 500,
      pricePerKg: 45,
      location: "Surat, Gujarat",
      rating: 4.8,
      verified: true,
      emoji: "🧵"
    },
    {
      id: 2,
      seller: "Wood Works Delhi",
      material: "Teak Wood Scraps",
      materialHindi: "सागौन लकड़ी के टुकड़े",
      type: "Wood",
      quantity: 300,
      pricePerKg: 120,
      location: "Delhi, NCR",
      rating: 4.6,
      verified: true,
      emoji: "🪵"
    },
    {
      id: 3,
      seller: "GreenPlastic Solutions",
      material: "PET Plastic Bottles",
      materialHindi: "प्लास्टिक की बोतलें",
      type: "Plastic",
      quantity: 800,
      pricePerKg: 22,
      location: "Mumbai, Maharashtra",
      rating: 4.9,
      verified: true,
      emoji: "♻️"
    },
    {
      id: 4,
      seller: "Metal Works Co.",
      material: "Iron & Steel Scrap",
      materialHindi: "लोहा और स्टील स्क्रैप",
      type: "Metal",
      quantity: 1200,
      pricePerKg: 28,
      location: "Pune, Maharashtra",
      rating: 4.5,
      verified: false,
      emoji: "🔩"
    },
    {
      id: 5,
      seller: "Paper Mill Suppliers",
      material: "Cardboard & Paper",
      materialHindi: "कार्डबोर्ड और कागज़",
      type: "Paper",
      quantity: 400,
      pricePerKg: 12,
      location: "Bangalore, Karnataka",
      rating: 4.3,
      verified: true,
      emoji: "📄"
    },
    {
      id: 6,
      seller: "Glass Recyclers",
      material: "Broken Glass Pieces",
      materialHindi: "टूटे काँच के टुकड़े",
      type: "Glass",
      quantity: 600,
      pricePerKg: 8,
      location: "Rajkot, Gujarat",
      rating: 4.4,
      verified: true,
      emoji: "🪟"
    }
  ];

  if (!expanded) {
    return (
      <div className="glass-card rounded-2xl p-6 h-full">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Buy Scrap</h3>
            <span className="text-sm text-gray-600">सस्ता कच्चा माल</span>
          </div>
          <ShoppingCart className="w-6 h-6 text-green-600" />
        </div>
        
        <div className="space-y-3">
          {scrapItems.slice(0, 3).map((item) => (
            <div key={item.id} className="p-3 bg-white/50 rounded-lg border border-white/30">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{item.emoji}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{item.material}</p>
                    <p className="text-xs text-gray-600">{item.materialHindi}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-green-600">₹{item.pricePerKg}/kg</p>
                  <p className="text-xs text-gray-500">{item.quantity}kg</p>
                </div>
              </div>
              <p className="text-xs text-gray-600">{item.location}</p>
            </div>
          ))}
          
          <Button className="w-full py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg">
            View Marketplace / बाज़ार देखें
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Buy Scrap Marketplace</h3>
            <p className="text-gray-600">सस्ता कच्चा माल बाज़ार</p>
          </div>
          <ShoppingCart className="w-8 h-8 text-green-600" />
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input 
            placeholder="Search materials... / सामग्री खोजें..." 
            className="pl-10 bg-white/60 backdrop-blur-sm"
          />
        </div>
      </div>

      {/* Marketplace Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scrapItems.map((item) => (
          <div key={item.id} className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
            {/* Seller Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{item.seller.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{item.seller}</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs text-gray-600">{item.rating}</span>
                  </div>
                </div>
              </div>
              {item.verified && (
                <Badge className="bg-green-100 text-green-800 text-xs">✓</Badge>
              )}
            </div>

            {/* Material Info */}
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{item.emoji}</span>
                <div>
                  <h4 className="font-semibold text-gray-800">{item.material}</h4>
                  <p className="text-sm text-gray-600">{item.materialHindi}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-3">
                <Badge variant="outline" className="text-xs">{item.type}</Badge>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">₹{item.pricePerKg}/kg</p>
                  <p className="text-xs text-gray-500">{item.quantity}kg available</p>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 mb-4 text-xs text-gray-600">
              <MapPin className="w-3 h-3" />
              <span>{item.location}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button className="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm">
                <ShoppingCart className="w-3 h-3 mr-1" />
                Buy Now
              </Button>
              <Button variant="outline" size="sm" className="bg-white/60">
                <Package className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}