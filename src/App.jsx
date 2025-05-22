// // // // import { useState, useEffect } from "react";
// // // // import './App.css';

// // // // const steps = [
// // // //   "Director", 
// // // //   "Genre", 
// // // //   "Music Director", 
// // // //   "Lead Singer",
// // // //   "Cast 1", 
// // // //   "Cast 2", 
// // // //   "Cast 3", 
// // // //   "Cast 4", 
// // // //   "Category"
// // // // ];

// // // // const staticOptions = {
// // // //   Genre: [
// // // //     "Action", "Horror", "Comedy", "Family Drama", "Romance", 
// // // //     "Thriller", "Sci-Fi", "Historical", "Musical", "Adventure"
// // // //   ],
// // // //   "Lead Singer": [
// // // //     "Diljit Dosanjh", "Arijit Singh", "Shreya Ghoshal", 
// // // //     "Rahat Fateh Ali Khan", "Sunidhi Chauhan", "Armaan Malik", 
// // // //     "Asees Kaur", "Shaan", "Various Artists", "Playback Singer"
// // // //   ],
// // // //   Category: [
// // // //     "None", "Religious/Political", "Political", 
// // // //     "Patriotic", "Social Issue", "Biographical"
// // // //   ],
// // // // };

// // // // // Popular options for quick selection
// // // // const popularOptions = {
// // // //   "Director": [
// // // //     "S.S. Rajamouli", "Christopher Nolan", "Karan Johar", "Rohit Shetty", 
// // // //     "Martin Scorsese", "Quentin Tarantino", "Steven Spielberg", "Anurag Kashyap"
// // // //   ],
// // // //   "Cast 1": [
// // // //     "Shah Rukh Khan", "Leonardo DiCaprio", "Salman Khan", "Prabhas", 
// // // //     "Tom Cruise", "Aamir Khan", "Robert Downey Jr.", "Hrithik Roshan"
// // // //   ],
// // // //   "Cast 2": [
// // // //     "Deepika Padukone", "Scarlett Johansson", "Alia Bhatt", "Emma Stone", 
// // // //     "Katrina Kaif", "Margot Robbie", "Priyanka Chopra", "Jennifer Lawrence"
// // // //   ],
// // // //   "Cast 3": [
// // // //     "Amitabh Bachchan", "Morgan Freeman", "Kamal Haasan", "Anthony Hopkins", 
// // // //     "Naseeruddin Shah", "Samuel L. Jackson", "R Madhavan", "Gary Oldman"
// // // //   ],
// // // //   "Cast 4": [
// // // //     "Kareena Kapoor", "Anne Hathaway", "Kiara Advani", "Amy Adams", 
// // // //     "Taapsee Pannu", "Emma Watson", "Kriti Sanon", "Zendaya"
// // // //   ],
// // // //   "Music Director": [
// // // //     "A.R. Rahman", "Hans Zimmer", "Santhosh Narayanan", "John Williams", 
// // // //     "Pritam", "Ludwig Göransson", "Amit Trivedi", "Trent Reznor"
// // // //   ]
// // // // };

// // // // // Enhanced Searchable Input Component
// // // // function EnhancedSearchableInput({ step, value, onChange, onSelect }) {
// // // //   const [searchQuery, setSearchQuery] = useState("");
// // // //   const [suggestions, setSuggestions] = useState([]);
// // // //   const [popularSuggestions, setPopularSuggestions] = useState([]);
// // // //   const [isLoading, setIsLoading] = useState(false);
// // // //   const [showDropdown, setShowDropdown] = useState(false);
// // // //   const [selectedIndex, setSelectedIndex] = useState(-1);

// // // //   const getSearchEndpoint = (step) => {
// // // //     if (step === "Director") return "/search/directors";
// // // //     if (step.includes("Cast")) return "/search/actors";
// // // //     if (step === "Music Director") return "/search/music-directors";
// // // //     return null;
// // // //   };

// // // //   // Load popular suggestions on mount
// // // //   useEffect(() => {
// // // //     if (popularOptions[step]) {
// // // //       setPopularSuggestions(
// // // //         popularOptions[step].map(name => ({
// // // //           name,
// // // //           popularity: 0,
// // // //           type: 'popular'
// // // //         }))
// // // //       );
// // // //     }
// // // //   }, [step]);

// // // //   const searchPeople = async (query) => {
// // // //     if (query.length < 2) {
// // // //       setSuggestions([]);
// // // //       return;
// // // //     }

// // // //     setIsLoading(true);
// // // //     const endpoint = getSearchEndpoint(step);
    
// // // //     try {
// // // //       const response = await fetch(`http://localhost:8000${endpoint}?q=${encodeURIComponent(query)}&limit=8`);
// // // //       if (response.ok) {
// // // //         const data = await response.json();
// // // //         setSuggestions(data.results?.map(person => ({...person, type: 'search'})) || []);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Search error:", error);
// // // //       setSuggestions([]);
// // // //     } finally {
// // // //       setIsLoading(false);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     const timeoutId = setTimeout(() => {
// // // //       if (searchQuery) {
// // // //         searchPeople(searchQuery);
// // // //       } else {
// // // //         setSuggestions([]);
// // // //       }
// // // //     }, 300);
// // // //     return () => clearTimeout(timeoutId);
// // // //   }, [searchQuery, step]);

// // // //   const handleInputChange = (e) => {
// // // //     const query = e.target.value;
// // // //     setSearchQuery(query);
// // // //     onChange(e);
// // // //     setShowDropdown(true);
// // // //     setSelectedIndex(-1);
// // // //   };

// // // //   const handleSelect = (person) => {
// // // //     onSelect(person.name);
// // // //     setSearchQuery(person.name);
// // // //     setShowDropdown(false);
// // // //     setSelectedIndex(-1);
// // // //   };

// // // //   const handleKeyDown = (e) => {
// // // //     const allSuggestions = searchQuery.length >= 2 ? suggestions : popularSuggestions;
    
// // // //     if (e.key === 'ArrowDown') {
// // // //       e.preventDefault();
// // // //       setSelectedIndex(prev => prev < allSuggestions.length - 1 ? prev + 1 : prev);
// // // //     } else if (e.key === 'ArrowUp') {
// // // //       e.preventDefault();
// // // //       setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
// // // //     } else if (e.key === 'Enter' && selectedIndex >= 0) {
// // // //       e.preventDefault();
// // // //       handleSelect(allSuggestions[selectedIndex]);
// // // //     } else if (e.key === 'Escape') {
// // // //       setShowDropdown(false);
// // // //       setSelectedIndex(-1);
// // // //     }
// // // //   };

// // // //   const displaySuggestions = searchQuery.length >= 2 ? suggestions : popularSuggestions;
// // // //   const hasContent = displaySuggestions.length > 0 || isLoading;

// // // //   return (
// // // //     <div className="search-container">
// // // //       <div className="input-wrapper">
// // // //         <input
// // // //           type="text"
// // // //           className="search-input"
// // // //           placeholder={searchQuery.length < 2 
// // // //             ? `Search or select popular ${step.toLowerCase()}...` 
// // // //             : `Searching for ${step.toLowerCase()}...`}
// // // //           value={searchQuery || value || ""}
// // // //           onChange={handleInputChange}
// // // //           onFocus={() => setShowDropdown(true)}
// // // //           onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
// // // //           onKeyDown={handleKeyDown}
// // // //         />
// // // //         <div className="search-icon">
// // // //           {isLoading ? (
// // // //             <div className="loading-spinner"></div>
// // // //           ) : (
// // // //             <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
// // // //             </svg>
// // // //           )}
// // // //         </div>
// // // //       </div>
      
// // // //       {showDropdown && hasContent && (
// // // //         <div className="dropdown">
// // // //           {searchQuery.length < 2 && popularSuggestions.length > 0 && (
// // // //             <div className="dropdown-header popular">
// // // //               <p>🌟 Popular {step}s</p>
// // // //             </div>
// // // //           )}
          
// // // //           {searchQuery.length >= 2 && suggestions.length > 0 && (
// // // //             <div className="dropdown-header search">
// // // //               <p>🔍 Search Results</p>
// // // //             </div>
// // // //           )}
          
// // // //           <div className="suggestions-list">
// // // //             {isLoading ? (
// // // //               <div className="loading-state">
// // // //                 <div className="loading-content">
// // // //                   <div className="loading-spinner"></div>
// // // //                   <span>Searching...</span>
// // // //                 </div>
// // // //               </div>
// // // //             ) : displaySuggestions.length > 0 ? (
// // // //               displaySuggestions.map((person, index) => (
// // // //                 <div
// // // //                   key={`${person.name}-${index}`}
// // // //                   className={`suggestion-item ${selectedIndex === index ? 'selected' : ''}`}
// // // //                   onClick={() => handleSelect(person)}
// // // //                 >
// // // //                   <div className="suggestion-content">
// // // //                     <div className="suggestion-main">
// // // //                       <div className="suggestion-name-line">
// // // //                         <p className="person-name">{person.name}</p>
// // // //                         {person.type === 'popular' && (
// // // //                           <span className="badge popular-badge">Popular</span>
// // // //                         )}
// // // //                         {person.type === 'search' && person.popularity > 10 && (
// // // //                           <span className="badge trending-badge">Trending</span>
// // // //                         )}
// // // //                       </div>
// // // //                       {person.known_for && person.known_for.length > 0 && (
// // // //                         <p className="known-for">
// // // //                           Known for: {person.known_for.slice(0, 2).join(", ")}
// // // //                           {person.known_for.length > 2 && "..."}
// // // //                         </p>
// // // //                       )}
// // // //                       {person.type === 'search' && (
// // // //                         <p className="popularity-score">
// // // //                           Popularity: {person.popularity?.toFixed(1)}
// // // //                         </p>
// // // //                       )}
// // // //                     </div>
// // // //                     <div className="arrow-icon">
// // // //                       <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
// // // //                       </svg>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //               ))
// // // //             ) : searchQuery.length >= 2 ? (
// // // //               <div className="no-results">
// // // //                 <div className="no-results-content">
// // // //                   <p>No results found for "{searchQuery}"</p>
// // // //                   <p className="no-results-hint">Try searching with a different name or spelling</p>
// // // //                 </div>
// // // //               </div>
// // // //             ) : null}
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // // // function App() {
// // // //   const [formData, setFormData] = useState({});
// // // //   const [currentStep, setCurrentStep] = useState(0);
// // // //   const [result, setResult] = useState(null);
// // // //   const [isLoading, setIsLoading] = useState(false);
// // // //   const [usePerformanceModel, setUsePerformanceModel] = useState(false);

// // // //   const handleChange = (e) => {
// // // //     setFormData({ ...formData, [steps[currentStep]]: e.target.value });
// // // //   };

// // // //   const handleSearchSelect = (value) => {
// // // //     setFormData({ ...formData, [steps[currentStep]]: value });
// // // //   };

// // // //   const handleNext = () => {
// // // //     if (currentStep < steps.length - 1) {
// // // //       setCurrentStep(currentStep + 1);
// // // //     } else {
// // // //       handlePredict();
// // // //     }
// // // //   };

// // // //   const handleBack = () => {
// // // //     if (currentStep > 0) {
// // // //       setCurrentStep(currentStep - 1);
// // // //     }
// // // //   };

// // // //   const handlePredict = async () => {
// // // //     setIsLoading(true);
    
// // // //     try {
// // // //       const requestData = {
// // // //         Director: formData.Director,
// // // //         Genre: formData.Genre,
// // // //         Music_Director: formData["Music Director"],
// // // //         Lead_Singer: formData["Lead Singer"],
// // // //         Cast_1: formData["Cast 1"],
// // // //         Cast_2: formData["Cast 2"],
// // // //         Cast_3: formData["Cast 3"],
// // // //         Cast_4: formData["Cast 4"],
// // // //         Category: formData.Category || "None"
// // // //       };

// // // //       console.log("Sending prediction request:", requestData);

// // // //       const response = await fetch('http://localhost:8000/predict-ml', {
// // // //         method: 'POST',
// // // //         headers: {
// // // //           'Content-Type': 'application/json',
// // // //         },
// // // //         body: JSON.stringify(requestData)
// // // //       });

// // // //       if (!response.ok) {
// // // //         const errorData = await response.json();
// // // //         throw new Error(`API Error: ${response.status} - ${errorData.detail || 'Unknown error'}`);
// // // //       }

// // // //       const prediction = await response.json();
// // // //       console.log("Prediction response:", prediction);
      
// // // //       setResult({
// // // //         weekend: prediction.weekend,
// // // //         total: prediction.total,
// // // //         confidence: prediction.confidence,
// // // //         breakdown: prediction.breakdown,
// // // //         dataSource: prediction.data_source
// // // //       });
// // // //     } catch (error) {
// // // //       console.error('Prediction failed:', error);
      
// // // //       alert(`Prediction failed: ${error.message}. Using offline prediction.`);
      
// // // //       const baseScore = Math.random() * 50 + 20;
// // // //       let multiplier = 1;
// // // //       if (formData.Director === "S.S. Rajamouli") multiplier += 0.3;
// // // //       if (formData.Genre === "Action") multiplier += 0.2;
// // // //       if (formData["Cast 1"] === "Shah Rukh Khan") multiplier += 0.4;
// // // //       if (formData.Category === "Patriotic") multiplier += 0.15;
      
// // // //       const weekend = (baseScore * multiplier).toFixed(1);
// // // //       const total = (weekend * 2.4).toFixed(1);
      
// // // //       setResult({ 
// // // //         weekend, 
// // // //         total, 
// // // //         confidence: 75,
// // // //         breakdown: { error: "Using offline prediction due to API error" },
// // // //         dataSource: "Offline Fallback"
// // // //       });
// // // //     }
    
// // // //     setIsLoading(false);
// // // //   };

// // // //   const resetForm = () => {
// // // //     setFormData({});
// // // //     setCurrentStep(0);
// // // //     setResult(null);
// // // //   };

// // // //   const progressPercentage = ((currentStep + 1) / steps.length) * 100;
// // // //   const currentStepName = steps[currentStep];
// // // //   const isSearchableField = ["Director", "Cast 1", "Cast 2", "Cast 3", "Cast 4", "Music Director"].includes(currentStepName);

