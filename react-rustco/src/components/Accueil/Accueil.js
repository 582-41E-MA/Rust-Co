import { useState, useEffect } from "react";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import './Accueil.css';
import Info from "../Info/Info";


import CarouselC from "../Carousel/Carousel";

function Accueil() {
  return (
  <div className="relative">
    <div>
      <CarouselC />
    </div>
    <Info/>
  </div>


  );
}

export default Accueil;
