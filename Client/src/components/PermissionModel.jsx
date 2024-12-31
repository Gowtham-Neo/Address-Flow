import React, { useState } from "react";
import {
  FaExclamationCircle,
  FaMapMarkerAlt,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import MapComponent from "./MapComponent";

const PermissionModal = ({ onClose }) => {
  const [showFullScreenMap, setShowFullScreenMap] = useState(false);
  const [currentAddress, setCurrentAddress] = useState("");
  const [currentPosition, setCurrentPosition] = useState(null);

  const handleManualSelection = () => {
    setShowFullScreenMap(true);
  };

  const handleEnableLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setCurrentPosition([latitude, longitude]);

        const address = await fetchAddress(latitude, longitude);
        setCurrentAddress(address);

        setShowFullScreenMap(true);
      },
      (error) => {
        alert(
          "Unable to retrieve your location. Please enable location services and try again."
        );
        console.error(error);
      }
    );
  };
  const fetchAddress = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      return data.display_name || "Address not found";
    } catch (error) {
      console.error("Error fetching address:", error);
      return "Unable to fetch address";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="absolute text-gray-600 top-2 right-2 hover:text-gray-900"
        >
          <FaTimes size={24} />
        </button>

        <div className="flex justify-center text-5xl text-red-500">
          <FaExclamationCircle />
        </div>

        <p className="mt-4 font-bold text-center text-red-500">
          Location permission is off
        </p>

        <p className="mt-2 text-center text-gray-600">
          We need your location to find the nearest store & provide a seamless
          delivery experience.
        </p>

        <div className="flex flex-col mt-4 space-y-4">
          <button
            onClick={handleEnableLocation}
            className="flex items-center justify-center w-full px-4 py-2 space-x-2 text-lg text-white bg-red-500 rounded"
          >
            <FaMapMarkerAlt />
            <span>Enable Location</span>
          </button>

          <button
            className="flex items-center justify-center w-full px-4 py-2 space-x-2 text-lg bg-gray-200 rounded"
            onClick={handleManualSelection}
          >
            <FaSearch className="text-red-500" />
            <span className="font-semibold text-red-500">
              Search Your Location Manually
            </span>
          </button>
        </div>
      </div>

      {showFullScreenMap && (
        <MapComponent
          initialAddress={currentAddress}
          initialPosition={currentPosition}
          onClose={() => setShowFullScreenMap(false)}
        />
      )}
    </div>
  );
};

export default PermissionModal;
