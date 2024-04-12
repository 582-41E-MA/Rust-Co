import { useState, useEffect } from "react";
import './UtilisateursTable.css'

function UtilisateursTable(props){

     const urlListeUtilisateurs = "https://rustandco.onrender.com/api/utilisateurs";
     const [listeUtilisateurs, setListeUtilisateurs] = useState([]);

    useEffect(() => {
        // useEffect est juste quand il y a CHANGEMENT
        fetch(urlListeUtilisateurs)
          .then((reponse) => reponse.json())
          .then((data) => {
            setListeUtilisateurs(data)
          });
      }, []);
      

//     /// DELETE

    function deleteUtilisateur(id){

        const bonId = id.trim();

        fetch(`${urlListeUtilisateurs}/${bonId}`, {
            method: 'DELETE',
        })
        .then((reponse) => {
            if (reponse.ok) { 
                setListeUtilisateurs(listeUtilisateurs.filter(utilisateur => utilisateur.id !== id));
            } 
        })
        .catch((error) => {
            console.error('Erreur:', error);
        });
    };


// ///////////////////////////////////////////


  const liUtilisateur = listeUtilisateurs.map((utilisateur, index) => {
    if(utilisateur.privilege == props.userType)
    return (
       <tr>
        <td>
            {utilisateur.id}
        </td>
        <td>
            {utilisateur.marque}
        </td>
        <td>
            {utilisateur.modele}
        </td>
        <td>
            {utilisateur.annee}
        </td>
        <td>
            {utilisateur.condition}
        </td>
        <td>
            {utilisateur.Commandes_id}
        </td>
        <td>
            {utilisateur.prix_paye}
        </td>
        <td>
            {utilisateur.prix_achete}
        </td>
        <td className="flex border-none justify-around">
            <img className="w-8 mx-2 cursor-pointer" src="/icons/edit.png"></img>
            <img className="w-8 mx-2 cursor-pointer" src="/icons/delete.png" onClick={(e) => { e.preventDefault(); deleteUtilisateur(utilisateur.id); }}></img>
        </td>
      </tr> 
    ); 
  });


    return (
        <div>
            <a href="#"><button className="custom-button mt-5">+ Créer une Employe</button></a>
            <table className="employes-table mt-5">
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
                    {liUtilisateur}
                </tbody>  
            </table> 
        </div>
        
    )

}

export default UtilisateursTable;