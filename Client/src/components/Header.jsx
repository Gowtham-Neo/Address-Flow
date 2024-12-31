import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [homeAddress, setHomeAddress] = useState("");
  const [user, setuser] = useState("");

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userHomeAddress = localStorage.getItem("homeAddress");

    if (user) {
      setIsAuthenticated(true);
      setuser(user)
    }
    if (userHomeAddress) {
      setHomeAddress(userHomeAddress);
    }
  }, []);

  return (
    <header className="bg-black shadow-md">
      <div className="container flex items-center justify-between px-4 py-3 mx-auto">
        <div className="flex items-center space-x-2">
          <FaShoppingCart className="text-3xl text-white" />
          <h1 className="text-2xl font-bold text-white">
            Delivery<span className="text-yellow-500">X</span>
          </h1>
        </div>

        <nav className="hidden space-x-6 md:flex">
          {isAuthenticated && (
            <a
              href="#home"
              className="text-lg text-white transition hover:text-yellow-200"
            >
              Home
            </a>
          )}
          <a
            href="#products"
            className="text-lg text-white transition hover:text-yellow-200"
          >
            Products
          </a>
          <a
            href="#about"
            className="text-lg text-white transition hover:text-yellow-200"
          >
            About
          </a>
          <a
            href="#contact"
            className="text-lg text-white transition hover:text-yellow-200"
          >
            Contact
          </a>
        </nav>

        <div className="items-center hidden px-3 py-1 space-x-2 bg-white rounded-full shadow md:flex">
          <input
            type="text"
            placeholder="Search..."
            className="w-full text-gray-700 placeholder-gray-500 outline-none"
          />
          <button className="font-bold text-yellow-500">Search</button>
        </div>

        <div className="items-center hidden space-x-4 md:flex">
          {isAuthenticated ? (
            <>
              <span className="text-lg text-white">Welcome, {user.name}</span>
              <a
                href="/logout"
                className="flex items-center text-lg text-yellow-500 transition hover:text-yellow-200"
              >
                <FaUserCircle className="mr-2" />
                Logout
              </a>
            </>
          ) : (
            <>
              <a
                href="/signin"
                className="flex items-center text-lg text-yellow-500 transition hover:text-yellow-400"
              >
                <FaUserCircle className="mr-2" />
                Login
              </a>
              <a
                href="/signup"
                className="px-4 py-2 font-bold text-white transition bg-yellow-500 rounded-full hover:text-gray-200"
              >
                Sign Up
              </a>
            </>
          )}
        </div>

        <div className="flex items-center md:hidden">
          <FiMenu
            className="text-2xl text-white cursor-pointer"
            onClick={toggleMenu}
          />
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 bg-black bg-opacity-75 z-50 h-full w-3/4 transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button className="text-2xl text-white" onClick={toggleMenu}>
            &times;
          </button>
        </div>
        <nav className="flex flex-col items-center space-y-6">
          {isAuthenticated && homeAddress && (
            <a
              href="#home"
              className="text-lg text-white transition hover:text-yellow-200"
            >
              Home
            </a>
          )}
          <a
            href="#products"
            className="text-lg text-white transition hover:text-yellow-200"
          >
            Products
          </a>
          <a
            href="#about"
            className="text-lg text-white transition hover:text-yellow-200"
          >
            About
          </a>
          <a
            href="#contact"
            className="text-lg text-white transition hover:text-yellow-200"
          >
            Contact
          </a>

          {isAuthenticated ? (
            <a
              href="/logout"
              className="flex items-center text-lg text-yellow-500 transition hover:text-yellow-200"
            >
              <FaUserCircle className="mr-2" />
              Logout
            </a>
          ) : (
            <>
              <a
                href="/signin"
                className="flex items-center text-lg text-yellow-500 transition hover:text-yellow-200"
              >
                <FaUserCircle className="mr-2" />
                Login
              </a>
              <a
                href="/signup"
                className="px-4 py-2 font-bold text-white transition bg-yellow-500 rounded-full hover:bg-gray-100"
              >
                Sign Up
              </a>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
