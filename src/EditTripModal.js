
// import React, { useState } from 'react';
// import Modal from 'react-modal';

// Modal.setAppElement('#root');

// const EditTripModal = ({ isOpen, onRequestClose, tripToEdit, onSaveEdit }) => {
//   const [editedTrip, setEditedTrip] = useState(tripToEdit);

//   const handleSave = () => {
//     onSaveEdit(editedTrip);
//     onRequestClose();
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onRequestClose}
//       contentLabel="Edit Trip Modal"
//     >
//       <h2>Edit Trip</h2>
//       <form>
//         <label>
//           Destination:
//           <input
//             type="text"
//             value={editedTrip.destination}
//             onChange={(e) =>
//               setEditedTrip({ ...editedTrip, destination: e.target.value })
//             }
//           />
//         </label>
//         <label>
//           Origin:
//           <input
//             type="text"
//             value={editedTrip.origin}
//             onChange={(e) =>
//               setEditedTrip({ ...editedTrip, origin: e.target.value })
//             }
//           />
//         </label>
//         <label>
//           Date:
//           <input
//             type="date"
//             value={editedTrip.date}
//             onChange={(e) =>
//               setEditedTrip({ ...editedTrip, date: e.target.value })
//             }
//           />
//         </label>
//         <label>
//           Mode of Transport:
//           <input
//             type="text"
//             value={editedTrip.transport}
//             onChange={(e) =>
//               setEditedTrip({ ...editedTrip, transport: e.target.value })
//             }
//           />
//         </label>
//         <label>
//           Expense:
//           <input
//             type="number" // Use type "number" for numeric input
//             value={editedTrip.expense}
//             onChange={(e) =>
//               setEditedTrip({ ...editedTrip, expense: parseFloat(e.target.value) })
//             }
//           />
//         </label>
//         <label>
//           People:
//           <input
//             type="number" // Use type "number" for numeric input
//             value={editedTrip.people}
//             onChange={(e) =>
//               setEditedTrip({ ...editedTrip, people: parseInt(e.target.value) })
//             }
//           />
//         </label>
//         <button onClick={handleSave}>Save</button>
//         <button onClick={onRequestClose}>Cancel</button>
//       </form>
//     </Modal>
//   );
// };

// export default EditTripModal;

import React, { useState } from 'react';
import Modal from 'react-modal';
import './EditTripModal.css'; // Import the CSS file

Modal.setAppElement('#root');

const EditTripModal = ({ isOpen, onRequestClose, tripToEdit, onSaveEdit }) => {
  const [editedTrip, setEditedTrip] = useState(tripToEdit);

  const handleSave = () => {
    onSaveEdit(editedTrip);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Trip Modal"
      className="modal-content"
    >
      <div className="modal-header">
        <h2>Edit Trip</h2>
      </div>
      <form className="modal-form">
        <label>
          Destination:
          <input
            type="text"
            value={editedTrip.destination}
            onChange={(e) =>
              setEditedTrip({ ...editedTrip, destination: e.target.value })
            }
          />
        </label>
        <label>
          Origin:
          <input
            type="text"
            value={editedTrip.origin}
            onChange={(e) =>
              setEditedTrip({ ...editedTrip, origin: e.target.value })
            }
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            value={editedTrip.date}
            onChange={(e) =>
              setEditedTrip({ ...editedTrip, date: e.target.value })
            }
          />
        </label>
        <label>
          Mode of Transport:
          <input
            type="text"
            value={editedTrip.transport}
            onChange={(e) =>
              setEditedTrip({ ...editedTrip, transport: e.target.value })
            }
          />
        </label>
        <label>
          Expense:
          <input
            type="number"
            value={editedTrip.expense}
            onChange={(e) =>
              setEditedTrip({ ...editedTrip, expense: parseFloat(e.target.value) })
            }
          />
        </label>
        <label>
          People:
          <input
            type="number"
            value={editedTrip.people}
            onChange={(e) =>
              setEditedTrip({ ...editedTrip, people: parseInt(e.target.value) })
            }
          />
        </label>
        <button onClick={handleSave}>Save</button>
        <button onClick={onRequestClose} className="cancel">Cancel</button>
      </form>
    </Modal>
  );
};

export default EditTripModal;
