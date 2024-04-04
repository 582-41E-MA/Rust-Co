import { NavLink } from "react-router-dom";
import "./Entete.css";
import React, { useState } from 'react';
//import { useContext } from "react";
//import { AppContext } from "../App/App";

function Entete(props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center flex-wrap">
        {/* Brand Name - Always visible */}
        <a href="#" className="text-white text-lg font-semibold flex-shrink-0">BrandName</a>

        {/* Burger Menu Icon - Visible on mobile */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
        </div>

        {/* Navigation and Account Links */}
        <div className={`w-full md:flex md:items-center md:justify-between ${menuOpen ? 'flex' : 'hidden'} flex-col md:flex-row mt-2 md:mt-0`}>
          {/* Navigation Links - Centered on desktop */}
          <div className="flex flex-col md:flex-row md:space-x-4 justify-center flex-grow">
            <a href="/home" className="block hover:bg-gray-700 px-3 py-2 rounded text-base md:text-sm">Home</a>
            <a href="/cars" className="block hover:bg-gray-700 px-3 py-2 rounded text-base md:text-sm">Cars</a>
            <a href="/about" className="block hover:bg-gray-700 px-3 py-2 rounded text-base md:text-sm">About</a>
            <a href="/community" className="block hover:bg-gray-700 px-3 py-2 rounded text-base md:text-sm">Community</a>
          </div>
          {/* Login and Create Account Links - Right-aligned on desktop */}
          <div className="flex flex-col md:flex-row md:space-x-4 justify-end flex-grow mt-2 md:mt-0">
            <a href="/login" className="block hover:bg-gray-700 px-3 py-2 rounded text-base md:text-sm">Login</a>
            <a href="/create-account" className="block hover:bg-gray-700 px-3 py-2 rounded text-base md:text-sm">Create Account</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Entete;
