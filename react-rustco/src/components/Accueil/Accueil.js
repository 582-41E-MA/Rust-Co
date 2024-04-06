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


function Accueil() {


  return (

   <h1 className="text-xl">This is home page</h1>


  );
}

export default Accueil;
