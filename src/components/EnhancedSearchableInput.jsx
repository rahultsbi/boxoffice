

// // import { useState, useEffect } from "react";

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
// //     if (step === "Lead Singer") return "/search/singers";
// //     return null;
// //   };

// //   // Clear input when step changes
// //   useEffect(() => {
// //     setSearchQuery("");
// //     setSuggestions([]);
// //     setShowDropdown(false);
// //     setSelectedIndex(-1);
// //   }, [step]);

// //   // Sync searchQuery with value prop when it changes (auto-fill scenario)
// //   useEffect(() => {
// //     if (value && value !== searchQuery) {
// //       setSearchQuery(value);
// //     }
// //   }, [value]);

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

// //   // Enhanced search with fallback to general person search
// //   const searchPeople = async (query) => {
// //     if (query.length < 2) {
// //       setSuggestions([]);
// //       return;
// //     }

// //     setIsLoading(true);
    
// //     try {
// //       let results = [];
      
// //       // Step 1: Try specific endpoint first (directors, actors, etc.)
// //       const endpoint = getSearchEndpoint(step);
// //       if (endpoint) {
// //         try {
// //           const response = await fetch(`http://127.0.0.1:8001/${endpoint}?q=${encodeURIComponent(query)}&limit=6`);
// //           if (response.ok) {
// //             const data = await response.json();
// //             results = data.results?.map(person => ({...person, type: 'search'})) || [];
// //           }
// //         } catch (error) {
// //           console.error(`Specific search error for ${endpoint}:`, error);
// //         }
// //       }
      
// //       // Step 2: If no results from specific endpoint, try general person search
// //       if (results.length === 0) {
// //         try {
// //           const response = await fetch(`http://127.0.0.1:8001/search/person?q=${encodeURIComponent(query)}&limit=8`);
// //           if (response.ok) {
// //             const data = await response.json();
// //             results = data.results?.map(person => ({...person, type: 'general'})) || [];
// //           }
// //         } catch (error) {
// //           console.error("General person search error:", error);
// //         }
// //       }
      
// //       // Step 3: If still no results, filter from popular options
// //       if (results.length === 0) {
// //         const filtered = popularSuggestions.filter(item => 
// //           item.name.toLowerCase().includes(query.toLowerCase())
// //         );
// //         results = filtered;
// //       }
      
// //       setSuggestions(results);
      
// //     } catch (error) {
// //       console.error("Search error:", error);
// //       setSuggestions([]);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     const timeoutId = setTimeout(() => {
// //       if (searchQuery && searchQuery.length >= 2) {
// //         searchPeople(searchQuery);
// //       } else {
// //         setSuggestions([]);
// //       }
// //     }, 300);
// //     return () => clearTimeout(timeoutId);
// //   }, [searchQuery, step, popularSuggestions]);

// //   const handleInputChange = (e) => {
// //     const rawValue = e.target.value;
// //     // Only allow letters, spaces, and common name characters like apostrophes, hyphens, and dots
// //     const filteredValue = rawValue.replace(/[^a-zA-Z\s\-'.]/g, '');
    
// //     setSearchQuery(filteredValue);
    
// //     // Create a new event object with the filtered value
// //     const filteredEvent = {
// //       ...e,
// //       target: {
// //         ...e.target,
// //         value: filteredValue
// //       }
// //     };
    
// //     onChange(filteredEvent);
// //     setShowDropdown(true);
// //     setSelectedIndex(-1);
// //   };

// //   const handleSelect = (person) => {
// //     const selectedName = person.name || person;
// //     setSearchQuery(selectedName);
// //     onSelect(selectedName);
// //     setShowDropdown(false);
// //     setSelectedIndex(-1);
// //   };

// //   const handleKeyDown = (e) => {
// //     const allSuggestions = searchQuery.length >= 2 ? suggestions : popularSuggestions.slice(0, 6);
    
// //     if (e.key === 'ArrowDown') {
// //       e.preventDefault();
// //       setSelectedIndex(prev => prev < allSuggestions.length - 1 ? prev + 1 : prev);
// //     } else if (e.key === 'ArrowUp') {
// //       e.preventDefault();
// //       setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
// //     } else if (e.key === 'Enter' && selectedIndex >= 0) {
// //       e.preventDefault();
// //       handleSelect(allSuggestions[selectedIndex]);
// //     } else if (e.key === 'Enter' && selectedIndex === -1 && searchQuery.trim()) {
// //       // Allow entering custom text on Enter
// //       e.preventDefault();
// //       handleSelect(searchQuery.trim());
// //     } else if (e.key === 'Escape') {
// //       setShowDropdown(false);
// //       setSelectedIndex(-1);
// //     }
// //   };

