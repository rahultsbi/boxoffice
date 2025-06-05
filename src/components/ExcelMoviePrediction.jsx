// // // // import React, { useState, useEffect } from 'react';

// // // // function ExcelMoviePrediction({ user, onLogout, onTokenExpired }) {
// // // //   // Form state for Step 1 (Cast & Crew)
// // // //   const [step1Data, setStep1Data] = useState({
// // // //     director: '',
// // // //     genre: '',
// // // //     cast1: '',
// // // //     cast2: '',
// // // //     cast3: '',
// // // //     cast4: '',
// // // //     musicDirector: '',
// // // //     leadSinger: '',
// // // //     category: 'None'
// // // //   });

// // // //   // Form state for Step 2 (Marketing Metrics)
// // // //   const [step2Data, setStep2Data] = useState({
// // // //     teaserViews: 50,
// // // //     trailerViews: 50,
// // // //     bestHits: 50,
// // // //     posterViews: 50
// // // //   });

// // // //   // Form state for Step 3 (Reviews)
// // // //   const [step3Data, setStep3Data] = useState({
// // // //     imdbRating: 6.5,
// // // //     criticsReview: 5.0
// // // //   });

// // // //   // Prediction results
// // // //   const [step1Result, setStep1Result] = useState(null);
// // // //   const [step2Result, setStep2Result] = useState(null);
// // // //   const [finalResult, setFinalResult] = useState(null);

// // // //   // UI state
// // // //   const [currentStep, setCurrentStep] = useState(1);
// // // //   const [isLoading, setIsLoading] = useState(false);
// // // //   const [adjustmentPercentage, setAdjustmentPercentage] = useState(0);
// // // //   const [excelData, setExcelData] = useState(null);
// // // //   const [isLoadingData, setIsLoadingData] = useState(true);

// // // //   // Static options (these would come from your Google Sheets data)
// // // //   const [options, setOptions] = useState({
// // // //     directors: [],
// // // //     genres: [],
// // // //     casts: [],
// // // //     musicDirectors: [],
// // // //     leadSingers: []
// // // //   });

// // // //   // Load Excel data on component mount
// // // //   useEffect(() => {
// // // //     loadExcelData();
// // // //   }, []);

// // // //   const loadExcelData = async () => {
// // // //     setIsLoadingData(true);
// // // //     try {
// // // //       // Call your backend endpoint to get Google Sheets data
// // // //       const response = await fetch('http://localhost:8001/excel-data');
// // // //       if (response.ok) {
// // // //         const data = await response.json();
// // // //         setExcelData(data);
        
// // // //         // Extract unique options from the data
// // // //         const directors = [...new Set(data.map(row => row.Director).filter(Boolean))].sort();
// // // //         const genres = [...new Set(data.map(row => row.Genre).filter(Boolean))].sort();
// // // //         const casts = [...new Set([
// // // //           ...data.map(row => row['Cast 1']),
// // // //           ...data.map(row => row['Cast 2']),
// // // //           ...data.map(row => row['Cast 3']),
// // // //           ...data.map(row => row['Cast 4'])
// // // //         ].filter(Boolean))].sort();
// // // //         const musicDirectors = [...new Set(data.map(row => row['Music Director']).filter(Boolean))].sort();
// // // //         const leadSingers = [...new Set(data.map(row => row['Lead Singer']).filter(Boolean))].sort();

// // // //         setOptions({
// // // //           directors,
// // // //           genres,
// // // //           casts,
// // // //           musicDirectors,
// // // //           leadSingers
// // // //         });
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Failed to load Excel data:', error);
// // // //     } finally {
// // // //       setIsLoadingData(false);
// // // //     }
// // // //   };

// // // //   const handleStep1Submit = async () => {
// // // //     setIsLoading(true);
// // // //     try {
// // // //       const response = await fetch('http://localhost:8001/predict-excel-step1', {
// // // //         method: 'POST',
// // // //         headers: {
// // // //           'Content-Type': 'application/json',
// // // //         },
// // // //         body: JSON.stringify({
// // // //           ...step1Data,
// // // //           adjustmentPercentage
// // // //         })
// // // //       });

// // // //       if (response.ok) {
// // // //         const result = await response.json();
// // // //         setStep1Result(result);
// // // //         setCurrentStep(2);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Step 1 prediction failed:', error);
// // // //     } finally {
// // // //       setIsLoading(false);
// // // //     }
// // // //   };

// // // //   const handleStep2Submit = async () => {
// // // //     setIsLoading(true);
// // // //     try {
// // // //       const response = await fetch('http://localhost:8001/predict-excel-step2', {
// // // //         method: 'POST',
// // // //         headers: {
// // // //           'Content-Type': 'application/json',
// // // //         },
// // // //         body: JSON.stringify({
// // // //           step1Weekend: step1Result.weekend,
// // // //           step1Total: step1Result.total,
// // // //           ...step2Data,
// // // //           category: step1Data.category
// // // //         })
// // // //       });

// // // //       if (response.ok) {
// // // //         const result = await response.json();
// // // //         setStep2Result(result);
// // // //         setCurrentStep(3);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Step 2 prediction failed:', error);
// // // //     } finally {
// // // //       setIsLoading(false);
// // // //     }
// // // //   };

// // // //   const handleStep3Submit = async () => {
// // // //     setIsLoading(true);
// // // //     try {
// // // //       const response = await fetch('http://localhost:8001/predict-excel-step3', {
// // // //         method: 'POST',
// // // //         headers: {
// // // //           'Content-Type': 'application/json',
// // // //         },
// // // //         body: JSON.stringify({
// // // //           step2Weekend: step2Result.weekend,
// // // //           step2Total: step2Result.total,
// // // //           ...step3Data
// // // //         })
// // // //       });

// // // //       if (response.ok) {
// // // //         const result = await response.json();
// // // //         setFinalResult(result);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Final prediction failed:', error);
// // // //     } finally {
// // // //       setIsLoading(false);
// // // //     }
// // // //   };

// // // //   const resetPrediction = () => {
// // // //     setStep1Result(null);
// // // //     setStep2Result(null);
// // // //     setFinalResult(null);
// // // //     setCurrentStep(1);
// // // //   };

// // // //   const isStep1Complete = step1Data.director && step1Data.genre && step1Data.cast1 && step1Data.cast2;

// // // //   if (isLoadingData) {
// // // //     return (
// // // //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// // // //         <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
// // // //           <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
// // // //           <h3 className="text-lg font-semibold text-gray-900">Loading Excel Data...</h3>
// // // //           <p className="text-gray-600">Fetching movie database from Google Sheets</p>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-50">
// // // //       {/* Header */}
// // // //       <header className="bg-white shadow-sm border-b border-gray-200">
// // // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // // //           <div className="flex justify-between items-center h-16">
// // // //             <div className="flex items-center space-x-4">
// // // //               <button
// // // //                 onClick={() => window.history.back()}
// // // //                 className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
// // // //               >
// // // //                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
// // // //                 </svg>
// // // //                 <span>Back to Dashboard</span>
// // // //               </button>
// // // //               <div className="h-6 border-l border-gray-300"></div>
// // // //               <div className="flex items-center space-x-3">
// // // //                 <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
// // // //                   📊
// // // //                 </div>
// // // //                 <div>
// // // //                   <h1 className="text-xl font-bold text-gray-900">Excel Movie Prediction</h1>
// // // //                   <p className="text-xs text-gray-500">Historical Data Analysis</p>
// // // //                 </div>
// // // //               </div>
// // // //             </div>

// // // //             <div className="flex items-center space-x-4">
// // // //               <div className="text-right">
// // // //                 <p className="text-sm font-medium text-gray-900">{user?.username}</p>
// // // //                 <p className="text-xs text-gray-500">{user?.email}</p>
// // // //               </div>
// // // //               <button
// // // //                 onClick={onLogout}
// // // //                 className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors duration-200"
// // // //               >
// // // //                 <span className="text-sm font-medium">Logout</span>
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </header>

// // // //       {/* Main Content */}
// // // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// // // //         {/* Progress Steps */}
// // // //         <div className="mb-8">
// // // //           <div className="flex items-center justify-center space-x-8">
// // // //             {[1, 2, 3].map((step) => (
// // // //               <div key={step} className="flex items-center">
// // // //                 <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
// // // //                   currentStep >= step
// // // //                     ? 'bg-blue-500 text-white'
// // // //                     : 'bg-gray-200 text-gray-500'
// // // //                 }`}>
// // // //                   {step}
// // // //                 </div>
// // // //                 <span className={`ml-2 font-medium ${
// // // //                   currentStep >= step ? 'text-blue-600' : 'text-gray-500'
// // // //                 }`}>
// // // //                   {step === 1 ? 'Cast & Crew' : step === 2 ? 'Marketing' : 'Reviews'}
// // // //                 </span>
// // // //                 {step < 3 && (
// // // //                   <div className={`w-16 h-1 ml-4 ${
// // // //                     currentStep > step ? 'bg-blue-500' : 'bg-gray-200'
// // // //                   }`}></div>
// // // //                 )}
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         </div>

// // // //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// // // //           {/* Left Panel - Form */}
// // // //           <div className="lg:col-span-2">
// // // //             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// // // //               {/* Adjustment Slider */}
// // // //               <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
// // // //                 <label className="block text-sm font-semibold text-gray-700 mb-2">
// // // //                   Prediction Adjustment: {adjustmentPercentage}%
// // // //                 </label>
// // // //                 <input
// // // //                   type="range"
// // // //                   min="-100"
// // // //                   max="100"
// // // //                   value={adjustmentPercentage}
// // // //                   onChange={(e) => setAdjustmentPercentage(Number(e.target.value))}
// // // //                   className="w-full"
// // // //                 />
// // // //                 <div className="flex justify-between text-xs text-gray-500 mt-1">
// // // //                   <span>-100% (Conservative)</span>
// // // //                   <span>0% (Baseline)</span>
// // // //                   <span>+100% (Optimistic)</span>
// // // //                 </div>
// // // //               </div>

// // // //               {/* Step 1: Cast & Crew */}
// // // //               {currentStep === 1 && (
// // // //                 <div className="space-y-6">
// // // //                   <h3 className="text-lg font-bold text-gray-900 mb-4">🎬 Step 1: Cast & Crew Details</h3>
                  
// // // //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-2">Director *</label>
// // // //                       <select
// // // //                         value={step1Data.director}
// // // //                         onChange={(e) => setStep1Data({...step1Data, director: e.target.value})}
// // // //                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
// // // //                       >
// // // //                         <option value="">Select Director</option>
// // // //                         {options.directors.map(director => (
// // // //                           <option key={director} value={director}>{director}</option>
// // // //                         ))}
// // // //                       </select>
// // // //                     </div>

// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-2">Genre *</label>
// // // //                       <select
// // // //                         value={step1Data.genre}
// // // //                         onChange={(e) => setStep1Data({...step1Data, genre: e.target.value})}
// // // //                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
// // // //                       >
// // // //                         <option value="">Select Genre</option>
// // // //                         {options.genres.map(genre => (
// // // //                           <option key={genre} value={genre}>{genre}</option>
// // // //                         ))}
// // // //                       </select>
// // // //                     </div>

// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-2">Lead Actor *</label>
// // // //                       <select
// // // //                         value={step1Data.cast1}
// // // //                         onChange={(e) => setStep1Data({...step1Data, cast1: e.target.value})}
// // // //                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
// // // //                       >
// // // //                         <option value="">Select Lead Actor</option>
// // // //                         {options.casts.map(cast => (
// // // //                           <option key={cast} value={cast}>{cast}</option>
// // // //                         ))}
// // // //                       </select>
// // // //                     </div>

// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-2">Supporting Actor *</label>
// // // //                       <select
// // // //                         value={step1Data.cast2}
// // // //                         onChange={(e) => setStep1Data({...step1Data, cast2: e.target.value})}
// // // //                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
// // // //                       >
// // // //                         <option value="">Select Supporting Actor</option>
// // // //                         {options.casts.map(cast => (
// // // //                           <option key={cast} value={cast}>{cast}</option>
// // // //                         ))}
// // // //                       </select>
// // // //                     </div>

// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-2">Cast 3</label>
// // // //                       <select
// // // //                         value={step1Data.cast3}
// // // //                         onChange={(e) => setStep1Data({...step1Data, cast3: e.target.value})}
// // // //                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
// // // //                       >
// // // //                         <option value="">Select Cast 3</option>
// // // //                         {options.casts.map(cast => (
// // // //                           <option key={cast} value={cast}>{cast}</option>
// // // //                         ))}
// // // //                       </select>
// // // //                     </div>

// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-2">Cast 4</label>
// // // //                       <select
// // // //                         value={step1Data.cast4}
// // // //                         onChange={(e) => setStep1Data({...step1Data, cast4: e.target.value})}
// // // //                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
// // // //                       >
// // // //                         <option value="">Select Cast 4</option>
// // // //                         {options.casts.map(cast => (
// // // //                           <option key={cast} value={cast}>{cast}</option>
// // // //                         ))}
// // // //                       </select>
// // // //                     </div>

// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-2">Music Director</label>
// // // //                       <select
// // // //                         value={step1Data.musicDirector}
// // // //                         onChange={(e) => setStep1Data({...step1Data, musicDirector: e.target.value})}
// // // //                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
// // // //                       >
// // // //                         <option value="">Select Music Director</option>
// // // //                         {options.musicDirectors.map(md => (
// // // //                           <option key={md} value={md}>{md}</option>
// // // //                         ))}
// // // //                       </select>
// // // //                     </div>

// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-2">Lead Singer</label>
// // // //                       <select
// // // //                         value={step1Data.leadSinger}
// // // //                         onChange={(e) => setStep1Data({...step1Data, leadSinger: e.target.value})}
// // // //                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
// // // //                       >
// // // //                         <option value="">Select Lead Singer</option>
// // // //                         {options.leadSingers.map(singer => (
// // // //                           <option key={singer} value={singer}>{singer}</option>
// // // //                         ))}
// // // //                       </select>
// // // //                     </div>
// // // //                   </div>

// // // //                   <div>
// // // //                     <label className="block text-sm font-medium text-gray-700 mb-2">Movie Category</label>
// // // //                     <div className="flex space-x-4">
// // // //                       {['None', 'Religious/Political', 'Political'].map(category => (
// // // //                         <label key={category} className="flex items-center">
// // // //                           <input
// // // //                             type="radio"
// // // //                             value={category}
// // // //                             checked={step1Data.category === category}
// // // //                             onChange={(e) => setStep1Data({...step1Data, category: e.target.value})}
// // // //                             className="mr-2"
// // // //                           />
// // // //                           {category}
// // // //                         </label>
// // // //                       ))}
// // // //                     </div>
// // // //                   </div>

// // // //                   <button
// // // //                     onClick={handleStep1Submit}
// // // //                     disabled={!isStep1Complete || isLoading}
// // // //                     className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
// // // //                       isStep1Complete && !isLoading
// // // //                         ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700'
// // // //                         : 'bg-gray-200 text-gray-400 cursor-not-allowed'
// // // //                     }`}
// // // //                   >
// // // //                     {isLoading ? 'Calculating...' : 'Predict Step 1'}
// // // //                   </button>
// // // //                 </div>
// // // //               )}

// // // //               {/* Step 2: Marketing Metrics */}
// // // //               {currentStep === 2 && (
// // // //                 <div className="space-y-6">
// // // //                   <h3 className="text-lg font-bold text-gray-900 mb-4">📈 Step 2: Marketing Impact</h3>
                  
// // // //                   <div className="space-y-4">
// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-2">
// // // //                         Teaser Views Impact: {step2Data.teaserViews}%
// // // //                       </label>
// // // //                       <input
// // // //                         type="range"
// // // //                         min="0"
// // // //                         max="100"
// // // //                         value={step2Data.teaserViews}
// // // //                         onChange={(e) => setStep2Data({...step2Data, teaserViews: Number(e.target.value)})}
// // // //                         className="w-full"
// // // //                       />
// // // //                     </div>

// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-2">
// // // //                         Trailer Views Impact: {step2Data.trailerViews}%
// // // //                       </label>
// // // //                       <input
// // // //                         type="range"
// // // //                         min="0"
// // // //                         max="100"
// // // //                         value={step2Data.trailerViews}
// // // //                         onChange={(e) => setStep2Data({...step2Data, trailerViews: Number(e.target.value)})}
// // // //                         className="w-full"
// // // //                       />
// // // //                     </div>

// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-2">
// // // //                         Best Hits in Songs: {step2Data.bestHits}%
// // // //                       </label>
// // // //                       <input
// // // //                         type="range"
// // // //                         min="0"
// // // //                         max="100"
// // // //                         value={step2Data.bestHits}
// // // //                         onChange={(e) => setStep2Data({...step2Data, bestHits: Number(e.target.value)})}
// // // //                         className="w-full"
// // // //                       />
// // // //                     </div>

// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-2">
// // // //                         Poster Views Impact: {step2Data.posterViews}%
// // // //                       </label>
// // // //                       <input
// // // //                         type="range"
// // // //                         min="0"
// // // //                         max="100"
// // // //                         value={step2Data.posterViews}
// // // //                         onChange={(e) => setStep2Data({...step2Data, posterViews: Number(e.target.value)})}
// // // //                         className="w-full"
// // // //                       />
// // // //                     </div>
// // // //                   </div>

// // // //                   <button
// // // //                     onClick={handleStep2Submit}
// // // //                     disabled={isLoading}
// // // //                     className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
// // // //                   >
// // // //                     {isLoading ? 'Calculating...' : 'Predict Step 2'}
// // // //                   </button>
// // // //                 </div>
// // // //               )}

// // // //               {/* Step 3: Reviews */}
// // // //               {currentStep === 3 && (
// // // //                 <div className="space-y-6">
// // // //                   <h3 className="text-lg font-bold text-gray-900 mb-4">⭐ Step 3: Critical Reception</h3>
                  
// // // //                   <div className="space-y-4">
// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-2">
// // // //                         IMDB Rating: {step3Data.imdbRating}/10
// // // //                       </label>
// // // //                       <input
// // // //                         type="range"
// // // //                         min="0"
// // // //                         max="10"
// // // //                         step="0.1"
// // // //                         value={step3Data.imdbRating}
// // // //                         onChange={(e) => setStep3Data({...step3Data, imdbRating: Number(e.target.value)})}
// // // //                         className="w-full"
// // // //                       />
// // // //                     </div>

// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-2">
// // // //                         Critics Review: {step3Data.criticsReview}/10
// // // //                       </label>
// // // //                       <input
// // // //                         type="range"
// // // //                         min="0"
// // // //                         max="10"
// // // //                         step="0.1"
// // // //                         value={step3Data.criticsReview}
// // // //                         onChange={(e) => setStep3Data({...step3Data, criticsReview: Number(e.target.value)})}
// // // //                         className="w-full"
// // // //                       />
// // // //                     </div>
// // // //                   </div>

// // // //                   <button
// // // //                     onClick={handleStep3Submit}
// // // //                     disabled={isLoading}
// // // //                     className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-indigo-700 transition-all duration-200"
// // // //                   >
// // // //                     {isLoading ? 'Calculating Final...' : 'Get Final Prediction'}
// // // //                   </button>
// // // //                 </div>
// // // //               )}
// // // //             </div>
// // // //           </div>

// // // //           {/* Right Panel - Results */}
// // // //           <div className="space-y-6">
// // // //             {/* Step 1 Result */}
// // // //             {step1Result && (
// // // //               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// // // //                 <h4 className="text-lg font-bold text-gray-900 mb-4">🎬 Step 1 Results</h4>
// // // //                 <div className="space-y-3">
// // // //                   <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
// // // //                     <span className="text-sm font-medium text-gray-700">Weekend Collection:</span>
// // // //                     <span className="text-lg font-bold text-blue-600">₹{step1Result.weekend} Cr</span>
// // // //                   </div>
// // // //                   <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
// // // //                     <span className="text-sm font-medium text-gray-700">Total Collection:</span>
// // // //                     <span className="text-lg font-bold text-green-600">₹{step1Result.total} Cr</span>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             )}

// // // //             {/* Step 2 Result */}
// // // //             {step2Result && (
// // // //               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// // // //                 <h4 className="text-lg font-bold text-gray-900 mb-4">📈 Step 2 Results</h4>
// // // //                 <div className="space-y-3">
// // // //                   <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
// // // //                     <span className="text-sm font-medium text-gray-700">Weekend Collection:</span>
// // // //                     <span className="text-lg font-bold text-blue-600">₹{step2Result.weekend} Cr</span>
// // // //                   </div>
// // // //                   <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
// // // //                     <span className="text-sm font-medium text-gray-700">Total Collection:</span>
// // // //                     <span className="text-lg font-bold text-green-600">₹{step2Result.total} Cr</span>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             )}

// // // //             {/* Final Result */}
// // // //             {finalResult && (
// // // //               <div className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl border-2 border-purple-200 p-6">
// // // //                 <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
// // // //                   🎯 Final Prediction
// // // //                 </h4>
// // // //                 <div className="space-y-4">
// // // //                   <div className="text-center p-4 bg-white rounded-lg shadow-sm">
// // // //                     <p className="text-sm font-medium text-gray-600 mb-1">Weekend Collection</p>
// // // //                     <p className="text-3xl font-bold text-purple-600">₹{finalResult.weekend} Cr</p>
// // // //                   </div>
// // // //                   <div className="text-center p-4 bg-white rounded-lg shadow-sm">
// // // //                     <p className="text-sm font-medium text-gray-600 mb-1">Total Collection</p>
// // // //                     <p className="text-3xl font-bold text-indigo-600">₹{finalResult.total} Cr</p>
// // // //                   </div>
// // // //                   <button
// // // //                     onClick={resetPrediction}
// // // //                     className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
// // // //                   >
// // // //                     🔄 Start New Prediction
// // // //                   </button>
// // // //                 </div>
// // // //               </div>
// // // //             )}

// // // //             {/* Data Info */}
// // // //             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// // // //               <h4 className="text-lg font-bold text-gray-900 mb-4">📊 Data Source</h4>
// // // //               <div className="space-y-2 text-sm text-gray-600">
// // // //                 <p>• Historical movie data from Google Sheets</p>
// // // //                 <p>• {options.directors.length} Directors in database</p>
// // // //                 <p>• {options.casts.length} Cast members tracked</p>
// // // //                 <p>• {options.genres.length} Genres analyzed</p>
// // // //                 <button
// // // //                   onClick={loadExcelData}
// // // //                   className="mt-3 w-full py-2 px-4 bg-blue-50 text-blue-700 rounded-lg font-medium hover:bg-blue-100 transition-colors"
// // // //                 >
// // // //                   🔄 Refresh Data
// // // //                 </button>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default ExcelMoviePrediction;
// // // // import React, { useState, useEffect } from 'react';
// // // // import { apiService } from '../services/apiService';

// // // // function ExcelMoviePrediction({ user, onLogout, onTokenExpired }) {
// // // //   // Form state for Step 1 (Cast & Crew)
// // // //   const [step1Data, setStep1Data] = useState({
// // // //     director: '',
// // // //     genre: '',
// // // //     cast1: '',
// // // //     cast2: '',
// // // //     cast3: '',
// // // //     cast4: '',
// // // //     musicDirector: '',
// // // //     leadSinger: '',
// // // //     category: 'None'
// // // //   });

// // // //   // Form state for Step 2 (Marketing Metrics)
// // // //   const [step2Data, setStep2Data] = useState({
// // // //     teaserViews: 50,
// // // //     trailerViews: 50,
// // // //     bestHits: 50,
// // // //     posterViews: 50
// // // //   });

// // // //   // Form state for Step 3 (Reviews)
// // // //   const [step3Data, setStep3Data] = useState({
// // // //     imdbRating: 6.5,
// // // //     criticsReview: 5.0
// // // //   });

// // // //   // Prediction results
// // // //   const [step1Result, setStep1Result] = useState(null);
// // // //   const [step2Result, setStep2Result] = useState(null);
// // // //   const [finalResult, setFinalResult] = useState(null);

// // // //   // UI state
// // // //   const [currentStep, setCurrentStep] = useState(1);
// // // //   const [isLoading, setIsLoading] = useState(false);
// // // //   const [adjustmentPercentage, setAdjustmentPercentage] = useState(0);
// // // //   const [excelData, setExcelData] = useState(null);
// // // //   const [isLoadingData, setIsLoadingData] = useState(true);

// // // //   // Static options (these would come from your Google Sheets data)
// // // //   const [options, setOptions] = useState({
// // // //     directors: [],
// // // //     genres: [],
// // // //     casts: [],
// // // //     musicDirectors: [],
// // // //     leadSingers: []
// // // //   });

// // // //   // Load Excel data on component mount
// // // //   useEffect(() => {
// // // //     loadExcelData();
// // // //   }, []);

// // // //   const loadExcelData = async () => {
// // // //     setIsLoadingData(true);
// // // //     try {
// // // //       // Call your backend endpoint to get Google Sheets data
// // // //       const response = await fetch('http://localhost:8001/excel-data');
// // // //       if (response.ok) {
// // // //         const data = await response.json();
// // // //         setExcelData(data);
        
// // // //         // Extract unique options from the data
// // // //         const directors = [...new Set(data.map(row => row.Director).filter(Boolean))].sort();
// // // //         const genres = [...new Set(data.map(row => row.Genre).filter(Boolean))].sort();
// // // //         const casts = [...new Set([
// // // //           ...data.map(row => row['Cast 1']),
// // // //           ...data.map(row => row['Cast 2']),
// // // //           ...data.map(row => row['Cast 3']),
// // // //           ...data.map(row => row['Cast 4'])
// // // //         ].filter(Boolean))].sort();
// // // //         const musicDirectors = [...new Set(data.map(row => row['Music Director']).filter(Boolean))].sort();
// // // //         const leadSingers = [...new Set(data.map(row => row['Lead Singer']).filter(Boolean))].sort();

// // // //         setOptions({
// // // //           directors,
// // // //           genres,
// // // //           casts,
// // // //           musicDirectors,
// // // //           leadSingers
// // // //         });
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Failed to load Excel data:', error);
// // // //     } finally {
// // // //       setIsLoadingData(false);
// // // //     }
// // // //   };

// // // //   const handleStep1Submit = async () => {
// // // //     setIsLoading(true);
// // // //     try {
// // // //       const response = await fetch('http://localhost:8001/predict-excel-step1', {
// // // //         method: 'POST',
// // // //         headers: {
// // // //           'Content-Type': 'application/json',
// // // //         },
// // // //         body: JSON.stringify({
// // // //           ...step1Data,
// // // //           adjustmentPercentage
// // // //         })
// // // //       });

// // // //       if (response.ok) {
// // // //         const result = await response.json();
// // // //         setStep1Result(result);
// // // //         setCurrentStep(2);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Step 1 prediction failed:', error);
// // // //     } finally {
// // // //       setIsLoading(false);
// // // //     }
// // // //   };

// // // //   const handleStep2Submit = async () => {
// // // //     setIsLoading(true);
// // // //     try {
// // // //       const response = await fetch('http://localhost:8001/predict-excel-step2', {
// // // //         method: 'POST',
// // // //         headers: {
// // // //           'Content-Type': 'application/json',
// // // //         },
// // // //         body: JSON.stringify({
// // // //           step1Weekend: step1Result.weekend,
// // // //           step1Total: step1Result.total,
// // // //           ...step2Data,
// // // //           category: step1Data.category
// // // //         })
// // // //       });

