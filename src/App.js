// App.js
import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import CountryDetails from './components/CountryDetails';
import SearchBar from './components/SearchBar';
import './App.css';

const App = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryDetails, setCountryDetails] = useState(null);

  useEffect(() => {
    if (selectedCountry) {
      fetchCountryDetails(selectedCountry);
    }
  }, [selectedCountry]);

  const fetchCountryDetails = async (countryCode) => {
    try {
      const response = await fetch(`https://restcountries.com/v2/alpha/${countryCode}`);
      const data = await response.json();
      setCountryDetails(data);
    } catch (error) {
      console.log('Error fetching country details:', error);
    }
  };

  const handleCountryClick = (event, country) => {
    setSelectedCountry(country.alpha2Code);
  };

  const handleSearch = (countryName) => {
    // Implement search functionality here
    console.log('Search:', countryName);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <h1>World Map</h1>
        <SearchBar onSearch={handleSearch} />
        {countryDetails && <CountryDetails country={countryDetails} />}
      </div>
      <Map onCountryClick={handleCountryClick} selectedCountry={selectedCountry} />
    </div>
  );
};

export default App;
