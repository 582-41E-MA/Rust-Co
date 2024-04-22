import { createContext, useState, useEffect } from "react";
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
import CreateUser from "../CreateUser/CreateUser";
import Admin from "../Admin/Admin";
import CreateVoiture from "../CreateVoiture/CreateVoiture";
import UpdateVoiture from "../UpdateVoiture/UpdateVoiture";
import UpdateUser from "../UpdateUser/UpdateUser";
import Panier from "../Panier/Panier";
import './App.css';

import { useTranslation} from 'react-i18next';
import { jwtDecode } from "jwt-decode";

export const AppContext = React.createContext();

///////////// yoooooooooooooooooooooooooooooooooo /////////////////////////////

function App() {

  const { t } = useTranslation();
  
  ///// LANGUAGE STUFF Custom/////
  const [lang, setLang] = useState(localStorage.getItem('siteLang') || 'fr'); // Default lang
  const toggleLang = () => {
    setLang((current) => (current == 'fr' ? 'en' : 'fr'));
  }; 
  useEffect(() => {
    localStorage.setItem('siteLang', lang);
    document.documentElement.lang = lang;
  }, [lang]); 
  document.documentElement.lang = lang;
  ////////////////////////////

  //////// LOGGING STUFF ///////////////
  const [logging, setLogging] = useState({ estLog: false, utilisateur: "" });
  //const location = useLocation();
  async function login(e) {
    e.preventDefault();
    const form = e.target;
    const body = {
      courriel: form.courriel.value,
      password: form.mdp.value,

    };
    const data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    //                                      METTRE PORT DE NODE ICI!!!!!!!!!!
    const reponse = await fetch(
      "https://rustandco.onrender.com/api/utilisateurs/connexion",

      data
    );
    const token = await reponse.json(); // je recois un reponse, deconstruit (async), ensuit metre dans var reponse
    if (reponse.status == 200) {
      //storer le jeton dans le localstorge
      localStorage.setItem("logged-user", token);
      setLogging({ estLog: true, utilisateur: body.courriel })

     // console.log(jetonValide());
    }
    form.reset(); //pour vider le champ
  }

  function jetonValide() {
    try {
      const token = localStorage.getItem("logged-user");
      const decode = jwtDecode(token);
      if (Date.now() < decode.exp * 1000) {
        return true;
      } else {
        localStorage.removeItem("logged-user")
      }
    } catch (erreur) {}
  }

  function logout() {
    setLogging({
      estLog: false,
      utilisateur: "",
    });
  }


  return (
    <AppContext.Provider value={{ lang, toggleLang }}>
      <div className="flex flex-col min-h-screen">
        <Entete />
        <main className="flex-grow min-h-screen main max-w-6xl mx-auto p-4">
          <Router>
            <Routes >
              <Route path="/" element={<Accueil />} />
              <Route path="/liste-voitures" element={<ListeVoitures />} />
              <Route path="/a-propos" element={<APropos />} />
              <Route path="/login" element={<Login handleLogin={login} logging={logging} handleLogout={logout} />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/termes-et-conditions" element={<Termes />} />
              <Route path="/politique" element={<Politique />} />
              <Route path="/Voiture/:id" element={<Voiture />} />
              <Route path="/create-user" element={<CreateUser />} />
              <Route path="/create-voiture" element={<CreateVoiture />} />
              <Route path="/update-voiture/:id" element={<UpdateVoiture />} />
              <Route path="/update-user/:id" element={<UpdateUser />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/panier" element={<Panier />} />
            </Routes>
          </Router>
        </main>
        <Footer className="mt-auto" />
        
      </div>
    </AppContext.Provider>
  );
}



export default App;