// // // //       if (response.ok) {
// // // //         const result = await response.json();
// // // //         setStep2Result(result);
// // // //         setCurrentStep(3);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Step 2 prediction failed:', error);
// // // //     } finally {
// // // //       setIsLoading(false);
// // // //     }
// // // //   };

// // // //   const handleStep3Submit = async () => {
// // // //     setIsLoading(true);
// // // //     try {
// // // //       const response = await fetch('http://localhost:8001/predict-excel-step3', {
// // // //         method: 'POST',
// // // //         headers: {
// // // //           'Content-Type': 'application/json',
// // // //         },
// // // //         body: JSON.stringify({
// // // //           step2Weekend: step2Result.weekend,
// // // //           step2Total: step2Result.total,
// // // //           ...step3Data
// // // //         })
// // // //       });

// // // //       if (response.ok) {
// // // //         const result = await response.json();
// // // //         setFinalResult(result);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Final prediction failed:', error);
// // // //     } finally {
// // // //       setIsLoading(false);
// // // //     }
// // // //   };

// // // //   // Navigation functions
// // // //   const goToStep = (step) => {
// // // //     if (step === 1) {
// // // //       setCurrentStep(1);
// // // //     } else if (step === 2 && step1Result) {
// // // //       setCurrentStep(2);
// // // //     } else if (step === 3 && step2Result) {
// // // //       setCurrentStep(3);
// // // //     }
// // // //   };

// // // //   const goBackToStep1 = () => {
// // // //     setCurrentStep(1);
// // // //     // Clear subsequent results when going back to step 1
// // // //     setStep2Result(null);
// // // //     setFinalResult(null);
// // // //   };

// // // //   const goBackToStep2 = () => {
// // // //     setCurrentStep(2);
// // // //     // Clear final result when going back to step 2
// // // //     setFinalResult(null);
// // // //   };

// // // //   const resetPrediction = () => {
// // // //     setStep1Result(null);
// // // //     setStep2Result(null);
// // // //     setFinalResult(null);
// // // //     setCurrentStep(1);
// // // //     // Optionally reset form data
// // // //     // setStep1Data({ director: '', genre: '', cast1: '', cast2: '', cast3: '', cast4: '', musicDirector: '', leadSinger: '', category: 'None' });
// // // //     // setStep2Data({ teaserViews: 50, trailerViews: 50, bestHits: 50, posterViews: 50 });
// // // //     // setStep3Data({ imdbRating: 6.5, criticsReview: 5.0 });
// // // //   };

// // // //   const isStep1Complete = step1Data.director && step1Data.genre && step1Data.cast1 && step1Data.cast2;

// // // //   if (isLoadingData) {
// // // //     return (
// // // //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// // // //         <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
// // // //           <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
// // // //           <h3 className="text-lg font-semibold text-gray-900">Loading Excel Data...</h3>
// // // //           <p className="text-gray-600">Fetching movie database from Google Sheets</p>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-50">
// // // //       {/* Header */}
// // // //       <header className="bg-white shadow-sm border-b border-gray-200">
// // // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // // //           <div className="flex justify-between items-center h-16">
// // // //             <div className="flex items-center space-x-4">
// // // //               <button
// // // //                 onClick={() => window.history.back()}
// // // //                 className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
// // // //               >
// // // //                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
// // // //                 </svg>
// // // //                 <span>Back to Dashboard</span>
// // // //               </button>
// // // //               <div className="h-6 border-l border-gray-300"></div>
// // // //               <div className="flex items-center space-x-3">
// // // //                 <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
// // // //                   📊
// // // //                 </div>
// // // //                 <div>
// // // //                   <h1 className="text-xl font-bold text-gray-900">Excel Movie Prediction</h1>
// // // //                   <p className="text-xs text-gray-500">Historical Data Analysis</p>
// // // //                 </div>
// // // //               </div>
// // // //             </div>

// // // //             <div className="flex items-center space-x-4">
// // // //               <div className="text-right">
// // // //                 <p className="text-sm font-medium text-gray-900">{user?.username}</p>
// // // //                 <p className="text-xs text-gray-500">{user?.email}</p>
// // // //               </div>
// // // //               <button
// // // //                 onClick={onLogout}
// // // //                 className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors duration-200"
// // // //               >
// // // //                 <span className="text-sm font-medium">Logout</span>
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </header>

// // // //       {/* Main Content */}
// // // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// // // //         {/* Progress Steps */}
// // // //         <div className="mb-8">
// // // //           <div className="flex items-center justify-center space-x-8">
// // // //             {[1, 2, 3].map((step) => (
// // // //               <div key={step} className="flex items-center">
// // // //                 <button
// // // //                   onClick={() => goToStep(step)}
// // // //                   disabled={step === 2 && !step1Result || step === 3 && !step2Result}
// // // //                   className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-200 ${
// // // //                     currentStep === step
// // // //                       ? 'bg-blue-600 text-white ring-4 ring-blue-200'
// // // //                       : currentStep > step || (step === 2 && step1Result) || (step === 3 && step2Result)
// // // //                       ? 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer'
// // // //                       : 'bg-gray-200 text-gray-500 cursor-not-allowed'
// // // //                   }`}
// // // //                 >
// // // //                   {step}
// // // //                 </button>
// // // //                 <span className={`ml-2 font-medium ${
// // // //                   currentStep >= step ? 'text-blue-600' : 'text-gray-500'
// // // //                 }`}>
// // // //                   {step === 1 ? 'Cast & Crew' : step === 2 ? 'Marketing' : 'Reviews'}
// // // //                 </span>
// // // //                 {step < 3 && (
// // // //                   <div className={`w-16 h-1 ml-4 ${
// // // //                     currentStep > step ? 'bg-blue-500' : 'bg-gray-200'
// // // //                   }`}></div>
// // // //                 )}
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         </div>

// // // //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// // // //           {/* Left Panel - Form */}
// // // //           <div className="lg:col-span-2">
// // // //             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// // // //               {/* Adjustment Slider */}
// // // //               <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
// // // //                 <label className="block text-sm font-semibold text-gray-700 mb-2">
// // // //                   Prediction Adjustment: {adjustmentPercentage}%
// // // //                 </label>
// // // //                 <input
// // // //                   type="range"
// // // //                   min="-100"
// // // //                   max="100"
// // // //                   value={adjustmentPercentage}
// // // //                   onChange={(e) => setAdjustmentPercentage(Number(e.target.value))}
// // // //                   className="w-full"
// // // //                 />
// // // //                 <div className="flex justify-between text-xs text-gray-500 mt-1">
// // // //                   <span>-100% (Conservative)</span>
// // // //                   <span>0% (Baseline)</span>
// // // //                   <span>+100% (Optimistic)</span>
// // // //                 </div>
// // // //               </div>

// // // //               {/* Step 1: Cast & Crew */}
// // // //               {currentStep === 1 && (
// // // //                 <div className="space-y-6">
// // // //                   <div className="flex items-center justify-between">
// // // //                     <h3 className="text-lg font-bold text-gray-900">🎬 Step 1: Cast & Crew Details</h3>
// // // //                     {step1Result && (
// // // //                       <span className="text-sm text-green-600 font-medium flex items-center gap-2">
// // // //                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
// // // //                         </svg>
// // // //                         Completed
// // // //                       </span>
// // // //                     )}
// // // //                   </div>
                  
// // // //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-2">Director *</label>
// // // //                       <select
// // // //                         value={step1Data.director}
// // // //                         onChange={(e) => setStep1Data({...step1Data, director: e.target.value})}
// // // //                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
// // // //                       >
// // // //                         <option value="">Select Director</option>
// // // //                         {options.directors.map(director => (
// // // //                           <option key={director} value={director}>{director}</option>
// // // //                         ))}
// // // //                       </select>
// // // //                     </div>

// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-2">Genre *</label>
// // // //                       <select
// // // //                         value={step1Data.genre}
// // // //                         onChange={(e) => setStep1Data({...step1Data, genre: e.target.value})}
// // // //                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
// // // //                       >
// // // //                         <option value="">Select Genre</option>
// // // //                         {options.genres.map(genre => (
// // // //                           <option key={genre} value={genre}>{genre}</option>
// // // //                         ))}
// // // //                       </select>
// // // //                     </div>

// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-2">Lead Actor *</label>
// // // //                       <select
// // // //                         value={step1Data.cast1}
// // // //                         onChange={(e) => setStep1Data({...step1Data, cast1: e.target.value})}
// // // //                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
// // // //                       >
// // // //                         <option value="">Select Lead Actor</option>
// // // //                         {options.casts.map(cast => (
// // // //                           <option key={cast} value={cast}>{cast}</option>
// // // //                         ))}
// // // //                       </select>
// // // //                     </div>

// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-2">Supporting Actor *</label>
// // // //                       <select
// // // //                         value={step1Data.cast2}
// // // //                         onChange={(e) => setStep1Data({...step1Data, cast2: e.target.value})}
// // // //                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
// // // //                       >
// // // //                         <option value="">Select Supporting Actor</option>
// // // //                         {options.casts.map(cast => (
// // // //                           <option key={cast} value={cast}>{cast}</option>
// // // //                         ))}
// // // //                       </select>
// // // //                     </div>

// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-2">Cast 3</label>
// // // //                       <select
// // // //                         value={step1Data.cast3}
// // // //                         onChange={(e) => setStep1Data({...step1Data, cast3: e.target.value})}
// // // //                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
// // // //                       >
// // // //                         <option value="">Select Cast 3</option>
// // // //                         {options.casts.map(cast => (
// // // //                           <option key={cast} value={cast}>{cast}</option>
// // // //                         ))}
// // // //                       </select>
// // // //                     </div>

// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-2">Cast 4</label>
// // // //                       <select
// // // //                         value={step1Data.cast4}
// // // //                         onChange={(e) => setStep1Data({...step1Data, cast4: e.target.value})}
// // // //                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
// // // //                       >
// // // //                         <option value="">Select Cast 4</option>
// // // //                         {options.casts.map(cast => (
// // // //                           <option key={cast} value={cast}>{cast}</option>
// // // //                         ))}
// // // //                       </select>
// // // //                     </div>

// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-2">Music Director</label>
// // // //                       <select
// // // //                         value={step1Data.musicDirector}
// // // //                         onChange={(e) => setStep1Data({...step1Data, musicDirector: e.target.value})}
// // // //                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
// // // //                       >
// // // //                         <option value="">Select Music Director</option>
// // // //                         {options.musicDirectors.map(md => (
// // // //                           <option key={md} value={md}>{md}</option>
// // // //                         ))}
// // // //                       </select>
// // // //                     </div>

// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-2">Lead Singer</label>
// // // //                       <select
// // // //                         value={step1Data.leadSinger}
// // // //                         onChange={(e) => setStep1Data({...step1Data, leadSinger: e.target.value})}
// // // //                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
// // // //                       >
// // // //                         <option value="">Select Lead Singer</option>
// // // //                         {options.leadSingers.map(singer => (
// // // //                           <option key={singer} value={singer}>{singer}</option>
// // // //                         ))}
// // // //                       </select>
// // // //                     </div>
// // // //                   </div>

// // // //                   <div>
// // // //                     <label className="block text-sm font-medium text-gray-700 mb-2">Movie Category</label>
// // // //                     <div className="flex space-x-4">
// // // //                       {['None', 'Religious/Political', 'Political'].map(category => (
// // // //                         <label key={category} className="flex items-center">
// // // //                           <input
// // // //                             type="radio"
// // // //                             value={category}
// // // //                             checked={step1Data.category === category}
// // // //                             onChange={(e) => setStep1Data({...step1Data, category: e.target.value})}
// // // //                             className="mr-2"
// // // //                           />
// // // //                           {category}
// // // //                         </label>
// // // //                       ))}
// // // //                     </div>
// // // //                   </div>

// // // //                   <div className="flex gap-4">
// // // //                     <button
// // // //                       onClick={handleStep1Submit}
// // // //                       disabled={!isStep1Complete || isLoading}
// // // //                       className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
// // // //                         isStep1Complete && !isLoading
// // // //                           ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700'
// // // //                           : 'bg-gray-200 text-gray-400 cursor-not-allowed'
// // // //                       }`}
// // // //                     >
// // // //                       {isLoading ? 'Calculating...' : step1Result ? 'Recalculate Step 1' : 'Predict Step 1'}
// // // //                     </button>
                    
// // // //                     {step1Result && (
// // // //                       <button
// // // //                         onClick={() => setCurrentStep(2)}
// // // //                         className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all duration-200"
// // // //                       >
// // // //                         Next Step →
// // // //                       </button>
// // // //                     )}
// // // //                   </div>
// // // //                 </div>
// // // //               )}

// // // //               {/* Step 2: Marketing Metrics */}
// // // //               {currentStep === 2 && (
// // // //                 <div className="space-y-6">
// // // //                   <div className="flex items-center justify-between">
// // // //                     <h3 className="text-lg font-bold text-gray-900">📈 Step 2: Marketing Impact</h3>
// // // //                     {step2Result && (
// // // //                       <span className="text-sm text-green-600 font-medium flex items-center gap-2">
// // // //                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
// // // //                         </svg>
// // // //                         Completed
// // // //                       </span>
// // // //                     )}
// // // //                   </div>
                  
// // // //                   <div className="space-y-4">
// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-2">
// // // //                         Teaser Views Impact: {step2Data.teaserViews}%
// // // //                       </label>
// // // //                       <input
// // // //                         type="range"
// // // //                         min="0"
// // // //                         max="100"
// // // //                         value={step2Data.teaserViews}
// // // //                         onChange={(e) => setStep2Data({...step2Data, teaserViews: Number(e.target.value)})}
// // // //                         className="w-full"
// // // //                       />
// // // //                     </div>

// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-2">
// // // //                         Trailer Views Impact: {step2Data.trailerViews}%
// // // //                       </label>
// // // //                       <input
// // // //                         type="range"
// // // //                         min="0"
// // // //                         max="100"
// // // //                         value={step2Data.trailerViews}
// // // //                         onChange={(e) => setStep2Data({...step2Data, trailerViews: Number(e.target.value)})}
// // // //                         className="w-full"
// // // //                       />
// // // //                     </div>

// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-2">
// // // //                         Best Hits in Songs: {step2Data.bestHits}%
// // // //                       </label>
// // // //                       <input
// // // //                         type="range"
// // // //                         min="0"
// // // //                         max="100"
// // // //                         value={step2Data.bestHits}
// // // //                         onChange={(e) => setStep2Data({...step2Data, bestHits: Number(e.target.value)})}
// // // //                         className="w-full"
// // // //                       />
// // // //                     </div>

// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-2">
// // // //                         Poster Views Impact: {step2Data.posterViews}%
// // // //                       </label>
// // // //                       <input
// // // //                         type="range"
// // // //                         min="0"
// // // //                         max="100"
// // // //                         value={step2Data.posterViews}
// // // //                         onChange={(e) => setStep2Data({...step2Data, posterViews: Number(e.target.value)})}
// // // //                         className="w-full"
// // // //                       />
// // // //                     </div>
// // // //                   </div>

// // // //                   <div className="flex gap-4">
// // // //                     <button
// // // //                       onClick={goBackToStep1}
// // // //                       className="px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all duration-200"
// // // //                     >
// // // //                       ← Back to Step 1
// // // //                     </button>
                    
// // // //                     <button
// // // //                       onClick={handleStep2Submit}
// // // //                       disabled={isLoading}
// // // //                       className="flex-1 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
// // // //                     >
// // // //                       {isLoading ? 'Calculating...' : step2Result ? 'Recalculate Step 2' : 'Predict Step 2'}
// // // //                     </button>
                    
// // // //                     {step2Result && (
// // // //                       <button
// // // //                         onClick={() => setCurrentStep(3)}
// // // //                         className="px-6 py-3 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition-all duration-200"
// // // //                       >
// // // //                         Next Step →
// // // //                       </button>
// // // //                     )}
// // // //                   </div>
// // // //                 </div>
// // // //               )}

// // // //               {/* Step 3: Reviews */}
// // // //               {currentStep === 3 && (
// // // //                 <div className="space-y-6">
// // // //                   <div className="flex items-center justify-between">
// // // //                     <h3 className="text-lg font-bold text-gray-900">⭐ Step 3: Critical Reception</h3>
// // // //                     {finalResult && (
// // // //                       <span className="text-sm text-green-600 font-medium flex items-center gap-2">
// // // //                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
// // // //                         </svg>
// // // //                         Completed
// // // //                       </span>
// // // //                     )}
// // // //                   </div>
                  
// // // //                   <div className="space-y-4">
// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-2">
// // // //                         IMDB Rating: {step3Data.imdbRating}/10
// // // //                       </label>
// // // //                       <input
// // // //                         type="range"
// // // //                         min="0"
// // // //                         max="10"
// // // //                         step="0.1"
// // // //                         value={step3Data.imdbRating}
// // // //                         onChange={(e) => setStep3Data({...step3Data, imdbRating: Number(e.target.value)})}
// // // //                         className="w-full"
// // // //                       />
// // // //                     </div>

// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-2">
// // // //                         Critics Review: {step3Data.criticsReview}/10
// // // //                       </label>
// // // //                       <input
// // // //                         type="range"
// // // //                         min="0"
// // // //                         max="10"
// // // //                         step="0.1"
// // // //                         value={step3Data.criticsReview}
// // // //                         onChange={(e) => setStep3Data({...step3Data, criticsReview: Number(e.target.value)})}
// // // //                         className="w-full"
// // // //                       />
// // // //                     </div>
// // // //                   </div>

// // // //                   <div className="flex gap-4">
// // // //                     <button
// // // //                       onClick={goBackToStep2}
// // // //                       className="px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all duration-200"
// // // //                     >
// // // //                       ← Back to Step 2
// // // //                     </button>
                    
// // // //                     <button
// // // //                       onClick={handleStep3Submit}
// // // //                       disabled={isLoading}
// // // //                       className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-indigo-700 transition-all duration-200"
// // // //                     >
// // // //                       {isLoading ? 'Calculating Final...' : finalResult ? 'Recalculate Final' : 'Get Final Prediction'}
// // // //                     </button>
// // // //                   </div>
// // // //                 </div>
// // // //               )}
// // // //             </div>
// // // //           </div>

// // // //           {/* Right Panel - Results */}
// // // //           <div className="space-y-6">
// // // //             {/* Step 1 Result */}
// // // //             {step1Result && (
// // // //               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// // // //                 <div className="flex items-center justify-between mb-4">
// // // //                   <h4 className="text-lg font-bold text-gray-900">🎬 Step 1 Results</h4>
// // // //                   <button
// // // //                     onClick={goBackToStep1}
// // // //                     className="text-sm text-blue-600 hover:text-blue-800 font-medium"
// // // //                   >
// // // //                     Edit
// // // //                   </button>
// // // //                 </div>
// // // //                 <div className="space-y-3">
// // // //                   <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
// // // //                     <span className="text-sm font-medium text-gray-700">Weekend Collection:</span>
// // // //                     <span className="text-lg font-bold text-blue-600">₹{step1Result.weekend} Cr</span>
// // // //                   </div>
// // // //                   <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
// // // //                     <span className="text-sm font-medium text-gray-700">Total Collection:</span>
// // // //                     <span className="text-lg font-bold text-green-600">₹{step1Result.total} Cr</span>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             )}

// // // //             {/* Step 2 Result */}
// // // //             {step2Result && (
// // // //               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// // // //                 <div className="flex items-center justify-between mb-4">
// // // //                   <h4 className="text-lg font-bold text-gray-900">📈 Step 2 Results</h4>
// // // //                   <button
// // // //                     onClick={goBackToStep2}
// // // //                     className="text-sm text-blue-600 hover:text-blue-800 font-medium"
// // // //                   >
// // // //                     Edit
// // // //                   </button>
// // // //                 </div>
// // // //                 <div className="space-y-3">
// // // //                   <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
// // // //                     <span className="text-sm font-medium text-gray-700">Weekend Collection:</span>
// // // //                     <span className="text-lg font-bold text-blue-600">₹{step2Result.weekend} Cr</span>
// // // //                   </div>
// // // //                   <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
// // // //                     <span className="text-sm font-medium text-gray-700">Total Collection:</span>
// // // //                     <span className="text-lg font-bold text-green-600">₹{step2Result.total} Cr</span>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             )}

// // // //             {/* Final Result */}
// // // //             {finalResult && (
// // // //               <div className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl border-2 border-purple-200 p-6">
// // // //                 <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
// // // //                   🎯 Final Prediction
// // // //                 </h4>
// // // //                 <div className="space-y-4">
// // // //                   <div className="text-center p-4 bg-white rounded-lg shadow-sm">
// // // //                     <p className="text-sm font-medium text-gray-600 mb-1">Weekend Collection</p>
// // // //                     <p className="text-3xl font-bold text-purple-600">₹{finalResult.weekend} Cr</p>
// // // //                   </div>
// // // //                   <div className="text-center p-4 bg-white rounded-lg shadow-sm">
// // // //                     <p className="text-sm font-medium text-gray-600 mb-1">Total Collection</p>
// // // //                     <p className="text-3xl font-bold text-indigo-600">₹{finalResult.total} Cr</p>
// // // //                   </div>
// // // //                   <div className="flex gap-2">
// // // //                     <button
// // // //                       onClick={() => setCurrentStep(3)}
// // // //                       className="flex-1 py-2 px-4 bg-purple-100 text-purple-700 rounded-lg font-medium hover:bg-purple-200 transition-colors"
// // // //                     >
// // // //                       🔧 Adjust Reviews
// // // //                     </button>
// // // //                     <button
// // // //                       onClick={resetPrediction}
// // // //                       className="flex-1 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
// // // //                     >
// // // //                       🔄 Start New
// // // //                     </button>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             )}

// // // //             {/* Navigation Helper */}
// // // //             {(step1Result || step2Result || finalResult) && (
// // // //               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// // // //                 <h4 className="text-lg font-bold text-gray-900 mb-4">🧭 Quick Navigation</h4>
// // // //                 <div className="space-y-2">
// // // //                   <button
// // // //                     onClick={goBackToStep1}
// // // //                     className="w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
// // // //                   >
// // // //                     <span className="text-blue-500">🎬</span>
// // // //                     <span>Modify Cast & Crew</span>
// // // //                   </button>
// // // //                   {step1Result && (
// // // //                     <button
// // // //                       onClick={goBackToStep2}
// // // //                       className="w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
// // // //                     >
// // // //                       <span className="text-green-500">📈</span>
// // // //                       <span>Adjust Marketing Impact</span>
// // // //                     </button>
// // // //                   )}
// // // //                   {step2Result && (
// // // //                     <button
// // // //                       onClick={() => setCurrentStep(3)}
// // // //                       className="w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
// // // //                     >
// // // //                       <span className="text-purple-500">⭐</span>
// // // //                       <span>Update Reviews & Ratings</span>
// // // //                     </button>
// // // //                   )}
// // // //                 </div>
// // // //               </div>
// // // //             )}

// // // //             {/* Data Info */}
// // // //             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// // // //               <h4 className="text-lg font-bold text-gray-900 mb-4">📊 Data Source</h4>
// // // //               <div className="space-y-2 text-sm text-gray-600">
// // // //                 <p>• Historical movie data from Google Sheets</p>
// // // //                 <p>• {options.directors.length} Directors in database</p>
// // // //                 <p>• {options.casts.length} Cast members tracked</p>
// // // //                 <p>• {options.genres.length} Genres analyzed</p>
// // // //                 <button
// // // //                   onClick={loadExcelData}
// // // //                   className="mt-3 w-full py-2 px-4 bg-blue-50 text-blue-700 rounded-lg font-medium hover:bg-blue-100 transition-colors"
// // // //                 >
// // // //                   🔄 Refresh Data
// // // //                 </button>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default ExcelMoviePrediction;
// // // // import React, { useState, useEffect } from 'react';
// // // // import { apiService } from '../services/apiService';

// // // // function ExcelMoviePrediction({ user, onLogout, onTokenExpired,onBack  }) {
// // // //   // Form state for Step 1 (Cast & Crew)
// // // //   const [step1Data, setStep1Data] = useState({
// // // //     director: '',
// // // //     genre: '',
// // // //     cast1: '',
// // // //     cast2: '',
// // // //     cast3: '',
// // // //     cast4: '',
// // // //     musicDirector: '',
// // // //     leadSinger: '',
// // // //     category: 'None'
// // // //   });

// // // //   // Form state for Step 2 (Marketing Metrics)
// // // //   const [step2Data, setStep2Data] = useState({
// // // //     teaserViews: 50,
// // // //     trailerViews: 50,
// // // //     bestHits: 50,
// // // //     posterViews: 50
// // // //   });

// // // //   // Form state for Step 3 (Reviews)
// // // //   const [step3Data, setStep3Data] = useState({
// // // //     imdbRating: 6.5,
// // // //     criticsReview: 5.0
// // // //   });

// // // //   // Prediction results
// // // //   const [step1Result, setStep1Result] = useState(null);
// // // //   const [step2Result, setStep2Result] = useState(null);
// // // //   const [finalResult, setFinalResult] = useState(null);

// // // //   // UI state
// // // //   const [currentStep, setCurrentStep] = useState(1);
// // // //   const [isLoading, setIsLoading] = useState(false);
// // // //   const [adjustmentPercentage, setAdjustmentPercentage] = useState(0);
// // // //   const [excelData, setExcelData] = useState(null);
// // // //   const [isLoadingData, setIsLoadingData] = useState(true);
// // // //   const [saveStatus, setSaveStatus] = useState(''); // Track save status
// // // //   const [predictionSaved, setPredictionSaved] = useState(false);

// // // //   // Static options (these would come from your Google Sheets data)
// // // //   const [options, setOptions] = useState({
// // // //     directors: [],
// // // //     genres: [],
// // // //     casts: [],
// // // //     musicDirectors: [],
// // // //     leadSingers: []
// // // //   });

// // // //   // Load Excel data on component mount
// // // //   useEffect(() => {
// // // //     loadExcelData();
// // // //   }, []);

// // // //   const loadExcelData = async () => {
// // // //     setIsLoadingData(true);
// // // //     try {
// // // //       // Use apiService instead of direct fetch
// // // //       const data = await apiService.getExcelData();
// // // //       setExcelData(data);
      
// // // //       // Extract unique options from the data
// // // //       const directors = [...new Set(data.map(row => row.Director).filter(Boolean))].sort();
// // // //       const genres = [...new Set(data.map(row => row.Genre).filter(Boolean))].sort();
// // // //       const casts = [...new Set([
// // // //         ...data.map(row => row['Cast 1']),
// // // //         ...data.map(row => row['Cast 2']),
// // // //         ...data.map(row => row['Cast 3']),
// // // //         ...data.map(row => row['Cast 4'])
// // // //       ].filter(Boolean))].sort();
// // // //       const musicDirectors = [...new Set(data.map(row => row['Music Director']).filter(Boolean))].sort();
// // // //       const leadSingers = [...new Set(data.map(row => row['Lead Singer']).filter(Boolean))].sort();

// // // //       setOptions({
// // // //         directors,
// // // //         genres,
// // // //         casts,
// // // //         musicDirectors,
// // // //         leadSingers
// // // //       });
// // // //     } catch (error) {
// // // //       console.error('Failed to load Excel data:', error);
// // // //     } finally {
// // // //       setIsLoadingData(false);
// // // //     }
// // // //   };

