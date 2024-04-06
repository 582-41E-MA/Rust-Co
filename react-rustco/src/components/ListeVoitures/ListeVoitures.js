import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import './ListeVoitures.css';
import Entete from "../Entete/Entete";
import TuileVoiture from "../TuileVoiture/TuileVoiture";
import Filtres from "../Filtres/Filtres";

import { motion } from "framer-motion";


function ListeVoitures() {
  /*motion framer shit pour wait load*/
  const [estCharge, setEstCharge] = useState(false);

  const urlListeVoitures = "https://rustandco.onrender.com/api/voitures";
  const [urlFiltre, setUrlFiltre] = useState([urlListeVoitures]);
  const [listeVoitures, setListeVoitures] = useState([]);

  //console.log("rendu");
  // react eccoute si il y a un changement detat, mais pas etatTest
  useEffect(() => {
    // useEffect est juste quand il y a CHANGEMENT
    //  console.log("rendu");
    fetch(urlFiltre)
      .then((reponse) => reponse.json())
      .then((data) => {
        setListeVoitures(data);
        setEstCharge(true); //pour le wait du animation framer
      });
  }, [urlFiltre]); //une seule fois lors du premier rendu quand on met un [] ici. sinon la var dans le [] est ce qui est ecoute pour changer
  // on peut passer dans ce array les variable pour ecoutee, dans ce cas urlFiltre change


  const tuileVoiture = listeVoitures.map((voiture, index) => {
    return (
      <Link to={`/voiture/${voiture.id}`} key={index}>
        <TuileVoiture data={voiture} />
        <TuileVoiture data={voiture} />
        <TuileVoiture data={voiture} />
        <TuileVoiture data={voiture} />
      </Link>
    ); 
  });




  async function filtre(e) {
    e.preventDefault();

    const valeurFiltre = e.target.value;
    const [champ, ordre] = valeurFiltre.split("-");

    const urlAvecFiltre = `http://localhost:3301/api/films?tri=${champ}&order-direction=${ordre}`;

    try {
      const response = await fetch(urlAvecFiltre);

      if (!response.ok) {
        throw new Error(`Erreur: ${response.statusText}`);
      }

      const voituresFiltres = await response.json();

      setListeVoitures(voituresFiltres);
    } catch (error) {
      console.error("Erreur de filtres", error);
    }
  }






   /*framer-motion stuff*/
   const transition = { duration: 0.3, ease: "easeInOut" };
   const variants = {
     hidden: { opacity: 0, y: 25 },
     visible: { opacity: 1, y: 0, transition },
     exit: { opacity: 0, y: 25, transition },
   };


  return (

    <div>
      {/* <button onClick={() => setEtat(!etat)}>change etat</button>
      <p>{JSON.stringify(etat)}</p>

      <button onClick={() => setEtatTest(!etatTest)}>change etat test</button>
      <p>{JSON.stringify(etatTest)}</p> */}
      {estCharge ? (
        <motion.div
          key="filtres"
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0, transition }}
          exit={{ opacity: 0, x: -25, transition }}
          className="filtres"
        >
          <Filtres handleFiltres={filtre} />
        </motion.div>
      ) : (
        ""
      )}
      {/* ce conditionnel fait que lanimation load bien */}
      {estCharge ? (
        
        <motion.div
          key="liste"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          className="tuiles-container"
        >
          {tuileVoiture}
        </motion.div>
      ) : (
        ""
      )}
      ;
    </div>


  );
}

export default ListeVoitures;
