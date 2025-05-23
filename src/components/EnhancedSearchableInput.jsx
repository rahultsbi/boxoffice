// // // components/EnhancedSearchableInput.jsx
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
// //                   ? `Search any ${step.toLowerCase()} from TMDB...` 
// //                   : `Searching TMDB database...`)
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
// //               <p>🔍 TMDB Search Results</p>
// //             </div>
// //           )}
          
// //           <div className="suggestions-list">
// //             {isLoading ? (
// //               <div className="loading-state">
// //                 <div className="loading-content">
// //                   <div className="loading-spinner"></div>
// //                   <span>Searching TMDB...</span>
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
// //                           <span className="badge tmdb-badge">TMDB</span>
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
// //                           TMDB Rating: {person.popularity?.toFixed(1)}
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
// //                   <p>No TMDB results for "{searchQuery}"</p>
// //                   <p className="no-results-hint">Try different spelling or search terms</p>
// //                 </div>
// //               </div>
// //             ) : null}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default EnhancedSearchableInput;
// // components/EnhancedSearchableInput.jsx - TAILWIND VERSION

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

//   const getSearchEndpoint = (step) => {
//     if (step === "Director") return "/search/directors";
//     if (step.includes("Cast")) return "/search/actors";
//     if (step === "Music Director") return "/search/music-directors";
//     if (step === "Lead Singer") return "/search/singers";
//     return null;
//   };

//   const supportsApiSearch = (step) => {
//     return ["Director", "Music Director", "Lead Singer"].includes(step) || step.includes("Cast");
//   };

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
//           popularity: 0,
//           type: 'popular'
//         }))
//       );
//     }
//   }, [step]);

//   const searchPeople = async (query) => {
//     if (query.length < 2) {
//       setSuggestions([]);
//       return;
//     }

//     setIsLoading(true);
//     const endpoint = getSearchEndpoint(step);
    
//     if (!endpoint) {
//       const filtered = popularSuggestions.filter(item => 
//         item.name.toLowerCase().includes(query.toLowerCase())
//       );
//       setSuggestions(filtered);
//       setIsLoading(false);
//       return;
//     }
    
//     try {
//       const response = await fetch(`http://localhost:8000${endpoint}?q=${encodeURIComponent(query)}&limit=6`);
//       if (response.ok) {
//         const data = await response.json();
//         setSuggestions(data.results?.map(person => ({...person, type: 'search'})) || []);
//       }
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
//   }, [searchQuery, step]);

//   const handleInputChange = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     onChange(e);
//     setShowDropdown(true);
//     setSelectedIndex(-1);
//   };

//   const handleSelect = (person) => {
//     const selectedName = person.name;
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
//     } else if (e.key === 'Escape') {
//       setShowDropdown(false);
//       setSelectedIndex(-1);
//     }
//   };

//   const displaySuggestions = searchQuery.length >= 2 ? suggestions : popularSuggestions.slice(0, 6);
//   const hasContent = displaySuggestions.length > 0 || isLoading;

//   return (
//     <div className="relative w-full">
//       {/* Input Field */}
//       <div className="relative">
//         <input
//           type="text"
//           className="w-full px-4 py-3 pr-10 text-sm border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-200"
//           placeholder={
//             supportsApiSearch(step)
//               ? `Search ${step.toLowerCase()} from TMDB...` 
//               : `Select ${step.toLowerCase()}...`
//           }
//           value={searchQuery}
//           onChange={handleInputChange}
//           onFocus={() => setShowDropdown(true)}
//           onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
//           onKeyDown={handleKeyDown}
//         />
        
//         {/* Search Icon */}
//         <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//           {isLoading ? (
//             <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
//           ) : supportsApiSearch(step) ? (
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//           ) : (
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
//                 🌟 Popular {step}s
//               </span>
//             </div>
//           )}
          
