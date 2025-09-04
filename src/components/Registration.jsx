import React, { useState } from 'react';
import { useLanguage } from '../App';

const Registration = ({ onRegister }) => {
  const { t, currentLanguage } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    state: '',
    district: '',
    village: '',
    landSize: '',
    soilType: '',
    mainCrops: [],
    experience: ''
  });

  const states = ['Maharashtra', 'Punjab', 'Uttar Pradesh', 'Karnataka', 'Tamil Nadu', 'Andhra Pradesh', 'Gujarat', 'Rajasthan'];
  const soilTypes = ['Black Soil', 'Red Soil', 'Alluvial Soil', 'Laterite Soil', 'Desert Soil', 'Mountain Soil'];
  const crops = ['Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Maize', 'Soybean', 'Groundnut', 'Pulses'];

  const translations = {
    en: {
      title: "Farmer Registration",
      subtitle: "Join Kisan Mitra for personalized farming advice",
      name: "Full Name",
      phone: "Mobile Number",
      state: "State",
      district: "District",
      village: "Village/Town",
      landSize: "Land Size (acres)",
      soilType: "Soil Type",
      mainCrops: "Main Crops (select multiple)",
      experience: "Farming Experience (years)",
      register: "Register Now",
      required: "Required field"
    },
    hi: {
      title: "किसान पंजीकरण",
      subtitle: "व्यक्तिगत कृषि सलाह के लिए किसान मित्र से जुड़ें",
      name: "पूरा नाम",
      phone: "मोबाइल नंबर",
      state: "राज्य",
      district: "जिला",
      village: "गांव/शहर",
      landSize: "भूमि का आकार (एकड़)",
      soilType: "मिट्टी का प्रकार",
      mainCrops: "मुख्य फसलें (कई चुनें)",
      experience: "कृषि अनुभव (वर्ष)",
      register: "अभी पंजीकरण करें",
      required: "आवश्यक फील्ड"
    }
  };

  const currentT = translations[currentLanguage] || translations.en;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.phone && formData.state) {
      onRegister(formData);
    }
  };

  const handleCropToggle = (crop) => {
    setFormData(prev => ({
      ...prev,
      mainCrops: prev.mainCrops.includes(crop)
        ? prev.mainCrops.filter(c => c !== crop)
        : [...prev.mainCrops, crop]
    }));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-green-700 mb-2">{currentT.title}</h1>
        <p className="text-gray-600 text-lg">{currentT.subtitle}</p>
        <div className="text-6xl my-4">🌾</div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            {currentT.name} *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
            placeholder={currentT.name}
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            {currentT.phone} *
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
            placeholder="10-digit mobile number"
          />
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              {currentT.state} *
            </label>
            <select
              required
              value={formData.state}
              onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
              className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
            >
              <option value="">{currentT.state}</option>
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              {currentT.district}
            </label>
            <input
              type="text"
              value={formData.district}
              onChange={(e) => setFormData(prev => ({ ...prev, district: e.target.value }))}
              className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
              placeholder={currentT.district}
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              {currentT.village}
            </label>
            <input
              type="text"
              value={formData.village}
              onChange={(e) => setFormData(prev => ({ ...prev, village: e.target.value }))}
              className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
              placeholder={currentT.village}
            />
          </div>
        </div>

        {/* Land and Soil */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              {currentT.landSize}
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.landSize}
              onChange={(e) => setFormData(prev => ({ ...prev, landSize: e.target.value }))}
              className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
              placeholder="e.g., 2.5"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              {currentT.soilType}
            </label>
            <select
              value={formData.soilType}
              onChange={(e) => setFormData(prev => ({ ...prev, soilType: e.target.value }))}
              className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
            >
              <option value="">{currentT.soilType}</option>
              {soilTypes.map(soil => (
                <option key={soil} value={soil}>{soil}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Main Crops */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            {currentT.mainCrops}
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {crops.map(crop => (
              <button
                key={crop}
                type="button"
                onClick={() => handleCropToggle(crop)}
                className={`p-3 text-lg rounded-lg border-2 transition-all ${
                  formData.mainCrops.includes(crop)
                    ? 'bg-green-100 border-green-500 text-green-700'
                    : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {crop}
              </button>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            {currentT.experience}
          </label>
          <input
            type="number"
            value={formData.experience}
            onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
            className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
            placeholder="e.g., 10"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white text-xl font-bold py-4 px-6 rounded-lg transition-colors"
        >
          🚀 {currentT.register}
        </button>
      </form>
    </div>
  );
};

export default Registration;