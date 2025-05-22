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

function TextOnlySearchableInput({ step, value, onChange, onSelect }) {
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Clear input when step changes
  useEffect(() => {
    setInputValue("");
    setFilteredSuggestions([]);
    setShowDropdown(false);
    setSelectedIndex(-1);
  }, [step]);

  // Sync inputValue with value prop when it changes (auto-fill scenario)
  useEffect(() => {
    if (value && value !== inputValue) {
      setInputValue(value);
    }
  }, [value]);

  // Filter suggestions based on input
  useEffect(() => {
    if (inputValue.length >= 1 && popularOptions[step]) {
      const filtered = popularOptions[step].filter(name =>
        name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else if (inputValue.length === 0 && popularOptions[step]) {
      setFilteredSuggestions(popularOptions[step].slice(0, 6)); // Show top 6 popular options
    } else {
      setFilteredSuggestions([]);
    }
  }, [inputValue, step]);

  const handleInputChange = (e) => {
    const rawValue = e.target.value;
    // Only allow letters, spaces, and common name characters like apostrophes, hyphens, and dots
    const filteredValue = rawValue.replace(/[^a-zA-Z\s\-'.]/g, '');
    
    setInputValue(filteredValue);
    
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
    
    // Call onSelect for real-time updates
    if (onSelect) {
      onSelect(filteredValue);
    }
  };

  const handleSelect = (selectedName) => {
    setInputValue(selectedName);
    if (onSelect) {
      onSelect(selectedName);
    }
    setShowDropdown(false);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < filteredSuggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleSelect(filteredSuggestions[selectedIndex]);
    } else if (e.key === 'Enter' && selectedIndex === -1 && inputValue.trim()) {
      // Allow entering custom text on Enter
      handleSelect(inputValue.trim());
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
      setSelectedIndex(-1);
    }
  };

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
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          onKeyDown={handleKeyDown}
        />
        
        {/* Input Icon */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </div>
      </div>
      
      {/* Dropdown */}
      {showDropdown && filteredSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
          {/* Header */}
          <div className="px-3 py-2 bg-gray-50 border-b border-gray-100">
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
              {inputValue.length > 0 ? "🔍 Filtered Results" : "🌟 Popular Options"}
            </span>
          </div>
          
          {/* Suggestions List */}
          <div className="py-1">
            {filteredSuggestions.map((name, index) => (
              <div
                key={`${name}-${index}`}
                className={`px-3 py-2 cursor-pointer transition-colors duration-150 ${
                  selectedIndex === index 
                    ? 'bg-indigo-50 text-indigo-900' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleSelect(name)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900 truncate">
                        {name}
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        Popular
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Custom input hint */}
          {inputValue.length > 0 && !filteredSuggestions.some(name => 
            name.toLowerCase() === inputValue.toLowerCase()
          ) && (
            <div className="px-3 py-2 border-t border-gray-100 bg-gray-50">
              <div className="text-xs text-gray-600">
                💡 Press Enter to use: "<strong>{inputValue}</strong>"
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TextOnlySearchableInput;