// // // //   if (isLoading) {
// // // //     return (
// // // //       <div className="app-container">
// // // //         <div className="loading-container">
// // // //           <div className="loading-card">
// // // //             <div className="loading-animation">
// // // //               <div className="spinner-container">
// // // //                 <div className="loading-spinner large"></div>
// // // //                 <div className="loading-emoji">🎬</div>
// // // //               </div>
// // // //             </div>
// // // //             <h3 className="loading-title">Analyzing Your Movie</h3>
// // // //             <p className="loading-subtitle">Our AI is calculating box office predictions...</p>
// // // //             <div className="loading-progress">
// // // //               <div className="loading-progress-bar"></div>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (result) {
// // // //     return (
// // // //       <div className="app-container">
// // // //         <div className="result-container">
// // // //           <div className="result-card">
// // // //             <div className="result-header">
// // // //               <h3 className="result-title">🎯 Box Office Prediction</h3>
              
// // // //               <div className="prediction-grid">
// // // //                 <div className="prediction-card weekend">
// // // //                   <p className="prediction-label">Opening Weekend</p>
// // // //                   <p className="prediction-value">₹{result.weekend} Cr</p>
// // // //                 </div>
// // // //                 <div className="prediction-card total">
// // // //                   <p className="prediction-label">Lifetime Collection</p>
// // // //                   <p className="prediction-value">₹{result.total} Cr</p>
// // // //                 </div>
// // // //               </div>
              
// // // //               {result.confidence && (
// // // //                 <div className="confidence-card">
// // // //                   <p className="confidence-label">Confidence Level</p>
// // // //                   <div className="confidence-content">
// // // //                     <p className="confidence-value">{result.confidence}%</p>
// // // //                     <div className="confidence-bar-container">
// // // //                       <div className="confidence-bar">
// // // //                         <div 
// // // //                           className="confidence-fill"
// // // //                           style={{ width: `${result.confidence}%` }}
// // // //                         ></div>
// // // //                       </div>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //               )}
// // // //             </div>
            
// // // //             <div className="details-grid">
// // // //               <div className="details-card cast-crew">
// // // //                 <h4 className="details-title">🎭 Your Movie Cast & Crew</h4>
// // // //                 {Object.entries(formData).map(([key, value]) => (
// // // //                   <div key={key} className="detail-row">
// // // //                     <span className="detail-key">{key}:</span>
// // // //                     <span className="detail-value">{value}</span>
// // // //                   </div>
// // // //                 ))}
// // // //               </div>

// // // //               {result.breakdown && (
// // // //                 <div className="details-card analysis">
// // // //                   <h4 className="details-title">📊 Prediction Analysis</h4>
// // // //                   {Object.entries(result.breakdown).map(([key, value]) => (
// // // //                     <div key={key} className="detail-row">
// // // //                       <span className="detail-key">
// // // //                         {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:
// // // //                       </span>
// // // //                       <span className="detail-value">
// // // //                         {typeof value === 'object' ? JSON.stringify(value) : value}
// // // //                       </span>
// // // //                     </div>
// // // //                   ))}
// // // //                   {result.dataSource && (
// // // //                     <div className="data-source">
// // // //                       <span className="data-source-text">
// // // //                         📡 Data Source: {result.dataSource}
// // // //                       </span>
// // // //                     </div>
// // // //                   )}
// // // //                 </div>
// // // //               )}
// // // //             </div>
            
// // // //             <button
// // // //               className="reset-button"
// // // //               onClick={resetForm}
// // // //             >
// // // //               🎬 Predict Another Movie
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="app-container">
// // // //       <div className="form-container">
// // // //         <div className="form-card">
// // // //           <div className="form-header">
// // // //             <h2 className="app-title">🎬 Movie Box Office Predictor</h2>
// // // //             <p className="app-subtitle">Build your dream movie and get AI-powered predictions</p>
// // // //           </div>

// // // //           <div className="progress-section">
// // // //             <div className="progress-info">
// // // //               <span>Step {currentStep + 1} of {steps.length}</span>
// // // //               <span>{Math.round(progressPercentage)}% Complete</span>
// // // //             </div>
// // // //             <div className="progress-bar">
// // // //               <div 
// // // //                 className="progress-fill"
// // // //                 style={{ width: `${progressPercentage}%` }}
// // // //               ></div>
// // // //             </div>
// // // //           </div>

// // // //           <div className="form-step">
// // // //             <label className="step-label">
// // // //               {currentStepName === "Cast 1" ? "Lead Actor/Actress" :
// // // //                currentStepName === "Cast 2" ? "Supporting Actor/Actress" :
// // // //                currentStepName === "Cast 3" ? "Character Actor" :
// // // //                currentStepName === "Cast 4" ? "Additional Cast" :
// // // //                `Select ${currentStepName}`}
// // // //               {isSearchableField && (
// // // //                 <span className="step-hint">
// // // //                   Search for any {currentStepName.toLowerCase()} or pick from popular choices
// // // //                 </span>
// // // //               )}
// // // //             </label>
            
// // // //             {isSearchableField ? (
// // // //               <EnhancedSearchableInput
// // // //                 step={currentStepName}
// // // //                 value={formData[currentStepName]}
// // // //                 onChange={handleChange}
// // // //                 onSelect={handleSearchSelect}
// // // //               />
// // // //             ) : (
// // // //               <select
// // // //                 className="form-select"
// // // //                 value={formData[currentStepName] || ""}
// // // //                 onChange={handleChange}
// // // //               >
// // // //                 <option value="">-- Select {currentStepName} --</option>
// // // //                 {staticOptions[currentStepName].map((option) => (
// // // //                   <option key={option} value={option}>{option}</option>
// // // //                 ))}
// // // //               </select>
// // // //             )}
// // // //           </div>

// // // //           <div className="button-group">
// // // //             {currentStep > 0 && (
// // // //               <button
// // // //                 className="back-button"
// // // //                 onClick={handleBack}
// // // //               >
// // // //                 ← Back
// // // //               </button>
// // // //             )}
// // // //             <button
// // // //               className={`next-button ${!formData[currentStepName] ? 'disabled' : ''}`}
// // // //               onClick={handleNext}
// // // //               disabled={!formData[currentStepName]}
// // // //             >
// // // //               {currentStep === steps.length - 1 ? "🎯 Generate Prediction" : "Next →"}
// // // //             </button>
// // // //           </div>

// // // //           {Object.keys(formData).length > 0 && (
// // // //             <div className="selected-preview">
// // // //               <h4 className="preview-title">✨ Your Movie So Far</h4>
// // // //               <div className="preview-grid">
// // // //                 {Object.entries(formData).map(([key, value]) => (
// // // //                   <div key={key} className="preview-item">
// // // //                     <div className="preview-content">
// // // //                       <span className="preview-key">{key}:</span>
// // // //                       <span className="preview-value">{value}</span>
// // // //                     </div>
// // // //                   </div>
// // // //                 ))}
// // // //               </div>
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default App;

// // // import { useState, useEffect } from "react";
// // // import './App.css';

// // // const steps = [
// // //   "Director", 
// // //   "Genre", 
// // //   "Music Director", 
// // //   "Lead Singer",
// // //   "Cast 1", 
// // //   "Cast 2", 
// // //   "Cast 3", 
// // //   "Cast 4", 
// // //   "Category"
// // // ];

// // // const staticOptions = {
// // //   Genre: [
// // //     "Action", "Horror", "Comedy", "Family Drama", "Romance", 
// // //     "Thriller", "Sci-Fi", "Historical", "Musical", "Adventure"
// // //   ],
// // //   "Lead Singer": [
// // //     "Diljit Dosanjh", "Arijit Singh", "Shreya Ghoshal", 
// // //     "Rahat Fateh Ali Khan", "Sunidhi Chauhan", "Armaan Malik", 
// // //     "Asees Kaur", "Shaan", "Various Artists", "Playback Singer"
// // //   ],
// // //   Category: [
// // //     "None", "Religious/Political", "Political", 
// // //     "Patriotic", "Social Issue", "Biographical"
// // //   ],
// // // };

// // // // Popular options for quick selection
// // // const popularOptions = {
// // //   "Director": [
// // //     "S.S. Rajamouli", "Christopher Nolan", "Karan Johar", "Rohit Shetty", 
// // //     "Martin Scorsese", "Quentin Tarantino", "Steven Spielberg", "Anurag Kashyap"
// // //   ],
// // //   "Cast 1": [
// // //     "Shah Rukh Khan", "Leonardo DiCaprio", "Salman Khan", "Prabhas", 
// // //     "Tom Cruise", "Aamir Khan", "Robert Downey Jr.", "Hrithik Roshan"
// // //   ],
// // //   "Cast 2": [
// // //     "Deepika Padukone", "Scarlett Johansson", "Alia Bhatt", "Emma Stone", 
// // //     "Katrina Kaif", "Margot Robbie", "Priyanka Chopra", "Jennifer Lawrence"
// // //   ],
// // //   "Cast 3": [
// // //     "Amitabh Bachchan", "Morgan Freeman", "Kamal Haasan", "Anthony Hopkins", 
// // //     "Naseeruddin Shah", "Samuel L. Jackson", "R Madhavan", "Gary Oldman"
// // //   ],
// // //   "Cast 4": [
// // //     "Kareena Kapoor", "Anne Hathaway", "Kiara Advani", "Amy Adams", 
// // //     "Taapsee Pannu", "Emma Watson", "Kriti Sanon", "Zendaya"
// // //   ],
// // //   "Music Director": [
// // //     "A.R. Rahman", "Hans Zimmer", "Santhosh Narayanan", "John Williams", 
// // //     "Pritam", "Ludwig Göransson", "Amit Trivedi", "Trent Reznor"
// // //   ]
// // // };

// // // // Enhanced Searchable Input Component
// // // // function EnhancedSearchableInput({ step, value, onChange, onSelect }) {
// // // //   const [searchQuery, setSearchQuery] = useState("");
// // // //   const [suggestions, setSuggestions] = useState([]);
// // // //   const [popularSuggestions, setPopularSuggestions] = useState([]);
// // // //   const [isLoading, setIsLoading] = useState(false);
// // // //   const [showDropdown, setShowDropdown] = useState(false);
// // // //   const [selectedIndex, setSelectedIndex] = useState(-1);

// // // //   const getSearchEndpoint = (step) => {
// // // //     if (step === "Director") return "/search/directors";
// // // //     if (step.includes("Cast")) return "/search/actors";
// // // //     if (step === "Music Director") return "/search/music-directors";
// // // //     return null;
// // // //   };

// // // //   // Load popular suggestions on mount
// // // //   useEffect(() => {
// // // //     if (popularOptions[step]) {
// // // //       setPopularSuggestions(
// // // //         popularOptions[step].map(name => ({
// // // //           name,
// // // //           popularity: 0,
// // // //           type: 'popular'
// // // //         }))
// // // //       );
// // // //     }
// // // //   }, [step]);

// // // //   const searchPeople = async (query) => {
// // // //     if (query.length < 2) {
// // // //       setSuggestions([]);
// // // //       return;
// // // //     }

// // // //     setIsLoading(true);
// // // //     const endpoint = getSearchEndpoint(step);
    
// // // //     try {
// // // //       const response = await fetch(`http://localhost:8000${endpoint}?q=${encodeURIComponent(query)}&limit=8`);
// // // //       if (response.ok) {
// // // //         const data = await response.json();
// // // //         setSuggestions(data.results?.map(person => ({...person, type: 'search'})) || []);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Search error:", error);
// // // //       setSuggestions([]);
// // // //     } finally {
// // // //       setIsLoading(false);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     const timeoutId = setTimeout(() => {
// // // //       if (searchQuery) {
// // // //         searchPeople(searchQuery);
// // // //       } else {
// // // //         setSuggestions([]);
// // // //       }
// // // //     }, 300);
// // // //     return () => clearTimeout(timeoutId);
// // // //   }, [searchQuery, step]);

// // // //   const handleInputChange = (e) => {
// // // //     const query = e.target.value;
// // // //     setSearchQuery(query);
// // // //     onChange(e);
// // // //     setShowDropdown(true);
// // // //     setSelectedIndex(-1);
// // // //   };

// // // //   const handleSelect = (person) => {
// // // //     onSelect(person.name);
// // // //     setSearchQuery(person.name);
// // // //     setShowDropdown(false);
// // // //     setSelectedIndex(-1);
// // // //   };

// // // //   const handleKeyDown = (e) => {
// // // //     const allSuggestions = searchQuery.length >= 2 ? suggestions : popularSuggestions;
    
// // // //     if (e.key === 'ArrowDown') {
// // // //       e.preventDefault();
// // // //       setSelectedIndex(prev => prev < allSuggestions.length - 1 ? prev + 1 : prev);
// // // //     } else if (e.key === 'ArrowUp') {
// // // //       e.preventDefault();
// // // //       setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
// // // //     } else if (e.key === 'Enter' && selectedIndex >= 0) {
// // // //       e.preventDefault();
// // // //       handleSelect(allSuggestions[selectedIndex]);
// // // //     } else if (e.key === 'Escape') {
// // // //       setShowDropdown(false);
// // // //       setSelectedIndex(-1);
// // // //     }
// // // //   };

// // // //   const displaySuggestions = searchQuery.length >= 2 ? suggestions : popularSuggestions;
// // // //   const hasContent = displaySuggestions.length > 0 || isLoading;

// // // //   return (
// // // //     <div className="search-container">
// // // //       <div className="input-wrapper">
// // // //         <input
// // // //           type="text"
// // // //           className="search-input"
// // // //           placeholder={searchQuery.length < 2 
// // // //             ? `Search or select popular ${step.toLowerCase()}...` 
// // // //             : `Searching for ${step.toLowerCase()}...`}
// // // //           value={searchQuery || value || ""}
// // // //           onChange={handleInputChange}
// // // //           onFocus={() => setShowDropdown(true)}
// // // //           onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
// // // //           onKeyDown={handleKeyDown}
// // // //         />
// // // //         <div className="search-icon">
// // // //           {isLoading ? (
// // // //             <div className="loading-spinner"></div>
// // // //           ) : (
// // // //             <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
// // // //             </svg>
// // // //           )}
// // // //         </div>
// // // //       </div>
      
// // // //       {showDropdown && hasContent && (
// // // //         <div className="dropdown">
// // // //           {searchQuery.length < 2 && popularSuggestions.length > 0 && (
// // // //             <div className="dropdown-header popular">
// // // //               <p>🌟 Popular {step}s</p>
// // // //             </div>
// // // //           )}
          
// // // //           {searchQuery.length >= 2 && suggestions.length > 0 && (
// // // //             <div className="dropdown-header search">
// // // //               <p>🔍 Search Results</p>
// // // //             </div>
// // // //           )}
          