// //   const displaySuggestions = searchQuery.length >= 2 ? suggestions : popularSuggestions.slice(0, 6);
// //   const hasContent = displaySuggestions.length > 0 || isLoading;

// //   const getPlaceholder = (step) => {
// //     if (step === "Director") return "Type director name...";
// //     if (step.includes("Cast")) return "Type actor/actress name...";
// //     if (step === "Music Director") return "Type music director name...";
// //     if (step === "Lead Singer") return "Type singer name...";
// //     return `Type ${step.toLowerCase()}...`;
// //   };

// //   return (
// //     <div className="relative w-full">
// //       {/* Input Field */}
// //       <div className="relative">
// //         <input
// //           type="text"
// //           className="w-full px-4 py-3 pr-10 text-sm border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-200"
// //           placeholder={getPlaceholder(step)}
// //           value={searchQuery}
// //           onChange={handleInputChange}
// //           onFocus={() => setShowDropdown(true)}
// //           onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
// //           onKeyDown={handleKeyDown}
// //         />
        
// //         {/* Input Icon */}
// //         <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
// //           {isLoading ? (
// //             <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
// //           ) : (
// //             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
// //             </svg>
// //           )}
// //         </div>
// //       </div>
      
// //       {/* Dropdown */}
// //       {showDropdown && hasContent && (
// //         <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
// //           {/* Header */}
// //           {searchQuery.length < 2 && popularSuggestions.length > 0 && (
// //             <div className="px-3 py-2 bg-gray-50 border-b border-gray-100">
// //               <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
// //                 🌟 Popular {step}s
// //               </span>
// //             </div>
// //           )}
          
// //           {searchQuery.length >= 2 && suggestions.length > 0 && (
// //             <div className="px-3 py-2 bg-gray-50 border-b border-gray-100">
// //               <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
// //                 {suggestions[0]?.type === 'general' ? '🌐 TMDB People Search' : '🔍 Filtered Results'}
// //               </span>
// //             </div>
// //           )}
          
// //           {/* Suggestions List */}
// //           <div className="py-1">
// //             {isLoading ? (
// //               <div className="flex items-center justify-center py-4">
// //                 <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mr-2"></div>
// //                 <span className="text-sm text-gray-500">Filtering options...</span>
// //               </div>
// //             ) : displaySuggestions.length > 0 ? (
// //               displaySuggestions.map((person, index) => (
// //                 <div
// //                   key={`${person.name}-${index}`}
// //                   className={`px-3 py-2 cursor-pointer transition-colors duration-150 ${
// //                     selectedIndex === index 
// //                       ? 'bg-indigo-50 text-indigo-900' 
// //                       : 'hover:bg-gray-50'
// //                   }`}
// //                   onClick={() => handleSelect(person)}
// //                 >
// //                   <div className="flex items-center justify-between">
// //                     <div className="flex-1 min-w-0">
// //                       <div className="flex items-center gap-2 mb-1">
// //                         <span className="font-medium text-gray-900 truncate">
// //                           {person.name}
// //                         </span>
// //                         {person.type === 'popular' && (
// //                           <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
// //                             Popular
// //                           </span>
// //                         )}
// //                         {person.type === 'search' && (
// //                           <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
// //                             Specific
// //                           </span>
// //                         )}
// //                         {person.type === 'general' && (
// //                           <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
// //                             TMDB
// //                           </span>
// //                         )}
// //                       </div>
// //                       {person.known_for && person.known_for.length > 0 && (
// //                         <div className="text-xs text-gray-500 truncate">
// //                           {person.known_for.slice(0, 2).join(", ")}
// //                         </div>
// //                       )}
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))
// //             ) : searchQuery.length >= 2 ? (
// //               <div className="px-3 py-4 text-center">
// //                 <span className="text-sm text-gray-500">No results for "{searchQuery}"</span>
// //                 <div className="text-xs text-gray-400 mt-1">
// //                   💡 Press Enter to use this custom name
// //                 </div>
// //               </div>
// //             ) : null}
// //           </div>
          
