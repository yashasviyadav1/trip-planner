import React, { useState } from 'react';
import EditTripModal from './EditTripModal';

const UpcomingTrips = ({ trips,setTrips, moveTripToCompleted }) => {
  const [selectedTrips, setSelectedTrips] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tripToEdit, setTripToEdit] = useState(null);
  const handleEditClick = (trip) => {
    setTripToEdit(trip);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (editedTrip) => {
    // Create a copy of the current trips state
    const updatedTrips = [...trips];
    
    // Find the index of the trip to be edited
    const tripIndexToEdit = updatedTrips.findIndex((trip) => trip.id === editedTrip.id);
  
    if (tripIndexToEdit !== -1) {
      // Update the trip in the copy with the edited data
      updatedTrips[tripIndexToEdit] = editedTrip;
      
      // Use the setTrips function from props to update the state
      setTrips(updatedTrips);
      
      // Close the edit modal
      setIsEditModalOpen(false);
    } else {
      console.error("Trip to edit not found.");
      setIsEditModalOpen(false);
    }
  };
  

  
  const handleCheckboxChange = (event, trip) => {
    const isChecked = event.target.checked;

    
    if (isChecked) {
      setSelectedTrips([...selectedTrips, trip]);
    } else {
      setSelectedTrips(selectedTrips.filter((selectedTrip) => selectedTrip !== trip));
    }
  };

  
  const handleMoveToCompleted = () => {
    moveTripToCompleted(selectedTrips);
    setSelectedTrips([]); 
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
            <button onClick={() => handleEditClick(trip)}>Edit</button>
          </div>
        ))}
      </div>
      {isEditModalOpen && (
        <EditTripModal
          isOpen={isEditModalOpen}
          onRequestClose={() => setIsEditModalOpen(false)}
          tripToEdit={tripToEdit}
          onSaveEdit={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default UpcomingTrips;