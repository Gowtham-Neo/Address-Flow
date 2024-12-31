import React, { useState } from "react";
import PermissionModal from "./PermissionModel";
import Graphic from "../assets/Graphic.jpg";
import i5 from "../assets/i5.jpg";
import image from "../assets/image.png";
import mobile from "../assets/mobile.jpg";
import mouse from "../assets/mouse.jpg";
import pen from "../assets/pen.jpg";

const ProductList = ({ onOrderNow }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    {
      id: 1,
      name: "Graphic Card",
      price: "$5",
      image: Graphic,
    },
    {
      id: 2,
      name: "i5 Processor",
      price: "$3",
      image: i5,
    },
    {
      id: 3,
      name: "Laptop",
      price: "$2",
      image: image,
    },
    {
      id: 4,
      name: "Samsung Mobile Phone",
      price: "$2",
      image: mobile,
    },
    {
      id: 5,
      name: "Wireless Mouse",
      price: "$2",
      image: mouse,
    },
    {
      id: 6,
      name: "1TB Pen Drive",
      price: "$2",
      image: pen,
    },
  ];

  const handleOrderNow = (product) => {
    setSelectedProduct(product); 
    setModalOpen(true); 
  };

  return (
    <div className="container p-4 mx-auto">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-4 transition bg-white rounded-lg shadow-lg hover:shadow-xl"
          >
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full mb-4 rounded-md h-44"
            />
            <h3 className="text-lg font-semibold text-gray-800">
              {product.name}
            </h3>
            <p className="text-gray-600">{product.price}</p>
            <button
              onClick={() => handleOrderNow(product)} 
              className="w-full px-4 py-2 mt-4 text-lg text-white bg-yellow-500 rounded hover:bg-yellow-600"
            >
              Order Now
            </button>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <PermissionModal
          onClose={() => setModalOpen(false)} 
          product={selectedProduct} 
        />
      )}
    </div>
  );
};

export default ProductList;
