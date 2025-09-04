import React, { useState, createContext, useContext } from 'react';
import FarmerDashboard from './components/FarmerDashboard';
import Registration from './components/Registration';
import PestDetection from './components/PestDetection';
import MarketPrices from './components/MarketPrices';
import WeatherWidget from './components/WeatherWidget';
import VoiceAssistant from './components/VoiceAssistant';

// Language Context
const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

// Translation data
const translations = {
  en: {
    appName: "Kisan Mitra - Farmer Assistant",
    dashboard: "Dashboard",
    pestDetection: "Pest Detection",
    marketPrices: "Market Prices",
    weather: "Weather",
    voice: "Voice Assistant",
    welcome: "Welcome to Kisan Mitra",
    logout: "Logout"
  },
  hi: {
    appName: "किसान मित्र - कृषक सहायक",
    dashboard: "डैशबोर्ड",
    pestDetection: "कीट पहचान",
    marketPrices: "बाजार भाव",
    weather: "मौसम",
    voice: "आवाज सहायक",
    welcome: "किसान मित्र में आपका स्वागत है",
    logout: "लॉग आउट"
  },
  ta: {
    appName: "கிசான் மித்ரா - விவசாயி உதவியாளர்",
    dashboard: "டாஷ்போர்டு",
    pestDetection: "பூச்சி கண்டறிதல்",
    marketPrices: "சந்தை விலைகள்",
    weather: "வானிலை",
    voice: "குரல் உதவியாளர்",
    welcome: "கிசான் மித்ராவிற்கு வரவேற்கிறோம்",
    logout: "வெளியேறு"
  },
  te: {
    appName: "కిసాన్ మిత్రా - రైతు సహాయకుడు",
    dashboard: "డాష్‌బోర్డ్",
    pestDetection: "కీటకాల గుర్తింపు",
    marketPrices: "మార్కెట్ ధరలు",
    weather: "వాతావరణం",
    voice: "వాయిస్ అసిస్టెంట్",
    welcome: "కిసాన్ మిత్రాకు స్వాగతం",
    logout: "లాగ్ అవుట్"
  }
};

function App() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentView, setCurrentView] = useState('registration');
  const [user, setUser] = useState(null);

  const t = translations[currentLanguage];

  const handleRegistration = (userData) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('registration');
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setCurrentLanguage, t }}>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        {/* Header */}
        {user && (
          <header className="bg-green-600 text-white p-4 shadow-lg">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
              <h1 className="text-xl font-bold">{t.appName}</h1>
              <div className="flex items-center space-x-4">
                {/* Language Selector */}
                <select
                  value={currentLanguage}
                  onChange={(e) => setCurrentLanguage(e.target.value)}
                  className="bg-green-700 text-white px-3 py-1 rounded border-none text-lg"
                >
                  <option value="en">English</option>
                  <option value="hi">हिंदी</option>
                  <option value="ta">தமிழ்</option>
                  <option value="te">తెలుగు</option>
                </select>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-lg"
                >
                  {t.logout}
                </button>
              </div>
            </div>
          </header>
        )}

        {/* Navigation */}
        {user && (
          <nav className="bg-white shadow-md p-2">
            <div className="max-w-6xl mx-auto flex justify-center space-x-2 overflow-x-auto">
              {[
                { key: 'dashboard', icon: '🏠', label: t.dashboard },
                { key: 'pestDetection', icon: '🐛', label: t.pestDetection },
                { key: 'marketPrices', icon: '💰', label: t.marketPrices },
                { key: 'weather', icon: '🌤️', label: t.weather },
                { key: 'voice', icon: '🎤', label: t.voice }
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => setCurrentView(item.key)}
                  className={`flex flex-col items-center p-3 rounded-lg min-w-[100px] text-lg ${
                    currentView === item.key
                      ? 'bg-green-100 text-green-700 border-2 border-green-300'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-2xl mb-1">{item.icon}</span>
                  <span className="text-sm font-medium text-center">{item.label}</span>
                </button>
              ))}
            </div>
          </nav>
        )}

        {/* Main Content */}
        <main className="max-w-6xl mx-auto p-4">
          {currentView === 'registration' && (
            <Registration onRegister={handleRegistration} />
          )}
          {currentView === 'dashboard' && user && (
            <FarmerDashboard user={user} />
          )}
          {currentView === 'pestDetection' && user && (
            <PestDetection user={user} />
          )}
          {currentView === 'marketPrices' && user && (
            <MarketPrices user={user} />
          )}
          {currentView === 'weather' && user && (
            <WeatherWidget user={user} />
          )}
          {currentView === 'voice' && user && (
            <VoiceAssistant user={user} />
          )}
        </main>
      </div>
    </LanguageContext.Provider>
  );
}

export default App;