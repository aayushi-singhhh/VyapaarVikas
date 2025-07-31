import { Users, Star, Eye, MessageCircle } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface StudentAdGenieProps {
  expanded?: boolean;
}

export function StudentAdGenie({ expanded = false }: StudentAdGenieProps) {
  const creators = [
    { 
      name: "Priya Sharma", 
      nameHindi: "प्रिया शर्मा",
      specialty: "Fashion Content & Reels", 
      specialtyHindi: "फैशन सामग्री और रील",
      followers: "15K", 
      rating: 4.8,
      pricing: {
        reelImpressions: "₹200 for 2K reel impressions",
        postImpressions: "₹300 for 3K post impressions", 
        socialHandling: "₹500/month for social account handling"
      },
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face"
    },
    { 
      name: "Arjun Patel", 
      nameHindi: "अर्जुन पटेल", 
      specialty: "Product Videos & Tech Content", 
      specialtyHindi: "उत्पाद वीडियो और तकनीकी सामग्री",
      followers: "23K", 
      rating: 4.9,
      pricing: {
        reelImpressions: "₹200 for 2K reel impressions",
        postImpressions: "₹300 for 3K post impressions", 
        socialHandling: "₹500/month for social account handling"
      },
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    { 
      name: "Sneha Gupta", 
      nameHindi: "स्नेहा गुप्ता",
      specialty: "Story Marketing & Lifestyle", 
      specialtyHindi: "कहानी मार्केटिंग और जीवनशैली",
      followers: "18K", 
      rating: 4.7,
      pricing: {
        reelImpressions: "₹200 for 2K reel impressions",
        postImpressions: "₹300 for 3K post impressions", 
        socialHandling: "₹500/month for social account handling"
      },
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
  ];

  return (
    <div className={`glass-card rounded-2xl p-6 ${expanded ? 'h-auto' : 'h-full'}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Student AdGenie</h3>
        <span className="text-sm text-gray-600">विज्ञापन प्रतिभा</span>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">
          Connect with student creators / छात्र रचनाकारों से जुड़ें
        </p>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            50+ Creators
          </span>
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3" />
            4.8 Avg Rating
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {creators.slice(0, expanded ? creators.length : 3).map((creator, index) => (
          <div key={index} className="p-3 bg-white/50 rounded-lg border border-white/30">
            <div className="flex items-center gap-3">
              <ImageWithFallback
                src={creator.image}
                alt={creator.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">{creator.name}</h4>
                <p className="text-xs text-gray-500">{creator.nameHindi}</p>
                <p className="text-sm text-gray-600">{creator.specialty}</p>
                <p className="text-xs text-gray-500">{creator.specialtyHindi}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500">{creator.followers} followers</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs text-gray-600">{creator.rating}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-blue-600 text-sm">From ₹200</p>
                <p className="text-xs text-gray-500">performance-based</p>
              </div>
            </div>
            {expanded && (
              <div className="mt-3 space-y-2 text-xs text-gray-600 bg-blue-50 p-3 rounded-lg">
                <p>• {creator.pricing.reelImpressions}</p>
                <p>• {creator.pricing.postImpressions}</p>
                <p>• {creator.pricing.socialHandling}</p>
              </div>
            )}
            {expanded && (
              <div className="flex gap-2 mt-3">
                <button className="flex-1 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600">
                  Connect / संपर्क करें
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {!expanded && (
        <button className="w-full mt-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all">
          View More Creators / अधिक रचनाकार देखें
        </button>
      )}
    </div>
  );
}