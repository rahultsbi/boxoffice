// // Create this file: src/components/DashboardSelection.js

// import React from 'react';

// function DashboardSelection({ user, onLogout, onSelectPredictionType }) {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600">
//       {/* Header */}
//       <header className="bg-white/10 backdrop-blur-sm border-b border-white/20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center space-x-3">
//               <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
//                 <span className="text-blue-600 font-bold text-lg">🎬</span>
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold text-white">Box Office Predictor</h1>
//                 <p className="text-xs text-blue-100">Choose your prediction method</p>
//               </div>
//             </div>

//             <div className="flex items-center space-x-4">
//               <div className="text-right">
//                 <p className="text-sm font-medium text-white">{user?.username}</p>
//                 <p className="text-xs text-blue-200">{user?.email}</p>
//               </div>
//               <button
//                 onClick={onLogout}
//                 className="flex items-center space-x-2 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors duration-200"
//               >
//                 <span className="text-sm font-medium">Logout</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
//         <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full">
//           {/* Welcome Section */}
//           <div className="text-center mb-8">
//             <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
//               <span className="text-2xl text-white">🎯</span>
//             </div>
//             <h2 className="text-3xl font-bold text-gray-900 mb-2">
//               Welcome, {user?.username}!
//             </h2>
//             <p className="text-gray-600 text-lg">
//               Choose your movie box office prediction method to get started
//             </p>
//           </div>

//           {/* Prediction Method Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {/* Excel-based Prediction */}
//             <div className="group">
//               <button
//                 onClick={() => onSelectPredictionType('excel')}
//                 className="w-full p-8 border-2 border-gray-200 rounded-2xl hover:border-green-400 hover:shadow-lg transition-all duration-300 group-hover:scale-105"
//               >
//                 <div className="text-center">
//                   <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
//                     <span className="text-3xl text-white">📊</span>
//                   </div>
                  
//                   <h3 className="text-2xl font-bold text-gray-900 mb-3">
//                     Excel-Based Prediction
//                   </h3>
                  
//                   <p className="text-gray-600 mb-4 leading-relaxed">
//                     Advanced 3-step analysis using historical movie data from Google Sheets. 
//                     Analyze cast, crew, marketing impact, and critical reception.
//                   </p>
                  
//                   <div className="space-y-2 text-sm text-gray-500">
//                     <div className="flex items-center justify-center gap-2">
//                       <span className="w-2 h-2 bg-green-500 rounded-full"></span>
//                       <span>Step-by-step analysis</span>
//                     </div>
//                     <div className="flex items-center justify-center gap-2">
//                       <span className="w-2 h-2 bg-green-500 rounded-full"></span>
//                       <span>Historical data patterns</span>
//                     </div>
//                     <div className="flex items-center justify-center gap-2">
//                       <span className="w-2 h-2 bg-green-500 rounded-full"></span>
//                       <span>Marketing impact assessment</span>
//                     </div>
//                     <div className="flex items-center justify-center gap-2">
//                       <span className="w-2 h-2 bg-green-500 rounded-full"></span>
//                       <span>Auto-save to database</span>
//                     </div>
//                   </div>
                  
//                   <div className="mt-6 px-4 py-2 bg-green-50 text-green-700 rounded-lg font-medium">
//                     Recommended for detailed analysis
//                   </div>
//                 </div>
//               </button>
//             </div>

//             {/* ML-based Prediction */}
//             <div className="group">
//               <button
//                 onClick={() => onSelectPredictionType('ml')}
//                 className="w-full p-8 border-2 border-gray-200 rounded-2xl hover:border-purple-400 hover:shadow-lg transition-all duration-300 group-hover:scale-105"
//               >
//                 <div className="text-center">
//                   <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
//                     <span className="text-3xl text-white">🤖</span>
//                   </div>
                  
//                   <h3 className="text-2xl font-bold text-gray-900 mb-3">
//                     ML-Based Prediction
//                   </h3>
                  
//                   <p className="text-gray-600 mb-4 leading-relaxed">
//                     Quick machine learning predictions using trained models. 
//                     Simply input movie details and get instant predictions.
//                   </p>
                  
