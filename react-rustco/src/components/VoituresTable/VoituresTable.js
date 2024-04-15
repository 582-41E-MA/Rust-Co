import { useState, useEffect } from "react";
import './VoituresTable.css'

function VoituresTable(){

    const urlListeVoitures = "https://rustandco.onrender.com/api/voitures";
    const [listeVoitures, setListeVoitures] = useState([]);

    useEffect(() => {
        // useEffect est juste quand il y a CHANGEMENT
        fetch(urlListeVoitures)
          .then((reponse) => reponse.json())
          .then((data) => {
            setListeVoitures(data)
          });
      }, []);
      

    /// DELETE

    function deleteVoiture(id){

        const bonId = id.trim();

        fetch(`${urlListeVoitures}/${bonId}`, {
            method: 'DELETE',
        })
        .then((reponse) => {
            if (reponse.ok) { 
                setListeVoitures(listeVoitures.filter(voiture => voiture.id !== id));
            } 
        })
        .catch((error) => {
            console.error('Erreur:', error);
        });
    };


///////////////////////////////////////////


  const liVoiture = listeVoitures.map((voiture, index) => {
    return (
       <tr key={index}>
        <td>
            {voiture.id}
        </td>
        <td>
            {voiture.marque}
        </td>
        <td>
            {voiture.modele}
        </td>
        <td>
            {voiture.annee}
        </td>
        <td>
            {voiture.condition}
        </td>
        <td>
            {voiture.Commandes_id}
        </td>
        <td>
            {voiture.prix_paye}
        </td>
        <td>
            {voiture.prix_achete}
        </td>
        <td className="flex border-none justify-around">
            <img className="w-8 mx-2 cursor-pointer" src="/icons/edit.png"></img>
            <img className="w-8 mx-2 cursor-pointer" src="/icons/delete.png" onClick={(e) => { e.preventDefault(); deleteVoiture(voiture.id); }}></img>
        </td>
      </tr> 
    ); 
  });

    return (
        <div>
            <a href="/create-voiture"><button className="custom-button mt-5">+ Créer une Voiture</button></a>
            <table className="voitures-table mt-5">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Marque</th>
                        <th>Modele</th>
                        <th>Annee</th>
                        <th>Condition</th>
                        <th>Commandes_id</th>
                        <th>prix_paye</th>
                        <th>prix_achete</th>
                        <th>Opérations</th>
                    </tr>
                </thead>
                <tbody>
                    {liVoiture}
                </tbody>  
            </table>
        </div>
        
    )

}

export default VoituresTable;