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
    <div className="flex ">
      <div>
        <CarouselC/>
      </div>
      <div className="flex absolute left-0 bottom-0 bg-white_1 w-full">
        <div className="justify-center">
          Je suis une publiciter
        </div>
      </div>
    </div>

  );
}

export default Accueil;
