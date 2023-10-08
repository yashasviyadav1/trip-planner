import React, { useState } from 'react';

const UpcomingTrips = ({ trips, moveTripToCompleted }) => {
  const [selectedTrips, setSelectedTrips] = useState([]);

  // Handle checkbox change
  const handleCheckboxChange = (event, trip) => {
    const isChecked = event.target.checked;

    // Add or remove the trip from the selectedTrips list
    if (isChecked) {
      setSelectedTrips([...selectedTrips, trip]);
    } else {
      setSelectedTrips(selectedTrips.filter((selectedTrip) => selectedTrip !== trip));
    }
  };

  // Move selected trips to completed
  const handleMoveToCompleted = () => {
    moveTripToCompleted(selectedTrips);
    setSelectedTrips([]); // Clear the selected trips list
  };

  return (
    <div>
      <h2>Upcoming Trips</h2>
      <button onClick={handleMoveToCompleted}>Move to Completed</button>
      <ul>
        {trips.map((trip, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={selectedTrips.includes(trip)}
              onChange={(event) => handleCheckboxChange(event, trip)}
            />
            <strong>{trip.destination}</strong> - {trip.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingTrips;