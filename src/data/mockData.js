// Mock data for Maya Webb
export const user = {
  id: "maya",
  name: "Maya Webb",
  homeCity: "Asheville",
  preferences: ["Walkable", "Good schools", "Safe at night", "Near parks", "Local culture"],
  budget: { min: 350000, max: 450000 },
  commute: 30
};

export const neighborhoods = [
  {
    id: "west-asheville",
    name: "West Asheville",
    city: "Asheville",
    description: "Vibrant neighborhood with local shops, restaurants, and community feel",
    walkability: 85,
    safety: 92,
    schools: 88,
    commute: 15,
    tags: ["Walkable", "Local culture", "Near parks"],
    stories: [
      {
        id: 1,
        author: "Sarah M.",
        text: "Love the local coffee shops and farmers market on Saturday mornings!",
        verified: true,
        timestamp: "2 days ago"
      }
    ]
  },
  {
    id: "downtown-asheville",
    name: "Downtown Asheville",
    city: "Asheville",
    description: "Historic downtown with arts scene, restaurants, and nightlife",
    walkability: 95,
    safety: 85,
    schools: 75,
    commute: 5,
    tags: ["Walkable", "Local culture", "Nightlife"],
    stories: [
      {
        id: 2,
        author: "Mike R.",
        text: "Perfect for walking to everything - restaurants, shops, and entertainment!",
        verified: true,
        timestamp: "1 week ago"
      }
    ]
  }
];

export const properties = [
  {
    id: 1,
    neighborhoodId: "west-asheville",
    price: 385000,
    beds: 3,
    baths: 2,
    sqft: 1800,
    address: "123 Maple Street",
    description: "Charming craftsman home with original hardwood floors",
    tags: ["Updated kitchen", "Hardwood floors", "Garden"],
    nearby: ["Coffee shop (0.2 mi)", "Park (0.3 mi)", "School (0.5 mi)"]
  },
  {
    id: 2,
    neighborhoodId: "downtown-asheville",
    price: 425000,
    beds: 2,
    baths: 2,
    sqft: 1400,
    address: "456 Oak Avenue",
    description: "Modern loft with city views and rooftop access",
    tags: ["Modern", "City views", "Rooftop"],
    nearby: ["Restaurants (0.1 mi)", "Transit (0.2 mi)", "Shopping (0.3 mi)"]
  },
  {
    id: 3,
    neighborhoodId: "west-asheville",
    price: 520000,
    beds: 4,
    baths: 3,
    sqft: 2200,
    address: "789 Pine Ridge",
    description: "Spacious family home with large backyard",
    tags: ["Family home", "Large yard", "Updated"],
    nearby: ["School (0.3 mi)", "Park (0.4 mi)", "Shopping (0.6 mi)"]
  },
  {
    id: 4,
    neighborhoodId: "downtown-asheville",
    price: 650000,
    beds: 3,
    baths: 2,
    sqft: 1600,
    address: "321 Main Street",
    description: "Historic downtown loft with exposed brick",
    tags: ["Historic", "Exposed brick", "Downtown"],
    nearby: ["Restaurants (0.1 mi)", "Transit (0.2 mi)", "Entertainment (0.3 mi)"]
  }
];

// Match percentages based on Maya's preferences
export const featuredMatchPercentages = [92, 87, 89, 85];
export const newListingMatchPercentages = [88, 91, 86, 83];

export const reviews = [
  {
    id: 1,
    propertyId: 1,
    author: "Local Resident",
    rating: 5,
    text: "Great neighborhood with friendly neighbors and lots of character",
    timestamp: "1 week ago"
  },
  {
    id: 2,
    propertyId: 1,
    author: "Recent Buyer",
    rating: 4,
    text: "Love the walkability and local businesses nearby",
    timestamp: "2 weeks ago"
  }
];

export const communityPosts = [
  {
    id: 1,
    text: "My new favorite food hall is at Woodland Market. Such great quality!",
    author: {
      name: "Haley K",
      title: "Local"
    },
    comments: 32,
    likes: 86,
    image: "food_hall.jpg"
  },
  {
    id: 2,
    text: "The farmers market on Saturday mornings is incredible. Fresh local produce and amazing community vibes!",
    author: {
      name: "Marcus R",
      title: "Verified Realtor"
    },
    comments: 18,
    likes: 42,
    image: "farmers_market.jpg"
  },
  {
    id: 3,
    text: "Just discovered this amazing coffee shop around the corner. Perfect for remote work!",
    author: {
      name: "Sarah M",
      title: "Local"
    },
    comments: 24,
    likes: 67,
    image: "coffee_shop.jpg"
  },
  {
    id: 4,
    text: "The park here has the best sunset views. Perfect for evening walks with the dog.",
    author: {
      name: "David L",
      title: "Long-time Resident"
    },
    comments: 15,
    likes: 38,
    image: "park_sunset.jpg"
  },
  {
    id: 5,
    text: "Found the cutest vintage bookstore today. Hidden gem in the neighborhood!",
    author: {
      name: "Emma W",
      title: "Local Business Owner"
    },
    comments: 29,
    likes: 54,
    image: "bookstore.jpg"
  }
];
