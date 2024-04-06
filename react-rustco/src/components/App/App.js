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
import Footer from "../Footer/Footer";
import Home from "../Accueil/Accueil";
import ListeVoitures from "../ListeVoitures/ListeVoitures";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import './App.css';


function App() {


  return (
<div>
  <Entete />
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/liste-voitures" element={<ListeVoitures />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    
    </Routes>
  </Router>
  <Footer />
</div>

  );
}

export default App;
