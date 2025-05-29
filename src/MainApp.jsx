
// // // // // import { useState } from "react";

// // // // // import EnhancedSearchableInput from './components/EnhancedSearchableInput';
// // // // // import UpcomingMovieSearch from './components/UpcomingMovieSearch';
// // // // // import PredictionResults from './components/PredictionResults';
// // // // // import WhatIfAnalysis from './components/WhatIfAnalysis';
// // // // // import { apiService } from '../src/services/apiService';

// // // // // const steps = [
// // // // //   "Director", 
// // // // //   "Genre", 
// // // // //   "Music Director", 
// // // // //   "Lead Singer",
// // // // //   "Cast 1", 
// // // // //   "Cast 2", 
// // // // //   "Cast 3", 
// // // // //   "Cast 4", 
// // // // //   "Category"
// // // // // ];

// // // // // const staticOptions = {
// // // // //   Genre: [
// // // // //     "Action", "Horror", "Comedy", "Family Drama", "Romance", 
// // // // //     "Thriller", "Sci-Fi", "Historical", "Musical", "Adventure"
// // // // //   ],
// // // // //   "Lead Singer": [
// // // // //     "Diljit Dosanjh", "Arijit Singh", "Shreya Ghoshal", 
// // // // //     "Rahat Fateh Ali Khan", "Sunidhi Chauhan", "Armaan Malik", 
// // // // //     "Asees Kaur", "Shaan", "Various Artists", "Playback Singer"
// // // // //   ],
// // // // //   Category: [
// // // // //     "None", "Religious/Political", "Political", 
// // // // //     "Patriotic", "Social Issue", "Biographical"
// // // // //   ],
// // // // // };

// // // // // function CompactProgressBar({ currentStep, totalSteps }) {
// // // // //   const progressPercentage = ((currentStep + 1) / totalSteps) * 100;
  
// // // // //   return (
// // // // //     <div className="mb-6">
// // // // //       <div className="flex justify-between items-center mb-2">
// // // // //         <span className="text-sm font-semibold text-gray-700">
// // // // //           Step {currentStep + 1}/{totalSteps}
// // // // //         </span>
// // // // //         <span className="text-xs text-gray-500">
// // // // //           {Math.round(progressPercentage)}%
// // // // //         </span>
// // // // //       </div>
// // // // //       <div className="w-full bg-gray-200 rounded-full h-2">
// // // // //         <div 
// // // // //           className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300 ease-out"
// // // // //           style={{ width: `${progressPercentage}%` }}
// // // // //         ></div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // function QuickPreview({ formData, steps }) {
// // // // //   const filledCount = Object.keys(formData).length;
// // // // //   const totalSteps = steps.length;
  
// // // // //   if (filledCount === 0) return null;

// // // // //   return (
// // // // //     <div className="bg-gray-50 rounded-lg p-4 mb-6">
// // // // //       <div className="flex justify-between items-center mb-3">
// // // // //         <span className="text-sm font-semibold text-gray-700">🎬 Your Movie</span>
// // // // //         <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
// // // // //           {filledCount}/{totalSteps}
// // // // //         </span>
// // // // //       </div>
      
// // // // //       <div className="space-y-2">
// // // // //         {Object.entries(formData).slice(-3).map(([key, value]) => (
// // // // //           <div key={key} className="flex justify-between items-center text-sm">
// // // // //             <span className="text-gray-600">{key}:</span>
// // // // //             <span className="font-medium text-gray-900 truncate ml-2 max-w-32">
// // // // //               {value}
// // // // //             </span>
// // // // //           </div>
// // // // //         ))}
// // // // //         {filledCount > 3 && (
// // // // //           <div className="text-xs text-gray-500 text-center pt-1">
// // // // //             +{filledCount - 3} more items...
// // // // //           </div>
// // // // //         )}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // function LoadingScreen() {
// // // // //   return (
// // // // //     <div className="fixed inset-0 bg-gradient-to-br from-white to-blue-50 flex items-center justify-center z-50">
// // // // //       <div className="bg-white shadow-xl rounded-2xl p-8 text-center max-w-sm w-full mx-4 border border-blue-100">
// // // // //         <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
// // // // //         <h3 className="text-xl font-bold text-blue-800 mb-2">🎬 Analyzing Your Movie</h3>
// // // // //         <p className="text-sm text-blue-600">Fetching TMDB performance data...</p>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }


// // // // // function App() {
// // // // //   const [formData, setFormData] = useState({});
// // // // //   const [currentStep, setCurrentStep] = useState(0);
// // // // //   const [result, setResult] = useState(null);
// // // // //   const [isLoading, setIsLoading] = useState(false);
// // // // //   const [showWhatIf, setShowWhatIf] = useState(false);
// // // // //   const [showUpcomingSearch, setShowUpcomingSearch] = useState(false);

// // // // //   const handleUpcomingMovieSelect = (movieData) => {
// // // // //     const newFormData = {
// // // // //       "Director": movieData.director || "",
// // // // //       "Genre": movieData.primary_genre || "",
// // // // //       "Music Director": movieData.music_director || "",
// // // // //       "Lead Singer": movieData.lead_singer || "",
// // // // //       "Cast 1": movieData.cast_1 || "",
// // // // //       "Cast 2": movieData.cast_2 || "",
// // // // //       "Cast 3": movieData.cast_3 || "",
// // // // //       "Cast 4": movieData.cast_4 || "",
// // // // //       "Category": movieData.category || "None"
// // // // //     };
    
// // // // //     setFormData(newFormData);
// // // // //     setCurrentStep(0);
// // // // //     alert(`✨ "${movieData.title}" loaded! Review and predict.`);
// // // // //   };

// // // // //   const handleChange = (e) => {
// // // // //     setFormData({ ...formData, [steps[currentStep]]: e.target.value });
// // // // //   };

// // // // //   const handleSearchSelect = (value) => {
// // // // //     setFormData({ ...formData, [steps[currentStep]]: value });
// // // // //   };

// // // // //   const handleNext = () => {
// // // // //     if (currentStep < steps.length - 1) {
// // // // //       setCurrentStep(currentStep + 1);
// // // // //     } else {
// // // // //       handlePredict();
// // // // //     }
// // // // //   };

// // // // //   const handleBack = () => {
// // // // //     if (currentStep > 0) {
// // // // //       setCurrentStep(currentStep - 1);
// // // // //     }
// // // // //   };

// // // // //   // const handlePredict = async () => {
// // // // //   //   setIsLoading(true);
    
// // // // //   //   try {
// // // // //   //     const requestData = {
// // // // //   //       Director: formData.Director,
// // // // //   //       Genre: formData.Genre,
// // // // //   //       Music_Director: formData["Music Director"],
// // // // //   //       Lead_Singer: formData["Lead Singer"],
// // // // //   //       Cast_1: formData["Cast 1"],
// // // // //   //       Cast_2: formData["Cast 2"],
// // // // //   //       Cast_3: formData["Cast 3"],
// // // // //   //       Cast_4: formData["Cast 4"],
// // // // //   //       Category: formData.Category || "None"
// // // // //   //     };

// // // // //   //     const response = await fetch('https://box-office-tool-backend.onrender.com/predict-performance-enhanced', {
// // // // //   //       method: 'POST',
// // // // //   //       headers: {
// // // // //   //         'Content-Type': 'application/json',
// // // // //   //       },
// // // // //   //       body: JSON.stringify(requestData)
// // // // //   //     });

// // // // //   //     if (!response.ok) {
// // // // //   //       const errorData = await response.json();
// // // // //   //       throw new Error(`API Error: ${response.status} - ${errorData.detail || 'Unknown error'}`);
// // // // //   //     }

// // // // //   //     const prediction = await response.json();
      
// // // // //   //     setResult({
// // // // //   //       weekend: prediction.weekend,
// // // // //   //       total: prediction.total,
// // // // //   //       confidence: prediction.confidence,
// // // // //   //       breakdown: prediction.breakdown,
// // // // //   //       dataSource: prediction.data_source
// // // // //   //     });
// // // // //   //   } catch (error) {
// // // // //   //     console.error('Prediction failed:', error);
// // // // //   //     alert(`Prediction failed: ${error.message}`);
// // // // //   //   }
    
// // // // //   //   setIsLoading(false);
// // // // //   // };

// // // // //   const handlePredict = async () => {
// // // // //   setIsLoading(true);
  
// // // // //   try {
// // // // //     const prediction = await apiService.predictMovie(formData);
    
// // // // //     const resultData = {
// // // // //       weekend: prediction.weekend,
// // // // //       total: prediction.total,
// // // // //       confidence: prediction.confidence,
// // // // //       breakdown: prediction.breakdown,
// // // // //       dataSource: prediction.data_source
// // // // //     };

// // // // //     setResult(resultData);

// // // // //     // NEW: Save prediction to database
// // // // //     try {
// // // // //       await apiService.savePrediction(formData, resultData);
// // // // //     } catch (saveError) {
// // // // //       console.error('Failed to save prediction:', saveError);
// // // // //     }

// // // // //   } catch (error) {
// // // // //     console.error('Prediction failed:', error);
// // // // //     alert(`Prediction failed: ${error.message}`);
// // // // //   } finally {
// // // // //     setIsLoading(false);
// // // // //   }
// // // // // };

// // // // //   const resetForm = () => {
// // // // //     setFormData({});
// // // // //     setCurrentStep(0);
// // // // //     setResult(null);
// // // // //     setShowWhatIf(false);
// // // // //   };

// // // // //   const handleWhatIfAnalysis = () => {
// // // // //     if (Object.keys(formData).length < steps.length) {
// // // // //       alert("Please complete the movie setup first");
// // // // //       return;
// // // // //     }
// // // // //     setShowWhatIf(true);
// // // // //   };

// // // // //   // Show different screens
// // // // //   if (showUpcomingSearch) {
// // // // //     return (
// // // // //       <UpcomingMovieSearch
// // // // //         onMovieSelect={handleUpcomingMovieSelect}
// // // // //         onClose={() => setShowUpcomingSearch(false)}
// // // // //       />
// // // // //     );
// // // // //   }

// // // // //   if (showWhatIf) {
// // // // //     const baseMovie = {
// // // // //       Director: formData.Director,
// // // // //       Genre: formData.Genre,
// // // // //       Music_Director: formData["Music Director"],
// // // // //       Lead_Singer: formData["Lead Singer"],
// // // // //       Cast_1: formData["Cast 1"],
// // // // //       Cast_2: formData["Cast 2"],
// // // // //       Cast_3: formData["Cast 3"],
// // // // //       Cast_4: formData["Cast 4"],
// // // // //       Category: formData.Category || "None"
// // // // //     };
    
// // // // //     return (
// // // // //       <WhatIfAnalysis 
// // // // //         baseMovie={baseMovie} 
// // // // //         onBack={() => setShowWhatIf(false)} 
// // // // //       />
// // // // //     );
// // // // //   }

// // // // //   if (isLoading) {
// // // // //     return <LoadingScreen />;
// // // // //   }

// // // // //   if (result) {
// // // // //     return (
// // // // //       <PredictionResults 
// // // // //         result={result}
// // // // //         formData={formData}
// // // // //         onWhatIfAnalysis={handleWhatIfAnalysis}
// // // // //         onReset={resetForm}
// // // // //       />
// // // // //     );
// // // // //   }

// // // // //   // Main compact form
// // // // //   const currentStepName = steps[currentStep];
// // // // //   const isSearchableField = [
// // // // //     "Director", "Cast 1", "Cast 2", "Cast 3", "Cast 4", 
// // // // //     "Music Director", "Lead Singer"
// // // // //   ].includes(currentStepName);

