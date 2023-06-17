// CountryDetails.js
import React from 'react';

const CountryDetails = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <p>Area: {country.area} km²</p>
      <p>Languages: {country.languages.map((language) => language.name).join(', ')}</p>
      <p>Currency: {country.currencies[0].name} ({country.currencies[0].code})</p>
    </div>
  );
};

export default CountryDetails;
