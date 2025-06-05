

import { useState, useEffect } from "react";

function EnhancedMovieSearch({ onMovieSelect, onClose }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);

  const searchMovies = async (query) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      // Search both upcoming and released movies
      const response = await fetch(`https://box-office-tool-backend.onrender.com/search/all-movies?q=${encodeURIComponent(query)}&limit=10`);
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
      const response = await fetch(`https://box-office-tool-backend.onrender.com/movie-details/${movieId}`);
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
        searchMovies(searchQuery);
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

  const isMovieReleased = (releaseDate) => {
    if (!releaseDate) return false;
    const today = new Date();
    const release = new Date(releaseDate);
    return release <= today;
  };

  const formatRevenue = (revenue) => {
    if (!revenue || revenue === 0) return 'Not Available';
    
    if (revenue >= 1000000000) {
      return `$${(revenue / 1000000000).toFixed(1)}B`;
    } else if (revenue >= 1000000) {
      return `$${(revenue / 1000000).toFixed(1)}M`;
    } else if (revenue >= 1000) {
      return `$${(revenue / 1000).toFixed(1)}K`;
    }
    return `$${revenue.toLocaleString()}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold flex items-center gap-2">
                🎬 Search Movies & Analyze Revenue
              </h3>
              <p className="text-indigo-100 text-sm mt-1">
                Released movies show actual revenue • Upcoming movies for prediction
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
                placeholder="Search any movie from here (released or upcoming)..."
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
                {searchResults.map((movie) => {
                  const isReleased = isMovieReleased(movie.release_date);
                  return (
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
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-semibold text-gray-900 truncate pr-2">{movie.title}</h5>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full flex-shrink-0 ${
                            isReleased ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {isReleased ? '✅ Released' : '🔮 Upcoming'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          Release: {movie.release_date || 'TBA'}
                        </p>
                        <p className="text-sm text-gray-700 line-clamp-2">
                          {movie.overview ? movie.overview.substring(0, 120) + '...' : 'No description available'}
                        </p>
                      </div>
                      
                      {/* Rating */}
                      <div className="flex-shrink-0 text-right">
                        <div className="flex items-center gap-1 text-sm text-yellow-600 mb-1">
                          ⭐ {movie.vote_average?.toFixed(1) || 'N/A'}
                        </div>
                        {isReleased && movie.revenue && (
                          <div className="text-xs text-green-600 font-medium">
                            💰 {formatRevenue(movie.revenue)}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Movie Details */}
          {movieDetails && (
            <div className="border-t pt-6">
              {isMovieReleased(movieDetails.release_date) ? (
                // Released Movie - Show Actual Revenue
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    💰 Actual Box Office Performance
                  </h4>
                  
                  {/* Revenue Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 text-center">
                      <div className="text-3xl mb-2">🎯</div>
                      <h5 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
                        Worldwide Revenue
                      </h5>
                      <div className="text-2xl font-bold text-emerald-600 mb-1">
                        {formatRevenue(movieDetails.revenue)}
                      </div>
                      <p className="text-xs text-gray-500">Actual box office</p>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 text-center">
                      <div className="text-3xl mb-2">📊</div>
                      <h5 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
                        Production Budget
                      </h5>
                      <div className="text-2xl font-bold text-indigo-600 mb-1">
                        {formatRevenue(movieDetails.budget)}
                      </div>
                      <p className="text-xs text-gray-500">Investment cost</p>
                    </div>
                  </div>

                  {/* Profit/Loss Indicator */}
                  {movieDetails.revenue && movieDetails.budget && (
                    <div className="mb-6">
                      <div className={`rounded-xl p-4 text-center ${
                        movieDetails.revenue > movieDetails.budget 
                          ? 'bg-green-50 border border-green-200' 
                          : 'bg-red-50 border border-red-200'
                      }`}>
                        <div className={`text-lg font-bold ${
                          movieDetails.revenue > movieDetails.budget ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {movieDetails.revenue > movieDetails.budget ? '📈 Profitable' : '📉 Loss'}
                        </div>
                        <div className={`text-sm ${
                          movieDetails.revenue > movieDetails.budget ? 'text-green-700' : 'text-red-700'
                        }`}>
                          Net: {formatRevenue(movieDetails.revenue - movieDetails.budget)}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* What-If Analysis CTA */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6 border border-purple-200">
                    <h5 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      🔬 Want to run a "What-If" Analysis?
                    </h5>
                    <p className="text-sm text-gray-600 mb-4">
                      See how this movie would perform with different director, cast, or crew using our AI prediction model.
                    </p>
                    <button 
                      onClick={handleUseMovie}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
                    >
                      🎬 Use for What-If Prediction
                    </button>
                  </div>
                </div>
              ) : (
                // Upcoming Movie - Show Prediction Option
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    🔮 Upcoming Movie - Predict Performance
                  </h4>
                </div>
              )}
              
              {/* Movie Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
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
                  <div>
                    <span className="text-sm font-medium text-gray-500">TMDB Rating:</span>
                    <p className="text-gray-900">{movieDetails.vote_average?.toFixed(1) || 'N/A'} ⭐</p>
                  </div>
                </div>
              </div>
              
              {/* Action Button for Upcoming Movies */}
              {!isMovieReleased(movieDetails.release_date) && (
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
              )}
            </div>
          )}

          {/* No Results Message */}
          {searchQuery && searchResults.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-4xl mb-4">🔍</div>
              <p className="text-gray-600 font-medium">No movies found for "{searchQuery}"</p>
              <p className="text-gray-500 text-sm mt-1">Try searching with different keywords or movie titles</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EnhancedMovieSearch;