//                   <div className="space-y-2 text-sm text-gray-500">
//                     <div className="flex items-center justify-center gap-2">
//                       <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
//                       <span>Instant predictions</span>
//                     </div>
//                     <div className="flex items-center justify-center gap-2">
//                       <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
//                       <span>Machine learning models</span>
//                     </div>
//                     <div className="flex items-center justify-center gap-2">
//                       <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
//                       <span>Simple form input</span>
//                     </div>
//                     <div className="flex items-center justify-center gap-2">
//                       <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
//                       <span>Quick results</span>
//                     </div>
//                   </div>
                  
//                   <div className="mt-6 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg font-medium">
//                     Recommended for quick predictions
//                   </div>
//                 </div>
//               </button>
//             </div>
//           </div>

//           {/* Additional Features */}
//           <div className="mt-8 pt-8 border-t border-gray-200">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
//               <div className="flex flex-col items-center gap-2">
//                 <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//                   <span className="text-xl">📈</span>
//                 </div>
//                 <h4 className="font-semibold text-gray-900">Prediction History</h4>
//                 <p className="text-xs text-gray-600">View all your saved predictions</p>
//               </div>
              
//               <div className="flex flex-col items-center gap-2">
//                 <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
//                   <span className="text-xl">🎯</span>
//                 </div>
//                 <h4 className="font-semibold text-gray-900">Confidence Scoring</h4>
//                 <p className="text-xs text-gray-600">AI-powered accuracy assessment</p>
//               </div>
              
//               <div className="flex flex-col items-center gap-2">
//                 <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
//                   <span className="text-xl">💾</span>
//                 </div>
//                 <h4 className="font-semibold text-gray-900">Auto-Save</h4>
//                 <p className="text-xs text-gray-600">Predictions saved automatically</p>
//               </div>
//             </div>
//           </div>

//           {/* Quick Stats */}
//           <div className="mt-8 bg-gray-50 rounded-xl p-6">
//             <div className="text-center">
//               <h4 className="font-semibold text-gray-900 mb-2">Your Account</h4>
//               <div className="flex justify-center space-x-8 text-sm">
//                 <div>
//                   <span className="block font-medium text-gray-900">Member Since</span>
//                   <span className="text-gray-600">
//                     {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Recently'}
//                   </span>
//                 </div>
//                 <div>
//                   <span className="block font-medium text-gray-900">Account Type</span>
//                   <span className="text-gray-600">
//                     {user?.is_admin ? 'Administrator' : 'Standard User'}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DashboardSelection;
// Create this file: src/components/DashboardSelection.js

// import React from 'react';
// import { apiService } from '../services/apiService';

// function DashboardSelection({ user, onLogout, onSelectPredictionType }) {
//   return (
//     <div className="h-screen overflow-hidden bg-gray-100">
//       {/* Header with Logo and User Info */}
//       <header className="bg-white shadow-sm border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             {/* Logo and Company Name */}
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
//                 <span className="text-white font-bold text-lg">🎬</span>
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold text-gray-900">Box Office Predictor</h1>
//                 <p className="text-xs text-gray-500">Movie Collection Prediction Platform</p>
//               </div>
//             </div>

//             {/* User Info and Logout */}
//             <div className="flex items-center space-x-4">
//               <div className="text-right">
//                 <p className="text-sm font-medium text-gray-900">{user?.username}</p>
//                 <p className="text-xs text-gray-500">{user?.email}</p>
//               </div>
//               <button
//                 onClick={onLogout}
//                 className="px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors duration-200 border border-red-200"
//               >
//                 <span className="text-sm font-medium">Logout</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content - Centered Box */}
//       <div className="h-[calc(100vh-2rem)] flex items-center justify-center px-4">
//         <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 w-full max-w-4xl">
//           {/* Welcome Section */}
          

//           {/* Prediction Method Cards */}
//           <div className="flex  md:flex-row gap-6 md:gap-8">
//             {/* Excel-based Prediction */}
//             <div className="flex-1">
//               <button
//                 onClick={() => onSelectPredictionType('excel')}
//                 className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-green-400 hover:shadow-lg transition-all duration-300 hover:scale-105 group"
//               >
//                 <div className="text-center">
//                   <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <span className="text-2xl text-white">📊</span>
//                   </div>
                  
//                   <h3 className="text-lg font-bold text-gray-900 mb-3">
//                     Excel-Based Prediction
//                   </h3>
                  