// // // //   const handleStep1Submit = async () => {
// // // //     setIsLoading(true);
// // // //     try {
// // // //       // Use enhanced API method with optional saving
// // // //       const result = await apiService.predictExcelStep1Enhanced({
// // // //         ...step1Data,
// // // //         adjustmentPercentage
// // // //       }, false); // Don't save individual steps, only final

// // // //       setStep1Result(result);
// // // //       setCurrentStep(2);
// // // //     } catch (error) {
// // // //       console.error('Step 1 prediction failed:', error);
// // // //     } finally {
// // // //       setIsLoading(false);
// // // //     }
// // // //   };

// // // //   const handleStep2Submit = async () => {
// // // //     setIsLoading(true);
// // // //     try {
// // // //       // Use enhanced API method with optional saving
// // // //       const result = await apiService.predictExcelStep2Enhanced({
// // // //         step1Weekend: step1Result.weekend,
// // // //         step1Total: step1Result.total,
// // // //         ...step2Data,
// // // //         category: step1Data.category
// // // //       }, false); // Don't save individual steps, only final

// // // //       setStep2Result(result);
// // // //       setCurrentStep(3);
// // // //     } catch (error) {
// // // //       console.error('Step 2 prediction failed:', error);
// // // //     } finally {
// // // //       setIsLoading(false);
// // // //     }
// // // //   };

// // // // //   const handleStep3Submit = async () => {
// // // // //     setIsLoading(true);
// // // // //     setSaveStatus('Calculating...');
// // // // //     setPredictionSaved(false);
    
// // // // //     try {
// // // // //       // Prepare complete movie data for saving
// // // // //       const completeMovieData = {
// // // // //         director: step1Data.director,
// // // // //         genre: step1Data.genre,
// // // // //         cast_1: step1Data.cast1,
// // // // //         cast_2: step1Data.cast2,
// // // // //         cast_3: step1Data.cast3,
// // // // //         cast_4: step1Data.cast4,
// // // // //         music_director: step1Data.musicDirector,
// // // // //         lead_singer: step1Data.leadSinger,
// // // // //         category: step1Data.category,
// // // // //         adjustment_percentage: adjustmentPercentage,
// // // // //         teaser_views: step2Data.teaserViews,
// // // // //         trailer_views: step2Data.trailerViews,
// // // // //         best_hits: step2Data.bestHits,
// // // // //         poster_views: step2Data.posterViews,
// // // // //         imdb_rating: step3Data.imdbRating,
// // // // //         critics_review: step3Data.criticsReview,
// // // // //         prediction_method: 'Excel Historical Data Analysis (3 Steps)',
// // // // //         data_source: 'Google Sheets Historical Data'
// // // // //       };

// // // // //       setSaveStatus('Saving to database...');

// // // // //       // Use the enhanced API method that automatically saves
// // // // //       const result = await apiService.predictExcelStep3Enhanced(
// // // // //         {
// // // // //           step2Weekend: step2Result.weekend,
// // // // //           step2Total: step2Result.total,
// // // // //           ...step3Data
// // // // //         },
// // // // //         completeMovieData,
// // // // //         true // saveToDatabase = true (automatic)
// // // // //       );

// // // // //       setFinalResult(result);
// // // // //       setPredictionSaved(true);
// // // // //       setSaveStatus('✅ Prediction saved successfully!');
      
// // // // //       // Clear save status after 3 seconds
// // // // //       setTimeout(() => {
// // // // //         setSaveStatus('');
// // // // //       }, 3000);

// // // // //     } catch (error) {
// // // // //       console.error('Final prediction failed:', error);
// // // // //       setSaveStatus('❌ Failed to save prediction');
      
// // // // //       // Clear error status after 3 seconds
// // // // //       setTimeout(() => {
// // // // //         setSaveStatus('');
// // // // //       }, 3000);
// // // // //     } finally {
// // // // //       setIsLoading(false);
// // // // //     }
// // // // //   };

// // // //   // Navigation functions
// // // //   const handleStep3Submit = async () => {
// // // //     setIsLoading(true);
// // // //     setSaveStatus('Calculating...');
// // // //     setPredictionSaved(false);
    
// // // //     try {
// // // //         // 🔧 ENSURE CONSISTENT FIELD MAPPING
// // // //         const completeMovieData = {
// // // //             // ✅ Use snake_case consistently
// // // //             director: step1Data.director,
// // // //             genre: step1Data.genre,
// // // //             cast_1: step1Data.cast1,
// // // //             cast_2: step1Data.cast2,
// // // //             cast_3: step1Data.cast3,
// // // //             cast_4: step1Data.cast4,
// // // //             music_director: step1Data.musicDirector,
// // // //             lead_singer: step1Data.leadSinger,
// // // //             category: step1Data.category,
// // // //             adjustment_percentage: adjustmentPercentage,
// // // //             teaser_views: step2Data.teaserViews,
// // // //             trailer_views: step2Data.trailerViews,
// // // //             best_hits: step2Data.bestHits,
// // // //             poster_views: step2Data.posterViews,
// // // //             imdb_rating: step3Data.imdbRating,
// // // //             critics_review: step3Data.criticsReview,
// // // //             prediction_method: 'Excel Historical Data Analysis (3 Steps)',
// // // //             data_source: 'Google Sheets Historical Data',
// // // //             movie_title: `${step1Data.director} Movie`
// // // //         };

// // // //         setSaveStatus('Saving to database...');

// // // //         // 🔍 DEBUG: Log what we're sending
// // // //         console.log('🔧 Final prediction data being sent:', {
// // // //             stepData: {
// // // //                 step2Weekend: step2Result.weekend,
// // // //                 step2Total: step2Result.total,
// // // //                 ...step3Data
// // // //             },
// // // //             movieData: completeMovieData
// // // //         });

// // // //         const result = await apiService.predictExcelStep3Enhanced(
// // // //             {
// // // //                 step2Weekend: step2Result.weekend,
// // // //                 step2Total: step2Result.total,
// // // //                 ...step3Data
// // // //             },
// // // //             completeMovieData,
// // // //             true // saveToDatabase = true
// // // //         );

// // // //         setFinalResult(result);
// // // //         setPredictionSaved(true);
// // // //         setSaveStatus('✅ Prediction saved successfully!');
        
// // // //         // Clear save status after 3 seconds
// // // //         setTimeout(() => {
// // // //             setSaveStatus('');
// // // //         }, 3000);

// // // //     } catch (error) {
// // // //         console.error('Final prediction failed:', error);
// // // //         setSaveStatus('❌ Failed to save prediction');
        
// // // //         setTimeout(() => {
// // // //             setSaveStatus('');
// // // //         }, 3000);
// // // //     } finally {
// // // //         setIsLoading(false);
// // // //     }
// // // // };
  
  
// // // //   const goToStep = (step) => {
// // // //     if (step === 1) {
// // // //       setCurrentStep(1);
// // // //     } else if (step === 2 && step1Result) {
// // // //       setCurrentStep(2);
// // // //     } else if (step === 3 && step2Result) {
// // // //       setCurrentStep(3);
// // // //     }
// // // //   };

// // // //   const goBackToStep1 = () => {
// // // //     setCurrentStep(1);
// // // //     // Clear subsequent results when going back to step 1
// // // //     setStep2Result(null);
// // // //     setFinalResult(null);
// // // //     setPredictionSaved(false);
// // // //     setSaveStatus('');
// // // //   };

// // // //   const goBackToStep2 = () => {
// // // //     setCurrentStep(2);
// // // //     // Clear final result when going back to step 2
// // // //     setFinalResult(null);
// // // //     setPredictionSaved(false);
// // // //     setSaveStatus('');
// // // //   };

// // // //   const resetPrediction = () => {
// // // //     setStep1Result(null);
// // // //     setStep2Result(null);
// // // //     setFinalResult(null);
// // // //     setCurrentStep(1);
// // // //     setPredictionSaved(false);
// // // //     setSaveStatus('');
// // // //     // Reset form data
// // // //     setStep1Data({ 
// // // //       director: '', 
// // // //       genre: '', 
// // // //       cast1: '', 
// // // //       cast2: '', 
// // // //       cast3: '', 
// // // //       cast4: '', 
// // // //       musicDirector: '', 
// // // //       leadSinger: '', 
// // // //       category: 'None' 
// // // //     });
// // // //     setStep2Data({ 
// // // //       teaserViews: 50, 
// // // //       trailerViews: 50, 
// // // //       bestHits: 50, 
// // // //       posterViews: 50 
// // // //     });
// // // //     setStep3Data({ 
// // // //       imdbRating: 6.5, 
// // // //       criticsReview: 5.0 
// // // //     });
// // // //     setAdjustmentPercentage(0);
// // // //   };

// // // //   const isStep1Complete = step1Data.director && step1Data.genre && step1Data.cast1 && step1Data.cast2;

// // // //   if (isLoadingData) {
// // // //     return (
// // // //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// // // //         <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
// // // //           <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
// // // //           <h3 className="text-lg font-semibold text-gray-900">Loading Excel Data...</h3>
// // // //           <p className="text-gray-600">Fetching movie database from Google Sheets</p>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-50">
// // // //       {/* Header */}
// // // //       <header className="bg-white shadow-sm border-b border-gray-200">
// // // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // // //           <div className="flex justify-between items-center h-16">
// // // //             <div className="flex items-center space-x-4">
// // // //               {/* ✅ FIXED: Proper back button implementation */}
// // // //               <button
// // // //                 onClick={() => {
// // // //                   console.log('🔙 Back button clicked');
// // // //                   if (onBack) {
// // // //                     onBack();
// // // //                   } else {
// // // //                     console.warn('⚠️ onBack prop not provided, using window.history.back()');
// // // //                     window.history.back();
// // // //                   }
// // // //                 }}
// // // //                 className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
// // // //               >
// // // //                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
// // // //                 </svg>
// // // //                 <span>Back</span>
// // // //               </button>
             
// // // //             </div>

           
// // // //           </div>
// // // //         </div>
// // // //       </header>

// // // //       {/* Main Content */}
// // // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// // // //         {/* Progress Steps */}
// // // //         <div className="mb-8">
// // // //           <div className="flex items-center justify-center space-x-8">
// // // //             {[1, 2, 3].map((step) => (
// // // //               <div key={step} className="flex items-center">
// // // //                 <button
// // // //                   onClick={() => goToStep(step)}
// // // //                   disabled={step === 2 && !step1Result || step === 3 && !step2Result}
// // // //                   className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-200 ${
// // // //                     currentStep === step
// // // //                       ? 'bg-blue-600 text-white ring-4 ring-blue-200'
// // // //                       : currentStep > step || (step === 2 && step1Result) || (step === 3 && step2Result)
// // // //                       ? 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer'
// // // //                       : 'bg-gray-200 text-gray-500 cursor-not-allowed'
// // // //                   }`}
// // // //                 >
// // // //                   {step}
// // // //                 </button>
// // // //                 <span className={`ml-2 font-medium ${
// // // //                   currentStep >= step ? 'text-blue-600' : 'text-gray-500'
// // // //                 }`}>
// // // //                   {step === 1 ? 'Cast & Crew' : step === 2 ? 'Marketing' : 'Reviews'}
// // // //                 </span>
// // // //                 {step < 3 && (
// // // //                   <div className={`w-16 h-1 ml-4 ${
// // // //                     currentStep > step ? 'bg-blue-500' : 'bg-gray-200'
// // // //                   }`}></div>
// // // //                 )}
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         </div>

// // // //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// // // //           {/* Left Panel - Form */}
// // // //           <div className="lg:col-span-2">
// // // //             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// // // //               {/* Adjustment Slider */}
// // // //               <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
// // // //                 <label className="block text-sm font-semibold text-gray-700 mb-2">
// // // //                   Prediction Adjustment: {adjustmentPercentage}%
// // // //                 </label>
// // // //                 <input
// // // //                   type="range"
// // // //                   min="-100"
// // // //                   max="100"
// // // //                   value={adjustmentPercentage}
// // // //                   onChange={(e) => setAdjustmentPercentage(Number(e.target.value))}
// // // //                   className="w-full"
// // // //                 />
// // // //                 <div className="flex justify-between text-xs text-gray-500 mt-1">
// // // //                   <span>-100% (Conservative)</span>
// // // //                   <span>0% (Baseline)</span>
// // // //                   <span>+100% (Optimistic)</span>
// // // //                 </div>
// // // //               </div>

// // // //               {/* Step 1: Cast & Crew */}
// // // //               {currentStep === 1 && (
// // // //                 <div className="space-y-6">
// // // //                   <div className="flex items-center justify-between">
// // // //                     <h3 className="text-lg font-bold text-gray-900">🎬 Step 1: Cast & Crew Details</h3>
// // // //                     {step1Result && (
// // // //                       <span className="text-sm text-green-600 font-medium flex items-center gap-2">
// // // //                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
// // // //                         </svg>
// // // //                         Completed
// // // //                       </span>
// // // //                     )}
// // // //                   </div>
                  
// // // //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-2">Director *</label>
// // // //                       <select
// // // //                         value={step1Data.director}
// // // //                         onChange={(e) => setStep1Data({...step1Data, director: e.target.value})}
// // // //                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
// // // //                       >
// // // //                         <option value="">Select Director</option>
// // // //                         {options.directors.map(director => (
// // // //                           <option key={director} value={director}>{director}</option>
// // // //                         ))}
// // // //                       </select>
// // // //                     </div>

// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-2">Genre *</label>
// // // //                       <select
// // // //                         value={step1Data.genre}
// // // //                         onChange={(e) => setStep1Data({...step1Data, genre: e.target.value})}
// // // //                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
// // // //                       >
// // // //                         <option value="">Select Genre</option>
// // // //                         {options.genres.map(genre => (
// // // //                           <option key={genre} value={genre}>{genre}</option>
// // // //                         ))}
// // // //                       </select>
// // // //                     </div>

// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-2">Lead Actor *</label>
// // // //                       <select
// // // //                         value={step1Data.cast1}
// // // //                         onChange={(e) => setStep1Data({...step1Data, cast1: e.target.value})}
// // // //                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
// // // //                       >
// // // //                         <option value="">Select Lead Actor</option>
// // // //                         {options.casts.map(cast => (
// // // //                           <option key={cast} value={cast}>{cast}</option>
// // // //                         ))}
// // // //                       </select>
// // // //                     </div>

// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-2">Supporting Actor *</label>
// // // //                       <select
// // // //                         value={step1Data.cast2}
// // // //                         onChange={(e) => setStep1Data({...step1Data, cast2: e.target.value})}
// // // //                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
// // // //                       >
// // // //                         <option value="">Select Supporting Actor</option>
// // // //                         {options.casts.map(cast => (
// // // //                           <option key={cast} value={cast}>{cast}</option>
// // // //                         ))}
// // // //                       </select>
// // // //                     </div>

// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-2">Cast 3</label>
// // // //                       <select
// // // //                         value={step1Data.cast3}
// // // //                         onChange={(e) => setStep1Data({...step1Data, cast3: e.target.value})}
// // // //                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
// // // //                       >
// // // //                         <option value="">Select Cast 3</option>
// // // //                         {options.casts.map(cast => (
// // // //                           <option key={cast} value={cast}>{cast}</option>
// // // //                         ))}
// // // //                       </select>
// // // //                     </div>

// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-2">Cast 4</label>
// // // //                       <select
// // // //                         value={step1Data.cast4}
// // // //                         onChange={(e) => setStep1Data({...step1Data, cast4: e.target.value})}
// // // //                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
// // // //                       >
// // // //                         <option value="">Select Cast 4</option>
// // // //                         {options.casts.map(cast => (
// // // //                           <option key={cast} value={cast}>{cast}</option>
// // // //                         ))}
// // // //                       </select>
// // // //                     </div>

// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-2">Music Director</label>
// // // //                       <select
// // // //                         value={step1Data.musicDirector}
// // // //                         onChange={(e) => setStep1Data({...step1Data, musicDirector: e.target.value})}
// // // //                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
// // // //                       >
// // // //                         <option value="">Select Music Director</option>
// // // //                         {options.musicDirectors.map(md => (
// // // //                           <option key={md} value={md}>{md}</option>
// // // //                         ))}
// // // //                       </select>
// // // //                     </div>

// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-2">Lead Singer</label>
// // // //                       <select
// // // //                         value={step1Data.leadSinger}
// // // //                         onChange={(e) => setStep1Data({...step1Data, leadSinger: e.target.value})}
// // // //                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
// // // //                       >
// // // //                         <option value="">Select Lead Singer</option>
// // // //                         {options.leadSingers.map(singer => (
// // // //                           <option key={singer} value={singer}>{singer}</option>
// // // //                         ))}
// // // //                       </select>
// // // //                     </div>
// // // //                   </div>

// // // //                   <div>
// // // //                     <label className="block text-sm font-medium text-gray-700 mb-2">Movie Category</label>
// // // //                     <div className="flex space-x-4">
// // // //                       {['None', 'Religious/Political', 'Political'].map(category => (
// // // //                         <label key={category} className="flex items-center">
// // // //                           <input
// // // //                             type="radio"
// // // //                             value={category}
// // // //                             checked={step1Data.category === category}
// // // //                             onChange={(e) => setStep1Data({...step1Data, category: e.target.value})}
// // // //                             className="mr-2"
// // // //                           />
// // // //                           {category}
// // // //                         </label>
// // // //                       ))}
// // // //                     </div>
// // // //                   </div>

// // // //                   <div className="flex gap-4">
// // // //                     <button
// // // //                       onClick={handleStep1Submit}
// // // //                       disabled={!isStep1Complete || isLoading}
// // // //                       className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
// // // //                         isStep1Complete && !isLoading
// // // //                           ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700'
// // // //                           : 'bg-gray-200 text-gray-400 cursor-not-allowed'
// // // //                       }`}
// // // //                     >
// // // //                       {isLoading ? 'Calculating...' : step1Result ? 'Recalculate Step 1' : 'Predict Step 1'}
// // // //                     </button>
                    
// // // //                     {step1Result && (
// // // //                       <button
// // // //                         onClick={() => setCurrentStep(2)}
// // // //                         className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all duration-200"
// // // //                       >
// // // //                         Next Step →
// // // //                       </button>
// // // //                     )}
// // // //                   </div>
// // // //                 </div>
// // // //               )}

// // // //               {/* Step 2: Marketing Metrics */}
// // // //               {currentStep === 2 && (
// // // //                 <div className="space-y-6">
// // // //                   <div className="flex items-center justify-between">
// // // //                     <h3 className="text-lg font-bold text-gray-900">📈 Step 2: Marketing Impact</h3>
// // // //                     {step2Result && (
// // // //                       <span className="text-sm text-green-600 font-medium flex items-center gap-2">
// // // //                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
// // // //                         </svg>
// // // //                         Completed
// // // //                       </span>
// // // //                     )}
// // // //                   </div>
                  
// // // //                   <div className="space-y-4">
// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-2">
// // // //                         Teaser Views Impact: {step2Data.teaserViews}%
// // // //                       </label>
// // // //                       <input
// // // //                         type="range"
// // // //                         min="0"
// // // //                         max="100"
// // // //                         value={step2Data.teaserViews}
// // // //                         onChange={(e) => setStep2Data({...step2Data, teaserViews: Number(e.target.value)})}
// // // //                         className="w-full"
// // // //                       />
// // // //                     </div>

// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-2">
// // // //                         Trailer Views Impact: {step2Data.trailerViews}%
// // // //                       </label>
// // // //                       <input
// // // //                         type="range"
// // // //                         min="0"
// // // //                         max="100"
// // // //                         value={step2Data.trailerViews}
// // // //                         onChange={(e) => setStep2Data({...step2Data, trailerViews: Number(e.target.value)})}
// // // //                         className="w-full"
// // // //                       />
// // // //                     </div>

// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-2">
// // // //                         Best Hits in Songs: {step2Data.bestHits}%
// // // //                       </label>
// // // //                       <input
// // // //                         type="range"
// // // //                         min="0"
// // // //                         max="100"
// // // //                         value={step2Data.bestHits}
// // // //                         onChange={(e) => setStep2Data({...step2Data, bestHits: Number(e.target.value)})}
// // // //                         className="w-full"
// // // //                       />
// // // //                     </div>

// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-2">
// // // //                         Poster Views Impact: {step2Data.posterViews}%
// // // //                       </label>
// // // //                       <input
// // // //                         type="range"
// // // //                         min="0"
// // // //                         max="100"
// // // //                         value={step2Data.posterViews}
// // // //                         onChange={(e) => setStep2Data({...step2Data, posterViews: Number(e.target.value)})}
// // // //                         className="w-full"
// // // //                       />
// // // //                     </div>
// // // //                   </div>

// // // //                   <div className="flex gap-4">
// // // //                     <button
// // // //                       onClick={goBackToStep1}
// // // //                       className="px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all duration-200"
// // // //                     >
// // // //                       ← Back to Step 1
// // // //                     </button>
                    
// // // //                     <button
// // // //                       onClick={handleStep2Submit}
// // // //                       disabled={isLoading}
// // // //                       className="flex-1 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
// // // //                     >
// // // //                       {isLoading ? 'Calculating...' : step2Result ? 'Recalculate Step 2' : 'Predict Step 2'}
// // // //                     </button>
                    
// // // //                     {step2Result && (
// // // //                       <button
// // // //                         onClick={() => setCurrentStep(3)}
// // // //                         className="px-6 py-3 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition-all duration-200"
// // // //                       >
// // // //                         Next Step →
// // // //                       </button>
// // // //                     )}
// // // //                   </div>
// // // //                 </div>
// // // //               )}

// // // //               {/* Step 3: Reviews */}
// // // //               {currentStep === 3 && (
// // // //                 <div className="space-y-6">
// // // //                   <div className="flex items-center justify-between">
// // // //                     <h3 className="text-lg font-bold text-gray-900">⭐ Step 3: Critical Reception</h3>
// // // //                     {finalResult && (
// // // //                       <span className="text-sm text-green-600 font-medium flex items-center gap-2">
// // // //                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
// // // //                         </svg>
// // // //                         Completed
// // // //                       </span>
// // // //                     )}
// // // //                   </div>
                  
// // // //                   <div className="space-y-4">
// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-2">
// // // //                         IMDB Rating: {step3Data.imdbRating}/10
// // // //                       </label>
// // // //                       <input
// // // //                         type="range"
// // // //                         min="0"
// // // //                         max="10"
// // // //                         step="0.1"
// // // //                         value={step3Data.imdbRating}
// // // //                         onChange={(e) => setStep3Data({...step3Data, imdbRating: Number(e.target.value)})}
// // // //                         className="w-full"
// // // //                       />
// // // //                     </div>

// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-2">
// // // //                         Critics Review: {step3Data.criticsReview}/10
// // // //                       </label>
// // // //                       <input
// // // //                         type="range"
// // // //                         min="0"
// // // //                         max="10"
// // // //                         step="0.1"
// // // //                         value={step3Data.criticsReview}
// // // //                         onChange={(e) => setStep3Data({...step3Data, criticsReview: Number(e.target.value)})}
// // // //                         className="w-full"
// // // //                       />
// // // //                     </div>
// // // //                   </div>

// // // //                   <div className="flex gap-4">
// // // //                     <button
// // // //                       onClick={goBackToStep2}
// // // //                       className="px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all duration-200"
// // // //                     >
// // // //                       ← Back to Step 2
// // // //                     </button>
                    
// // // //                     <button
// // // //                       onClick={handleStep3Submit}
// // // //                       disabled={isLoading}
// // // //                       className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-indigo-700 transition-all duration-200"
// // // //                     >
// // // //                       {isLoading ? 'Calculating Final...' : finalResult ? 'Recalculate Final' : 'Get Final Prediction'}
// // // //                     </button>
// // // //                   </div>
// // // //                 </div>
// // // //               )}
// // // //             </div>
// // // //           </div>

// // // //           {/* Right Panel - Results */}
// // // //           <div className="space-y-6">
// // // //             {/* Save Status Panel */}
// // // //             {(finalResult || saveStatus || predictionSaved) && (
// // // //               <div className={`rounded-xl border-2 p-4 ${
// // // //                 predictionSaved 
// // // //                   ? 'bg-green-50 border-green-200' 
// // // //                   : saveStatus.includes('❌')
// // // //                   ? 'bg-red-50 border-red-200'
// // // //                   : 'bg-blue-50 border-blue-200'
// // // //               }`}>
// // // //                 <div className="flex items-center gap-2">
// // // //                   {predictionSaved ? (
// // // //                     <>
// // // //                       <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
// // // //                       </svg>
// // // //                       <span className="text-sm font-medium text-green-800">Prediction Saved to Database!</span>
// // // //                     </>
// // // //                   ) : saveStatus.includes('❌') ? (
// // // //                     <>
// // // //                       <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="6 18L18 6M6 6l12 12" />
// // // //                       </svg>
// // // //                       <span className="text-sm font-medium text-red-800">Save Failed</span>
// // // //                     </>
// // // //                   ) : (
// // // //                     <>
// // // //                       <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
// // // //                       <span className="text-sm font-medium text-blue-800">Saving...</span>
// // // //                     </>
// // // //                   )}
// // // //                 </div>
// // // //                 {predictionSaved && (
// // // //                   <p className="text-xs text-green-600 mt-1">
// // // //                     You can view this prediction in your history dashboard.
// // // //                   </p>
// // // //                 )}
// // // //               </div>
// // // //             )}

// // // //             {/* Step 1 Result */}
// // // //             {step1Result && (
// // // //               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// // // //                 <div className="flex items-center justify-between mb-4">
// // // //                   <h4 className="text-lg font-bold text-gray-900">🎬 Step 1 Results</h4>
// // // //                   <button
// // // //                     onClick={goBackToStep1}
// // // //                     className="text-sm text-blue-600 hover:text-blue-800 font-medium"
// // // //                   >
// // // //                     Edit
// // // //                   </button>
// // // //                 </div>
// // // //                 <div className="space-y-3">
// // // //                   <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
// // // //                     <span className="text-sm font-medium text-gray-700">Weekend Collection:</span>
// // // //                     <span className="text-lg font-bold text-blue-600">₹{step1Result.weekend} Cr</span>
// // // //                   </div>
// // // //                   <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
// // // //                     <span className="text-sm font-medium text-gray-700">Total Collection:</span>
// // // //                     <span className="text-lg font-bold text-green-600">₹{step1Result.total} Cr</span>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             )}

// // // //             {/* Step 2 Result */}
// // // //             {step2Result && (
// // // //               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// // // //                 <div className="flex items-center justify-between mb-4">
// // // //                   <h4 className="text-lg font-bold text-gray-900">📈 Step 2 Results</h4>
// // // //                   <button
// // // //                     onClick={goBackToStep2}
// // // //                     className="text-sm text-blue-600 hover:text-blue-800 font-medium"
// // // //                   >
// // // //                     Edit
// // // //                   </button>
// // // //                 </div>
// // // //                 <div className="space-y-3">
// // // //                   <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
// // // //                     <span className="text-sm font-medium text-gray-700">Weekend Collection:</span>
// // // //                     <span className="text-lg font-bold text-blue-600">₹{step2Result.weekend} Cr</span>
// // // //                   </div>
// // // //                   <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
// // // //                     <span className="text-sm font-medium text-gray-700">Total Collection:</span>
// // // //                     <span className="text-lg font-bold text-green-600">₹{step2Result.total} Cr</span>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             )}

