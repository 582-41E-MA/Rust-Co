import './FacturesTable.css'
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { t } from "i18next";


function FacturesTable(props){

     const urlListeFactures = "http://localhost:5000/api/factures";
     const [listeFactures, setListeFactures] = useState([]);
     const estEmploye = props.userType == 'employe';

     

    useEffect(() => {
        // useEffect est juste quand il y a CHANGEMENT
        fetch(urlListeFactures)
          .then((reponse) => reponse.json())
          .then((data) => {
            setListeFactures(data);
          });
      }, []);
      

     /// DELETE
    function deleteFacture(id){

        const bonId = id.trim();
        console.log(bonId)

        fetch(`${urlListeFactures}/${bonId}`, {
            method: 'DELETE',
        })
        .then((reponse) => {
            if (reponse.ok) { 
                setListeFactures(listeFactures.filter(facture => facture.id !== id));
            } 
        })
        .catch((error) => {
            console.error('Erreur:', error);
        });
    };


  /*Factures data pour table*/
  
  const liFactures = listeFactures.map((facture, index) => {
    return (
       <tr key={index}>
        <td>
            {facture.id}
        </td>
            <ul >
                {facture.voitures.map((voiture, idx) => (
                    <li key={idx}> <b>- </b> {voiture.id}</li>
                ))}
            </ul>
       
        <td>
            {facture.date}
        </td>
        <td>
            {facture.expedition}
        </td>
        <td>
            {facture.methode_de_paiement}
        </td>
        <td>
            {facture.status}
        </td>
        <td>
            {facture.taxes}
        </td>
        <td>
            {facture.total}
        </td>
        <td>
            {facture.utilisateur}
        </td>
       
        <td className="flex border-none justify-around min-w-max">
            <img className="w-8 mx-2 cursor-pointer" src="/icons/delete.png" onClick={(e) => { e.preventDefault(); deleteFacture(facture.id); }}></img>
        </td>
      </tr> 
    ); 
  });

    return (
      
            <div>
                <table className="commandes-table mt-5">
                    <thead>
                        <tr>
                            <th>{t('id')}</th>
                            <th>{t('voiture')}s</th>
                            <th>Date</th>
                            <th>{t('expedition')}</th>
                            <th>{t('methode_de_paiment')}</th>
                            <th>Status</th>
                            <th>Taxes</th>
                            <th>Total</th>
                            <th>{t('utilisateur_id')}</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {liFactures}
                    </tbody>  
                </table> 
            </div>
        
    );
}

export default FacturesTable;