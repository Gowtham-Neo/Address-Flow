import React, { useEffect, useState } from "react";
import {
  FaHome,
  FaUserFriends,
  FaUsers,
  FaBriefcase,
  FaMapMarkerAlt,
} from "react-icons/fa";

const AddressForm = ({ onaddress }) => {
  const [selectedAddressType, setSelectedAddressType] = useState("");
  const [houseFlatBlock, setHouseFlatBlock] = useState("");
  const [apartmentRoadArea, setApartmentRoadArea] = useState("");
  const [user, setuser] = useState("");


  const handleAddressTypeSelect = (type) => {
    setSelectedAddressType(type);
  };

  const handleSave = async (e) => {
    if (selectedAddressType && (houseFlatBlock || apartmentRoadArea)) {
      const addressData = {
        houseFlatBlock,
        apartmentRoadArea,
        addressType: selectedAddressType,
        country: "India", 
        userId: user.id, 
      };

      try {
        const response = await fetch("http://localhost:3000/api/addresses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`, 
          },
          body: JSON.stringify(addressData),
        });

        const result = await response.json();
        if (response.ok) {
          console.log("Address created successfully", result);
        } else {
          console.error("Failed to create address", result);
        }
      } catch (error) {
        console.error("Error saving address:", error);
      }
    } else if (onaddress) {
      const addressData = {
        houseFlatBlockNo: onaddress,
        apartmentRoadArea: "",
        city:"",
        state:"",
        postalCode:"",
        type: selectedAddressType || "Unknown",
        country: "",
        userId: user.id,
      };

      try {
        const response = await fetch("http://localhost:3000/api/addresses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(addressData),
        });

        const result = await response.json();
        if (response.ok) {
          console.log("Address from map created successfully", result);
        } else {
          console.error("Failed to create address", result);
        }
      } catch (error) {
        console.error("Error saving address:", error);
      }
    } else {

      localStorage.setItem("selectedAddressType", selectedAddressType);
      console.log("Saved to local storage:", selectedAddressType);
    }
  };

  useEffect(() => {
    setuser(JSON.parse(localStorage.getItem("user")));
    if (!user) {
      const storedAddressType = localStorage.getItem("selectedAddressType");
      if (storedAddressType) {
        setSelectedAddressType(storedAddressType);
      }
    }
  }, []);

  return (
    <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg">
 
      {user && <h1 className="text-xl font-bold">{user.name}</h1>}
      <div className="flex items-center gap-2 mb-4">
        <h1 className="flex text-lg font-semibold">
          <FaMapMarkerAlt size={24} className="text-red-500 " />
          {onaddress || "Select Address"}
        </h1>
      </div>

      <h1 className="font-bold text-center">Or</h1>

      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg">
          <form>
            <div className="mb-4">
              <label
                htmlFor="houseFlatBlock"
                className="block text-sm font-semibold text-gray-700"
              >
                HOUSE / FLAT / BLOCK NO.
              </label>
              <input
                type="text"
                id="houseFlatBlock"
                value={houseFlatBlock}
                onChange={(e) => setHouseFlatBlock(e.target.value)}
                placeholder="Enter House/Flat/Block No."
                className="w-full px-4 py-2 mt-2 border rounded-md"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="apartmentRoadArea"
                className="block text-sm font-semibold text-gray-700"
              >
                APARTMENT / ROAD / AREA
              </label>
              <input
                type="text"
                id="apartmentRoadArea"
                value={apartmentRoadArea}
                onChange={(e) => setApartmentRoadArea(e.target.value)}
                placeholder="Enter Apartment/Road/Area"
                className="w-full px-4 py-2 mt-2 border rounded-md"
              />
            </div>

            <div className="flex justify-between gap-6 mb-4">
              <div
                className={`cursor-pointer ${
                  selectedAddressType === "Home"
                    ? "text-red-500"
                    : "text-gray-600"
                }`}
                onClick={() => handleAddressTypeSelect("Home")}
              >
                <FaHome size={24} />
                <span>Home</span>
              </div>
              <div
                className={`cursor-pointer ${
                  selectedAddressType === "Work"
                    ? "text-red-500"
                    : "text-gray-600"
                }`}
                onClick={() => handleAddressTypeSelect("Work")}
              >
                <FaBriefcase size={24} />
                <span>Work</span>
              </div>
              <div
                className={`cursor-pointer ${
                  selectedAddressType === "Friend"
                    ? "text-red-500"
                    : "text-gray-600"
                }`}
                onClick={() => handleAddressTypeSelect("Friend")}
              >
                <FaUserFriends size={24} />
                <span>Friend</span>
              </div>
              <div
                className={`cursor-pointer ${
                  selectedAddressType === "Family"
                    ? "text-red-500"
                    : "text-gray-600"
                }`}
                onClick={() => handleAddressTypeSelect("Family")}
              >
                <FaUsers size={24} />
                <span>Family</span>
              </div>
            </div>

            {selectedAddressType && (
              <button
                onClick={handleSave}
                className="w-full px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
              >
                Save as {selectedAddressType}
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