// //           {/* Custom input hint */}
// //           {searchQuery.length > 0 && !displaySuggestions.some(person => 
// //             person.name && person.name.toLowerCase() === searchQuery.toLowerCase()
// //           ) && displaySuggestions.length > 0 && (
// //             <div className="px-3 py-2 border-t border-gray-100 bg-gray-50">
// //               <div className="text-xs text-gray-600">
// //                 💡 Press Enter to use: "<strong>{searchQuery}</strong>"
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default EnhancedSearchableInput;

// import { useState, useEffect } from "react";

// const popularOptions = {
//   "Director": [
//     "S.S. Rajamouli", "Christopher Nolan", "Karan Johar", "Rohit Shetty", 
//     "Martin Scorsese", "Quentin Tarantino", "Steven Spielberg", "Anurag Kashyap"
//   ],
//   "Cast 1": [
//     "Shah Rukh Khan", "Leonardo DiCaprio", "Salman Khan", "Prabhas", 
//     "Tom Cruise", "Aamir Khan", "Robert Downey Jr.", "Hrithik Roshan"
//   ],
//   "Cast 2": [
//     "Deepika Padukone", "Scarlett Johansson", "Alia Bhatt", "Emma Stone", 
//     "Katrina Kaif", "Margot Robbie", "Priyanka Chopra", "Jennifer Lawrence"
//   ],
//   "Cast 3": [
//     "Amitabh Bachchan", "Morgan Freeman", "Kamal Haasan", "Anthony Hopkins", 
//     "Naseeruddin Shah", "Samuel L. Jackson", "R Madhavan", "Gary Oldman"
//   ],
//   "Cast 4": [
//     "Kareena Kapoor", "Anne Hathaway", "Kiara Advani", "Amy Adams", 
//     "Taapsee Pannu", "Emma Watson", "Kriti Sanon", "Zendaya"
//   ],
//   "Music Director": [
//     "A.R. Rahman", "Hans Zimmer", "Santhosh Narayanan", "John Williams", 
//     "Pritam", "Ludwig Göransson", "Amit Trivedi", "Trent Reznor"
//   ],
//   "Lead Singer": [
//     "Diljit Dosanjh", "Arijit Singh", "Shreya Ghoshal", 
//     "Rahat Fateh Ali Khan", "Sunidhi Chauhan", "Armaan Malik", 
//     "Asees Kaur", "Shaan", "Various Artists", "Playback Singer"
//   ]
// };

// function EnhancedSearchableInput({ step, value, onChange, onSelect }) {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [popularSuggestions, setPopularSuggestions] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [selectedIndex, setSelectedIndex] = useState(-1);

//   // Helper function to determine what profession we're looking for
//   const getExpectedProfession = (step) => {
//     if (step === "Director") return "Directing";
//     if (step.includes("Cast")) return "Acting";
//     if (step === "Music Director") return "Sound";
//     if (step === "Lead Singer") return "Sound";
//     return null;
//   };

//   // Helper function to check if person matches the expected profession
//   const isProfessionMatch = (person, expectedProfession) => {
//     if (!expectedProfession) return true;
    
//     // If no known_for_department, check if they appear in relevant content
//     if (!person.known_for_department) {
//       return checkRelevantContent(person, expectedProfession);
//     }
    
//     // Handle different profession mappings
//     const knownFor = person.known_for_department.toLowerCase();
//     const expected = expectedProfession.toLowerCase();
    
//     // Direct matches
//     if (expected === "directing" && knownFor === "directing") return true;
//     if (expected === "acting" && knownFor === "acting") return true;
//     if (expected === "sound" && knownFor === "sound") return true;
    
//     // Cross-talent matches - people who do multiple things
//     if (expected === "acting") {
//       // Singers/musicians who also act
//       if (knownFor === "sound") return checkActingCredits(person);
//     }
    
//     if (expected === "sound") {
//       // Actors who also sing/do music
//       if (knownFor === "acting") return checkMusicCredits(person);
//     }
    
//     return false;
//   };

//   // Check if person has acting credits (for singers who also act)
//   const checkActingCredits = (person) => {
//     if (person.known_for && Array.isArray(person.known_for)) {
//       return person.known_for.some(work => 
//         work.media_type === 'movie' || work.media_type === 'tv'
//       );
//     }
//     return false;
//   };

//   // Check if person has music/sound credits (for actors who also sing)
//   const checkMusicCredits = (person) => {
//     // This is harder to detect from TMDB data, so we'll be more lenient
//     // Could check if their name appears in music-related searches
//     return true; // Allow actors to appear in singer searches
//   };

//   // Check if person appears in relevant content when no department is specified
//   const checkRelevantContent = (person, expectedProfession) => {
//     if (!person.known_for || !Array.isArray(person.known_for)) return true;
    
