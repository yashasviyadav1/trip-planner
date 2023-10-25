// Map.js
// import React from 'react';
// import { GoogleMap, LoadScript } from '@react-google-maps/api';

// const Map = ({ center, zoom }) => {
//   return (
//     <LoadScript googleMapsApiKey="AIzaSyBG0QOtvVTVVUPRxByRJnL6GzTO4RpNS7o">
//       <GoogleMap center={center} zoom={zoom}>
        
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default Map;
// Map.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MyMap = () => {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A point of interest.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MyMap;
