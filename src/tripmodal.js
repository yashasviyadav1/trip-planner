 
import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './tripmodal.css';
Modal.setAppElement('#root');

const TripModal = ({ isOpen, onRequestClose, onCreateTrip }) => {
  const [destination, setDestination] = useState('');
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [origin, setOrigin] = useState('');
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [date, setDate] = useState('');
  const [transport, setTransport] = useState('');
  const [expense, setExpense] = useState('');
  const [people, setPeople] = useState('');
  const [destinationSuggestionSelected, setDestinationSuggestionSelected] = useState(false);
  const [originSuggestionSelected, setOriginSuggestionSelected] = useState(false);


  const destinationInputRef = useRef(null);
  const originInputRef = useRef(null);

  useEffect(() => {
    if (destination.trim() !== '') {
      const options = {
        method: 'GET',
        url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
        params: { namePrefix: destination },
        headers: {
          'X-RapidAPI-Key': 'e08f6de851mshdca747773fbaea8p1255b7jsn3c8532970c16',
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
        },
      };

      axios
        .request(options)
        .then((response) => {
          const cityNames = response.data.data.map((city) => city.city);
          setDestinationSuggestions(cityNames);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setDestinationSuggestions([]);
      if (!destinationSuggestionSelected) {
        setOrigin('');
      }
    }
  }, [destination, destinationSuggestionSelected]);

  useEffect(() => {
    if (origin.trim() !== '') {
      const options = {
        method: 'GET',
        url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
        params: { namePrefix: origin },
        headers: {
          'X-RapidAPI-Key': 'e08f6de851mshdca747773fbaea8p1255b7jsn3c8532970c16',
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
        },
      };

      axios
        .request(options)
        .then((response) => {
          const cityNames = response.data.data.map((city) => city.city);
          setOriginSuggestions(cityNames);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setOriginSuggestions([]);
      if (!originSuggestionSelected){
        setOrigin('');
      }
    }
  }, [origin,originSuggestionSelected]);

  useEffect(() => {
    // Add a click event listener to the document
    const handleDocumentClick = (event) => {
      if (
        (destinationInputRef.current &&
        !destinationInputRef.current.contains(event.target)) || (originInputRef.current && !originInputRef.current.contains(event.target)) 
      ) {
        // Click occurred outside the destination input field
        setDestinationSuggestions([]);
        setOriginSuggestions([]);
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener('click', handleDocumentClick);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const handleCreateTrip = () => {
    if (
      destination &&
      origin &&
      date &&
      transport &&
      /^\d+$/.test(expense) &&
      /^\d+$/.test(people) &&
      parseInt(expense) > 0 &&
      parseInt(people) > 0
    ) {
      onCreateTrip({ destination, origin, date, transport, expense, people });
      onRequestClose();
      setDestinationSuggestionSelected(false);
      setOriginSuggestionSelected(false);
    } else {
      alert('Please enter a valid expense and number of people (natural positive numbers).');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Create Trip Modal"
    >
      <h2>Create Trip</h2>
      <form className="create-trip-form">
        <div className="create-trip-container-div">
          <label>
            <p class="para-before-inputfield">Destination:</p>
            <input
              ref={destinationInputRef}
              className="input-field"
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </label>
          <br />
          {destinationSuggestions.length > 0 && (
            <ul className="suggestions-dropdown">
              {destinationSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setDestination(suggestion);
                    setDestinationSuggestionSelected(true);
                    setDestinationSuggestions([]);
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
          <label>
            <p class="para-before-inputfield">Origin:</p>
            <input
              className="input-field"
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
          </label>
          <br />
          
          {originSuggestions.length > 0 && (
            <ul className="suggestions-dropdown">
              {originSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setOrigin(suggestion);
                    setOriginSuggestionSelected(true);
                    setOriginSuggestions([]);
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
          <label>
            <p class="para-before-inputfield">Date:</p>
            <input
              className="input-field"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <br />
          <label>
            <p class="para-before-inputfield">Mode of Transport:</p>
            <input
              className="input-field"
              type="text"
              value={transport}
              onChange={(e) => setTransport(e.target.value)}
            />
          </label>
          <br />
          <label>
            <p class="para-before-inputfield">Expenses:</p>
            <input
              className="input-field"
              type="text"
              value={expense}
              onChange={(e) => setExpense(e.target.value)}
            />
          </label>
          <br />
          <label>
            <p class="para-before-inputfield">People:</p>
            <input
              className="input-field"
              type="text"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
            />
          </label>
          <br />
          <button className="create-trip-btn" onClick={handleCreateTrip}>
            Create Trip
          </button>
          <br />
          <button className="cancel-btn" onClick={onRequestClose}>
            Cancel
          </button>
          <br />
        </div>
      </form>
    </Modal>
  );
};

export default TripModal;





