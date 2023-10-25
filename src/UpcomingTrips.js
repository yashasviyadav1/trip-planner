// import React, { useState ,useEffect } from 'react';
// import EditTripModal from './EditTripModal';
// import axios from 'axios';
// const fetchWeatherData = async (destination) => {
//   try {
//     const options = {
//       method: 'GET',
//       url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
//       params: {
//         q: destination,
//         days: '3'
//       },
//       headers: {
//         'X-RapidAPI-Key': 'e08f6de851mshdca747773fbaea8p1255b7jsn3c8532970c16',
//         'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
//       }
//       };

//       const response = await axios.request(options);
//       return response.data; // Return weather data
//     } catch (error) {
//       console.error(error);
//       return null; // Return null in case of an error
//     }
// };


// const UpcomingTrips = ({ trips, setTrips, moveTripToCompleted }) => {
//   const [selectedTrips, setSelectedTrips] = useState([]);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [tripToEdit, setTripToEdit] = useState(null);
  
//   const handleEditClick = (trip) => {
//     setTripToEdit(trip);
//     setIsEditModalOpen(true);
//   };

//   const handleSaveEdit = (editedTrip) => {
//     const updatedTrips = [...trips];
//     const tripIndexToEdit = updatedTrips.findIndex((trip) => trip.id === editedTrip.id);

//     if (tripIndexToEdit !== -1) {
//       updatedTrips[tripIndexToEdit] = editedTrip;
//       setTrips(updatedTrips);
//       setIsEditModalOpen(false);
//     } else {
//       console.error("Trip to edit not found.");
//       setIsEditModalOpen(false);
//     }
//   };
//   const handleSplitExpense = (tripToSplit) => {
//     // Calculate the split expense by dividing the expense by the number of people
//     const splitExpense = tripToSplit.expense / tripToSplit.people;
  
//     // Create a new array of trips with updated splitExpense for the specific trip
//     const updatedTrips = trips.map((trip) =>
//       trip.id === tripToSplit.id ? { ...trip, splitExpense } : trip
//     );
  
//     // Update the state with the modified trip data
//     setTrips(updatedTrips);
//   };
//   const handleCheckboxChange = (event, trip) => {
//     const isChecked = event.target.checked;
  
//     if (isChecked) {
//       setSelectedTrips([...selectedTrips, trip]);
//     } else {
//       setSelectedTrips(selectedTrips.filter((selectedTrip) => selectedTrip.id !== trip.id));
//     }
//   };

//   const handleMoveToCompleted = () => {
//     moveTripToCompleted(selectedTrips);
//     setSelectedTrips([]);
//   };
//   const handleDeleteTrip = (tripToDelete) => {
//   if (window.confirm("Are you sure you want to delete this trip?")) {
//     const updatedTrips = trips.filter((trip) => trip.id !== tripToDelete.id);
//     setTrips(updatedTrips);
//   }
// };
// useEffect(() => {
//   if (trips.length > 0) {
//     const fetchWeatherForTrips = trips.map(async (trip) => {
//       // Only fetch weather for trips without weather data
//       if (!trip.weather) {
//         const weatherData = await fetchWeatherData(trip.destination);
//         return { ...trip, weather: weatherData };
//       } else {
//         return trip; // Return the existing trip data if it already has weather
//       }
//     });

//     Promise.all(fetchWeatherForTrips).then((tripsWithWeather) => {
//       setTrips(tripsWithWeather);
//     });
//   }
// }, [trips]);


//   return (
//     <div>
//       <h2>Upcoming Trips</h2>
//       <button onClick={handleMoveToCompleted}>Move to Completed</button>
//       <div className="trip-container">
//         {trips.map((trip, index) => (
//           <div key={index} className="trip-box">
//             <input
//               type="checkbox"
//               checked={selectedTrips.includes(trip)}
//               onChange={(event) => handleCheckboxChange(event, trip)}
//             />
//             <strong>{trip.destination}</strong> - {trip.date}
//             <p>Origin: {trip.origin}</p>
//             <p>Mode of Transport: {trip.transport}</p>
//             <p>Expense: {trip.expense}</p> {/* Display Expense */}
//             <p>People: {trip.people}</p> {/* Display People */}
            
//             <button onClick={() => handleEditClick(trip)}>Edit</button>
//             <button onClick={() => handleSplitExpense(trip)}>Split Expense</button>
//             <button onClick={() => handleDeleteTrip(trip)}>Delete</button>
//             {trip.splitExpense && <p>Split Expense: ${trip.splitExpense.toFixed(2)}</p>}
//             {trip.weather && (
//             <div>
//               <p>Weather: {trip.weather.location.name}</p>
//               <p>Temperature: {trip.weather.current.temp_c}°C</p>
              
//             </div>
//           )}
//           </div>
//         ))}
//       </div>
//       {isEditModalOpen && (
//         <EditTripModal
//           isOpen={isEditModalOpen}
//           onRequestClose={() => setIsEditModalOpen(false)}
//           tripToEdit={tripToEdit}
//           onSaveEdit={handleSaveEdit}
//         />
//       )}
//     </div>
//   );
// };

// export default UpcomingTrips;
import React, { useState, useEffect } from 'react';
import EditTripModal from './EditTripModal';
import axios from 'axios';

const fetchWeatherData = async (destination) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
      params: {
        q: destination,
        days: '3'
      },
      headers: {
        'X-RapidAPI-Key': 'e08f6de851mshdca747773fbaea8p1255b7jsn3c8532970c16',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);
    return response.data.data; // Return weather data
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null; // Return null in case of an error
  }
};


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
    // Calculate the split expense by dividing the expense by the number of people
    const splitExpense = tripToSplit.expense / tripToSplit.people;

    // Create a new array of trips with updated splitExpense for the specific trip
    const updatedTrips = trips.map((trip) =>
      trip.id === tripToSplit.id ? { ...trip, splitExpense } : trip
    );

    // Update the state with the modified trip data
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
        // Update the state with the new weather data for the specific trip
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
          <div key={index} className="trip-box">
            <input
              type="checkbox"
              checked={selectedTrips.includes(trip)}
              onChange={(event) => handleCheckboxChange(event, trip)}
            />
            <strong>{trip.destination}</strong> - {trip.date}
            <p>Origin: {trip.origin}</p>
            <p>Mode of Transport: {trip.transport}</p>
            <p>Expense: {trip.expense}</p>
            <p>People: {trip.people}</p>
            <button onClick={() => handleEditClick(trip)}>Edit</button>
            <button onClick={() => handleSplitExpense(trip)}>Split Expense</button>
            <button onClick={() => handleDeleteTrip(trip)}>Delete</button>
            
            {/* Button to fetch weather data */}
            <button onClick={() => handleFetchWeather(trip)}>Fetch Weather</button>

            {trip.splitExpense && <p>Split Expense: ${trip.splitExpense.toFixed(2)}</p>}
            {trip.weather && (
              <div>
                <p>Weather: {trip.weather.location.name}</p>
                <p>Temperature: {trip.weather.current.temp_c}°C</p>
              </div>
            )}
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
