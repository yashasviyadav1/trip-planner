import React from 'react';

const CompletedTrips = ({ completedTrips }) => {
  return (
    <div>
      <h2>Completed Trips</h2>
      <ul>
        {completedTrips.map((trip, index) => (
          <li key={index}>
            <strong>{trip.destination}</strong> - {trip.date}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default CompletedTrips;