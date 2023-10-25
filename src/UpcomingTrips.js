import React, { useState } from 'react';
import EditTripModal from './EditTripModal';
import axios from 'axios';
import './UpcomingTrips.css'; // Import your CSS file

const fetchWeatherData = async (destination) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
      params: {
        q: destination,
        days: '3',
      },
      headers: {
        'X-RapidAPI-Key': 'e08f6de851mshdca747773fbaea8p1255b7jsn3c8532970c16',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
      },
    };

    console.log('Fetching weather data for', destination);

    const response = await axios.request(options);

    if (response.data) {
      console.log('Weather data response:', response.data);
      return response.data; // Return the entire response data
    } else {
      console.error('No weather data found.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null; // Return null in case of an error
  }
};

const TripCard = ({ trip, selectedTrips, onCheckboxChange, onEditClick, onSplitExpense, onDelete, onFetchWeather }) => (
  <div className={`trip-box ${selectedTrips.includes(trip) ? 'selected' : ''}`}>
    <input
      type="checkbox"
      checked={selectedTrips.includes(trip)}
      onChange={(event) => onCheckboxChange(event, trip)}
    />
    <strong>{trip.destination}</strong> - {trip.date}
    <p>Origin: {trip.origin}</p>
    <p>Mode of Transport: {trip.transport}</p>
    <p>Expense: {trip.expense}</p>
    <p>People: {trip.people}</p>
    <button onClick={() => onEditClick(trip)}>Edit</button>
    <button onClick={() => onSplitExpense(trip)}>Split Expense</button>
    <button onClick={() => onDelete(trip)}>Delete</button>
    <button onClick={() => onFetchWeather(trip)}>Fetch Weather</button>
    {trip.splitExpense && <p>Split Expense: ${trip.splitExpense.toFixed(2)}</p>}
    {trip.weather && (
      <div>
        <p>Weather: {trip.weather.location.name}</p>
        <p>Temperature: {trip.weather.current.temp_c}°C</p>
      </div>
    )}
  </div>
);

const UpcomingTrips = ({ trips, setTrips, moveTripToCompleted }) => {
  const [selectedTrips, setSelectedTrips] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tripToEdit, setTripToEdit] = useState(null);

  const handleEditClick = (trip) => {
    setTripToEdit(trip);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (editedTrip) => {
    const updatedTrips = [...trips];
    const tripIndexToEdit = updatedTrips.findIndex((trip) => trip.id === editedTrip.id);

    if (tripIndexToEdit !== -1) {
      updatedTrips[tripIndexToEdit] = editedTrip;
      setTrips(updatedTrips);
      setIsEditModalOpen(false);
    } else {
      console.error("Trip to edit not found.");
      setIsEditModalOpen(false);
    }
  };

  const handleSplitExpense = (tripToSplit) => {
    const splitExpense = tripToSplit.expense / tripToSplit.people;
    const updatedTrips = trips.map((trip) =>
      trip.id === tripToSplit.id ? { ...trip, splitExpense } : trip
    );
    setTrips(updatedTrips);
  };

  const handleCheckboxChange = (event, trip) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedTrips([...selectedTrips, trip]);
    } else {
      setSelectedTrips(selectedTrips.filter((selectedTrip) => selectedTrip.id !== trip.id));
    }
  };

  const handleMoveToCompleted = () => {
    moveTripToCompleted(selectedTrips);
    setSelectedTrips([]);
  };

  const handleDeleteTrip = (tripToDelete) => {
    if (window.confirm("Are you sure you want to delete this trip?")) {
      const updatedTrips = trips.filter((trip) => trip.id !== tripToDelete.id);
      setTrips(updatedTrips);
    }
  };

  const handleFetchWeather = async (trip) => {
    if (!trip.weather) {
      console.log(`Fetching weather for ${trip.destination}...`);
      const weatherData = await fetchWeatherData(trip.destination);
      console.log('Weather data:', weatherData);

      if (weatherData) {
        const updatedTrips = trips.map((t) =>
          t.id === trip.id ? { ...t, weather: weatherData } : t
        );
        setTrips(updatedTrips);
      } else {
        console.log('Weather data not fetched.');
      }
    }
  };

  return (
    <div>
      <h2>Upcoming Trips</h2>
      <button onClick={handleMoveToCompleted}>Move to Completed</button>
      <div className="trip-container">
        {trips.map((trip, index) => (
          <TripCard
            key={index}
            trip={trip}
            selectedTrips={selectedTrips}
            onCheckboxChange={handleCheckboxChange}
            onEditClick={handleEditClick}
            onSplitExpense={handleSplitExpense}
            onDelete={handleDeleteTrip}
            onFetchWeather={handleFetchWeather}
          />
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