//     const expected = expectedProfession.toLowerCase();
    
//     // For directors, they might appear as actors in their known_for but actually be directors
//     if (expected === "directing") return true;
    
//     // For actors and singers, check if they appear in movies/TV
//     if (expected === "acting" || expected === "sound") {
//       return person.known_for.some(work => 
//         work.media_type === 'movie' || work.media_type === 'tv'
//       );
//     }
    
//     return true;
//   };

//   // Clear input when step changes
//   useEffect(() => {
//     setSearchQuery("");
//     setSuggestions([]);
//     setShowDropdown(false);
//     setSelectedIndex(-1);
//   }, [step]);

//   // Sync searchQuery with value prop when it changes (auto-fill scenario)
//   useEffect(() => {
//     if (value && value !== searchQuery) {
//       setSearchQuery(value);
//     }
//   }, [value]);

//   // Load popular suggestions on mount
//   useEffect(() => {
//     if (popularOptions[step]) {
//       setPopularSuggestions(
//         popularOptions[step].map(name => ({
//           name,
//           type: 'popular',
//           known_for_department: getExpectedProfession(step)
//         }))
//       );
//     }
//   }, [step]);

//   // Enhanced search with intelligent profession filtering
//   const searchPeople = async (query) => {
//     if (query.length < 2) {
//       setSuggestions([]);
//       return;
//     }

//     setIsLoading(true);
    
//     try {
//       let results = [];
//       const expectedProfession = getExpectedProfession(step);
      
//       // Use general person search since specific endpoints don't exist
//       try {
//         const response = await fetch(`http://127.0.0.1:8001/search/person?q=${encodeURIComponent(query)}&limit=20`);
//         if (response.ok) {
//           const data = await response.json();
//           let allResults = data.results || [];
          
//           // Filter results based on profession (but be more inclusive)
//           if (expectedProfession) {
//             const professionMatches = allResults.filter(person => 
//               isProfessionMatch(person, expectedProfession)
//             );
            
//             // Always show some results - if profession matches exist, prioritize them
//             // but also include some general results for cross-talent individuals
//             if (professionMatches.length > 0) {
//               const otherResults = allResults.filter(person => 
//                 !isProfessionMatch(person, expectedProfession)
//               ).slice(0, 2); // Add a few non-matching results
              
//               results = [...professionMatches.slice(0, 6), ...otherResults];
//             } else {
//               results = allResults.slice(0, 8);
//             }
//           } else {
//             results = allResults.slice(0, 8);
//           }
          
//           // Add type and clean up results
//           results = results.map(person => ({
//             ...person,
//             type: 'search'
//           }));
//         }
//       } catch (error) {
//         console.error("General person search error:", error);
//       }
      
//       // If still no results, filter from popular options
//       if (results.length === 0) {
//         const filtered = popularSuggestions.filter(item => 
//           item.name.toLowerCase().includes(query.toLowerCase())
//         );
//         results = filtered;
//       }
      
//       setSuggestions(results);
      
//     } catch (error) {
//       console.error("Search error:", error);
//       setSuggestions([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       if (searchQuery && searchQuery.length >= 2) {
//         searchPeople(searchQuery);
//       } else {
//         setSuggestions([]);
//       }
//     }, 300);
//     return () => clearTimeout(timeoutId);
//   }, [searchQuery, step, popularSuggestions]);

//   const handleInputChange = (e) => {
//     const rawValue = e.target.value;
//     // Only allow letters, spaces, and common name characters like apostrophes, hyphens, and dots
//     const filteredValue = rawValue.replace(/[^a-zA-Z\s\-'.]/g, '');
    
//     setSearchQuery(filteredValue);
    
//     // Create a new event object with the filtered value
//     const filteredEvent = {
//       ...e,
//       target: {
//         ...e.target,
//         value: filteredValue
//       }
//     };
    
//     onChange(filteredEvent);
//     setShowDropdown(true);
//     setSelectedIndex(-1);
//   };

//   const handleSelect = (person) => {
//     const selectedName = person.name || person;
//     setSearchQuery(selectedName);
//     onSelect(selectedName);
//     setShowDropdown(false);
//     setSelectedIndex(-1);
//   };

//   const handleKeyDown = (e) => {
//     const allSuggestions = searchQuery.length >= 2 ? suggestions : popularSuggestions.slice(0, 6);
    
