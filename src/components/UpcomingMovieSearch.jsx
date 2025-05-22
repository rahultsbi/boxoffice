// // components/UpcomingMovieSearch.jsx
// import { useState, useEffect } from "react";

// function UpcomingMovieSearch({ onMovieSelect, onClose }) {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedMovie, setSelectedMovie] = useState(null);
//   const [movieDetails, setMovieDetails] = useState(null);

//   const searchUpcomingMovies = async (query) => {
//     if (query.length < 2) {
//       setSearchResults([]);
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const response = await fetch(`http://localhost:8000/search/upcoming-movies?q=${encodeURIComponent(query)}&limit=10`);
//       if (response.ok) {
//         const data = await response.json();
//         setSearchResults(data.results || []);
//       }
//     } catch (error) {
//       console.error("Search error:", error);
//       setSearchResults([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getMovieDetails = async (movieId) => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(`http://localhost:8000/movie-details/${movieId}`);
//       if (response.ok) {
//         const data = await response.json();
//         setMovieDetails(data);
//       }
//     } catch (error) {
//       console.error("Error fetching movie details:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       if (searchQuery) {
//         searchUpcomingMovies(searchQuery);
//       } else {
//         setSearchResults([]);
//       }
//     }, 300);
//     return () => clearTimeout(timeoutId);
//   }, [searchQuery]);

//   const handleMovieSelect = (movie) => {
//     setSelectedMovie(movie);
//     getMovieDetails(movie.id);
//   };

//   const handleUseMovie = () => {
//     if (movieDetails) {
//       onMovieSelect(movieDetails);
//       onClose();
//     }
//   };

//   return (
//     <div className="upcoming-movie-overlay">
//       <div className="upcoming-movie-modal">
//         <div className="modal-header">
//           <h3>🎬 Search Upcoming Movies</h3>
//           <p className="modal-subtitle">Auto-fill with real TMDB movie data</p>
//           <button className="close-button" onClick={onClose}>×</button>
//         </div>
        
//         <div className="search-section">
//           <div className="search-input-container">
//             <input
//               type="text"
//               className="movie-search-input"
//               placeholder="Search upcoming movies from TMDB..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             {isLoading && <div className="search-loading-spinner"></div>}
//           </div>
          
//           {searchResults.length > 0 && (
//             <div className="search-results-list">
//               {searchResults.map((movie) => (
//                 <div
//                   key={movie.id}
//                   className={`movie-result-item ${selectedMovie?.id === movie.id ? 'selected' : ''}`}
//                   onClick={() => handleMovieSelect(movie)}
//                 >
//                   <div className="movie-poster">
//                     {movie.poster_path ? (
//                       <img
//                         src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
//                         alt={movie.title}
//                         onError={(e) => {
//                           e.target.style.display = 'none';
//                           e.target.nextSibling.style.display = 'flex';
//                         }}
//                       />
//                     ) : null}
//                     <div className="poster-placeholder" style={{ display: movie.poster_path ? 'none' : 'flex' }}>
//                       🎬
//                     </div>
//                   </div>
//                   <div className="movie-info">
//                     <h4 className="movie-title">{movie.title}</h4>
//                     <p className="movie-release">Release: {movie.release_date || 'TBA'}</p>
//                     <p className="movie-overview">
//                       {movie.overview ? movie.overview.substring(0, 100) + '...' : 'No description available'}
//                     </p>
//                   </div>
//                   <div className="movie-rating">
//                     ⭐ {movie.vote_average?.toFixed(1) || 'N/A'}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {movieDetails && (
//           <div className="movie-details-section">
//             <h4>📋 Movie Details</h4>
//             <div className="details-grid">
//               <div className="detail-item">
//                 <span className="detail-label">Title:</span>
//                 <span className="detail-value">{movieDetails.title}</span>
//               </div>
//               <div className="detail-item">
//                 <span className="detail-label">Director:</span>
//                 <span className="detail-value">{movieDetails.director || 'Unknown'}</span>
//               </div>
//               <div className="detail-item">
//                 <span className="detail-label">Genre:</span>
//                 <span className="detail-value">{movieDetails.primary_genre || 'Unknown'}</span>
//               </div>
//               <div className="detail-item">
//                 <span className="detail-label">Release Date:</span>
//                 <span className="detail-value">{movieDetails.release_date || 'TBA'}</span>
//               </div>
//               <div className="detail-item">
//                 <span className="detail-label">Cast:</span>
//                 <span className="detail-value">
//                   {[movieDetails.cast_1, movieDetails.cast_2, movieDetails.cast_3, movieDetails.cast_4]
//                     .filter(Boolean)
//                     .slice(0, 2)
//                     .join(', ') || 'Unknown'}
//                 </span>
//               </div>
//               <div className="detail-item">
//                 <span className="detail-label">Music Director:</span>
//                 <span className="detail-value">{movieDetails.music_director || 'Unknown'}</span>
//               </div>
//             </div>
            
