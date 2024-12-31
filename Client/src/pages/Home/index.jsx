import React, { useState } from "react";
import Header from "../../components/Header";
import ProductList from "../../components/ProductList";
import AddressManagement from "../../components/AddressManagement";
import PermissionModal from "../../components/PermissionModel";
import MapComponent from "../../components/MapComponent"; 
import { AddressProvider } from "../../context/AddressContext";

const Home = () => {
  const [isPermissionGranted, setPermissionGranted] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [location, setLocation] = useState(null); 

  const handlePermissionGrant = () => {
    setPermissionGranted(true);
    setModalOpen(false);
  };

  const handleLocationUpdate = (lat, lng) => {
    setLocation({ lat, lng });
    setPermissionGranted(true); // Mark permission as granted
    setModalOpen(false); // Close the modal after location is set
  };

  const handleLocateMe = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setPermissionGranted(true); 
        setModalOpen(false); 
      },
      (error) => {
        alert("Unable to retrieve your location.");
      }
    );
  };

  return (
    <AddressProvider>
      <div className="min-h-screen bg-gray-100">
        <Header />

        {!isPermissionGranted && (
          <ProductList onOrderNow={() => setModalOpen(true)} />
        )}

        {isPermissionGranted && <AddressManagement location={location} />}

        {isModalOpen && (
          <PermissionModal
            onClose={() => setModalOpen(false)}
            onGrantPermission={handlePermissionGrant}
          >
            <IntegratedAddressComponent />
          </PermissionModal>
        )}
      </div>
    </AddressProvider>
  );
};

export default Home;
