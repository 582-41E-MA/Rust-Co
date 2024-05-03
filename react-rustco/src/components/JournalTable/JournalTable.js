import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { t } from "i18next"
import modelesParMarque from '../../modelesParMarque.json';
import './JournalTable.css'

function JournalTable(){

    const urlListeJournal = "http://localhost:5000/api/journalDeConnexion";
    const [listeJournal, setListeJournal] = useState([]);
    


    useEffect(() => {
       
        fetch(urlListeJournal)
          .then((reponse) => reponse.json())
          .then((data) => {
            console.log(data)
            setListeJournal(data)
          });
            
      }, []);
    

   // console.log(listeJournal)

    //------------------------------------------------------------------//

////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////
  const liJournal = listeJournal.map((journal, index) => {
   // console.log(journal);
    return (
       <tr key={index}>
        <td data-label="Id">
            {journal.utilisateur}
        </td>
        <td  data-label="Date">
            {journal.date}
        </td>
        <td data-label="addressIP">
            {journal.addressIP}
        </td>
      </tr> 
    ); 
  });

    return (
        <div>

            <table className="voitures-table mt-5">
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