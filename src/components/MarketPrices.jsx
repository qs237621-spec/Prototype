import React, { useState, useEffect } from 'react';
import { useLanguage } from '../App';
import { mockData } from '../data/mockData';

const MarketPrices = ({ user }) => {
  const { t, currentLanguage } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState('all');
  const [priceData, setPriceData] = useState([]);

  const translations = {
    en: {
      title: "Market Prices",
      subtitle: "Real-time crop prices in your area",
      filterByCrop: "Filter by Crop",
      allCrops: "All Crops",
      pricePerQuintal: "Price per Quintal (₹)",
      yesterdayPrice: "Yesterday",
      change: "Change",
      marketTrend: "Market Trend",
      bestSellingTime: "Best Selling Time",
      nearbyMarkets: "Nearby Markets",
      priceAlerts: "Price Alerts",
      setAlert: "Set Alert",
      high: "High",
      low: "Low",
      stable: "Stable"
    },
    hi: {
      title: "बाजार भाव",
      subtitle: "आपके क्षेत्र में वास्तविक समय फसल की कीमतें",
      filterByCrop: "फसल के अनुसार छांटें",
      allCrops: "सभी फसलें",
      pricePerQuintal: "प्रति क्विंटल मूल्य (₹)",
      yesterdayPrice: "कल",
      change: "परिवर्तन",
      marketTrend: "बाजार रुझान",
      bestSellingTime: "सबसे अच्छा बेचने का समय",
      nearbyMarkets: "नजदीकी बाजार",
      priceAlerts: "मूल्य अलर्ट",
      setAlert: "अलर्ट सेट करें",
      high: "उच्च",
      low: "निम्न",
      stable: "स्थिर"
    }
  };

  const currentT = translations[currentLanguage] || translations.en;

  useEffect(() => {
    // Filter prices based on user's crops and location
    let filteredPrices = mockData.marketPrices.filter(price => 
      price.region === user.state || price.region === 'All India'
    );

    if (selectedCrop !== 'all') {
      filteredPrices = filteredPrices.filter(price => 
        price.crop.toLowerCase().includes(selectedCrop.toLowerCase())
      );
    }

    setPriceData(filteredPrices);
  }, [selectedCrop, user.state]);

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      default: return '➡️';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{currentT.title}</h1>
        <p className="text-lg text-gray-600">{currentT.subtitle}</p>
        <div className="text-6xl my-4">💰📊</div>
      </div>

      {/* Filter */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <label className="block text-lg font-medium text-gray-700 mb-2">
          {currentT.filterByCrop}
        </label>
        <select
          value={selectedCrop}
          onChange={(e) => setSelectedCrop(e.target.value)}
          className="w-full p-3 text-lg border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
        >
          <option value="all">{currentT.allCrops}</option>
          {user.mainCrops.map(crop => (
            <option key={crop} value={crop}>{crop}</option>
          ))}
        </select>
      </div>

      {/* Price Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {priceData.map((price, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">{price.crop}</h3>
              <span className="text-3xl">{price.icon}</span>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="text-sm text-gray-600">{currentT.pricePerQuintal}</div>
                <div className="text-2xl font-bold text-green-600">₹{price.currentPrice}</div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">{currentT.yesterdayPrice}</div>
                  <div className="text-lg">₹{price.previousPrice}</div>
                </div>
                <div className={`flex items-center space-x-1 ${getTrendColor(price.trend)}`}>
                  <span>{getTrendIcon(price.trend)}</span>
                  <span className="font-bold">₹{Math.abs(price.currentPrice - price.previousPrice)}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Market: {price.market}</span>
                  <button className="text-blue-600 hover:text-blue-800 font-medium">
                    {currentT.setAlert}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Market Trend Analysis */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{currentT.marketTrend}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl mb-2">📈</div>
            <div className="font-bold text-green-700">Rising Prices</div>
            <div className="text-sm text-green-600">Cotton, Wheat</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-3xl mb-2">📉</div>
            <div className="font-bold text-red-700">Falling Prices</div>
            <div className="text-sm text-red-600">Rice, Sugarcane</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl mb-2">➡️</div>
            <div className="font-bold text-gray-700">Stable Prices</div>
            <div className="text-sm text-gray-600">Maize, Soybean</div>
          </div>
        </div>
      </div>

      {/* Nearby Markets */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{currentT.nearbyMarkets}</h2>
        <div className="space-y-3">
          {mockData.nearbyMarkets
            .filter(market => market.state === user.state)
            .slice(0, 4)
            .map((market, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🏪</span>
                  <div>
                    <div className="font-bold text-gray-800">{market.name}</div>
                    <div className="text-sm text-gray-600">{market.distance} km away</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-green-600">{market.status}</div>
                  <div className="text-sm text-gray-500">{market.timing}</div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Best Selling Time Recommendations */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">{currentT.bestSellingTime}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {user.mainCrops.slice(0, 2).map((crop, index) => (
            <div key={index} className="bg-white bg-opacity-20 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold">{crop}</h3>
                <span className="text-2xl">⏰</span>
              </div>
              <p className="text-sm opacity-90">
                Best time to sell: Next week (Oct 20-25)
              </p>
              <p className="text-sm opacity-75">
                Expected price: ₹{Math.floor(Math.random() * 1000 + 2000)}/quintal
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketPrices;