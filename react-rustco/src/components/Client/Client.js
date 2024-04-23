import './Client.css';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useContext } from "react";
import { AppContext } from "../App/App";
import { t } from "i18next";

function Client(props){
   // console.log(props)
   let { id } = useParams();
    //const id = props.logging.id
    const [error, setError] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState({});

    const urlUserInitial = `https://rustandco.onrender.com/api/utilisateurs/${id}`;
    const [urlUser, setUrlUser] = useState(urlUserInitial);


   //pour fetch le data du user pour preremplir
   useEffect(() => {
    async function userData(){
      try {
        const response = await fetch(urlUserInitial);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUser(data); 
        setIsLoading(false);
      } catch (error) {
        setError("erreur du fetch");
        setIsLoading(false);
      }
    };
    userData();
}, [id]);





    return(
        <div className='tout-tout-container'>
            <h1 className='text-3xl font-bold'>Ma Page Client</h1>
            <div className='tout-container mt-6'>
                <div className='info-user'>
                    <h2 className='text-2xl font-bold mb-6'>Information Personnelle</h2>
                    <ul className="user-details mb-6">
                        <li><strong>Adresse :</strong> {user.adresse}</li>
                        <li><strong>Anniversaire :</strong> {user.anniversaire}</li>
                        <li><strong>Code postal :</strong> {user.code_postal}</li>
                        <li><strong>Courriel :</strong> {user.courriel}</li>
                        <li><strong>ID :</strong> {user.id}</li>
                        <li><strong>Nom de famille :</strong> {user.nom_de_famille}</li>
                        <li><strong>Prénom :</strong> {user.prenom}</li>
                        <li><strong>Privilège :</strong> {user.privilege}</li>
                        <li><strong>Province :</strong> {user.province}</li>
                        <li><strong>Téléphone :</strong> {user.telephone}</li>
                        <li><strong>Nom d'utilisateur :</strong> {user.username}</li>
                        <li><strong>Ville :</strong> {user.ville}</li>
                    </ul>
                    <div className='edit-btn-container'>
                    <Link to={`/update-user/${user.id}`}> 
                        <button className='custom-button'>Edit Info</button>
                    </Link> 
                    </div>
                </div>
                <div className='info-commandes'>
                    <div>
                        <h2 className='text-2xl font-bold mb-6'>Mes Commandes</h2>
                        <div className='info-commandes-container'>

                        </div>

                    </div>
                    <div>
                        <h2 className='text-2xl font-bold mb-6'>Mes Factures</h2>
                        <div className='info-commandes-container'>

                        </div>

                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Client