// // // //             {/* Final Result */}
// // // //             {finalResult && (
// // // //               <div className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl border-2 border-purple-200 p-6">
// // // //                 <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
// // // //                   🎯 Final Prediction
// // // //                   {predictionSaved && (
// // // //                     <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
// // // //                       Saved
// // // //                     </span>
// // // //                   )}
// // // //                 </h4>
// // // //                 <div className="space-y-4">
// // // //                   <div className="text-center p-4 bg-white rounded-lg shadow-sm">
// // // //                     <p className="text-sm font-medium text-gray-600 mb-1">Weekend Collection</p>
// // // //                     <p className="text-3xl font-bold text-purple-600">₹{finalResult.weekend} Cr</p>
// // // //                   </div>
// // // //                   <div className="text-center p-4 bg-white rounded-lg shadow-sm">
// // // //                     <p className="text-sm font-medium text-gray-600 mb-1">Total Collection</p>
// // // //                     <p className="text-3xl font-bold text-indigo-600">₹{finalResult.total} Cr</p>
// // // //                   </div>
                  
// // // //                   {/* Confidence Score */}
// // // //                   {finalResult.breakdown && (
// // // //                     <div className="text-center p-3 bg-white rounded-lg shadow-sm">
// // // //                       <p className="text-sm font-medium text-gray-600 mb-1">Confidence</p>
// // // //                       <div className="flex items-center justify-center gap-2">
// // // //                         <div className="w-16 bg-gray-200 rounded-full h-2">
// // // //                           <div 
// // // //                             className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
// // // //                             style={{ width: `${apiService.calculateConfidence(
// // // //                               {
// // // //                                 director: step1Data.director,
// // // //                                 cast_1: step1Data.cast1,
// // // //                                 cast_2: step1Data.cast2,
// // // //                                 music_director: step1Data.musicDirector,
// // // //                                 teaser_views: step2Data.teaserViews,
// // // //                                 trailer_views: step2Data.trailerViews,
// // // //                                 imdb_rating: step3Data.imdbRating,
// // // //                                 critics_review: step3Data.criticsReview,
// // // //                                 genre: step1Data.genre,
// // // //                                 category: step1Data.category
// // // //                               },
// // // //                               finalResult
// // // //                             )}%` }}
// // // //                           ></div>
// // // //                         </div>
// // // //                         <span className="text-sm font-bold text-green-600">
// // // //                           {apiService.calculateConfidence(
// // // //                             {
// // // //                               director: step1Data.director,
// // // //                               cast_1: step1Data.cast1,
// // // //                               cast_2: step1Data.cast2,
// // // //                               music_director: step1Data.musicDirector,
// // // //                               teaser_views: step2Data.teaserViews,
// // // //                               trailer_views: step2Data.trailerViews,
// // // //                               imdb_rating: step3Data.imdbRating,
// // // //                               critics_review: step3Data.criticsReview,
// // // //                               genre: step1Data.genre,
// // // //                               category: step1Data.category
// // // //                             },
// // // //                             finalResult
// // // //                           )}%
// // // //                         </span>
// // // //                       </div>
// // // //                     </div>
// // // //                   )}

// // // //                   <div className="flex gap-2">
// // // //                     <button
// // // //                       onClick={() => setCurrentStep(3)}
// // // //                       className="flex-1 py-2 px-4 bg-purple-100 text-purple-700 rounded-lg font-medium hover:bg-purple-200 transition-colors"
// // // //                     >
// // // //                       🔧 Adjust Reviews
// // // //                     </button>
// // // //                     <button
// // // //                       onClick={resetPrediction}
// // // //                       className="flex-1 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
// // // //                     >
// // // //                       🔄 Start New
// // // //                     </button>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             )}

// // // //             {/* Navigation Helper */}
// // // //             {(step1Result || step2Result || finalResult) && (
// // // //               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// // // //                 <h4 className="text-lg font-bold text-gray-900 mb-4">🧭 Quick Navigation</h4>
// // // //                 <div className="space-y-2">
// // // //                   <button
// // // //                     onClick={goBackToStep1}
// // // //                     className="w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
// // // //                   >
// // // //                     <span className="text-blue-500">🎬</span>
// // // //                     <span>Modify Cast & Crew</span>
// // // //                   </button>
// // // //                   {step1Result && (
// // // //                     <button
// // // //                       onClick={goBackToStep2}
// // // //                       className="w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
// // // //                     >
// // // //                       <span className="text-green-500">📈</span>
// // // //                       <span>Adjust Marketing Impact</span>
// // // //                     </button>
// // // //                   )}
// // // //                   {step2Result && (
// // // //                     <button
// // // //                       onClick={() => setCurrentStep(3)}
// // // //                       className="w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
// // // //                     >
// // // //                       <span className="text-purple-500">⭐</span>
// // // //                       <span>Update Reviews & Ratings</span>
// // // //                     </button>
// // // //                   )}
// // // //                 </div>
// // // //               </div>
// // // //             )}

// // // //             {/* Prediction Summary */}
// // // //             {finalResult && (
// // // //               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// // // //                 <h4 className="text-lg font-bold text-gray-900 mb-4">📋 Prediction Summary</h4>
// // // //                 <div className="space-y-2 text-sm">
// // // //                   <div className="flex justify-between">
// // // //                     <span className="text-gray-600">Director:</span>
// // // //                     <span className="font-medium">{step1Data.director}</span>
// // // //                   </div>
// // // //                   <div className="flex justify-between">
// // // //                     <span className="text-gray-600">Genre:</span>
// // // //                     <span className="font-medium">{step1Data.genre}</span>
// // // //                   </div>
// // // //                   <div className="flex justify-between">
// // // //                     <span className="text-gray-600">Lead Actor:</span>
// // // //                     <span className="font-medium">{step1Data.cast1}</span>
// // // //                   </div>
// // // //                   <div className="flex justify-between">
// // // //                     <span className="text-gray-600">Category:</span>
// // // //                     <span className="font-medium">{step1Data.category}</span>
// // // //                   </div>
// // // //                   <div className="flex justify-between">
// // // //                     <span className="text-gray-600">IMDB Rating:</span>
// // // //                     <span className="font-medium">{step3Data.imdbRating}/10</span>
// // // //                   </div>
// // // //                   <div className="flex justify-between">
// // // //                     <span className="text-gray-600">Method:</span>
// // // //                     <span className="font-medium text-xs">Excel 3-Step Analysis</span>
// // // //                   </div>
// // // //                   {predictionSaved && (
// // // //                     <div className="mt-3 pt-3 border-t border-gray-200">
// // // //                       <div className="flex items-center gap-2 text-green-600">
// // // //                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
// // // //                         </svg>
// // // //                         <span className="text-xs font-medium">Saved to your prediction history</span>
// // // //                       </div>
// // // //                     </div>
// // // //                   )}
// // // //                 </div>
// // // //               </div>
// // // //             )}

// // // //             {/* Data Info */}
// // // //             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// // // //               <h4 className="text-lg font-bold text-gray-900 mb-4">📊 Data Source</h4>
// // // //               <div className="space-y-2 text-sm text-gray-600">
// // // //                 <p>• Historical movie data from Google Sheets</p>
// // // //                 <p>• {options.directors.length} Directors in database</p>
// // // //                 <p>• {options.casts.length} Cast members tracked</p>
// // // //                 <p>• {options.genres.length} Genres analyzed</p>
// // // //                 <p>• Auto-save enabled for final predictions</p>
// // // //                 <button
// // // //                   onClick={loadExcelData}
// // // //                   className="mt-3 w-full py-2 px-4 bg-blue-50 text-blue-700 rounded-lg font-medium hover:bg-blue-100 transition-colors"
// // // //                 >
// // // //                   🔄 Refresh Data
// // // //                 </button>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default ExcelMoviePrediction;
// // // import React, { useState, useEffect } from 'react';
// // // import { apiService } from '../services/apiService';

// // // function ExcelMoviePrediction({ user, onLogout, onTokenExpired, onBack }) {
// // //   // Form state for Step 1 (Cast & Crew + Movie Title)
// // //   const [step1Data, setStep1Data] = useState({
// // //     movieTitle: '', // 🆕 NEW: Movie title field
// // //     director: '',
// // //     genre: '',
// // //     cast1: '',
// // //     cast2: '',
// // //     cast3: '',
// // //     cast4: '',
// // //     musicDirector: '',
// // //     leadSinger: '',
// // //     category: 'None'
// // //   });

// // //   // Form state for Step 2 (Marketing Metrics)
// // //   const [step2Data, setStep2Data] = useState({
// // //     teaserViews: 50,
// // //     trailerViews: 50,
// // //     bestHits: 50,
// // //     posterViews: 50
// // //   });

// // //   // Form state for Step 3 (Reviews)
// // //   const [step3Data, setStep3Data] = useState({
// // //     imdbRating: 6.5,
// // //     criticsReview: 5.0
// // //   });

// // //   // Prediction results
// // //   const [step1Result, setStep1Result] = useState(null);
// // //   const [step2Result, setStep2Result] = useState(null);
// // //   const [finalResult, setFinalResult] = useState(null);

// // //   // UI state
// // //   const [currentStep, setCurrentStep] = useState(1);
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [adjustmentPercentage, setAdjustmentPercentage] = useState(0);
// // //   const [excelData, setExcelData] = useState(null);
// // //   const [isLoadingData, setIsLoadingData] = useState(true);
// // //   const [saveStatus, setSaveStatus] = useState('');
// // //   const [predictionSaved, setPredictionSaved] = useState(false);

// // //   // Static options
// // //   const [options, setOptions] = useState({
// // //     directors: [],
// // //     genres: [],
// // //     casts: [],
// // //     musicDirectors: [],
// // //     leadSingers: []
// // //   });

// // //   // Load Excel data on component mount
// // //   useEffect(() => {
// // //     loadExcelData();
// // //   }, []);

// // //   const loadExcelData = async () => {
// // //     setIsLoadingData(true);
// // //     try {
// // //       const data = await apiService.getExcelData();
// // //       setExcelData(data);
      
// // //       // Extract unique options from the data
// // //       const directors = [...new Set(data.map(row => row.Director).filter(Boolean))].sort();
// // //       const genres = [...new Set(data.map(row => row.Genre).filter(Boolean))].sort();
// // //       const casts = [...new Set([
// // //         ...data.map(row => row['Cast 1']),
// // //         ...data.map(row => row['Cast 2']),
// // //         ...data.map(row => row['Cast 3']),
// // //         ...data.map(row => row['Cast 4'])
// // //       ].filter(Boolean))].sort();
// // //       const musicDirectors = [...new Set(data.map(row => row['Music Director']).filter(Boolean))].sort();
// // //       const leadSingers = [...new Set(data.map(row => row['Lead Singer']).filter(Boolean))].sort();

// // //       setOptions({
// // //         directors,
// // //         genres,
// // //         casts,
// // //         musicDirectors,
// // //         leadSingers
// // //       });
// // //     } catch (error) {
// // //       console.error('Failed to load Excel data:', error);
// // //     } finally {
// // //       setIsLoadingData(false);
// // //     }
// // //   };

// // //   const handleStep1Submit = async () => {
// // //     setIsLoading(true);
// // //     try {
// // //       const result = await apiService.predictExcelStep1Enhanced({
// // //         ...step1Data,
// // //         adjustmentPercentage
// // //       }, false);

// // //       setStep1Result(result);
// // //       setCurrentStep(2);
// // //     } catch (error) {
// // //       console.error('Step 1 prediction failed:', error);
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   const handleStep2Submit = async () => {
// // //     setIsLoading(true);
// // //     try {
// // //       const result = await apiService.predictExcelStep2Enhanced({
// // //         step1Weekend: step1Result.weekend,
// // //         step1Total: step1Result.total,
// // //         ...step2Data,
// // //         category: step1Data.category
// // //       }, false);

// // //       setStep2Result(result);
// // //       setCurrentStep(3);
// // //     } catch (error) {
// // //       console.error('Step 2 prediction failed:', error);
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   const handleStep3Submit = async () => {
// // //     setIsLoading(true);
// // //     setSaveStatus('Calculating...');
// // //     setPredictionSaved(false);
    
// // //     try {
// // //       const completeMovieData = {
// // //         director: step1Data.director,
// // //         genre: step1Data.genre,
// // //         cast_1: step1Data.cast1,
// // //         cast_2: step1Data.cast2,
// // //         cast_3: step1Data.cast3,
// // //         cast_4: step1Data.cast4,
// // //         music_director: step1Data.musicDirector,
// // //         lead_singer: step1Data.leadSinger,
// // //         category: step1Data.category,
// // //         adjustment_percentage: adjustmentPercentage,
// // //         teaser_views: step2Data.teaserViews,
// // //         trailer_views: step2Data.trailerViews,
// // //         best_hits: step2Data.bestHits,
// // //         poster_views: step2Data.posterViews,
// // //         imdb_rating: step3Data.imdbRating,
// // //         critics_review: step3Data.criticsReview,
// // //         prediction_method: 'Excel Historical Data Analysis (3 Steps)',
// // //         data_source: 'Google Sheets Historical Data',
// // //         movie_title: step1Data.movieTitle || `${step1Data.director} Movie` // 🆕 Use custom title or generate one
// // //       };

// // //       setSaveStatus('Saving to database...');

// // //       const result = await apiService.predictExcelStep3Enhanced(
// // //         {
// // //           step2Weekend: step2Result.weekend,
// // //           step2Total: step2Result.total,
// // //           ...step3Data
// // //         },
// // //         completeMovieData,
// // //         true
// // //       );

// // //       setFinalResult(result);
// // //       setPredictionSaved(true);
// // //       setSaveStatus('✅ Prediction saved successfully!');
      
// // //       setTimeout(() => {
// // //         setSaveStatus('');
// // //       }, 3000);

// // //     } catch (error) {
// // //       console.error('Final prediction failed:', error);
// // //       setSaveStatus('❌ Failed to save prediction');
      
// // //       setTimeout(() => {
// // //         setSaveStatus('');
// // //       }, 3000);
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };
  
// // //   const goToStep = (step) => {
// // //     if (step === 1) {
// // //       setCurrentStep(1);
// // //     } else if (step === 2 && step1Result) {
// // //       setCurrentStep(2);
// // //     } else if (step === 3 && step2Result) {
// // //       setCurrentStep(3);
// // //     }
// // //   };

// // //   const goBackToStep1 = () => {
// // //     setCurrentStep(1);
// // //     setStep2Result(null);
// // //     setFinalResult(null);
// // //     setPredictionSaved(false);
// // //     setSaveStatus('');
// // //   };

// // //   const goBackToStep2 = () => {
// // //     setCurrentStep(2);
// // //     setFinalResult(null);
// // //     setPredictionSaved(false);
// // //     setSaveStatus('');
// // //   };

// // //   const resetPrediction = () => {
// // //     setStep1Result(null);
// // //     setStep2Result(null);
// // //     setFinalResult(null);
// // //     setCurrentStep(1);
// // //     setPredictionSaved(false);
// // //     setSaveStatus('');
// // //     setStep1Data({ 
// // //       movieTitle: '', // 🆕 Reset movie title
// // //       director: '', 
// // //       genre: '', 
// // //       cast1: '', 
// // //       cast2: '', 
// // //       cast3: '', 
// // //       cast4: '', 
// // //       musicDirector: '', 
// // //       leadSinger: '', 
// // //       category: 'None' 
// // //     });
// // //     setStep2Data({ 
// // //       teaserViews: 50, 
// // //       trailerViews: 50, 
// // //       bestHits: 50, 
// // //       posterViews: 50 
// // //     });
// // //     setStep3Data({ 
// // //       imdbRating: 6.5, 
// // //       criticsReview: 5.0 
// // //     });
// // //     setAdjustmentPercentage(0);
// // //   };

// // //   const isStep1Complete = step1Data.director && step1Data.genre && step1Data.cast1 && step1Data.cast2;

// // //   if (isLoadingData) {
// // //     return (
// // //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// // //         <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
// // //           <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
// // //           <h3 className="text-lg font-semibold text-gray-900">Loading Excel Data...</h3>
// // //           <p className="text-gray-600">Fetching movie database from Google Sheets</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-gray-50">
// // //       {/* Header */}
// // //       <header className="bg-white shadow-sm border-b border-gray-200">
// // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // //           <div className="flex justify-between items-center h-16">
// // //             <div className="flex items-center space-x-4">
// // //               <button
// // //                 onClick={() => {
// // //                   console.log('🔙 Back button clicked');
// // //                   if (onBack) {
// // //                     onBack();
// // //                   } else {
// // //                     console.warn('⚠️ onBack prop not provided, using window.history.back()');
// // //                     window.history.back();
// // //                   }
// // //                 }}
// // //                 className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
// // //               >
// // //                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
// // //                 </svg>
// // //                 <span>Back</span>
// // //               </button>
// // //               <h1 className="text-xl font-bold text-gray-900">Excel Movie Prediction</h1>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </header>

// // //       {/* Main Content */}
// // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// // //         {/* Progress Steps */}
// // //         <div className="mb-8">
// // //           <div className="flex items-center justify-center space-x-8">
// // //             {[1, 2, 3].map((step) => (
// // //               <div key={step} className="flex items-center">
// // //                 <button
// // //                   onClick={() => goToStep(step)}
// // //                   disabled={step === 2 && !step1Result || step === 3 && !step2Result}
// // //                   className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-200 ${
// // //                     currentStep === step
// // //                       ? 'bg-blue-600 text-white ring-4 ring-blue-200'
// // //                       : currentStep > step || (step === 2 && step1Result) || (step === 3 && step2Result)
// // //                       ? 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer'
// // //                       : 'bg-gray-200 text-gray-500 cursor-not-allowed'
// // //                   }`}
// // //                 >
// // //                   {step}
// // //                 </button>
// // //                 <span className={`ml-2 font-medium ${
// // //                   currentStep >= step ? 'text-blue-600' : 'text-gray-500'
// // //                 }`}>
// // //                   {step === 1 ? 'Movie Details' : step === 2 ? 'Marketing' : 'Reviews'}
// // //                 </span>
// // //                 {step < 3 && (
// // //                   <div className={`w-16 h-1 ml-4 ${
// // //                     currentStep > step ? 'bg-blue-500' : 'bg-gray-200'
// // //                   }`}></div>
// // //                 )}
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>

// // //         {/* 🎯 UPDATED LAYOUT: Two Column Grid */}
// // //         <div className="flex gap-8">
// // //           {/* 📝 LEFT PANEL - ALL INPUTS */}
// // //           <div className="space-y-6">
// // //             {/* Adjustment Slider */}
// // //             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// // //               <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
// // //                 <label className="block text-sm font-semibold text-gray-700 mb-2">
// // //                   Prediction Adjustment: {adjustmentPercentage}%
// // //                 </label>
// // //                 <input
// // //                   type="range"
// // //                   min="-100"
// // //                   max="100"
// // //                   value={adjustmentPercentage}
// // //                   onChange={(e) => setAdjustmentPercentage(Number(e.target.value))}
// // //                   className="w-full"
// // //                 />
// // //                 <div className="flex justify-between text-xs text-gray-500 mt-1">
// // //                   <span>-100% (Conservative)</span>
// // //                   <span>0% (Baseline)</span>
// // //                   <span>+100% (Optimistic)</span>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {/* Step 1: Movie Details */}
// // //             {currentStep === 1 && (
// // //               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// // //                 <div className="flex items-center justify-between mb-6">
// // //                   <h3 className="text-lg font-bold text-gray-900">🎬 Step 1: Movie Details</h3>
// // //                   {step1Result && (
// // //                     <span className="text-sm text-green-600 font-medium flex items-center gap-2">
// // //                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
// // //                       </svg>
// // //                       Completed
// // //                     </span>
// // //                   )}
// // //                 </div>
                
// // //                 <div className="space-y-4">
// // //                   {/* 🆕 Movie Title Input - First Field */}
// // //                   <div className="col-span-2">
// // //                     <label className="block text-sm font-medium text-gray-700 mb-2">
// // //                       Movie Title <span className="text-gray-400">(Optional)</span>
// // //                     </label>
// // //                     <input
// // //                       type="text"
// // //                       value={step1Data.movieTitle}
// // //                       onChange={(e) => setStep1Data({...step1Data, movieTitle: e.target.value})}
// // //                       placeholder="Enter movie title or leave blank for auto-generation"
// // //                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
// // //                     />
// // //                     {!step1Data.movieTitle && step1Data.director && (
// // //                       <p className="text-xs text-gray-500 mt-1">
// // //                         Auto-generated: "{step1Data.director} Movie"
// // //                       </p>
// // //                     )}
// // //                   </div>

// // //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                     <div>
// // //                       <label className="block text-sm font-medium text-gray-700 mb-2">Director *</label>
// // //                       <select
// // //                         value={step1Data.director}
// // //                         onChange={(e) => setStep1Data({...step1Data, director: e.target.value})}
// // //                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
// // //                       >
// // //                         <option value="">Select Director</option>
// // //                         {options.directors.map(director => (
// // //                           <option key={director} value={director}>{director}</option>
// // //                         ))}
// // //                       </select>
// // //                     </div>

// // //                     <div>
// // //                       <label className="block text-sm font-medium text-gray-700 mb-2">Genre *</label>
// // //                       <select
// // //                         value={step1Data.genre}
// // //                         onChange={(e) => setStep1Data({...step1Data, genre: e.target.value})}
// // //                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
// // //                       >
// // //                         <option value="">Select Genre</option>
// // //                         {options.genres.map(genre => (
// // //                           <option key={genre} value={genre}>{genre}</option>
// // //                         ))}
// // //                       </select>
// // //                     </div>

// // //                     <div>
// // //                       <label className="block text-sm font-medium text-gray-700 mb-2">Lead Actor *</label>
// // //                       <select
// // //                         value={step1Data.cast1}
// // //                         onChange={(e) => setStep1Data({...step1Data, cast1: e.target.value})}
// // //                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
// // //                       >
// // //                         <option value="">Select Lead Actor</option>
// // //                         {options.casts.map(cast => (
// // //                           <option key={cast} value={cast}>{cast}</option>
// // //                         ))}
// // //                       </select>
// // //                     </div>

// // //                     <div>
// // //                       <label className="block text-sm font-medium text-gray-700 mb-2">Supporting Actor *</label>
// // //                       <select
// // //                         value={step1Data.cast2}
// // //                         onChange={(e) => setStep1Data({...step1Data, cast2: e.target.value})}
// // //                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
// // //                       >
// // //                         <option value="">Select Supporting Actor</option>
// // //                         {options.casts.map(cast => (
// // //                           <option key={cast} value={cast}>{cast}</option>
// // //                         ))}
// // //                       </select>
// // //                     </div>

// // //                     <div>
// // //                       <label className="block text-sm font-medium text-gray-700 mb-2">Cast 3</label>
// // //                       <select
// // //                         value={step1Data.cast3}
// // //                         onChange={(e) => setStep1Data({...step1Data, cast3: e.target.value})}
// // //                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
// // //                       >
// // //                         <option value="">Select Cast 3</option>
// // //                         {options.casts.map(cast => (
// // //                           <option key={cast} value={cast}>{cast}</option>
// // //                         ))}
// // //                       </select>
// // //                     </div>

// // //                     <div>
// // //                       <label className="block text-sm font-medium text-gray-700 mb-2">Cast 4</label>
// // //                       <select
// // //                         value={step1Data.cast4}
// // //                         onChange={(e) => setStep1Data({...step1Data, cast4: e.target.value})}
// // //                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
// // //                       >
// // //                         <option value="">Select Cast 4</option>
// // //                         {options.casts.map(cast => (
// // //                           <option key={cast} value={cast}>{cast}</option>
// // //                         ))}
// // //                       </select>
// // //                     </div>

// // //                     <div>
// // //                       <label className="block text-sm font-medium text-gray-700 mb-2">Music Director</label>
// // //                       <select
// // //                         value={step1Data.musicDirector}
// // //                         onChange={(e) => setStep1Data({...step1Data, musicDirector: e.target.value})}
// // //                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
// // //                       >
// // //                         <option value="">Select Music Director</option>
// // //                         {options.musicDirectors.map(md => (
// // //                           <option key={md} value={md}>{md}</option>
// // //                         ))}
// // //                       </select>
// // //                     </div>

// // //                     <div>
// // //                       <label className="block text-sm font-medium text-gray-700 mb-2">Lead Singer</label>
// // //                       <select
// // //                         value={step1Data.leadSinger}
// // //                         onChange={(e) => setStep1Data({...step1Data, leadSinger: e.target.value})}
// // //                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
// // //                       >
// // //                         <option value="">Select Lead Singer</option>
// // //                         {options.leadSingers.map(singer => (
// // //                           <option key={singer} value={singer}>{singer}</option>
// // //                         ))}
// // //                       </select>
// // //                     </div>
// // //                   </div>

// // //                   <div>
// // //                     <label className="block text-sm font-medium text-gray-700 mb-2">Movie Category</label>
// // //                     <div className="flex space-x-4">
// // //                       {['None', 'Religious/Political', 'Political'].map(category => (
// // //                         <label key={category} className="flex items-center">
// // //                           <input
// // //                             type="radio"
// // //                             value={category}
// // //                             checked={step1Data.category === category}
// // //                             onChange={(e) => setStep1Data({...step1Data, category: e.target.value})}
// // //                             className="mr-2"
// // //                           />
// // //                           {category}
// // //                         </label>
// // //                       ))}
// // //                     </div>
// // //                   </div>

// // //                   <div className="flex gap-4">
// // //                     <button
// // //                       onClick={handleStep1Submit}
// // //                       disabled={!isStep1Complete || isLoading}
// // //                       className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
// // //                         isStep1Complete && !isLoading
// // //                           ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700'
// // //                           : 'bg-gray-200 text-gray-400 cursor-not-allowed'
// // //                       }`}
// // //                     >
// // //                       {isLoading ? 'Calculating...' : step1Result ? 'Recalculate Step 1' : 'Predict Step 1'}
// // //                     </button>
                    
// // //                     {step1Result && (
// // //                       <button
// // //                         onClick={() => setCurrentStep(2)}
// // //                         className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all duration-200"
// // //                       >
// // //                         Next Step →
// // //                       </button>
// // //                     )}
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             )}

// // //             {/* Step 2: Marketing Metrics */}
// // //             {currentStep === 2 && (
// // //               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// // //                 <div className="flex items-center justify-between mb-6">
// // //                   <h3 className="text-lg font-bold text-gray-900">📈 Step 2: Marketing Impact</h3>
// // //                   {step2Result && (
// // //                     <span className="text-sm text-green-600 font-medium flex items-center gap-2">
// // //                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
// // //                       </svg>
// // //                       Completed
// // //                     </span>
// // //                   )}
// // //                 </div>
                
// // //                 <div className="space-y-4">
// // //                   <div>
// // //                     <label className="block text-sm font-medium text-gray-700 mb-2">
// // //                       Teaser Views Impact: {step2Data.teaserViews}%
// // //                     </label>
// // //                     <input
// // //                       type="range"
// // //                       min="0"
// // //                       max="100"
// // //                       value={step2Data.teaserViews}
// // //                       onChange={(e) => setStep2Data({...step2Data, teaserViews: Number(e.target.value)})}
// // //                       className="w-full"
// // //                     />
// // //                   </div>