//                   <p className="text-gray-600 text-sm mb-4 leading-relaxed">
//                     Advanced 3-step analysis using historical movie data. 
//                     Detailed cast, crew, and marketing impact assessment.
//                   </p>
                  
//                   {/* <div className="space-y-2 text-xs text-gray-500 mb-4">
//                     <div className="flex items-center justify-center gap-2">
//                       <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
//                       <span>Step-by-step analysis</span>
//                     </div>
//                     <div className="flex items-center justify-center gap-2">
//                       <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
//                       <span>Historical data patterns</span>
//                     </div>
//                     <div className="flex items-center justify-center gap-2">
//                       <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
//                       <span>Marketing impact assessment</span>
//                     </div>
//                   </div> */}
                  
//                   <div className="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium inline-flex items-center gap-2 group-hover:bg-green-100 transition-colors">
//                     Get Started
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                     </svg>
//                   </div>
//                 </div>
//               </button>
//             </div>

//             {/* ML-based Prediction */}
//             <div className="flex-1">
//               <button
//                 onClick={() => onSelectPredictionType('ml')}
//                 className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-lg transition-all duration-300 hover:scale-105 group"
//               >
//                 <div className="text-center">
//                   <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <span className="text-2xl text-white">🤖</span>
//                   </div>
                  
//                   <h3 className="text-lg font-bold text-gray-900 mb-3">
//                     ML-Based Prediction
//                   </h3>
                  
//                   <p className="text-gray-600 text-sm mb-4 leading-relaxed">
//                     Quick machine learning predictions using trained models. 
//                     Simple input with instant, accurate results.
//                   </p>
                  
//                   {/* <div className="space-y-2 text-xs text-gray-500 mb-4">
//                     <div className="flex items-center justify-center gap-2">
//                       <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
//                       <span>Instant predictions</span>
//                     </div>
//                     <div className="flex items-center justify-center gap-2">
//                       <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
//                       <span>Machine learning models</span>
//                     </div>
//                     <div className="flex items-center justify-center gap-2">
//                       <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
//                       <span>Simple form interface</span>
//                     </div>
//                   </div> */}
                  
//                   <div className="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium inline-flex items-center gap-2 group-hover:bg-green-100 transition-colors">
//                     Get Started
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                     </svg>
//                   </div>
//                 </div>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DashboardSelection;
// import React from 'react';

// function DashboardSelection({ user, onLogout, onSelectPredictionType }) {
//   return (
//     <div className="h-screen w-screen overflow-hidden bg-gray-100 flex flex-col">
//       {/* Header with Logo and User Info */}
//       <header className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             {/* Logo and Company Name */}
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
//                 <span className="text-white font-bold text-lg">🎬</span>
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold text-gray-900">Box Office Predictor</h1>
//                 <p className="text-xs text-gray-500">Movie Collection Prediction Platform</p>
//               </div>
//             </div>

//             {/* User Info and Logout */}
//             <div className="flex items-center space-x-4">
//               <div className="text-right">
//                 <p className="text-sm font-medium text-gray-900">{user?.username || 'User'}</p>
//                 <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
//               </div>
//               <button
//                 onClick={onLogout}
//                 className="px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors duration-200 border border-red-200"
//               >
//                 <span className="text-sm font-medium">Logout</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content - Perfectly Centered */}
//       <div className="flex-1 flex items-center justify-center px-4">
//         <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 w-full max-w-2xl">
//           {/* Prediction Method Cards */}
//           <div className="flex md:flex-row gap-6 md:gap-8">
//             {/* Excel-based Prediction */}
//             <div className="flex-1">
//               <button
//                 onClick={() => onSelectPredictionType('excel')}
//                 className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-green-400 hover:shadow-lg transition-all duration-300 hover:scale-105 group"
//               >
//                 <div className="text-center">
//                   <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <span className="text-2xl text-white">📊</span>
//                   </div>
                  
//                   <h3 className="text-lg font-bold text-gray-900 mb-3">
//                     Excel-Based Prediction
//                   </h3>
                  
//                   <div className="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium inline-flex items-center gap-2 group-hover:bg-green-100 transition-colors">
//                     Get Started
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                     </svg>
//                   </div>
//                 </div>
//               </button>
//             </div>

//             {/* ML-based Prediction */}
//             <div className="flex-1">
//               <button
//                 onClick={() => onSelectPredictionType('ml')}
//                 className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-lg transition-all duration-300 hover:scale-105 group"
//               >
//                 <div className="text-center">
//                   <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <span className="text-2xl text-white">🤖</span>
//                   </div>
                  
//                   <h3 className="text-lg font-bold text-gray-900 mb-3">
//                     ML-Based Prediction
//                   </h3>
                  
//                   <div className="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium inline-flex items-center gap-2 group-hover:bg-green-100 transition-colors">
//                     Get Started
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                     </svg>
//                   </div>
//                 </div>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DashboardSelection;

import React, { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';

function DashboardSelection({ user, onLogout, onSelectPredictionType }) {
  const [predictionHistory, setPredictionHistory] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [expandedHistoryItem, setExpandedHistoryItem] = useState(null);

  // Load prediction history on component mount
  useEffect(() => {
    loadPredictionHistory();
  }, []);

  const loadPredictionHistory = async () => {
    setIsLoadingHistory(true);
    try {
      const response = await apiService.getPredictionHistory(10); // Load last 10 predictions
      setPredictionHistory(response || []);
    } catch (error) {
      console.error('Failed to load prediction history:', error);
      setPredictionHistory([]);
    } finally {
      setIsLoadingHistory(false);
    }
  };
  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100 flex flex-col">
      {/* Header with Logo and User Info */}
      <header className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Company Name */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🎬</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Box Office Predictor</h1>
                <p className="text-xs text-gray-500">Movie Collection Prediction Platform</p>
              </div>
            </div>

            {/* User Info and Logout */}
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.username || 'User'}</p>
                <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
              </div>
              <button
                onClick={onLogout}
                className="px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors duration-200 border border-red-200"
              >
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Perfectly Centered */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className=" p-8 w-full max-w-full">
          {/* Prediction Method Cards */}
          <div className="grid  md:grid-cols-3 gap-6 md:gap-8 mb-8">
            {/* Excel-based Prediction */}
            <div className="flex-1">
              <button
                onClick={() => onSelectPredictionType('excel')}
                className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-green-400 hover:shadow-lg transition-all duration-300 hover:scale-105 group"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-white">📊</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Excel-Based Prediction
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    Advanced 3-step analysis using historical movie data.
                  </p>
                  
                  <div className="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium inline-flex items-center gap-2 group-hover:bg-green-100 transition-colors">
                    Get Started
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            </div>

            {/* ML-based Prediction */}
            <div className="flex-1">
              <button
                onClick={() => onSelectPredictionType('ml')}
                className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-lg transition-all duration-300 hover:scale-105 group"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-white">🤖</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    ML-Based Prediction
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    Quick machine learning predictions using trained models.
                  </p>
                  
                  <div className="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium inline-flex items-center gap-2 group-hover:bg-green-100 transition-colors">
                    Get Started
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            </div>

            {/* Quick Actions */}
            {/* <div className="flex-1">
              <div className="w-full p-6 border-2 border-gray-200 rounded-xl">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-white">⚡</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Quick Actions
                  </h3>
                  
                  <div className="space-y-2">
                    <button
                      onClick={() => onSelectPredictionType('history')}
                      className="w-full px-3 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-100 transition-colors"
                    >
                      View All History
                    </button>
                    <button
                      onClick={loadPredictionHistory}
                      className="w-full px-3 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                    >
                      Refresh History
                    </button>
                  </div>
                </div>
              </div>
            </div> */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  📊 Recent Predictions
                </h3>
                <button
                  onClick={loadPredictionHistory}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh
                </button>
              </div>

              {isLoadingHistory ? (
                <div className="flex items-center justify-center py-8">
                  <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-3"></div>
                  <span className="text-gray-500">Loading history...</span>
                </div>
              ) : predictionHistory.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {predictionHistory.map((pred, index) => (
                    <div key={pred.id || index}>
                      <div 
                        className="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:border-gray-200 transition-colors duration-200 cursor-pointer"
                        onClick={() => setExpandedHistoryItem(
                          expandedHistoryItem === pred.id ? null : pred.id
                        )}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            {/* <h4 className="font-semibold text-gray-900 text-sm flex items-center  gap-2">
                              {pred.movie_data?.movie_title ? `${pred.movie_data.movie_title}'s Film` : 'Untitled Movie'}
                              <svg 
                                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                                  expandedHistoryItem === pred.id ? 'rotate-180' : ''
                                }`} 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </h4> */}
                            <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
  {pred.movie_data?.Movie_Title
    ? `${pred.movie_data.Movie_Title.charAt(0).toUpperCase() + pred.movie_data.Movie_Title.slice(1)}'s Film`
    : 'Untitled Movie'}

  <svg 
    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
      expandedHistoryItem === pred.id ? 'rotate-180' : ''
    }`} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
</h4>

                            {/* <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
  {pred.movie_data?.movie_title
    ? pred.movie_data.movie_title
    : pred.movie_data?.movie_title
    ? `${pred.movie_data.movie_title}'s Film`
    : 'Untitled Movie'}
  
  <svg 
    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
      expandedHistoryItem === pred.id ? 'rotate-180' : ''
    }`} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
</h4> */}

                            <p className="text-xs text-gray-600 mt-1">
                              {pred.movie_data?.Genre || 'Unknown Genre'} • {pred.movie_data?.['Cast 1'] || 'Unknown Cast'}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-600 text-sm">₹{pred.prediction?.total || 0} Cr</p>
                            <p className="text-xs text-gray-500">
                              {pred.created_at ? new Date(pred.created_at).toLocaleDateString() : 'Unknown Date'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Weekend: ₹{pred.prediction?.weekend || 0} Cr</span>
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            {pred.prediction?.confidence || 75}% confidence
                          </span>
                        </div>
                      </div>
                      
                      {/* Expanded Details */}
                      {expandedHistoryItem === pred.id && (
                        <div className="mt-2 ml-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                          <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <span>🎬</span>
                            Movie Details
                          </h5>
                          
                          <div className="grid grid-cols-2 gap-3 text-xs">
                            {Object.entries(pred.movie_data || {}).map(([key, value]) => {
                              if (!value || value === 'None') return null;
                              return (
                                <div key={key} className="flex flex-col">
                                  <span className="text-gray-500 font-medium capitalize">
                                    {key.replace('_', ' ')}:
                                  </span>
                                  <span className="text-gray-900 font-semibold">
                                    {value}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                          
                          {pred.prediction?.breakdown && (
                            <div className="mt-4 pt-3 border-t border-gray-100">
                              <h6 className="font-semibold text-gray-900 mb-2 text-xs">
                                Prediction Breakdown:
                              </h6>
                              <div className="grid grid-cols-2 gap-2 text-xs">
                                {pred.prediction.breakdown.base_prediction && (
                                  <div>
                                    <span className="text-gray-500">Base:</span>
                                    <span className="ml-1 text-gray-900 font-semibold">
                                      ₹{pred.prediction.breakdown.base_prediction} Cr
                                    </span>
                                  </div>
                                )}
                                {pred.prediction.breakdown.regional_multiplier && (
                                  <div>
                                    <span className="text-gray-500">Regional:</span>
                                    <span className="ml-1 text-gray-900 font-semibold">
                                      {pred.prediction.breakdown.regional_multiplier}x
                                    </span>
                                  </div>
                                )}
                                {pred.prediction.breakdown.weekend_percentage && (
                                  <div>
                                    <span className="text-gray-500">Weekend %:</span>
                                    <span className="ml-1 text-gray-900 font-semibold">
                                      {pred.prediction.breakdown.weekend_percentage}%
                                    </span>
                                  </div>
                                )}
                                {pred.prediction.dataSource && (
                                  <div className="col-span-2">
                                    <span className="text-gray-500">Source:</span>
                                    <span className="ml-1 text-gray-900 font-semibold text-xs">
                                      {pred.prediction.dataSource}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-3xl mb-3">📈</div>
                  <p className="text-gray-500 font-medium mb-1">No Predictions Yet</p>
                  <p className="text-xs text-gray-400">
                    Your prediction history will appear here after you create your first prediction
                  </p>
                </div>
              )}
            </div>
          </div>
          </div>

          {/* Prediction History Section */}
         
        </div>
      </div>
    </div>
  );
}

export default DashboardSelection;