//     if (e.key === 'ArrowDown') {
//       e.preventDefault();
//       setSelectedIndex(prev => prev < allSuggestions.length - 1 ? prev + 1 : prev);
//     } else if (e.key === 'ArrowUp') {
//       e.preventDefault();
//       setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
//     } else if (e.key === 'Enter' && selectedIndex >= 0) {
//       e.preventDefault();
//       handleSelect(allSuggestions[selectedIndex]);
//     } else if (e.key === 'Enter' && selectedIndex === -1 && searchQuery.trim()) {
//       // Allow entering custom text on Enter
//       e.preventDefault();
//       handleSelect(searchQuery.trim());
//     } else if (e.key === 'Escape') {
//       setShowDropdown(false);
//       setSelectedIndex(-1);
//     }
//   };

//   const displaySuggestions = searchQuery.length >= 2 ? suggestions : popularSuggestions.slice(0, 6);
//   const hasContent = displaySuggestions.length > 0 || isLoading;

//   const getPlaceholder = (step) => {
//     if (step === "Director") return "Search for directors...";
//     if (step.includes("Cast")) return "Search for actors/actresses...";
//     if (step === "Music Director") return "Search for music directors...";
//     if (step === "Lead Singer") return "Search for singers...";
//     return `Search for ${step.toLowerCase()}...`;
//   };

//   // Get profession badge color and handle multi-talented individuals
//   const getProfessionBadge = (person) => {
//     if (person.type === 'popular') {
//       return (
//         <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
//           ⭐ Popular
//         </span>
//       );
//     }
    
//     // Check for multi-talented individuals
//     const isMultiTalented = person.known_for_department && (
//       (person.known_for_department.toLowerCase() === 'acting' && checkMusicCredits(person)) ||
//       (person.known_for_department.toLowerCase() === 'sound' && checkActingCredits(person))
//     );
    
//     if (isMultiTalented) {
//       return (
//         <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gradient-to-r from-blue-100 to-green-100 text-gray-800">
//           🎭🎵 Multi-Talent
//         </span>
//       );
//     }
    
//     if (person.known_for_department) {
//       const dept = person.known_for_department.toLowerCase();
//       if (dept === 'directing') {
//         return (
//           <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
//             🎬 Director
//           </span>
//         );
//       } else if (dept === 'acting') {
//         return (
//           <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
//             🎭 Actor
//           </span>
//         );
//       } else if (dept === 'sound') {
//         return (
//           <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
//             🎵 Music/Sound
//           </span>
//         );
//       }
//     }
    
//     return (
//       <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
//         👤 Person
//       </span>
//     );
//   };

//   return (
//     <div className="relative w-full">
//       {/* Input Field */}
//       <div className="relative">
//         <input
//           type="text"
//           className="w-full px-4 py-3 pr-10 text-sm border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-200"
//           placeholder={getPlaceholder(step)}
//           value={searchQuery}
//           onChange={handleInputChange}
//           onFocus={() => setShowDropdown(true)}
//           onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
//           onKeyDown={handleKeyDown}
//         />
        
//         {/* Input Icon */}
//         <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//           {isLoading ? (
//             <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
//           ) : (
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//           )}
//         </div>
//       </div>
      
//       {/* Dropdown */}
//       {showDropdown && hasContent && (
//         <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
//           {/* Header */}
//           {searchQuery.length < 2 && popularSuggestions.length > 0 && (
//             <div className="px-3 py-2 bg-gray-50 border-b border-gray-100">
//               <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
//                 ⭐ Popular {step}s
//               </span>
//             </div>
//           )}
          
//           {searchQuery.length >= 2 && suggestions.length > 0 && (
//             <div className="px-3 py-2 bg-gray-50 border-b border-gray-100">
//               <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
//                 🔍 Search Results for "{searchQuery}"
//               </span>
//             </div>
//           )}
          