// // // // //   const getStepDisplayName = (stepName) => {
// // // // //     switch(stepName) {
// // // // //       case "Cast 1": return "Lead Actor/Actress";
// // // // //       case "Cast 2": return "Supporting Actor/Actress";
// // // // //       case "Cast 3": return "Character Actor";
// // // // //       case "Cast 4": return "Additional Cast";
// // // // //       default: return stepName;
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
// // // // //       <div className="w-full max-w-md">
// // // // //         {/* Main Card */}
// // // // //         <div className="bg-white rounded-2xl shadow-2xl p-6">
// // // // //           {/* Header */}
// // // // //           <div className="text-center mb-6">
// // // // //             <h1 className="text-2xl font-bold text-gray-900 mb-2">
// // // // //               🎬 TMDB Box Office Predictor
// // // // //             </h1>
// // // // //             <p className="text-sm text-gray-600 mb-4">
// // // // //               Unlimited access to TMDB database
// // // // //             </p>
            
// // // // //             <button 
// // // // //               className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
// // // // //               onClick={() => setShowUpcomingSearch(true)}
// // // // //             >
// // // // //               🔮 Search Upcoming Movies
// // // // //             </button>
// // // // //           </div>

// // // // //           {/* Progress */}
// // // // //           <CompactProgressBar currentStep={currentStep} totalSteps={steps.length} />

// // // // //           {/* Current Step */}
// // // // //           <div className="mb-6">
// // // // //             <div className="mb-4">
// // // // //               <h3 className="text-lg font-semibold text-gray-900 mb-1">
// // // // //                 {getStepDisplayName(currentStepName)}
// // // // //               </h3>
// // // // //               {isSearchableField && (
// // // // //                 <p className="text-xs text-gray-500">
// // // // //                   Search any {currentStepName.toLowerCase()} from TMDB
// // // // //                 </p>
// // // // //               )}
// // // // //             </div>
            
// // // // //             <div className="mb-4">
// // // // //               {isSearchableField ? (
// // // // //                 <EnhancedSearchableInput
// // // // //                   step={currentStepName}
// // // // //                   value={formData[currentStepName] || ""}
// // // // //                   onChange={handleChange}
// // // // //                   onSelect={handleSearchSelect}
// // // // //                 />
// // // // //               ) : (
// // // // //                 <select
// // // // //                   className="w-full px-4 py-3 text-sm border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-200"
// // // // //                   value={formData[currentStepName] || ""}
// // // // //                   onChange={handleChange}
// // // // //                 >
// // // // //                   <option value="">-- Select {currentStepName} --</option>
// // // // //                   {staticOptions[currentStepName]?.map((option) => (
// // // // //                     <option key={option} value={option}>{option}</option>
// // // // //                   ))}
// // // // //                 </select>
// // // // //               )}
// // // // //             </div>

// // // // //             {/* Navigation */}
// // // // //             <div className="flex gap-3">
// // // // //               {currentStep > 0 && (
// // // // //                 <button 
// // // // //                   className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
// // // // //                   onClick={handleBack}
// // // // //                 >
// // // // //                   ← Back
// // // // //                 </button>
// // // // //               )}
// // // // //               <button
// // // // //                 className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
// // // // //                   !formData[currentStepName] 
// // // // //                     ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
// // // // //                     : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 transform hover:scale-105'
// // // // //                 }`}
// // // // //                 onClick={handleNext}
// // // // //                 disabled={!formData[currentStepName]}
// // // // //               >
// // // // //                 {currentStep === steps.length - 1 ? "🎯 Predict" : "Next →"}
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>

          
// // // // //           <QuickPreview formData={formData} steps={steps} />

          
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default App;


// // // // import { useState, useEffect } from "react";
// // // // import { apiService } from './services/apiService';
// // // // import Logo from './assets/Logo.png'; // Uncomment when you have the logo

// // // // import EnhancedSearchableInput from './components/EnhancedSearchableInput';
// // // // import UpcomingMovieSearch from './components/UpcomingMovieSearch';
// // // // import PredictionResults from './components/PredictionResults';

// // // // function MainAppPage({ user, onLogout }) {
// // // //   const [formData, setFormData] = useState({});
// // // //   const [result, setResult] = useState(null);
// // // //   const [isLoading, setIsLoading] = useState(false);
// // // //   const [predictionHistory, setPredictionHistory] = useState([]);
// // // //   const [showUpcomingSearch, setShowUpcomingSearch] = useState(false);
// // // //   const [isLoadingHistory, setIsLoadingHistory] = useState(false);

// // // //   const steps = [
// // // //     "Director", "Genre", "Music Director", "Lead Singer",
// // // //     "Cast 1", "Cast 2", "Cast 3", "Cast 4", "Category", "Budget_Estimate"
// // // //   ];

// // // //   const staticOptions = {
// // // //     Genre: [
// // // //       "Action", "Horror", "Comedy", "Family Drama", "Romance", 
// // // //       "Thriller", "Sci-Fi", "Historical", "Musical", "Adventure"
// // // //     ],
// // // //     "Lead Singer": [
// // // //       "Diljit Dosanjh", "Arijit Singh", "Shreya Ghoshal", 
// // // //       "Rahat Fateh Ali Khan", "Sunidhi Chauhan", "Armaan Malik", 
// // // //       "Asees Kaur", "Shaan", "Various Artists", "Playback Singer"
// // // //     ],
// // // //     Category: [
// // // //       "None", "Religious/Political", "Political", 
// // // //       "Patriotic", "Social Issue", "Biographical"
// // // //     ],
// // // //     Budget_Estimate: [
// // // //       "Low (₹1-10 Cr)", "Medium (₹10-50 Cr)", "High (₹50-200 Cr)", "Blockbuster (₹200+ Cr)"
// // // //     ]
// // // //   };

// // // //   // Load prediction history on component mount
// // // //   useEffect(() => {
// // // //     loadPredictionHistory();
// // // //   }, []);

// // // //   const loadPredictionHistory = async () => {
// // // //     setIsLoadingHistory(true);
// // // //     try {
// // // //       const history = await apiService.getPredictionHistory(20);
// // // //       setPredictionHistory(history);
// // // //     } catch (error) {
// // // //       console.error('Failed to load prediction history:', error);
// // // //     } finally {
// // // //       setIsLoadingHistory(false);
// // // //     }
// // // //   };

// // // //   const getStepDisplayName = (stepName) => {
// // // //     switch(stepName) {
// // // //       case "Cast 1": return "Lead Actor/Actress";
// // // //       case "Cast 2": return "Supporting Actor/Actress";
// // // //       case "Cast 3": return "Character Actor";
// // // //       case "Cast 4": return "Additional Cast";
// // // //       case "Budget_Estimate": return "Budget Range";
// // // //       default: return stepName;
// // // //     }
// // // //   };

// // // //   const getStepIcon = (stepName) => {
// // // //     switch(stepName) {
// // // //       case "Director": return "🎬";
// // // //       case "Genre": return "🎭";
// // // //       case "Music Director": return "🎵";
// // // //       case "Lead Singer": return "🎤";
// // // //       case "Cast 1": return "⭐";
// // // //       case "Cast 2": return "🌟";
// // // //       case "Cast 3": return "✨";
// // // //       case "Cast 4": return "💫";
// // // //       case "Category": return "📂";
// // // //       case "Budget_Estimate": return "💰";
// // // //       default: return "🎯";
// // // //     }
// // // //   };

// // // //   const filledCount = Object.keys(formData).filter(key => formData[key]).length;
// // // //   const progressPercentage = (filledCount / steps.length) * 100;
// // // //   const isComplete = filledCount === steps.length;

// // // //   const handleFormChange = (fieldName, value) => {
// // // //     setFormData(prev => ({ ...prev, [fieldName]: value }));
// // // //   };

// // // //   const handleSearchSelect = (fieldName, value) => {
// // // //     setFormData(prev => ({ ...prev, [fieldName]: value }));
// // // //   };

// // // //   const handleUpcomingMovieSelect = (movieData) => {
// // // //     const newFormData = {
// // // //       "Director": movieData.director || "",
// // // //       "Genre": movieData.primary_genre || "",
// // // //       "Music Director": movieData.music_director || "",
// // // //       "Lead Singer": movieData.lead_singer || "",
// // // //       "Cast 1": movieData.cast_1 || "",
// // // //       "Cast 2": movieData.cast_2 || "",
// // // //       "Cast 3": movieData.cast_3 || "",
// // // //       "Cast 4": movieData.cast_4 || "",
// // // //       "Category": movieData.category || "None",
// // // //       "Budget_Estimate": "Medium (₹10-50 Cr)"
// // // //     };
    
// // // //     setFormData(newFormData);
// // // //     setShowUpcomingSearch(false);
// // // //   };

// // // //   const handlePredict = async () => {
// // // //     setIsLoading(true);
    
// // // //     try {
// // // //       const prediction = await apiService.predictMovie(formData);
      
// // // //       const resultData = {
// // // //         weekend: prediction.weekend,
// // // //         total: prediction.total,
// // // //         confidence: prediction.confidence,
// // // //         breakdown: prediction.breakdown,
// // // //         dataSource: prediction.data_source
// // // //       };

// // // //       setResult(resultData);

// // // //       // Save prediction to database
// // // //       try {
// // // //         await apiService.savePrediction(formData, resultData);
// // // //         // Reload history to show the new prediction
// // // //         await loadPredictionHistory();
// // // //       } catch (saveError) {
// // // //         console.error('Failed to save prediction:', saveError);
// // // //       }

// // // //     } catch (error) {
// // // //       console.error('Prediction failed:', error);
// // // //       alert(`Prediction failed: ${error.message}`);
// // // //     } finally {
// // // //       setIsLoading(false);
// // // //     }
// // // //   };

// // // //   const handleReset = () => {
// // // //     setFormData({});
// // // //     setResult(null);
// // // //   };

// // // //   const handleLogout = async () => {
// // // //     try {
// // // //       await apiService.logout();
// // // //     } catch (error) {
// // // //       console.error('Logout error:', error);
// // // //     } finally {
// // // //       localStorage.removeItem('authToken');
// // // //       localStorage.removeItem('user');
// // // //       onLogout();
// // // //     }
// // // //   };

// // // //   // Show different screens
// // // //   if (showUpcomingSearch) {
// // // //     return (
// // // //       <UpcomingMovieSearch
// // // //         onMovieSelect={handleUpcomingMovieSelect}
// // // //         onClose={() => setShowUpcomingSearch(false)}
// // // //       />
// // // //     );
// // // //   }

// // // //   if (isLoading) {
// // // //     return (
// // // //       <div className="fixed inset-0 bg-gradient-to-br from-white to-blue-50 flex items-center justify-center z-50">
// // // //         <div className="bg-white shadow-xl rounded-2xl p-8 text-center max-w-sm w-full mx-4 border border-blue-100">
// // // //           <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
// // // //           <h3 className="text-xl font-bold text-blue-800 mb-2">🎬 Analyzing Your Movie</h3>
// // // //           <p className="text-sm text-blue-600">Fetching TMDB performance data...</p>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (result) {
// // // //     return (
// // // //       <PredictionResults 
// // // //         result={result}
// // // //         formData={formData}
// // // //         onReset={handleReset}
// // // //       />
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-50 flex flex-col">
// // // //       {/* Header */}
// // // //       <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
// // // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // // //           <div className="flex justify-between items-center h-16">
// // // //             {/* Logo and Title */}
// // // //             <div className="flex items-center space-x-4">
// // // //               <div className="flex items-center space-x-3">
// // // //                 {/* <img src={Logo} alt="TMDB Predictor" className="h-8 w-8" /> */}
// // // //                 <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
// // // //                   🎬
// // // //                 </div>
// // // //                 <div>
// // // //                   <h1 className="text-xl font-bold text-gray-900">TMDB Box Office Predictor</h1>
// // // //                   <p className="text-xs text-gray-500">Professional Edition</p>
// // // //                 </div>
// // // //               </div>
// // // //             </div>

// // // //             {/* User Info and Actions */}
// // // //             <div className="flex items-center space-x-4">
// // // //               <button
// // // //                 onClick={() => setShowUpcomingSearch(true)}
// // // //                 className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-200"
// // // //               >
// // // //                 <span className="text-sm">🔮</span>
// // // //                 <span className="text-sm font-medium">Upcoming Movies</span>
// // // //               </button>
              
