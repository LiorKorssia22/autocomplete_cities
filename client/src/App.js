import React, { useState } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);

  const handleChange = (event) => {
    const { value } = event.target;
    setQuery(value);

    if (value.length > 1) {
      axios
        .get("http://localhost:3001/cities?query=" + value)
        .then((response) => {
          setCities(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setCities([]);
    }
  };

  return (
    <div className="container">
      <h1>City Autocomplete</h1>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Enter a city name..."
      />
      <ul>
        {cities.map((city) => (
          <li key={city.geonameid}>
            <p>Name: {city.name}</p>
            <p>Country: {city.country}</p>
            <p>Subcountry: {city.subcountry}</p>
            <p>Geonameid: {city.geonameid}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
