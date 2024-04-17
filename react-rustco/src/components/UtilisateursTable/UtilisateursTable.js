import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './UtilisateursTable.css'
import CreateUser from "../CreateUser/CreateUser";

function UtilisateursTable(props){

     const urlListeUtilisateurs = "https://rustandco.onrender.com/api/utilisateurs";
     const [listeUtilisateurs, setListeUtilisateurs] = useState([]);

     const estEmploye = props.userType == 'employe';


     const [createUser, setCreateUser] = useState(false);

    // Handler for button click
    const handleClick = () => {
        setCreateUser(true);
    };

    // pour reset les butons de nav admin quand sur form create employe
    const navBtns= document.querySelectorAll('.admin-edit');
    for(let i = 0; i < navBtns.length; i++){
        navBtns[i].addEventListener('click', function(){
            setCreateUser(false)
        })
    }

     

    useEffect(() => {
        // useEffect est juste quand il y a CHANGEMENT
        fetch(urlListeUtilisateurs)
          .then((reponse) => reponse.json())
          .then((data) => {
            setListeUtilisateurs(data);
            setCreateUser(false);
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
       <tr key={index}>
        <td>
            {utilisateur.id}
        </td>
        <td>
            {utilisateur.prenom}
        </td>
        <td>
            {utilisateur.nom_de_famille}
        </td>
        <td>
            {utilisateur.username}
        </td>
        <td>
            {utilisateur.courriel}
        </td>
        <td>
            {utilisateur.password}
        </td>
        <td>
            {utilisateur.telephone}
        </td>
        <td>
            {utilisateur.adresse}
        </td>
        <td>
            {utilisateur.code_postal}
        </td>
        <td>
            {utilisateur.ville}
        </td>
        <td>
            {utilisateur.province}
        </td>
        <td>
            {utilisateur.anniversaire}
        </td>
        <td className="flex border-none justify-around min-w-max">
            <Link to={`/update-user/${utilisateur.id.trim()}`}> 
                <img className="w-8 mx-2 cursor-pointer" src="/icons/edit.png" />
            </Link> 
            <img className="w-8 mx-2 cursor-pointer" src="/icons/delete.png" onClick={(e) => { e.preventDefault(); deleteUtilisateur(utilisateur.id); }}></img>
        </td>
      </tr> 
    ); 
  });

//   if(utilisateur.privilege == "employe"){
//     return(
//         <a href="#"><button className="custom-button mt-5">+ Créer une Employe</button></a>
//     )
//   }

    return (
        createUser ? (
            <CreateUser userType="employe" />
        ) : (
            <div>
                {estEmploye && (
                    <button className="custom-button mt-5" onClick={handleClick}>+ Créer un Employé</button>
                )}

                <table className="employes-table mt-5">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Prénom</th>
                            <th>Nom de Famille</th>
                            <th>username</th>
                            <th>Courriel</th>
                            <th>Password</th>
                            <th>Téléphone</th>
                            <th>Adresse</th>
                            <th>Code Postal</th>
                            <th>Ville</th>
                            <th>Province</th>
                            <th>Anniversaire</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Assuming liUtilisateur is correctly defined elsewhere in your component */}
                        {liUtilisateur}
                    </tbody>  
                </table> 
            </div>
        )
    );
}

export default UtilisateursTable;