// // //                   <div>
// // //                     <label className="block text-sm font-medium text-gray-700 mb-2">
// // //                       Trailer Views Impact: {step2Data.trailerViews}%
// // //                     </label>
// // //                     <input
// // //                       type="range"
// // //                       min="0"
// // //                       max="100"
// // //                       value={step2Data.trailerViews}
// // //                       onChange={(e) => setStep2Data({...step2Data, trailerViews: Number(e.target.value)})}
// // //                       className="w-full"
// // //                     />
// // //                   </div>

// // //                   <div>
// // //                     <label className="block text-sm font-medium text-gray-700 mb-2">
// // //                       Best Hits in Songs: {step2Data.bestHits}%
// // //                     </label>
// // //                     <input
// // //                       type="range"
// // //                       min="0"
// // //                       max="100"
// // //                       value={step2Data.bestHits}
// // //                       onChange={(e) => setStep2Data({...step2Data, bestHits: Number(e.target.value)})}
// // //                       className="w-full"
// // //                     />
// // //                   </div>

// // //                   <div>
// // //                     <label className="block text-sm font-medium text-gray-700 mb-2">
// // //                       Poster Views Impact: {step2Data.posterViews}%
// // //                     </label>
// // //                     <input
// // //                       type="range"
// // //                       min="0"
// // //                       max="100"
// // //                       value={step2Data.posterViews}
// // //                       onChange={(e) => setStep2Data({...step2Data, posterViews: Number(e.target.value)})}
// // //                       className="w-full"
// // //                     />
// // //                   </div>

// // //                   <div className="flex gap-4">
// // //                     <button
// // //                       onClick={goBackToStep1}
// // //                       className="px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all duration-200"
// // //                     >
// // //                       ← Back to Step 1
// // //                     </button>
                    
// // //                     <button
// // //                       onClick={handleStep2Submit}
// // //                       disabled={isLoading}
// // //                       className="flex-1 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
// // //                     >
// // //                       {isLoading ? 'Calculating...' : step2Result ? 'Recalculate Step 2' : 'Predict Step 2'}
// // //                     </button>
                    
// // //                     {step2Result && (
// // //                       <button
// // //                         onClick={() => setCurrentStep(3)}
// // //                         className="px-6 py-3 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition-all duration-200"
// // //                       >
// // //                         Next Step →
// // //                       </button>
// // //                     )}
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             )}

// // //             {/* Step 3: Reviews */}
// // //             {currentStep === 3 && (
// // //               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// // //                 <div className="flex items-center justify-between mb-6">
// // //                   <h3 className="text-lg font-bold text-gray-900">⭐ Step 3: Critical Reception</h3>
// // //                   {finalResult && (
// // //                     <span className="text-sm text-green-600 font-medium flex items-center gap-2">
// // //                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
// // //                       </svg>
// // //                       Completed
// // //                     </span>
// // //                   )}
// // //                 </div>
                
// // //                 <div className="space-y-4">
// // //                   <div>
// // //                     <label className="block text-sm font-medium text-gray-700 mb-2">
// // //                       IMDB Rating: {step3Data.imdbRating}/10
// // //                     </label>
// // //                     <input
// // //                       type="range"
// // //                       min="0"
// // //                       max="10"
// // //                       step="0.1"
// // //                       value={step3Data.imdbRating}
// // //                       onChange={(e) => setStep3Data({...step3Data, imdbRating: Number(e.target.value)})}
// // //                       className="w-full"
// // //                     />
// // //                   </div>

// // //                   <div>
// // //                     <label className="block text-sm font-medium text-gray-700 mb-2">
// // //                       Critics Review: {step3Data.criticsReview}/10
// // //                     </label>
// // //                     <input
// // //                       type="range"
// // //                       min="0"
// // //                       max="10"
// // //                       step="0.1"
// // //                       value={step3Data.criticsReview}
// // //                       onChange={(e) => setStep3Data({...step3Data, criticsReview: Number(e.target.value)})}
// // //                       className="w-full"
// // //                     />
// // //                   </div>

// // //                   <div className="flex gap-4">
// // //                     <button
// // //                       onClick={goBackToStep2}
// // //                       className="px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all duration-200"
// // //                     >
// // //                       ← Back to Step 2
// // //                     </button>
                    
// // //                     <button
// // //                       onClick={handleStep3Submit}
// // //                       disabled={isLoading}
// // //                       className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-indigo-700 transition-all duration-200"
// // //                     >
// // //                       {isLoading ? 'Calculating Final...' : finalResult ? 'Recalculate Final' : 'Get Final Prediction'}
// // //                     </button>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             )}

// // //             {/* Data Info Panel */}
// // //             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// // //               <h4 className="text-lg font-bold text-gray-900 mb-4">📊 Data Source</h4>
// // //               <div className="space-y-2 text-sm text-gray-600">
// // //                 <p>• Historical movie data from Google Sheets</p>
// // //                 <p>• {options.directors.length} Directors in database</p>
// // //                 <p>• {options.casts.length} Cast members tracked</p>
// // //                 <p>• {options.genres.length} Genres analyzed</p>
// // //                 <p>• Auto-save enabled for final predictions</p>
// // //                 <button
// // //                   onClick={loadExcelData}
// // //                   className="mt-3 w-full py-2 px-4 bg-blue-50 text-blue-700 rounded-lg font-medium hover:bg-blue-100 transition-colors"
// // //                 >
// // //                   🔄 Refresh Data
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* 📊 RIGHT PANEL - ALL OUTPUTS */}
// // //           <div className="space-y-1">
// // //             {/* Save Status Panel */}
// // //             {(finalResult || saveStatus || predictionSaved) && (
// // //               <div className={`rounded-xl border-2 p-4 ${
// // //                 predictionSaved 
// // //                   ? 'bg-green-50 border-green-200' 
// // //                   : saveStatus.includes('❌')
// // //                   ? 'bg-red-50 border-red-200'
// // //                   : 'bg-blue-50 border-blue-200'
// // //               }`}>
// // //                 <div className="flex items-center gap-2">
// // //                   {predictionSaved ? (
// // //                     <>
// // //                       <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
// // //                       </svg>
// // //                       <span className="text-sm font-medium text-green-800">Prediction Saved to Database!</span>
// // //                     </>
// // //                   ) : saveStatus.includes('❌') ? (
// // //                     <>
// // //                       <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="6 18L18 6M6 6l12 12" />
// // //                       </svg>
// // //                       <span className="text-sm font-medium text-red-800">Save Failed</span>
// // //                     </>
// // //                   ) : (
// // //                     <>
// // //                       <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
// // //                       <span className="text-sm font-medium text-blue-800">Saving...</span>
// // //                     </>
// // //                   )}
// // //                 </div>
// // //                 {predictionSaved && (
// // //                   <p className="text-xs text-green-600 mt-1">
// // //                     You can view this prediction in your history dashboard.
// // //                   </p>
// // //                 )}
// // //               </div>
// // //             )}

// // //             {/* Step 1 Result */}
// // //             {step1Result && (
// // //               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// // //                 <div className="flex items-center justify-between mb-4">
// // //                   <h4 className="text-lg font-bold text-gray-900">🎬 Step 1 Results</h4>
// // //                   <button
// // //                     onClick={goBackToStep1}
// // //                     className="text-sm text-blue-600 hover:text-blue-800 font-medium"
// // //                   >
// // //                     Edit
// // //                   </button>
// // //                 </div>
// // //                 <div className="space-y-3">
// // //                   <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
// // //                     <span className="text-sm font-medium text-gray-700">Weekend Collection:</span>
// // //                     <span className="text-lg font-bold text-blue-600">₹{step1Result.weekend} Cr</span>
// // //                   </div>
// // //                   <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
// // //                     <span className="text-sm font-medium text-gray-700">Total Collection:</span>
// // //                     <span className="text-lg font-bold text-green-600">₹{step1Result.total} Cr</span>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             )}

// // //             {/* Step 2 Result */}
// // //             {step2Result && (
// // //               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// // //                 <div className="flex items-center justify-between mb-4">
// // //                   <h4 className="text-lg font-bold text-gray-900">📈 Step 2 Results</h4>
// // //                   <button
// // //                     onClick={goBackToStep2}
// // //                     className="text-sm text-blue-600 hover:text-blue-800 font-medium"
// // //                   >
// // //                     Edit
// // //                   </button>
// // //                 </div>
// // //                 <div className="space-y-3">
// // //                   <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
// // //                     <span className="text-sm font-medium text-gray-700">Weekend Collection:</span>
// // //                     <span className="text-lg font-bold text-blue-600">₹{step2Result.weekend} Cr</span>
// // //                   </div>
// // //                   <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
// // //                     <span className="text-sm font-medium text-gray-700">Total Collection:</span>
// // //                     <span className="text-lg font-bold text-green-600">₹{step2Result.total} Cr</span>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             )}

// // //             {/* Final Result */}
// // //             {finalResult && (
// // //               <div className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl border-2 border-purple-200 p-6">
// // //                 <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
// // //                   🎯 Final Prediction
// // //                   {predictionSaved && (
// // //                     <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
// // //                       Saved
// // //                     </span>
// // //                   )}
// // //                 </h4>
// // //                 <div className="space-y-4">
// // //                   <div className="text-center p-4 bg-white rounded-lg shadow-sm">
// // //                     <p className="text-sm font-medium text-gray-600 mb-1">Weekend Collection</p>
// // //                     <p className="text-3xl font-bold text-purple-600">₹{finalResult.weekend} Cr</p>
// // //                   </div>
// // //                   <div className="text-center p-4 bg-white rounded-lg shadow-sm">
// // //                     <p className="text-sm font-medium text-gray-600 mb-1">Total Collection</p>
// // //                     <p className="text-3xl font-bold text-indigo-600">₹{finalResult.total} Cr</p>
// // //                   </div>
                  
// // //                   {/* Confidence Score */}
// // //                   {finalResult.breakdown && (
// // //                     <div className="text-center p-3 bg-white rounded-lg shadow-sm">
// // //                       <p className="text-sm font-medium text-gray-600 mb-1">Confidence</p>
// // //                       <div className="flex items-center justify-center gap-2">
// // //                         <div className="w-16 bg-gray-200 rounded-full h-2">
// // //                           <div 
// // //                             className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
// // //                             style={{ width: `${apiService.calculateConfidence(
// // //                               {
// // //                                 director: step1Data.director,
// // //                                 cast_1: step1Data.cast1,
// // //                                 cast_2: step1Data.cast2,
// // //                                 music_director: step1Data.musicDirector,
// // //                                 teaser_views: step2Data.teaserViews,
// // //                                 trailer_views: step2Data.trailerViews,
// // //                                 imdb_rating: step3Data.imdbRating,
// // //                                 critics_review: step3Data.criticsReview,
// // //                                 genre: step1Data.genre,
// // //                                 category: step1Data.category
// // //                               },
// // //                               finalResult
// // //                             )}%` }}
// // //                           ></div>
// // //                         </div>
// // //                         <span className="text-sm font-bold text-green-600">
// // //                           {apiService.calculateConfidence(
// // //                             {
// // //                               director: step1Data.director,
// // //                               cast_1: step1Data.cast1,
// // //                               cast_2: step1Data.cast2,
// // //                               music_director: step1Data.musicDirector,
// // //                               teaser_views: step2Data.teaserViews,
// // //                               trailer_views: step2Data.trailerViews,
// // //                               imdb_rating: step3Data.imdbRating,
// // //                               critics_review: step3Data.criticsReview,
// // //                               genre: step1Data.genre,
// // //                               category: step1Data.category
// // //                             },
// // //                             finalResult
// // //                           )}%
// // //                         </span>
// // //                       </div>
// // //                     </div>
// // //                   )}

// // //                   <div className="flex gap-2">
// // //                     <button
// // //                       onClick={() => setCurrentStep(3)}
// // //                       className="flex-1 py-2 px-4 bg-purple-100 text-purple-700 rounded-lg font-medium hover:bg-purple-200 transition-colors"
// // //                     >
// // //                       🔧 Adjust Reviews
// // //                     </button>
// // //                     <button
// // //                       onClick={resetPrediction}
// // //                       className="flex-1 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
// // //                     >
// // //                       🔄 Start New
// // //                     </button>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             )}

// // //             {/* Navigation Helper */}
// // //             {(step1Result || step2Result || finalResult) && (
// // //               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// // //                 <h4 className="text-lg font-bold text-gray-900 mb-4">🧭 Quick Navigation</h4>
// // //                 <div className="space-y-2">
// // //                   <button
// // //                     onClick={goBackToStep1}
// // //                     className="w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
// // //                   >
// // //                     <span className="text-blue-500">🎬</span>
// // //                     <span>Modify Movie Details</span>
// // //                   </button>
// // //                   {step1Result && (
// // //                     <button
// // //                       onClick={goBackToStep2}
// // //                       className="w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
// // //                     >
// // //                       <span className="text-green-500">📈</span>
// // //                       <span>Adjust Marketing Impact</span>
// // //                     </button>
// // //                   )}
// // //                   {step2Result && (
// // //                     <button
// // //                       onClick={() => setCurrentStep(3)}
// // //                       className="w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
// // //                     >
// // //                       <span className="text-purple-500">⭐</span>
// // //                       <span>Update Reviews & Ratings</span>
// // //                     </button>
// // //                   )}
// // //                 </div>
// // //               </div>
// // //             )}

// // //             {/* Prediction Summary */}
// // //             {finalResult && (
// // //               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// // //                 <h4 className="text-lg font-bold text-gray-900 mb-4">📋 Prediction Summary</h4>
// // //                 <div className="space-y-2 text-sm">
// // //                   {/* 🆕 Display Movie Title */}
// // //                   {(step1Data.movieTitle || step1Data.director) && (
// // //                     <div className="flex justify-between">
// // //                       <span className="text-gray-600">Movie Title:</span>
// // //                       <span className="font-medium">{step1Data.movieTitle || `${step1Data.director} Movie`}</span>
// // //                     </div>
// // //                   )}
// // //                   <div className="flex justify-between">
// // //                     <span className="text-gray-600">Director:</span>
// // //                     <span className="font-medium">{step1Data.director}</span>
// // //                   </div>
// // //                   <div className="flex justify-between">
// // //                     <span className="text-gray-600">Genre:</span>
// // //                     <span className="font-medium">{step1Data.genre}</span>
// // //                   </div>
// // //                   <div className="flex justify-between">
// // //                     <span className="text-gray-600">Lead Actor:</span>
// // //                     <span className="font-medium">{step1Data.cast1}</span>
// // //                   </div>
// // //                   <div className="flex justify-between">
// // //                     <span className="text-gray-600">Category:</span>
// // //                     <span className="font-medium">{step1Data.category}</span>
// // //                   </div>
// // //                   <div className="flex justify-between">
// // //                     <span className="text-gray-600">IMDB Rating:</span>
// // //                     <span className="font-medium">{step3Data.imdbRating}/10</span>
// // //                   </div>
// // //                   <div className="flex justify-between">
// // //                     <span className="text-gray-600">Method:</span>
// // //                     <span className="font-medium text-xs">Excel 3-Step Analysis</span>
// // //                   </div>
// // //                   {predictionSaved && (
// // //                     <div className="mt-3 pt-3 border-t border-gray-200">
// // //                       <div className="flex items-center gap-2 text-green-600">
// // //                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
// // //                         </svg>
// // //                         <span className="text-xs font-medium">Saved to your prediction history</span>
// // //                       </div>
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               </div>
// // //             )}

// // //             {/* Progress Indicator for Empty State */}
// // //             {!step1Result && !step2Result && !finalResult && (
// // //               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
// // //                 <div className="text-gray-400 mb-4">
// // //                   <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
// // //                   </svg>
// // //                 </div>
// // //                 <h4 className="text-lg font-medium text-gray-600 mb-2">Prediction Results Will Appear Here</h4>
// // //                 <p className="text-sm text-gray-500">Complete the movie details on the left to start generating predictions. Results from each step will be displayed in this panel.</p>
                
// // //                 <div className="mt-6 space-y-2">
// // //                   <div className="flex items-center justify-between text-xs text-gray-400">
// // //                     <span className="flex items-center gap-2">
// // //                       <div className="w-3 h-3 rounded-full bg-blue-200"></div>
// // //                       Step 1: Movie Details
// // //                     </span>
// // //                     <span>Cast & Crew Analysis</span>
// // //                   </div>
// // //                   <div className="flex items-center justify-between text-xs text-gray-400">
// // //                     <span className="flex items-center gap-2">
// // //                       <div className="w-3 h-3 rounded-full bg-green-200"></div>
// // //                       Step 2: Marketing
// // //                     </span>
// // //                     <span>Promotional Impact</span>
// // //                   </div>
// // //                   <div className="flex items-center justify-between text-xs text-gray-400">
// // //                     <span className="flex items-center gap-2">
// // //                       <div className="w-3 h-3 rounded-full bg-purple-200"></div>
// // //                       Step 3: Reviews
// // //                     </span>
// // //                     <span>Critical Reception</span>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default ExcelMoviePrediction;
// // import React, { useState, useEffect } from 'react';
// // import { apiService } from '../services/apiService';

// // function ExcelMoviePrediction({ user, onLogout, onTokenExpired, onBack }) {
// //   // Form state for Step 1 (Cast & Crew + Movie Title)
// //   const [step1Data, setStep1Data] = useState({
// //     movieTitle: '', // 🆕 NEW: Movie title field
// //     director: '',
// //     genre: '',
// //     cast1: '',
// //     cast2: '',
// //     cast3: '',
// //     cast4: '',
// //     musicDirector: '',
// //     leadSinger: '',
// //     category: 'None'
// //   });

// //   // Form state for Step 2 (Marketing Metrics)
// //   const [step2Data, setStep2Data] = useState({
// //     teaserViews: 50,
// //     trailerViews: 50,
// //     bestHits: 50,
// //     posterViews: 50
// //   });

// //   // Form state for Step 3 (Reviews)
// //   const [step3Data, setStep3Data] = useState({
// //     imdbRating: 6.5,
// //     criticsReview: 5.0
// //   });

// //   // Prediction results
// //   const [step1Result, setStep1Result] = useState(null);
// //   const [step2Result, setStep2Result] = useState(null);
// //   const [finalResult, setFinalResult] = useState(null);

// //   // UI state
// //   const [currentStep, setCurrentStep] = useState(1);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [adjustmentPercentage, setAdjustmentPercentage] = useState(0);
// //   const [excelData, setExcelData] = useState(null);
// //   const [isLoadingData, setIsLoadingData] = useState(true);
// //   const [saveStatus, setSaveStatus] = useState('');
// //   const [predictionSaved, setPredictionSaved] = useState(false);

// //   // Static options
// //   const [options, setOptions] = useState({
// //     directors: [],
// //     genres: [],
// //     casts: [],
// //     musicDirectors: [],
// //     leadSingers: []
// //   });

// //   // Load Excel data on component mount
// //   useEffect(() => {
// //     loadExcelData();
// //   }, []);

// //   const loadExcelData = async () => {
// //     setIsLoadingData(true);
// //     try {
// //       const data = await apiService.getExcelData();
// //       setExcelData(data);
      
// //       // Extract unique options from the data
// //       const directors = [...new Set(data.map(row => row.Director).filter(Boolean))].sort();
// //       const genres = [...new Set(data.map(row => row.Genre).filter(Boolean))].sort();
// //       const casts = [...new Set([
// //         ...data.map(row => row['Cast 1']),
// //         ...data.map(row => row['Cast 2']),
// //         ...data.map(row => row['Cast 3']),
// //         ...data.map(row => row['Cast 4'])
// //       ].filter(Boolean))].sort();
// //       const musicDirectors = [...new Set(data.map(row => row['Music Director']).filter(Boolean))].sort();
// //       const leadSingers = [...new Set(data.map(row => row['Lead Singer']).filter(Boolean))].sort();

// //       setOptions({
// //         directors,
// //         genres,
// //         casts,
// //         musicDirectors,
// //         leadSingers
// //       });
// //     } catch (error) {
// //       console.error('Failed to load Excel data:', error);
// //     } finally {
// //       setIsLoadingData(false);
// //     }
// //   };

// //   const handleStep1Submit = async () => {
// //     setIsLoading(true);
// //     try {
// //       const result = await apiService.predictExcelStep1Enhanced({
// //         ...step1Data,
// //         adjustmentPercentage
// //       }, false);

// //       setStep1Result(result);
// //       setCurrentStep(2);
// //     } catch (error) {
// //       console.error('Step 1 prediction failed:', error);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleStep2Submit = async () => {
// //     setIsLoading(true);
// //     try {
// //       const result = await apiService.predictExcelStep2Enhanced({
// //         step1Weekend: step1Result.weekend,
// //         step1Total: step1Result.total,
// //         ...step2Data,
// //         category: step1Data.category
// //       }, false);

// //       setStep2Result(result);
// //       setCurrentStep(3);
// //     } catch (error) {
// //       console.error('Step 2 prediction failed:', error);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleStep3Submit = async () => {
// //     setIsLoading(true);
// //     setSaveStatus('Calculating...');
// //     setPredictionSaved(false);
    
// //     try {
// //       const completeMovieData = {
// //         director: step1Data.director,
// //         genre: step1Data.genre,
// //         cast_1: step1Data.cast1,
// //         cast_2: step1Data.cast2,
// //         cast_3: step1Data.cast3,
// //         cast_4: step1Data.cast4,
// //         music_director: step1Data.musicDirector,
// //         lead_singer: step1Data.leadSinger,
// //         category: step1Data.category,
// //         adjustment_percentage: adjustmentPercentage,
// //         teaser_views: step2Data.teaserViews,
// //         trailer_views: step2Data.trailerViews,
// //         best_hits: step2Data.bestHits,
// //         poster_views: step2Data.posterViews,
// //         imdb_rating: step3Data.imdbRating,
// //         critics_review: step3Data.criticsReview,
// //         prediction_method: 'Excel Historical Data Analysis (3 Steps)',
// //         data_source: 'Google Sheets Historical Data',
// //         movie_title: step1Data.movieTitle || `${step1Data.director} Movie` // 🆕 Use custom title or generate one
// //       };

// //       setSaveStatus('Saving to database...');

// //       const result = await apiService.predictExcelStep3Enhanced(
// //         {
// //           step2Weekend: step2Result.weekend,
// //           step2Total: step2Result.total,
// //           ...step3Data
// //         },
// //         completeMovieData,
// //         true
// //       );

// //       setFinalResult(result);
// //       setPredictionSaved(true);
// //       setSaveStatus('✅ Prediction saved successfully!');
      
// //       setTimeout(() => {
// //         setSaveStatus('');
// //       }, 3000);

// //     } catch (error) {
// //       console.error('Final prediction failed:', error);
// //       setSaveStatus('❌ Failed to save prediction');
      
// //       setTimeout(() => {
// //         setSaveStatus('');
// //       }, 3000);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };
  
// //   const goToStep = (step) => {
// //     if (step === 1) {
// //       setCurrentStep(1);
// //     } else if (step === 2 && step1Result) {
// //       setCurrentStep(2);
// //     } else if (step === 3 && step2Result) {
// //       setCurrentStep(3);
// //     }
// //   };

// //   const goBackToStep1 = () => {
// //     setCurrentStep(1);
// //     setStep2Result(null);
// //     setFinalResult(null);
// //     setPredictionSaved(false);
// //     setSaveStatus('');
// //   };

// //   const goBackToStep2 = () => {
// //     setCurrentStep(2);
// //     setFinalResult(null);
// //     setPredictionSaved(false);
// //     setSaveStatus('');
// //   };

// //   const resetPrediction = () => {
// //     setStep1Result(null);
// //     setStep2Result(null);
// //     setFinalResult(null);
// //     setCurrentStep(1);
// //     setPredictionSaved(false);
// //     setSaveStatus('');
// //     setStep1Data({ 
// //       movieTitle: '', // 🆕 Reset movie title
// //       director: '', 
// //       genre: '', 
// //       cast1: '', 
// //       cast2: '', 
// //       cast3: '', 
// //       cast4: '', 
// //       musicDirector: '', 
// //       leadSinger: '', 
// //       category: 'None' 
// //     });
// //     setStep2Data({ 
// //       teaserViews: 50, 
// //       trailerViews: 50, 
// //       bestHits: 50, 
// //       posterViews: 50 
// //     });
// //     setStep3Data({ 
// //       imdbRating: 6.5, 
// //       criticsReview: 5.0 
// //     });
// //     setAdjustmentPercentage(0);
// //   };

// //   const isStep1Complete = step1Data.director && step1Data.genre && step1Data.cast1 && step1Data.cast2;

// //   if (isLoadingData) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //         <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
// //           <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
// //           <h3 className="text-lg font-semibold text-gray-900">Loading Excel Data...</h3>
// //           <p className="text-gray-600">Fetching movie database from Google Sheets</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className=" bg-gray-50">
// //       {/* Header */}
// //       <header className="bg-white shadow-sm border-b border-gray-200">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="flex justify-between items-center h-16">
// //             <div className="flex items-center space-x-4">
// //               <button
// //                 onClick={() => {
// //                   console.log('🔙 Back button clicked');
// //                   if (onBack) {
// //                     onBack();
// //                   } else {
// //                     console.warn('⚠️ onBack prop not provided, using window.history.back()');
// //                     window.history.back();
// //                   }
// //                 }}
// //                 className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
// //               >
// //                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
// //                 </svg>
// //                 <span>Back</span>
// //               </button>
// //               <h1 className="text-xl font-bold text-gray-900">Excel Movie Prediction</h1>
// //             </div>
// //           </div>
// //         </div>
// //       </header>

// //       {/* Main Content */}
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //         {/* Progress Steps */}
// //         <div className="mb-8">
// //           <div className="flex items-center justify-center space-x-8">
// //             {[1, 2, 3].map((step) => (
// //               <div key={step} className="flex items-center">
// //                 <button
// //                   onClick={() => goToStep(step)}
// //                   disabled={step === 2 && !step1Result || step === 3 && !step2Result}
// //                   className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-200 ${
// //                     currentStep === step
// //                       ? 'bg-blue-600 text-white ring-4 ring-blue-200'
// //                       : currentStep > step || (step === 2 && step1Result) || (step === 3 && step2Result)
// //                       ? 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer'
// //                       : 'bg-gray-200 text-gray-500 cursor-not-allowed'
// //                   }`}
// //                 >
// //                   {step}
// //                 </button>
// //                 <span className={`ml-2 font-medium ${
// //                   currentStep >= step ? 'text-blue-600' : 'text-gray-500'
// //                 }`}>
// //                   {step === 1 ? 'Movie Details' : step === 2 ? 'Marketing' : 'Reviews'}
// //                 </span>
// //                 {step < 3 && (
// //                   <div className={`w-16 h-1 ml-4 ${
// //                     currentStep > step ? 'bg-blue-500' : 'bg-gray-200'
// //                   }`}></div>
// //                 )}
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         {/* 🎯 UPDATED LAYOUT: Two Column Grid */}
// //         <div className="flex gap-8">
// //           {/* 📝 LEFT PANEL - ALL INPUTS */}
// //           <div className="space-y-6">
// //             {/* Adjustment Slider */}
// //             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// //               <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
// //                 <label className="block text-sm font-semibold text-gray-700 mb-2">
// //                   Prediction Adjustment: {adjustmentPercentage}%
// //                 </label>
// //                 <input
// //                   type="range"
// //                   min="-100"
// //                   max="100"
// //                   value={adjustmentPercentage}
// //                   onChange={(e) => setAdjustmentPercentage(Number(e.target.value))}
// //                   className="w-full"
// //                 />
// //                 <div className="flex justify-between text-xs text-gray-500 mt-1">
// //                   <span>-100% (Conservative)</span>
// //                   <span>0% (Baseline)</span>
// //                   <span>+100% (Optimistic)</span>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Step 1: Movie Details */}
// //             {currentStep === 1 && (
// //               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// //                 <div className="flex items-center justify-between mb-6">
// //                   <h3 className="text-lg font-bold text-gray-900">🎬 Step 1: Movie Details</h3>
// //                   {step1Result && (
// //                     <span className="text-sm text-green-600 font-medium flex items-center gap-2">
// //                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
// //                       </svg>
// //                       Completed
// //                     </span>
// //                   )}
// //                 </div>
                
