import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NavBar from './NavBar.js';
import TripModal from './tripmodal';
import UpcomingTrips from './UpcomingTrips';
import CompletedTrips from './CompletedTrips';



function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trips, setTrips] = useState([]); // State to store upcoming trips
  const [completedTrips, setCompletedTrips] = useState([]); // State to store completed trips

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

  // Function to move selected trips to completed trips
  const moveTripToCompleted = (selectedTrips) => {
   
    const updatedUpcomingTrips = trips.filter((trip) => !selectedTrips.includes(trip));
    
    
    setCompletedTrips([...completedTrips, ...selectedTrips]);

    
    setTrips(updatedUpcomingTrips);
  };


  return (
    <Router>
      <div className='App'>
      
        <NavBar />
        <button onClick={openModal}>Add Trip</button>

        <Routes>
          {/* Default Page */}
          <Route path='/Home' element={<Home/>} />

          {/* Upcoming Trips Page */}
          <Route
          path='/upcoming-trips'
          element={<UpcomingTrips trips={trips} setTrips={setTrips} moveTripToCompleted={moveTripToCompleted} />}
          />

          {/* Completed Trips Page */}
          <Route
            path='/completed-trips'
            element={<CompletedTrips completedTrips={completedTrips} />}
          />
        </Routes>

        <TripModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          onCreateTrip={(newTrip) => {
            addTrip(newTrip);
            closeModal();
          }}
        />
      </div>
    </Router>
    
  );
}

// Home component for the default page
function Home() {
  return <h1>Welcome to the Page</h1>;
}

export default App;