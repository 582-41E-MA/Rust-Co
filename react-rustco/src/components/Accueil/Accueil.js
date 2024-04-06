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

   <div className="cover absolute top-0 left-0 w-full z-[-1]">
    <img src="/img/cover.jpg"></img>
   </div>


  );
}

export default Accueil;