//           {searchQuery.length >= 2 && suggestions.length > 0 && (
//             <div className="px-3 py-2 bg-gray-50 border-b border-gray-100">
//               <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
//                 🔍 TMDB Results
//               </span>
//             </div>
//           )}
          
//           {/* Suggestions List */}
//           <div className="py-1">
//             {isLoading ? (
//               <div className="flex items-center justify-center py-4">
//                 <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mr-2"></div>
//                 <span className="text-sm text-gray-500">Searching TMDB...</span>
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
//                         {person.type === 'popular' && (
//                           <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
//                             Popular
//                           </span>
//                         )}
//                         {person.type === 'search' && (
//                           <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
//                             TMDB
//                           </span>
//                         )}
//                       </div>
//                       {person.known_for && person.known_for.length > 0 && (
//                         <div className="text-xs text-gray-500 truncate">
//                           {person.known_for.slice(0, 2).join(", ")}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : searchQuery.length >= 2 ? (
//               <div className="px-3 py-4 text-center">
//                 <span className="text-sm text-gray-500">No results for "{searchQuery}"</span>
//               </div>
//             ) : null}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default EnhancedSearchableInput;


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

//   const getSearchEndpoint = (step) => {
//     if (step === "Director") return "/search/directors";
//     if (step.includes("Cast")) return "/search/actors";
//     if (step === "Music Director") return "/search/music-directors";
//     if (step === "Lead Singer") return "/search/singers";
//     return null;
//   };

//   const supportsApiSearch = (step) => {
//     return ["Director", "Music Director", "Lead Singer"].includes(step) || step.includes("Cast");
//   };

//   // 🔥 FIX: Clear input when step changes
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
//           popularity: 0,
//           type: 'popular'
//         }))
//       );
//     }
//   }, [step]);

//   const searchPeople = async (query) => {
//     if (query.length < 2) {
//       setSuggestions([]);
//       return;
//     }

//     setIsLoading(true);
//     const endpoint = getSearchEndpoint(step);
    
//     if (!endpoint) {
//       const filtered = popularSuggestions.filter(item => 
//         item.name.toLowerCase().includes(query.toLowerCase())
//       );
//       setSuggestions(filtered);
//       setIsLoading(false);
//       return;
//     }
    
//     try {
//       const response = await fetch(`http://localhost:8000${endpoint}?q=${encodeURIComponent(query)}&limit=6`);
//       if (response.ok) {
//         const data = await response.json();
//         setSuggestions(data.results?.map(person => ({...person, type: 'search'})) || []);
//       }
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
//   }, [searchQuery, step]);

// //   const handleInputChange = (e) => {
// //     const query = e.target.value;
// //     setSearchQuery(query);
// //     onChange(e);
// //     setShowDropdown(true);
// //     setSelectedIndex(-1);
// //   };
// const handleInputChange = (e) => {
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
//     const selectedName = person.name;
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
//     } else if (e.key === 'Escape') {
//       setShowDropdown(false);
//       setSelectedIndex(-1);
//     }
//   };

//   const displaySuggestions = searchQuery.length >= 2 ? suggestions : popularSuggestions.slice(0, 6);
//   const hasContent = displaySuggestions.length > 0 || isLoading;

//   return (
//     <div className="relative w-full">
//       {/* Input Field */}
//       <div className="relative">
//         <input
//           type="text"
//           className="w-full px-4 py-3 pr-10 text-sm border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-200"
//           placeholder={
//             supportsApiSearch(step)
//               ? `Search ${step.toLowerCase()} from TMDB...` 
//               : `Select ${step.toLowerCase()}...`
//           }
//           value={searchQuery}
//           onChange={handleInputChange}
//           onFocus={() => setShowDropdown(true)}
//           onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
//           onKeyDown={handleKeyDown}
//         />
        
//         {/* Search Icon */}
//         <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//           {isLoading ? (
//             <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
//           ) : supportsApiSearch(step) ? (
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//           ) : (
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
//                 🌟 Popular {step}s
//               </span>
//             </div>
//           )}
          
