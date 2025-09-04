import React, { useState, useEffect } from 'react';
import { useLanguage } from '../App';
import { mockData } from '../data/mockData';

const FarmerDashboard = ({ user }) => {
  const { t, currentLanguage } = useLanguage();
  const [recommendations, setRecommendations] = useState([]);
  const [alerts, setAlerts] = useState([]);

  const translations = {
    en: {
      welcome: "Welcome back",
      todaysRecommendations: "Today's Recommendations",
      alerts: "Important Alerts",
      soilHealth: "Soil Health Status",
      cropCalendar: "Crop Calendar",
      quickActions: "Quick Actions",
      viewDetails: "View Details",
      noAlerts: "No alerts today",
      goodSoilHealth: "Good soil health detected",
      plantingSeason: "Planting season for",
      harvestTime: "Harvest time for",
      fertilizeNow: "Time to fertilize",
      irrigationNeeded: "Irrigation needed",
      pestAlert: "Pest alert in your area"
    },
    hi: {
      welcome: "वापसी पर स्वागत है",
      todaysRecommendations: "आज की सिफारिशें",
      alerts: "महत्वपूर्ण अलर्ट",
      soilHealth: "मिट्टी स्वास्थ्य स्थिति",
      cropCalendar: "फसल कैलेंडर",
      quickActions: "त्वरित कार्य",
      viewDetails: "विवरण देखें",
      noAlerts: "आज कोई अलर्ट नहीं",
      goodSoilHealth: "अच्छा मिट्टी स्वास्थ्य मिला",
      plantingSeason: "के लिए बुवाई का मौसम",
      harvestTime: "के लिए कटाई का समय",
      fertilizeNow: "उर्वरक डालने का समय",
      irrigationNeeded: "सिंचाई की आवश्यकता",
      pestAlert: "आपके क्षेत्र में कीट अलर्ट"
    }
  };

  const currentT = translations[currentLanguage] || translations.en;

  useEffect(() => {
    // Generate personalized recommendations based on user data
    const userRecommendations = mockData.cropRecommendations
      .filter(rec => 
        user.mainCrops.some(crop => rec.crop.includes(crop)) ||
        rec.region === user.state
      )
      .slice(0, 3);
    
    setRecommendations(userRecommendations);

    // Generate alerts
    const currentAlerts = mockData.alerts
      .filter(alert => alert.region === user.state || alert.region === 'All')
      .slice(0, 2);
    
    setAlerts(currentAlerts);
  }, [user]);

  const quickActions = [
    { icon: '🐛', label: 'Pest Detection', action: 'pestDetection', color: 'bg-red-100 text-red-700' },
    { icon: '💰', label: 'Market Prices', action: 'marketPrices', color: 'bg-blue-100 text-blue-700' },
    { icon: '🌤️', label: 'Weather', action: 'weather', color: 'bg-yellow-100 text-yellow-700' },
    { icon: '🎤', label: 'Voice Help', action: 'voice', color: 'bg-purple-100 text-purple-700' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-xl">
        <h1 className="text-2xl font-bold mb-2">
          {currentT.welcome}, {user.name}! 🌾
        </h1>
        <p className="text-lg opacity-90">
          {user.village}, {user.district}, {user.state}
        </p>
        <div className="mt-4 flex items-center space-x-4 text-sm">
          <span>🏡 {user.landSize} acres</span>
          <span>🌱 {user.mainCrops.join(', ')}</span>
          <span>🌍 {user.soilType}</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">{currentT.quickActions}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className={`${action.color} p-6 rounded-xl text-center hover:shadow-lg transition-all`}
            >
              <div className="text-3xl mb-2">{action.icon}</div>
              <div className="font-medium">{action.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">{currentT.alerts}</h2>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 ${
                  alert.priority === 'high' 
                    ? 'bg-red-50 border-red-500 text-red-800'
                    : alert.priority === 'medium'
                    ? 'bg-yellow-50 border-yellow-500 text-yellow-800'
                    : 'bg-blue-50 border-blue-500 text-blue-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg">{alert.title}</h3>
                    <p className="mt-1">{alert.message}</p>
                  </div>
                  <div className="text-2xl">{alert.icon}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Today's Recommendations */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">{currentT.todaysRecommendations}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.map((rec, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-lg text-green-700">{rec.crop}</h3>
                <span className="text-2xl">{rec.icon}</span>
              </div>
              <p className="text-gray-600 mb-4">{rec.recommendation}</p>
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  rec.priority === 'high' 
                    ? 'bg-red-100 text-red-700'
                    : rec.priority === 'medium'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-green-100 text-green-700'
                }`}>
                  {rec.priority} priority
                </span>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  {currentT.viewDetails} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Soil Health Status */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{currentT.soilHealth}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl mb-2">🌱</div>
            <div className="font-bold text-green-700">pH Level</div>
            <div className="text-2xl font-bold text-green-600">6.8</div>
            <div className="text-sm text-green-600">Optimal</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl mb-2">💧</div>
            <div className="font-bold text-blue-700">Moisture</div>
            <div className="text-2xl font-bold text-blue-600">65%</div>
            <div className="text-sm text-blue-600">Good</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-3xl mb-2">🧪</div>
            <div className="font-bold text-yellow-700">Nutrients</div>
            <div className="text-2xl font-bold text-yellow-600">NPK</div>
            <div className="text-sm text-yellow-600">Balanced</div>
          </div>
        </div>
      </div>

      {/* Crop Calendar */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{currentT.cropCalendar}</h2>
        <div className="space-y-3">
          {user.mainCrops.slice(0, 3).map((crop, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🌾</span>
                <div>
                  <div className="font-bold text-gray-800">{crop}</div>
                  <div className="text-sm text-gray-600">Next activity in 3 days</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-green-600">Fertilization</div>
                <div className="text-sm text-gray-500">Oct 15, 2024</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;