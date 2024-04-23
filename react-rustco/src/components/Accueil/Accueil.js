import { useState, useEffect } from "react";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Entete from "../Entete/Entete";
import './Accueil.css';

import CarouselF from "../Carousel/Carousel";

function Accueil() {
  return (
    <div className="cover absolute top-16 left-0 w-full">
      <CarouselF/>
    </div>
  );
}

export default Accueil;
