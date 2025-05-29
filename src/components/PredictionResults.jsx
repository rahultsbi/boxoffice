
function PredictionResults({ result, formData, onWhatIfAnalysis, onReset }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6">
            <h3 className="text-2xl font-bold mb-2">🎯 Box Office Prediction</h3>
            <p className="text-green-100">Based on real performance</p>
          </div>
          
          <div className="p-6">
            {/* Prediction Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Weekend Collection */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 text-center">
                <div className="text-3xl mb-2">🏁</div>
                <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
                  Opening Weekend
                </h4>
                <div className="text-3xl font-bold text-indigo-600 mb-1">
                  ₹{result.weekend} Cr
                </div>
                <p className="text-xs text-gray-500">First 3 days</p>
              </div>

              {/* Total Collection */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 text-center">
                <div className="text-3xl mb-2">💰</div>
                <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
                  Lifetime Collection
                </h4>
                <div className="text-3xl font-bold text-emerald-600 mb-1">
                  ₹{result.total} Cr
                </div>
                <p className="text-xs text-gray-500">Total box office</p>
              </div>
            </div>

            {/* Confidence Bar */}
            {result.confidence && (
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-semibold text-gray-700">Prediction Confidence</h4>
                  <span className="text-lg font-bold text-gray-900">{result.confidence}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${
                      result.confidence >= 85 ? 'bg-green-500' :
                      result.confidence >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${result.confidence}%` }}
                  ></div>
                </div>
                <p className="text-xs text-center text-gray-600">
                  {result.confidence >= 85 ? "High confidence prediction" :
                   result.confidence >= 70 ? "Good confidence prediction" :
                   "Moderate confidence prediction"}
                </p>
              </div>
            )}

            {/* Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Cast & Crew */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  🎭 Your Movie Cast & Crew
                </h4>
                <div className="space-y-3">
                  {Object.entries(formData).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">{key}:</span>
                      <span className="text-sm text-gray-900 font-medium truncate ml-2 max-w-40">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* TMDB Analysis */}
              {result.breakdown && (
                <div className="bg-indigo-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    📊 Box Office Analysis
                  </h4>
                  <div className="space-y-3">
                    {/* TMDB Scores */}
                    {result.breakdown.director_performance_score && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">Director Score:</span>
                        <span className="text-sm font-bold text-indigo-600">
                          {result.breakdown.director_performance_score}/10
                        </span>
                      </div>
                    )}
                    
                    {result.breakdown.cast_performance_scores && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">Cast Scores:</span>
                        <span className="text-sm font-bold text-indigo-600">
                          {result.breakdown.cast_performance_scores.map(score => `${score}/10`).join(', ')}
                        </span>
                      </div>
                    )}
                    
                    {result.breakdown.music_director_performance_score && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">Music Score:</span>
                        <span className="text-sm font-bold text-indigo-600">
                          {result.breakdown.music_director_performance_score}/10
                        </span>
                      </div>
                    )}

                    {/* Contributions */}
                    {result.breakdown.director_contribution && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">Director Impact:</span>
                        <span className="text-sm font-bold text-green-600">
                          +₹{result.breakdown.director_contribution} Cr
                        </span>
                      </div>
                    )}
                    
                    {result.breakdown.cast_contribution && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">Cast Impact:</span>
                        <span className="text-sm font-bold text-green-600">
                          +₹{result.breakdown.cast_contribution} Cr
                        </span>
                      </div>
                    )}

                    {result.breakdown.category_bonus > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">Category Bonus:</span>
                        <span className="text-sm font-bold text-purple-600">
                          +₹{result.breakdown.category_bonus} Cr
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {result.dataSource && (
                    <div className="mt-4 pt-3 border-t border-indigo-200">
                      <p className="text-xs text-indigo-600 flex items-center gap-1">
                        {/* 📡 {result.dataSource} */}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              {/* <button
                className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
                onClick={onWhatIfAnalysis}
              >
                🔬 Run What-If Analysis
              </button> */}
              <button
                className="w-full sm:w-auto bg-gray-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-200"
                onClick={onReset}
              >
                🎬 Predict Another Movie
              </button>
            </div>
            
            {/* Info Note */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 bg-yellow-50 py-3 px-4 rounded-lg border border-yellow-200">
                💡 All ratings calculated from real box office performance data - no hardcoded limitations!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PredictionResults;