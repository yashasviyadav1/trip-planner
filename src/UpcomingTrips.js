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
      <div className="trip-container">
        {trips.map((trip, index) => (
          <div key={index} className="trip-box">
            <input
              type="checkbox"
              checked={selectedTrips.includes(trip)}
              onChange={(event) => handleCheckboxChange(event, trip)}
            />
            <strong>{trip.destination}</strong> - {trip.date}
            <p>Origin: {trip.origin}</p>
            <p>Mode of Transport: {trip.transport}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingTrips;