// Geolocation.js
import React from 'react';

const Geolocation = () => {
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        alert(`Latitude: ${latitude}, Longitude: ${longitude}`);
        // You can use the obtained latitude and longitude for trip destinations or other purposes.
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div>
      <button onClick={getCurrentLocation}>Get Current Location</button>
    </div>
  );
};

export default Geolocation;
