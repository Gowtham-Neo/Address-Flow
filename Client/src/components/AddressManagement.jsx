import React from "react";
import { useAddressContext } from "../context/AddressContext";

function AddressManagement() {
  const { addresses, deleteAddress } = useAddressContext();

  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold mb-4">Manage Addresses</h2>
      {addresses.map((address) => (
        <div
          key={address.id}
          className="bg-white shadow-md rounded p-4 mb-2 flex justify-between items-center"
        >
          <div>
            <p className="font-bold">{address.category}</p>
            <p>
              {address.house}, {address.apartment}
            </p>
          </div>
          <button
            onClick={() => deleteAddress(address.id)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default AddressManagement;