// // // //               <div className="flex items-center space-x-3">
// // // //                 <div className="text-right">
// // // //                   <p className="text-sm font-medium text-gray-900">{user?.username}</p>
// // // //                   <p className="text-xs text-gray-500">{user?.email}</p>
// // // //                 </div>
// // // //                 <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
// // // //                   <span className="text-white text-sm font-bold">
// // // //                     {user?.username?.charAt(0).toUpperCase()}
// // // //                   </span>
// // // //                 </div>
// // // //               </div>

// // // //               <button
// // // //                 onClick={handleLogout}
// // // //                 className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors duration-200"
// // // //               >
// // // //                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
// // // //                 </svg>
// // // //                 <span className="text-sm font-medium">Logout</span>
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </header>

// // // //       {/* Main Content */}
// // // //       <div className="flex-1 flex overflow-hidden">
// // // //         {/* Left Sidebar - Form */}
// // // //         <div className="w-1/2 bg-white border-r border-gray-200 overflow-y-auto">
// // // //           <div className="p-6">
// // // //             <div className="mb-6">
// // // //               <h2 className="text-2xl font-bold text-gray-900 mb-2">🎬 Movie Setup</h2>
// // // //               <p className="text-gray-600">Fill in all the details to predict box office performance</p>
              
// // // //               {/* Progress Bar */}
// // // //               <div className="mt-4">
// // // //                 <div className="flex justify-between items-center mb-2">
// // // //                   <span className="text-sm font-medium text-gray-700">
// // // //                     Progress: {filledCount}/{steps.length} fields
// // // //                   </span>
// // // //                   <span className="text-sm font-medium text-blue-600">
// // // //                     {Math.round(progressPercentage)}%
// // // //                   </span>
// // // //                 </div>
// // // //                 <div className="w-full bg-gray-200 rounded-full h-2">
// // // //                   <div 
// // // //                     className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
// // // //                     style={{ width: `${progressPercentage}%` }}
// // // //                   />
// // // //                 </div>
// // // //               </div>
// // // //             </div>

// // // //             {/* Form Fields */}
// // // //             <div className="space-y-6">
// // // //               {steps.map((stepName, index) => {
// // // //                 const isSearchableField = [
// // // //                   "Director", "Cast 1", "Cast 2", "Cast 3", "Cast 4", 
// // // //                   "Music Director", "Lead Singer"
// // // //                 ].includes(stepName);

// // // //                 return (
// // // //                   <div key={stepName} className="bg-gray-50 rounded-xl p-5 border border-gray-100 hover:border-gray-200 transition-colors duration-200">
// // // //                     <div className="flex items-center gap-3 mb-4">
// // // //                       <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
// // // //                         formData[stepName] 
// // // //                           ? 'bg-green-100 text-green-700 border-2 border-green-200' 
// // // //                           : 'bg-gray-100 text-gray-500 border-2 border-gray-200'
// // // //                       }`}>
// // // //                         {formData[stepName] ? '✓' : index + 1}
// // // //                       </div>
// // // //                       <div className="flex-1">
// // // //                         <h3 className="font-semibold text-gray-900 flex items-center gap-2">
// // // //                           <span>{getStepIcon(stepName)}</span>
// // // //                           {getStepDisplayName(stepName)}
// // // //                         </h3>
// // // //                         {isSearchableField && (
// // // //                           <p className="text-xs text-gray-500 mt-1">
// // // //                             Search from TMDB database
// // // //                           </p>
// // // //                         )}
// // // //                       </div>
// // // //                     </div>

// // // //                     <div className="ml-11">
// // // //                       {isSearchableField ? (
// // // //                         <EnhancedSearchableInput
// // // //                           step={stepName}
// // // //                           value={formData[stepName] || ""}
// // // //                           onChange={(e) => handleFormChange(stepName, e.target.value)}
// // // //                           onSelect={(value) => handleSearchSelect(stepName, value)}
// // // //                         />
// // // //                       ) : (
// // // //                         <select
// // // //                           className="w-full px-4 py-3 text-sm bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-300"
// // // //                           value={formData[stepName] || ""}
// // // //                           onChange={(e) => handleFormChange(stepName, e.target.value)}
// // // //                         >
// // // //                           <option value="">Choose {getStepDisplayName(stepName)}</option>
// // // //                           {staticOptions[stepName]?.map((option) => (
// // // //                             <option key={option} value={option}>{option}</option>
// // // //                           ))}
// // // //                         </select>
// // // //                       )}
// // // //                     </div>
// // // //                   </div>
// // // //                 );
// // // //               })}
// // // //             </div>

// // // //             {/* Action Buttons */}
// // // //             <div className="mt-8 flex gap-4">
// // // //               <button
// // // //                 onClick={handleReset}
// // // //                 className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 flex items-center justify-center space-x-2"
// // // //               >
// // // //                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
// // // //                 </svg>
// // // //                 <span>Reset Form</span>
// // // //               </button>
// // // //               <button
// // // //                 onClick={handlePredict}
// // // //                 disabled={!isComplete}
// // // //                 className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
// // // //                   isComplete
// // // //                     ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 shadow-lg'
// // // //                     : 'bg-gray-200 text-gray-400 cursor-not-allowed'
// // // //                 }`}
// // // //               >
// // // //                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
// // // //                 </svg>
// // // //                 <span>Generate Prediction</span>
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         {/* Right Sidebar - History & Preview */}
// // // //         <div className="w-1/2 bg-gray-50 overflow-y-auto">
// // // //           <div className="p-6">
// // // //             {/* Movie Preview Section */}
// // // //             <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
// // // //               <div className="p-6">
// // // //                 <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
// // // //                   🎬 Movie Preview
// // // //                   <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
// // // //                     {filledCount}/{steps.length}
// // // //                   </span>
// // // //                 </h3>

// // // //                 {/* Movie Poster Placeholder */}
// // // //                 <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl aspect-[2/3] flex items-center justify-center mb-6 border-2 border-dashed border-gray-300">
// // // //                   <div className="text-center">
// // // //                     <div className="text-4xl mb-2">🎬</div>
// // // //                     <p className="text-sm text-gray-500 font-medium">Movie Poster</p>
// // // //                     <p className="text-xs text-gray-400">Preview</p>
// // // //                   </div>
// // // //                 </div>

// // // //                 {/* Form Data Preview */}
// // // //                 {filledCount > 0 ? (
// // // //                   <div className="space-y-3">
// // // //                     <h4 className="font-semibold text-gray-900 border-b border-gray-200 pb-2">
// // // //                       Cast & Crew Details
// // // //                     </h4>
                    
// // // //                     {steps.map((stepName) => {
// // // //                       const value = formData[stepName];
// // // //                       if (!value) return null;
                      
// // // //                       return (
// // // //                         <div key={stepName} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
// // // //                           <span className="text-lg">{getStepIcon(stepName)}</span>
// // // //                           <div className="flex-1 min-w-0">
// // // //                             <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
// // // //                               {getStepDisplayName(stepName)}
// // // //                             </p>
// // // //                             <p className="text-sm font-semibold text-gray-900 truncate">
// // // //                               {value}
// // // //                             </p>
// // // //                           </div>
// // // //                         </div>
// // // //                       );
// // // //                     })}
// // // //                   </div>
// // // //                 ) : (
// // // //                   <div className="text-center py-8">
// // // //                     <div className="text-3xl mb-3">📝</div>
// // // //                     <p className="text-gray-500 font-medium mb-1">Start Building</p>
// // // //                     <p className="text-xs text-gray-400">
// // // //                       Fill the form to see preview
// // // //                     </p>
// // // //                   </div>
// // // //                 )}
// // // //               </div>
// // // //             </div>

// // // //             {/* Prediction History Section */}
// // // //             <div className="bg-white rounded-xl shadow-sm border border-gray-200">
// // // //               <div className="p-6">
// // // //                 <div className="flex justify-between items-center mb-4">
// // // //                   <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
// // // //                     📊 Prediction History
// // // //                   </h3>
// // // //                   <button
// // // //                     onClick={loadPredictionHistory}
// // // //                     className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
// // // //                   >
// // // //                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
// // // //                     </svg>
// // // //                     Refresh
// // // //                   </button>
// // // //                 </div>

// // // //                 {isLoadingHistory ? (
// // // //                   <div className="flex items-center justify-center py-8">
// // // //                     <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-3"></div>
// // // //                     <span className="text-gray-500">Loading history...</span>
// // // //                   </div>
// // // //                 ) : predictionHistory.length > 0 ? (
// // // //                   <div className="space-y-3 max-h-96 overflow-y-auto">
// // // //                     {predictionHistory.map((pred, index) => (
// // // //                       <div key={pred.id} className="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:border-gray-200 transition-colors duration-200">
// // // //                         <div className="flex justify-between items-start mb-2">
// // // //                           <div className="flex-1">
// // // //                             <h4 className="font-semibold text-gray-900 text-sm">
// // // //                               {pred.movie_data.Director ? `${pred.movie_data.Director}'s Film` : 'Untitled Movie'}
// // // //                             </h4>
// // // //                             <p className="text-xs text-gray-600 mt-1">
// // // //                               {pred.movie_data.Genre} • {pred.movie_data['Cast 1'] || 'Unknown Cast'}
// // // //                             </p>
// // // //                           </div>
// // // //                           <div className="text-right">
// // // //                             <p className="font-bold text-green-600 text-sm">₹{pred.prediction.total} Cr</p>
// // // //                             <p className="text-xs text-gray-500">
// // // //                               {new Date(pred.created_at).toLocaleDateString()}
// // // //                             </p>
// // // //                           </div>
// // // //                         </div>
// // // //                         <div className="flex items-center justify-between text-xs text-gray-500">
// // // //                           <span>Weekend: ₹{pred.prediction.weekend} Cr</span>
// // // //                           <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
// // // //                             {pred.prediction.confidence}% confidence
// // // //                           </span>
// // // //                         </div>
// // // //                       </div>
// // // //                     ))}
// // // //                   </div>
// // // //                 ) : (
// // // //                   <div className="text-center py-8">
// // // //                     <div className="text-3xl mb-3">📈</div>
// // // //                     <p className="text-gray-500 font-medium mb-1">No Predictions Yet</p>
// // // //                     <p className="text-xs text-gray-400">
// // // //                       Your prediction history will appear here
// // // //                     </p>
// // // //                   </div>
// // // //                 )}
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* Footer */}
// // // //       <footer className="bg-white border-t border-gray-200">
// // // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
// // // //           <div className="flex justify-between items-center">
// // // //             <div className="flex items-center space-x-4 text-sm text-gray-500">
// // // //               <div className="flex items-center space-x-2">
// // // //                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
// // // //                 </svg>
// // // //                 <span>Powered by TMDB Database</span>
// // // //               </div>
// // // //               <span>•</span>
// // // //               <span>Professional Box Office Predictions</span>
// // // //             </div>
// // // //             <div className="text-sm text-gray-500">
// // // //               © 2025 TMDB Box Office Predictor
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </footer>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default MainAppPage;
// // // import { useState, useEffect } from "react";
// // // import { apiService } from './services/apiService';
// // // import Logo from './assets/Logo.png'; // Uncomment when you have the logo

// // // import EnhancedSearchableInput from './components/EnhancedSearchableInput';
// // // import UpcomingMovieSearch from './components/UpcomingMovieSearch';
// // // import PredictionResults from './components/PredictionResults';

// // // function MainAppPage({ user, onLogout }) {
// // //   const [formData, setFormData] = useState({});
// // //   const [result, setResult] = useState(null);
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [predictionHistory, setPredictionHistory] = useState([]);
// // //   const [showUpcomingSearch, setShowUpcomingSearch] = useState(false);
// // //   const [isLoadingHistory, setIsLoadingHistory] = useState(false);

// // //   const steps = [
// // //     "Director", "Genre", "Music Director", "Lead Singer",
// // //     "Cast 1", "Cast 2", "Cast 3", "Cast 4", "Category", "Budget_Estimate"
// // //   ];

// // //   const staticOptions = {
// // //     Genre: [
// // //       "Action", "Horror", "Comedy", "Family Drama", "Romance", 
// // //       "Thriller", "Sci-Fi", "Historical", "Musical", "Adventure"
// // //     ],
// // //     "Lead Singer": [
// // //       "Diljit Dosanjh", "Arijit Singh", "Shreya Ghoshal", 
// // //       "Rahat Fateh Ali Khan", "Sunidhi Chauhan", "Armaan Malik", 
// // //       "Asees Kaur", "Shaan", "Various Artists", "Playback Singer"
// // //     ],
// // //     Category: [
// // //       "None", "Religious/Political", "Political", 
// // //       "Patriotic", "Social Issue", "Biographical"
// // //     ],
// // //     Budget_Estimate: [
// // //       "Low (₹1-10 Cr)", "Medium (₹10-50 Cr)", "High (₹50-200 Cr)", "Blockbuster (₹200+ Cr)"
// // //     ]
// // //   };

// // //   // Load prediction history on component mount
// // //   useEffect(() => {
// // //     loadPredictionHistory();
// // //   }, []);

// // //   const loadPredictionHistory = async () => {
// // //     setIsLoadingHistory(true);
// // //     try {
// // //       const history = await apiService.getPredictionHistory(20);
// // //       setPredictionHistory(history);
// // //     } catch (error) {
// // //       console.error('Failed to load prediction history:', error);
// // //     } finally {
// // //       setIsLoadingHistory(false);
// // //     }
// // //   };

// // //   const getStepDisplayName = (stepName) => {
// // //     switch(stepName) {
// // //       case "Cast 1": return "Lead Actor/Actress";
// // //       case "Cast 2": return "Supporting Actor/Actress";
// // //       case "Cast 3": return "Character Actor";
// // //       case "Cast 4": return "Additional Cast";
// // //       case "Budget_Estimate": return "Budget Range";
// // //       default: return stepName;
// // //     }
// // //   };

// // //   const getStepIcon = (stepName) => {
// // //     switch(stepName) {
// // //       case "Director": return "🎬";
// // //       case "Genre": return "🎭";
// // //       case "Music Director": return "🎵";
// // //       case "Lead Singer": return "🎤";
// // //       case "Cast 1": return "⭐";
// // //       case "Cast 2": return "🌟";
// // //       case "Cast 3": return "✨";
// // //       case "Cast 4": return "💫";
// // //       case "Category": return "📂";
// // //       case "Budget_Estimate": return "💰";
// // //       default: return "🎯";
// // //     }
// // //   };

// // //   const filledCount = Object.keys(formData).filter(key => formData[key]).length;
// // //   const progressPercentage = (filledCount / steps.length) * 100;
// // //   const isComplete = filledCount === steps.length;

// // //   const handleFormChange = (fieldName, value) => {
// // //     setFormData(prev => ({ ...prev, [fieldName]: value }));
// // //   };

// // //   const handleSearchSelect = (fieldName, value) => {
// // //     setFormData(prev => ({ ...prev, [fieldName]: value }));
// // //   };

// // //   const handleUpcomingMovieSelect = (movieData) => {
// // //     const newFormData = {
// // //       "Director": movieData.director || "",
// // //       "Genre": movieData.primary_genre || "",
// // //       "Music Director": movieData.music_director || "",
// // //       "Lead Singer": movieData.lead_singer || "",
// // //       "Cast 1": movieData.cast_1 || "",
// // //       "Cast 2": movieData.cast_2 || "",
// // //       "Cast 3": movieData.cast_3 || "",
// // //       "Cast 4": movieData.cast_4 || "",
// // //       "Category": movieData.category || "None",
// // //       "Budget_Estimate": "Medium (₹10-50 Cr)"
// // //     };
    
// // //     setFormData(newFormData);
// // //     setShowUpcomingSearch(false);
// // //   };

// // //   const handlePredict = async () => {
// // //     setIsLoading(true);
    
// // //     try {
// // //       const prediction = await apiService.predictMovie(formData);
      
// // //       const resultData = {
// // //         weekend: prediction.weekend,
// // //         total: prediction.total,
// // //         confidence: prediction.confidence,
// // //         breakdown: prediction.breakdown,
// // //         dataSource: prediction.data_source
// // //       };

// // //       setResult(resultData);

// // //       // Save prediction to database
// // //       try {
// // //         await apiService.savePrediction(formData, resultData);
// // //         // Reload history to show the new prediction
// // //         await loadPredictionHistory();
// // //       } catch (saveError) {
// // //         console.error('Failed to save prediction:', saveError);
// // //       }

// // //     } catch (error) {
// // //       console.error('Prediction failed:', error);
// // //       alert(`Prediction failed: ${error.message}`);
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   const handleReset = () => {
// // //     setFormData({});
// // //     setResult(null);
// // //   };

// // //   const handleLogout = async () => {
// // //     try {
// // //       await apiService.logout();
// // //     } catch (error) {
// // //       console.error('Logout error:', error);
// // //     } finally {
// // //       localStorage.removeItem('authToken');
// // //       localStorage.removeItem('user');
// // //       onLogout();
// // //     }
// // //   };

// // //   // Show different screens
// // //   if (showUpcomingSearch) {
// // //     return (
// // //       <UpcomingMovieSearch
// // //         onMovieSelect={handleUpcomingMovieSelect}
// // //         onClose={() => setShowUpcomingSearch(false)}
// // //       />
// // //     );
// // //   }

// // //   if (isLoading) {
// // //     return (
// // //       <div className="fixed inset-0 bg-gradient-to-br from-white to-blue-50 flex items-center justify-center z-50">
// // //         <div className="bg-white shadow-xl rounded-2xl p-8 text-center max-w-sm w-full mx-4 border border-blue-100">
// // //           <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
// // //           <h3 className="text-xl font-bold text-blue-800 mb-2">🎬 Analyzing Your Movie</h3>
// // //           <p className="text-sm text-blue-600">Fetching Box Office performance data...</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (result) {
// // //     return (
// // //       <PredictionResults 
// // //         result={result}
// // //         formData={formData}
// // //         onReset={handleReset}
// // //       />
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-gray-50 flex flex-col">
// // //       {/* Header */}
// // //       <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
// // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // //           <div className="flex justify-between items-center h-16">
// // //             {/* Logo and Title */}
// // //             <div className="flex items-center space-x-4">
// // //               <div className="flex items-center space-x-3">
// // //                 {/* <img src={Logo} alt="Box Office Predictor" className="h-8 w-8" /> */}
// // //                 <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
// // //                   🎬
// // //                 </div>
// // //                 <div>
// // //                   <h1 className="text-xl font-bold text-gray-900">Box Office Predictor</h1>
// // //                   <p className="text-xs text-gray-500">Professional Edition</p>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {/* User Info and Actions */}
// // //             <div className="flex items-center space-x-4">
// // //               <button
// // //                 onClick={() => setShowUpcomingSearch(true)}
// // //                 className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-200"
// // //               >
// // //                 <span className="text-sm">🔮</span>
// // //                 <span className="text-sm font-medium">Upcoming Movies</span>
// // //               </button>
              
// // //               <div className="flex items-center space-x-3">
// // //                 <div className="text-right">
// // //                   <p className="text-sm font-medium text-gray-900">{user?.username}</p>
// // //                   <p className="text-xs text-gray-500">{user?.email}</p>
// // //                 </div>
// // //                 <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
// // //                   <span className="text-white text-sm font-bold">
// // //                     {user?.username?.charAt(0).toUpperCase()}
// // //                   </span>
// // //                 </div>
// // //               </div>

// // //               <button
// // //                 onClick={handleLogout}
// // //                 className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors duration-200"
// // //               >
// // //                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
// // //                 </svg>
// // //                 <span className="text-sm font-medium">Logout</span>
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </header>

// // //       {/* Main Content */}
// // //       <div className="flex-1 flex overflow-hidden">
// // //         {/* Left Sidebar - Form */}
// // //         <div className="w-1/2 bg-white border-r border-gray-200 overflow-y-auto">
// // //           <div className="p-6">
// // //             <div className="mb-6">
// // //               <h2 className="text-2xl font-bold text-gray-900 mb-2">🎬 Movie Setup</h2>
// // //               <p className="text-gray-600">Fill in all the details to predict box office performance</p>
              
// // //               {/* Progress Bar */}
// // //               <div className="mt-4">
// // //                 <div className="flex justify-between items-center mb-2">
// // //                   <span className="text-sm font-medium text-gray-700">
// // //                     Progress: {filledCount}/{steps.length} fields
// // //                   </span>
// // //                   <span className="text-sm font-medium text-blue-600">
// // //                     {Math.round(progressPercentage)}%
// // //                   </span>
// // //                 </div>
// // //                 <div className="w-full bg-gray-200 rounded-full h-2">
// // //                   <div 
// // //                     className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
// // //                     style={{ width: `${progressPercentage}%` }}
// // //                   />
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {/* Form Fields */}
// // //             <div className="space-y-6">
// // //               {steps.map((stepName, index) => {
// // //                 const isSearchableField = [
// // //                   "Director", "Cast 1", "Cast 2", "Cast 3", "Cast 4", 
// // //                   "Music Director", "Lead Singer"
// // //                 ].includes(stepName);

// // //                 return (
// // //                   <div key={stepName} className="bg-gray-50 rounded-xl p-5 border border-gray-100 hover:border-gray-200 transition-colors duration-200">
// // //                     <div className="flex items-center gap-3 mb-4">
// // //                       <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
// // //                         formData[stepName] 
// // //                           ? 'bg-green-100 text-green-700 border-2 border-green-200' 
// // //                           : 'bg-gray-100 text-gray-500 border-2 border-gray-200'
// // //                       }`}>
// // //                         {formData[stepName] ? '✓' : index + 1}
// // //                       </div>
// // //                       <div className="flex-1">
// // //                         <h3 className="font-semibold text-gray-900 flex items-center gap-2">
// // //                           <span>{getStepIcon(stepName)}</span>
// // //                           {getStepDisplayName(stepName)}
// // //                         </h3>
// // //                         {isSearchableField && (
// // //                           <p className="text-xs text-gray-500 mt-1">
// // //                             Search from Box Office database
// // //                           </p>
// // //                         )}
// // //                       </div>
// // //                     </div>

// // //                     <div className="ml-11">
// // //                       {isSearchableField ? (
// // //                         <EnhancedSearchableInput
// // //                           step={stepName}
// // //                           value={formData[stepName] || ""}
// // //                           onChange={(e) => handleFormChange(stepName, e.target.value)}
// // //                           onSelect={(value) => handleSearchSelect(stepName, value)}
// // //                         />
// // //                       ) : (
// // //                         <select
// // //                           className="w-full px-4 py-3 text-sm bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-300"
// // //                           value={formData[stepName] || ""}
// // //                           onChange={(e) => handleFormChange(stepName, e.target.value)}
// // //                         >
// // //                           <option value="">Choose {getStepDisplayName(stepName)}</option>
// // //                           {staticOptions[stepName]?.map((option) => (
// // //                             <option key={option} value={option}>{option}</option>
// // //                           ))}
// // //                         </select>
// // //                       )}
// // //                     </div>
// // //                   </div>
// // //                 );
// // //               })}
// // //             </div>

// // //             {/* Action Buttons */}
// // //             <div className="mt-8 flex gap-4">
// // //               <button
// // //                 onClick={handleReset}
// // //                 className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 flex items-center justify-center space-x-2"
// // //               >
// // //                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
// // //                 </svg>
// // //                 <span>Reset Form</span>
// // //               </button>
// // //               <button
// // //                 onClick={handlePredict}
// // //                 disabled={!isComplete}
// // //                 className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
// // //                   isComplete
// // //                     ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 shadow-lg'
// // //                     : 'bg-gray-200 text-gray-400 cursor-not-allowed'
// // //                 }`}
// // //               >
// // //                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
// // //                 </svg>
// // //                 <span>Generate Prediction</span>
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Right Sidebar - History & Preview */}
// // //         <div className="w-1/2 bg-gray-50 overflow-y-auto">
// // //           <div className="p-6">
// // //             {/* Movie Preview Section */}
// // //             <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
// // //               <div className="p-6">
// // //                 <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
// // //                   🎬 Movie Preview
// // //                   <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
// // //                     {filledCount}/{steps.length}
// // //                   </span>
// // //                 </h3>

