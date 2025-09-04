import React, { useState } from 'react';
import { useLanguage } from '../App';
import { mockData } from '../data/mockData';

const PestDetection = ({ user }) => {
  const { t, currentLanguage } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const translations = {
    en: {
      title: "AI Pest & Disease Detection",
      subtitle: "Upload a photo of your crop for instant diagnosis",
      uploadImage: "Upload Crop Image",
      takePhoto: "Take Photo",
      analyzing: "Analyzing image...",
      commonPests: "Common Pests in Your Area",
      diagnosis: "Diagnosis Result",
      confidence: "Confidence",
      treatment: "Recommended Treatment",
      prevention: "Prevention Tips",
      tryAgain: "Try Another Image",
      noDiagnosis: "No issues detected in this image"
    },
    hi: {
      title: "एआई कीट और रोग पहचान",
      subtitle: "तुरंत निदान के लिए अपनी फसल की तस्वीर अपलोड करें",
      uploadImage: "फसल की तस्वीर अपलोड करें",
      takePhoto: "फोटो लें",
      analyzing: "तस्वीर का विश्लेषण कर रहे हैं...",
      commonPests: "आपके क्षेत्र में आम कीट",
      diagnosis: "निदान परिणाम",
      confidence: "विश्वास",
      treatment: "अनुशंसित उपचार",
      prevention: "रोकथाम के सुझाव",
      tryAgain: "दूसरी तस्वीर आज़माएं",
      noDiagnosis: "इस तस्वीर में कोई समस्या नहीं मिली"
    }
  };

  const currentT = translations[currentLanguage] || translations.en;

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    
    // Simulate AI analysis with mock results
    setTimeout(() => {
      const randomPest = mockData.commonPests[Math.floor(Math.random() * mockData.commonPests.length)];
      setAnalysisResult(randomPest);
      setIsAnalyzing(false);
    }, 3000);
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{currentT.title}</h1>
        <p className="text-lg text-gray-600">{currentT.subtitle}</p>
        <div className="text-6xl my-4">🔍🐛</div>
      </div>

      {/* Upload Section */}
      {!selectedImage && (
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <div className="border-4 border-dashed border-gray-300 rounded-xl p-12 hover:border-green-400 transition-colors">
            <div className="text-6xl mb-4">📸</div>
            <h3 className="text-xl font-bold text-gray-700 mb-4">
              {currentT.uploadImage}
            </h3>
            <div className="space-y-4">
              <label className="inline-block bg-green-600 hover:bg-green-700 text-white text-lg font-bold py-4 px-8 rounded-lg cursor-pointer transition-colors">
                📁 {currentT.uploadImage}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              <div className="text-gray-500">or</div>
              <label className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold py-4 px-8 rounded-lg cursor-pointer transition-colors">
                📷 {currentT.takePhoto}
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Analysis Section */}
      {selectedImage && (
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Uploaded Image */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Uploaded Image</h3>
              <img
                src={selectedImage}
                alt="Uploaded crop"
                className="w-full h-64 object-cover rounded-lg border"
              />
              <button
                onClick={resetAnalysis}
                className="mt-4 w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg text-lg font-medium"
              >
                {currentT.tryAgain}
              </button>
            </div>

            {/* Analysis Result */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">{currentT.diagnosis}</h3>
              
              {isAnalyzing && (
                <div className="text-center py-12">
                  <div className="animate-spin text-6xl mb-4">🔄</div>
                  <p className="text-lg text-gray-600">{currentT.analyzing}</p>
                </div>
              )}

              {analysisResult && !isAnalyzing && (
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-red-800">{analysisResult.name}</h4>
                      <span className="text-2xl">{analysisResult.icon}</span>
                    </div>
                    <p className="text-red-700 mb-2">{analysisResult.description}</p>
                    <div className="text-sm text-red-600">
                      {currentT.confidence}: {analysisResult.confidence}%
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-bold text-green-800 mb-2">{currentT.treatment}</h4>
                    <p className="text-green-700">{analysisResult.treatment}</p>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-bold text-blue-800 mb-2">{currentT.prevention}</h4>
                    <p className="text-blue-700">{analysisResult.prevention}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Common Pests in Area */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{currentT.commonPests}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockData.commonPests.slice(0, 6).map((pest, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-800">{pest.name}</h3>
                <span className="text-2xl">{pest.icon}</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{pest.description}</p>
              <div className="text-xs text-gray-500">
                Affects: {pest.affectedCrops.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PestDetection;