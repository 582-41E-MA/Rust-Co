import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { t } from "i18next"
import modelesParMarque from '../../modelesParMarque.json';
import './VoituresTable.css'

function JournalTable(){

    const urlListeJournal = "http://localhost:5000/api/journalDeConnexion";
    const [listeJournal, setListeJournal] = useState([]);
    


    useEffect(() => {
        // useEffect est juste quand il y a CHANGEMENT
        fetch(urlListeJournal)
          .then((reponse) => reponse.json())
          .then((data) => {
            setListeJournal(data)
          });
      }, []);
    



    //------------------------------------------------------------------//

////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////
  const liJournal = listeJournal.map((journal, index) => {
   // console.log(journal);
    return (
       <tr key={index}>
        <td data-label="Id">
            {journal.id}
        </td>
        <td  data-label="Marque">
            {journal.marque}
        </td>
        <td data-label="Modèle">
            {journal.modele}
        </td>
      </tr> 
    ); 
  });

    return (
        <div>

            <table className="voitures-table mt-5 w-20">
                <thead>
                    <tr>
                        <th>{t('id')}</th>
                        <th>Date :</th>
                        <th>{t('adresse_ip')}</th>
                        

                    </tr>
                </thead>
                <tbody>
                    {liJournal}
                </tbody>  
            </table>


        </div>
        
    )

}

export default JournalTable;