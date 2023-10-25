import React from 'react';
import './Trips.css'; // Import the CSS file for styling

const CompletedTrips = ({ completedTrips }) => {
    return (
      <div>
        <h2>Completed Trips</h2>
        <div className="trip-container">
          {completedTrips.map((trip, index) => (
            <div key={index} className="trip-box-completed">
              <strong>{trip.destination}</strong> - {trip.date}
              <p>Origin: {trip.origin}</p>
              <p>Mode of Transport: {trip.transport}</p>
              <p>Expense {trip.expense}</p>
              <p>Number of People: {trip.people}</p>

            </div>
          ))}
        </div>
      </div>
    );
};

export default CompletedTrips;