// // //                 {/* Movie Poster Placeholder */}
// // //                 <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl aspect-[2/3] flex items-center justify-center mb-6 border-2 border-dashed border-gray-300">
// // //                   <div className="text-center">
// // //                     <div className="text-4xl mb-2">🎬</div>
// // //                     <p className="text-sm text-gray-500 font-medium">Movie Poster</p>
// // //                     <p className="text-xs text-gray-400">Preview</p>
// // //                   </div>
// // //                 </div>

// // //                 {/* Form Data Preview */}
// // //                 {filledCount > 0 ? (
// // //                   <div className="space-y-3">
// // //                     <h4 className="font-semibold text-gray-900 border-b border-gray-200 pb-2">
// // //                       Cast & Crew Details
// // //                     </h4>
                    
// // //                     {steps.map((stepName) => {
// // //                       const value = formData[stepName];
// // //                       if (!value) return null;
                      
// // //                       return (
// // //                         <div key={stepName} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
// // //                           <span className="text-lg">{getStepIcon(stepName)}</span>
// // //                           <div className="flex-1 min-w-0">
// // //                             <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
// // //                               {getStepDisplayName(stepName)}
// // //                             </p>
// // //                             <p className="text-sm font-semibold text-gray-900 truncate">
// // //                               {value}
// // //                             </p>
// // //                           </div>
// // //                         </div>
// // //                       );
// // //                     })}
// // //                   </div>
// // //                 ) : (
// // //                   <div className="text-center py-8">
// // //                     <div className="text-3xl mb-3">📝</div>
// // //                     <p className="text-gray-500 font-medium mb-1">Start Building</p>
// // //                     <p className="text-xs text-gray-400">
// // //                       Fill the form to see preview
// // //                     </p>
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             </div>

// // //             {/* Prediction History Section */}
// // //             <div className="bg-white rounded-xl shadow-sm border border-gray-200">
// // //               <div className="p-6">
// // //                 <div className="flex justify-between items-center mb-4">
// // //                   <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
// // //                     📊 Prediction History
// // //                   </h3>
// // //                   <button
// // //                     onClick={loadPredictionHistory}
// // //                     className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
// // //                   >
// // //                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
// // //                     </svg>
// // //                     Refresh
// // //                   </button>
// // //                 </div>

// // //                 {isLoadingHistory ? (
// // //                   <div className="flex items-center justify-center py-8">
// // //                     <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-3"></div>
// // //                     <span className="text-gray-500">Loading history...</span>
// // //                   </div>
// // //                 ) : predictionHistory.length > 0 ? (
// // //                   <div className="space-y-3 max-h-96 overflow-y-auto">
// // //                     {predictionHistory.map((pred, index) => (
// // //                       <div key={pred.id} className="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:border-gray-200 transition-colors duration-200">
// // //                         <div className="flex justify-between items-start mb-2">
// // //                           <div className="flex-1">
// // //                             <h4 className="font-semibold text-gray-900 text-sm">
// // //                               {pred.movie_data.Director ? `${pred.movie_data.Director}'s Film` : 'Untitled Movie'}
// // //                             </h4>
// // //                             <p className="text-xs text-gray-600 mt-1">
// // //                               {pred.movie_data.Genre} • {pred.movie_data['Cast 1'] || 'Unknown Cast'}
// // //                             </p>
// // //                           </div>
// // //                           <div className="text-right">
// // //                             <p className="font-bold text-green-600 text-sm">₹{pred.prediction.total} Cr</p>
// // //                             <p className="text-xs text-gray-500">
// // //                               {new Date(pred.created_at).toLocaleDateString()}
// // //                             </p>
// // //                           </div>
// // //                         </div>
// // //                         <div className="flex items-center justify-between text-xs text-gray-500">
// // //                           <span>Weekend: ₹{pred.prediction.weekend} Cr</span>
// // //                           <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
// // //                             {pred.prediction.confidence}% confidence
// // //                           </span>
// // //                         </div>
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 ) : (
// // //                   <div className="text-center py-8">
// // //                     <div className="text-3xl mb-3">📈</div>
// // //                     <p className="text-gray-500 font-medium mb-1">No Predictions Yet</p>
// // //                     <p className="text-xs text-gray-400">
// // //                       Your prediction history will appear here
// // //                     </p>
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Footer */}
// // //       <footer className="bg-white border-t border-gray-200">
// // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
// // //           <div className="flex justify-between items-center">
// // //             <div className="flex items-center space-x-4 text-sm text-gray-500">
// // //               <div className="flex items-center space-x-2">
// // //                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
// // //                 </svg>
// // //                 <span>Powered by Box Office Database</span>
// // //               </div>
// // //               <span>•</span>
// // //               <span>Professional Box Office Predictions</span>
// // //             </div>
// // //             <div className="text-sm text-gray-500">
// // //               © 2025 Box Office Predictor
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </footer>
// // //     </div>
// // //   );
// // // }

// // // export default MainAppPage;
// // import { useState, useEffect } from "react";
// // import { apiService } from './services/apiService';
// // import Logo from './assets/Logo.png'; // Uncomment when you have the logo

// // import EnhancedSearchableInput from './components/EnhancedSearchableInput';
// // import UpcomingMovieSearch from './components/UpcomingMovieSearch';
// // import PredictionResults from './components/PredictionResults';

// // function MainAppPage({ user, onLogout }) {
// //   const [formData, setFormData] = useState({});
// //   const [result, setResult] = useState(null);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [predictionHistory, setPredictionHistory] = useState([]);
// //   const [showUpcomingSearch, setShowUpcomingSearch] = useState(false);
// //   const [isLoadingHistory, setIsLoadingHistory] = useState(false);

// //   const steps = [
// //     "Director", "Genre", "Music Director", "Lead Singer",
// //     "Cast 1", "Cast 2", "Cast 3", "Cast 4", "Category", "Budget_Estimate"
// //   ];

// //   const staticOptions = {
// //     Genre: [
// //       "Action", "Horror", "Comedy", "Family Drama", "Romance", 
// //       "Thriller", "Sci-Fi", "Historical", "Musical", "Adventure"
// //     ],
// //     "Lead Singer": [
// //       "Diljit Dosanjh", "Arijit Singh", "Shreya Ghoshal", 
// //       "Rahat Fateh Ali Khan", "Sunidhi Chauhan", "Armaan Malik", 
// //       "Asees Kaur", "Shaan", "Various Artists", "Playback Singer"
// //     ],
// //     Category: [
// //       "None", "Religious/Political", "Political", 
// //       "Patriotic", "Social Issue", "Biographical"
// //     ],
// //     Budget_Estimate: [
// //       "Low (₹1-10 Cr)", "Medium (₹10-50 Cr)", "High (₹50-200 Cr)", "Blockbuster (₹200+ Cr)"
// //     ]
// //   };

// //   // Load prediction history on component mount
// //   useEffect(() => {
// //     loadPredictionHistory();
// //   }, []);

// //   const loadPredictionHistory = async () => {
// //     setIsLoadingHistory(true);
// //     try {
// //       const history = await apiService.getPredictionHistory(20);
// //       setPredictionHistory(history);
// //     } catch (error) {
// //       console.error('Failed to load prediction history:', error);
// //     } finally {
// //       setIsLoadingHistory(false);
// //     }
// //   };

// //   const getStepDisplayName = (stepName) => {
// //     switch(stepName) {
// //       case "Cast 1": return "Lead Actor/Actress";
// //       case "Cast 2": return "Supporting Actor/Actress";
// //       case "Cast 3": return "Character Actor";
// //       case "Cast 4": return "Additional Cast";
// //       case "Budget_Estimate": return "Budget Range";
// //       default: return stepName;
// //     }
// //   };

// //   const getStepIcon = (stepName) => {
// //     switch(stepName) {
// //       case "Director": return "🎬";
// //       case "Genre": return "🎭";
// //       case "Music Director": return "🎵";
// //       case "Lead Singer": return "🎤";
// //       case "Cast 1": return "⭐";
// //       case "Cast 2": return "🌟";
// //       case "Cast 3": return "✨";
// //       case "Cast 4": return "💫";
// //       case "Category": return "📂";
// //       case "Budget_Estimate": return "💰";
// //       default: return "🎯";
// //     }
// //   };

// //   const filledCount = Object.keys(formData).filter(key => formData[key]).length;
// //   const progressPercentage = (filledCount / steps.length) * 100;
// //   const isComplete = filledCount === steps.length;

// //   const handleFormChange = (fieldName, value) => {
// //     setFormData(prev => ({ ...prev, [fieldName]: value }));
// //   };

// //   const handleSearchSelect = (fieldName, value) => {
// //     setFormData(prev => ({ ...prev, [fieldName]: value }));
// //   };

// //   const handleUpcomingMovieSelect = (movieData) => {
// //     const newFormData = {
// //       "Director": movieData.director || "",
// //       "Genre": movieData.primary_genre || "",
// //       "Music Director": movieData.music_director || "",
// //       "Lead Singer": movieData.lead_singer || "",
// //       "Cast 1": movieData.cast_1 || "",
// //       "Cast 2": movieData.cast_2 || "",
// //       "Cast 3": movieData.cast_3 || "",
// //       "Cast 4": movieData.cast_4 || "",
// //       "Category": movieData.category || "None",
// //       "Budget_Estimate": "Medium (₹10-50 Cr)"
// //     };
    
// //     setFormData(newFormData);
// //     setShowUpcomingSearch(false);
// //   };

// //   const handlePredict = async () => {
// //     setIsLoading(true);
    
// //     try {
// //       const prediction = await apiService.predictMovie(formData);
      
// //       const resultData = {
// //         weekend: prediction.weekend,
// //         total: prediction.total,
// //         confidence: prediction.confidence,
// //         breakdown: prediction.breakdown,
// //         dataSource: prediction.data_source
// //       };

// //       setResult(resultData);

// //       // Save prediction to database
// //       try {
// //         await apiService.savePrediction(formData, resultData);
// //         // Reload history to show the new prediction
// //         await loadPredictionHistory();
// //       } catch (saveError) {
// //         console.error('Failed to save prediction:', saveError);
// //       }

// //     } catch (error) {
// //       console.error('Prediction failed:', error);
// //       alert(`Prediction failed: ${error.message}`);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleReset = () => {
// //     setFormData({});
// //     setResult(null);
// //   };

// //   const handleLogout = async () => {
// //     try {
// //       await apiService.logout();
// //     } catch (error) {
// //       console.error('Logout error:', error);
// //     } finally {
// //       localStorage.removeItem('authToken');
// //       localStorage.removeItem('user');
// //       onLogout();
// //     }
// //   };

// //   // Show different screens
// //   if (showUpcomingSearch) {
// //     return (
// //       <UpcomingMovieSearch
// //         onMovieSelect={handleUpcomingMovieSelect}
// //         onClose={() => setShowUpcomingSearch(false)}
// //       />
// //     );
// //   }

