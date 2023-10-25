import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); 

const TripModal = ({ isOpen, onRequestClose, onCreateTrip }) => {
  const [destination, setDestination] = useState('');
  
  const [origin, setOrigin] = useState('');
  const [date, setDate] = useState('');
  const [transport, setTransport] = useState('');
  
  

  const handleCreateTrip = () => {
    
    if (destination && origin && date && transport) {
      onCreateTrip({ destination, origin, date, transport });
      onRequestClose();
    } else {
      
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Create Trip Modal"
    >
      <h2>Create Trip</h2>
      <form>
        <label>
          Destination:
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </label>
        <label>
          Origin:
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label>
          Mode of Transport:
          <input
            type="text"
            value={transport}
            onChange={(e) => setTransport(e.target.value)}
          />
        </label>
        <button onClick={handleCreateTrip}>Create Trip</button>
        <button onClick={onRequestClose}>Cancel</button>
      </form>
    </Modal>
  );
};

export default TripModal;