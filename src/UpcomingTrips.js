// UpcomingTrips.js
import React from 'react';

const UpcomingTrips = ({ trips }) => {
  return (
    <div>
      <h2>Upcoming Trips</h2>
      <ul>
        {trips.map((trip, index) => (
          <li key={index}>
            <strong>{trip.destination}</strong> - {trip.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingTrips;