// //   if (isLoading) {
// //     return (
// //       <div className="fixed inset-0 bg-gradient-to-br from-white to-blue-50 flex items-center justify-center z-50">
// //         <div className="bg-white shadow-xl rounded-2xl p-8 text-center max-w-sm w-full mx-4 border border-blue-100">
// //           <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
// //           <h3 className="text-xl font-bold text-blue-800 mb-2">🎬 Analyzing Your Movie</h3>
// //           <p className="text-sm text-blue-600">Fetching Box Office performance data...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (result) {
// //     return (
// //       <PredictionResults 
// //         result={result}
// //         formData={formData}
// //         onReset={handleReset}
// //       />
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50 flex flex-col">
// //       {/* Header */}
// //       <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="flex justify-between items-center h-16">
// //             {/* Logo and Title */}
// //             <div className="flex items-center space-x-4">
// //               <div className="flex items-center space-x-3">
// //                 {/* <img src={Logo} alt="Box Office Predictor" className="h-8 w-8" /> */}
// //                 <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
// //                   🎬
// //                 </div>
// //                 <div>
// //                   <h1 className="text-xl font-bold text-gray-900">Box Office Predictor</h1>
// //                   <p className="text-xs text-gray-500">Professional Edition</p>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* User Info and Actions */}
// //             <div className="flex items-center space-x-4">
// //               {/* Upcoming Movies Button - More Prominent */}
// //               <button
// //                 onClick={() => setShowUpcomingSearch(true)}
// //                 className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
// //               >
// //                 <span className="text-sm">🔮</span>
// //                 <span className="text-sm font-medium">Upcoming Movies</span>
// //               </button>
              
// //               <div className="flex items-center space-x-3">
// //                 <div className="text-right">
// //                   <p className="text-sm font-medium text-gray-900">{user?.username}</p>
// //                   <p className="text-xs text-gray-500">{user?.email}</p>
// //                 </div>
// //                 <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
// //                   <span className="text-white text-sm font-bold">
// //                     {user?.username?.charAt(0).toUpperCase()}
// //                   </span>
// //                 </div>
// //               </div>

// //               <button
// //                 onClick={handleLogout}
// //                 className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors duration-200"
// //               >
// //                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
// //                 </svg>
// //                 <span className="text-sm font-medium">Logout</span>
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </header>

// //       {/* Main Content */}
// //       <div className="flex-1 flex overflow-hidden">
// //         {/* Left Sidebar - Form */}
// //         <div className="w-1/2 bg-white border-r border-gray-200 overflow-y-auto">
// //           <div className="p-6">
// //             <div className="mb-6">
// //               <h2 className="text-2xl font-bold text-gray-900 mb-2">🎬 Movie Setup</h2>
// //               <p className="text-gray-600">Fill in all the details to predict box office performance</p>
              
// //               {/* Progress Bar */}
// //               <div className="mt-4">
// //                 <div className="flex justify-between items-center mb-2">
// //                   <span className="text-sm font-medium text-gray-700">
// //                     Progress: {filledCount}/{steps.length} fields
// //                   </span>
// //                   <span className="text-sm font-medium text-blue-600">
// //                     {Math.round(progressPercentage)}%
// //                   </span>
// //                 </div>
// //                 <div className="w-full bg-gray-200 rounded-full h-2">
// //                   <div 
// //                     className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
// //                     style={{ width: `${progressPercentage}%` }}
// //                   />
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Form Fields */}
// //             <div className="space-y-6">
// //               {steps.map((stepName, index) => {
// //                 const isSearchableField = [
// //                   "Director", "Cast 1", "Cast 2", "Cast 3", "Cast 4", 
// //                   "Music Director", "Lead Singer"
// //                 ].includes(stepName);

// //                 return (
// //                   <div key={stepName} className="bg-gray-50 rounded-xl p-5 border border-gray-100 hover:border-gray-200 transition-colors duration-200">
// //                     <div className="flex items-center gap-3 mb-4">
// //                       <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
// //                         formData[stepName] 
// //                           ? 'bg-green-100 text-green-700 border-2 border-green-200' 
// //                           : 'bg-gray-100 text-gray-500 border-2 border-gray-200'
// //                       }`}>
// //                         {formData[stepName] ? '✓' : index + 1}
// //                       </div>
// //                       <div className="flex-1">
// //                         <h3 className="font-semibold text-gray-900 flex items-center gap-2">
// //                           <span>{getStepIcon(stepName)}</span>
// //                           {getStepDisplayName(stepName)}
// //                         </h3>
// //                         {isSearchableField && (
// //                           <p className="text-xs text-gray-500 mt-1">
// //                             Search from Box Office database
// //                           </p>
// //                         )}
// //                       </div>
// //                     </div>

// //                     <div className="ml-11">
// //                       {isSearchableField ? (
// //                         <EnhancedSearchableInput
// //                           step={stepName}
// //                           value={formData[stepName] || ""}
// //                           onChange={(e) => handleFormChange(stepName, e.target.value)}
// //                           onSelect={(value) => handleSearchSelect(stepName, value)}
// //                         />
// //                       ) : (
// //                         <select
// //                           className="w-full px-4 py-3 text-sm bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-300"
// //                           value={formData[stepName] || ""}
// //                           onChange={(e) => handleFormChange(stepName, e.target.value)}
// //                         >
// //                           <option value="">Choose {getStepDisplayName(stepName)}</option>
// //                           {staticOptions[stepName]?.map((option) => (
// //                             <option key={option} value={option}>{option}</option>
// //                           ))}
// //                         </select>
// //                       )}
// //                     </div>
// //                   </div>
// //                 );
// //               })}
// //             </div>

// //             {/* Action Buttons */}
// //             <div className="mt-8 flex gap-4">
// //               <button
// //                 onClick={handleReset}
// //                 className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 flex items-center justify-center space-x-2"
// //               >
// //                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
// //                 </svg>
// //                 <span>Reset Form</span>
// //               </button>
// //               <button
// //                 onClick={handlePredict}
// //                 disabled={!isComplete}
// //                 className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
// //                   isComplete
// //                     ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 shadow-lg'
// //                     : 'bg-gray-200 text-gray-400 cursor-not-allowed'
// //                 }`}
// //               >
// //                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
// //                 </svg>
// //                 <span>Generate Prediction</span>
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Right Sidebar - History & Preview */}
// //         <div className="w-1/2 bg-gray-50 overflow-y-auto">
// //           <div className="p-6">
// //             {/* Movie Preview Section */}
// //             <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
// //               <div className="p-6">
// //                 <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
// //                   🎬 Movie Preview
// //                   <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
// //                     {filledCount}/{steps.length}
// //                   </span>
// //                 </h3>

// //                 {/* Form Data Preview */}
// //                 {filledCount > 0 ? (
// //                   <div className="space-y-3">
// //                     <h4 className="font-semibold text-gray-900 border-b border-gray-200 pb-2">
// //                       Cast & Crew Details
// //                     </h4>
                    
// //                     {steps.map((stepName) => {
// //                       const value = formData[stepName];
// //                       if (!value) return null;
                      
// //                       return (
// //                         <div key={stepName} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
// //                           <span className="text-lg">{getStepIcon(stepName)}</span>
// //                           <div className="flex-1 min-w-0">
// //                             <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
// //                               {getStepDisplayName(stepName)}
// //                             </p>
// //                             <p className="text-sm font-semibold text-gray-900 truncate">
// //                               {value}
// //                             </p>
// //                           </div>
// //                         </div>
// //                       );
// //                     })}
// //                   </div>
// //                 ) : (
// //                   <div className="text-center py-8">
// //                     <div className="text-3xl mb-3">📝</div>
// //                     <p className="text-gray-500 font-medium mb-1">Start Building</p>
// //                     <p className="text-xs text-gray-400">
// //                       Fill the form to see preview
// //                     </p>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>

// //             {/* Prediction History Section */}
// //             <div className="bg-white rounded-xl shadow-sm border border-gray-200">
// //               <div className="p-6">
// //                 <div className="flex justify-between items-center mb-4">
// //                   <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
// //                     📊 Prediction History
// //                   </h3>
// //                   <button
// //                     onClick={loadPredictionHistory}
// //                     className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
// //                   >
// //                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
// //                     </svg>
// //                     Refresh
// //                   </button>
// //                 </div>

