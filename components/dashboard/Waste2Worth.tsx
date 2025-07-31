import { Recycle, Upload, Calculator, Leaf } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface Waste2WorthProps {
  expanded?: boolean;
}

export function Waste2Worth({ expanded = false }: Waste2WorthProps) {
  const wasteTypes = [
    { value: "plastic", label: "Plastic / प्लास्टिक", rate: "₹15/kg" },
    { value: "paper", label: "Paper / कागज़", rate: "₹8/kg" },
    { value: "metal", label: "Metal / धातु", rate: "₹25/kg" },
    { value: "electronic", label: "E-Waste / ई-कचरा", rate: "₹45/kg" },
    { value: "organic", label: "Organic / जैविक", rate: "₹5/kg" },
  ];

  const recentSubmissions = [
    { type: "Plastic", weight: "15 kg", value: "₹225", date: "Today" },
    { type: "Paper", weight: "8 kg", value: "₹64", date: "Yesterday" },
    { type: "Metal", weight: "5 kg", value: "₹125", date: "2 days ago" },
  ];

  return (
    <div className={`glass-card rounded-2xl p-6 ${expanded ? 'w-full' : 'h-full'}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Waste2Worth</h3>
        <span className="text-sm text-gray-600">अपशिष्ट उपयोग करें</span>
      </div>
      
      {/* Input Form */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Waste Type / कचरे का प्रकार
          </label>
          <Select>
            <SelectTrigger className="bg-white/60">
              <SelectValue placeholder="Select waste type" />
            </SelectTrigger>
            <SelectContent>
              {wasteTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  <div className="flex items-center justify-between w-full">
                    <span>{type.label}</span>
                    <span className="text-green-600 ml-2">{type.rate}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Weight (kg) / वजन (किग्रा)
          </label>
          <Input 
            type="number" 
            placeholder="Enter weight"
            className="bg-white/60"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Upload Photo / फोटो अपलोड करें
          </label>
          <Button variant="outline" className="w-full bg-white/60 hover:bg-white/80">
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>
        </div>
      </div>

      {/* Estimated Value */}
      <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl mb-6">
        <div className="flex items-center gap-3">
          <Calculator className="w-6 h-6 text-green-500" />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-800">Estimated Value</p>
            <p className="text-xs text-gray-600">अनुमानित मूल्य</p>
          </div>
          <span className="text-2xl font-bold text-green-600">₹0</span>
        </div>
      </div>

      {expanded ? (
        <div className="space-y-6">
          {/* Waste Type Cards */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Current Rates / वर्तमान दरें</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {wasteTypes.map((type) => (
                <div key={type.value} className="p-3 bg-white/50 rounded-lg border border-white/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Leaf className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-gray-800">{type.label.split(' / ')[0]}</span>
                  </div>
                  <span className="text-lg font-bold text-green-600">{type.rate}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Submissions */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Recent Submissions</h4>
            <div className="space-y-3">
              {recentSubmissions.map((submission, index) => (
                <div key={index} className="p-3 bg-white/50 rounded-lg border border-white/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{submission.type}</p>
                      <p className="text-xs text-gray-600">{submission.weight} • {submission.date}</p>
                    </div>
                    <span className="text-lg font-bold text-green-600">{submission.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
            <div className="flex items-center gap-3">
              <Recycle className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm font-medium text-gray-800">This Month</p>
                <p className="text-xs text-gray-600">इस महीने</p>
              </div>
            </div>
            <span className="text-lg font-bold text-green-600">₹1,240</span>
          </div>

          <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
            <Upload className="w-4 h-4 mr-2" />
            Submit Waste / कचरा जमा करें
          </Button>
        </div>
      )}
    </div>
  );
}