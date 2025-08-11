import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { latitude, longitude, businessType, radius } = await request.json();

    if (!latitude || !longitude || !businessType) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    if (!process.env.GOOGLE_PLACES_API_KEY) {
      return NextResponse.json({ error: 'Google Places API key not configured' }, { status: 500 });
    }

    // Map business types to Google Places types
    const getPlaceType = (businessType: string): string => {
      const typeMapping: { [key: string]: string } = {
        'Restaurant/Food Service': 'restaurant',
        'Retail Store': 'store',
        'Salon/Beauty Parlour': 'beauty_salon',
        'Electronics Repair': 'electronics_store',
        'Textile/Clothing': 'clothing_store',
        'Pharmacy/Medical Store': 'pharmacy',
        'Hardware Store': 'hardware_store',
        'Mobile Shop': 'electronics_store',
        'Grocery Store': 'grocery_or_supermarket',
        'Bakery/Sweet Shop': 'bakery',
        'Auto Service': 'car_repair',
        'Gym/Fitness': 'gym',
        'Travel Agency': 'travel_agency',
        'Computer Service': 'electronics_store',
        'Photography Studio': 'store'
      };
      return typeMapping[businessType] || 'establishment';
    };

    const placeType = getPlaceType(businessType);
    const radiusInMeters = (radius || 5) * 1000; // Convert km to meters

    // Google Places Nearby Search API
    const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radiusInMeters}&type=${placeType}&key=${process.env.GOOGLE_PLACES_API_KEY}`;

    const placesResponse = await fetch(placesUrl);
    const placesData = await placesResponse.json();

    if (placesData.status !== 'OK' && placesData.status !== 'ZERO_RESULTS') {
      console.error('Google Places API error:', placesData);
      return NextResponse.json({ error: 'Failed to fetch places data' }, { status: 500 });
    }

    // Process and enhance the results
    const competitors = await Promise.all(
      placesData.results.slice(0, 10).map(async (place: any) => {
        // Get additional details for each place
        let placeDetails = null;
        if (place.place_id) {
          try {
            const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,rating,formatted_phone_number,website,formatted_address,business_status,opening_hours,price_level,user_ratings_total&key=${process.env.GOOGLE_PLACES_API_KEY}`;
            const detailsResponse = await fetch(detailsUrl);
            const detailsData = await detailsResponse.json();
            
            if (detailsData.status === 'OK') {
              placeDetails = detailsData.result;
            }
          } catch (error) {
            console.error('Error fetching place details:', error);
          }
        }

        // Calculate distance
        const distance = calculateDistance(
          latitude,
          longitude,
          place.geometry.location.lat,
          place.geometry.location.lng
        );

        // Generate insights based on available data
        const insights = generateBusinessInsights(place, placeDetails);

        return {
          id: place.place_id || place.reference,
          name: place.name,
          type: businessType,
          address: placeDetails?.formatted_address || place.vicinity,
          distance: Math.round(distance * 100) / 100,
          rating: place.rating || 0,
          phone: placeDetails?.formatted_phone_number,
          website: placeDetails?.website,
          estimatedRevenue: estimateRevenue(place, placeDetails),
          strengths: insights.strengths,
          weaknesses: insights.weaknesses,
          pricing: getPricingLevel(placeDetails?.price_level),
          popularity: getPopularityLevel(place.rating, placeDetails?.user_ratings_total),
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng,
          isOpen: getOpenStatus(placeDetails?.opening_hours),
          userRatingsTotal: placeDetails?.user_ratings_total || 0,
          photos: place.photos ? place.photos.slice(0, 3).map((photo: any) => 
            `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${process.env.GOOGLE_PLACES_API_KEY}`
          ) : []
        };
      })
    );

    return NextResponse.json({ competitors: competitors.filter(c => c.distance > 0) });
  } catch (error) {
    console.error('Error in places API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Helper functions
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in kilometers
  return d;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

function generateBusinessInsights(place: any, details: any) {
  const strengths = [];
  const weaknesses = [];
  
  if (place.rating >= 4.0) strengths.push("High customer satisfaction");
  if (place.rating < 3.0) weaknesses.push("Low customer ratings");
  
  if (details?.user_ratings_total > 100) strengths.push("Strong online presence");
  if (details?.user_ratings_total < 20) weaknesses.push("Limited customer reviews");
  
  if (details?.website) strengths.push("Professional online presence");
  if (!details?.website) weaknesses.push("No website presence");
  
  if (details?.price_level >= 3) strengths.push("Premium positioning");
  if (details?.price_level <= 1) strengths.push("Budget-friendly pricing");
  
  return { strengths, weaknesses };
}

function estimateRevenue(place: any, details: any): string {
  // Basic revenue estimation based on ratings, reviews, and price level
  const rating = place.rating || 0;
  const reviewCount = details?.user_ratings_total || 0;
  const priceLevel = details?.price_level || 1;
  
  const baseRevenue = priceLevel * 50000; // Base monthly revenue
  const ratingMultiplier = rating / 5;
  const reviewMultiplier = Math.min(reviewCount / 100, 2);
  
  const estimated = baseRevenue * ratingMultiplier * (1 + reviewMultiplier);
  
  if (estimated < 50000) return "₹25K - 50K/month";
  if (estimated < 100000) return "₹50K - 1L/month";
  if (estimated < 300000) return "₹1L - 3L/month";
  if (estimated < 500000) return "₹3L - 5L/month";
  return "₹5L+/month";
}

function getPricingLevel(priceLevel?: number): string {
  if (!priceLevel) return "Moderate";
  
  switch (priceLevel) {
    case 1: return "Budget-friendly";
    case 2: return "Moderate";
    case 3: return "Expensive";
    case 4: return "Premium";
    default: return "Moderate";
  }
}

function getPopularityLevel(rating?: number, reviewCount?: number): 'High' | 'Medium' | 'Low' {
  const ratingScore = (rating || 0) / 5;
  const reviewScore = Math.min((reviewCount || 0) / 100, 1);
  const popularityScore = (ratingScore + reviewScore) / 2;
  
  if (popularityScore >= 0.7) return 'High';
  if (popularityScore >= 0.4) return 'Medium';
  return 'Low';
}

function getOpenStatus(openingHours?: any): boolean {
  if (!openingHours || !openingHours.open_now) return false;
  return openingHours.open_now;
}