// //                 <div className="space-y-4">
// //                   {/* 🆕 Movie Title Input - First Field */}
// //                   <div className="col-span-2">
// //                     <label className="block text-sm font-medium text-gray-700 mb-2">
// //                       Movie Title <span className="text-gray-400">(Optional)</span>
// //                     </label>
// //                     <input
// //                       type="text"
// //                       value={step1Data.movieTitle}
// //                       onChange={(e) => setStep1Data({...step1Data, movieTitle: e.target.value})}
// //                       placeholder="Enter movie title or leave blank for auto-generation"
// //                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
// //                     />
// //                     {!step1Data.movieTitle && step1Data.director && (
// //                       <p className="text-xs text-gray-500 mt-1">
// //                         Auto-generated: "{step1Data.director} Movie"
// //                       </p>
// //                     )}
// //                   </div>

// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-2">Director *</label>
// //                       <select
// //                         value={step1Data.director}
// //                         onChange={(e) => setStep1Data({...step1Data, director: e.target.value})}
// //                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
// //                       >
// //                         <option value="">Select Director</option>
// //                         {options.directors.map(director => (
// //                           <option key={director} value={director}>{director}</option>
// //                         ))}
// //                       </select>
// //                     </div>

// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-2">Genre *</label>
// //                       <select
// //                         value={step1Data.genre}
// //                         onChange={(e) => setStep1Data({...step1Data, genre: e.target.value})}
// //                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
// //                       >
// //                         <option value="">Select Genre</option>
// //                         {options.genres.map(genre => (
// //                           <option key={genre} value={genre}>{genre}</option>
// //                         ))}
// //                       </select>
// //                     </div>

// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-2">Lead Actor *</label>
// //                       <select
// //                         value={step1Data.cast1}
// //                         onChange={(e) => setStep1Data({...step1Data, cast1: e.target.value})}
// //                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
// //                       >
// //                         <option value="">Select Lead Actor</option>
// //                         {options.casts.map(cast => (
// //                           <option key={cast} value={cast}>{cast}</option>
// //                         ))}
// //                       </select>
// //                     </div>

// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-2">Supporting Actor *</label>
// //                       <select
// //                         value={step1Data.cast2}
// //                         onChange={(e) => setStep1Data({...step1Data, cast2: e.target.value})}
// //                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
// //                       >
// //                         <option value="">Select Supporting Actor</option>
// //                         {options.casts.map(cast => (
// //                           <option key={cast} value={cast}>{cast}</option>
// //                         ))}
// //                       </select>
// //                     </div>

// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-2">Cast 3</label>
// //                       <select
// //                         value={step1Data.cast3}
// //                         onChange={(e) => setStep1Data({...step1Data, cast3: e.target.value})}
// //                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
// //                       >
// //                         <option value="">Select Cast 3</option>
// //                         {options.casts.map(cast => (
// //                           <option key={cast} value={cast}>{cast}</option>
// //                         ))}
// //                       </select>
// //                     </div>

// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-2">Cast 4</label>
// //                       <select
// //                         value={step1Data.cast4}
// //                         onChange={(e) => setStep1Data({...step1Data, cast4: e.target.value})}
// //                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
// //                       >
// //                         <option value="">Select Cast 4</option>
// //                         {options.casts.map(cast => (
// //                           <option key={cast} value={cast}>{cast}</option>
// //                         ))}
// //                       </select>
// //                     </div>

// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-2">Music Director</label>
// //                       <select
// //                         value={step1Data.musicDirector}
// //                         onChange={(e) => setStep1Data({...step1Data, musicDirector: e.target.value})}
// //                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
// //                       >
// //                         <option value="">Select Music Director</option>
// //                         {options.musicDirectors.map(md => (
// //                           <option key={md} value={md}>{md}</option>
// //                         ))}
// //                       </select>
// //                     </div>

// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-2">Lead Singer</label>
// //                       <select
// //                         value={step1Data.leadSinger}
// //                         onChange={(e) => setStep1Data({...step1Data, leadSinger: e.target.value})}
// //                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
// //                       >
// //                         <option value="">Select Lead Singer</option>
// //                         {options.leadSingers.map(singer => (
// //                           <option key={singer} value={singer}>{singer}</option>
// //                         ))}
// //                       </select>
// //                     </div>
// //                   </div>

// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-2">Movie Category</label>
// //                     <div className="flex space-x-4">
// //                       {['None', 'Religious/Political', 'Political'].map(category => (
// //                         <label key={category} className="flex items-center">
// //                           <input
// //                             type="radio"
// //                             value={category}
// //                             checked={step1Data.category === category}
// //                             onChange={(e) => setStep1Data({...step1Data, category: e.target.value})}
// //                             className="mr-2"
// //                           />
// //                           {category}
// //                         </label>
// //                       ))}
// //                     </div>
// //                   </div>

// //                   <div className="flex gap-4">
// //                     <button
// //                       onClick={handleStep1Submit}
// //                       disabled={!isStep1Complete || isLoading}
// //                       className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
// //                         isStep1Complete && !isLoading
// //                           ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700'
// //                           : 'bg-gray-200 text-gray-400 cursor-not-allowed'
// //                       }`}
// //                     >
// //                       {isLoading ? 'Calculating...' : step1Result ? 'Recalculate Step 1' : 'Predict Step 1'}
// //                     </button>
                    
// //                     {step1Result && (
// //                       <button
// //                         onClick={() => setCurrentStep(2)}
// //                         className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all duration-200"
// //                       >
// //                         Next Step →
// //                       </button>
// //                     )}
// //                   </div>
// //                 </div>
// //               </div>
// //             )}

// //             {/* Step 2: Marketing Metrics */}
// //             {currentStep === 2 && (
// //               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// //                 <div className="flex items-center justify-between mb-6">
// //                   <h3 className="text-lg font-bold text-gray-900">📈 Step 2: Marketing Impact</h3>
// //                   {step2Result && (
// //                     <span className="text-sm text-green-600 font-medium flex items-center gap-2">
// //                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
// //                       </svg>
// //                       Completed
// //                     </span>
// //                   )}
// //                 </div>
                
// //                 <div className="space-y-4">
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-2">
// //                       Teaser Views Impact: {step2Data.teaserViews}%
// //                     </label>
// //                     <input
// //                       type="range"
// //                       min="0"
// //                       max="100"
// //                       value={step2Data.teaserViews}
// //                       onChange={(e) => setStep2Data({...step2Data, teaserViews: Number(e.target.value)})}
// //                       className="w-full"
// //                     />
// //                   </div>

// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-2">
// //                       Trailer Views Impact: {step2Data.trailerViews}%
// //                     </label>
// //                     <input
// //                       type="range"
// //                       min="0"
// //                       max="100"
// //                       value={step2Data.trailerViews}
// //                       onChange={(e) => setStep2Data({...step2Data, trailerViews: Number(e.target.value)})}
// //                       className="w-full"
// //                     />
// //                   </div>

// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-2">
// //                       Best Hits in Songs: {step2Data.bestHits}%
// //                     </label>
// //                     <input
// //                       type="range"
// //                       min="0"
// //                       max="100"
// //                       value={step2Data.bestHits}
// //                       onChange={(e) => setStep2Data({...step2Data, bestHits: Number(e.target.value)})}
// //                       className="w-full"
// //                     />
// //                   </div>

// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-2">
// //                       Poster Views Impact: {step2Data.posterViews}%
// //                     </label>
// //                     <input
// //                       type="range"
// //                       min="0"
// //                       max="100"
// //                       value={step2Data.posterViews}
// //                       onChange={(e) => setStep2Data({...step2Data, posterViews: Number(e.target.value)})}
// //                       className="w-full"
// //                     />
// //                   </div>

// //                   <div className="flex gap-4">
// //                     <button
// //                       onClick={goBackToStep1}
// //                       className="px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all duration-200"
// //                     >
// //                       ← Back to Step 1
// //                     </button>
                    
// //                     <button
// //                       onClick={handleStep2Submit}
// //                       disabled={isLoading}
// //                       className="flex-1 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
// //                     >
// //                       {isLoading ? 'Calculating...' : step2Result ? 'Recalculate Step 2' : 'Predict Step 2'}
// //                     </button>
                    
// //                     {step2Result && (
// //                       <button
// //                         onClick={() => setCurrentStep(3)}
// //                         className="px-6 py-3 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition-all duration-200"
// //                       >
// //                         Next Step →
// //                       </button>
// //                     )}
// //                   </div>
// //                 </div>
// //               </div>
// //             )}

// //             {/* Step 3: Reviews */}
// //             {currentStep === 3 && (
// //               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// //                 <div className="flex items-center justify-between mb-6">
// //                   <h3 className="text-lg font-bold text-gray-900">⭐ Step 3: Critical Reception</h3>
// //                   {finalResult && (
// //                     <span className="text-sm text-green-600 font-medium flex items-center gap-2">
// //                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
// //                       </svg>
// //                       Completed
// //                     </span>
// //                   )}
// //                 </div>
                
// //                 <div className="space-y-4">
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-2">
// //                       IMDB Rating: {step3Data.imdbRating}/10
// //                     </label>
// //                     <input
// //                       type="range"
// //                       min="0"
// //                       max="10"
// //                       step="0.1"
// //                       value={step3Data.imdbRating}
// //                       onChange={(e) => setStep3Data({...step3Data, imdbRating: Number(e.target.value)})}
// //                       className="w-full"
// //                     />
// //                   </div>

// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-2">
// //                       Critics Review: {step3Data.criticsReview}/10
// //                     </label>
// //                     <input
// //                       type="range"
// //                       min="0"
// //                       max="10"
// //                       step="0.1"
// //                       value={step3Data.criticsReview}
// //                       onChange={(e) => setStep3Data({...step3Data, criticsReview: Number(e.target.value)})}
// //                       className="w-full"
// //                     />
// //                   </div>

// //                   <div className="flex gap-4">
// //                     <button
// //                       onClick={goBackToStep2}
// //                       className="px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all duration-200"
// //                     >
// //                       ← Back to Step 2
// //                     </button>
                    
// //                     <button
// //                       onClick={handleStep3Submit}
// //                       disabled={isLoading}
// //                       className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-indigo-700 transition-all duration-200"
// //                     >
// //                       {isLoading ? 'Calculating Final...' : finalResult ? 'Recalculate Final' : 'Get Final Prediction'}
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             )}

// //             {/* Data Info Panel */}
// //             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// //               <h4 className="text-lg font-bold text-gray-900 mb-4">📊 Data Source</h4>
// //               <div className="space-y-2 text-sm text-gray-600">
// //                 <p>• Historical movie data from Google Sheets</p>
// //                 <p>• {options.directors.length} Directors in database</p>
// //                 <p>• {options.casts.length} Cast members tracked</p>
// //                 <p>• {options.genres.length} Genres analyzed</p>
// //                 <p>• Auto-save enabled for final predictions</p>
// //                 <button
// //                   onClick={loadExcelData}
// //                   className="mt-3 w-full py-2 px-4 bg-blue-50 text-blue-700 rounded-lg font-medium hover:bg-blue-100 transition-colors"
// //                 >
// //                   🔄 Refresh Data
// //                 </button>
// //               </div>
// //             </div>
// //           </div>

// //           {/* 📊 RIGHT PANEL - ALL OUTPUTS */}
// //           <div className="space-y-1">
// //             {/* Save Status Panel */}
// //             {(finalResult || saveStatus || predictionSaved) && (
// //               <div className={`rounded-xl border-2 p-4 ${
// //                 predictionSaved 
// //                   ? 'bg-green-50 border-green-200' 
// //                   : saveStatus.includes('❌')
// //                   ? 'bg-red-50 border-red-200'
// //                   : 'bg-blue-50 border-blue-200'
// //               }`}>
// //                 <div className="flex items-center gap-2">
// //                   {predictionSaved ? (
// //                     <>
// //                       <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
// //                       </svg>
// //                       <span className="text-sm font-medium text-green-800">Prediction Saved to Database!</span>
// //                     </>
// //                   ) : saveStatus.includes('❌') ? (
// //                     <>
// //                       <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="6 18L18 6M6 6l12 12" />
// //                       </svg>
// //                       <span className="text-sm font-medium text-red-800">Save Failed</span>
// //                     </>
// //                   ) : (
// //                     <>
// //                       <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
// //                       <span className="text-sm font-medium text-blue-800">Saving...</span>
// //                     </>
// //                   )}
// //                 </div>
// //                 {predictionSaved && (
// //                   <p className="text-xs text-green-600 mt-1">
// //                     You can view this prediction in your history dashboard.
// //                   </p>
// //                 )}
// //               </div>
// //             )}

// //             {/* Step 1 Result */}
// //             {step1Result && (
// //               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// //                 <div className="flex items-center justify-between mb-4">
// //                   <h4 className="text-lg font-bold text-gray-900">🎬 Step 1 Results</h4>
// //                   <button
// //                     onClick={goBackToStep1}
// //                     className="text-sm text-blue-600 hover:text-blue-800 font-medium"
// //                   >
// //                     Edit
// //                   </button>
// //                 </div>
// //                 <div className="space-y-3">
// //                   <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
// //                     <span className="text-sm font-medium text-gray-700">Weekend Collection:</span>
// //                     <span className="text-lg font-bold text-blue-600">₹{step1Result.weekend} Cr</span>
// //                   </div>
// //                   <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
// //                     <span className="text-sm font-medium text-gray-700">Total Collection:</span>
// //                     <span className="text-lg font-bold text-green-600">₹{step1Result.total} Cr</span>
// //                   </div>
// //                 </div>
// //               </div>
// //             )}

// //             {/* Step 2 Result */}
// //             {step2Result && (
// //               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// //                 <div className="flex items-center justify-between mb-4">
// //                   <h4 className="text-lg font-bold text-gray-900">📈 Step 2 Results</h4>
// //                   <button
// //                     onClick={goBackToStep2}
// //                     className="text-sm text-blue-600 hover:text-blue-800 font-medium"
// //                   >
// //                     Edit
// //                   </button>
// //                 </div>
// //                 <div className="space-y-3">
// //                   <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
// //                     <span className="text-sm font-medium text-gray-700">Weekend Collection:</span>
// //                     <span className="text-lg font-bold text-blue-600">₹{step2Result.weekend} Cr</span>
// //                   </div>
// //                   <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
// //                     <span className="text-sm font-medium text-gray-700">Total Collection:</span>
// //                     <span className="text-lg font-bold text-green-600">₹{step2Result.total} Cr</span>
// //                   </div>
// //                 </div>
// //               </div>
// //             )}

// //             {/* Final Result */}
// //             {finalResult && (
// //               <div className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl border-2 border-purple-200 p-6">
// //                 <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
// //                   🎯 Final Prediction
// //                   {predictionSaved && (
// //                     <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
// //                       Saved
// //                     </span>
// //                   )}
// //                 </h4>
// //                 <div className="space-y-4">
// //                   <div className="text-center p-4 bg-white rounded-lg shadow-sm">
// //                     <p className="text-sm font-medium text-gray-600 mb-1">Weekend Collection</p>
// //                     <p className="text-3xl font-bold text-purple-600">₹{finalResult.weekend} Cr</p>
// //                   </div>
// //                   <div className="text-center p-4 bg-white rounded-lg shadow-sm">
// //                     <p className="text-sm font-medium text-gray-600 mb-1">Total Collection</p>
// //                     <p className="text-3xl font-bold text-indigo-600">₹{finalResult.total} Cr</p>
// //                   </div>
                  
// //                   {/* Confidence Score */}
// //                   {finalResult.breakdown && (
// //                     <div className="text-center p-3 bg-white rounded-lg shadow-sm">
// //                       <p className="text-sm font-medium text-gray-600 mb-1">Confidence</p>
// //                       <div className="flex items-center justify-center gap-2">
// //                         <div className="w-16 bg-gray-200 rounded-full h-2">
// //                           <div 
// //                             className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
// //                             style={{ width: `${apiService.calculateConfidence(
// //                               {
// //                                 director: step1Data.director,
// //                                 cast_1: step1Data.cast1,
// //                                 cast_2: step1Data.cast2,
// //                                 music_director: step1Data.musicDirector,
// //                                 teaser_views: step2Data.teaserViews,
// //                                 trailer_views: step2Data.trailerViews,
// //                                 imdb_rating: step3Data.imdbRating,
// //                                 critics_review: step3Data.criticsReview,
// //                                 genre: step1Data.genre,
// //                                 category: step1Data.category
// //                               },
// //                               finalResult
// //                             )}%` }}
// //                           ></div>
// //                         </div>
// //                         <span className="text-sm font-bold text-green-600">
// //                           {apiService.calculateConfidence(
// //                             {
// //                               director: step1Data.director,
// //                               cast_1: step1Data.cast1,
// //                               cast_2: step1Data.cast2,
// //                               music_director: step1Data.musicDirector,
// //                               teaser_views: step2Data.teaserViews,
// //                               trailer_views: step2Data.trailerViews,
// //                               imdb_rating: step3Data.imdbRating,
// //                               critics_review: step3Data.criticsReview,
// //                               genre: step1Data.genre,
// //                               category: step1Data.category
// //                             },
// //                             finalResult
// //                           )}%
// //                         </span>
// //                       </div>
// //                     </div>
// //                   )}

// //                   <div className="flex gap-2">
// //                     <button
// //                       onClick={() => setCurrentStep(3)}
// //                       className="flex-1 py-2 px-4 bg-purple-100 text-purple-700 rounded-lg font-medium hover:bg-purple-200 transition-colors"
// //                     >
// //                       🔧 Adjust Reviews
// //                     </button>
// //                     <button
// //                       onClick={resetPrediction}
// //                       className="flex-1 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
// //                     >
// //                       🔄 Start New
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             )}

// //             {/* Navigation Helper */}
// //             {(step1Result || step2Result || finalResult) && (
// //               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// //                 <h4 className="text-lg font-bold text-gray-900 mb-4">🧭 Quick Navigation</h4>
// //                 <div className="space-y-2">
// //                   <button
// //                     onClick={goBackToStep1}
// //                     className="w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
// //                   >
// //                     <span className="text-blue-500">🎬</span>
// //                     <span>Modify Movie Details</span>
// //                   </button>
// //                   {step1Result && (
// //                     <button
// //                       onClick={goBackToStep2}
// //                       className="w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
// //                     >
// //                       <span className="text-green-500">📈</span>
// //                       <span>Adjust Marketing Impact</span>
// //                     </button>
// //                   )}
// //                   {step2Result && (
// //                     <button
// //                       onClick={() => setCurrentStep(3)}
// //                       className="w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
// //                     >
// //                       <span className="text-purple-500">⭐</span>
// //                       <span>Update Reviews & Ratings</span>
// //                     </button>
// //                   )}
// //                 </div>
// //               </div>
// //             )}

// //             {/* Prediction Summary */}
// //             {finalResult && (
// //               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// //                 <h4 className="text-lg font-bold text-gray-900 mb-4">📋 Prediction Summary</h4>
// //                 <div className="space-y-2 text-sm">
// //                   {/* 🆕 Display Movie Title */}
// //                   {(step1Data.movieTitle || step1Data.director) && (
// //                     <div className="flex justify-between">
// //                       <span className="text-gray-600">Movie Title:</span>
// //                       <span className="font-medium">{step1Data.movieTitle || `${step1Data.director} Movie`}</span>
// //                     </div>
// //                   )}
// //                   <div className="flex justify-between">
// //                     <span className="text-gray-600">Director:</span>
// //                     <span className="font-medium">{step1Data.director}</span>
// //                   </div>
// //                   <div className="flex justify-between">
// //                     <span className="text-gray-600">Genre:</span>
// //                     <span className="font-medium">{step1Data.genre}</span>
// //                   </div>
// //                   <div className="flex justify-between">
// //                     <span className="text-gray-600">Lead Actor:</span>
// //                     <span className="font-medium">{step1Data.cast1}</span>
// //                   </div>
// //                   <div className="flex justify-between">
// //                     <span className="text-gray-600">Category:</span>
// //                     <span className="font-medium">{step1Data.category}</span>
// //                   </div>
// //                   <div className="flex justify-between">
// //                     <span className="text-gray-600">IMDB Rating:</span>
// //                     <span className="font-medium">{step3Data.imdbRating}/10</span>
// //                   </div>
// //                   <div className="flex justify-between">
// //                     <span className="text-gray-600">Method:</span>
// //                     <span className="font-medium text-xs">Excel 3-Step Analysis</span>
// //                   </div>
// //                   {predictionSaved && (
// //                     <div className="mt-3 pt-3 border-t border-gray-200">
// //                       <div className="flex items-center gap-2 text-green-600">
// //                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
// //                         </svg>
// //                         <span className="text-xs font-medium">Saved to your prediction history</span>
// //                       </div>
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>
// //             )}

// //             {/* Progress Indicator for Empty State */}
// //             {!step1Result && !step2Result && !finalResult && (
// //               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
// //                 <div className="text-gray-400 mb-4">
// //                   <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
// //                   </svg>
// //                 </div>
// //                 <h4 className="text-lg font-medium text-gray-600 mb-2">Prediction Results Will Appear Here</h4>
// //                 <p className="text-sm text-gray-500">Complete the movie details on the left to start generating predictions. Results from each step will be displayed in this panel.</p>
                
// //                 <div className="mt-6 space-y-2">
// //                   <div className="flex items-center justify-between text-xs text-gray-400">
// //                     <span className="flex items-center gap-2">
// //                       <div className="w-3 h-3 rounded-full bg-blue-200"></div>
// //                       Step 1: Movie Details
// //                     </span>
// //                     <span>Cast & Crew Analysis</span>
// //                   </div>
// //                   <div className="flex items-center justify-between text-xs text-gray-400">
// //                     <span className="flex items-center gap-2">
// //                       <div className="w-3 h-3 rounded-full bg-green-200"></div>
// //                       Step 2: Marketing
// //                     </span>
// //                     <span>Promotional Impact</span>
// //                   </div>
// //                   <div className="flex items-center justify-between text-xs text-gray-400">
// //                     <span className="flex items-center gap-2">
// //                       <div className="w-3 h-3 rounded-full bg-purple-200"></div>
// //                       Step 3: Reviews
// //                     </span>
// //                     <span>Critical Reception</span>
// //                   </div>
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default ExcelMoviePrediction;
// import React, { useState, useEffect } from 'react';
// import { apiService } from '../services/apiService';

// function ExcelMoviePrediction({ user, onLogout, onTokenExpired, onBack }) {
//   // Form state for Step 1 (Cast & Crew + Movie Title)
//   const [step1Data, setStep1Data] = useState({
//     movieTitle: '',
//     director: '',
//     genre: '',
//     cast1: '',
//     cast2: '',
//     cast3: '',
//     cast4: '',
//     musicDirector: '',
//     leadSinger: '',
//     category: 'None'
//   });

//   // Form state for Step 2 (Marketing Metrics)
//   const [step2Data, setStep2Data] = useState({
//     teaserViews: 50,
//     trailerViews: 50,
//     bestHits: 50,
//     posterViews: 50
//   });

//   // Form state for Step 3 (Reviews)
//   const [step3Data, setStep3Data] = useState({
//     imdbRating: 6.5,
//     criticsReview: 5.0
//   });

//   // Prediction results
//   const [step1Result, setStep1Result] = useState(null);
//   const [step2Result, setStep2Result] = useState(null);
//   const [finalResult, setFinalResult] = useState(null);

//   // UI state
//   const [currentStep, setCurrentStep] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);
//   const [adjustmentPercentage, setAdjustmentPercentage] = useState(0);
//   const [excelData, setExcelData] = useState(null);
//   const [isLoadingData, setIsLoadingData] = useState(true);
//   const [saveStatus, setSaveStatus] = useState('');
//   const [predictionSaved, setPredictionSaved] = useState(false);

//   // Static options
//   const [options, setOptions] = useState({
//     directors: [],
//     genres: [],
//     casts: [],
//     musicDirectors: [],
//     leadSingers: []
//   });

//   // Load Excel data on component mount
//   useEffect(() => {
//     loadExcelData();
//   }, []);

//   const loadExcelData = async () => {
//     setIsLoadingData(true);
//     try {
//       const data = await apiService.getExcelData();
//       setExcelData(data);
      
//       // Extract unique options from the data
//       const directors = [...new Set(data.map(row => row.Director).filter(Boolean))].sort();
//       const genres = [...new Set(data.map(row => row.Genre).filter(Boolean))].sort();
//       const casts = [...new Set([
//         ...data.map(row => row['Cast 1']),
//         ...data.map(row => row['Cast 2']),
//         ...data.map(row => row['Cast 3']),
//         ...data.map(row => row['Cast 4'])
//       ].filter(Boolean))].sort();
//       const musicDirectors = [...new Set(data.map(row => row['Music Director']).filter(Boolean))].sort();
//       const leadSingers = [...new Set(data.map(row => row['Lead Singer']).filter(Boolean))].sort();

//       setOptions({
//         directors,
//         genres,
//         casts,
//         musicDirectors,
//         leadSingers
//       });
//     } catch (error) {
//       console.error('Failed to load Excel data:', error);
//     } finally {
//       setIsLoadingData(false);
//     }
//   };

//   const handleStep1Submit = async () => {
//     setIsLoading(true);
//     try {
//       const result = await apiService.predictExcelStep1Enhanced({
//         ...step1Data,
//         adjustmentPercentage
//       }, false);

//       setStep1Result(result);
//       setCurrentStep(2);
//     } catch (error) {
//       console.error('Step 1 prediction failed:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleStep2Submit = async () => {
//     setIsLoading(true);
//     try {
//       const result = await apiService.predictExcelStep2Enhanced({
//         step1Weekend: step1Result.weekend,
//         step1Total: step1Result.total,
//         ...step2Data,
//         category: step1Data.category
//       }, false);

//       setStep2Result(result);
//       setCurrentStep(3);
//     } catch (error) {
//       console.error('Step 2 prediction failed:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleStep3Submit = async () => {
//     setIsLoading(true);
//     setSaveStatus('Calculating...');
//     setPredictionSaved(false);
    
