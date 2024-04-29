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


import CarouselC from "../Carousel/Carousel";

function Accueil() {
  return (

    <div>
      <div>
        <CarouselC/>
      </div>
      <div className="pub_container bg-white_2">
        PUB
      </div>
    </div>

  );
}

export default Accueil;
