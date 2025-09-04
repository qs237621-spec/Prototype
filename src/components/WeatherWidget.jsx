import React, { useState, useEffect } from 'react';
import { useLanguage } from '../App';
import { mockData } from '../data/mockData';

const WeatherWidget = ({ user }) => {
  const { t, currentLanguage } = useLanguage();
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [alerts, setAlerts] = useState([]);

  const translations = {
    en: {
      title: "Weather Forecast",
      subtitle: "Weather updates for your location",
      currentWeather: "Current Weather",
      weeklyForecast: "7-Day Forecast",
      weatherAlerts: "Weather Alerts",
      temperature: "Temperature",
      humidity: "Humidity",
      rainfall: "Rainfall",
      windSpeed: "Wind Speed",
      soilMoisture: "Soil Moisture",
      farmingAdvice: "Farming Advice",
      noAlerts: "No weather alerts",
      goodForFarming: "Good conditions for farming",
      irrigationNeeded: "Consider irrigation",
      postponeActivities: "Postpone outdoor activities"
    },
    hi: {
      title: "मौसम पूर्वानुमान",
      subtitle: "आपके स्थान के लिए मौसम अपडेट",
      currentWeather: "वर्तमान मौसम",
      weeklyForecast: "7-दिन का पूर्वानुमान",
      weatherAlerts: "मौसम चेतावनी",
      temperature: "तापमान",
      humidity: "नमी",
      rainfall: "वर्षा",
      windSpeed: "हवा की गति",
      soilMoisture: "मिट्टी की नमी",
      farmingAdvice: "कृषि सलाह",
      noAlerts: "कोई मौसम चेतावनी नहीं",
      goodForFarming: "खेती के लिए अच्छी स्थिति",
      irrigationNeeded: "सिंचाई पर विचार करें",
      postponeActivities: "बाहरी गतिविधियों को स्थगित करें"
    }
  };

  const currentT = translations[currentLanguage] || translations.en;

  useEffect(() => {
    // Get weather data for user's location
    const weatherData = mockData.weatherData.find(w => w.location === user.state) || mockData.weatherData[0];
    setCurrentWeather(weatherData.current);
    setForecast(weatherData.forecast);
    setAlerts(weatherData.alerts || []);
  }, [user.state]);

  const getWeatherIcon = (condition) => {
    const icons = {
      sunny: '☀️',
      cloudy: '☁️',
      rainy: '🌧️',
      stormy: '⛈️',
      partly_cloudy: '⛅',
      clear: '🌙'
    };
    return icons[condition] || '🌤️';
  };

  const getAdviceColor = (advice) => {
    if (advice.includes('Good') || advice.includes('अच्छी')) return 'bg-green-50 text-green-700 border-green-200';
    if (advice.includes('Consider') || advice.includes('विचार')) return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    return 'bg-red-50 text-red-700 border-red-200';
  };

  if (!currentWeather) {
    return <div className="text-center py-12">Loading weather data...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{currentT.title}</h1>
        <p className="text-lg text-gray-600">{currentT.subtitle}</p>
        <p className="text-md text-gray-500">{user.village}, {user.district}, {user.state}</p>
        <div className="text-6xl my-4">🌤️🌾</div>
      </div>

      {/* Weather Alerts */}
      {alerts.length > 0 && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-xl">
          <h2 className="text-lg font-bold text-red-800 mb-2">⚠️ {currentT.weatherAlerts}</h2>
          {alerts.map((alert, index) => (
            <div key={index} className="text-red-700 mb-1">
              • {alert}
            </div>
          ))}
        </div>
      )}

      {/* Current Weather */}
      <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">{currentT.currentWeather}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-4xl mb-2">{getWeatherIcon(currentWeather.condition)}</div>
            <div className="text-2xl font-bold">{currentWeather.temperature}°C</div>
            <div className="text-sm opacity-75">{currentT.temperature}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">💧</div>
            <div className="text-2xl font-bold">{currentWeather.humidity}%</div>
            <div className="text-sm opacity-75">{currentT.humidity}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">🌧️</div>
            <div className="text-2xl font-bold">{currentWeather.rainfall}mm</div>
            <div className="text-sm opacity-75">{currentT.rainfall}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">💨</div>
            <div className="text-2xl font-bold">{currentWeather.windSpeed} km/h</div>
            <div className="text-sm opacity-75">{currentT.windSpeed}</div>
          </div>
        </div>
      </div>

      {/* Farming Advice */}
      <div className={`p-4 rounded-xl border ${getAdviceColor(currentWeather.farmingAdvice)}`}>
        <h3 className="font-bold text-lg mb-2">🌱 {currentT.farmingAdvice}</h3>
        <p>{currentWeather.farmingAdvice}</p>
      </div>

      {/* 7-Day Forecast */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{currentT.weeklyForecast}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {forecast.map((day, index) => (
            <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium text-gray-600 mb-2">{day.day}</div>
              <div className="text-3xl mb-2">{getWeatherIcon(day.condition)}</div>
              <div className="font-bold text-gray-800">{day.high}°</div>
              <div className="text-sm text-gray-600">{day.low}°</div>
              <div className="text-xs text-blue-600 mt-1">{day.rainfall}mm</div>
            </div>
          ))}
        </div>
      </div>

      {/* Soil Conditions */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">🌱 Soil & Field Conditions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl mb-2">💧</div>
            <div className="font-bold text-blue-700">{currentT.soilMoisture}</div>
            <div className="text-2xl font-bold text-blue-600">68%</div>
            <div className="text-sm text-blue-600">Optimal</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl mb-2">🌡️</div>
            <div className="font-bold text-green-700">Soil Temperature</div>
            <div className="text-2xl font-bold text-green-600">24°C</div>
            <div className="text-sm text-green-600">Good</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-3xl mb-2">☀️</div>
            <div className="font-bold text-yellow-700">UV Index</div>
            <div className="text-2xl font-bold text-yellow-600">6</div>
            <div className="text-sm text-yellow-600">Moderate</div>
          </div>
        </div>
      </div>

      {/* Crop-Specific Weather Advice */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">🌾 Crop-Specific Weather Advice</h2>
        <div className="space-y-3">
          {user.mainCrops.slice(0, 3).map((crop, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🌾</span>
                <div>
                  <div className="font-bold text-gray-800">{crop}</div>
                  <div className="text-sm text-gray-600">
                    {index === 0 && "Good weather for growth - continue regular care"}
                    {index === 1 && "Monitor for pests due to humidity - spray if needed"}
                    {index === 2 && "Consider harvesting before expected rain"}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`font-medium ${index === 0 ? 'text-green-600' : index === 1 ? 'text-yellow-600' : 'text-blue-600'}`}>
                  {index === 0 ? '✅ Good' : index === 1 ? '⚠️ Monitor' : '🌧️ Plan'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;