//     try {
//       const completeMovieData = {
//         director: step1Data.director,
//         genre: step1Data.genre,
//         cast_1: step1Data.cast1,
//         cast_2: step1Data.cast2,
//         cast_3: step1Data.cast3,
//         cast_4: step1Data.cast4,
//         music_director: step1Data.musicDirector,
//         lead_singer: step1Data.leadSinger,
//         category: step1Data.category,
//         adjustment_percentage: adjustmentPercentage,
//         teaser_views: step2Data.teaserViews,
//         trailer_views: step2Data.trailerViews,
//         best_hits: step2Data.bestHits,
//         poster_views: step2Data.posterViews,
//         imdb_rating: step3Data.imdbRating,
//         critics_review: step3Data.criticsReview,
//         prediction_method: 'Excel Historical Data Analysis (3 Steps)',
//         data_source: 'Google Sheets Historical Data',
//         movie_title: step1Data.movieTitle || `${step1Data.director} Movie`
//       };

//       setSaveStatus('Saving to database...');

//       const result = await apiService.predictExcelStep3Enhanced(
//         {
//           step2Weekend: step2Result.weekend,
//           step2Total: step2Result.total,
//           ...step3Data
//         },
//         completeMovieData,
//         true
//       );

//       setFinalResult(result);
//       setPredictionSaved(true);
//       setSaveStatus('✅ Prediction saved successfully!');
      
//       setTimeout(() => {
//         setSaveStatus('');
//       }, 3000);

//     } catch (error) {
//       console.error('Final prediction failed:', error);
//       setSaveStatus('❌ Failed to save prediction');
      
//       setTimeout(() => {
//         setSaveStatus('');
//       }, 3000);
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   const goToStep = (step) => {
//     if (step === 1) {
//       setCurrentStep(1);
//     } else if (step === 2 && step1Result) {
//       setCurrentStep(2);
//     } else if (step === 3 && step2Result) {
//       setCurrentStep(3);
//     }
//   };

//   const goBackToStep1 = () => {
//     setCurrentStep(1);
//     setStep2Result(null);
//     setFinalResult(null);
//     setPredictionSaved(false);
//     setSaveStatus('');
//   };

//   const goBackToStep2 = () => {
//     setCurrentStep(2);
//     setFinalResult(null);
//     setPredictionSaved(false);
//     setSaveStatus('');
//   };

//   const resetPrediction = () => {
//     setStep1Result(null);
//     setStep2Result(null);
//     setFinalResult(null);
//     setCurrentStep(1);
//     setPredictionSaved(false);
//     setSaveStatus('');
//     setStep1Data({ 
//       movieTitle: '',
//       director: '', 
//       genre: '', 
//       cast1: '', 
//       cast2: '', 
//       cast3: '', 
//       cast4: '', 
//       musicDirector: '', 
//       leadSinger: '', 
//       category: 'None' 
//     });
//     setStep2Data({ 
//       teaserViews: 50, 
//       trailerViews: 50, 
//       bestHits: 50, 
//       posterViews: 50 
//     });
//     setStep3Data({ 
//       imdbRating: 6.5, 
//       criticsReview: 5.0 
//     });
//     setAdjustmentPercentage(0);
//   };

//   const isStep1Complete = step1Data.director && step1Data.genre;

//   if (isLoadingData) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
//         <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-12 text-center border border-white/20">
//           <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
//           <h3 className="text-2xl font-bold text-gray-900 mb-2">Loading Movie Database</h3>
//           <p className="text-gray-600">Fetching historical data from Google Sheets...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
//       {/* Modern Header */}
//       <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto px-6 lg:px-8">
//           <div className="flex justify-between items-center h-20">
//             <div className="flex items-center space-x-6">
//               <button
//                 onClick={() => {
//                   if (onBack) onBack();
//                   else window.history.back();
//                 }}
//                 className="group flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-all duration-200 hover:scale-105"
//               >
//                 <div className="p-2 rounded-xl bg-gray-100 group-hover:bg-blue-100 transition-colors">
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                   </svg>
//                 </div>
//                 <span className="font-medium">Back</span>
//               </button>
//               <div className="h-8 w-px bg-gray-300"></div>
//               <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//                 🎬 Movie Prediction Studio
//               </h1>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
//         {/* Modern Progress Steps */}
//         <div className="mb-12">
//           <div className="flex items-center justify-center space-x-16">
//             {[
//               { num: 1, title: 'Movie Details', icon: '🎬', desc: 'Cast & Crew' },
//               { num: 2, title: 'Marketing', icon: '📈', desc: 'Promotional Impact' },
//               { num: 3, title: 'Reviews', icon: '⭐', desc: 'Critical Reception' }
//             ].map((step, index) => (
//               <div key={step.num} className="flex items-center">
//                 <div className="flex flex-col items-center">
//                   <button
//                     onClick={() => goToStep(step.num)}
//                     disabled={step.num === 2 && !step1Result || step.num === 3 && !step2Result}
//                     className={`relative w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-lg transition-all duration-300 transform hover:scale-110 ${
//                       currentStep === step.num
//                         ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-xl shadow-blue-500/25'
//                         : currentStep > step.num || (step.num === 2 && step1Result) || (step.num === 3 && step2Result)
//                         ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:shadow-xl cursor-pointer'
//                         : 'bg-gray-200 text-gray-500 cursor-not-allowed'
//                     }`}
//                   >
//                     <span className="text-2xl">{step.icon}</span>
//                     {currentStep === step.num && (
//                       <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-75 animate-pulse"></div>
//                     )}
//                   </button>
//                   <div className="mt-3 text-center">
//                     <h3 className={`font-semibold ${currentStep >= step.num ? 'text-blue-600' : 'text-gray-500'}`}>
//                       {step.title}
//                     </h3>
//                     <p className="text-xs text-gray-500 mt-1">{step.desc}</p>
//                   </div>
//                 </div>
//                 {index < 2 && (
//                   <div className={`w-24 h-1 mx-8 rounded-full transition-all duration-500 ${
//                     currentStep > step.num ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gray-200'
//                   }`}></div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Main Layout */}
//         <div className="flex gap-8 h-full">
//           {/* Left Panel - Inputs */}
//           <div className="w-1/2 space-y-6">
//             {/* Global Adjustment */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300">
//               <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="p-2 bg-amber-100 rounded-lg">
//                     <span className="text-xl">⚡</span>
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-gray-800">Prediction Adjustment</h3>
//                     <p className="text-sm text-amber-700">{adjustmentPercentage}% modifier applied</p>
//                   </div>
//                 </div>
//                 <input
//                   type="range"
//                   min="-100"
//                   max="100"
//                   value={adjustmentPercentage}
//                   onChange={(e) => setAdjustmentPercentage(Number(e.target.value))}
//                   className="w-full h-2 bg-gradient-to-r from-red-300 via-gray-300 to-green-300 rounded-lg appearance-none cursor-pointer"
//                   style={{
//                     background: `linear-gradient(to right, #fca5a5 0%, #d1d5db 50%, #86efac 100%)`
//                   }}
//                 />
//                 <div className="flex justify-between text-xs text-gray-600 mt-2">
//                   <span>Conservative</span>
//                   <span>Baseline</span>
//                   <span>Optimistic</span>
//                 </div>
//               </div>
//             </div>

//             {/* Step Content */}
//             {currentStep === 1 && (
//               <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 hover:shadow-xl transition-all duration-300">
//                 <div className="flex items-center justify-between mb-8">
//                   <div className="flex items-center gap-4">
//                     <div className="p-3 bg-blue-100 rounded-xl">
//                       <span className="text-2xl">🎬</span>
//                     </div>
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900">Movie Details</h3>
//                       <p className="text-gray-600">Core information about your movie</p>
//                     </div>
//                   </div>
//                   {step1Result && (
//                     <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
//                       <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                       <span className="text-sm font-medium text-green-700">Completed</span>
//                     </div>
//                   )}
//                 </div>
                
//                 <div className="space-y-6">
//                   {/* Movie Title */}
//                   <div className="space-y-2">
//                     <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
//                       <span className="text-lg">🎭</span>
//                       Movie Title
//                       <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">Optional</span>
//                     </label>
//                     <input
//                       type="text"
//                       value={step1Data.movieTitle}
//                       onChange={(e) => setStep1Data({...step1Data, movieTitle: e.target.value})}
//                       placeholder="Enter movie title or leave blank for auto-generation"
//                       className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
//                     />
//                     {!step1Data.movieTitle && step1Data.director && (
//                       <p className="text-sm text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
//                         ✨ Auto-generated: "{step1Data.director} Movie"
//                       </p>
//                     )}
//                   </div>

//                   {/* Core Fields Grid */}
//                   <div className="grid grid-cols-2 gap-6">
//                     <div className="space-y-2">
//                       <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
//                         <span className="text-lg">🎯</span>
//                         Director
//                         <span className="text-red-500">*</span>
//                       </label>
//                       <select
//                         value={step1Data.director}
//                         onChange={(e) => setStep1Data({...step1Data, director: e.target.value})}
//                         className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
//                       >
//                         <option value="">Choose Director</option>
//                         {options.directors.map(director => (
//                           <option key={director} value={director}>{director}</option>
//                         ))}
//                       </select>
//                     </div>

//                     <div className="space-y-2">
//                       <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
//                         <span className="text-lg">🎪</span>
//                         Genre
//                         <span className="text-red-500">*</span>
//                       </label>
//                       <select
//                         value={step1Data.genre}
//                         onChange={(e) => setStep1Data({...step1Data, genre: e.target.value})}
//                         className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
//                       >
//                         <option value="">Choose Genre</option>
//                         {options.genres.map(genre => (
//                           <option key={genre} value={genre}>{genre}</option>
//                         ))}
//                       </select>
//                     </div>

//                     <div className="space-y-2">
//                       <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
//                         <span className="text-lg">⭐</span>
//                         Lead Actor
//                       </label>
//                       <select
//                         value={step1Data.cast1}
//                         onChange={(e) => setStep1Data({...step1Data, cast1: e.target.value})}
//                         className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
//                       >
//                         <option value="">Choose Lead Actor</option>
//                         {options.casts.map(cast => (
//                           <option key={cast} value={cast}>{cast}</option>
//                         ))}
//                       </select>
//                     </div>

//                     <div className="space-y-2">
//                       <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
//                         <span className="text-lg">🎭</span>
//                         Supporting Actor
//                       </label>
//                       <select
//                         value={step1Data.cast2}
//                         onChange={(e) => setStep1Data({...step1Data, cast2: e.target.value})}
//                         className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
//                       >
//                         <option value="">Choose Supporting Actor</option>
//                         {options.casts.map(cast => (
//                           <option key={cast} value={cast}>{cast}</option>
//                         ))}
//                       </select>
//                     </div>

//                     <div className="space-y-2">
//                       <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
//                         <span className="text-lg">🎵</span>
//                         Music Director
//                       </label>
//                       <select
//                         value={step1Data.musicDirector}
//                         onChange={(e) => setStep1Data({...step1Data, musicDirector: e.target.value})}
//                         className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
//                       >
//                         <option value="">Choose Music Director</option>
//                         {options.musicDirectors.map(md => (
//                           <option key={md} value={md}>{md}</option>
//                         ))}
//                       </select>
//                     </div>

//                     <div className="space-y-2">
//                       <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
//                         <span className="text-lg">🎤</span>
//                         Lead Singer
//                       </label>
//                       <select
//                         value={step1Data.leadSinger}
//                         onChange={(e) => setStep1Data({...step1Data, leadSinger: e.target.value})}
//                         className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
//                       >
//                         <option value="">Choose Lead Singer</option>
//                         {options.leadSingers.map(singer => (
//                           <option key={singer} value={singer}>{singer}</option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>

//                   {/* Category Selection */}
//                   <div className="space-y-3">
//                     <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
//                       <span className="text-lg">🏷️</span>
//                       Movie Category
//                     </label>
//                     <div className="flex gap-4">
//                       {['None', 'Religious/Political', 'Political'].map(category => (
//                         <label key={category} className="flex items-center cursor-pointer group">
//                           <input
//                             type="radio"
//                             value={category}
//                             checked={step1Data.category === category}
//                             onChange={(e) => setStep1Data({...step1Data, category: e.target.value})}
//                             className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
//                           />
//                           <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
//                             {category}
//                           </span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Action Buttons */}
//                   <div className="flex gap-4 pt-6">
//                     <button
//                       onClick={handleStep2Submit}
//                       disabled={isLoading}
//                       className="flex-1 py-4 px-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105"
//                     >
//                       {isLoading ? (
//                         <div className="flex items-center justify-center gap-3">
//                           <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                           Calculating...
//                         </div>
//                       ) : step2Result ? 'Recalculate Step 2' : '📊 Analyze Marketing'}
//                     </button>
                    
//                     {step2Result && (
//                       <button
//                         onClick={() => setCurrentStep(3)}
//                         className="px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
//                       >
//                         Next Step →
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Step 3: Reviews */}
//             {currentStep === 3 && (
//               <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 hover:shadow-xl transition-all duration-300">
//                 <div className="flex items-center justify-between mb-8">
//                   <div className="flex items-center gap-4">
//                     <div className="p-3 bg-purple-100 rounded-xl">
//                       <span className="text-2xl">⭐</span>
//                     </div>
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900">Critical Reception</h3>
//                       <p className="text-gray-600">Reviews and ratings impact</p>
//                     </div>
//                   </div>
//                   {finalResult && (
//                     <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
//                       <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                       <span className="text-sm font-medium text-green-700">Completed</span>
//                     </div>
//                   )}
//                 </div>
                
//                 <div className="space-y-8">
//                   <div className="space-y-4">
//                     <div className="flex items-center justify-between">
//                       <label className="flex items-center gap-3 text-sm font-semibold text-gray-700">
//                         <span className="text-xl">🌟</span>
//                         IMDB Rating
//                       </label>
//                       <div className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full font-bold">
//                         {step3Data.imdbRating}/10
//                       </div>
//                     </div>
//                     <input
//                       type="range"
//                       min="0"
//                       max="10"
//                       step="0.1"
//                       value={step3Data.imdbRating}
//                       onChange={(e) => setStep3Data({...step3Data, imdbRating: Number(e.target.value)})}
//                       className="w-full h-3 bg-gradient-to-r from-red-300 via-yellow-300 to-green-400 rounded-lg appearance-none cursor-pointer hover:shadow-lg transition-all duration-200"
//                     />
//                     <div className="flex justify-between text-xs text-gray-500">
//                       <span>Poor (0)</span>
//                       <span>Average (5)</span>
//                       <span>Excellent (10)</span>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div className="flex items-center justify-between">
//                       <label className="flex items-center gap-3 text-sm font-semibold text-gray-700">
//                         <span className="text-xl">📝</span>
//                         Critics Review
//                       </label>
//                       <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-bold">
//                         {step3Data.criticsReview}/10
//                       </div>
//                     </div>
//                     <input
//                       type="range"
//                       min="0"
//                       max="10"
//                       step="0.1"
//                       value={step3Data.criticsReview}
//                       onChange={(e) => setStep3Data({...step3Data, criticsReview: Number(e.target.value)})}
//                       className="w-full h-3 bg-gradient-to-r from-red-300 via-yellow-300 to-green-400 rounded-lg appearance-none cursor-pointer hover:shadow-lg transition-all duration-200"
//                     />
//                     <div className="flex justify-between text-xs text-gray-500">
//                       <span>Negative</span>
//                       <span>Mixed</span>
//                       <span>Positive</span>
//                     </div>
//                   </div>

//                   <div className="flex gap-4 pt-6">
//                     <button
//                       onClick={goBackToStep2}
//                       className="px-8 py-4 bg-gray-500 text-white rounded-xl font-bold hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
//                     >
//                       ← Back
//                     </button>
                    
//                     <button
//                       onClick={handleStep3Submit}
//                       disabled={isLoading}
//                       className="flex-1 py-4 px-6 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
//                     >
//                       {isLoading ? (
//                         <div className="flex items-center justify-center gap-3">
//                           <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                           Calculating Final...
//                         </div>
//                       ) : finalResult ? 'Recalculate Final' : '🎯 Get Final Prediction'}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Data Source Info - Modern Card */}
//             <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl border border-blue-200 p-6 hover:shadow-lg transition-all duration-300">
//               <div className="flex items-center gap-4 mb-4">
//                 <div className="p-3 bg-blue-100 rounded-xl">
//                   <span className="text-2xl">📊</span>
//                 </div>
//                 <div>
//                   <h4 className="text-lg font-bold text-gray-900">Data Source</h4>
//                   <p className="text-sm text-gray-600">Historical movie database</p>
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-4 text-sm">
//                 <div className="flex items-center gap-2">
//                   <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                   <span>{options.directors.length} Directors</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                   <span>{options.casts.length} Cast Members</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
//                   <span>{options.genres.length} Genres</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
//                   <span>Google Sheets</span>
//                 </div>
//               </div>
//               <button
//                 onClick={loadExcelData}
//                 className="mt-4 w-full py-2 px-4 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl font-medium transition-all duration-200 hover:shadow-md"
//               >
//                 🔄 Refresh Data
//               </button>
//             </div>
//           </div>

//           {/* Right Panel - Results */}
//           <div className="w-1/2 space-y-6">
//             {/* Save Status */}
//             {(finalResult || saveStatus || predictionSaved) && (
//               <div className={`rounded-2xl border-2 p-6 transition-all duration-300 ${
//                 predictionSaved 
//                   ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' 
//                   : saveStatus.includes('❌')
//                   ? 'bg-gradient-to-r from-red-50 to-pink-50 border-red-200'
//                   : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
//               }`}>
//                 <div className="flex items-center gap-3">
//                   {predictionSaved ? (
//                     <>
//                       <div className="p-2 bg-green-100 rounded-full">
//                         <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                         </svg>
//                       </div>
//                       <div>
//                         <span className="font-bold text-green-800">Prediction Saved!</span>
//                         <p className="text-xs text-green-600 mt-1">Available in your history dashboard</p>
//                       </div>
//                     </>
//                   ) : saveStatus.includes('❌') ? (
//                     <>
//                       <div className="p-2 bg-red-100 rounded-full">
//                         <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="6 18L18 6M6 6l12 12" />
//                         </svg>
//                       </div>
//                       <span className="font-bold text-red-800">Save Failed</span>
//                     </>
//                   ) : (
//                     <>
//                       <div className="p-2 bg-blue-100 rounded-full">
//                         <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//                       </div>
//                       <span className="font-bold text-blue-800">Saving...</span>
//                     </>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Step Results */}
//             {step1Result && (
//               <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300">
//                 <div className="flex items-center justify-between mb-6">
//                   <div className="flex items-center gap-3">
//                     <div className="p-2 bg-blue-100 rounded-lg">
//                       <span className="text-xl">🎬</span>
//                     </div>
//                     <h4 className="text-lg font-bold text-gray-900">Step 1 Results</h4>
//                   </div>
//                   <button
//                     onClick={goBackToStep1}
//                     className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 font-medium hover:bg-blue-50 rounded-lg transition-all duration-200"
//                   >
//                     Edit
//                   </button>
//                 </div>
//                 <div className="space-y-4">
//                   <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
//                     <span className="font-medium text-gray-700">Weekend Collection:</span>
//                     <span className="text-xl font-bold text-blue-600">₹{step1Result.weekend} Cr</span>
//                   </div>
//                   <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
//                     <span className="font-medium text-gray-700">Total Collection:</span>
//                     <span className="text-xl font-bold text-green-600">₹{step1Result.total} Cr</span>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {step2Result && (
//               <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300">
//                 <div className="flex items-center justify-between mb-6">
//                   <div className="flex items-center gap-3">
//                     <div className="p-2 bg-green-100 rounded-lg">
//                       <span className="text-xl">📈</span>
//                     </div>
//                     <h4 className="text-lg font-bold text-gray-900">Step 2 Results</h4>
//                   </div>
//                   <button
//                     onClick={goBackToStep2}
//                     className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 font-medium hover:bg-blue-50 rounded-lg transition-all duration-200"
//                   >
//                     Edit
//                   </button>
//                 </div>
//                 <div className="space-y-4">
//                   <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
//                     <span className="font-medium text-gray-700">Weekend Collection:</span>
//                     <span className="text-xl font-bold text-blue-600">₹{step2Result.weekend} Cr</span>
//                   </div>
//                   <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
//                     <span className="font-medium text-gray-700">Total Collection:</span>
//                     <span className="text-xl font-bold text-green-600">₹{step2Result.total} Cr</span>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Final Result - Hero Card */}
//             {finalResult && (
//               <div className="bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 rounded-3xl border-2 border-purple-200 p-8 shadow-2xl hover:shadow-3xl transition-all duration-300">
//                 <div className="text-center mb-6">
//                   <div className="flex items-center justify-center gap-3 mb-2">
//                     <div className="p-3 bg-purple-200 rounded-2xl">
//                       <span className="text-3xl">🎯</span>
//                     </div>
//                     <h4 className="text-2xl font-bold text-gray-900">Final Prediction</h4>
//                     {predictionSaved && (
//                       <div className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-bold">
//                         SAVED
//                       </div>
//                     )}
//                   </div>
//                 </div>
                
//                 <div className="space-y-6">
//                   <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg">
//                     <p className="text-sm font-medium text-gray-600 mb-2">Weekend Collection</p>
//                     <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
//                       ₹{finalResult.weekend} Cr
//                     </p>
//                   </div>
                  
//                   <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg">
//                     <p className="text-sm font-medium text-gray-600 mb-2">Total Collection</p>
//                     <p className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                       ₹{finalResult.total} Cr
//                     </p>
//                   </div>
                  
//                   {/* Confidence Score */}
//                   {finalResult.breakdown && (
//                     <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl">
//                       <p className="text-sm font-medium text-gray-600 mb-3">Confidence Score</p>
//                       <div className="flex items-center justify-center gap-3">
//                         <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
//                           <div 
//                             className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-1000 ease-out"
//                             style={{ width: `${apiService.calculateConfidence(
//                               {
//                                 director: step1Data.director,
//                                 cast_1: step1Data.cast1,
//                                 cast_2: step1Data.cast2,
//                                 music_director: step1Data.musicDirector,
//                                 teaser_views: step2Data.teaserViews,
//                                 trailer_views: step2Data.trailerViews,
//                                 imdb_rating: step3Data.imdbRating,
//                                 critics_review: step3Data.criticsReview,
//                                 genre: step1Data.genre,
//                                 category: step1Data.category
//                               },
//                               finalResult
//                             )}%` }}
//                           ></div>
//                         </div>
//                         <span className="text-lg font-bold text-green-600">
//                           {apiService.calculateConfidence(
//                             {
//                               director: step1Data.director,
//                               cast_1: step1Data.cast1,
//                               cast_2: step1Data.cast2,
//                               music_director: step1Data.musicDirector,
//                               teaser_views: step2Data.teaserViews,
//                               trailer_views: step2Data.trailerViews,
//                               imdb_rating: step3Data.imdbRating,
//                               critics_review: step3Data.criticsReview,
//                               genre: step1Data.genre,
//                               category: step1Data.category
//                             },
//                             finalResult
//                           )}%
//                         </span>
//                       </div>
//                     </div>
//                   )}

//                   <div className="flex gap-3">
//                     <button
//                       onClick={() => setCurrentStep(3)}
//                       className="flex-1 py-3 px-4 bg-purple-200 hover:bg-purple-300 text-purple-800 rounded-xl font-bold transition-all duration-200 hover:shadow-md"
//                     >
//                       🔧 Adjust
//                     </button>
//                     <button
//                       onClick={resetPrediction}
//                       className="flex-1 py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-bold transition-all duration-200 hover:shadow-md"
//                     >
//                       🔄 New
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Quick Navigation */}
//             {(step1Result || step2Result || finalResult) && (
//               <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="p-2 bg-orange-100 rounded-lg">
//                     <span className="text-lg">🧭</span>
//                   </div>
//                   <h4 className="text-lg font-bold text-gray-900">Quick Navigation</h4>
//                 </div>
//                 <div className="space-y-2">
//                   {[
//                     { fn: goBackToStep1, icon: '🎬', label: 'Movie Details', color: 'blue' },
//                     { fn: goBackToStep2, icon: '📈', label: 'Marketing Impact', color: 'green', show: step1Result },
//                     { fn: () => setCurrentStep(3), icon: '⭐', label: 'Reviews & Ratings', color: 'purple', show: step2Result }
//                   ].map((item, index) => (
//                     item.show !== false && (
//                       <button
//                         key={index}
//                         onClick={item.fn}
//                         className={`w-full text-left py-3 px-4 text-gray-700 hover:bg-${item.color}-50 hover:text-${item.color}-700 rounded-xl transition-all duration-200 flex items-center gap-3 hover:shadow-md`}
//                       >
//                         <span className="text-lg">{item.icon}</span>
//                         <span className="font-medium">{item.label}</span>
//                       </button>
//                     )
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Prediction Summary */}
//             {finalResult && (
//               <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl border border-blue-200 p-6 hover:shadow-lg transition-all duration-300">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="p-2 bg-blue-100 rounded-lg">
//                     <span className="text-lg">📋</span>
//                   </div>
//                   <h4 className="text-lg font-bold text-gray-900">Summary</h4>
//                 </div>
//                 <div className="space-y-3 text-sm">
//                   {[
//                     { label: 'Movie Title', value: step1Data.movieTitle || `${step1Data.director} Movie`, icon: '🎭' },
//                     { label: 'Director', value: step1Data.director, icon: '🎯' },
//                     { label: 'Genre', value: step1Data.genre, icon: '🎪' },
//                     { label: 'Lead Actor', value: step1Data.cast1, icon: '⭐' },
//                     { label: 'Category', value: step1Data.category, icon: '🏷️' },
//                     { label: 'IMDB Rating', value: `${step3Data.imdbRating}/10`, icon: '🌟' },
//                     { label: 'Method', value: 'Excel 3-Step Analysis', icon: '🔬' }
//                   ].map((item, index) => (
//                     <div key={index} className="flex items-center justify-between py-2">
//                       <span className="flex items-center gap-2 text-gray-600">
//                         <span>{item.icon}</span>
//                         {item.label}:
//                       </span>
//                       <span className="font-medium text-gray-900">{item.value}</span>
//                     </div>
//                   ))}
                  
//                   {predictionSaved && (
//                     <div className="mt-4 pt-4 border-t border-blue-200">
//                       <div className="flex items-center gap-2 text-green-600">
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                         </svg>
//                         <span className="text-sm font-medium">Saved to prediction history</span>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Empty State */}
//             {!step1Result && !step2Result && !finalResult && (
//               <div className="bg-white/60 backdrop-blur-sm rounded-2xl border-2 border-dashed border-gray-300 p-12 text-center hover:border-blue-400 transition-all duration-300">
//                 <div className="text-gray-400 mb-6">
//                   <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl flex items-center justify-center">
//                     <span className="text-4xl">📊</span>
//                   </div>
//                 </div>
//                 <h4 className="text-xl font-bold text-gray-600 mb-3">Prediction Results</h4>
//                 <p className="text-gray-500 mb-8">Complete the movie details on the left to generate your box office predictions</p>
                
