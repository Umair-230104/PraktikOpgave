import { useState } from "react";

function CitySearch({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query) return;

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          const { lat, lon } = data[0];
          onSearch([parseFloat(lat), parseFloat(lon)]); 
        } else {
          alert("By ikke fundet!");
        }
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Søg efter en by..."
      />
      <button onClick={handleSearch}>Søg</button>
    </div>
  );
}

export default CitySearch;
