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

    // Only add the car if it's not already in the cart
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
              <li>Modele: {voiture?.modele}</li>
              <li>Année: {voiture?.annee}</li>
              <li>Condition: {voiture?.condition}</li>
              <li>Prix: {prixFinal} $</li>
              <li>Description: {langDescription}</li>
            </ul>
          </div>

          {
            context.logging.privilege == 'client' ?
              <div className="actions border flex-col p-2">
                <button onClick={ajouter} className="custom-button block mb-2">Ajouter au Panier</button>
                <button className="custom-button block">Reserver</button>
              </div>
            :
            <></>
          }
          
        </div>
      </div>
    

  );
}

export default Voiture;
