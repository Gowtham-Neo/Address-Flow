import React, { createContext, useState, useContext } from "react";

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);

  const addAddress = (address) => {
    setAddresses([...addresses, address]);
  };

  const updateAddress = (id, updatedAddress) => {
    setAddresses(
      addresses.map((addr) => (addr.id === id ? updatedAddress : addr))
    );
  };

  const deleteAddress = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  return (
    <AddressContext.Provider
      value={{
        addresses,
        currentLocation,
        setCurrentLocation,
        addAddress,
        updateAddress,
        deleteAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddressContext = () => useContext(AddressContext);