//                 <div className="space-y-4">
//                   {[
//                     { step: 1, title: 'Movie Details', desc: 'Cast & Crew Analysis', color: 'blue' },
//                     { step: 2, title: 'Marketing', desc: 'Promotional Impact', color: 'green' },
//                     { step: 3, title: 'Reviews', desc: 'Critical Reception', color: 'purple' }
//                   ].map((item) => (
//                     <div key={item.step} className={`flex items-center justify-between p-4 bg-${item.color}-50 border border-${item.color}-200 rounded-xl`}>
//                       <div className="flex items-center gap-3">
//                         <div className={`w-8 h-8 bg-${item.color}-200 rounded-full flex items-center justify-center text-${item.color}-700 font-bold text-sm`}>
//                           {item.step}
//                         </div>
//                         <div>
//                           <span className={`font-semibold text-${item.color}-800`}>{item.title}</span>
//                           <p className={`text-xs text-${item.color}-600`}>{item.desc}</p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="mt-8 p-4 bg-blue-50 rounded-xl">
//                   <p className="text-sm text-blue-700">
//                     💡 <strong>Quick Start:</strong> Only Director and Genre are required to begin
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ExcelMoviePrediction;
import React, { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';

function ExcelMoviePrediction({ user, onLogout, onTokenExpired, onBack }) {
  // Form state for Step 1 (Cast & Crew + Movie Title)
  const [step1Data, setStep1Data] = useState({
    movieTitle: '',
    director: '',
    genre: '',
    cast1: '',
    cast2: '',
    cast3: '',
    cast4: '',
    musicDirector: '',
    leadSinger: '',
    category: 'None'
  });

  // Form state for Step 2 (Marketing Metrics)
  const [step2Data, setStep2Data] = useState({
    teaserViews: 50,
    trailerViews: 50,
    bestHits: 50,
    posterViews: 50
  });

  // Form state for Step 3 (Reviews)
  const [step3Data, setStep3Data] = useState({
    imdbRating: 6.5,
    criticsReview: 5.0
  });

  // Prediction results
  const [step1Result, setStep1Result] = useState(null);
  const [step2Result, setStep2Result] = useState(null);
  const [finalResult, setFinalResult] = useState(null);

  // UI state
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [adjustmentPercentage, setAdjustmentPercentage] = useState(0);
  const [excelData, setExcelData] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [saveStatus, setSaveStatus] = useState('');
  const [predictionSaved, setPredictionSaved] = useState(false);

  // Static options
  const [options, setOptions] = useState({
    directors: [],
    genres: [],
    casts: [],
    musicDirectors: [],
    leadSingers: []
  });

  // Load Excel data on component mount
  useEffect(() => {
    loadExcelData();
  }, []);

  const loadExcelData = async () => {
    setIsLoadingData(true);
    try {
      const data = await apiService.getExcelData();
      setExcelData(data);
      
      // Extract unique options from the data
      const directors = [...new Set(data.map(row => row.Director).filter(Boolean))].sort();
      const genres = [...new Set(data.map(row => row.Genre).filter(Boolean))].sort();
      const casts = [...new Set([
        ...data.map(row => row['Cast 1']),
        ...data.map(row => row['Cast 2']),
        ...data.map(row => row['Cast 3']),
        ...data.map(row => row['Cast 4'])
      ].filter(Boolean))].sort();
      const musicDirectors = [...new Set(data.map(row => row['Music Director']).filter(Boolean))].sort();
      const leadSingers = [...new Set(data.map(row => row['Lead Singer']).filter(Boolean))].sort();

      setOptions({
        directors,
        genres,
        casts,
        musicDirectors,
        leadSingers
      });
    } catch (error) {
      console.error('Failed to load Excel data:', error);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleStep1Submit = async () => {
    setIsLoading(true);
    try {
      const result = await apiService.predictExcelStep1Enhanced({
        ...step1Data,
        adjustmentPercentage
      }, false);

      setStep1Result(result);
      setCurrentStep(2);
    } catch (error) {
      console.error('Step 1 prediction failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStep2Submit = async () => {
    setIsLoading(true);
    try {
      const result = await apiService.predictExcelStep2Enhanced({
        step1Weekend: step1Result.weekend,
        step1Total: step1Result.total,
        ...step2Data,
        category: step1Data.category
      }, false);

      setStep2Result(result);
      setCurrentStep(3);
    } catch (error) {
      console.error('Step 2 prediction failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStep3Submit = async () => {
    setIsLoading(true);
    setSaveStatus('Calculating...');
    setPredictionSaved(false);
    
    try {
      const completeMovieData = {
        director: step1Data.director,
        genre: step1Data.genre,
        cast_1: step1Data.cast1,
        cast_2: step1Data.cast2,
        cast_3: step1Data.cast3,
        cast_4: step1Data.cast4,
        music_director: step1Data.musicDirector,
        lead_singer: step1Data.leadSinger,
        category: step1Data.category,
        adjustment_percentage: adjustmentPercentage,
        teaser_views: step2Data.teaserViews,
        trailer_views: step2Data.trailerViews,
        best_hits: step2Data.bestHits,
        poster_views: step2Data.posterViews,
        imdb_rating: step3Data.imdbRating,
        critics_review: step3Data.criticsReview,
        prediction_method: 'Excel Historical Data Analysis (3 Steps)',
        data_source: 'Google Sheets Historical Data',
        Movie_Title: step1Data.movieTitle || `${step1Data.director} Movie`
      };

      setSaveStatus('Saving to database...');

      const result = await apiService.predictExcelStep3Enhanced(
        {
          step2Weekend: step2Result.weekend,
          step2Total: step2Result.total,
          ...step3Data
        },
        completeMovieData,
        true
      );

      setFinalResult(result);
      setPredictionSaved(true);
      setSaveStatus('✅ Prediction saved successfully!');
      
      setTimeout(() => {
        setSaveStatus('');
      }, 3000);

    } catch (error) {
      console.error('Final prediction failed:', error);
      setSaveStatus('❌ Failed to save prediction');
      
      setTimeout(() => {
        setSaveStatus('');
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };
  
  const goToStep = (step) => {
    if (step === 1) {
      setCurrentStep(1);
    } else if (step === 2 && step1Result) {
      setCurrentStep(2);
    } else if (step === 3 && step2Result) {
      setCurrentStep(3);
    }
  };

  const goBackToStep1 = () => {
    setCurrentStep(1);
    setStep2Result(null);
    setFinalResult(null);
    setPredictionSaved(false);
    setSaveStatus('');
  };

  const goBackToStep2 = () => {
    setCurrentStep(2);
    setFinalResult(null);
    setPredictionSaved(false);
    setSaveStatus('');
  };

  const resetPrediction = () => {
    setStep1Result(null);
    setStep2Result(null);
    setFinalResult(null);
    setCurrentStep(1);
    setPredictionSaved(false);
    setSaveStatus('');
    setStep1Data({ 
      movieTitle: '',
      director: '', 
      genre: '', 
      cast1: '', 
      cast2: '', 
      cast3: '', 
      cast4: '', 
      musicDirector: '', 
      leadSinger: '', 
      category: 'None' 
    });
    setStep2Data({ 
      teaserViews: 50, 
      trailerViews: 50, 
      bestHits: 50, 
      posterViews: 50 
    });
    setStep3Data({ 
      imdbRating: 6.5, 
      criticsReview: 5.0 
    });
    setAdjustmentPercentage(0);
  };

  const isStep1Complete = step1Data.director && step1Data.genre;

  // Mock confidence calculation if apiService.calculateConfidence doesn't exist
  const calculateConfidence = (data, result) => {
    let confidence = 50; // Base confidence
    
    // Add confidence based on data completeness
    if (data.director) confidence += 10;
    if (data.cast_1) confidence += 8;
    if (data.music_director) confidence += 5;
    if (data.genre) confidence += 10;
    if (data.imdb_rating > 7) confidence += 10;
    if (data.critics_review > 7) confidence += 7;
    
    return Math.min(confidence, 95);
  };

  if (isLoadingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-12 text-center border border-white/20">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Loading Movie Database</h3>
          <p className="text-gray-600">Fetching historical data from Google Sheets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Modern Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-10">
        <div className=" mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
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
             <div className="mb-12">
          <div className="flex items-center justify-center space-x-4 mt-[50px]">
            {[
              { num: 1, title: 'Movie Details', icon: '🎬', desc: 'Cast & Crew' },
              { num: 2, title: 'Marketing', icon: '📈', desc: 'Promotional Impact' },
              { num: 3, title: 'Reviews', icon: '⭐', desc: 'Critical Reception' }
            ].map((step, index) => (
              <div key={step.num} className="flex items-center">
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => goToStep(step.num)}
                    disabled={step.num === 2 && !step1Result || step.num === 3 && !step2Result}
                    className={`relative w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm transition-all duration-300 transform hover:scale-110 ${
                      currentStep === step.num
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-xl shadow-blue-500/25'
                        : currentStep > step.num || (step.num === 2 && step1Result) || (step.num === 3 && step2Result)
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:shadow-xl cursor-pointer'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <span className="text-sm">{step.icon}</span>
                    {currentStep === step.num && (
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-75 animate-pulse"></div>
                    )}
                  </button>
                  <div className="mt-1 text-center">
                    <h3 className={`font-semibold ${currentStep >= step.num ? 'text-blue-600' : 'text-gray-500'}`}>
                      {step.title}
                    </h3>
                    {/* <p className="text-xs text-gray-500 mt-1">{step.desc}</p> */}
                  </div>
                </div>
                {index < 2 && (
                  <div className={`w-6 h-1 mx-6 rounded-full transition-all duration-500 ${
                    currentStep > step.num ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className=" mx-auto px-6 lg:px-8 py-8">
        {/* Modern Progress Steps */}
       

        {/* Main Layout */}
        <div className="flex gap-8 h-full">
          {/* Left Panel - Inputs */}
          <div className="w-1/2 space-y-6">
            {/* Global Adjustment */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <span className="text-xl">⚡</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Prediction Adjustment</h3>
                    <p className="text-sm text-amber-700">{adjustmentPercentage}% modifier applied</p>
                  </div>
                </div>
                <input
                  type="range"
                  min="-100"
                  max="100"
                  value={adjustmentPercentage}
                  onChange={(e) => setAdjustmentPercentage(Number(e.target.value))}
                  className="w-full h-2 bg-gradient-to-r from-red-300 via-gray-300 to-green-300 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #fca5a5 0%, #d1d5db 50%, #86efac 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-gray-600 mt-2">
                  <span>Conservative</span>
                  <span>Baseline</span>
                  <span>Optimistic</span>
                </div>
              </div>
            </div>

            {/* Step Content */}
            {currentStep === 1 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <span className="text-2xl">🎬</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Movie Details</h3>
                      <p className="text-gray-600">Core information about your movie</p>
                    </div>
                  </div>
                  {step1Result && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-green-700">Completed</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-6">
                  {/* Movie Title */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <span className="text-lg">🎭</span>
                      Movie Title
                      <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">Optional</span>
                    </label>
                    <input
                      type="text"
                      value={step1Data.movieTitle}
                      onChange={(e) => setStep1Data({...step1Data, movieTitle: e.target.value})}
                      placeholder="Enter movie title or leave blank for auto-generation"
                      className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                    />
                    {!step1Data.movieTitle && step1Data.director && (
                      <p className="text-sm text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
                        ✨ Auto-generated: "{step1Data.director} Movie"
                      </p>
                    )}
                  </div>

                  {/* Core Fields Grid */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <span className="text-lg">🎯</span>
                        Director
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={step1Data.director}
                        onChange={(e) => setStep1Data({...step1Data, director: e.target.value})}
                        className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                      >
                        <option value="">Choose Director</option>
                        {options.directors.map(director => (
                          <option key={director} value={director}>{director}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <span className="text-lg">🎪</span>
                        Genre
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={step1Data.genre}
                        onChange={(e) => setStep1Data({...step1Data, genre: e.target.value})}
                        className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                      >
                        <option value="">Choose Genre</option>
                        {options.genres.map(genre => (
                          <option key={genre} value={genre}>{genre}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <span className="text-lg">⭐</span>
                        Lead Actor
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={step1Data.cast1}
                        onChange={(e) => setStep1Data({...step1Data, cast1: e.target.value})}
                        className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                      >
                        <option value="">Choose Lead Actor</option>
                        {options.casts.map(cast => (
                          <option key={cast} value={cast}>{cast}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <span className="text-lg">🎭</span>
                        Supporting Actor
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={step1Data.cast2}
                        onChange={(e) => setStep1Data({...step1Data, cast2: e.target.value})}
                        className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                      >
                        <option value="">Choose Supporting Actor</option>
                        {options.casts.map(cast => (
                          <option key={cast} value={cast}>{cast}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <span className="text-lg">🎵</span>
                        Music Director
                      </label>
                      <select
                        value={step1Data.musicDirector}
                        onChange={(e) => setStep1Data({...step1Data, musicDirector: e.target.value})}
                        className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                      >
                        <option value="">Choose Music Director</option>
                        {options.musicDirectors.map(md => (
                          <option key={md} value={md}>{md}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <span className="text-lg">🎤</span>
                        Lead Singer
                      </label>
                      <select
                        value={step1Data.leadSinger}
                        onChange={(e) => setStep1Data({...step1Data, leadSinger: e.target.value})}
                        className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                      >
                        <option value="">Choose Lead Singer</option>
                        {options.leadSingers.map(singer => (
                          <option key={singer} value={singer}>{singer}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Additional Cast Fields */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <span className="text-lg">🎪</span>
                        Cast 3
                      </label>
                      <select
                        value={step1Data.cast3}
                        onChange={(e) => setStep1Data({...step1Data, cast3: e.target.value})}
                        className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                      >
                        <option value="">Choose Cast 3</option>
                        {options.casts.map(cast => (
                          <option key={cast} value={cast}>{cast}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <span className="text-lg">🎨</span>
                        Cast 4
                      </label>
                      <select
                        value={step1Data.cast4}
                        onChange={(e) => setStep1Data({...step1Data, cast4: e.target.value})}
                        className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                      >
                        <option value="">Choose Cast 4</option>
                        {options.casts.map(cast => (
                          <option key={cast} value={cast}>{cast}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Category Selection */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <span className="text-lg">🏷️</span>
                      Movie Category
                    </label>
                    <div className="flex gap-4">
                      {['None', 'Religious/Political', 'Political'].map(category => (
                        <label key={category} className="flex items-center cursor-pointer group">
                          <input
                            type="radio"
                            value={category}
                            checked={step1Data.category === category}
                            onChange={(e) => setStep1Data({...step1Data, category: e.target.value})}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                            {category}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-6">
                    <button
                      onClick={handleStep1Submit}
                      disabled={!isStep1Complete || isLoading}
                      className={`flex-1 py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                        isStep1Complete && !isLoading
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:shadow-blue-500/25'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-3">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Calculating...
                        </div>
                      ) : step1Result ? 'Recalculate Step 1' : '🚀 Start Prediction'}
                    </button>
                    
                    {step1Result && (
                      <button
                        onClick={() => setCurrentStep(2)}
                        className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105"
                      >
                        Next Step →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Marketing */}
            {currentStep === 2 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-100 rounded-xl">
                      <span className="text-2xl">📈</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Marketing Impact</h3>
                      <p className="text-gray-600">Promotional campaign effectiveness</p>
                    </div>
                  </div>
                  {step2Result && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-green-700">Completed</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-8">
                  {[
                    { key: 'teaserViews', label: 'Teaser Views Impact', icon: '🎬', color: 'blue' },
                    { key: 'trailerViews', label: 'Trailer Views Impact', icon: '📹', color: 'purple' },
                    { key: 'bestHits', label: 'Best Hits in Songs', icon: '🎵', color: 'pink' },
                    { key: 'posterViews', label: 'Poster Views Impact', icon: '🖼️', color: 'green' }
                  ].map(item => (
                    <div key={item.key} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                          <span className="text-xl">{item.icon}</span>
                          {item.label}
                        </label>
                        <div className={`px-4 py-2 bg-${item.color}-100 text-${item.color}-700 rounded-full font-bold`}>
                          {step2Data[item.key]}M
                        </div>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={step2Data[item.key]}
                        onChange={(e) => setStep2Data({...step2Data, [item.key]: Number(e.target.value)})}
                        className={`w-full h-3 bg-gradient-to-r from-gray-200 to-${item.color}-400 rounded-lg appearance-none cursor-pointer hover:shadow-lg transition-all duration-200`}
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>No Impact</span>
                        <span>Maximum Impact</span>
                      </div>
                    </div>
                  ))}

                  <div className="flex gap-4 pt-6">
                    <button
                      onClick={goBackToStep1}
                      className="px-8 py-4 bg-gray-500 text-white rounded-xl font-bold hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
                    >
                      ← Back
                    </button>
                    
                    <button
                      onClick={handleStep2Submit}
                      disabled={isLoading}
                      className="flex-1 py-4 px-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-3">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Calculating...
                        </div>
                      ) : step2Result ? 'Recalculate Step 2' : '📊 Analyze Marketing'}
                    </button>
                    
                    {step2Result && (
                      <button
                        onClick={() => setCurrentStep(3)}
                        className="px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
                      >
                        Next Step →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Reviews */}
            {currentStep === 3 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-100 rounded-xl">
                      <span className="text-2xl">⭐</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Critical Reception</h3>
                      <p className="text-gray-600">Reviews and ratings impact</p>
                    </div>
                  </div>
                  {finalResult && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-green-700">Completed</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                        <span className="text-xl">🌟</span>
                        IMDB Rating
                      </label>
                      <div className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full font-bold">
                        {step3Data.imdbRating}/10
                      </div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.1"
                      value={step3Data.imdbRating}
                      onChange={(e) => setStep3Data({...step3Data, imdbRating: Number(e.target.value)})}
                      className="w-full h-3 bg-gradient-to-r from-red-300 via-yellow-300 to-green-400 rounded-lg appearance-none cursor-pointer hover:shadow-lg transition-all duration-200"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Poor (0)</span>
                      <span>Average (5)</span>
                      <span>Excellent (10)</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                        <span className="text-xl">📝</span>
                        Critics Review
                      </label>
                      <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-bold">
                        {step3Data.criticsReview}/10
                      </div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.1"
                      value={step3Data.criticsReview}
                      onChange={(e) => setStep3Data({...step3Data, criticsReview: Number(e.target.value)})}
                      className="w-full h-3 bg-gradient-to-r from-red-300 via-yellow-300 to-green-400 rounded-lg appearance-none cursor-pointer hover:shadow-lg transition-all duration-200"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Negative</span>
                      <span>Mixed</span>
                      <span>Positive</span>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-6">
                    <button
                      onClick={goBackToStep2}
                      className="px-8 py-4 bg-gray-500 text-white rounded-xl font-bold hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
                    >
                      ← Back
                    </button>
                    
                    <button
                      onClick={handleStep3Submit}
                      disabled={isLoading}
                      className="flex-1 py-4 px-6 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-3">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Calculating Final...
                        </div>
                      ) : finalResult ? 'Recalculate Final' : '🎯 Get Final Prediction'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Data Source Info - Modern Card */}
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl border border-blue-200 p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <span className="text-2xl">📊</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">Data Source</h4>
                  <p className="text-sm text-gray-600">Historical movie database</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>{options.directors.length} Directors</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>{options.casts.length} Cast Members</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>{options.genres.length} Genres</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Google Sheets</span>
                </div>
              </div>
              <button
                onClick={loadExcelData}
                className="mt-4 w-full py-2 px-4 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl font-medium transition-all duration-200 hover:shadow-md"
              >
                🔄 Refresh Data
              </button>
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="w-1/2 space-y-6">
            {/* Save Status */}
            {/* {(finalResult || saveStatus || predictionSaved) && (
              <div className={`rounded-2xl border-2 p-6 transition-all duration-300 ${
                predictionSaved 
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' 
                  : saveStatus.includes('❌')
                  ? 'bg-gradient-to-r from-red-50 to-pink-50 border-red-200'
                  : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
              }`}>
                <div className="flex items-center gap-3">
                  {predictionSaved ? (
                    <>
                      <div className="p-2 bg-green-100 rounded-full">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <span className="font-bold text-green-800">Prediction Saved!</span>
                        <p className="text-xs text-green-600 mt-1">Available in your history dashboard</p>
                      </div>
                    </>
                  ) : saveStatus.includes('❌') ? (
                    <>
                      <div className="p-2 bg-red-100 rounded-full">
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <span className="font-bold text-red-800">Save Failed</span>
                    </>
                  ) : (
                    <>
                      <div className="p-2 bg-blue-100 rounded-full">
                        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                      <span className="font-bold text-blue-800">Saving...</span>
                    </>
                  )}
                </div>
              </div>
            )} */}

            {/* Step Results */}
            {step1Result && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <span className="text-xl">🎬</span>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">Step 1 Results</h4>
                  </div>
                  <button
                    onClick={goBackToStep1}
                    className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 font-medium hover:bg-blue-50 rounded-lg transition-all duration-200"
                  >
                    Edit
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                    <span className="font-medium text-gray-700">Weekend Collection:</span>
                    <span className="text-xl font-bold text-blue-600">₹{step1Result.weekend} Cr</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <span className="font-medium text-gray-700">Total Collection:</span>
                    <span className="text-xl font-bold text-green-600">₹{step1Result.total} Cr</span>
                  </div>
                </div>
              </div>
            )}

            {step2Result && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <span className="text-xl">📈</span>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">Step 2 Results</h4>
                  </div>
                  <button
                    onClick={goBackToStep2}
                    className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 font-medium hover:bg-blue-50 rounded-lg transition-all duration-200"
                  >
                    Edit
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                    <span className="font-medium text-gray-700">Weekend Collection:</span>
                    <span className="text-xl font-bold text-blue-600">₹{step2Result.weekend} Cr</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <span className="font-medium text-gray-700">Total Collection:</span>
                    <span className="text-xl font-bold text-green-600">₹{step2Result.total} Cr</span>
                  </div>
                </div>
              </div>
            )}

            {/* Final Result - Hero Card */}
            {finalResult && (
              <div className="bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 rounded-3xl border-2 border-purple-200 p-8 shadow-2xl hover:shadow-3xl transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <div className="p-3 bg-purple-200 rounded-2xl">
                      <span className="text-3xl">🎯</span>
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900">Final Prediction</h4>
                    {predictionSaved && (
                      <div className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-bold">
                        SAVED
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg">
                    <p className="text-sm font-medium text-gray-600 mb-2">Weekend Collection</p>
                    <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                      ₹{finalResult.weekend} Cr
                    </p>
                  </div>
                  
                  <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg">
                    <p className="text-sm font-medium text-gray-600 mb-2">Total Collection</p>
                    <p className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      ₹{finalResult.total} Cr
                    </p>
                  </div>
                  
                  {/* Confidence Score */}
                  {/* <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl">
                    <p className="text-sm font-medium text-gray-600 mb-3">Confidence Score</p>
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-1000 ease-out"
                          style={{ 
                            width: `${calculateConfidence(
                              {
                                director: step1Data.director,
                                cast_1: step1Data.cast1,
                                cast_2: step1Data.cast2,
                                music_director: step1Data.musicDirector,
                                teaser_views: step2Data.teaserViews,
                                trailer_views: step2Data.trailerViews,
                                imdb_rating: step3Data.imdbRating,
                                critics_review: step3Data.criticsReview,
                                genre: step1Data.genre,
                                category: step1Data.category
                              },
                              finalResult
                            )}%` 
                          }}
                        ></div>
                      </div>
                      <span className="text-lg font-bold text-green-600">
                        {calculateConfidence(
                          {
                            director: step1Data.director,
                            cast_1: step1Data.cast1,
                            cast_2: step1Data.cast2,
                            music_director: step1Data.musicDirector,
                            teaser_views: step2Data.teaserViews,
                            trailer_views: step2Data.trailerViews,
                            imdb_rating: step3Data.imdbRating,
                            critics_review: step3Data.criticsReview,
                            genre: step1Data.genre,
                            category: step1Data.category
                          },
                          finalResult
                        )}%
                      </span>
                    </div>
                  </div> */}

                  <div className="flex gap-3">
                    {/* <button
                      onClick={() => setCurrentStep(3)}
                      className="flex-1 py-3 px-4 bg-purple-200 hover:bg-purple-300 text-purple-800 rounded-xl font-bold transition-all duration-200 hover:shadow-md"
                    >
                      🔧 Adjust
                    </button> */}
                    <button
                      onClick={resetPrediction}
                      className="flex-1 py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-bold transition-all duration-200 hover:shadow-md"
                    >
                      🔄 New
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Navigation */}
            {/* {(step1Result || step2Result || finalResult) && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <span className="text-lg">🧭</span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">Quick Navigation</h4>
                </div>
                <div className="space-y-2">
                  {[
                    { fn: goBackToStep1, icon: '🎬', label: 'Movie Details', color: 'blue' },
                    { fn: goBackToStep2, icon: '📈', label: 'Marketing Impact', color: 'green', show: step1Result },
                    { fn: () => setCurrentStep(3), icon: '⭐', label: 'Reviews & Ratings', color: 'purple', show: step2Result }
                  ].map((item, index) => (
                    item.show !== false && (
                      <button
                        key={index}
                        onClick={item.fn}
                        className="w-full text-left py-3 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-all duration-200 flex items-center gap-3 hover:shadow-md"
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                      </button>
                    )
                  ))}
                </div>
              </div>
            )} */}

            {/* Prediction Summary */}
            {/* {finalResult && (
              <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl border border-blue-200 p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <span className="text-lg">📋</span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">Summary</h4>
                </div>
                <div className="space-y-3 text-sm">
                  {[
                    { label: 'Movie Title', value: step1Data.movieTitle || `${step1Data.director} Movie`, icon: '🎭' },
                    { label: 'Director', value: step1Data.director, icon: '🎯' },
                    { label: 'Genre', value: step1Data.genre, icon: '🎪' },
                    { label: 'Lead Actor', value: step1Data.cast1 || 'Not specified', icon: '⭐' },
                    { label: 'Category', value: step1Data.category, icon: '🏷️' },
                    { label: 'IMDB Rating', value: `${step3Data.imdbRating}/10`, icon: '🌟' },
                    { label: 'Method', value: 'Excel 3-Step Analysis', icon: '🔬' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <span className="flex items-center gap-2 text-gray-600">
                        <span>{item.icon}</span>
                        {item.label}:
                      </span>
                      <span className="font-medium text-gray-900 text-right max-w-[150px] truncate">{item.value}</span>
                    </div>
                  ))}
                  
                  {predictionSaved && (
                    <div className="mt-4 pt-4 border-t border-blue-200">
                      <div className="flex items-center gap-2 text-green-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-medium">Saved to prediction history</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )} */}

            {/* Empty State */}
            {!step1Result && !step2Result && !finalResult && (
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl border-2 border-dashed border-gray-300 p-12 text-center hover:border-blue-400 transition-all duration-300">
                <div className="text-gray-400 mb-6">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl flex items-center justify-center">
                    <span className="text-4xl">📊</span>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-600 mb-3">Prediction Results</h4>
                <p className="text-gray-500 mb-8">Complete the movie details on the left to generate your box office predictions</p>
                
                <div className="space-y-4">
                  {[
                    { step: 1, title: 'Movie Details', desc: 'Cast & Crew Analysis', color: 'blue' },
                    { step: 2, title: 'Marketing', desc: 'Promotional Impact', color: 'green' },
                    { step: 3, title: 'Reviews', desc: 'Critical Reception', color: 'purple' }
                  ].map((item) => (
                    <div key={item.step} className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold text-sm">
                          {item.step}
                        </div>
                        <div>
                          <span className="font-semibold text-blue-800">{item.title}</span>
                          <p className="text-xs text-blue-600">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-xl">
                  <p className="text-sm text-blue-700">
                    💡 <strong>Quick Start:</strong> Only Director and Genre are required to begin
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExcelMoviePrediction;