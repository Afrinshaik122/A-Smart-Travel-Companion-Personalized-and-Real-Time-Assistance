import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";
import "./Destinations.css";

function Destinations({ onLocationSubmit }) {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [distance, setDistance] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);

  // Fetch location suggestions from Nominatim API with debounce
  const fetchSuggestions = async (input) => {
    if (!input) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${input}&format=json&addressdetails=1&limit=5`
      );
      const data = await response.json();

      if (data?.length) {
        const locations = data
          .map((item) => {
            const { address } = item;
            return (
              address.city ||
              address.town ||
              address.village ||
              address.hamlet ||
              item.display_name.split(",")[0]
            );
          })
          .filter((name, index, self) => name && self.indexOf(name) === index);

        setSuggestions(locations);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setError("Failed to fetch location suggestions. Please try again.");
    }
  };

  // Debounced function to reduce API calls
  const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 300), []);

  const handleLocationChange = (e) => {
    const input = e.target.value;
    setLocation(input);
    setError(null); // Clear error on new input
    debouncedFetchSuggestions(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!location) {
      setError("Location is required.");
      return;
    }
    onLocationSubmit(location, date, distance);
    setSuggestions([]); // Clear suggestions after submission
  };

  const handleSuggestionClick = (suggestion) => {
    setLocation(suggestion);
    setSuggestions([]);
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest(".form-group")) {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <div className="destinations">
      <div className="secTitle">
        <span className="highlightText">EXPLORE NOW</span>
        <h3>Find Your Dream Destination</h3>
      </div>
      <div className="container">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="location">
              Location <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={handleLocationChange}
              placeholder="Enter destination"
              required
            />
            {error && <p className="error">{error}</p>}
            {suggestions.length > 0 && (
              <ul className="suggestions">
                {suggestions.map((suggestion, index) => (
                  <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="date">Travel Date (Optional)</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={currentDate}
            />
          </div>
          
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Destinations;