// // // //           <div className="suggestions-list">
// // // //             {isLoading ? (
// // // //               <div className="loading-state">
// // // //                 <div className="loading-content">
// // // //                   <div className="loading-spinner"></div>
// // // //                   <span>Searching...</span>
// // // //                 </div>
// // // //               </div>
// // // //             ) : displaySuggestions.length > 0 ? (
// // // //               displaySuggestions.map((person, index) => (
// // // //                 <div
// // // //                   key={`${person.name}-${index}`}
// // // //                   className={`suggestion-item ${selectedIndex === index ? 'selected' : ''}`}
// // // //                   onClick={() => handleSelect(person)}
// // // //                 >
// // // //                   <div className="suggestion-content">
// // // //                     <div className="suggestion-main">
// // // //                       <div className="suggestion-name-line">
// // // //                         <p className="person-name">{person.name}</p>
// // // //                         {person.type === 'popular' && (
// // // //                           <span className="badge popular-badge">Popular</span>
// // // //                         )}
// // // //                         {person.type === 'search' && person.popularity > 10 && (
// // // //                           <span className="badge trending-badge">Trending</span>
// // // //                         )}
// // // //                       </div>
// // // //                       {person.known_for && person.known_for.length > 0 && (
// // // //                         <p className="known-for">
// // // //                           Known for: {person.known_for.slice(0, 2).join(", ")}
// // // //                           {person.known_for.length > 2 && "..."}
// // // //                         </p>
// // // //                       )}
// // // //                       {person.type === 'search' && (
// // // //                         <p className="popularity-score">
// // // //                           Popularity: {person.popularity?.toFixed(1)}
// // // //                         </p>
// // // //                       )}
// // // //                     </div>
// // // //                     <div className="arrow-icon">
// // // //                       <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
// // // //                       </svg>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //               ))
// // // //             ) : searchQuery.length >= 2 ? (
// // // //               <div className="no-results">
// // // //                 <div className="no-results-content">
// // // //                   <p>No results found for "{searchQuery}"</p>
// // // //                   <p className="no-results-hint">Try searching with a different name or spelling</p>
// // // //                 </div>
// // // //               </div>
// // // //             ) : null}
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }
// // // // Enhanced Searchable Input Component - Updated for Lead Singer API search
// // // function EnhancedSearchableInput({ step, value, onChange, onSelect }) {
// // //   const [searchQuery, setSearchQuery] = useState("");
// // //   const [suggestions, setSuggestions] = useState([]);
// // //   const [popularSuggestions, setPopularSuggestions] = useState([]);
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [showDropdown, setShowDropdown] = useState(false);
// // //   const [selectedIndex, setSelectedIndex] = useState(-1);

// // //   const getSearchEndpoint = (step) => {
// // //     if (step === "Director") return "/search/directors";
// // //     if (step.includes("Cast")) return "/search/actors";
// // //     if (step === "Music Director") return "/search/music-directors";
// // //     if (step === "Lead Singer") return "/search/singers";  // New endpoint for singers
// // //     return null;
// // //   };

// // //   // Updated to check if field supports API search
// // //   const supportsApiSearch = (step) => {
// // //     return ["Director", "Music Director", "Lead Singer"].includes(step) || step.includes("Cast");
// // //   };

// // //   // Load popular suggestions on mount
// // //   useEffect(() => {
// // //     if (popularOptions[step]) {
// // //       setPopularSuggestions(
// // //         popularOptions[step].map(name => ({
// // //           name,
// // //           popularity: 0,
// // //           type: 'popular'
// // //         }))
// // //       );
// // //     }
// // //   }, [step]);

// // //   const searchPeople = async (query) => {
// // //     if (query.length < 2) {
// // //       setSuggestions([]);
// // //       return;
// // //     }

// // //     setIsLoading(true);
// // //     const endpoint = getSearchEndpoint(step);
    
// // //     if (!endpoint) {
// // //       // For fields without API search, filter static options
// // //       const filtered = popularSuggestions.filter(item => 
// // //         item.name.toLowerCase().includes(query.toLowerCase())
// // //       );
// // //       setSuggestions(filtered);
// // //       setIsLoading(false);
// // //       return;
// // //     }
    
