import { useEffect, useState, useContext } from "react";
import { AppContext } from "../App/App";
import "./Voiture.css";
import { motion, AnimatePresence } from "framer-motion";
import * as React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import i18next from "react-i18next";
import BreadcrumbC from "../BreadcrumbC/BreadcrumbC";

export const VoitureContext = React.createContext();

function Voiture() {
  const navigate = useNavigate();
  let context = useContext(AppContext);
  let { id } = useParams();

  const urlVoiture = `https://rustandco.onrender.com/api/voitures/${id}`;
  const [voiture, setVoiture] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetch(urlVoiture)
      .then((response) => response.json())
      .then((data) => {
        setVoiture(data);
      })
      .catch((error) => {
        console.error('erreur de fetch voiture:', error);
      });
  }, [urlVoiture]);

   //language switch description
   let langDescription;
      useEffect(() => {
      langDescription = context.language == "en" ? voiture.description_en : voiture.description_fr;
   }, [voiture, context.language]);
      //description lang toggle
      document.documentElement.lang == "en" ? langDescription = voiture.description_en : langDescription = voiture.description_fr;

      //////////AFFICHAGE DU VRAI PRIX///////////////
      const prix = Number(voiture?.prix_achete);
      const profit = Number(voiture?.profit);
      const prixFinal = (prix*((100+profit)/100)).toFixed(2)
     
 /////// AJOUTER AU PANIER ////////////
  function ajouter() {
    // Retrieve the cart from local storage or initialize an empty array if none exists
    const panier = JSON.parse(localStorage.getItem('panier')) || [];
    // Add the current car's information to the cart
    const autoInfo = {
        id: voiture.id,
        marque: voiture.marque,
        modele: voiture.modele,
        annee: voiture.annee,
        condition: voiture.condition,
        prix: prixFinal,
        image: voiture.image
    };

    // Check if the car is already in the cart
    const isCarInCart = panier.some(item => item.id === autoInfo.id);

    if (!isCarInCart) {
        panier.push(autoInfo);
        // Save the updated cart back to local storage
        localStorage.setItem('panier', JSON.stringify(panier));
        console.log('auto ajouté au panier');
    } else {
        console.log('deja dans le panier');
    }
  }

  return (
    <div>
      <div className="flex flex-col rounded-2xl overflow-hidden p-6 custom-shadow bg-sand_1">
        <BreadcrumbC breadVoiture={voiture}/>
        <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row md:space-x-8 my-8 ">
          <div className="flex-1 custom-shadow_2 rounded-2xl bg-aged_2 p-4">
            <motion.div
              layoutId={voiture.id}
              onClick={() => setSelectedId(voiture.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={`/voitures/${voiture.image}`}
                alt={voiture.id}
                className="object-cover rounded-2xl"
              />
            </motion.div>
          </div>
          <div className="custom-shadow_2 rounded-2xl p-2 flex-1 bg-aged_2">
            <div className="mb-2 p-2">
              <span>{langDescription}</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-8 ">
          <div className="flex-1 custom-shadow_2 rounded-2xl p-2 bg-aged_2">
            <ul className="grid grid-cols-2 grid-rows-2 gap-4 p-2 rounded-2xl">
              <li className="col-span-1 row-span-1 p-2 m-1 rounded-2xl ">Marque : {voiture?.marque}</li>
              <li className="col-span-1 row-span-1 p-2 m-1 rounded-2xl ">Modele : {voiture?.modele}</li>
              <li className="col-span-1 row-span-1 p-2 m-1 rounded-2xl ">Année : {voiture?.annee}</li>
              <li className="col-span-1 row-span-1 p-2 m-1 rounded-2xl ">Condition : {voiture?.condition}</li>
            </ul>
          </div>
          <div className="flex-1 custom-shadow_2 bg-aged_2 rounded-2xl  p-2 flex flex-col items-center justify-center">
            <div className="font-bold text-lg mb-2">{prixFinal} $</div>
            <button className="custom-button mb-2">Reserver</button>
            <button onClick={ajouter} className="custom-button mb-2">Ajouter au Panier</button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {selectedId && (
          <motion.div
            key={selectedId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="modal-container"
          >
            <div onClick={() => setSelectedId(null)} className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
              <img
                src={`/voitures/${voiture.image}`}
                alt={voiture.id}
                className="object-cover w-11/12 rounded-2xl md:w-9/12 lg:w-6/12"
              />
              <h5>{voiture.subtitle}</h5>
              <h2>{voiture.title}</h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Voiture;
