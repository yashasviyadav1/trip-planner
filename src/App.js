// App.js
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import NavBar from './NavBar.js';
import TripModal from './tripmodal';
import UpcomingTrips from './UpcomingTrips';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trips, setTrips] = useState([]); // State to store trips

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to add a new trip to the list
  const addTrip = (newTrip) => {
    setTrips([...trips, newTrip]);
  };

  return (
    <Router>
      <div className='App'>
        <NavBar />
        <button onClick={openModal}>Add Trip</button>
        <Switch>
          <Route path='/upcoming-trips'>
            <UpcomingTrips trips={trips} /> {/* Pass trips data to UpcomingTrips */}
          </Route>
        </Switch>
        <TripModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          onCreateTrip={(newTrip) => {
            addTrip(newTrip); // Add the new trip to the list
            closeModal();
          }}
        />
      </div>
    </Router>
  );
}

export default App;