// // //     try {
// // //       const response = await fetch(`http://localhost:8000${endpoint}?q=${encodeURIComponent(query)}&limit=8`);
// // //       if (response.ok) {
// // //         const data = await response.json();
// // //         setSuggestions(data.results?.map(person => ({...person, type: 'search'})) || []);
// // //       }
// // //     } catch (error) {
// // //       console.error("Search error:", error);
// // //       setSuggestions([]);
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     const timeoutId = setTimeout(() => {
// // //       if (searchQuery) {
// // //         searchPeople(searchQuery);
// // //       } else {
// // //         setSuggestions([]);
// // //       }
// // //     }, 300);
// // //     return () => clearTimeout(timeoutId);
// // //   }, [searchQuery, step]);

// // //   const handleInputChange = (e) => {
// // //     const query = e.target.value;
// // //     setSearchQuery(query);
// // //     onChange(e);
// // //     setShowDropdown(true);
// // //     setSelectedIndex(-1);
// // //   };

// // //   const handleSelect = (person) => {
// // //     onSelect(person.name);
// // //     setSearchQuery(person.name);
// // //     setShowDropdown(false);
// // //     setSelectedIndex(-1);
// // //   };

// // //   const handleKeyDown = (e) => {
// // //     const allSuggestions = searchQuery.length >= 2 ? suggestions : popularSuggestions;
    
// // //     if (e.key === 'ArrowDown') {
// // //       e.preventDefault();
// // //       setSelectedIndex(prev => prev < allSuggestions.length - 1 ? prev + 1 : prev);
// // //     } else if (e.key === 'ArrowUp') {
// // //       e.preventDefault();
// // //       setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
// // //     } else if (e.key === 'Enter' && selectedIndex >= 0) {
// // //       e.preventDefault();
// // //       handleSelect(allSuggestions[selectedIndex]);
// // //     } else if (e.key === 'Escape') {
// // //       setShowDropdown(false);
// // //       setSelectedIndex(-1);
// // //     }
// // //   };

// // //   const displaySuggestions = searchQuery.length >= 2 ? suggestions : popularSuggestions;
// // //   const hasContent = displaySuggestions.length > 0 || isLoading;

// // //   return (
// // //     <div className="search-container">
// // //       <div className="input-wrapper">
// // //         <input
// // //           type="text"
// // //           className="search-input"
// // //           placeholder={
// // //             supportsApiSearch(step)
// // //               ? (searchQuery.length < 2 
// // //                   ? `Search or select popular ${step.toLowerCase()}...` 
// // //                   : `Searching for ${step.toLowerCase()}...`)
// // //               : `Select ${step.toLowerCase()}...`
// // //           }
// // //           value={searchQuery || value || ""}
// // //           onChange={handleInputChange}
// // //           onFocus={() => setShowDropdown(true)}
// // //           onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
// // //           onKeyDown={handleKeyDown}
// // //         />
// // //         <div className="search-icon">
// // //           {isLoading ? (
// // //             <div className="loading-spinner"></div>
// // //           ) : supportsApiSearch(step) ? (
// // //             <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
// // //             </svg>
// // //           ) : (
// // //             <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
// // //             </svg>
// // //           )}
// // //         </div>
// // //       </div>
      
// // //       {showDropdown && hasContent && (
// // //         <div className="dropdown">
// // //           {searchQuery.length < 2 && popularSuggestions.length > 0 && (
// // //             <div className="dropdown-header popular">
// // //               <p>🌟 Popular {step}s</p>
// // //             </div>
// // //           )}
          
// // //           {searchQuery.length >= 2 && suggestions.length > 0 && supportsApiSearch(step) && (
// // //             <div className="dropdown-header search">
// // //               <p>🔍 Search Results</p>
// // //             </div>
// // //           )}
          
// // //           <div className="suggestions-list">
// // //             {isLoading ? (
// // //               <div className="loading-state">
// // //                 <div className="loading-content">
// // //                   <div className="loading-spinner"></div>
// // //                   <span>Searching...</span>
// // //                 </div>
// // //               </div>
// // //             ) : displaySuggestions.length > 0 ? (
// // //               displaySuggestions.map((person, index) => (
// // //                 <div
// // //                   key={`${person.name}-${index}`}
// // //                   className={`suggestion-item ${selectedIndex === index ? 'selected' : ''}`}
// // //                   onClick={() => handleSelect(person)}
// // //                 >
// // //                   <div className="suggestion-content">
// // //                     <div className="suggestion-main">
// // //                       <div className="suggestion-name-line">
// // //                         <p className="person-name">{person.name}</p>
// // //                         {person.type === 'popular' && (
// // //                           <span className="badge popular-badge">Popular</span>
// // //                         )}
// // //                         {person.type === 'search' && person.popularity > 10 && (
// // //                           <span className="badge trending-badge">Trending</span>
// // //                         )}
// // //                       </div>
// // //                       {person.known_for && person.known_for.length > 0 && (
// // //                         <p className="known-for">
// // //                           Known for: {person.known_for.slice(0, 2).join(", ")}
// // //                           {person.known_for.length > 2 && "..."}
// // //                         </p>
// // //                       )}
// // //                       {person.type === 'search' && (
// // //                         <p className="popularity-score">
// // //                           Popularity: {person.popularity?.toFixed(1)}
// // //                         </p>
// // //                       )}
// // //                     </div>
// // //                     <div className="arrow-icon">
// // //                       <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
// // //                       </svg>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               ))
// // //             ) : searchQuery.length >= 2 ? (
// // //               <div className="no-results">
// // //                 <div className="no-results-content">
// // //                   <p>No results found for "{searchQuery}"</p>
// // //                   <p className="no-results-hint">Try searching with a different name or spelling</p>
// // //                 </div>
// // //               </div>
// // //             ) : null}
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // // What-If Analysis Component
// // // function WhatIfAnalysis({ baseMovie, onBack }) {
// // //   const [scenarios, setScenarios] = useState([
// // //     { Director: "S.S. Rajamouli", Genre: "Action" },
// // //     { Cast_1: "Shah Rukh Khan", Cast_2: "Deepika Padukone" },
// // //     { Genre: "Sci-Fi", Music_Director: "A.R. Rahman" }
// // //   ]);
// // //   const [analysisResults, setAnalysisResults] = useState(null);
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [modelStatus, setModelStatus] = useState(null);

// // //   // Check model status on component mount
// // //   useEffect(() => {
// // //     checkModelStatus();
// // //   }, []);

// // //   const checkModelStatus = async () => {
// // //     try {
// // //       const response = await fetch('http://localhost:8000/model-status');
// // //       if (response.ok) {
// // //         const data = await response.json();
// // //         setModelStatus(data);
// // //       }
// // //     } catch (error) {
// // //       console.error('Error checking model status:', error);
// // //     }
// // //   };

// // //   const enhanceModel = async () => {
// // //     setIsLoading(true);
// // //     try {
// // //       const response = await fetch('http://localhost:8000/enhance-trained-model', {
// // //         method: 'POST'
// // //       });
      
// // //       if (response.ok) {
// // //         const data = await response.json();
// // //         alert('Model enhanced successfully with local data!');
// // //         checkModelStatus(); // Refresh status
// // //       } else {
// // //         alert('Failed to enhance model');
// // //       }
// // //     } catch (error) {
// // //       console.error('Error enhancing model:', error);
// // //       alert('Error enhancing model');
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   const runWhatIfAnalysis = async () => {
// // //     setIsLoading(true);
// // //     try {
// // //       const response = await fetch('http://localhost:8000/producer/what-if-analysis', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //         body: JSON.stringify({
// // //           base_movie: baseMovie,
// // //           scenarios: scenarios
// // //         })
// // //       });

// // //       if (response.ok) {
// // //         const data = await response.json();
// // //         setAnalysisResults(data);
// // //       } else {
// // //         const errorData = await response.json();
// // //         alert(`Analysis failed: ${errorData.detail}`);
// // //       }
// // //     } catch (error) {
// // //       console.error('What-if analysis failed:', error);
// // //       alert('Failed to run what-if analysis');
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   const updateScenario = (index, field, value) => {
// // //     const newScenarios = [...scenarios];
// // //     newScenarios[index] = {
// // //       ...newScenarios[index],
// // //       [field]: value
// // //     };
// // //     setScenarios(newScenarios);
// // //   };

// // //   const addScenario = () => {
// // //     setScenarios([...scenarios, {}]);
// // //   };

// // //   const removeScenario = (index) => {
// // //     const newScenarios = scenarios.filter((_, i) => i !== index);
// // //     setScenarios(newScenarios);
// // //   };

// // //   return (
// // //     <div className="what-if-container">
// // //       <div className="what-if-header">
// // //         <button className="back-button" onClick={onBack}>
// // //           ← Back to Movie Builder
// // //         </button>
// // //         <h2 className="what-if-title">🔬 Producer's What-If Analysis</h2>
// // //         <p className="what-if-subtitle">
// // //           Analyze different casting and creative combinations to maximize box office potential
// // //         </p>
// // //       </div>

// // //       {/* Model Status */}
// // //       {modelStatus && (
// // //         <div className="model-status-card">
// // //           <h3>🤖 Model Status</h3>
// // //           <div className="model-grid">
// // //             {Object.entries(modelStatus.models).map(([modelName, info]) => (
// // //               <div key={modelName} className={`model-item ${info.status === 'Trained & Ready' ? 'ready' : 'not-ready'}`}>
// // //                 <h4>{modelName.replace('_', ' ').toUpperCase()}</h4>
// // //                 <p className="model-accuracy">Accuracy: {info.accuracy}</p>
// // //                 <p className="model-speed">Speed: {info.speed}</p>
// // //                 <span className={`status-badge ${info.status === 'Trained & Ready' ? 'ready' : 'not-ready'}`}>
// // //                   {info.status}
// // //                 </span>
// // //               </div>
// // //             ))}
// // //           </div>
// // //           {modelStatus.models.ml_ensemble?.status !== 'Trained & Ready' && (
// // //             <button 
// // //               className="enhance-model-button"
// // //               onClick={enhanceModel}
// // //               disabled={isLoading}
// // //             >
// // //               {isLoading ? "Enhancing..." : "🚀 Enhance Model with Local Data"}
// // //             </button>
// // //           )}
// // //         </div>
// // //       )}

// // //       {/* Base Movie */}
// // //       <div className="base-movie-card">
// // //         <h3>🎬 Base Movie</h3>
// // //         <div className="base-movie-details">
// // //           {Object.entries(baseMovie).map(([key, value]) => (
// // //             <div key={key} className="base-movie-item">
// // //               <span className="base-movie-key">{key}:</span>
// // //               <span className="base-movie-value">{value}</span>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       </div>

// // //       {/* Scenarios */}
// // //       <div className="scenarios-section">
// // //         <div className="scenarios-header">
// // //           <h3>🎯 What-If Scenarios</h3>
// // //           <button className="add-scenario-button" onClick={addScenario}>
// // //             + Add Scenario
// // //           </button>
// // //         </div>
        
// // //         <div className="scenarios-grid">
// // //           {scenarios.map((scenario, index) => (
// // //             <div key={index} className="scenario-card">
// // //               <div className="scenario-header">
// // //                 <h4>Scenario {index + 1}</h4>
// // //                 {scenarios.length > 1 && (
// // //                   <button 
// // //                     className="remove-scenario-button"
// // //                     onClick={() => removeScenario(index)}
// // //                   >
// // //                     ×
// // //                   </button>
// // //                 )}
// // //               </div>
              
// // //               <div className="scenario-fields">
// // //                 {["Director", "Genre", "Music_Director", "Cast_1", "Cast_2"].map(field => (
// // //                   <div key={field} className="scenario-field">
// // //                     <label>{field.replace('_', ' ')}:</label>
// // //                     {field === "Genre" ? (
// // //                       <select
// // //                         value={scenario[field] || ""}
// // //                         onChange={(e) => updateScenario(index, field, e.target.value)}
// // //                       >
// // //                         <option value="">-- Keep Original --</option>
// // //                         {staticOptions.Genre.map(genre => (
// // //                           <option key={genre} value={genre}>{genre}</option>
// // //                         ))}
// // //                       </select>
// // //                     ) : (
// // //                       <input
// // //                         type="text"
// // //                         value={scenario[field] || ""}
// // //                         onChange={(e) => updateScenario(index, field, e.target.value)}
// // //                         placeholder={`Change ${field.replace('_', ' ')}`}
// // //                       />
// // //                     )}
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       </div>

// // //       {/* Analysis Button */}
// // //       <div className="analysis-button-section">
// // //         <button
// // //           className="run-analysis-button"
// // //           onClick={runWhatIfAnalysis}
// // //           disabled={isLoading}
// // //         >
// // //           {isLoading ? (
// // //             <span>
// // //               <div className="loading-spinner"></div>
// // //               Running Analysis...
// // //             </span>
// // //           ) : (
// // //             "🚀 Run What-If Analysis"
// // //           )}
// // //         </button>
// // //       </div>

// // //       {/* Results */}
// // //       {analysisResults && (
// // //         <div className="analysis-results">
// // //           <h3>📊 Analysis Results</h3>
// // //           <div className="results-grid">
// // //             {analysisResults.analysis_results.map((result, index) => (
// // //               <div 
// // //                 key={index} 
// // //                 className={`result-card ${
// // //                   index === 0 ? 'base-result' : 
// // //                   result.vs_base?.is_better ? 'better-result' : 'worse-result'
// // //                 }`}
// // //               >
// // //                 <div className="result-header">
// // //                   <h4>{result.scenario}</h4>
// // //                   {index > 0 && result.vs_base && (
// // //                     <span className={`change-indicator ${result.vs_base.is_better ? 'positive' : 'negative'}`}>
// // //                       {result.vs_base.is_better ? '↗' : '↘'} {result.vs_base.change_percentage.toFixed(1)}%
// // //                     </span>
// // //                   )}
// // //                 </div>
                
// // //                 <div className="result-prediction">
// // //                   <div className="prediction-item">
// // //                     <span className="prediction-label">Weekend:</span>
// // //                     <span className="prediction-value">₹{result.prediction.weekend} Cr</span>
// // //                   </div>
// // //                   <div className="prediction-item">
// // //                     <span className="prediction-label">Lifetime:</span>
// // //                     <span className="prediction-value">₹{result.prediction.total} Cr</span>
// // //                   </div>
// // //                   <div className="prediction-item">
// // //                     <span className="prediction-label">Confidence:</span>
// // //                     <span className="prediction-value">{result.prediction.confidence}%</span>
// // //                   </div>
// // //                 </div>

// // //                 {index > 0 && result.changes && Object.keys(result.changes).length > 0 && (
// // //                   <div className="result-changes">
// // //                     <h5>Changes Made:</h5>
// // //                     {Object.entries(result.changes).map(([key, value]) => (
// // //                       <div key={key} className="change-item">
// // //                         <span className="change-key">{key.replace('_', ' ')}:</span>
// // //                         <span className="change-value">{value}</span>
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 )}

// // //                 {index > 0 && result.vs_base && (
// // //                   <div className="vs-base">
// // //                     <span className="vs-base-label">vs Base:</span>
// // //                     <span className={`vs-base-value ${result.vs_base.is_better ? 'positive' : 'negative'}`}>
// // //                       {result.vs_base.is_better ? '+' : ''}{result.vs_base.change_crores} Cr
// // //                     </span>
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // function App() {
// // //   const [formData, setFormData] = useState({});
// // //   const [currentStep, setCurrentStep] = useState(0);
// // //   const [result, setResult] = useState(null);
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [showWhatIf, setShowWhatIf] = useState(false);

// // //   const handleChange = (e) => {
// // //     setFormData({ ...formData, [steps[currentStep]]: e.target.value });
// // //   };

// // //   const handleSearchSelect = (value) => {
// // //     setFormData({ ...formData, [steps[currentStep]]: value });
// // //   };

// // //   const handleNext = () => {
// // //     if (currentStep < steps.length - 1) {
// // //       setCurrentStep(currentStep + 1);
// // //     } else {
// // //       handlePredict();
// // //     }
// // //   };

// // //   const handleBack = () => {
// // //     if (currentStep > 0) {
// // //       setCurrentStep(currentStep - 1);
// // //     }
// // //   };

// // //   const handlePredict = async () => {
// // //     setIsLoading(true);
    
// // //     try {
// // //       const requestData = {
// // //         Director: formData.Director,
// // //         Genre: formData.Genre,
// // //         Music_Director: formData["Music Director"],
// // //         Lead_Singer: formData["Lead Singer"],
// // //         Cast_1: formData["Cast 1"],
// // //         Cast_2: formData["Cast 2"],
// // //         Cast_3: formData["Cast 3"],
// // //         Cast_4: formData["Cast 4"],
// // //         Category: formData.Category || "None"
// // //       };

// // //       console.log("Sending prediction request:", requestData);

// // //       const response = await fetch('http://localhost:8000/predict-performance', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //         body: JSON.stringify(requestData)
// // //       });

// // //       if (!response.ok) {
// // //         const errorData = await response.json();
// // //         throw new Error(`API Error: ${response.status} - ${errorData.detail || 'Unknown error'}`);
// // //       }

// // //       const prediction = await response.json();
// // //       console.log("Prediction response:", prediction);
      
// // //       setResult({
// // //         weekend: prediction.weekend,
// // //         total: prediction.total,
// // //         confidence: prediction.confidence,
// // //         breakdown: prediction.breakdown,
// // //         dataSource: prediction.data_source
// // //       });
// // //     } catch (error) {
// // //       console.error('Prediction failed:', error);
      
// // //       alert(`Prediction failed: ${error.message}. Using offline prediction.`);
      
// // //       const baseScore = Math.random() * 50 + 20;
// // //       let multiplier = 1;
// // //       if (formData.Director === "S.S. Rajamouli") multiplier += 0.3;
// // //       if (formData.Genre === "Action") multiplier += 0.2;
// // //       if (formData["Cast 1"] === "Shah Rukh Khan") multiplier += 0.4;
// // //       if (formData.Category === "Patriotic") multiplier += 0.15;
      
// // //       const weekend = (baseScore * multiplier).toFixed(1);
// // //       const total = (weekend * 2.4).toFixed(1);
      
// // //       setResult({ 
// // //         weekend, 
// // //         total, 
// // //         confidence: 75,
// // //         breakdown: { error: "Using offline prediction due to API error" },
// // //         dataSource: "Offline Fallback"
// // //       });
// // //     }
    
// // //     setIsLoading(false);
// // //   };

// // //   const resetForm = () => {
// // //     setFormData({});
// // //     setCurrentStep(0);
// // //     setResult(null);
// // //     setShowWhatIf(false);
// // //   };

// // //   const handleWhatIfAnalysis = () => {
// // //     if (Object.keys(formData).length < steps.length) {
// // //       alert("Please complete the movie setup first before running What-If analysis");
// // //       return;
// // //     }
    
// // //     // Convert formData to the format expected by the API
// // //     const baseMovie = {
// // //       Director: formData.Director,
// // //       Genre: formData.Genre,
// // //       Music_Director: formData["Music Director"],
// // //       Lead_Singer: formData["Lead Singer"],
// // //       Cast_1: formData["Cast 1"],
// // //       Cast_2: formData["Cast 2"],
// // //       Cast_3: formData["Cast 3"],
// // //       Cast_4: formData["Cast 4"],
// // //       Category: formData.Category || "None"
// // //     };
    
// // //     setShowWhatIf(true);
// // //   };

// // //   const progressPercentage = ((currentStep + 1) / steps.length) * 100;
// // //   const currentStepName = steps[currentStep];
// // //   const isSearchableField = ["Director", "Cast 1", "Cast 2", "Cast 3", "Cast 4", "Music Director"].includes(currentStepName);

// // //   // Show What-If Analysis
// // //   if (showWhatIf) {
// // //     const baseMovie = {
// // //       Director: formData.Director,
// // //       Genre: formData.Genre,
// // //       Music_Director: formData["Music Director"],
// // //       Lead_Singer: formData["Lead Singer"],
// // //       Cast_1: formData["Cast 1"],
// // //       Cast_2: formData["Cast 2"],
// // //       Cast_3: formData["Cast 3"],
// // //       Cast_4: formData["Cast 4"],
// // //       Category: formData.Category || "None"
// // //     };
    
// // //     return (
// // //       <WhatIfAnalysis 
// // //         baseMovie={baseMovie} 
// // //         onBack={() => setShowWhatIf(false)} 
// // //       />
// // //     );
// // //   }

// // //   if (isLoading) {
// // //     return (
// // //       <div className="app-container">
// // //         <div className="loading-container">
// // //           <div className="loading-card">
// // //             <div className="loading-animation">
// // //               <div className="spinner-container">
// // //                 <div className="loading-spinner large"></div>
// // //                 <div className="loading-emoji">🎬</div>
// // //               </div>
// // //             </div>
// // //             <h3 className="loading-title">Analyzing Your Movie</h3>
// // //             <p className="loading-subtitle">Our AI is calculating box office predictions...</p>
// // //             <div className="loading-progress">
// // //               <div className="loading-progress-bar"></div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (result) {
// // //     return (
// // //       <div className="app-container">
// // //         <div className="result-container">
// // //           <div className="result-card">
// // //             <div className="result-header">
// // //               <h3 className="result-title">🎯 Box Office Prediction</h3>
              
// // //               <div className="prediction-grid">
// // //                 <div className="prediction-card weekend">
// // //                   <p className="prediction-label">Opening Weekend</p>
// // //                   <p className="prediction-value">₹{result.weekend} Cr</p>
// // //                 </div>
// // //                 <div className="prediction-card total">
// // //                   <p className="prediction-label">Lifetime Collection</p>
// // //                   <p className="prediction-value">₹{result.total} Cr</p>
// // //                 </div>
// // //               </div>
              
// // //               {result.confidence && (
// // //                 <div className="confidence-card">
// // //                   <p className="confidence-label">Confidence Level</p>
// // //                   <div className="confidence-content">
// // //                     <p className="confidence-value">{result.confidence}%</p>
// // //                     <div className="confidence-bar-container">
// // //                       <div className="confidence-bar">
// // //                         <div 
// // //                           className="confidence-fill"
// // //                           style={{ width: `${result.confidence}%` }}
// // //                         ></div>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               )}
// // //             </div>
            
// // //             <div className="details-grid">
// // //               <div className="details-card cast-crew">
// // //                 <h4 className="details-title">🎭 Your Movie Cast & Crew</h4>
// // //                 {Object.entries(formData).map(([key, value]) => (
// // //                   <div key={key} className="detail-row">
// // //                     <span className="detail-key">{key}:</span>
// // //                     <span className="detail-value">{value}</span>
// // //                   </div>
// // //                 ))}
// // //               </div>

// // //               {result.breakdown && (
// // //                 <div className="details-card analysis">
// // //                   <h4 className="details-title">📊 Prediction Analysis</h4>
// // //                   {Object.entries(result.breakdown).map(([key, value]) => (
// // //                     <div key={key} className="detail-row">
// // //                       <span className="detail-key">
// // //                         {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:
// // //                       </span>
// // //                       <span className="detail-value">
// // //                         {typeof value === 'object' ? JSON.stringify(value) : value}
// // //                       </span>
// // //                     </div>
// // //                   ))}
// // //                   {result.dataSource && (
// // //                     <div className="data-source">
// // //                       <span className="data-source-text">
// // //                         📡 Data Source: {result.dataSource}
// // //                       </span>
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               )}
// // //             </div>
            
// // //             <div className="button-group">
// // //               <button
// // //                 className="what-if-button"
// // //                 onClick={handleWhatIfAnalysis}
// // //               >
// // //                 🔬 Run What-If Analysis
// // //               </button>
// // //               <button
// // //                 className="reset-button"
// // //                 onClick={resetForm}
// // //               >
// // //                 🎬 Predict Another Movie
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="app-container">
// // //       <div className="form-container">
// // //         <div className="form-card">
// // //           <div className="form-header">
// // //             <h2 className="app-title">🎬 Movie Box Office Predictor</h2>
// // //             <p className="app-subtitle">Build your dream movie and get AI-powered predictions</p>
// // //           </div>

// // //           <div className="progress-section">
// // //             <div className="progress-info">
// // //               <span>Step {currentStep + 1} of {steps.length}</span>
// // //               <span>{Math.round(progressPercentage)}% Complete</span>
// // //             </div>
// // //             <div className="progress-bar">
// // //               <div 
// // //                 className="progress-fill"
// // //                 style={{ width: `${progressPercentage}%` }}
// // //               ></div>
// // //             </div>
// // //           </div>

// // //           <div className="form-step">
// // //             <label className="step-label">
// // //               {currentStepName === "Cast 1" ? "Lead Actor/Actress" :
// // //                currentStepName === "Cast 2" ? "Supporting Actor/Actress" :
// // //                currentStepName === "Cast 3" ? "Character Actor" :
// // //                currentStepName === "Cast 4" ? "Additional Cast" :
// // //                `Select ${currentStepName}`}
// // //               {isSearchableField && (
// // //                 <span className="step-hint">
// // //                   Search for any {currentStepName.toLowerCase()} or pick from popular choices
// // //                 </span>
// // //               )}
// // //             </label>
            
// // //             {isSearchableField ? (
// // //               <EnhancedSearchableInput
// // //                 step={currentStepName}
// // //                 value={formData[currentStepName]}
// // //                 onChange={handleChange}
// // //                 onSelect={handleSearchSelect}
// // //               />
// // //             ) : (
// // //               <select
// // //                 className="form-select"
// // //                 value={formData[currentStepName] || ""}
// // //                 onChange={handleChange}
// // //               >
// // //                 <option value="">-- Select {currentStepName} --</option>
// // //                 {staticOptions[currentStepName].map((option) => (
// // //                   <option key={option} value={option}>{option}</option>
// // //                 ))}
// // //               </select>
// // //             )}
// // //           </div>

// // //           <div className="button-group">
// // //             {currentStep > 0 && (
// // //               <button
// // //                 className="back-button"
// // //                 onClick={handleBack}
// // //               >
// // //                 ← Back
// // //               </button>
// // //             )}
// // //             <button
// // //               className={`next-button ${!formData[currentStepName] ? 'disabled' : ''}`}
// // //               onClick={handleNext}
// // //               disabled={!formData[currentStepName]}
// // //             >
// // //               {currentStep === steps.length - 1 ? "🎯 Generate Prediction" : "Next →"}
// // //             </button>
// // //           </div>

// // //           {/* Add What-If Analysis button when form is complete */}
// // //           {Object.keys(formData).length === steps.length && (
// // //             <div className="producer-tools-section">
// // //               <button
// // //                 className="producer-tools-button"
// // //                 onClick={handleWhatIfAnalysis}
// // //               >
// // //                 🔬 Producer's What-If Analysis
// // //               </button>
// // //               <p className="producer-tools-hint">
// // //                 Compare different casting and creative decisions to maximize revenue
// // //               </p>
// // //             </div>
// // //           )}

// // //           {Object.keys(formData).length > 0 && (
// // //             <div className="selected-preview">
// // //               <h4 className="preview-title">✨ Your Movie So Far</h4>
// // //               <div className="preview-grid">
// // //                 {Object.entries(formData).map(([key, value]) => (
// // //                   <div key={key} className="preview-item">
// // //                     <div className="preview-content">
// // //                       <span className="preview-key">{key}:</span>
// // //                       <span className="preview-value">{value}</span>
// // //                     </div>
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default App;

// // import { useState, useEffect } from "react";
// // import './App.css';

// // const steps = [
// //   "Director", 
// //   "Genre", 
// //   "Music Director", 
// //   "Lead Singer",
// //   "Cast 1", 
// //   "Cast 2", 
// //   "Cast 3", 
// //   "Cast 4", 
// //   "Category"
// // ];

// // const staticOptions = {
// //   Genre: [
// //     "Action", "Horror", "Comedy", "Family Drama", "Romance", 
// //     "Thriller", "Sci-Fi", "Historical", "Musical", "Adventure"
// //   ],
// //   "Lead Singer": [
// //     "Diljit Dosanjh", "Arijit Singh", "Shreya Ghoshal", 
// //     "Rahat Fateh Ali Khan", "Sunidhi Chauhan", "Armaan Malik", 
// //     "Asees Kaur", "Shaan", "Various Artists", "Playback Singer"
// //   ],
// //   Category: [
// //     "None", "Religious/Political", "Political", 
// //     "Patriotic", "Social Issue", "Biographical"
// //   ],
// // };

// // // Popular options for quick selection
// // const popularOptions = {
// //   "Director": [
// //     "S.S. Rajamouli", "Christopher Nolan", "Karan Johar", "Rohit Shetty", 
// //     "Martin Scorsese", "Quentin Tarantino", "Steven Spielberg", "Anurag Kashyap"
// //   ],
// //   "Cast 1": [
// //     "Shah Rukh Khan", "Leonardo DiCaprio", "Salman Khan", "Prabhas", 
// //     "Tom Cruise", "Aamir Khan", "Robert Downey Jr.", "Hrithik Roshan"
// //   ],
// //   "Cast 2": [
// //     "Deepika Padukone", "Scarlett Johansson", "Alia Bhatt", "Emma Stone", 
// //     "Katrina Kaif", "Margot Robbie", "Priyanka Chopra", "Jennifer Lawrence"
// //   ],
// //   "Cast 3": [
// //     "Amitabh Bachchan", "Morgan Freeman", "Kamal Haasan", "Anthony Hopkins", 
// //     "Naseeruddin Shah", "Samuel L. Jackson", "R Madhavan", "Gary Oldman"
// //   ],
// //   "Cast 4": [
// //     "Kareena Kapoor", "Anne Hathaway", "Kiara Advani", "Amy Adams", 
// //     "Taapsee Pannu", "Emma Watson", "Kriti Sanon", "Zendaya"
// //   ],
// //   "Music Director": [
// //     "A.R. Rahman", "Hans Zimmer", "Santhosh Narayanan", "John Williams", 
// //     "Pritam", "Ludwig Göransson", "Amit Trivedi", "Trent Reznor"
// //   ],
// //   "Lead Singer": [
// //     "Diljit Dosanjh", "Arijit Singh", "Shreya Ghoshal", 
// //     "Rahat Fateh Ali Khan", "Sunidhi Chauhan", "Armaan Malik", 
// //     "Asees Kaur", "Shaan", "Various Artists", "Playback Singer"
// //   ]
// // };

// // // Enhanced Searchable Input Component - Updated for Lead Singer API search
// // function EnhancedSearchableInput({ step, value, onChange, onSelect }) {
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [suggestions, setSuggestions] = useState([]);
// //   const [popularSuggestions, setPopularSuggestions] = useState([]);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [showDropdown, setShowDropdown] = useState(false);
// //   const [selectedIndex, setSelectedIndex] = useState(-1);

// //   const getSearchEndpoint = (step) => {
// //     if (step === "Director") return "/search/directors";
// //     if (step.includes("Cast")) return "/search/actors";
// //     if (step === "Music Director") return "/search/music-directors";
// //     if (step === "Lead Singer") return "/search/singers";  // New endpoint for singers
// //     return null;
// //   };

// //   // Updated to check if field supports API search
// //   const supportsApiSearch = (step) => {
// //     return ["Director", "Music Director", "Lead Singer"].includes(step) || step.includes("Cast");
// //   };

// //   // Load popular suggestions on mount
// //   useEffect(() => {
// //     if (popularOptions[step]) {
// //       setPopularSuggestions(
// //         popularOptions[step].map(name => ({
// //           name,
// //           popularity: 0,
// //           type: 'popular'
// //         }))
// //       );
// //     }
// //   }, [step]);

// //   const searchPeople = async (query) => {
// //     if (query.length < 2) {
// //       setSuggestions([]);
// //       return;
// //     }

// //     setIsLoading(true);
// //     const endpoint = getSearchEndpoint(step);
    
// //     if (!endpoint) {
// //       // For fields without API search, filter static options
// //       const filtered = popularSuggestions.filter(item => 
// //         item.name.toLowerCase().includes(query.toLowerCase())
// //       );
// //       setSuggestions(filtered);
// //       setIsLoading(false);
// //       return;
// //     }
    
// //     try {
// //       const response = await fetch(`http://localhost:8000${endpoint}?q=${encodeURIComponent(query)}&limit=8`);
// //       if (response.ok) {
// //         const data = await response.json();
// //         setSuggestions(data.results?.map(person => ({...person, type: 'search'})) || []);
// //       }
// //     } catch (error) {
// //       console.error("Search error:", error);
// //       setSuggestions([]);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     const timeoutId = setTimeout(() => {
// //       if (searchQuery) {
// //         searchPeople(searchQuery);
// //       } else {
// //         setSuggestions([]);
// //       }
// //     }, 300);
// //     return () => clearTimeout(timeoutId);
// //   }, [searchQuery, step]);

// //   const handleInputChange = (e) => {
// //     const query = e.target.value;
// //     setSearchQuery(query);
// //     onChange(e);
// //     setShowDropdown(true);
// //     setSelectedIndex(-1);
// //   };

// //   const handleSelect = (person) => {
// //     onSelect(person.name);
// //     setSearchQuery(person.name);
// //     setShowDropdown(false);
// //     setSelectedIndex(-1);
// //   };

// //   const handleKeyDown = (e) => {
// //     const allSuggestions = searchQuery.length >= 2 ? suggestions : popularSuggestions;
    
// //     if (e.key === 'ArrowDown') {
// //       e.preventDefault();
// //       setSelectedIndex(prev => prev < allSuggestions.length - 1 ? prev + 1 : prev);
// //     } else if (e.key === 'ArrowUp') {
// //       e.preventDefault();
// //       setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
// //     } else if (e.key === 'Enter' && selectedIndex >= 0) {
// //       e.preventDefault();
// //       handleSelect(allSuggestions[selectedIndex]);
// //     } else if (e.key === 'Escape') {
// //       setShowDropdown(false);
// //       setSelectedIndex(-1);
// //     }
// //   };

// //   const displaySuggestions = searchQuery.length >= 2 ? suggestions : popularSuggestions;
// //   const hasContent = displaySuggestions.length > 0 || isLoading;

// //   return (
// //     <div className="search-container">
// //       <div className="input-wrapper">
// //         <input
// //           type="text"
// //           className="search-input"
// //           placeholder={
// //             supportsApiSearch(step)
// //               ? (searchQuery.length < 2 
// //                   ? `Search or select popular ${step.toLowerCase()}...` 
// //                   : `Searching for ${step.toLowerCase()}...`)
// //               : `Select ${step.toLowerCase()}...`
// //           }
// //           value={searchQuery || value || ""}
// //           onChange={handleInputChange}
// //           onFocus={() => setShowDropdown(true)}
// //           onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
// //           onKeyDown={handleKeyDown}
// //         />
// //         <div className="search-icon">
// //           {isLoading ? (
// //             <div className="loading-spinner"></div>
// //           ) : supportsApiSearch(step) ? (
// //             <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
// //             </svg>
// //           ) : (
// //             <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
// //             </svg>
// //           )}
// //         </div>
// //       </div>
      
// //       {showDropdown && hasContent && (
// //         <div className="dropdown">
// //           {searchQuery.length < 2 && popularSuggestions.length > 0 && (
// //             <div className="dropdown-header popular">
// //               <p>🌟 Popular {step}s</p>
// //             </div>
// //           )}
          
// //           {searchQuery.length >= 2 && suggestions.length > 0 && supportsApiSearch(step) && (
// //             <div className="dropdown-header search">
// //               <p>🔍 Search Results</p>
// //             </div>
// //           )}
          
// //           <div className="suggestions-list">
// //             {isLoading ? (
// //               <div className="loading-state">
// //                 <div className="loading-content">
// //                   <div className="loading-spinner"></div>
// //                   <span>Searching...</span>
// //                 </div>
// //               </div>
// //             ) : displaySuggestions.length > 0 ? (
// //               displaySuggestions.map((person, index) => (
// //                 <div
// //                   key={`${person.name}-${index}`}
// //                   className={`suggestion-item ${selectedIndex === index ? 'selected' : ''}`}
// //                   onClick={() => handleSelect(person)}
// //                 >
// //                   <div className="suggestion-content">
// //                     <div className="suggestion-main">
// //                       <div className="suggestion-name-line">
// //                         <p className="person-name">{person.name}</p>
// //                         {person.type === 'popular' && (
// //                           <span className="badge popular-badge">Popular</span>
// //                         )}
// //                         {person.type === 'search' && person.popularity > 10 && (
// //                           <span className="badge trending-badge">Trending</span>
// //                         )}
// //                       </div>
// //                       {person.known_for && person.known_for.length > 0 && (
// //                         <p className="known-for">
// //                           Known for: {person.known_for.slice(0, 2).join(", ")}
// //                           {person.known_for.length > 2 && "..."}
// //                         </p>
// //                       )}
// //                       {person.type === 'search' && (
// //                         <p className="popularity-score">
// //                           Popularity: {person.popularity?.toFixed(1)}
// //                         </p>
// //                       )}
// //                     </div>
// //                     <div className="arrow-icon">
// //                       <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
// //                       </svg>
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))
// //             ) : searchQuery.length >= 2 ? (
// //               <div className="no-results">
// //                 <div className="no-results-content">
// //                   <p>No results found for "{searchQuery}"</p>
// //                   <p className="no-results-hint">Try searching with a different name or spelling</p>
// //                 </div>
// //               </div>
// //             ) : null}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // function UpcomingMovieSearch({ onMovieSelect, onClose }) {
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [searchResults, setSearchResults] = useState([]);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [selectedMovie, setSelectedMovie] = useState(null);
// //   const [movieDetails, setMovieDetails] = useState(null);

// //   const searchUpcomingMovies = async (query) => {
// //     if (query.length < 2) {
// //       setSearchResults([]);
// //       return;
// //     }

// //     setIsLoading(true);
// //     try {
// //       const response = await fetch(`http://localhost:8000/search/upcoming-movies?q=${encodeURIComponent(query)}&limit=10`);
// //       if (response.ok) {
// //         const data = await response.json();
// //         setSearchResults(data.results || []);
// //       }
// //     } catch (error) {
// //       console.error("Search error:", error);
// //       setSearchResults([]);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const getMovieDetails = async (movieId) => {
// //     setIsLoading(true);
// //     try {
// //       const response = await fetch(`http://localhost:8000/movie-details/${movieId}`);
// //       if (response.ok) {
// //         const data = await response.json();
// //         setMovieDetails(data);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching movie details:", error);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     const timeoutId = setTimeout(() => {
// //       if (searchQuery) {
// //         searchUpcomingMovies(searchQuery);
// //       } else {
// //         setSearchResults([]);
// //       }
// //     }, 300);
// //     return () => clearTimeout(timeoutId);
// //   }, [searchQuery]);

// //   const handleMovieSelect = (movie) => {
// //     setSelectedMovie(movie);
// //     getMovieDetails(movie.id);
// //   };

// //   const handleUseMovie = () => {
// //     if (movieDetails) {
// //       onMovieSelect(movieDetails);
// //       onClose();
// //     }
// //   };

// //   return (
// //     <div className="upcoming-movie-overlay">
// //       <div className="upcoming-movie-modal">
// //         <div className="modal-header">
// //           <h3>🎬 Search Upcoming Movies</h3>
// //           <button className="close-button" onClick={onClose}>×</button>
// //         </div>
        
