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
import Loader from "../Loader/Loader"
import { t } from 'i18next';

import { motion } from "framer-motion";


function ListeVoitures() {
  /*motion framer shit pour wait load*/
  const [estCharge, setEstCharge] = useState(false);

  
  const urlListeVoitures = "https://rustandco.onrender.com/api/voitures";
  const [listeVoitures, setListeVoitures] = useState([]);
const [filtres, setFiltres] = useState([]);

  useEffect(() => {
    // useEffect est juste quand il y a CHANGEMENT
    fetch(urlListeVoitures)
      .then((reponse) => reponse.json())
      .then((data) => {

        let newListeVoitures = data;
        
        if (filtres.length > 0) {
          if (filtres[0]) {
            newListeVoitures = newListeVoitures.filter(voiture => voiture.marque === filtres[0]);
          }
          if (filtres[1]) {
            newListeVoitures = newListeVoitures.filter(voiture => voiture.modele === filtres[1]);
          }
          if (filtres[2]) {
            newListeVoitures = newListeVoitures.filter(voiture => voiture.annee === filtres[2]);
          }
        }

        setListeVoitures(newListeVoitures);
        setEstCharge(true); //pour le wait du animation framer
      });
  }, [filtres]); //une seule fois lors du premier rendu quand on met un [] ici. sinon la var dans le [] est ce qui est ecoute pour changer
  // on peut passer dans ce array les variable pour ecoutee, dans ce cas filtres change

  //console.log(listeVoitures);

  const tuileVoiture = listeVoitures.map((voiture, index) => {
    return (
      <Link to={`/voiture/${voiture.id}`} key={index}>
        <TuileVoiture data={voiture} />  
      </Link>
    ); 
  });



  /*filtres*/
  async function filtre(marque,modele, annee) {
    let newMarque,newModele, newAnnee;
    marque == 'tous' ? newMarque = '' : newMarque = marque;
    modele == 'tous' ? newModele = '' : newModele = modele;
    annee == 'tous' ? newAnnee = '' : newAnnee = annee;
    setFiltres([newMarque, newModele, newAnnee]);
  }




   /*framer-motion stuff*/
   const transition = { duration: 0.3, ease: "easeInOut" };
   const variants = {
     hidden: { opacity: 0, y: 25 },
     visible: { opacity: 1, y: 0, transition },
     exit: { opacity: 0, y: 25, transition },
   };


  return (

    <div className="liste-voitures">
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
      {/* ce conditionnel fait que l'animation load bien */}
      {estCharge ? (
        listeVoitures.length > 0 ? (
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
          <div>{t('err_filtres')}</div>
        )
      ) : (
        < Loader />
      )}
      
    </div>


  );
}

export default ListeVoitures;
