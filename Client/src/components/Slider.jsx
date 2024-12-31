import React, { useState } from "react";

const SliderComponent = () => {
  const [value, setValue] = useState(50); 

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    const slider = e.target.getBoundingClientRect();
    const newValue = ((touch.clientX - slider.left) / slider.width) * 100;
    if (newValue >= 0 && newValue <= 100) {
      setValue(newValue);
    }
  };

  return (
    <div className="flex flex-col items-center w-full p-4 bg-gray-100">
      <label className="mb-2 text-lg font-medium">Adjust Value</label>
      <div className="relative w-full max-w-sm">
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <div
          className="absolute top-0 left-0 h-2 bg-green-500 rounded-lg"
          style={{ width: `${value}%` }}
        ></div>
      </div>
      <span className="mt-2 text-sm">Value: {Math.round(value)}</span>
    </div>
  );
};

export default SliderComponent;