// //                 {isLoadingHistory ? (
// //                   <div className="flex items-center justify-center py-8">
// //                     <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-3"></div>
// //                     <span className="text-gray-500">Loading history...</span>
// //                   </div>
// //                 ) : predictionHistory.length > 0 ? (
// //                   <div className="space-y-3 max-h-96 overflow-y-auto">
// //                     {predictionHistory.map((pred, index) => (
// //                       <div key={pred.id} className="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:border-gray-200 transition-colors duration-200">
// //                         <div className="flex justify-between items-start mb-2">
// //                           <div className="flex-1">
// //                             <h4 className="font-semibold text-gray-900 text-sm">
// //                               {pred.movie_data.Director ? `${pred.movie_data.Director}'s Film` : 'Untitled Movie'}
// //                             </h4>
// //                             <p className="text-xs text-gray-600 mt-1">
// //                               {pred.movie_data.Genre} • {pred.movie_data['Cast 1'] || 'Unknown Cast'}
// //                             </p>
// //                           </div>
// //                           <div className="text-right">
// //                             <p className="font-bold text-green-600 text-sm">₹{pred.prediction.total} Cr</p>
// //                             <p className="text-xs text-gray-500">
// //                               {new Date(pred.created_at).toLocaleDateString()}
// //                             </p>
// //                           </div>
// //                         </div>
// //                         <div className="flex items-center justify-between text-xs text-gray-500">
// //                           <span>Weekend: ₹{pred.prediction.weekend} Cr</span>
// //                           <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
// //                             {pred.prediction.confidence}% confidence
// //                           </span>
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 ) : (
// //                   <div className="text-center py-8">
// //                     <div className="text-3xl mb-3">📈</div>
// //                     <p className="text-gray-500 font-medium mb-1">No Predictions Yet</p>
// //                     <p className="text-xs text-gray-400">
// //                       Your prediction history will appear here
// //                     </p>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Footer */}
// //       <footer className="bg-white border-t border-gray-200">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
// //           <div className="flex justify-between items-center">
// //             <div className="flex items-center space-x-4 text-sm text-gray-500">
// //               <div className="flex items-center space-x-2">
// //                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
// //                 </svg>
// //                 <span>Powered by Box Office Database</span>
// //               </div>
// //               <span>•</span>
// //               <span>Professional Box Office Predictions</span>
// //             </div>
// //             <div className="text-sm text-gray-500">
// //               © 2025 Box Office Predictor
// //             </div>
// //           </div>
// //         </div>
// //       </footer>
// //     </div>
// //   );
// // }

// // export default MainAppPage;
// import { useState, useEffect } from "react";
// import { apiService } from './services/apiService';
// import Logo from './assets/Logo.png'; // Uncomment when you have the logo

// import EnhancedSearchableInput from './components/EnhancedSearchableInput';
// import UpcomingMovieSearch from './components/UpcomingMovieSearch';
// import PredictionResults from './components/PredictionResults';

// function MainAppPage({ user, onLogout }) {
//   const [formData, setFormData] = useState({});
//   const [result, setResult] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [predictionHistory, setPredictionHistory] = useState([]);
//   const [showUpcomingSearch, setShowUpcomingSearch] = useState(false);
//   const [isLoadingHistory, setIsLoadingHistory] = useState(false);

//   const steps = [
//     "Director", "Genre", 
//     "Cast 1", "Cast 2", "Cast 3", "Cast 4", "Category", "Budget_Estimate"
//   ];

//   const optionalSteps = ["Music Director", "Lead Singer"]; // Optional fields

//   const staticOptions = {
//     Genre: [
//       "Action", "Horror", "Comedy", "Family Drama", "Romance", 
//       "Thriller", "Sci-Fi", "Historical", "Musical", "Adventure"
//     ],
//     "Lead Singer": [
//       "Diljit Dosanjh", "Arijit Singh", "Shreya Ghoshal", 
//       "Rahat Fateh Ali Khan", "Sunidhi Chauhan", "Armaan Malik", 
//       "Asees Kaur", "Shaan", "Various Artists", "Playback Singer"
//     ],
//     Category: [
//       "None", "Religious/Political", "Political", 
//       "Patriotic", "Social Issue", "Biographical"
//     ],
//     Budget_Estimate: [
//       "Low (₹1-10 Cr)", "Medium (₹10-50 Cr)", "High (₹50-200 Cr)", "Blockbuster (₹200+ Cr)"
//     ]
//   };

//   // Load prediction history on component mount
//   useEffect(() => {
//     loadPredictionHistory();
//   }, []);

//   const loadPredictionHistory = async () => {
//     setIsLoadingHistory(true);
//     try {
//       const history = await apiService.getPredictionHistory(20);
//       setPredictionHistory(history);
//     } catch (error) {
//       console.error('Failed to load prediction history:', error);
//     } finally {
//       setIsLoadingHistory(false);
//     }
//   };

//   const getStepDisplayName = (stepName) => {
//     switch(stepName) {
//       case "Cast 1": return "Lead Actor/Actress";
//       case "Cast 2": return "Supporting Actor/Actress";
//       case "Cast 3": return "Character Actor";
//       case "Cast 4": return "Additional Cast";
//       case "Budget_Estimate": return "Budget Range";
//       default: return stepName;
//     }
//   };

//   const getStepIcon = (stepName) => {
//     switch(stepName) {
//       case "Director": return "🎬";
//       case "Genre": return "🎭";
//       case "Music Director": return "🎵";
//       case "Lead Singer": return "🎤";
//       case "Cast 1": return "⭐";
//       case "Cast 2": return "🌟";
//       case "Cast 3": return "✨";
//       case "Cast 4": return "💫";
//       case "Category": return "📂";
//       case "Budget_Estimate": return "💰";
//       default: return "🎯";
//     }
//   };

//   const filledCount = Object.keys(formData).filter(key => formData[key]).length;
//   const mandatoryFilledCount = Object.keys(formData).filter(key => 
//     formData[key] && steps.includes(key)
//   ).length;
//   const progressPercentage = (mandatoryFilledCount / steps.length) * 100;
//   const isComplete = mandatoryFilledCount === steps.length;

//   const handleFormChange = (fieldName, value) => {
//     setFormData(prev => ({ ...prev, [fieldName]: value }));
//   };

//   const handleSearchSelect = (fieldName, value) => {
//     setFormData(prev => ({ ...prev, [fieldName]: value }));
//   };

//   const handleUpcomingMovieSelect = (movieData) => {
//     const newFormData = {
//       "Director": movieData.director || "",
//       "Genre": movieData.primary_genre || "",
//       "Music Director": movieData.music_director || "",
//       "Lead Singer": movieData.lead_singer || "",
//       "Cast 1": movieData.cast_1 || "",
//       "Cast 2": movieData.cast_2 || "",
//       "Cast 3": movieData.cast_3 || "",
//       "Cast 4": movieData.cast_4 || "",
//       "Category": movieData.category || "None",
//       "Budget_Estimate": "Medium (₹10-50 Cr)"
//     };
    
//     setFormData(newFormData);
//     setShowUpcomingSearch(false);
//   };

//   const handlePredict = async () => {
//     setIsLoading(true);
    
//     try {
//       const prediction = await apiService.predictMovie(formData);
      
//       const resultData = {
//         weekend: prediction.weekend,
//         total: prediction.total,
//         confidence: prediction.confidence,
//         breakdown: prediction.breakdown,
//         dataSource: prediction.data_source
//       };

//       setResult(resultData);

//       // Save prediction to database
//       try {
//         await apiService.savePrediction(formData, resultData);
//         // Reload history to show the new prediction
//         await loadPredictionHistory();
//       } catch (saveError) {
//         console.error('Failed to save prediction:', saveError);
//       }

//     } catch (error) {
//       console.error('Prediction failed:', error);
//       alert(`Prediction failed: ${error.message}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleReset = () => {
//     setFormData({});
//     setResult(null);
//   };

//   const handleLogout = async () => {
//     try {
//       await apiService.logout();
//     } catch (error) {
//       console.error('Logout error:', error);
//     } finally {
//       localStorage.removeItem('authToken');
//       localStorage.removeItem('user');
//       onLogout();
//     }
//   };

//   // Show different screens
//   if (showUpcomingSearch) {
//     return (
//       <UpcomingMovieSearch
//         onMovieSelect={handleUpcomingMovieSelect}
//         onClose={() => setShowUpcomingSearch(false)}
//       />
//     );
//   }

//   if (isLoading) {
//     return (
//       <div className="fixed inset-0 bg-gradient-to-br from-white to-blue-50 flex items-center justify-center z-50">
//         <div className="bg-white shadow-xl rounded-2xl p-8 text-center max-w-sm w-full mx-4 border border-blue-100">
//           <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <h3 className="text-xl font-bold text-blue-800 mb-2">🎬 Analyzing Your Movie</h3>
//           <p className="text-sm text-blue-600">Fetching Box Office performance data...</p>
//         </div>
//       </div>
//     );
//   }

//   if (result) {
//     return (
//       <PredictionResults 
//         result={result}
//         formData={formData}
//         onReset={handleReset}
//       />
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             {/* Logo and Title */}
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center space-x-3">
//                 {/* <img src={Logo} alt="Box Office Predictor" className="h-8 w-8" /> */}
//                 <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
//                   🎬
//                 </div>
//                 <div>
//                   <h1 className="text-xl font-bold text-gray-900">Box Office Predictor</h1>
//                   <p className="text-xs text-gray-500">Professional Edition</p>
//                 </div>
//               </div>
//             </div>

//             {/* User Info and Actions */}
//             <div className="flex items-center space-x-4">
//               {/* Upcoming Movies Button - More Prominent */}
//               <button
//                 onClick={() => setShowUpcomingSearch(true)}
//                 className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
//               >
//                 <span className="text-sm">🔮</span>
//                 <span className="text-sm font-medium">Upcoming Movies</span>
//               </button>
              
//               <div className="flex items-center space-x-3">
//                 <div className="text-right">
//                   <p className="text-sm font-medium text-gray-900">{user?.username}</p>
//                   <p className="text-xs text-gray-500">{user?.email}</p>
//                 </div>
//                 <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
//                   <span className="text-white text-sm font-bold">
//                     {user?.username?.charAt(0).toUpperCase()}
//                   </span>
//                 </div>
//               </div>

//               <button
//                 onClick={handleLogout}
//                 className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors duration-200"
//               >
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                 </svg>
//                 <span className="text-sm font-medium">Logout</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <div className="flex-1 flex overflow-hidden">
//         {/* Left Sidebar - Form */}
//         <div className="w-1/2 bg-white border-r border-gray-200 overflow-y-auto">
//           <div className="p-6">
//             <div className="mb-6">
//               <h2 className="text-2xl font-bold text-gray-900 mb-2">🎬 Movie Setup</h2>
//               <p className="text-gray-600">Fill in all the details to predict box office performance</p>
              
//               {/* Progress Bar */}
//               <div className="mt-4">
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-sm font-medium text-gray-700">
//                     Progress: {mandatoryFilledCount}/{steps.length} required fields
//                   </span>
//                   <span className="text-sm font-medium text-blue-600">
//                     {Math.round(progressPercentage)}%
//                   </span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-2">
//                   <div 
//                     className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
//                     style={{ width: `${progressPercentage}%` }}
//                   />
//                 </div>
//                 {filledCount > mandatoryFilledCount && (
//                   <p className="text-xs text-gray-500 mt-1">
//                     +{filledCount - mandatoryFilledCount} optional fields filled
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Form Fields */}
//             <div className="space-y-6">
//               {/* Optional Fields Section */}
//               <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
//                 <h3 className="text-sm font-semibold text-blue-800 mb-4 flex items-center gap-2">
//                   ✨ Optional Fields
//                   <span className="text-xs bg-blue-200 text-blue-700 px-2 py-1 rounded-full">
//                     Enhance Prediction
//                   </span>
//                 </h3>
                
//                 {optionalSteps.map((stepName, index) => {
//                   const isSearchableField = [
//                     "Director", "Cast 1", "Cast 2", "Cast 3", "Cast 4", 
//                     "Music Director", "Lead Singer"
//                   ].includes(stepName);

//                   return (
//                     <div key={stepName} className="bg-white rounded-xl p-4 border border-blue-200 mb-4 last:mb-0">
//                       <div className="flex items-center gap-3 mb-3">
//                         <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
//                           formData[stepName] 
//                             ? 'bg-green-100 text-green-700 border-2 border-green-200' 
//                             : 'bg-gray-100 text-gray-500 border-2 border-gray-200'
//                         }`}>
//                           {formData[stepName] ? '✓' : '?'}
//                         </div>
//                         <div className="flex-1">
//                           <h4 className="font-medium text-gray-900 flex items-center gap-2">
//                             <span>{getStepIcon(stepName)}</span>
//                             {getStepDisplayName(stepName)}
//                             <span className="text-xs text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
//                               Optional
//                             </span>
//                           </h4>
//                           {isSearchableField && (
//                             <p className="text-xs text-gray-500 mt-1">
//                               Search from Box Office database
//                             </p>
//                           )}
//                         </div>
//                       </div>

//                       <div className="ml-9">
//                         <EnhancedSearchableInput
//                           step={stepName}
//                           value={formData[stepName] || ""}
//                           onChange={(e) => handleFormChange(stepName, e.target.value)}
//                           onSelect={(value) => handleSearchSelect(stepName, value)}
//                         />
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>

//               {/* Required Fields Section */}
//               <div>
//                 <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
//                   ⭐ Required Fields
//                   <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
//                     Mandatory
//                   </span>
//                 </h3>
                
//                 {steps.map((stepName, index) => {
//                   const isSearchableField = [
//                     "Director", "Cast 1", "Cast 2", "Cast 3", "Cast 4", 
//                     "Music Director", "Lead Singer"
//                   ].includes(stepName);

//                   return (
//                     <div key={stepName} className="bg-gray-50 rounded-xl p-5 border border-gray-100 hover:border-gray-200 transition-colors duration-200 mb-4">
//                       <div className="flex items-center gap-3 mb-4">
//                         <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
//                           formData[stepName] 
//                             ? 'bg-green-100 text-green-700 border-2 border-green-200' 
//                             : 'bg-gray-100 text-gray-500 border-2 border-gray-200'
//                         }`}>
//                           {formData[stepName] ? '✓' : index + 1}
//                         </div>
//                         <div className="flex-1">
//                           <h3 className="font-semibold text-gray-900 flex items-center gap-2">
//                             <span>{getStepIcon(stepName)}</span>
//                             {getStepDisplayName(stepName)}
//                           </h3>
//                           {isSearchableField && (
//                             <p className="text-xs text-gray-500 mt-1">
//                               Search from Box Office database
//                             </p>
//                           )}
//                         </div>
//                       </div>

//                       <div className="ml-11">
//                         {isSearchableField ? (
//                           <EnhancedSearchableInput
//                             step={stepName}
//                             value={formData[stepName] || ""}
//                             onChange={(e) => handleFormChange(stepName, e.target.value)}
//                             onSelect={(value) => handleSearchSelect(stepName, value)}
//                           />
//                         ) : (
//                           <select
//                             className="w-full px-4 py-3 text-sm bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-300"
//                             value={formData[stepName] || ""}
//                             onChange={(e) => handleFormChange(stepName, e.target.value)}
//                           >
//                             <option value="">Choose {getStepDisplayName(stepName)}</option>
//                             {staticOptions[stepName]?.map((option) => (
//                               <option key={option} value={option}>{option}</option>
//                             ))}
//                           </select>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="mt-8 flex gap-4">
//               <button
//                 onClick={handleReset}
//                 className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 flex items-center justify-center space-x-2"
//               >
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//                 </svg>
//                 <span>Reset Form</span>
//               </button>
//               <button
//                 onClick={handlePredict}
//                 disabled={!isComplete}
//                 className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
//                   isComplete
//                     ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 shadow-lg'
//                     : 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                 }`}
//               >
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                 </svg>
//                 <span>Generate Prediction</span>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Right Sidebar - History & Preview */}
//         <div className="w-1/2 bg-gray-50 overflow-y-auto">
//           <div className="p-6">
//             {/* Movie Preview Section */}
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
//               <div className="p-6">
//                 <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
//                   🎬 Movie Preview
//                   <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
//                     {filledCount}/{steps.length + optionalSteps.length}
//                   </span>
//                 </h3>