//             <div className="movie-actions">
//               <button className="use-movie-button" onClick={handleUseMovie}>
//                 ✨ Use This Movie for Prediction
//               </button>
//               <p className="movie-action-hint">
//                 This will auto-fill all cast/crew with TMDB data
//               </p>
//             </div>
//           </div>
//         )}

//         {searchQuery && searchResults.length === 0 && !isLoading && (
//           <div className="no-results-message">
//             <p>🔍 No upcoming movies found for "{searchQuery}"</p>
//             <p>Try searching with different keywords or movie titles</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default UpcomingMovieSearch;
// components/UpcomingMovieSearch.jsx - TAILWIND VERSION
import { useState, useEffect } from "react";

function UpcomingMovieSearch({ onMovieSelect, onClose }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);

  const searchUpcomingMovies = async (query) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/search/upcoming-movies?q=${encodeURIComponent(query)}&limit=10`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.results || []);
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getMovieDetails = async (movieId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/movie-details/${movieId}`);
      if (response.ok) {
        const data = await response.json();
        setMovieDetails(data);
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        searchUpcomingMovies(searchQuery);
      } else {
        setSearchResults([]);
      }
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    getMovieDetails(movie.id);
  };

  const handleUseMovie = () => {
    if (movieDetails) {
      onMovieSelect(movieDetails);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold flex items-center gap-2">
                🎬 Search Upcoming Movies
              </h3>
              <p className="text-indigo-100 text-sm mt-1">
                Auto-fill with real TMDB movie data
              </p>
            </div>
            <button 
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-20 transition-all duration-200"
            >
              ×
            </button>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Search Section */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                className="w-full px-4 py-3 pr-10 text-sm border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-200"
                placeholder="Search upcoming movies from TMDB..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {isLoading && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          </div>
          
          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Search Results</h4>
              <div className="grid gap-4 max-h-80 overflow-y-auto">
                {searchResults.map((movie) => (
                  <div
                    key={movie.id}
                    className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedMovie?.id === movie.id 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                    onClick={() => handleMovieSelect(movie)}
                  >
                    {/* Movie Poster */}
                    <div className="flex-shrink-0 w-16 h-24 bg-gray-200 rounded-lg overflow-hidden">
                      {movie.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                          alt={movie.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div 
                        className="w-full h-full flex items-center justify-center text-gray-400 text-2xl"
                        style={{ display: movie.poster_path ? 'none' : 'flex' }}
                      >
                        🎬
                      </div>
                    </div>
                    
                    {/* Movie Info */}
                    <div className="flex-1 min-w-0">
                      <h5 className="font-semibold text-gray-900 truncate">{movie.title}</h5>
                      <p className="text-sm text-gray-600 mb-2">
                        Release: {movie.release_date || 'TBA'}
                      </p>
                      <p className="text-sm text-gray-700 line-clamp-2">
                        {movie.overview ? movie.overview.substring(0, 120) + '...' : 'No description available'}
                      </p>
                    </div>
                    
                    {/* Rating */}
                    <div className="flex-shrink-0 text-right">
                      <div className="flex items-center gap-1 text-sm text-yellow-600">
                        ⭐ {movie.vote_average?.toFixed(1) || 'N/A'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Movie Details */}
          {movieDetails && (
            <div className="border-t pt-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                📋 Movie Details
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Title:</span>
                    <p className="text-gray-900 font-medium">{movieDetails.title}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Director:</span>
                    <p className="text-gray-900">{movieDetails.director || 'Unknown'}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Genre:</span>
                    <p className="text-gray-900">{movieDetails.primary_genre || 'Unknown'}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Release Date:</span>
                    <p className="text-gray-900">{movieDetails.release_date || 'TBA'}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Cast:</span>
                    <p className="text-gray-900">
                      {[movieDetails.cast_1, movieDetails.cast_2, movieDetails.cast_3, movieDetails.cast_4]
                        .filter(Boolean)
                        .slice(0, 3)
                        .join(', ') || 'Unknown'}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Music Director:</span>
                    <p className="text-gray-900">{movieDetails.music_director || 'Unknown'}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Lead Singer:</span>
                    <p className="text-gray-900">{movieDetails.lead_singer || 'Not specified'}</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <button 
                  onClick={handleUseMovie}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  ✨ Use This Movie for Prediction
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  This will auto-fill all cast/crew with TMDB data
                </p>
              </div>
            </div>
          )}

          {/* No Results Message */}
          {searchQuery && searchResults.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-4xl mb-4">🔍</div>
              <p className="text-gray-600 font-medium">No upcoming movies found for "{searchQuery}"</p>
              <p className="text-gray-500 text-sm mt-1">Try searching with different keywords or movie titles</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UpcomingMovieSearch;