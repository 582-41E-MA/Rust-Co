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


import CarouselC from "../CarouselC/CarouselC";

function Accueil() {
  return (
    <CarouselC/>
  );
}

export default Accueil;