//                 {/* Form Data Preview */}
//                 {filledCount > 0 ? (
//                   <div className="space-y-3">
//                     <h4 className="font-semibold text-gray-900 border-b border-gray-200 pb-2">
//                       Cast & Crew Details
//                     </h4>
                    
//                     {[...steps, ...optionalSteps].map((stepName) => {
//                       const value = formData[stepName];
//                       if (!value) return null;
                      
//                       const isOptional = optionalSteps.includes(stepName);
                      
//                       return (
//                         <div key={stepName} className={`flex items-start gap-3 p-3 rounded-lg ${
//                           isOptional ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
//                         }`}>
//                           <span className="text-lg">{getStepIcon(stepName)}</span>
//                           <div className="flex-1 min-w-0">
//                             <div className="flex items-center gap-2">
//                               <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
//                                 {getStepDisplayName(stepName)}
//                               </p>
//                               {isOptional && (
//                                 <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">
//                                   Optional
//                                 </span>
//                               )}
//                             </div>
//                             <p className="text-sm font-semibold text-gray-900 truncate">
//                               {value}
//                             </p>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 ) : (
//                   <div className="text-center py-8">
//                     <div className="text-3xl mb-3">📝</div>
//                     <p className="text-gray-500 font-medium mb-1">Start Building</p>
//                     <p className="text-xs text-gray-400">
//                       Fill the form to see preview
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Prediction History Section */}
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//               <div className="p-6">
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
//                     📊 Prediction History
//                   </h3>
//                   <button
//                     onClick={loadPredictionHistory}
//                     className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
//                   >
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//                     </svg>
//                     Refresh
//                   </button>
//                 </div>

//                 {isLoadingHistory ? (
//                   <div className="flex items-center justify-center py-8">
//                     <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-3"></div>
//                     <span className="text-gray-500">Loading history...</span>
//                   </div>
//                 ) : predictionHistory.length > 0 ? (
//                   <div className="space-y-3 max-h-96 overflow-y-auto">
//                     {predictionHistory.map((pred, index) => (
//                       <div key={pred.id} className="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:border-gray-200 transition-colors duration-200">
//                         <div className="flex justify-between items-start mb-2">
//                           <div className="flex-1">
//                             <h4 className="font-semibold text-gray-900 text-sm">
//                               {pred.movie_data.Director ? `${pred.movie_data.Director}'s Film` : 'Untitled Movie'}
//                             </h4>
//                             <p className="text-xs text-gray-600 mt-1">
//                               {pred.movie_data.Genre} • {pred.movie_data['Cast 1'] || 'Unknown Cast'}
//                             </p>
//                           </div>
//                           <div className="text-right">
//                             <p className="font-bold text-green-600 text-sm">₹{pred.prediction.total} Cr</p>
//                             <p className="text-xs text-gray-500">
//                               {new Date(pred.created_at).toLocaleDateString()}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="flex items-center justify-between text-xs text-gray-500">
//                           <span>Weekend: ₹{pred.prediction.weekend} Cr</span>
//                           <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
//                             {pred.prediction.confidence}% confidence
//                           </span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-8">
//                     <div className="text-3xl mb-3">📈</div>
//                     <p className="text-gray-500 font-medium mb-1">No Predictions Yet</p>
//                     <p className="text-xs text-gray-400">
//                       Your prediction history will appear here
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-white border-t border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center space-x-4 text-sm text-gray-500">
//               <div className="flex items-center space-x-2">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 <span>Powered by Box Office Database</span>
//               </div>
//               <span>•</span>
//               <span>Professional Box Office Predictions</span>
//             </div>
//             <div className="text-sm text-gray-500">
//               © 2025 Box Office Predictor
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default MainAppPage;
import { useState, useEffect } from "react";
import { apiService } from './services/apiService';
import Logo from './assets/Logo.png'; // Uncomment when you have the logo

import EnhancedSearchableInput from './components/EnhancedSearchableInput';
import UpcomingMovieSearch from './components/UpcomingMovieSearch';
import PredictionResults from './components/PredictionResults';

function MainAppPage({ user, onLogout }) {
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [predictionHistory, setPredictionHistory] = useState([]);
  const [showUpcomingSearch, setShowUpcomingSearch] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  const steps = [
    "Director", "Genre", 
    "Cast 1", "Cast 2", "Cast 3", "Cast 4", "Category", "Budget_Estimate"
  ];

  const optionalSteps = ["Music Director", "Lead Singer"]; // Optional fields

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
    // Only load history if we have a valid auth token
    const token = localStorage.getItem('authToken');
    if (token) {
      loadPredictionHistory();
    }
  }, []);

  const loadPredictionHistory = async () => {
    setIsLoadingHistory(true);
    try {
      const history = await apiService.getPredictionHistory(20);
      setPredictionHistory(history || []); // Fallback to empty array
    } catch (error) {
      console.error('Failed to load prediction history:', error);
      // Don't show error to user, just set empty history
      setPredictionHistory([]);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const getStepDisplayName = (stepName) => {
    switch(stepName) {
      case "Cast 1": return "Lead Actor/Actress";
      case "Cast 2": return "Supporting Actor/Actress";
      case "Cast 3": return "Character Actor";
      case "Cast 4": return "Additional Cast";
      case "Budget_Estimate": return "Budget Range";
      default: return stepName;
    }
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
    formData[key] && steps.includes(key)
  ).length;
  const progressPercentage = (mandatoryFilledCount / steps.length) * 100;
  const isComplete = mandatoryFilledCount === steps.length;

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
      "Budget_Estimate": "Medium (₹10-50 Cr)"
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
        // Continue anyway - prediction still works even if save fails
      }

    } catch (error) {
      console.error('Prediction failed:', error);
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
    console.log("🚪 handleLogout called");
    console.log("👤 Current user:", user);
    console.log("🔑 Auth token before logout:", localStorage.getItem('authToken'));
    
    try {
      console.log("🔄 Calling apiService.logout...");
      await apiService.logout();
      console.log("✅ Logout API call successful");
    } catch (error) {
      console.error('❌ Logout error:', error);
      console.error('❌ Logout error details:', {
        message: error.message,
        status: error.status,
        stack: error.stack
      });
    } finally {
      console.log("🧹 Clearing localStorage...");
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      console.log("🔑 Auth token after cleanup:", localStorage.getItem('authToken'));
      console.log("🔄 Calling onLogout...");
      onLogout();
      console.log("🏁 Logout process completed");
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                {/* <img src={Logo} alt="Box Office Predictor" className="h-8 w-8" /> */}
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  🎬
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Box Office Predictor</h1>
                  <p className="text-xs text-gray-500">Professional Edition</p>
                </div>
              </div>
            </div>

            {/* User Info and Actions */}
            <div className="flex items-center space-x-4">
              {/* Upcoming Movies Button - More Prominent */}
              <button
                onClick={() => setShowUpcomingSearch(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <span className="text-sm">🔮</span>
                <span className="text-sm font-medium">Upcoming Movies</span>
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user?.username}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">
                    {user?.username?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="text-sm font-medium">Logout</span>
              </button>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-2">🎬 Movie Setup</h2>
              <p className="text-gray-600">Fill in all the details to predict box office performance</p>
              
              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Progress: {mandatoryFilledCount}/{steps.length} required fields
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
              {/* Optional Fields Section */}
              <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                <h3 className="text-sm font-semibold text-blue-800 mb-4 flex items-center gap-2">
                  ✨ Optional Fields
                  <span className="text-xs bg-blue-200 text-blue-700 px-2 py-1 rounded-full">
                    Enhance Prediction
                  </span>
                </h3>
                
                {optionalSteps.map((stepName, index) => {
                  const isSearchableField = [
                    "Director", "Cast 1", "Cast 2", "Cast 3", "Cast 4", 
                    "Music Director", "Lead Singer"
                  ].includes(stepName);

                  return (
                    <div key={stepName} className="bg-white rounded-xl p-4 border border-blue-200 mb-4 last:mb-0">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                          formData[stepName] 
                            ? 'bg-green-100 text-green-700 border-2 border-green-200' 
                            : 'bg-gray-100 text-gray-500 border-2 border-gray-200'
                        }`}>
                          {formData[stepName] ? '✓' : '?'}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 flex items-center gap-2">
                            <span>{getStepIcon(stepName)}</span>
                            {getStepDisplayName(stepName)}
                            <span className="text-xs text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                              Optional
                            </span>
                          </h4>
                          {isSearchableField && (
                            <p className="text-xs text-gray-500 mt-1">
                              Search from Box Office database
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="ml-9">
                        <EnhancedSearchableInput
                          step={stepName}
                          value={formData[stepName] || ""}
                          onChange={(e) => handleFormChange(stepName, e.target.value)}
                          onSelect={(value) => handleSearchSelect(stepName, value)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Required Fields Section */}
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  ⭐ Required Fields
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                    Mandatory
                  </span>
                </h3>
                
                {steps.map((stepName, index) => {
                  const isSearchableField = [
                    "Director", "Cast 1", "Cast 2", "Cast 3", "Cast 4", 
                    "Music Director", "Lead Singer"
                  ].includes(stepName);

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
                            {getStepDisplayName(stepName)}
                          </h3>
                          {isSearchableField && (
                            <p className="text-xs text-gray-500 mt-1">
                              Search from Box Office database
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="ml-11">
                        {isSearchableField ? (
                          <EnhancedSearchableInput
                            step={stepName}
                            value={formData[stepName] || ""}
                            onChange={(e) => handleFormChange(stepName, e.target.value)}
                            onSelect={(value) => handleSearchSelect(stepName, value)}
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
                    {filledCount}/{steps.length + optionalSteps.length}
                  </span>
                </h3>

                {/* Form Data Preview */}
                {filledCount > 0 ? (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 border-b border-gray-200 pb-2">
                      Cast & Crew Details
                    </h4>
                    
                    {[...steps, ...optionalSteps].map((stepName) => {
                      const value = formData[stepName];
                      if (!value) return null;
                      
                      const isOptional = optionalSteps.includes(stepName);
                      
                      return (
                        <div key={stepName} className={`flex items-start gap-3 p-3 rounded-lg ${
                          isOptional ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                        }`}>
                          <span className="text-lg">{getStepIcon(stepName)}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                {getStepDisplayName(stepName)}
                              </p>
                              {isOptional && (
                                <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">
                                  Optional
                                </span>
                              )}
                            </div>
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
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    📊 Prediction History
                  </h3>
                  <button
                    onClick={loadPredictionHistory}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                    disabled={isLoadingHistory}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    {isLoadingHistory ? 'Loading...' : 'Refresh'}
                  </button>
                </div>

                {isLoadingHistory ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-3"></div>
                    <span className="text-gray-500">Loading history...</span>
                  </div>
                ) : predictionHistory && predictionHistory.length > 0 ? (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {predictionHistory.map((pred, index) => (
                      <div key={pred.id} className="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:border-gray-200 transition-colors duration-200">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 text-sm">
                              {pred.movie_data.Director ? `${pred.movie_data.Director}'s Film` : 'Untitled Movie'}
                            </h4>
                            <p className="text-xs text-gray-600 mt-1">
                              {pred.movie_data.Genre} • {pred.movie_data['Cast 1'] || 'Unknown Cast'}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-600 text-sm">₹{pred.prediction.total} Cr</p>
                            <p className="text-xs text-gray-500">
                              {new Date(pred.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Weekend: ₹{pred.prediction.weekend} Cr</span>
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            {pred.prediction.confidence}% confidence
                          </span>
                        </div>
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
            </div>
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