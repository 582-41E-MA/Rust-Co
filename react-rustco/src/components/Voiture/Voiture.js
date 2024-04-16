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
      // Assuming your voiture object and its description are properly fetched
      // Adjust the condition based on how you store languages (e.g., "en" or "fr")
      if (Array.isArray(voiture.description)) {
        langDescription = context.language == "en" ? voiture.description[0] : voiture.description[1];
      }
      // This effect should re-run not only when voiture changes but also when the language context changes
    }, [voiture, context.language]);

    //description lang toggle
    if (Array.isArray(voiture.description)) {
        document.documentElement.lang == "en" ? langDescription = voiture.description[0] : langDescription = voiture.description[1];
      }
      

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
          <div className="descritption border">
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
          <div className="actions border">
            <button className="custom-button">Ajouter au Panier</button>
          </div>
        </div>
      </div>
    

  );
}

export default Voiture;




  // // react eccoute si il y a un changement detat, mais pas etatTest
  // useEffect(() => {
  //   // useEffect est juste quand il y a CHANGEMENT
  //   //  console.log("rendu");
  //   fetch(urlFilm)
  //     .then((reponse) => reponse.json())
  //     .then((data) => {
  //       setFilm(data);

  //       //nettoyer array notes
  //       let aNotesNum = [];
  //       aNotesNum.push(data.notes);
  //       console.log(aNotesNum[0]);

  //       function filtered(arr) {
  //         return arr.filter(element => !(typeof element == 'string' || (typeof element == 'number' && element > 5)));
  //       }

  //       const filteredArr = filtered(aNotesNum[0])
  //       console.log(filteredArr);

  //       //  console.log(data.notes.length);
  //       if (data.notes && data.notes.length > 0) {
  //         //moyenne
  //         let aDataNotes = data.notes;
  //         const sum = aDataNotes.reduce(
  //           (accumulator, currentValue) => accumulator + currentValue,
  //           0
  //         );

  //         const moyenne = (sum / aDataNotes.length).toFixed(2);

  //         setMoyenne(moyenne)

  //       }
  //     });
  // }, []); //une seule fois lors du premier rendu quand on met un [] ici. sinon la var dans le [] est ce qui est ecoute pour changer



  ////////// DELETE
// let btnDelete;
// // console.log(context);
// if (context.estLog) {
//   btnDelete = <button onClick={deleteFilm}>Supprimer le film</button>;
// }

// async function deleteFilm() {

//   // Vous pouvez ajouter des confirmations ou des vérifications supplémentaires ici
//   const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer Voiture?");
//   if (!confirmDelete) {
//     return;
//   }

//   const url = `http://localhost:3301/api/films/${id}`; 
// console.log(url);
 
//  const token = localStorage.getItem('API-films'); 


//  console.log(token);

//   try {
//     const response = await fetch(url, {
//       method: "DELETE",
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`, 
//       },
//     });

//     if (response.status === 401) { // Si non autorisé (token expiré)
//       // Option 1: Tenter de rafraîchir le token ici
//       // Option 2: Demander à l'utilisateur de se reconnecter
//       alert("Session expirée, veuillez vous reconnecter.");
//       window.location.href = '/';
//       return;
//   }

   
//     if (!response.ok) {
//       throw new Error('Erreur lors de la suppression du film');
//     }
   
//     alert('Film supprimé avec succès');
  
//     navigate('/liste-films'); 

//   } catch (error) {
//     alert('Une erreur est survenue lors de la suppression du film.');
//   }
// }