//           {/* Suggestions List */}
//           <div className="py-1">
//             {isLoading ? (
//               <div className="flex items-center justify-center py-4">
//                 <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mr-2"></div>
//                 <span className="text-sm text-gray-500">Searching...</span>
//               </div>
//             ) : displaySuggestions.length > 0 ? (
//               displaySuggestions.map((person, index) => (
//                 <div
//                   key={`${person.name}-${index}`}
//                   className={`px-3 py-2 cursor-pointer transition-colors duration-150 ${
//                     selectedIndex === index 
//                       ? 'bg-indigo-50 text-indigo-900' 
//                       : 'hover:bg-gray-50'
//                   }`}
//                   onClick={() => handleSelect(person)}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-center gap-2 mb-1">
//                         <span className="font-medium text-gray-900 truncate">
//                           {person.name}
//                         </span>
//                         {getProfessionBadge(person) && getProfessionBadge(person)}
//                       </div>
//                       {person.known_for && person.known_for.length > 0 && (
//                         <div className="text-xs text-gray-500 truncate">
//                           Known for: {person.known_for.slice(0, 2).join(", ")}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : searchQuery.length >= 2 ? (
//               <div className="px-3 py-4 text-center">
//                 <span className="text-sm text-gray-500">No results for "{searchQuery}"</span>
//                 <div className="text-xs text-gray-400 mt-1">
//                   💡 Press Enter to use this custom name
//                 </div>
//               </div>
//             ) : null}
//           </div>
          
//           {/* Custom input hint */}
//           {searchQuery.length > 0 && !displaySuggestions.some(person => 
//             person.name && person.name.toLowerCase() === searchQuery.toLowerCase()
//           ) && displaySuggestions.length > 0 && (
//             <div className="px-3 py-2 border-t border-gray-100 bg-gray-50">
//               <div className="text-xs text-gray-600">
//                 💡 Press Enter to use: "<strong>{searchQuery}</strong>"
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default EnhancedSearchableInput;
import { useState, useEffect } from "react";

const popularOptions = {
  "Director": [
    "S.S. Rajamouli", "Christopher Nolan", "Karan Johar", "Rohit Shetty", 
    "Martin Scorsese", "Quentin Tarantino", "Steven Spielberg", "Anurag Kashyap"
  ],
  "Cast 1": [
    "Shah Rukh Khan", "Leonardo DiCaprio", "Salman Khan", "Prabhas", 
    "Tom Cruise", "Aamir Khan", "Robert Downey Jr.", "Hrithik Roshan"
  ],
  "Cast 2": [
    "Deepika Padukone", "Scarlett Johansson", "Alia Bhatt", "Emma Stone", 
    "Katrina Kaif", "Margot Robbie", "Priyanka Chopra", "Jennifer Lawrence"
  ],
  "Cast 3": [
    "Amitabh Bachchan", "Morgan Freeman", "Kamal Haasan", "Anthony Hopkins", 
    "Naseeruddin Shah", "Samuel L. Jackson", "R Madhavan", "Gary Oldman"
  ],
  "Cast 4": [
    "Kareena Kapoor", "Anne Hathaway", "Kiara Advani", "Amy Adams", 
    "Taapsee Pannu", "Emma Watson", "Kriti Sanon", "Zendaya"
  ],
  "Music Director": [
    "A.R. Rahman", "Hans Zimmer", "Santhosh Narayanan", "John Williams", 
    "Pritam", "Ludwig Göransson", "Amit Trivedi", "Trent Reznor"
  ],
  "Lead Singer": [
    "Diljit Dosanjh", "Arijit Singh", "Shreya Ghoshal", 
    "Rahat Fateh Ali Khan", "Sunidhi Chauhan", "Armaan Malik", 
    "Asees Kaur", "Shaan", "Various Artists", "Playback Singer"
  ]
};

