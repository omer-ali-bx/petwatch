import React, { createContext, useContext, useState } from 'react';

const LocationContext = createContext();

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

export const LocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [userAddress, setUserAddress] = useState(null);

  const updateLocation = (location, address) => {
    setUserLocation(location);
    setUserAddress(address);
  };

  return (
    <LocationContext.Provider
      value={{
        userLocation,
        userAddress,
        updateLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContext;

