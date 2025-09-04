export const mockData = {
  // Crop recommendations based on region and season
  cropRecommendations: [
    {
      crop: "Rice",
      icon: "🌾",
      region: "Maharashtra",
      recommendation: "Apply 120 kg/ha of NPK fertilizer. Monitor water levels carefully during monsoon season.",
      priority: "high",
      season: "Kharif"
    },
    {
      crop: "Cotton",
      icon: "🌱",
      region: "Gujarat",
      recommendation: "Use drip irrigation system. Apply organic manure before planting for better yield.",
      priority: "medium",
      season: "Kharif"
    },
    {
      crop: "Wheat",
      icon: "🌾",
      region: "Punjab",
      recommendation: "Sow seeds at 2-3 cm depth. Apply urea in split doses for optimal growth.",
      priority: "high",
      season: "Rabi"
    },
    {
      crop: "Sugarcane",
      icon: "🎋",
      region: "Uttar Pradesh",
      recommendation: "Maintain soil moisture at 70-80%. Apply potash fertilizer during growth phase.",
      priority: "medium",
      season: "Annual"
    },
    {
      crop: "Maize",
      icon: "🌽",
      region: "Karnataka",
      recommendation: "Plant during pre-monsoon. Use hybrid seeds for better disease resistance.",
      priority: "low",
      season: "Kharif"
    }
  ],

  // Common pests and diseases
  commonPests: [
    {
      name: "Brown Planthopper",
      icon: "🐛",
      description: "Small brown insects that suck plant juices, causing yellowing and stunted growth.",
      affectedCrops: ["Rice", "Wheat"],
      treatment: "Spray neem oil solution or use imidacloprid-based insecticides.",
      prevention: "Maintain proper plant spacing and avoid excessive nitrogen fertilization.",
      confidence: 92
    },
    {
      name: "Bollworm",
      icon: "🐛",
      description: "Caterpillars that bore into cotton bolls, causing significant yield loss.",
      affectedCrops: ["Cotton", "Tomato"],
      treatment: "Use Bt cotton varieties or spray with Bacillus thuringiensis.",
      prevention: "Regular monitoring and pheromone traps for early detection.",
      confidence: 88
    },
    {
      name: "Stem Borer",
      icon: "🐛",
      description: "Larvae bore into plant stems, causing dead hearts and white ears.",
      affectedCrops: ["Rice", "Maize", "Sugarcane"],
      treatment: "Apply carbofuran granules or use biological control with Trichogramma.",
      prevention: "Remove crop residues and maintain field hygiene.",
      confidence: 85
    },
    {
      name: "Aphids",
      icon: "🐛",
      description: "Small green insects that cluster on leaves and stems, transmitting viruses.",
      affectedCrops: ["Wheat", "Mustard", "Pea"],
      treatment: "Spray with soap solution or use systemic insecticides like dimethoate.",
      prevention: "Encourage natural predators like ladybirds and lacewings.",
      confidence: 90
    },
    {
      name: "Leaf Spot",
      icon: "🍃",
      description: "Fungal disease causing circular spots on leaves, leading to defoliation.",
      affectedCrops: ["Rice", "Cotton", "Groundnut"],
      treatment: "Apply copper-based fungicides or mancozeb spray.",
      prevention: "Ensure proper drainage and avoid overhead irrigation.",
      confidence: 87
    },
    {
      name: "Powdery Mildew",
      icon: "🍃",
      description: "White powdery fungal growth on leaves, reducing photosynthesis.",
      affectedCrops: ["Wheat", "Pea", "Grape"],
      treatment: "Spray with sulfur-based fungicides or potassium bicarbonate solution.",
      prevention: "Maintain proper air circulation and avoid overcrowding.",
      confidence: 89
    }
  ],

  // Market prices for different crops
  marketPrices: [
    {
      crop: "Rice",
      icon: "🌾",
      currentPrice: 1850,
      previousPrice: 1820,
      trend: "up",
      market: "Nashik APMC",
      region: "Maharashtra"
    },
    {
      crop: "Wheat",
      icon: "🌾",
      currentPrice: 2150,
      previousPrice: 2180,
      trend: "down",
      market: "Ludhiana Mandi",
      region: "Punjab"
    },
    {
      crop: "Cotton",
      icon: "🌱",
      currentPrice: 5200,
      previousPrice: 5150,
      trend: "up",
      market: "Ahmedabad Cotton Market",
      region: "Gujarat"
    },
    {
      crop: "Sugarcane",
      icon: "🎋",
      currentPrice: 320,
      previousPrice: 325,
      trend: "down",
      market: "Muzaffarnagar Sugar Mill",
      region: "Uttar Pradesh"
    },
    {
      crop: "Maize",
      icon: "🌽",
      currentPrice: 1680,
      previousPrice: 1680,
      trend: "stable",
      market: "Bangalore APMC",
      region: "Karnataka"
    },
    {
      crop: "Soybean",
      icon: "🫘",
      currentPrice: 4200,
      previousPrice: 4150,
      trend: "up",
      market: "Indore Mandi",
      region: "Madhya Pradesh"
    }
  ],

  // Weather data for different states
  weatherData: [
    {
      location: "Maharashtra",
      current: {
        temperature: 28,
        humidity: 65,
        rainfall: 2.5,
        windSpeed: 12,
        condition: "partly_cloudy",
        farmingAdvice: "Good conditions for rice transplanting. Monitor soil moisture levels."
      },
      forecast: [
        { day: "Today", high: 28, low: 22, condition: "partly_cloudy", rainfall: 2.5 },
        { day: "Tomorrow", high: 30, low: 23, condition: "sunny", rainfall: 0 },
        { day: "Thu", high: 29, low: 24, condition: "cloudy", rainfall: 5.2 },
        { day: "Fri", high: 27, low: 21, condition: "rainy", rainfall: 15.8 },
        { day: "Sat", high: 26, low: 20, condition: "rainy", rainfall: 12.3 },
        { day: "Sun", high: 28, low: 22, condition: "partly_cloudy", rainfall: 3.1 },
        { day: "Mon", high: 31, low: 25, condition: "sunny", rainfall: 0 }
      ],
      alerts: ["Heavy rainfall expected on Friday", "Monitor for pest outbreaks due to humidity"]
    },
    {
      location: "Punjab",
      current: {
        temperature: 32,
        humidity: 45,
        rainfall: 0,
        windSpeed: 8,
        condition: "sunny",
        farmingAdvice: "Consider irrigation for wheat crops. Good weather for harvesting."
      },
      forecast: [
        { day: "Today", high: 32, low: 18, condition: "sunny", rainfall: 0 },
        { day: "Tomorrow", high: 34, low: 19, condition: "sunny", rainfall: 0 },
        { day: "Thu", high: 33, low: 20, condition: "partly_cloudy", rainfall: 0 },
        { day: "Fri", high: 31, low: 17, condition: "cloudy", rainfall: 2.1 },
        { day: "Sat", high: 29, low: 16, condition: "partly_cloudy", rainfall: 0 },
        { day: "Sun", high: 30, low: 18, condition: "sunny", rainfall: 0 },
        { day: "Mon", high: 33, low: 20, condition: "sunny", rainfall: 0 }
      ],
      alerts: []
    }
  ],

  // Nearby markets information
  nearbyMarkets: [
    {
      name: "Nashik APMC",
      distance: 15,
      status: "Open",
      timing: "6 AM - 6 PM",
      state: "Maharashtra"
    },
    {
      name: "Pune Vegetable Market",
      distance: 45,
      status: "Open",
      timing: "5 AM - 8 PM",
      state: "Maharashtra"
    },
    {
      name: "Ludhiana Grain Mandi",
      distance: 8,
      status: "Open",
      timing: "7 AM - 5 PM",
      state: "Punjab"
    },
    {
      name: "Ahmedabad Cotton Exchange",
      distance: 25,
      status: "Closed",
      timing: "9 AM - 4 PM",
      state: "Gujarat"
    }
  ],

  // System alerts for farmers
  alerts: [
    {
      title: "Pest Alert",
      message: "Brown planthopper outbreak reported in nearby areas. Monitor your rice fields closely.",
      priority: "high",
      region: "Maharashtra",
      icon: "🚨"
    },
    {
      title: "Weather Warning",
      message: "Heavy rainfall expected in the next 48 hours. Secure your crops and equipment.",
      priority: "high",
      region: "All",
      icon: "⛈️"
    },
    {
      title: "Market Update",
      message: "Cotton prices have increased by 5% this week. Good time to sell your produce.",
      priority: "medium",
      region: "Gujarat",
      icon: "📈"
    },
    {
      title: "Fertilizer Reminder",
      message: "Time for second dose of urea application for wheat crops.",
      priority: "low",
      region: "Punjab",
      icon: "🧪"
    }
  ]
};