//           {searchQuery.length >= 2 && suggestions.length > 0 && (
//             <div className="px-3 py-2 bg-gray-50 border-b border-gray-100">
//               <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
//                 🔍 TMDB Results
//               </span>
//             </div>
//           )}
          
//           {/* Suggestions List */}
//           <div className="py-1">
//             {isLoading ? (
//               <div className="flex items-center justify-center py-4">
//                 <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mr-2"></div>
//                 <span className="text-sm text-gray-500">Searching TMDB...</span>
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
//                         {person.type === 'popular' && (
//                           <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
//                             Popular
//                           </span>
//                         )}
//                         {person.type === 'search' && (
//                           <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
//                             TMDB
//                           </span>
//                         )}
//                       </div>
//                       {person.known_for && person.known_for.length > 0 && (
//                         <div className="text-xs text-gray-500 truncate">
//                           {person.known_for.slice(0, 2).join(", ")}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : searchQuery.length >= 2 ? (
//               <div className="px-3 py-4 text-center">
//                 <span className="text-sm text-gray-500">No results for "{searchQuery}"</span>
//               </div>
//             ) : null}
//           </div>
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

  const getSearchEndpoint = (step) => {
    if (step === "Director") return "/search/directors";
    if (step.includes("Cast")) return "/search/actors";
    if (step === "Music Director") return "/search/music-directors";
    if (step === "Lead Singer") return "/search/singers";
    return null;
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
          popularity: 0,
          type: 'popular'
        }))
      );
    }
  }, [step]);

  // Enhanced search with fallback to general person search
  const searchPeople = async (query) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    
    try {
      let results = [];
      
      // Step 1: Try specific endpoint first (directors, actors, etc.)
      const endpoint = getSearchEndpoint(step);
      if (endpoint) {
        try {
          const response = await fetch(`https://box-office-tool-backend.onrender.com/${endpoint}?q=${encodeURIComponent(query)}&limit=6`);
          if (response.ok) {
            const data = await response.json();
            results = data.results?.map(person => ({...person, type: 'search'})) || [];
          }
        } catch (error) {
          console.error(`Specific search error for ${endpoint}:`, error);
        }
      }
      
      // Step 2: If no results from specific endpoint, try general person search
      if (results.length === 0) {
        try {
          const response = await fetch(`https://box-office-tool-backend.onrender.com/search/person?q=${encodeURIComponent(query)}&limit=8`);
          if (response.ok) {
            const data = await response.json();
            results = data.results?.map(person => ({...person, type: 'general'})) || [];
          }
        } catch (error) {
          console.error("General person search error:", error);
        }
      }
      
      // Step 3: If still no results, filter from popular options
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
    if (step === "Director") return "Type director name...";
    if (step.includes("Cast")) return "Type actor/actress name...";
    if (step === "Music Director") return "Type music director name...";
    if (step === "Lead Singer") return "Type singer name...";
    return `Type ${step.toLowerCase()}...`;
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
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
                🌟 Popular {step}s
              </span>
            </div>
          )}
          
          {searchQuery.length >= 2 && suggestions.length > 0 && (
            <div className="px-3 py-2 bg-gray-50 border-b border-gray-100">
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                {suggestions[0]?.type === 'general' ? '🌐 TMDB People Search' : '🔍 Filtered Results'}
              </span>
            </div>
          )}
          
          {/* Suggestions List */}
          <div className="py-1">
            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mr-2"></div>
                <span className="text-sm text-gray-500">Filtering options...</span>
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
                        {person.type === 'popular' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                            Popular
                          </span>
                        )}
                        {person.type === 'search' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                            Specific
                          </span>
                        )}
                        {person.type === 'general' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            TMDB
                          </span>
                        )}
                      </div>
                      {person.known_for && person.known_for.length > 0 && (
                        <div className="text-xs text-gray-500 truncate">
                          {person.known_for.slice(0, 2).join(", ")}
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