// //         <div className="search-section">
// //           <div className="search-input-container">
// //             <input
// //               type="text"
// //               className="movie-search-input"
// //               placeholder="Search for upcoming movies..."
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //             />
// //             {isLoading && <div className="search-loading-spinner"></div>}
// //           </div>
          
// //           {searchResults.length > 0 && (
// //             <div className="search-results-list">
// //               {searchResults.map((movie) => (
// //                 <div
// //                   key={movie.id}
// //                   className={`movie-result-item ${selectedMovie?.id === movie.id ? 'selected' : ''}`}
// //                   onClick={() => handleMovieSelect(movie)}
// //                 >
// //                   <div className="movie-poster">
// //                     {movie.poster_path ? (
// //                       <img
// //                         src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
// //                         alt={movie.title}
// //                         onError={(e) => {
// //                           e.target.style.display = 'none';
// //                           e.target.nextSibling.style.display = 'flex';
// //                         }}
// //                       />
// //                     ) : null}
// //                     <div className="poster-placeholder" style={{ display: movie.poster_path ? 'none' : 'flex' }}>
// //                       🎬
// //                     </div>
// //                   </div>
// //                   <div className="movie-info">
// //                     <h4 className="movie-title">{movie.title}</h4>
// //                     <p className="movie-release">Release: {movie.release_date || 'TBA'}</p>
// //                     <p className="movie-overview">
// //                       {movie.overview ? movie.overview.substring(0, 100) + '...' : 'No description available'}
// //                     </p>
// //                   </div>
// //                   <div className="movie-rating">
// //                     ⭐ {movie.vote_average?.toFixed(1) || 'N/A'}
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </div>

// //         {movieDetails && (
// //           <div className="movie-details-section">
// //             <h4>📋 Movie Details</h4>
// //             <div className="details-grid">
// //               <div className="detail-item">
// //                 <span className="detail-label">Title:</span>
// //                 <span className="detail-value">{movieDetails.title}</span>
// //               </div>
// //               <div className="detail-item">
// //                 <span className="detail-label">Director:</span>
// //                 <span className="detail-value">{movieDetails.director || 'Unknown'}</span>
// //               </div>
// //               <div className="detail-item">
// //                 <span className="detail-label">Genre:</span>
// //                 <span className="detail-value">{movieDetails.primary_genre || 'Unknown'}</span>
// //               </div>
// //               <div className="detail-item">
// //                 <span className="detail-label">Release Date:</span>
// //                 <span className="detail-value">{movieDetails.release_date || 'TBA'}</span>
// //               </div>
// //               <div className="detail-item">
// //                 <span className="detail-label">Cast:</span>
// //                 <span className="detail-value">
// //                   {[movieDetails.cast_1, movieDetails.cast_2, movieDetails.cast_3, movieDetails.cast_4]
// //                     .filter(Boolean)
// //                     .slice(0, 2)
// //                     .join(', ') || 'Unknown'}
// //                 </span>
// //               </div>
// //               <div className="detail-item">
// //                 <span className="detail-label">Music Director:</span>
// //                 <span className="detail-value">{movieDetails.music_director || 'Unknown'}</span>
// //               </div>
// //             </div>
            
// //             <div className="movie-actions">
// //               <button className="use-movie-button" onClick={handleUseMovie}>
// //                 ✨ Use This Movie for Prediction
// //               </button>
// //             </div>
// //           </div>
// //         )}

// //         {searchQuery && searchResults.length === 0 && !isLoading && (
// //           <div className="no-results-message">
// //             <p>🔍 No upcoming movies found for "{searchQuery}"</p>
// //             <p>Try searching with different keywords or movie titles</p>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }
// // // What-If Analysis Component (keeping the existing code)
// // function WhatIfAnalysis({ baseMovie, onBack }) {
// //   const [scenarios, setScenarios] = useState([
// //     { Director: "S.S. Rajamouli", Genre: "Action" },
// //     { Cast_1: "Shah Rukh Khan", Cast_2: "Deepika Padukone" },
// //     { Genre: "Sci-Fi", Music_Director: "A.R. Rahman" }
// //   ]);
// //   const [analysisResults, setAnalysisResults] = useState(null);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [modelStatus, setModelStatus] = useState(null);

// //   // Check model status on component mount
// //   useEffect(() => {
// //     checkModelStatus();
// //   }, []);

// //   const checkModelStatus = async () => {
// //     try {
// //       const response = await fetch('http://localhost:8000/model-status');
// //       if (response.ok) {
// //         const data = await response.json();
// //         setModelStatus(data);
// //       }
// //     } catch (error) {
// //       console.error('Error checking model status:', error);
// //     }
// //   };

// //   const enhanceModel = async () => {
// //     setIsLoading(true);
// //     try {
// //       const response = await fetch('http://localhost:8000/enhance-trained-model', {
// //         method: 'POST'
// //       });
      
// //       if (response.ok) {
// //         const data = await response.json();
// //         alert('Model enhanced successfully with local data!');
// //         checkModelStatus(); // Refresh status
// //       } else {
// //         alert('Failed to enhance model');
// //       }
// //     } catch (error) {
// //       console.error('Error enhancing model:', error);
// //       alert('Error enhancing model');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const runWhatIfAnalysis = async () => {
// //     setIsLoading(true);
// //     try {
// //       const response = await fetch('http://localhost:8000/producer/what-if-analysis', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //           base_movie: baseMovie,
// //           scenarios: scenarios
// //         })
// //       });

// //       if (response.ok) {
// //         const data = await response.json();
// //         setAnalysisResults(data);
// //       } else {
// //         const errorData = await response.json();
// //         alert(`Analysis failed: ${errorData.detail}`);
// //       }
// //     } catch (error) {
// //       console.error('What-if analysis failed:', error);
// //       alert('Failed to run what-if analysis');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const updateScenario = (index, field, value) => {
// //     const newScenarios = [...scenarios];
// //     newScenarios[index] = {
// //       ...newScenarios[index],
// //       [field]: value
// //     };
// //     setScenarios(newScenarios);
// //   };

// //   const addScenario = () => {
// //     setScenarios([...scenarios, {}]);
// //   };

// //   const removeScenario = (index) => {
// //     const newScenarios = scenarios.filter((_, i) => i !== index);
// //     setScenarios(newScenarios);
// //   };

// //   return (
// //     <div className="what-if-container">
// //       <div className="what-if-header">
// //         <button className="back-button" onClick={onBack}>
// //           ← Back to Movie Builder
// //         </button>
// //         <h2 className="what-if-title">🔬 Producer's What-If Analysis</h2>
// //         <p className="what-if-subtitle">
// //           Analyze different casting and creative combinations to maximize box office potential
// //         </p>
// //       </div>

// //       {/* Model Status */}
// //       {modelStatus && (
// //         <div className="model-status-card">
// //           <h3>🤖 Model Status</h3>
// //           <div className="model-grid">
// //             {Object.entries(modelStatus.models).map(([modelName, info]) => (
// //               <div key={modelName} className={`model-item ${info.status === 'Trained & Ready' ? 'ready' : 'not-ready'}`}>
// //                 <h4>{modelName.replace('_', ' ').toUpperCase()}</h4>
// //                 <p className="model-accuracy">Accuracy: {info.accuracy}</p>
// //                 <p className="model-speed">Speed: {info.speed}</p>
// //                 <span className={`status-badge ${info.status === 'Trained & Ready' ? 'ready' : 'not-ready'}`}>
// //                   {info.status}
// //                 </span>
// //               </div>
// //             ))}
// //           </div>
// //           {modelStatus.models.ml_ensemble?.status !== 'Trained & Ready' && (
// //             <button 
// //               className="enhance-model-button"
// //               onClick={enhanceModel}
// //               disabled={isLoading}
// //             >
// //               {isLoading ? "Enhancing..." : "🚀 Enhance Model with Local Data"}
// //             </button>
// //           )}
// //         </div>
// //       )}

// //       {/* Base Movie */}
// //       <div className="base-movie-card">
// //         <h3>🎬 Base Movie</h3>
// //         <div className="base-movie-details">
// //           {Object.entries(baseMovie).map(([key, value]) => (
// //             <div key={key} className="base-movie-item">
// //               <span className="base-movie-key">{key}:</span>
// //               <span className="base-movie-value">{value}</span>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Scenarios */}
// //       <div className="scenarios-section">
// //         <div className="scenarios-header">
// //           <h3>🎯 What-If Scenarios</h3>
// //           <button className="add-scenario-button" onClick={addScenario}>
// //             + Add Scenario
// //           </button>
// //         </div>
        
// //         <div className="scenarios-grid">
// //           {scenarios.map((scenario, index) => (
// //             <div key={index} className="scenario-card">
// //               <div className="scenario-header">
// //                 <h4>Scenario {index + 1}</h4>
// //                 {scenarios.length > 1 && (
// //                   <button 
// //                     className="remove-scenario-button"
// //                     onClick={() => removeScenario(index)}
// //                   >
// //                     ×
// //                   </button>
// //                 )}
// //               </div>
              
// //               <div className="scenario-fields">
// //                 {["Director", "Genre", "Music_Director", "Cast_1", "Cast_2"].map(field => (
// //                   <div key={field} className="scenario-field">
// //                     <label>{field.replace('_', ' ')}:</label>
// //                     {field === "Genre" ? (
// //                       <select
// //                         value={scenario[field] || ""}
// //                         onChange={(e) => updateScenario(index, field, e.target.value)}
// //                       >
// //                         <option value="">-- Keep Original --</option>
// //                         {staticOptions.Genre.map(genre => (
// //                           <option key={genre} value={genre}>{genre}</option>
// //                         ))}
// //                       </select>
// //                     ) : (
// //                       <input
// //                         type="text"
// //                         value={scenario[field] || ""}
// //                         onChange={(e) => updateScenario(index, field, e.target.value)}
// //                         placeholder={`Change ${field.replace('_', ' ')}`}
// //                       />
// //                     )}
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Analysis Button */}
// //       <div className="analysis-button-section">
// //         <button
// //           className="run-analysis-button"
// //           onClick={runWhatIfAnalysis}
// //           disabled={isLoading}
// //         >
// //           {isLoading ? (
// //             <span>
// //               <div className="loading-spinner"></div>
// //               Running Analysis...
// //             </span>
// //           ) : (
// //             "🚀 Run What-If Analysis"
// //           )}
// //         </button>
// //       </div>

// //       {/* Results */}
// //       {analysisResults && (
// //         <div className="analysis-results">
// //           <h3>📊 Analysis Results</h3>
// //           <div className="results-grid">
// //             {analysisResults.analysis_results.map((result, index) => (
// //               <div 
// //                 key={index} 
// //                 className={`result-card ${
// //                   index === 0 ? 'base-result' : 
// //                   result.vs_base?.is_better ? 'better-result' : 'worse-result'
// //                 }`}
// //               >
// //                 <div className="result-header">
// //                   <h4>{result.scenario}</h4>
// //                   {index > 0 && result.vs_base && (
// //                     <span className={`change-indicator ${result.vs_base.is_better ? 'positive' : 'negative'}`}>
// //                       {result.vs_base.is_better ? '↗' : '↘'} {result.vs_base.change_percentage.toFixed(1)}%
// //                     </span>
// //                   )}
// //                 </div>
                
// //                 <div className="result-prediction">
// //                   <div className="prediction-item">
// //                     <span className="prediction-label">Weekend:</span>
// //                     <span className="prediction-value">₹{result.prediction.weekend} Cr</span>
// //                   </div>
// //                   <div className="prediction-item">
// //                     <span className="prediction-label">Lifetime:</span>
// //                     <span className="prediction-value">₹{result.prediction.total} Cr</span>
// //                   </div>
// //                   <div className="prediction-item">
// //                     <span className="prediction-label">Confidence:</span>
// //                     <span className="prediction-value">{result.prediction.confidence}%</span>
// //                   </div>
// //                 </div>

// //                 {index > 0 && result.changes && Object.keys(result.changes).length > 0 && (
// //                   <div className="result-changes">
// //                     <h5>Changes Made:</h5>
// //                     {Object.entries(result.changes).map(([key, value]) => (
// //                       <div key={key} className="change-item">
// //                         <span className="change-key">{key.replace('_', ' ')}:</span>
// //                         <span className="change-value">{value}</span>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 )}

// //                 {index > 0 && result.vs_base && (
// //                   <div className="vs-base">
// //                     <span className="vs-base-label">vs Base:</span>
// //                     <span className={`vs-base-value ${result.vs_base.is_better ? 'positive' : 'negative'}`}>
// //                       {result.vs_base.is_better ? '+' : ''}{result.vs_base.change_crores} Cr
// //                     </span>
// //                   </div>
// //                 )}
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // function App() {
// //   const [formData, setFormData] = useState({});
// //   const [currentStep, setCurrentStep] = useState(0);
// //   const [result, setResult] = useState(null);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [showWhatIf, setShowWhatIf] = useState(false);
// //   const [showUpcomingSearch, setShowUpcomingSearch] = useState(false); // New state

// //   const handleUpcomingMovieSelect = (movieData) => {
// //     // Auto-fill the form with the movie data
// //     const newFormData = {
// //       "Director": movieData.director || "",
// //       "Genre": movieData.primary_genre || "",
// //       "Music Director": movieData.music_director || "",
// //       "Lead Singer": movieData.lead_singer || "",
// //       "Cast 1": movieData.cast_1 || "",
// //       "Cast 2": movieData.cast_2 || "",
// //       "Cast 3": movieData.cast_3 || "",
// //       "Cast 4": movieData.cast_4 || "",
// //       "Category": movieData.category || "None"
// //     };
    
// //     setFormData(newFormData);
// //     setCurrentStep(0); // Reset to first step so user can review/edit
// //     alert(`🎬 "${movieData.title}" has been loaded! You can now review and edit the details before generating predictions.`);
// //   };

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [steps[currentStep]]: e.target.value });
// //   };

// //   const handleSearchSelect = (value) => {
// //     setFormData({ ...formData, [steps[currentStep]]: value });
// //   };

// //   const handleNext = () => {
// //     if (currentStep < steps.length - 1) {
// //       setCurrentStep(currentStep + 1);
// //     } else {
// //       handlePredict();
// //     }
// //   };

// //   const handleBack = () => {
// //     if (currentStep > 0) {
// //       setCurrentStep(currentStep - 1);
// //     }
// //   };

// //   const handlePredict = async () => {
// //     setIsLoading(true);
    
