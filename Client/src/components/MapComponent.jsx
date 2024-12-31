import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FaTimes, FaCrosshairs } from "react-icons/fa";
import axios from "axios";
import AddressForm from "./AddressForm";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const MapComponent = ({ initialAddress, onClose }) => {
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState(initialAddress || "");

  const SetViewOnPositionChange = ({ position }) => {
    const map = useMap();
    if (position) {
      map.setView(position, 13); // Zoom level 13
    }
    return null;
  };

  const fetchCoordinates = async (address) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${address}`
      );
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        const coordinates = [parseFloat(lat), parseFloat(lon)];
        setPosition(coordinates);
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  const fetchAddress = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const { display_name } = response.data;
      const newAddress = display_name || "Address not found";
      setAddress(newAddress);
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress("Unable to fetch address");
    }
  };

  const MapEventHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        fetchAddress(lat, lng);
      },
    });
    return null;
  };

  const locateMe = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        fetchAddress(latitude, longitude);
      },
      () => {
        alert("Unable to retrieve location. Please enable location services.");
      }
    );
  };

  useEffect(() => {
    if (initialAddress) {
      fetchCoordinates(initialAddress);
    }
  }, [initialAddress]);

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <div className="flex items-center justify-between p-4 text-white bg-gray-800">
        <h2 className="text-lg font-bold">Select Your Location</h2>
        <button onClick={onClose} className="text-white">
          <FaTimes size={24} />
        </button>
      </div>

      <div className="relative flex-grow h-[80vh] flex">
        <div className="flex-grow">
          <MapContainer
            center={position || [20, 77]} 
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {position && <Marker position={position} />}
            {position && <SetViewOnPositionChange position={position} />}
            <MapEventHandler />
          </MapContainer>
        </div>

        <div className="w-1/3 p-4 overflow-y-auto bg-white">
          <AddressForm onaddress={address} />
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-gray-100 border-t">
        <button
          onClick={locateMe}
          className="flex items-center px-4 py-2 text-white bg-red-500 rounded"
        >
          <FaCrosshairs className="mr-2" />
          Locate Me
        </button>
        <div>
          <p className="text-sm ">
            <strong className="text-red-500">Address:</strong> {address || "Click on the map or locate"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
