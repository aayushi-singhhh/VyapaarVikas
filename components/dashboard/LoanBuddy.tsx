import { useState, useEffect } from "react";
import { CreditCard, TrendingUp, AlertCircle, Brain, FileText, Search, Upload, Check, Target, Loader2, ExternalLink, Star } from "lucide-react";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface LoanBuddyProps {
  expanded?: boolean;
}

interface BankScheme {
  bankName: string;
  schemeName: string;
  loanAmountRange: string;
  interestRate: string;
  processingTime: string;
  keyFeatures: string[];
  eligibilityRequiredCriteria: string[];
  requiredDocuments: string[];
  specialBenefits: string[];
  applicationLink: string;
  lastUpdated: string;
  isRecommended?: boolean;
}

interface SchemeRecommendations {
  bestMatch: string;
  reasoning: string;
  alternativeOptions: string[];
}

interface BankSchemesResponse {
  schemes: BankScheme[];
  recommendations: SchemeRecommendations;
  lastUpdated: string;
}

export function LoanBuddy({ expanded = false }: LoanBuddyProps) {
  const [bankSchemes, setBankSchemes] = useState<BankScheme[]>([]);
  const [recommendations, setRecommendations] = useState<SchemeRecommendations | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [businessType, setBusinessType] = useState('');
  const [annualRevenue, setAnnualRevenue] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [yearsActive, setYearsActive] = useState('');

  // Fetch bank schemes from API
  const fetchBankSchemes = async () => {
    if (!businessType || !annualRevenue) {
      alert('Please fill in both Industry and Annual Revenue to get personalized loan schemes.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/bank-schemes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          businessType,
          revenue: annualRevenue,
          loanAmount,
          location: 'India'
        }),
      });

      const data: BankSchemesResponse = await response.json();
      
      if (response.ok) {
        setBankSchemes(data.schemes || []);
        setRecommendations(data.recommendations || null);
      } else {
        console.error('API Error:', data);
        setBankSchemes([]);
      }
    } catch (error) {
      console.error('Error fetching bank schemes:', error);
      setBankSchemes([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-fetch when form is complete
  useEffect(() => {
    if (businessType && annualRevenue) {
      const debounceTimer = setTimeout(() => {
        fetchBankSchemes();
      }, 1000);
      
      return () => clearTimeout(debounceTimer);
    }
  }, [businessType, annualRevenue, loanAmount]);

  const documents = [
    { name: "GST Certificate", status: "uploaded", required: true },
    { name: "Aadhaar Card", status: "uploaded", required: true },
    { name: "Udyam Registration", status: "missing", required: true },
    { name: "Income Proof (ITR)", status: "uploaded", required: true },
    { name: "Bank Statements", status: "missing", required: false },
  ];

  const scoreImprovements = [
    { action: "Upload 1 more year of ITR", impact: "+20%", priority: "high" },
    { action: "Complete Udyam Registration", impact: "+15%", priority: "high" },
    { action: "Add Bank Statements", impact: "+10%", priority: "medium" },
  ];

  if (!expanded) {
    return (
      <div className="glass-card rounded-2xl p-6 h-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">LoanBuddy</h3>
          <span className="text-sm text-gray-600">ऋण सहायता</span>
        </div>
        
        {/* Loan Readiness Score */}
        <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl mb-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-600">Loan Readiness Score</p>
            <p className="text-sm text-gray-600">ऋण तैयारी स्कोर</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Progress value={75} className="h-3 bg-gray-200" />
            </div>
            <span className="text-2xl font-bold text-green-600">75/100</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">Good eligibility / अच्छी पात्रता</p>
        </div>

        <div className="space-y-3">
          <div className="p-3 bg-white/50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {bankSchemes.length > 0 ? bankSchemes[0].bankName : 'Complete form for schemes'}
                  </p>
                  <p className="text-xs text-gray-600">
                    {bankSchemes.length > 0 ? 'व्यापारिक ऋण' : 'योजनाओं के लिए फॉर्म भरें'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-blue-600">
                  {bankSchemes.length > 0 ? bankSchemes[0].loanAmountRange : 'Fill Form'}
                </p>
                <p className="text-xs text-gray-500">
                  {bankSchemes.length > 0 ? `@${bankSchemes[0].interestRate}` : 'फॉर्म भरें'}
                </p>
              </div>
            </div>
          </div>

          {bankSchemes.length > 0 ? (
            <div className="text-xs text-green-600 flex items-center justify-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Live data from {bankSchemes.length} banks / {bankSchemes.length} बैंकों से लाइव डेटा
            </div>
          ) : (
            <div className="text-xs text-orange-600 flex items-center justify-center gap-1">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              Enter details in expanded view for loan schemes / विस्तृत जानकारी के लिए फॉर्म भरें
            </div>
          )}

          <button className="w-full py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all">
            View All Features / सभी सुविधाएं देखें
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6 h-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold text-gray-800">LoanBuddy</h3>
        <span className="text-lg text-gray-600">ऋण सहायता</span>
      </div>

      <Tabs defaultValue="auto-match" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white/60 p-1 rounded-xl">
          <TabsTrigger value="auto-match" className="flex items-center gap-2 rounded-lg">
            <Brain className="w-4 h-4" />
            <span className="hidden sm:inline">Auto-Match</span>
          </TabsTrigger>
          <TabsTrigger value="doc-scanner" className="flex items-center gap-2 rounded-lg">
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">DocScanner</span>
          </TabsTrigger>
          <TabsTrigger value="readiness-score" className="flex items-center gap-2 rounded-lg">
            <Target className="w-4 h-4" />
            <span className="hidden sm:inline">AI Score</span>
          </TabsTrigger>
        </TabsList>

        {/* 🧠 1. Auto-Match with Best-Fit Lenders */}
        <TabsContent value="auto-match" className="space-y-6">
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-6 h-6 text-blue-500" />
              <h4 className="text-lg font-semibold text-gray-800">Auto-Match with Best-Fit Lenders</h4>
            </div>
            
            {/* Business Details Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Annual Revenue / वार्षिक आय</label>
                <Input 
                  placeholder="₹10,00,000" 
                  className="bg-white/60" 
                  value={annualRevenue}
                  onChange={(e) => setAnnualRevenue(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Industry / उद्योग</label>
                <Select value={businessType} onValueChange={setBusinessType}>
                  <SelectTrigger className="bg-white/60">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent className="z-50 bg-white/30 backdrop-blur-lg border border-white/20 shadow-md rounded-xl ring-1 ring-white/10">
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="services">Services</SelectItem>
                    <SelectItem value="food">Food & Beverage</SelectItem>
                    <SelectItem value="textile">Textile & Clothing</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="construction">Construction</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Loan Amount Required / आवश्यक ऋण राशि</label>
                <Input 
                  placeholder="₹5,00,000" 
                  className="bg-white/60" 
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Years Active / वर्षों से सक्रिय</label>
                <Select value={yearsActive} onValueChange={setYearsActive}>
                  <SelectTrigger className="bg-white/60">
                    <SelectValue placeholder="Select years" />
                  </SelectTrigger>
                  <SelectContent className="z-50 bg-white/30 backdrop-blur-lg border border-white/20 shadow-md rounded-xl ring-1 ring-white/10">
                    <SelectItem value="1">Less than 1 year</SelectItem>
                    <SelectItem value="2">1-2 years</SelectItem>
                    <SelectItem value="5">3-5 years</SelectItem>
                    <SelectItem value="5+">More than 5 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 rounded-xl mb-6"
              onClick={fetchBankSchemes}
              disabled={isLoading || !businessType || !annualRevenue}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Search className="w-4 h-4 mr-2" />
              )}
              {isLoading ? 'Fetching Latest Schemes...' : 'Scan & Match Lenders'} / {isLoading ? 'योजनाएं खोजी जा रही हैं...' : 'स्कैन और मैच करें'}
            </Button>

            {/* Best-Fit Results */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h5 className="font-semibold text-gray-800">Best-Fit Loan Schemes / सर्वोत्तम ऋण योजनाएं</h5>
                {bankSchemes.length > 0 && (
                  <span className="text-xs text-green-600 flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Live Data / लाइव डेटा
                  </span>
                )}
              </div>

              {/* AI Recommendations */}
              {recommendations && (
                <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-5 h-5 text-blue-600" />
                    <h6 className="font-medium text-gray-800">AI Recommendation / AI सिफारिश</h6>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Best Match:</strong> {recommendations.bestMatch}
                  </p>
                  <p className="text-xs text-gray-600">{recommendations.reasoning}</p>
                </div>
              )}

              {/* Loading State */}
              {isLoading && (
                <div className="text-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
                  <p className="text-gray-600">Fetching latest bank schemes... / नवीनतम बैंक योजनाएं खोजी जा रही हैं...</p>
                </div>
              )}

              {/* Real-time Bank Schemes */}
              {bankSchemes.length > 0 ? (
                bankSchemes.slice(0, 6).map((scheme, index) => (
                  <div 
                    key={index} 
                    className={`p-5 rounded-xl border transition-all duration-200 hover:shadow-lg ${
                      scheme.isRecommended 
                        ? 'border-green-300 bg-gradient-to-r from-green-50 to-green-100' 
                        : 'border-white/30 bg-white/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <h5 className="font-medium text-gray-800">{scheme.bankName}</h5>
                        {scheme.isRecommended && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                      </div>
                      <span className="text-lg font-bold text-blue-600">{scheme.loanAmountRange}</span>
                    </div>
                    
                    <h6 className="text-sm font-medium text-gray-700 mb-2">{scheme.schemeName}</h6>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                      <div>
                        <span className="text-gray-500">Rate:</span> {scheme.interestRate}
                      </div>
                      <div>
                        <span className="text-gray-500">Processing:</span> {scheme.processingTime}
                      </div>
                    </div>

                    {/* Key Features */}
                    <div className="mb-3">
                      <p className="text-xs font-medium text-gray-700 mb-1">Key Features:</p>
                      <div className="flex flex-wrap gap-1">
                        {scheme.keyFeatures.slice(0, 2).map((feature, idx) => (
                          <span key={idx} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        onClick={() => window.open(scheme.applicationLink, '_blank')}
                      >
                        Apply Now / अभी आवेदन करें
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="px-3"
                        onClick={() => window.open(scheme.applicationLink, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : !isLoading && businessType && annualRevenue ? (
                <div className="text-center py-8 text-gray-500">
                  <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                  <p>No schemes found. Please check your criteria. / कोई योजना नहीं मिली। कृपया अपने मानदंड जांचें।</p>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Brain className="w-8 h-8 mx-auto mb-2" />
                  <p className="font-medium mb-2">Ready to find your perfect loan match?</p>
                  <p>Enter your business details above to see personalized loan schemes from top banks.</p>
                  <p className="text-sm mt-2 text-gray-400">व्यक्तिगत ऋण योजनाएं देखने के लिए ऊपर अपना व्यापारिक विवरण दर्ज करें।</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* 📄 2. DocScanner + Prep Engine */}
        <TabsContent value="doc-scanner" className="space-y-6">
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-green-500" />
              <h4 className="text-lg font-semibold text-gray-800">DocScanner + Prep Engine</h4>
            </div>

            {/* Document Upload Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {documents.map((doc, index) => (
                <div key={index} className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  doc.status === 'uploaded' 
                    ? 'border-green-300 bg-green-50' 
                    : 'border-orange-300 bg-orange-50 border-dashed'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-800">{doc.name}</span>
                    {doc.status === 'uploaded' ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <Upload className="w-5 h-5 text-orange-500" />
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mb-3">
                    {doc.required ? 'Required / आवश्यक' : 'Optional / वैकल्पिक'}
                  </p>
                  {doc.status === 'missing' && (
                    <Button size="sm" variant="outline" className="w-full">
                      <Upload className="w-3 h-3 mr-1" />
                      Upload / अपलोड करें
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* OCR Processing Status */}
            <div className="p-4 bg-blue-50 rounded-xl mb-4">
              <h5 className="font-medium text-gray-800 mb-2">OCR Auto-Scan Results / ऑटो-स्कैन परिणाम</h5>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Business Name:</span>
                  <span className="font-medium">Sharma Textiles Pvt Ltd</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>GST Number:</span>
                  <span className="font-medium">29GGGGG1314R9Z6</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Annual Turnover:</span>
                  <span className="font-medium">₹15,00,000</span>
                </div>
              </div>
            </div>

            {/* Missing Documents Checklist */}
            <div className="p-4 bg-orange-50 rounded-xl">
              <h5 className="font-medium text-gray-800 mb-3">Missing Documents Checklist / लापता दस्तावेज़</h5>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-orange-700">
                  <AlertCircle className="w-4 h-4" />
                  <span>Udyam Registration Certificate required</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-orange-700">
                  <AlertCircle className="w-4 h-4" />
                  <span>Bank statements for last 6 months recommended</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* 🔎 3. AI-Powered Loan Readiness Score */}
        <TabsContent value="readiness-score" className="space-y-6">
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-6 h-6 text-purple-500" />
              <h4 className="text-lg font-semibold text-gray-800">AI-Powered Loan Readiness Score</h4>
            </div>

            {/* Score Meter */}
            <div className="text-center mb-8">
              <div className="relative w-48 h-48 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeDasharray="75, 100"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600">78</div>
                    <div className="text-sm text-gray-600">Score / स्कोर</div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Good Readiness Level</h3>
              <p className="text-gray-600">अच्छी तैयारी का स्तर</p>
            </div>

            {/* Score Breakdown */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-green-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Financial Health</span>
                  <span className="text-sm font-bold text-green-600">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div className="p-4 bg-yellow-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Documentation</span>
                  <span className="text-sm font-bold text-yellow-600">70%</span>
                </div>
                <Progress value={70} className="h-2" />
              </div>
              <div className="p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Credit History</span>
                  <span className="text-sm font-bold text-blue-600">80%</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
              <div className="p-4 bg-purple-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Business Stability</span>
                  <span className="text-sm font-bold text-purple-600">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
            </div>

            {/* Improvement Tips */}
            <div className="space-y-4">
              <h5 className="font-semibold text-gray-800">Improve Your Score / अपना स्कोर बेहतर बनाएं</h5>
              {scoreImprovements.map((tip, index) => (
                <div key={index} className={`p-4 rounded-xl border-l-4 ${
                  tip.priority === 'high' 
                    ? 'border-red-400 bg-red-50' 
                    : 'border-yellow-400 bg-yellow-50'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-800">{tip.action}</span>
                    <span className={`text-sm font-bold ${
                      tip.priority === 'high' ? 'text-red-600' : 'text-yellow-600'
                    }`}>
                      {tip.impact}
                    </span>
                  </div>
                  <Button 
                    size="sm" 
                    className={`${
                      tip.priority === 'high' 
                        ? 'bg-red-500 hover:bg-red-600' 
                        : 'bg-yellow-500 hover:bg-yellow-600'
                    } text-white`}
                  >
                    Start Now / अभी शुरू करें
                  </Button>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Button className="w-full mt-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl">
              <TrendingUp className="w-4 h-4 mr-2" />
              Improve Score Now / स्कोर अभी बेहतर बनाएं
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}