// Map.js
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ onCountryClick, selectedCountry }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    mapRef.current = L.map(mapContainerRef.current).setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    }).addTo(mapRef.current);

    mapRef.current.on('click', handleMapClick);

    return () => {
      mapRef.current.off('click', handleMapClick);
      mapRef.current.remove();
    };
  }, []);

  useEffect(() => {
    highlightCountry(selectedCountry);
  }, [selectedCountry]);

  const handleMapClick = (event) => {
    const latlng = event.latlng;
    const countryCode = getCountryCode(latlng);
  
    if (countryCode) {
      onCountryClick(event, countryCode);
    }
  };
  

  const highlightCountry = (countryCode) => {
    if (countryCode) {
      const countryLayer = L.geoJson(null, {
        style: {
          fillColor: 'blue',
          fillOpacity: 0.5,
          color: 'black',
          weight: 1,
        },
      });

      fetch(`https://restcountries.com/v2/alpha/${countryCode}?fields=geometry`)
        .then((response) => response.json())
        .then((data) => {
          L.geoJson(data.geometry).addTo(countryLayer);
          countryLayer.addTo(mapRef.current);
          mapRef.current.fitBounds(countryLayer.getBounds());
        })
        .catch((error) => {
          console.log('Error fetching country geometry:', error);
        });
    }
  };

  const getCountryCode = async (latlng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}`
      );
      const data = await response.json();
  
      if (data && data.address && data.address.country_code) {
        return data.address.country_code.toUpperCase();
      }
    } catch (error) {
      console.log('Error fetching country code:', error);
    }
  
    return null;
  };
  return <div ref={mapContainerRef} className="map-container" />;
};

export default Map;
