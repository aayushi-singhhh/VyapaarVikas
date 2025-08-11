"use client";

import { useState, useEffect } from "react";
import { MapPin, TrendingUp, Eye, Target, Search, RefreshCw, Navigation, Star, Phone, Globe, Clock, IndianRupee } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface CompetitorSpyProps {
  expanded?: boolean;
}

interface BusinessData {
  id: string;
  name: string;
  type: string;
  address: string;
  distance: number;
  rating: number;
  phone?: string;
  website?: string;
  estimatedRevenue: string;
  strengths: string[];
  weaknesses: string[];
  pricing: string;
  popularity: 'High' | 'Medium' | 'Low';
  lat: number;
  lng: number;
}

export function CompetitorSpy({ expanded = false }: CompetitorSpyProps) {
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [businessType, setBusinessType] = useState<string>('');
  const [searchRadius, setSearchRadius] = useState<number>(5);
  const [isLoading, setIsLoading] = useState(false);
  const [competitors, setCompetitors] = useState<BusinessData[]>([]);
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');

  // Sample business types for MSME
  const businessTypes = [
    'Restaurant/Food Service',
    'Retail Store',
    'Salon/Beauty Parlour',
    'Electronics Repair',
    'Textile/Clothing',
    'Pharmacy/Medical Store',
    'Hardware Store',
    'Mobile Shop',
    'Grocery Store',
    'Bakery/Sweet Shop',
    'Automobile Service',
    'Printing Press',
    'Stationery Shop',
    'Travel Agency'
  ];

  // Get user location
  const getUserLocation = async () => {
    setIsLoading(true);
    try {
      if (!navigator.geolocation) {
        alert('Geolocation is not supported by this browser.');
        return;
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        });
      });

      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
      setLocationPermission('granted');
    } catch (error) {
      console.error('Error getting location:', error);
      setLocationPermission('denied');
      alert('Location access denied. Please enable location services and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Generate mock competitor data based on business type and location
  const generateCompetitors = (type: string, location: {lat: number, lng: number}) => {
    const mockCompetitors: BusinessData[] = [];
    const businessNames = {
      'Restaurant/Food Service': ['Spice Garden', 'Food Palace', 'Curry House', 'Tasty Bites', 'Royal Dine'],
      'Retail Store': ['Fashion Hub', 'Style Corner', 'Trend Bazaar', 'Elite Store', 'Shopping Point'],
      'Salon/Beauty Parlour': ['Glamour Zone', 'Beauty Spot', 'Style Studio', 'Makeover Magic', 'Hair & Care'],
      'Electronics Repair': ['Tech Fix', 'Gadget Guru', 'Electronic Clinic', 'Mobile Doctor', 'Repair Pro'],
      'Default': ['Business A', 'Business B', 'Business C', 'Business D', 'Business E']
    };

    const names = businessNames[type as keyof typeof businessNames] || businessNames.Default;
    
    for (let i = 0; i < 5; i++) {
      const distance = Math.random() * searchRadius;
      const bearing = Math.random() * 360;
      
      // Calculate approximate lat/lng offset
      const latOffset = (distance / 111) * Math.cos(bearing * Math.PI / 180);
      const lngOffset = (distance / (111 * Math.cos(location.lat * Math.PI / 180))) * Math.sin(bearing * Math.PI / 180);

      mockCompetitors.push({
        id: `comp-${i}`,
        name: names[i],
        type: type,
        address: `${Math.floor(Math.random() * 999) + 1}, Local Market, Nearby Area`,
        distance: Number(distance.toFixed(1)),
        rating: Number((3.5 + Math.random() * 1.5).toFixed(1)),
        phone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        website: `www.${names[i].toLowerCase().replace(' ', '')}.com`,
        estimatedRevenue: `₹${Math.floor(Math.random() * 50 + 10)}K/month`,
        strengths: ['Good Location', 'Competitive Pricing', 'Customer Service'][Math.floor(Math.random() * 3)] ? 
          ['Good Location', 'Competitive Pricing'] : ['Customer Service', 'Quality Products'],
        weaknesses: ['Limited Parking', 'Higher Prices', 'Poor Online Presence'][Math.floor(Math.random() * 3)] ? 
          ['Limited Parking'] : ['Poor Online Presence'],
        pricing: ['Budget', 'Premium', 'Mid-range'][Math.floor(Math.random() * 3)],
        popularity: (['High', 'Medium', 'Low'] as const)[Math.floor(Math.random() * 3)],
        lat: location.lat + latOffset,
        lng: location.lng + lngOffset
      });
    }

    return mockCompetitors.sort((a, b) => a.distance - b.distance);
  };

  // Search for competitors using Google Places API
  const searchCompetitors = async () => {
    if (!userLocation || !businessType) {
      alert('Please select business type and enable location access.');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('/api/places', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude: userLocation.lat,
          longitude: userLocation.lng,
          businessType: businessType,
          radius: searchRadius
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setCompetitors(data.competitors || []);
        if (data.competitors?.length === 0) {
          alert(`No ${businessType} businesses found within ${searchRadius}km radius. Try increasing the search radius or selecting a different business type.`);
        }
      } else {
        console.error('API Error:', data.error);
        alert('Failed to fetch competitor data. Showing demo data instead.');
        // Fallback to mock data if API fails
        const results = generateCompetitors(businessType, userLocation);
        setCompetitors(results);
      }
    } catch (error) {
      console.error('Error fetching competitors:', error);
      alert('Network error. Showing demo data instead.');
      // Fallback to mock data if network fails
      const results = generateCompetitors(businessType, userLocation);
      setCompetitors(results);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userLocation && businessType) {
      searchCompetitors();
    }
  }, [userLocation, businessType, searchRadius]);

  return (
    <div className={`glass-card rounded-2xl p-6 w-full dashboard-component ${expanded ? 'h-auto' : 'h-full'}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">AI Competitor Spy</h3>
        <span className="text-sm text-gray-600">प्रतिस्पर्धी जासूसी</span>
      </div>

      {/* Location & Business Type Setup */}
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              📍 Your Location / आपकी स्थिति
            </label>
            <Button
              onClick={getUserLocation}
              disabled={isLoading}
              className={`w-full ${locationPermission === 'granted' ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Navigation className="w-4 h-4 mr-2" />
              )}
              {locationPermission === 'granted' ? 'Location Detected' : 'Get My Location'}
            </Button>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              🏢 Business Type / व्यापार प्रकार
            </label>
            <Select value={businessType} onValueChange={setBusinessType}>
              <SelectTrigger>
                <SelectValue placeholder="Select your business type" />
              </SelectTrigger>
              <SelectContent>
                {businessTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              📏 Search Radius (km)
            </label>
            <Select value={searchRadius.toString()} onValueChange={(value) => setSearchRadius(Number(value))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 km</SelectItem>
                <SelectItem value="2">2 km</SelectItem>
                <SelectItem value="5">5 km</SelectItem>
                <SelectItem value="10">10 km</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button
            onClick={searchCompetitors}
            disabled={!userLocation || !businessType || isLoading}
            className="bg-blue-500 hover:bg-blue-600 mt-6"
          >
            {isLoading ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Search className="w-4 h-4 mr-2" />
            )}
            Search
          </Button>
        </div>
      </div>
      {/* Map Visualization */}
      <div className="relative bg-gradient-to-br from-blue-100 to-green-100 rounded-xl h-48 mb-4 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600">
              {userLocation ? 'Live Competition Map' : 'Enable Location for Live Map'}
            </p>
            <p className="text-xs text-gray-500">
              {userLocation ? 'स्थानीय प्रतिस्पर्धा मानचित्र' : 'लाइव मैप के लिए स्थान सक्षम करें'}
            </p>
          </div>
        </div>
        
        {/* Competitor markers - only show if we have data */}
        {competitors.length > 0 && (
          <>
            {/* Your business (center) */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
              <div className="text-xs text-green-700 font-medium mt-1 whitespace-nowrap">You</div>
            </div>
            
            {/* Competitor markers */}
            {competitors.slice(0, 4).map((competitor, index) => {
              const angle = (index * 90) + 45; // Distribute around circle
              const radius = 60 + (competitor.distance * 5); // Distance from center
              const x = Math.cos(angle * Math.PI / 180) * radius;
              const y = Math.sin(angle * Math.PI / 180) * radius;
              
              return (
                <div
                  key={competitor.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                  }}
                >
                  <div className={`w-3 h-3 rounded-full animate-pulse border border-white ${
                    competitor.popularity === 'High' ? 'bg-red-500' :
                    competitor.popularity === 'Medium' ? 'bg-yellow-500' : 'bg-orange-500'
                  }`}></div>
                  <div className="text-xs text-gray-700 font-medium mt-1 whitespace-nowrap">
                    {competitor.name.split(' ')[0]}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>

      {/* Results Display */}
      {expanded ? (
        <div className="space-y-4">
          {competitors.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Target className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>No competitors found yet.</p>
              <p className="text-sm">Select your business type and location to start discovering nearby competitors.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-800">
                  Found {competitors.length} Competitors within {searchRadius}km
                </h4>
                <Button
                  onClick={searchCompetitors}
                  size="sm"
                  variant="outline"
                  disabled={isLoading}
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </div>
              
              {competitors.map((competitor, index) => (
                <div key={competitor.id} className="p-4 bg-white/50 rounded-xl border border-white/30">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h5 className="font-medium text-gray-800 flex items-center gap-2">
                        {competitor.name}
                        <span className="flex items-center text-yellow-500">
                          <Star className="w-3 h-3 mr-1" />
                          {competitor.rating}
                        </span>
                      </h5>
                      <p className="text-sm text-gray-600">{competitor.address}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      competitor.popularity === 'High' ? 'bg-red-100 text-red-600' :
                      competitor.popularity === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {competitor.popularity} Competition
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                    <div className="flex items-center gap-1">
                      <Navigation className="w-3 h-3 text-gray-500" />
                      <span>{competitor.distance}km away</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <IndianRupee className="w-3 h-3 text-gray-500" />
                      <span>{competitor.estimatedRevenue}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-gray-500" />
                      <span className="truncate">{competitor.phone}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Globe className="w-3 h-3 text-gray-500" />
                      <span className="text-blue-600 hover:underline cursor-pointer truncate">
                        Website
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Pricing:</span>
                      <span className="ml-1">{competitor.pricing}</span>
                    </div>
                    <div>
                      <span className="font-medium text-green-600">Strengths:</span>
                      <div className="text-xs text-gray-600">
                        {competitor.strengths.join(', ')}
                      </div>
                    </div>
                    <div>
                      <span className="font-medium text-red-600">Weaknesses:</span>
                      <div className="text-xs text-gray-600">
                        {competitor.weaknesses.join(', ')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {competitors.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              <p className="text-sm">Select business type & enable location</p>
              <p className="text-xs">व्यापार प्रकार चुनें और स्थान सक्षम करें</p>
            </div>
          ) : (
            <>
              {competitors.slice(0, 3).map((competitor, index) => (
                <div key={competitor.id} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      competitor.popularity === 'High' ? 'bg-red-500' :
                      competitor.popularity === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <div>
                      <span className="text-sm text-gray-700 font-medium">{competitor.name}</span>
                      <div className="text-xs text-gray-500">{competitor.estimatedRevenue}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500">{competitor.distance}km</span>
                    <div className="flex items-center text-xs text-yellow-500">
                      <Star className="w-3 h-3 mr-1" />
                      {competitor.rating}
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex items-center gap-2 text-sm text-blue-600 mt-4 cursor-pointer hover:text-blue-800">
                <Eye className="w-4 h-4" />
                <span>View Detailed Analysis / विस्तृत विश्लेषण देखें</span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}