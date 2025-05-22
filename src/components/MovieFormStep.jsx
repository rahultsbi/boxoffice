// components/MovieFormStep.jsx
import EnhancedSearchableInput from './EnhancedSearchableInput';

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

function MovieFormStep({ 
  step, 
  stepName, 
  value, 
  onChange, 
  onSearchSelect, 
  onNext, 
  onBack, 
  isFirst, 
  isLast,
  disabled 
}) {
  
  const isSearchableField = [
    "Director", "Cast 1", "Cast 2", "Cast 3", "Cast 4", 
    "Music Director", "Lead Singer"
  ].includes(stepName);

  const getStepDisplayName = (stepName) => {
    switch(stepName) {
      case "Cast 1": return "Lead Actor/Actress";
      case "Cast 2": return "Supporting Actor/Actress";
      case "Cast 3": return "Character Actor";
      case "Cast 4": return "Additional Cast";
      default: return `Select ${stepName}`;
    }
  };

  return (
    <div className="form-step">
      <label className="step-label">
        {getStepDisplayName(stepName)}
        {isSearchableField && (
          <span className="step-hint">
            🎯 Search any {stepName.toLowerCase()} from TMDB database - no limitations!
          </span>
        )}
      </label>
      
      {isSearchableField ? (
        <EnhancedSearchableInput
          step={stepName}
          value={value}
          onChange={onChange}
          onSelect={onSearchSelect}
        />
      ) : (
        <select
          className="form-select"
          value={value || ""}
          onChange={onChange}
        >
          <option value="">-- Select {stepName} --</option>
          {staticOptions[stepName]?.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      )}

      <div className="button-group">
        {!isFirst && (
          <button
            className="back-button"
            onClick={onBack}
          >
            ← Back
          </button>
        )}
        <button
          className={`next-button ${disabled ? 'disabled' : ''}`}
          onClick={onNext}
          disabled={disabled}
        >
          {isLast ? "🎯 Generate Prediction" : "Next →"}
        </button>
      </div>
    </div>
  );
}

export default MovieFormStep;