// components/WhatIfAnalysis.jsx
import { useState, useEffect } from "react";

const staticOptions = {
  Genre: [
    "Action", "Horror", "Comedy", "Family Drama", "Romance", 
    "Thriller", "Sci-Fi", "Historical", "Musical", "Adventure"
  ]
};

function WhatIfAnalysis({ baseMovie, onBack }) {
  const [scenarios, setScenarios] = useState([
    { Director: "S.S. Rajamouli", Genre: "Action" },
    { Cast_1: "Shah Rukh Khan", Cast_2: "Deepika Padukone" },
    { Genre: "Sci-Fi", Music_Director: "A.R. Rahman" }
  ]);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modelStatus, setModelStatus] = useState(null);

  // Check model status on component mount
  useEffect(() => {
    checkModelStatus();
  }, []);

  const checkModelStatus = async () => {
    try {
      const response = await fetch('http://localhost:8000/model-status');
      if (response.ok) {
        const data = await response.json();
        setModelStatus(data);
      }
    } catch (error) {
      console.error('Error checking model status:', error);
    }
  };

  const enhanceModel = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/enhance-trained-model', {
        method: 'POST'
      });
      
      if (response.ok) {
        const data = await response.json();
        alert('Model enhanced successfully with local data!');
        checkModelStatus(); // Refresh status
      } else {
        alert('Failed to enhance model');
      }
    } catch (error) {
      console.error('Error enhancing model:', error);
      alert('Error enhancing model');
    } finally {
      setIsLoading(false);
    }
  };

  const runWhatIfAnalysis = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/producer/what-if-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          base_movie: baseMovie,
          scenarios: scenarios
        })
      });

      if (response.ok) {
        const data = await response.json();
        setAnalysisResults(data);
      } else {
        const errorData = await response.json();
        alert(`Analysis failed: ${errorData.detail}`);
      }
    } catch (error) {
      console.error('What-if analysis failed:', error);
      alert('Failed to run what-if analysis');
    } finally {
      setIsLoading(false);
    }
  };

  const updateScenario = (index, field, value) => {
    const newScenarios = [...scenarios];
    newScenarios[index] = {
      ...newScenarios[index],
      [field]: value
    };
    setScenarios(newScenarios);
  };

  const addScenario = () => {
    setScenarios([...scenarios, {}]);
  };

  const removeScenario = (index) => {
    const newScenarios = scenarios.filter((_, i) => i !== index);
    setScenarios(newScenarios);
  };

  return (
    <div className="what-if-container">
      <div className="what-if-header">
        <button className="back-button" onClick={onBack}>
          ← Back to Movie Builder
        </button>
        <h2 className="what-if-title">🔬 Producer's What-If Analysis</h2>
        <p className="what-if-subtitle">
          Analyze different casting and creative combinations using TMDB performance data
        </p>
      </div>

      {/* Model Status */}
      {modelStatus && (
        <div className="model-status-card">
          <h3>🤖 Model Status</h3>
          <div className="model-grid">
            {Object.entries(modelStatus.models).map(([modelName, info]) => (
              <div key={modelName} className={`model-item ${info.status === 'Trained & Ready' ? 'ready' : 'not-ready'}`}>
                <h4>{modelName.replace('_', ' ').toUpperCase()}</h4>
                <p className="model-accuracy">Accuracy: {info.accuracy}</p>
                <p className="model-speed">Speed: {info.speed}</p>
                <span className={`status-badge ${info.status === 'Trained & Ready' ? 'ready' : 'not-ready'}`}>
                  {info.status}
                </span>
              </div>
            ))}
          </div>
          {modelStatus.models.ml_ensemble?.status !== 'Trained & Ready' && (
            <button 
              className="enhance-model-button"
              onClick={enhanceModel}
              disabled={isLoading}
            >
              {isLoading ? "Enhancing..." : "🚀 Enhance Model with Local Data"}
            </button>
          )}
        </div>
      )}

      {/* Base Movie */}
      <div className="base-movie-card">
        <h3>🎬 Base Movie</h3>
        <div className="base-movie-details">
          {Object.entries(baseMovie).map(([key, value]) => (
            <div key={key} className="base-movie-item">
              <span className="base-movie-key">{key}:</span>
              <span className="base-movie-value">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scenarios */}
      <div className="scenarios-section">
        <div className="scenarios-header">
          <h3>🎯 What-If Scenarios</h3>
          <button className="add-scenario-button" onClick={addScenario}>
            + Add Scenario
          </button>
        </div>
        
        <div className="scenarios-grid">
          {scenarios.map((scenario, index) => (
            <div key={index} className="scenario-card">
              <div className="scenario-header">
                <h4>Scenario {index + 1}</h4>
                {scenarios.length > 1 && (
                  <button 
                    className="remove-scenario-button"
                    onClick={() => removeScenario(index)}
                  >
                    ×
                  </button>
                )}
              </div>
              
              <div className="scenario-fields">
                {["Director", "Genre", "Music_Director", "Cast_1", "Cast_2"].map(field => (
                  <div key={field} className="scenario-field">
                    <label>{field.replace('_', ' ')}:</label>
                    {field === "Genre" ? (
                      <select
                        value={scenario[field] || ""}
                        onChange={(e) => updateScenario(index, field, e.target.value)}
                      >
                        <option value="">-- Keep Original --</option>
                        {staticOptions.Genre.map(genre => (
                          <option key={genre} value={genre}>{genre}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={scenario[field] || ""}
                        onChange={(e) => updateScenario(index, field, e.target.value)}
                        placeholder={`Change ${field.replace('_', ' ')}`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analysis Button */}
      <div className="analysis-button-section">
        <button
          className="run-analysis-button"
          onClick={runWhatIfAnalysis}
          disabled={isLoading}
        >
          {isLoading ? (
            <span>
              <div className="loading-spinner"></div>
              Running TMDB Analysis...
            </span>
          ) : (
            "🚀 Run What-If Analysis"
          )}
        </button>
      </div>

      {/* Results */}
      {analysisResults && (
        <div className="analysis-results">
          <h3>📊 Analysis Results</h3>
          <p className="results-subtitle">Based on TMDB performance data</p>
          <div className="results-grid">
            {analysisResults.analysis_results.map((result, index) => (
              <div 
                key={index} 
                className={`result-card ${
                  index === 0 ? 'base-result' : 
                  result.vs_base?.is_better ? 'better-result' : 'worse-result'
                }`}
              >
                <div className="result-header">
                  <h4>{result.scenario}</h4>
                  {index > 0 && result.vs_base && (
                    <span className={`change-indicator ${result.vs_base.is_better ? 'positive' : 'negative'}`}>
                      {result.vs_base.is_better ? '↗' : '↘'} {result.vs_base.change_percentage.toFixed(1)}%
                    </span>
                  )}
                </div>
                
                <div className="result-prediction">
                  <div className="prediction-item">
                    <span className="prediction-label">Weekend:</span>
                    <span className="prediction-value">₹{result.prediction.weekend} Cr</span>
                  </div>
                  <div className="prediction-item">
                    <span className="prediction-label">Lifetime:</span>
                    <span className="prediction-value">₹{result.prediction.total} Cr</span>
                  </div>
                  <div className="prediction-item">
                    <span className="prediction-label">Confidence:</span>
                    <span className="prediction-value">{result.prediction.confidence}%</span>
                  </div>
                </div>

                {index > 0 && result.changes && Object.keys(result.changes).length > 0 && (
                  <div className="result-changes">
                    <h5>Changes Made:</h5>
                    {Object.entries(result.changes).map(([key, value]) => (
                      <div key={key} className="change-item">
                        <span className="change-key">{key.replace('_', ' ')}:</span>
                        <span className="change-value">{value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {index > 0 && result.vs_base && (
                  <div className="vs-base">
                    <span className="vs-base-label">vs Base:</span>
                    <span className={`vs-base-value ${result.vs_base.is_better ? 'positive' : 'negative'}`}>
                      {result.vs_base.is_better ? '+' : ''}{result.vs_base.change_crores} Cr
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default WhatIfAnalysis;