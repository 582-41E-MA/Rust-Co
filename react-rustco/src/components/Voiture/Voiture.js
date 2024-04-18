import { useEffect, useState, useContext } from "react";
import { AppContext } from "../App/App";
import "./Voiture.css";


import * as React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import i18next from "react-i18next";


export const VoitureContext = React.createContext();



function Voiture() {

  const navigate = useNavigate();
  let context = useContext(AppContext);

  // Get the userId param from the URL.
  let { id } = useParams();
  //console.log(id);

  const urlVoiture = `https://rustandco.onrender.com/api/voitures/${id}`
  const [voiture, setVoiture] = useState([]);

  useEffect(() => {
    fetch(urlVoiture)
      .then((response) => response.json())
      .then((data) => {
        setVoiture(data);
      })
      .catch((error) => {
        console.error('erreur de fetch voiture:', error);
      });;
    }, [urlVoiture]);



    //language switch description
  let langDescription;
    useEffect(() => {
       langDescription = context.language == "en" ? voiture.description_en : voiture.description_fr;
    }, [voiture, context.language]);
    //description lang toggle
     document.documentElement.lang == "en" ? langDescription = voiture.description_en : langDescription = voiture.description_fr;
      
      

      //////////AFFICHAGE DU VRAI PRIX///////////////
      console.log(voiture.prix_achete, voiture.profit);
      const prix = Number(voiture?.prix_achete);
      const profit = Number(voiture?.profit);

      const prixFinal = (prix*((100+profit)/100)).toFixed(2)
      console.log(prixFinal);




  return (
    
      <div className="voiture-container border p-6">
        <div className="image">
          <img
          src={`/img/${voiture?.image}`}
          alt={voiture?.id}
          className="imgSingle"
        />
        </div>
        <div className="voiture-bottom flex justify-around">
          <div className="descritption border p-2">
            <h1 id="titre-voiture">{voiture?.id}</h1>
            <ul>
              <li>Marque: {voiture?.marque}</li>
              <li> Modele: {voiture?.modele}</li>
              <li>Année: {voiture?.annee}</li>
              <li>Condition: {voiture?.condition}</li>
              <li>Prix: {prixFinal} $</li>
              <li>Description: {langDescription}</li>
            </ul>
          </div>
          <div className="actions border flex-col p-2">
            <button className="custom-button block mb-2">Ajouter au Panier</button>
            <button className="custom-button block">Reserver</button>
          </div>
        </div>
      </div>
    

  );
}

export default Voiture;
