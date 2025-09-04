import React, { useState } from 'react';
import { useLanguage } from '../App';

const VoiceAssistant = ({ user }) => {
  const { t, currentLanguage } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [conversationHistory, setConversationHistory] = useState([]);

  const translations = {
    en: {
      title: "Voice Assistant",
      subtitle: "Ask questions about farming in your language",
      startListening: "Start Speaking",
      stopListening: "Stop Speaking",
      listening: "Listening...",
      askQuestion: "Ask a Question",
      commonQuestions: "Common Questions",
      clearHistory: "Clear History",
      noHistory: "No conversation history yet",
      sampleQuestions: [
        "What fertilizer should I use for rice?",
        "When is the best time to plant cotton?",
        "How to control pests in my wheat crop?",
        "What are today's market prices?",
        "Will it rain tomorrow?"
      ]
    },
    hi: {
      title: "आवाज सहायक",
      subtitle: "अपनी भाषा में खेती के बारे में सवाल पूछें",
      startListening: "बोलना शुरू करें",
      stopListening: "बोलना बंद करें",
      listening: "सुन रहे हैं...",
      askQuestion: "सवाल पूछें",
      commonQuestions: "आम सवाल",
      clearHistory: "इतिहास साफ़ करें",
      noHistory: "अभी तक कोई बातचीत का इतिहास नहीं",
      sampleQuestions: [
        "चावल के लिए कौन सा उर्वरक इस्तेमाल करूं?",
        "कपास बोने का सबसे अच्छा समय कब है?",
        "गेहूं की फसल में कीटों को कैसे नियंत्रित करें?",
        "आज के बाजार भाव क्या हैं?",
        "कल बारिश होगी?"
      ]
    }
  };

  const currentT = translations[currentLanguage] || translations.en;

  const sampleResponses = {
    en: {
      fertilizer: "For rice cultivation, use NPK fertilizer (10:26:26) at planting and urea after 3-4 weeks. Apply organic compost for better soil health.",
      planting: "Cotton should be planted between April-May in most regions. Ensure soil temperature is above 18°C for optimal germination.",
      pests: "For wheat pest control, spray neem oil solution early morning. Monitor for aphids and use appropriate insecticides if needed.",
      prices: "Current wheat prices in your area: ₹2,150/quintal. Rice: ₹1,850/quintal. Prices are stable this week.",
      weather: "Tomorrow's forecast shows partly cloudy weather with 20% chance of light rain. Good for most farming activities."
    },
    hi: {
      fertilizer: "चावल की खेती के लिए, बुवाई के समय NPK उर्वरक (10:26:26) और 3-4 सप्ताह बाद यूरिया का उपयोग करें। मिट्टी के स्वास्थ्य के लिए जैविक खाद डालें।",
      planting: "कपास की बुवाई अप्रैल-मई के बीच करनी चाहिए। अंकुरण के लिए मिट्टी का तापमान 18°C से ऊपर होना चाहिए।",
      pests: "गेहूं में कीट नियंत्रण के लिए, सुबह जल्दी नीम का तेल छिड़कें। माहू के लिए निगरानी करें और जरूरत पड़ने पर उपयुक्त कीटनाशक का उपयोग करें।",
      prices: "आपके क्षेत्र में वर्तमान गेहूं की कीमत: ₹2,150/क्विंटल। चावल: ₹1,850/क्विंटल। इस सप्ताह कीमतें स्थिर हैं।",
      weather: "कल का मौसम आंशिक रूप से बादल छाए रहने और हल्की बारिश की 20% संभावना दिखाता है। अधिकांश कृषि गतिविधियों के लिए अच्छा है।"
    }
  };

  const handleVoiceInput = () => {
    if (isListening) {
      setIsListening(false);
      // Simulate voice recognition result
      const sampleQuestions = currentT.sampleQuestions;
      const randomQuestion = sampleQuestions[Math.floor(Math.random() * sampleQuestions.length)];
      setTranscript(randomQuestion);
      processVoiceCommand(randomQuestion);
    } else {
      setIsListening(true);
      setTranscript('');
      setResponse('');
      // Simulate listening for 3 seconds
      setTimeout(() => {
        setIsListening(false);
        const sampleQuestions = currentT.sampleQuestions;
        const randomQuestion = sampleQuestions[Math.floor(Math.random() * sampleQuestions.length)];
        setTranscript(randomQuestion);
        processVoiceCommand(randomQuestion);
      }, 3000);
    }
  };

  const processVoiceCommand = (command) => {
    const responses = sampleResponses[currentLanguage] || sampleResponses.en;
    let botResponse = '';

    if (command.toLowerCase().includes('fertilizer') || command.includes('उर्वरक')) {
      botResponse = responses.fertilizer;
    } else if (command.toLowerCase().includes('plant') || command.includes('बो')) {
      botResponse = responses.planting;
    } else if (command.toLowerCase().includes('pest') || command.includes('कीट')) {
      botResponse = responses.pests;
    } else if (command.toLowerCase().includes('price') || command.includes('भाव')) {
      botResponse = responses.prices;
    } else if (command.toLowerCase().includes('weather') || command.includes('मौसम')) {
      botResponse = responses.weather;
    } else {
      botResponse = currentLanguage === 'hi' 
        ? "मुझे खुशी होगी आपकी मदद करने में। कृपया अपना सवाल फिर से पूछें या आम सवालों में से चुनें।"
        : "I'd be happy to help you! Please rephrase your question or choose from common questions.";
    }

    setResponse(botResponse);
    
    // Add to conversation history
    const newConversation = {
      question: command,
      answer: botResponse,
      timestamp: new Date().toLocaleTimeString()
    };
    setConversationHistory(prev => [newConversation, ...prev]);
  };

  const clearHistory = () => {
    setConversationHistory([]);
    setTranscript('');
    setResponse('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{currentT.title}</h1>
        <p className="text-lg text-gray-600">{currentT.subtitle}</p>
        <div className="text-6xl my-4">🎤🌾</div>
      </div>

      {/* Voice Input Section */}
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <div className={`w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center text-6xl transition-all ${
          isListening 
            ? 'bg-red-100 text-red-600 animate-pulse' 
            : 'bg-green-100 text-green-600 hover:bg-green-200'
        }`}>
          {isListening ? '🔴' : '🎤'}
        </div>
        
        <button
          onClick={handleVoiceInput}
          className={`text-xl font-bold py-4 px-8 rounded-lg transition-colors ${
            isListening
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {isListening ? currentT.stopListening : currentT.startListening}
        </button>

        {isListening && (
          <p className="mt-4 text-lg text-gray-600 animate-pulse">
            {currentT.listening}
          </p>
        )}
      </div>

      {/* Current Conversation */}
      {(transcript || response) && (
        <div className="bg-white p-6 rounded-xl shadow-md">
          {transcript && (
            <div className="mb-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">👤</span>
                <div>
                  <div className="font-medium text-blue-800">You asked:</div>
                  <div className="text-blue-700">{transcript}</div>
                </div>
              </div>
            </div>
          )}
          
          {response && (
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🤖</span>
                <div>
                  <div className="font-medium text-green-800">Kisan Mitra:</div>
                  <div className="text-green-700">{response}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Common Questions */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{currentT.commonQuestions}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {currentT.sampleQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => {
                setTranscript(question);
                processVoiceCommand(question);
              }}
              className="p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">❓</span>
                <span className="text-gray-700">{question}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Conversation History */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Conversation History</h2>
          {conversationHistory.length > 0 && (
            <button
              onClick={clearHistory}
              className="text-red-600 hover:text-red-800 font-medium"
            >
              {currentT.clearHistory}
            </button>
          )}
        </div>
        
        {conversationHistory.length === 0 ? (
          <p className="text-gray-500 text-center py-8">{currentT.noHistory}</p>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {conversationHistory.map((conv, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <div className="text-xs text-gray-500 mb-2">{conv.timestamp}</div>
                <div className="mb-2">
                  <span className="font-medium text-blue-700">Q: </span>
                  <span className="text-gray-700">{conv.question}</span>
                </div>
                <div>
                  <span className="font-medium text-green-700">A: </span>
                  <span className="text-gray-700">{conv.answer}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceAssistant;