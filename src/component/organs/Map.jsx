// GoogleMapComponent.jsx
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Card } from '@mui/material';
const containerStyle = {
  width: '50%',
  height: '400px',
  
};

const GoogleMapComponent = ({ lat, lng }) => {
  const center = {
    lat: lat,
    lng: lng
  };

  return (
    // <Card>
    <LoadScript googleMapsApiKey={import.meta.env.YOUR_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
    // </Card>
  );
}

export default GoogleMapComponent;
