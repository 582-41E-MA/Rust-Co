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
import Accueil from "../Accueil/Accueil";
import ListeVoitures from "../ListeVoitures/ListeVoitures";
import APropos from "../APropos/APropos";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import './App.css';


function App() {


  return (
    <div className="flex flex-col min-h-screen">
      <Entete />
      <div className="flex-grow">
        <Router>
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/liste-voitures" element={<ListeVoitures />} />
            <Route path="/a-propos" element={<APropos />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          
          </Routes>
        </Router>
      </div>
      <Footer className="mt-auto" />
    </div>

  );
}

export default App;