// //     try {
// //       const requestData = {
// //         Director: formData.Director,
// //         Genre: formData.Genre,
// //         Music_Director: formData["Music Director"],
// //         Lead_Singer: formData["Lead Singer"],
// //         Cast_1: formData["Cast 1"],
// //         Cast_2: formData["Cast 2"],
// //         Cast_3: formData["Cast 3"],
// //         Cast_4: formData["Cast 4"],
// //         Category: formData.Category || "None"
// //       };

// //       console.log("Sending prediction request:", requestData);

// //       const response = await fetch('http://localhost:8000/predict-performance', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(requestData)
// //       });

// //       if (!response.ok) {
// //         const errorData = await response.json();
// //         throw new Error(`API Error: ${response.status} - ${errorData.detail || 'Unknown error'}`);
// //       }

// //       const prediction = await response.json();
// //       console.log("Prediction response:", prediction);
      
// //       setResult({
// //         weekend: prediction.weekend,
// //         total: prediction.total,
// //         confidence: prediction.confidence,
// //         breakdown: prediction.breakdown,
// //         dataSource: prediction.data_source
// //       });
// //     } catch (error) {
// //       console.error('Prediction failed:', error);
      
// //       alert(`Prediction failed: ${error.message}. Using offline prediction.`);
      
// //       const baseScore = Math.random() * 50 + 20;
// //       let multiplier = 1;
// //       if (formData.Director === "S.S. Rajamouli") multiplier += 0.3;
// //       if (formData.Genre === "Action") multiplier += 0.2;
// //       if (formData["Cast 1"] === "Shah Rukh Khan") multiplier += 0.4;
// //       if (formData.Category === "Patriotic") multiplier += 0.15;
      
// //       const weekend = (baseScore * multiplier).toFixed(1);
// //       const total = (weekend * 2.4).toFixed(1);
      
// //       setResult({ 
// //         weekend, 
// //         total, 
// //         confidence: 75,
// //         breakdown: { error: "Using offline prediction due to API error" },
// //         dataSource: "Offline Fallback"
// //       });
// //     }
    
// //     setIsLoading(false);
// //   };

// //   const resetForm = () => {
// //     setFormData({});
// //     setCurrentStep(0);
// //     setResult(null);
// //     setShowWhatIf(false);
// //   };

// //     if (showUpcomingSearch) {
// //     return (
// //       <UpcomingMovieSearch
// //         onMovieSelect={handleUpcomingMovieSelect}
// //         onClose={() => setShowUpcomingSearch(false)}
// //       />
// //     );
// //   }

// //    const UpcomingMovieButton = () => (
// //     <div className="upcoming-movie-section">
// //       <button
// //         className="upcoming-movie-button"
// //         onClick={() => setShowUpcomingSearch(true)}
// //       >
// //         🔮 Search Upcoming Movies
// //       </button>
// //       <p className="upcoming-movie-hint">
// //         Auto-fill movie details from TMDB's upcoming releases
// //       </p>
// //     </div>
// //   );

// //   const handleWhatIfAnalysis = () => {
// //     if (Object.keys(formData).length < steps.length) {
// //       alert("Please complete the movie setup first before running What-If analysis");
// //       return;
// //     }
    
// //     // Convert formData to the format expected by the API
// //     const baseMovie = {
// //       Director: formData.Director,
// //       Genre: formData.Genre,
// //       Music_Director: formData["Music Director"],
// //       Lead_Singer: formData["Lead Singer"],
// //       Cast_1: formData["Cast 1"],
// //       Cast_2: formData["Cast 2"],
// //       Cast_3: formData["Cast 3"],
// //       Cast_4: formData["Cast 4"],
// //       Category: formData.Category || "None"
// //     };
    
// //     setShowWhatIf(true);
// //   };

// //   const progressPercentage = ((currentStep + 1) / steps.length) * 100;
// //   const currentStepName = steps[currentStep];
  
// //   // FIXED: Include "Lead Singer" in searchable fields
// //   const isSearchableField = ["Director", "Cast 1", "Cast 2", "Cast 3", "Cast 4", "Music Director", "Lead Singer"].includes(currentStepName);

// //   // Show What-If Analysis
// //   if (showWhatIf) {
// //     const baseMovie = {
// //       Director: formData.Director,
// //       Genre: formData.Genre,
// //       Music_Director: formData["Music Director"],
// //       Lead_Singer: formData["Lead Singer"],
// //       Cast_1: formData["Cast 1"],
// //       Cast_2: formData["Cast 2"],
// //       Cast_3: formData["Cast 3"],
// //       Cast_4: formData["Cast 4"],
// //       Category: formData.Category || "None"
// //     };
    
// //     return (
// //       <WhatIfAnalysis 
// //         baseMovie={baseMovie} 
// //         onBack={() => setShowWhatIf(false)} 
// //       />
// //     );
// //   }

// //   if (isLoading) {
// //     return (
// //       <div className="app-container">
// //         <div className="loading-container">
// //           <div className="loading-card">
// //             <div className="loading-animation">
// //               <div className="spinner-container">
// //                 <div className="loading-spinner large"></div>
// //                 <div className="loading-emoji">🎬</div>
// //               </div>
// //             </div>
// //             <h3 className="loading-title">Analyzing Your Movie</h3>
// //             <p className="loading-subtitle">Our AI is calculating box office predictions...</p>
// //             <div className="loading-progress">
// //               <div className="loading-progress-bar"></div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (result) {
// //     return (
// //       <div className="app-container">
// //         <div className="result-container">
// //           <div className="result-card">
// //             <div className="result-header">
// //               <h3 className="result-title">🎯 Box Office Prediction</h3>
              
// //               <div className="prediction-grid">
// //                 <div className="prediction-card weekend">
// //                   <p className="prediction-label">Opening Weekend</p>
// //                   <p className="prediction-value">₹{result.weekend} Cr</p>
// //                 </div>
// //                 <div className="prediction-card total">
// //                   <p className="prediction-label">Lifetime Collection</p>
// //                   <p className="prediction-value">₹{result.total} Cr</p>
// //                 </div>
// //               </div>
              
// //               {result.confidence && (
// //                 <div className="confidence-card">
// //                   <p className="confidence-label">Confidence Level</p>
// //                   <div className="confidence-content">
// //                     <p className="confidence-value">{result.confidence}%</p>
// //                     <div className="confidence-bar-container">
// //                       <div className="confidence-bar">
// //                         <div 
// //                           className="confidence-fill"
// //                           style={{ width: `${result.confidence}%` }}
// //                         ></div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
            
// //             <div className="details-grid">
// //               <div className="details-card cast-crew">
// //                 <h4 className="details-title">🎭 Your Movie Cast & Crew</h4>
// //                 {Object.entries(formData).map(([key, value]) => (
// //                   <div key={key} className="detail-row">
// //                     <span className="detail-key">{key}:</span>
// //                     <span className="detail-value">{value}</span>
// //                   </div>
// //                 ))}
// //               </div>

// //               {result.breakdown && (
// //                 <div className="details-card analysis">
// //                   <h4 className="details-title">📊 Prediction Analysis</h4>
// //                   {Object.entries(result.breakdown).map(([key, value]) => (
// //                     <div key={key} className="detail-row">
// //                       <span className="detail-key">
// //                         {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:
// //                       </span>
// //                       <span className="detail-value">
// //                         {typeof value === 'object' ? JSON.stringify(value) : value}
// //                       </span>
// //                     </div>
// //                   ))}
// //                   {result.dataSource && (
// //                     <div className="data-source">
// //                       <span className="data-source-text">
// //                         📡 Data Source: {result.dataSource}
// //                       </span>
// //                     </div>
// //                   )}
// //                 </div>
// //               )}
// //             </div>
            
// //             <div className="button-group">
// //               <button
// //                 className="what-if-button"
// //                 onClick={handleWhatIfAnalysis}
// //               >
// //                 🔬 Run What-If Analysis
// //               </button>
// //               <button
// //                 className="reset-button"
// //                 onClick={resetForm}
// //               >
// //                 🎬 Predict Another Movie
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="app-container">
// //       <div className="form-container-wrapper">
// //         {/* Left side - Form */}
// //         <div className="form-container">
// //           <div className="form-card">
// //             <div className="form-header">
// //               <h2 className="app-title">🎬 Movie Box Office Predictor</h2>
// //               <p className="app-subtitle">Build your dream movie and get AI-powered predictions</p>

// //                 <UpcomingMovieButton />
// //             </div>

// //             <div className="progress-section">
// //               <div className="progress-info">
// //                 <span>Step {currentStep + 1} of {steps.length}</span>
// //                 <span>{Math.round(progressPercentage)}% Complete</span>
// //               </div>
// //               <div className="progress-bar">
// //                 <div 
// //                   className="progress-fill"
// //                   style={{ width: `${progressPercentage}%` }}
// //                 ></div>
// //               </div>
// //             </div>

// //             <div className="form-step">
// //               <label className="step-label">
// //                 {currentStepName === "Cast 1" ? "Lead Actor/Actress" :
// //                  currentStepName === "Cast 2" ? "Supporting Actor/Actress" :
// //                  currentStepName === "Cast 3" ? "Character Actor" :
// //                  currentStepName === "Cast 4" ? "Additional Cast" :
// //                  `Select ${currentStepName}`}
// //                 {isSearchableField && (
// //                   <span className="step-hint">
// //                     Search for any {currentStepName.toLowerCase()} or pick from popular choices
// //                   </span>
// //                 )}
// //               </label>
              
// //               {isSearchableField ? (
// //                 <EnhancedSearchableInput
// //                   step={currentStepName}
// //                   value={formData[currentStepName]}
// //                   onChange={handleChange}
// //                   onSelect={handleSearchSelect}
// //                 />
// //               ) : (
// //                 <select
// //                   className="form-select"
// //                   value={formData[currentStepName] || ""}
// //                   onChange={handleChange}
// //                 >
// //                   <option value="">-- Select {currentStepName} --</option>
// //                   {staticOptions[currentStepName].map((option) => (
// //                     <option key={option} value={option}>{option}</option>
// //                   ))}
// //                 </select>
// //               )}
// //             </div>

// //             <div className="button-group">
// //               {currentStep > 0 && (
// //                 <button
// //                   className="back-button"
// //                   onClick={handleBack}
// //                 >
// //                   ← Back
// //                 </button>
// //               )}
// //               <button
// //                 className={`next-button ${!formData[currentStepName] ? 'disabled' : ''}`}
// //                 onClick={handleNext}
// //                 disabled={!formData[currentStepName]}
// //               >
// //                 {currentStep === steps.length - 1 ? "🎯 Generate Prediction" : "Next →"}
// //               </button>
// //             </div>

// //             {/* Add What-If Analysis button when form is complete */}
// //             {Object.keys(formData).length === steps.length && (
// //               <div className="producer-tools-section">
// //                 <button
// //                   className="producer-tools-button"
// //                   onClick={handleWhatIfAnalysis}
// //                 >
// //                   🔬 Producer's What-If Analysis
// //                 </button>
// //                 <p className="producer-tools-hint">
// //                   Compare different casting and creative decisions to maximize revenue
// //                 </p>
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* Right side - Preview */}
// //         {Object.keys(formData).length > 0 && (
// //           <div className="preview-container">
// //             <div className="preview-card">
// //               <h4 className="preview-title">✨ Your Movie So Far</h4>
// //               <div className="preview-list">
// //                 {Object.entries(formData).map(([key, value]) => (
// //                   <div key={key} className="preview-item">
// //                     <div className="preview-content">
// //                       <span className="preview-key">{key}:</span>
// //                       <span className="preview-value">{value}</span>
// //                     </div>
// //                     <div className="preview-status">
// //                       {value ? "✅" : "⏳"}
// //                     </div>
// //                   </div>
// //                 ))}
                
// //                 {/* Show remaining steps */}
// //                 {steps.slice(Object.keys(formData).length).map((step) => (
// //                   <div key={step} className="preview-item pending">
// //                     <div className="preview-content">
// //                       <span className="preview-key">{step}:</span>
// //                       <span className="preview-value">Not selected yet</span>
// //                     </div>
// //                     <div className="preview-status">⏳</div>
// //                   </div>
// //                 ))}
// //               </div>
              
// //               {Object.keys(formData).length === steps.length && (
// //                 <div className="preview-complete">
// //                   <div className="completion-badge">
// //                     🎉 Movie Complete!
// //                   </div>
// //                   <p className="completion-text">
// //                     Ready to generate your box office prediction
// //                   </p>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default App;
// // App.jsx - Clean component structure
// import { useState } from "react";
// import './App.css';

// // Import components
// import EnhancedSearchableInput from './components/EnhancedSearchableInput';
// import UpcomingMovieSearch from './components/UpcomingMovieSearch';
// import MovieFormStep from './components/MovieFormStep';
// import PredictionResults from './components/PredictionResults';
// import WhatIfAnalysis from './components/WhatIfAnalysis';

// const steps = [
//   "Director", 
//   "Genre", 
//   "Music Director", 
//   "Lead Singer",
//   "Cast 1", 
//   "Cast 2", 
//   "Cast 3", 
//   "Cast 4", 
//   "Category"
// ];

// function ProgressBar({ currentStep, totalSteps }) {
//   const progressPercentage = ((currentStep + 1) / totalSteps) * 100;
  
//   return (
//     <div className="progress-section">
//       <div className="progress-info">
//         <span>Step {currentStep + 1} of {totalSteps}</span>
//         <span>{Math.round(progressPercentage)}% Complete</span>
//       </div>
//       <div className="progress-bar">
//         <div 
//           className="progress-fill"
//           style={{ width: `${progressPercentage}%` }}
//         ></div>
//       </div>
//     </div>
//   );
// }

// function UpcomingMovieButton({ onClick }) {
//   return (
//     <div className="upcoming-movie-section">
//       <button className="upcoming-movie-button" onClick={onClick}>
//         🔮 Search Upcoming Movies
//       </button>
//       <p className="upcoming-movie-hint">
//         Auto-fill movie details from TMDB's database
//       </p>
//     </div>
//   );
// }

// function MoviePreview({ formData, steps }) {
//   if (Object.keys(formData).length === 0) return null;

//   return (
//     <div className="preview-container">
//       <div className="preview-card">
//         <h4 className="preview-title">✨ Your Movie So Far</h4>
//         <div className="preview-list">
//           {Object.entries(formData).map(([key, value]) => (
//             <div key={key} className="preview-item">
//               <div className="preview-content">
//                 <span className="preview-key">{key}:</span>
//                 <span className="preview-value">{value}</span>
//               </div>
//               <div className="preview-status">
//                 {value ? "✅" : "⏳"}
//               </div>
//             </div>
//           ))}
          
