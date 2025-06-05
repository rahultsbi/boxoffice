
import { useState, useEffect } from "react";
import { apiService } from './services/apiService';
import Logo from './assets/Logo.png'; // Uncomment when you have the logo

import EnhancedSearchableInput from './components/EnhancedSearchableInput';
import UpcomingMovieSearch from './components/UpcomingMovieSearch';
import PredictionResults from './components/PredictionResults';


function MainAppPage({ user, onLogout, onTokenExpired,onBack }) {
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [predictionHistory, setPredictionHistory] = useState([]);
  const [showUpcomingSearch, setShowUpcomingSearch] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [expandedHistoryItem, setExpandedHistoryItem] = useState(null);

  const steps = [
    "Movie_Title",
    "Director", "Genre", "Music Director", "Lead Singer",
    "Cast 1", "Cast 2", "Cast 3", "Cast 4", "Category", "Budget_Estimate"
  ];

  const requiredSteps = [
    "Director", "Genre", "Cast 1", "Cast 2"
  ];

  const optionalSteps = ["Music Director", "Lead Singer", "Cast 3", "Cast 4", "Category", "Budget_Estimate"];

  const staticOptions = {
    Genre: [
      "Action", "Horror", "Comedy", "Family Drama", "Romance", 
      "Thriller", "Sci-Fi", "Historical", "Musical", "Adventure"
    ],
    "Lead Singer": [
      "Diljit Dosanjh", "Arijit Singh", "Shreya Ghoshal", 
      "Rahat Fateh Ali Khan", "Sunidhi Chauhan", "Armaan Malik", 
      "Asees Kaur", "Shaan", "Various Artists", "Playback Singer"
    ],
    Category: [
      "None", "Religious/Political", "Political", 
      "Patriotic", "Social Issue", "Biographical"
    ],
    Budget_Estimate: [
      "Low (₹1-10 Cr)", "Medium (₹10-50 Cr)", "High (₹50-200 Cr)", "Blockbuster (₹200+ Cr)"
    ]
  };

  // Load prediction history on component mount
  useEffect(() => {
    loadPredictionHistory();
  }, []);

  const loadPredictionHistory = async () => {
    setIsLoadingHistory(true);
    try {
      const history = await apiService.getPredictionHistory(20);
      setPredictionHistory(history);
    } catch (error) {
      console.error('Failed to load prediction history:', error);
      // Check for auth errors
      if (error.message.includes('401') && onTokenExpired) {
        onTokenExpired();
        return;
      }
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const getStepDisplayName = (stepName) => {
    let displayName;
    switch(stepName) {
      case "Cast 1": displayName = "Lead Actor/Actress"; break;
      case "Cast 2": displayName = "Supporting Actor/Actress"; break;
      case "Cast 3": displayName = "Character Actor"; break;
      case "Cast 4": displayName = "Additional Cast"; break;
      case "Budget_Estimate": displayName = "Budget Range"; break;
      default: displayName = stepName;
    }
    
    // Add asterisk only for required fields
    const isRequired = requiredSteps.includes(stepName);
    return isRequired ? `${displayName} *` : displayName;
  };

  const getStepIcon = (stepName) => {
    switch(stepName) {
      case "Director": return "🎬";
      case "Genre": return "🎭";
      case "Music Director": return "🎵";
      case "Lead Singer": return "🎤";
      case "Cast 1": return "⭐";
      case "Cast 2": return "🌟";
      case "Cast 3": return "✨";
      case "Cast 4": return "💫";
      case "Category": return "📂";
      case "Budget_Estimate": return "💰";
      default: return "🎯";
    }
  };

  const filledCount = Object.keys(formData).filter(key => formData[key]).length;
  const mandatoryFilledCount = Object.keys(formData).filter(key => 
    formData[key] && requiredSteps.includes(key)
  ).length;
  const progressPercentage = (mandatoryFilledCount / requiredSteps.length) * 100;
  const isComplete = mandatoryFilledCount === requiredSteps.length;

  const handleFormChange = (fieldName, value) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleSearchSelect = (fieldName, value) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleUpcomingMovieSelect = (movieData) => {
    const newFormData = {
      "Director": movieData.director || "",
      "Genre": movieData.primary_genre || "",
      "Music Director": movieData.music_director || "",
      "Lead Singer": movieData.lead_singer || "",
      "Cast 1": movieData.cast_1 || "",
      "Cast 2": movieData.cast_2 || "",
      "Cast 3": movieData.cast_3 || "",
      "Cast 4": movieData.cast_4 || "",
      "Category": movieData.category || "None",
      "Budget_Estimate": movieData.budget_estimate || ""
    };
    
    setFormData(newFormData);
    setShowUpcomingSearch(false);
  };

  const handlePredict = async () => {
    setIsLoading(true);
    
    try {
      const prediction = await apiService.predictMovie(formData);
      
      const resultData = {
        weekend: prediction.weekend,
        total: prediction.total,
        confidence: prediction.confidence,
        breakdown: prediction.breakdown,
        dataSource: prediction.data_source
      };

      setResult(resultData);

      // Save prediction to database
      try {
        await apiService.savePrediction(formData, resultData);
        // Reload history to show the new prediction
        await loadPredictionHistory();
      } catch (saveError) {
        console.error('Failed to save prediction:', saveError);
        if (saveError.message.includes('401') && onTokenExpired) {
          onTokenExpired();
          return;
        }
      }

    } catch (error) {
      console.error('Prediction failed:', error);
      if (error.message.includes('401') && onTokenExpired) {
        onTokenExpired();
        return;
      }
      alert(`Prediction failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({});
    setResult(null);
  };

  const handleLogout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      onLogout();
    }
  };

  // Show different screens
  if (showUpcomingSearch) {
    return (
      <UpcomingMovieSearch
        onMovieSelect={handleUpcomingMovieSelect}
        onClose={() => setShowUpcomingSearch(false)}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-white to-blue-50 flex items-center justify-center z-50">
        <div className="bg-white shadow-xl rounded-2xl p-8 text-center max-w-sm w-full mx-4 border border-blue-100">
          <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-xl font-bold text-blue-800 mb-2">🎬 Analyzing Your Movie</h3>
          <p className="text-sm text-blue-600">Fetching Box Office performance data...</p>
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <PredictionResults 
        result={result}
        formData={formData}
        onReset={handleReset}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* <button
                onClick={() => {
                  console.log('🔙 Back button clicked');
                  if (onBack) {
                    onBack();
                  } else {
                    console.warn('⚠️ onBack prop not provided, using window.history.back()');
                    window.history.back();
                  }
                }}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Back</span>
              </button> */}
                <div className="flex items-center space-x-6">
              <button
                onClick={() => {
                  if (onBack) onBack();
                  else window.history.back();
                }}
                className="group flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-all duration-200 hover:scale-105"
              >
                <div className="p-2 rounded-xl bg-gray-100 group-hover:bg-blue-100 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
                <span className="font-medium">Back</span>
              </button>
              <div className="h-8 w-px bg-gray-300"></div>
              {/* <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                🎬 Movie Prediction Studio
              </h1> */}
            </div>
            {/* Logo and Title */}
            {/* <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  🎬
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Box Office Predictor</h1>
                  <p className="text-xs text-gray-500">Professional Edition</p>
                </div>
              </div>
            </div> */}

            {/* User Info and Actions */}
            <div className="flex items-center space-x-4">
              
              <button
                onClick={() => setShowUpcomingSearch(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <span className="text-sm">🔮</span>
                <span className="text-sm font-medium">Upcoming Movies</span>
              </button>
              
              {/* <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user?.username}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">
                    {user?.username?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div> */}

              {/* <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="text-sm font-medium">Logout</span>
              </button> */}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Form */}
        <div className="w-1/2 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-6">
            <div className="mb-6">
              {/* <h2 className="text-xl font-bold text-gray-900 mb-2">🎬 Movie Setup</h2> */}
              {/* <p className="text-gray-600 text-sm">Fill in the details to predict box office performance</p> */}
              {/* <p className="text-sm text-gray-500 mt-1">Fields marked with <span className="text-red-500 font-semibold">*</span> are required</p> */}
              
              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Progress: {mandatoryFilledCount}/{requiredSteps.length} required fields
                  </span>
                  <span className="text-sm font-medium text-blue-600">
                    {Math.round(progressPercentage)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                {filledCount > mandatoryFilledCount && (
                  <p className="text-xs text-gray-500 mt-1">
                    +{filledCount - mandatoryFilledCount} optional fields filled
                  </p>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              {/* All Fields in One Section */}
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  🎬 Movie Details
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                    Fields marked with <span className="text-red-500">*</span> are required
                  </span>
                </h3>
                
                {steps.map((stepName, index) => {
                  const isSearchableField = [
                    "Director", "Cast 1", "Cast 2", "Cast 3", "Cast 4", 
                    "Music Director", "Lead Singer"
                  ].includes(stepName);
                  
                  const isRequired = requiredSteps.includes(stepName);

                  return (
                    <div key={stepName} className="bg-gray-50 rounded-xl p-5 border border-gray-100 hover:border-gray-200 transition-colors duration-200 mb-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                          formData[stepName] 
                            ? 'bg-green-100 text-green-700 border-2 border-green-200' 
                            : 'bg-gray-100 text-gray-500 border-2 border-gray-200'
                        }`}>
                          {formData[stepName] ? '✓' : index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                            <span>{getStepIcon(stepName)}</span>
                            <span>{getStepDisplayName(stepName)}</span>
                          </h3>
                          {isSearchableField && (
                            <p className="text-xs text-gray-500 mt-1">
                              Search from Box Office database
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="ml-11">
                        {/* {isSearchableField ? (
                          <EnhancedSearchableInput
                            step={stepName}
                            value={formData[stepName] || ""}
                            onChange={(e) => handleFormChange(stepName, e.target.value)}
                            onSelect={(value) => handleSearchSelect(stepName, value)}
                            placeholder={`Enter ${getStepDisplayName(stepName).replace(' *', '').toLowerCase()}${isRequired ? ' *' : ''}`}
                          />
                        ) : (
                          <select
                            className="w-full px-4 py-3 text-sm bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-300"
                            value={formData[stepName] || ""}
                            onChange={(e) => handleFormChange(stepName, e.target.value)}
                          >
                            <option value="">Choose {getStepDisplayName(stepName)}</option>
                            {staticOptions[stepName]?.map((option) => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        )} */}
                        {isSearchableField ? (
  <EnhancedSearchableInput
    step={stepName}
    value={formData[stepName] || ""}
    onChange={(e) => handleFormChange(stepName, e.target.value)}
    onSelect={(value) => handleSearchSelect(stepName, value)}
    placeholder={`Enter ${getStepDisplayName(stepName).replace(' *', '').toLowerCase()}${isRequired ? ' *' : ''}`}
  />
) : staticOptions[stepName] ? (
  <select
    className="w-full px-4 py-3 text-sm bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-300"
    value={formData[stepName] || ""}
    onChange={(e) => handleFormChange(stepName, e.target.value)}
  >
    <option value="">Choose {getStepDisplayName(stepName)}</option>
    {staticOptions[stepName]?.map((option) => (
      <option key={option} value={option}>{option}</option>
    ))}
  </select>
) : (
  <input
    type="text"
    className="w-full px-4 py-3 text-sm bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-300"
    placeholder={`Enter ${getStepDisplayName(stepName).replace(' *', '')}`}
    value={formData[stepName] || ""}
    onChange={(e) => handleFormChange(stepName, e.target.value)}
  />
)}

                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex gap-4">
              <button
                onClick={handleReset}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Reset Form</span>
              </button>
              <button
                onClick={handlePredict}
                disabled={!isComplete}
                className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                  isComplete
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 shadow-lg'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Generate Prediction</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar - History & Preview */}
        <div className="w-1/2 bg-gray-50 overflow-y-auto">
          <div className="p-6">
            {/* Movie Preview Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  🎬 Movie Preview
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                    {filledCount}/{steps.length}
                  </span>
                </h3>

                {/* Form Data Preview */}
                {filledCount > 0 ? (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 border-b border-gray-200 pb-2">
                      Cast & Crew Details
                    </h4>
                    
                    {steps.map((stepName) => {
                      const value = formData[stepName];
                      if (!value) return null;
                      
                      return (
                        <div key={stepName} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <span className="text-lg">{getStepIcon(stepName)}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                              {getStepDisplayName(stepName).replace(' *', '')}
                            </p>
                            <p className="text-sm font-semibold text-gray-900 truncate">
                              {value}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-3xl mb-3">📝</div>
                    <p className="text-gray-500 font-medium mb-1">Start Building</p>
                    <p className="text-xs text-gray-400">
                      Fill the form to see preview
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Prediction History Section */}
            {/* <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    📊 Prediction History
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
                      <div key={pred.id}>
                        <div 
                          className="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:border-gray-200 transition-colors duration-200 cursor-pointer"
                          onClick={() => setExpandedHistoryItem(
                            expandedHistoryItem === pred.id ? null : pred.id
                          )}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                                {pred.movie_data?.Director ? `${pred.movie_data.Director}'s Film` : 'Untitled Movie'}
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
                              <p className="text-xs text-gray-600 mt-1">
                                {pred.movie_data?.Genre || 'Unknown Genre'} • {pred.movie_data?.['Cast 1'] || 'Unknown Cast'}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-green-600 text-sm">₹{pred.prediction?.total || 0} Cr</p>
                              <p className="text-xs text-gray-500">
                                {new Date(pred.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>Weekend: ₹{pred.prediction?.weekend || 0} Cr</span>
                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                              {pred.prediction?.confidence || 0}% confidence
                            </span>
                          </div>
                        </div>
                        
                       
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
                      Your prediction history will appear here
                    </p>
                  </div>
                )}
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Powered by Box Office Database</span>
              </div>
              <span>•</span>
              <span>Professional Box Office Predictions</span>
            </div>
            <div className="text-sm text-gray-500">
              © 2025 Box Office Predictor
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MainAppPage;