function EnhancedSearchableInput({ step, value, onChange, onSelect }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [popularSuggestions, setPopularSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Helper function to determine what profession we're looking for
  const getExpectedProfession = (step) => {
    if (step === "Director") return "Directing";
    if (step.includes("Cast")) return "Acting";
    if (step === "Music Director") return "Sound";
    if (step === "Lead Singer") return "Sound";
    return null;
  };

  // Helper function to check if person matches the expected profession
  const isProfessionMatch = (person, expectedProfession) => {
    if (!expectedProfession) return true;
    
    // If no known_for_department, check if they appear in relevant content
    if (!person.known_for_department) {
      return checkRelevantContent(person, expectedProfession);
    }
    
    // Handle different profession mappings
    const knownFor = person.known_for_department.toLowerCase();
    const expected = expectedProfession.toLowerCase();
    
    // Direct matches
    if (expected === "directing" && knownFor === "directing") return true;
    if (expected === "acting" && knownFor === "acting") return true;
    if (expected === "sound" && knownFor === "sound") return true;
    
    // Cross-talent matches - people who do multiple things
    if (expected === "acting") {
      // Singers/musicians who also act
      if (knownFor === "sound") return checkActingCredits(person);
    }
    
    if (expected === "sound") {
      // Actors who also sing/do music
      if (knownFor === "acting") return checkMusicCredits(person);
    }
    
    return false;
  };

  // Check if person has acting credits (for singers who also act)
  const checkActingCredits = (person) => {
    if (person.known_for && Array.isArray(person.known_for)) {
      return person.known_for.some(work => 
        work.media_type === 'movie' || work.media_type === 'tv'
      );
    }
    return false;
  };

  // Check if person has music/sound credits (for actors who also sing)
  const checkMusicCredits = (person) => {
    // This is harder to detect from TMDB data, so we'll be more lenient
    // Could check if their name appears in music-related searches
    return true; // Allow actors to appear in singer searches
  };

  // Check if person appears in relevant content when no department is specified
  const checkRelevantContent = (person, expectedProfession) => {
    if (!person.known_for || !Array.isArray(person.known_for)) return true;
    
    const expected = expectedProfession.toLowerCase();
    
    // For directors, they might appear as actors in their known_for but actually be directors
    if (expected === "directing") return true;
    
    // For actors and singers, check if they appear in movies/TV
    if (expected === "acting" || expected === "sound") {
      return person.known_for.some(work => 
        work.media_type === 'movie' || work.media_type === 'tv'
      );
    }
    
    return true;
  };

  // Clear input when step changes
  useEffect(() => {
    setSearchQuery("");
    setSuggestions([]);
    setShowDropdown(false);
    setSelectedIndex(-1);
  }, [step]);

  // Sync searchQuery with value prop when it changes (auto-fill scenario)
  useEffect(() => {
    if (value && value !== searchQuery) {
      setSearchQuery(value);
    }
  }, [value]);

  // Load popular suggestions on mount
  useEffect(() => {
    if (popularOptions[step]) {
      setPopularSuggestions(
        popularOptions[step].map(name => ({
          name,
          type: 'popular',
          known_for_department: getExpectedProfession(step)
        }))
      );
    }
  }, [step]);

  // Enhanced search with intelligent profession filtering
  const searchPeople = async (query) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    
    try {
      let results = [];
      const expectedProfession = getExpectedProfession(step);
      
      // Use general person search since specific endpoints don't exist
      try {
        const response = await fetch(`https://box-office-tool-backend.onrender.com/search/person?q=${encodeURIComponent(query)}&limit=20`);
        if (response.ok) {
          const data = await response.json();
          let allResults = data.results || [];
          
          // Filter results based on profession (but be more inclusive)
          if (expectedProfession) {
            const professionMatches = allResults.filter(person => 
              isProfessionMatch(person, expectedProfession)
            );
            
            // Always show some results - if profession matches exist, prioritize them
            // but also include some general results for cross-talent individuals
            if (professionMatches.length > 0) {
              const otherResults = allResults.filter(person => 
                !isProfessionMatch(person, expectedProfession)
              ).slice(0, 2); // Add a few non-matching results
              
              results = [...professionMatches.slice(0, 6), ...otherResults];
            } else {
              results = allResults.slice(0, 8);
            }
          } else {
            results = allResults.slice(0, 8);
          }
          
          // Add type and clean up results
          results = results.map(person => ({
            ...person,
            type: 'search'
          }));
        }
      } catch (error) {
        console.error("General person search error:", error);
      }
      
      // If still no results, filter from popular options
      if (results.length === 0) {
        const filtered = popularSuggestions.filter(item => 
          item.name.toLowerCase().includes(query.toLowerCase())
        );
        results = filtered;
      }
      
      setSuggestions(results);
      
    } catch (error) {
      console.error("Search error:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery && searchQuery.length >= 2) {
        searchPeople(searchQuery);
      } else {
        setSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, step, popularSuggestions]);

  const handleInputChange = (e) => {
    const rawValue = e.target.value;
    // Only allow letters, spaces, and common name characters like apostrophes, hyphens, and dots
    const filteredValue = rawValue.replace(/[^a-zA-Z\s\-'.]/g, '');
    
    setSearchQuery(filteredValue);
    
    // Create a new event object with the filtered value
    const filteredEvent = {
      ...e,
      target: {
        ...e.target,
        value: filteredValue
      }
    };
    
    onChange(filteredEvent);
    setShowDropdown(true);
    setSelectedIndex(-1);
  };

  const handleSelect = (person) => {
    const selectedName = person.name || person;
    setSearchQuery(selectedName);
    onSelect(selectedName);
    setShowDropdown(false);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e) => {
    const allSuggestions = searchQuery.length >= 2 ? suggestions : popularSuggestions.slice(0, 6);
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => prev < allSuggestions.length - 1 ? prev + 1 : prev);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleSelect(allSuggestions[selectedIndex]);
    } else if (e.key === 'Enter' && selectedIndex === -1 && searchQuery.trim()) {
      // Allow entering custom text on Enter
      e.preventDefault();
      handleSelect(searchQuery.trim());
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
      setSelectedIndex(-1);
    }
  };

  const displaySuggestions = searchQuery.length >= 2 ? suggestions : popularSuggestions.slice(0, 6);
  const hasContent = displaySuggestions.length > 0 || isLoading;

  const getPlaceholder = (step) => {
    if (step === "Director") return "Search for directors...";
    if (step.includes("Cast")) return "Search for actors/actresses...";
    if (step === "Music Director") return "Search for music directors...";
    if (step === "Lead Singer") return "Search for singers...";
    return `Search for ${step.toLowerCase()}...`;
  };

  // Get profession badge color and handle multi-talented individuals
  const getProfessionBadge = (person) => {
    // Don't show badges for popular suggestions
    if (person.type === 'popular') {
      return null;
    }
    
    // Check for multi-talented individuals
    const isMultiTalented = person.known_for_department && (
      (person.known_for_department.toLowerCase() === 'acting' && checkMusicCredits(person)) ||
      (person.known_for_department.toLowerCase() === 'sound' && checkActingCredits(person))
    );
    
    if (isMultiTalented) {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gradient-to-r from-blue-100 to-green-100 text-gray-800">
          🎭🎵 Multi-Talent
        </span>
      );
    }
    
    if (person.known_for_department) {
      const dept = person.known_for_department.toLowerCase();
      if (dept === 'directing') {
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
            🎬 Director
          </span>
        );
      } else if (dept === 'acting') {
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
            🎭 Actor
          </span>
        );
      } else if (dept === 'sound') {
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
            🎵 Music/Sound
          </span>
        );
      }
    }
    
    // Don't show generic "Person" badge - return null instead
    return null;
  };

  return (
    <div className="relative w-full">
      {/* Input Field */}
      <div className="relative">
        <input
          type="text"
          className="w-full px-4 py-3 pr-10 text-sm border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-200"
          placeholder={getPlaceholder(step)}
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          onKeyDown={handleKeyDown}
        />
        
        {/* Input Icon */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </div>
      </div>
      
      {/* Dropdown */}
      {showDropdown && hasContent && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
          {/* Header */}
          {searchQuery.length < 2 && popularSuggestions.length > 0 && (
            <div className="px-3 py-2 bg-gray-50 border-b border-gray-100">
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                🌟 Suggested {step}s
              </span>
            </div>
          )}
          
          {searchQuery.length >= 2 && suggestions.length > 0 && (
            <div className="px-3 py-2 bg-gray-50 border-b border-gray-100">
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                🔍 Search Results for "{searchQuery}"
              </span>
            </div>
          )}
          
          {/* Suggestions List */}
          <div className="py-1">
            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mr-2"></div>
                <span className="text-sm text-gray-500">Searching...</span>
              </div>
            ) : displaySuggestions.length > 0 ? (
              displaySuggestions.map((person, index) => (
                <div
                  key={`${person.name}-${index}`}
                  className={`px-3 py-2 cursor-pointer transition-colors duration-150 ${
                    selectedIndex === index 
                      ? 'bg-indigo-50 text-indigo-900' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleSelect(person)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900 truncate">
                          {person.name}
                        </span>
                        {getProfessionBadge(person)}
                      </div>
                      {person.known_for && person.known_for.length > 0 && (
                        <div className="text-xs text-gray-500 truncate">
                          Known for: {person.known_for.slice(0, 2).join(", ")}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : searchQuery.length >= 2 ? (
              <div className="px-3 py-4 text-center">
                <span className="text-sm text-gray-500">No results for "{searchQuery}"</span>
                <div className="text-xs text-gray-400 mt-1">
                  💡 Press Enter to use this custom name
                </div>
              </div>
            ) : null}
          </div>
          
          {/* Custom input hint */}
          {searchQuery.length > 0 && !displaySuggestions.some(person => 
            person.name && person.name.toLowerCase() === searchQuery.toLowerCase()
          ) && displaySuggestions.length > 0 && (
            <div className="px-3 py-2 border-t border-gray-100 bg-gray-50">
              <div className="text-xs text-gray-600">
                💡 Press Enter to use: "<strong>{searchQuery}</strong>"
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default EnhancedSearchableInput;