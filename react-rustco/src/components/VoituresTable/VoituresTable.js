import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './VoituresTable.css'

function VoituresTable(){

    const urlListeVoitures = "https://rustandco.onrender.com/api/voitures";
    const [listeVoitures, setListeVoitures] = useState([]);
    const [editVoitureToggle, setEditVoitureToggle] = useState(false);

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
   // console.log(voiture);
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
            {voiture.prix_achete}
        </td>
        <td>
            {voiture.profit}
        </td>
        <td className="flex border-none justify-around">
            {/* <Link to={`/update-voiture/${voiture.id.trim()}`}> */}
                <img className="w-8 mx-2 cursor-pointer" src="/icons/edit.png" onClick={()=>{setEditVoitureToggle(true)}}/>
                {/* </Link> */}
            <img className="w-8 mx-2 cursor-pointer" src="/icons/delete.png" onClick={(e) => { e.preventDefault(); deleteVoiture(voiture.id); }}></img>
        </td>
      </tr> 
    ); 
  });

    return (
        <div>
            <a href="/create-voiture"><button className="custom-button mt-5">+ Créer une Voiture</button></a>


        {(!editVoitureToggle) ?
            <table className="voitures-table mt-5">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Marque</th>
                        <th>Modele</th>
                        <th>Annee</th>
                        <th>Condition</th>
                        <th>Prix à l'achat</th>
                        <th>Profit (%)</th>
                        <th>Opérations</th>
                    </tr>
                </thead>
                <tbody>
                    {liVoiture}
                </tbody>  
            </table>

            : 
            <div>hellllo</div>
            }


        </div>
        
    )

}

export default VoituresTable;