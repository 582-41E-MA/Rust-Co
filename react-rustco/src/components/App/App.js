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
import Voiture from "../Voiture/Voiture";
import Termes from "../Termes/Termes";
import Politique from "../Politique/Politique";
import APropos from "../APropos/APropos";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import './App.css';


export const AppContext = React.createContext();

function App() {

  return (
    <div className="flex flex-col min-h-screen">
      <Entete />
      <main className="flex-grow min-h-screen main max-w-6xl mx-auto p-4">
        <Router>
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/liste-voitures" element={<ListeVoitures />} />
            <Route path="/a-propos" element={<APropos />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/termes-et-conditions" element={<Termes />} />
            <Route path="/politique" element={<Politique />} />
            <Route path="/Voiture/:id" element={<Voiture />} />
          
          </Routes>
        </Router>
      </main>
      <Footer className="mt-auto" />
    </div>

  );
}

export default App;