//           {/* Show remaining steps */}
//           {steps.slice(Object.keys(formData).length).map((step) => (
//             <div key={step} className="preview-item pending">
//               <div className="preview-content">
//                 <span className="preview-key">{step}:</span>
//                 <span className="preview-value">Not selected yet</span>
//               </div>
//               <div className="preview-status">⏳</div>
//             </div>
//           ))}
//         </div>
        
//         {Object.keys(formData).length === steps.length && (
//           <div className="preview-complete">
//             <div className="completion-badge">
//               🎉 Movie Complete!
//             </div>
//             <p className="completion-text">
//               Ready to generate TMDB-based prediction
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function LoadingScreen() {
//   return (
//     <div className="app-container">
//       <div className="loading-container">
//         <div className="loading-card">
//           <div className="loading-animation">
//             <div className="spinner-container">
//               <div className="loading-spinner large"></div>
//               <div className="loading-emoji">🎬</div>
//             </div>
//           </div>
//           <h3 className="loading-title">Analyzing Your Movie</h3>
//           <p className="loading-subtitle">
//             Getting real TMDB performance data for cast & crew...
//           </p>
//           <div className="loading-progress">
//             <div className="loading-progress-bar"></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function App() {
//   const [formData, setFormData] = useState({});
//   const [currentStep, setCurrentStep] = useState(0);
//   const [result, setResult] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showWhatIf, setShowWhatIf] = useState(false);
//   const [showUpcomingSearch, setShowUpcomingSearch] = useState(false);

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
//       "Category": movieData.category || "None"
//     };
    
//     setFormData(newFormData);
//     setCurrentStep(0);
//     alert(`🎬 "${movieData.title}" loaded with TMDB data! Review and generate prediction.`);
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [steps[currentStep]]: e.target.value });
//   };

//   const handleSearchSelect = (value) => {
//     setFormData({ ...formData, [steps[currentStep]]: value });
//   };

//   const handleNext = () => {
//     if (currentStep < steps.length - 1) {
//       setCurrentStep(currentStep + 1);
//     } else {
//       handlePredict();
//     }
//   };

//   const handleBack = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const handlePredict = async () => {
//     setIsLoading(true);
    
//     try {
//       const requestData = {
//         Director: formData.Director,
//         Genre: formData.Genre,
//         Music_Director: formData["Music Director"],
//         Lead_Singer: formData["Lead Singer"],
//         Cast_1: formData["Cast 1"],
//         Cast_2: formData["Cast 2"],
//         Cast_3: formData["Cast 3"],
//         Cast_4: formData["Cast 4"],
//         Category: formData.Category || "None"
//       };

//       console.log("Sending TMDB prediction request:", requestData);

//       const response = await fetch('http://localhost:8000/predict-performance', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(requestData)
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(`API Error: ${response.status} - ${errorData.detail || 'Unknown error'}`);
//       }

//       const prediction = await response.json();
//       console.log("TMDB prediction response:", prediction);
      
//       setResult({
//         weekend: prediction.weekend,
//         total: prediction.total,
//         confidence: prediction.confidence,
//         breakdown: prediction.breakdown,
//         dataSource: prediction.data_source
//       });
//     } catch (error) {
//       console.error('TMDB prediction failed:', error);
      
//       alert(`Prediction failed: ${error.message}. Using fallback calculation.`);
      
//       // Simple fallback
//       const baseScore = Math.random() * 30 + 15;
//       let multiplier = 1;
//       if (formData.Director === "S.S. Rajamouli") multiplier += 0.3;
//       if (formData.Genre === "Action") multiplier += 0.2;
//       if (formData["Cast 1"] === "Shah Rukh Khan") multiplier += 0.4;
//       if (formData.Category === "Patriotic") multiplier += 0.15;
      
//       const weekend = (baseScore * multiplier).toFixed(1);
//       const total = (weekend * 2.2).toFixed(1);
      
//       setResult({ 
//         weekend, 
//         total, 
//         confidence: 75,
//         breakdown: { error: "Using fallback prediction - TMDB API unavailable" },
//         dataSource: "Fallback Calculation"
//       });
//     }
    
//     setIsLoading(false);
//   };

//   const resetForm = () => {
//     setFormData({});
//     setCurrentStep(0);
//     setResult(null);
//     setShowWhatIf(false);
//   };

//   const handleWhatIfAnalysis = () => {
//     if (Object.keys(formData).length < steps.length) {
//       alert("Please complete the movie setup first");
//       return;
//     }
    
//     setShowWhatIf(true);
//   };

//   // Show different screens based on state
//   if (showUpcomingSearch) {
//     return (
//       <UpcomingMovieSearch
//         onMovieSelect={handleUpcomingMovieSelect}
//         onClose={() => setShowUpcomingSearch(false)}
//       />
//     );
//   }

//   if (showWhatIf) {
//     const baseMovie = {
//       Director: formData.Director,
//       Genre: formData.Genre,
//       Music_Director: formData["Music Director"],
//       Lead_Singer: formData["Lead Singer"],
//       Cast_1: formData["Cast 1"],
//       Cast_2: formData["Cast 2"],
//       Cast_3: formData["Cast 3"],
//       Cast_4: formData["Cast 4"],
//       Category: formData.Category || "None"
//     };
    
//     return (
//       <WhatIfAnalysis 
//         baseMovie={baseMovie} 
//         onBack={() => setShowWhatIf(false)} 
//       />
//     );
//   }

//   if (isLoading) {
//     return <LoadingScreen />;
//   }

//   if (result) {
//     return (
//       <PredictionResults 
//         result={result}
//         formData={formData}
//         onWhatIfAnalysis={handleWhatIfAnalysis}
//         onReset={resetForm}
//       />
//     );
//   }

//   // Main form screen
//   const currentStepName = steps[currentStep];

//   return (
//     <div className="app-container">
//       <div className="form-container-wrapper">
//         {/* Left side - Form */}
//         <div className="form-container">
//           <div className="form-card">
//             <div className="form-header">
//               <h2 className="app-title">🎬 TMDB Box Office Predictor</h2>
//               <p className="app-subtitle">
//                 Build your movie with real TMDB data - no hardcoded limitations!
//               </p>
//               <UpcomingMovieButton onClick={() => setShowUpcomingSearch(true)} />
//             </div>

//             <ProgressBar currentStep={currentStep} totalSteps={steps.length} />

//             <MovieFormStep
//               step={currentStep}
//               stepName={currentStepName}
//               value={formData[currentStepName]}
//               onChange={handleChange}
//               onSearchSelect={handleSearchSelect}
//               onNext={handleNext}
//               onBack={handleBack}
//               isFirst={currentStep === 0}
//               isLast={currentStep === steps.length - 1}
//               disabled={!formData[currentStepName]}
//             />

//             {/* Show What-If button when form is complete */}
//             {Object.keys(formData).length === steps.length && (
//               <div className="producer-tools-section">
//                 <button
//                   className="producer-tools-button"
//                   onClick={handleWhatIfAnalysis}
//                 >
//                   🔬 Producer's What-If Analysis
//                 </button>
//                 <p className="producer-tools-hint">
//                   Compare different casting decisions with TMDB performance data
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Right side - Preview */}
//         <MoviePreview formData={formData} steps={steps} />
//       </div>
//     </div>
//   );
// }

// export default App;
// App.jsx - TAILWIND VERSION

import { useState } from "react";

// Import components
import EnhancedSearchableInput from './components/EnhancedSearchableInput';
import UpcomingMovieSearch from './components/UpcomingMovieSearch';
import PredictionResults from './components/PredictionResults';
import WhatIfAnalysis from './components/WhatIfAnalysis';

const steps = [
  "Director", 
  "Genre", 
  "Music Director", 
  "Lead Singer",
  "Cast 1", 
  "Cast 2", 
  "Cast 3", 
  "Cast 4", 
  "Category"
];

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
};

function CompactProgressBar({ currentStep, totalSteps }) {
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-gray-700">
          Step {currentStep + 1}/{totalSteps}
        </span>
        <span className="text-xs text-gray-500">
          {Math.round(progressPercentage)}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
}

function QuickPreview({ formData, steps }) {
  const filledCount = Object.keys(formData).length;
  const totalSteps = steps.length;
  
  if (filledCount === 0) return null;

  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-6">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-semibold text-gray-700">🎬 Your Movie</span>
        <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
          {filledCount}/{totalSteps}
        </span>
      </div>
      
      <div className="space-y-2">
        {Object.entries(formData).slice(-3).map(([key, value]) => (
          <div key={key} className="flex justify-between items-center text-sm">
            <span className="text-gray-600">{key}:</span>
            <span className="font-medium text-gray-900 truncate ml-2 max-w-32">
              {value}
            </span>
          </div>
        ))}
        {filledCount > 3 && (
          <div className="text-xs text-gray-500 text-center pt-1">
            +{filledCount - 3} more items...
          </div>
        )}
      </div>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-white to-blue-50 flex items-center justify-center z-50">
      <div className="bg-white shadow-xl rounded-2xl p-8 text-center max-w-sm w-full mx-4 border border-blue-100">
        <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h3 className="text-xl font-bold text-blue-800 mb-2">🎬 Analyzing Your Movie</h3>
        <p className="text-sm text-blue-600">Fetching TMDB performance data...</p>
      </div>
    </div>
  );
}


function App() {
  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showWhatIf, setShowWhatIf] = useState(false);
  const [showUpcomingSearch, setShowUpcomingSearch] = useState(false);

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
      "Category": movieData.category || "None"
    };
    
    setFormData(newFormData);
    setCurrentStep(0);
    alert(`✨ "${movieData.title}" loaded! Review and predict.`);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [steps[currentStep]]: e.target.value });
  };

  const handleSearchSelect = (value) => {
    setFormData({ ...formData, [steps[currentStep]]: value });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handlePredict();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePredict = async () => {
    setIsLoading(true);
    
    try {
      const requestData = {
        Director: formData.Director,
        Genre: formData.Genre,
        Music_Director: formData["Music Director"],
        Lead_Singer: formData["Lead Singer"],
        Cast_1: formData["Cast 1"],
        Cast_2: formData["Cast 2"],
        Cast_3: formData["Cast 3"],
        Cast_4: formData["Cast 4"],
        Category: formData.Category || "None"
      };

      const response = await fetch('http://localhost:8000/predict-performance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API Error: ${response.status} - ${errorData.detail || 'Unknown error'}`);
      }

      const prediction = await response.json();
      
      setResult({
        weekend: prediction.weekend,
        total: prediction.total,
        confidence: prediction.confidence,
        breakdown: prediction.breakdown,
        dataSource: prediction.data_source
      });
    } catch (error) {
      console.error('Prediction failed:', error);
      alert(`Prediction failed: ${error.message}`);
    }
    
    setIsLoading(false);
  };

  const resetForm = () => {
    setFormData({});
    setCurrentStep(0);
    setResult(null);
    setShowWhatIf(false);
  };

  const handleWhatIfAnalysis = () => {
    if (Object.keys(formData).length < steps.length) {
      alert("Please complete the movie setup first");
      return;
    }
    setShowWhatIf(true);
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

  if (showWhatIf) {
    const baseMovie = {
      Director: formData.Director,
      Genre: formData.Genre,
      Music_Director: formData["Music Director"],
      Lead_Singer: formData["Lead Singer"],
      Cast_1: formData["Cast 1"],
      Cast_2: formData["Cast 2"],
      Cast_3: formData["Cast 3"],
      Cast_4: formData["Cast 4"],
      Category: formData.Category || "None"
    };
    
    return (
      <WhatIfAnalysis 
        baseMovie={baseMovie} 
        onBack={() => setShowWhatIf(false)} 
      />
    );
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (result) {
    return (
      <PredictionResults 
        result={result}
        formData={formData}
        onWhatIfAnalysis={handleWhatIfAnalysis}
        onReset={resetForm}
      />
    );
  }

  // Main compact form
  const currentStepName = steps[currentStep];
  const isSearchableField = [
    "Director", "Cast 1", "Cast 2", "Cast 3", "Cast 4", 
    "Music Director", "Lead Singer"
  ].includes(currentStepName);

  const getStepDisplayName = (stepName) => {
    switch(stepName) {
      case "Cast 1": return "Lead Actor/Actress";
      case "Cast 2": return "Supporting Actor/Actress";
      case "Cast 3": return "Character Actor";
      case "Cast 4": return "Additional Cast";
      default: return stepName;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              🎬 TMDB Box Office Predictor
            </h1>
            <p className="text-sm text-gray-600 mb-4">
              Unlimited access to TMDB database
            </p>
            
            <button 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
              onClick={() => setShowUpcomingSearch(true)}
            >
              🔮 Search Upcoming Movies
            </button>
          </div>

          {/* Progress */}
          <CompactProgressBar currentStep={currentStep} totalSteps={steps.length} />

          {/* Current Step */}
          <div className="mb-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {getStepDisplayName(currentStepName)}
              </h3>
              {isSearchableField && (
                <p className="text-xs text-gray-500">
                  Search any {currentStepName.toLowerCase()} from TMDB
                </p>
              )}
            </div>
            
            <div className="mb-4">
              {isSearchableField ? (
                <EnhancedSearchableInput
                  step={currentStepName}
                  value={formData[currentStepName] || ""}
                  onChange={handleChange}
                  onSelect={handleSearchSelect}
                />
              ) : (
                <select
                  className="w-full px-4 py-3 text-sm border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-200"
                  value={formData[currentStepName] || ""}
                  onChange={handleChange}
                >
                  <option value="">-- Select {currentStepName} --</option>
                  {staticOptions[currentStepName]?.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              )}
            </div>

            {/* Navigation */}
            <div className="flex gap-3">
              {currentStep > 0 && (
                <button 
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
                  onClick={handleBack}
                >
                  ← Back
                </button>
              )}
              <button
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  !formData[currentStepName] 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 transform hover:scale-105'
                }`}
                onClick={handleNext}
                disabled={!formData[currentStepName]}
              >
                {currentStep === steps.length - 1 ? "🎯 Predict" : "Next →"}
              </button>
            </div>
          </div>

          {/* Quick Preview */}
          <QuickPreview formData={formData} steps={steps} />

          {/* What-If Button */}
          {/* {Object.keys(formData).length === steps.length && (
            <div className="text-center">
              <button
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-200 transform hover:scale-105"
                onClick={handleWhatIfAnalysis}
              >
                🔬 What-If Analysis
              </button>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default App;