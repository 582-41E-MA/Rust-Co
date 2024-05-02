import './Client.css';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useContext } from "react";
import { AppContext } from "../App/App";
import { t } from 'i18next';

function Client(props){
    let { id } = useParams();
    const [error, setError] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState({});

    const urlUserInitial = `https://rustandco.onrender.com/api/utilisateurs/${id}`;

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

    

const [com, setCom] = useState([]);


    
useEffect(() => {
    async function userData() {
        try {
            const response = await fetch(`http://localhost:5000/api/commandes`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const userCommands = data.filter(commande => commande.utilisateur === user.id);
            setCom(userCommands);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };
    userData();
}, []); // Dependencies array is empty, so this effect runs only once on mount

// Logging here will only show updates after state changes
console.log(com);

//////////////////////////////////////////////////////////////////////
const listeCommandes = function() {

    return com.map((item, index) => (
        <li key={index} className="mb-4 p-2 bg-white_1 rounded-2xl">
            <div className="flex items-center space-x-4 justify-between px-6">
                <img src={`/voitures/${item.image}`} alt={item.modele} className="w-24 h-24 object-cover rounded-2xl"/>
                <div>
                    <h3 className="text-lg font-bold">{item.marque} {item.modele}</h3>
                    <p>{t('annee')}: {item.annee}</p>
                    <p>{t('condition')}: {item.condition}</p>
                    <p>{t('prix')}: ${item.prix}</p>
                </div>
            </div>
        </li>
    ));
}


    return(
        <div className='tout-tout-container'>
            <h1 className='text-3xl font-bold mb-6'>Ma Page Client</h1>
            <div className='grid md:grid-cols-1 lg:grid-cols-2 gap-4 min-w-[40vw]'>
                <div className='info-user col-span-1 border rounded-2xl p-6 min-h-[500px] bg-sand_1'>
                    <h2 className='text-2xl font-bold mb-6'>{t('infos_perso')}</h2>
                    <ul className="user-details mb-6">
                        <li className='bg-white_1 px-2 py-1 rounded-lg mb-1'><strong>Adresse :</strong> {user.adresse}</li>
                        <li className='bg-white_1 px-2 py-1 rounded-lg mb-1'><strong>Anniversaire :</strong> {user.anniversaire}</li>
                        <li className='bg-white_1 px-2 py-1 rounded-lg mb-1'><strong>Code postal :</strong> {user.code_postal}</li>
                        <li className='bg-white_1 px-2 py-1 rounded-lg mb-1'><strong>Courriel :</strong> {user.courriel}</li>
                        <li className='bg-white_1 px-2 py-1 rounded-lg mb-1'><strong>ID :</strong> {user.id}</li>
                        <li className='bg-white_1 px-2 py-1 rounded-lg mb-1'><strong>Nom de famille :</strong> {user.nom_de_famille}</li>
                        <li className='bg-white_1 px-2 py-1 rounded-lg mb-1'><strong>Prénom :</strong> {user.prenom}</li>
                        <li className='bg-white_1 px-2 py-1 rounded-lg mb-1'><strong>Privilège :</strong> {user.privilege}</li>
                        <li className='bg-white_1 px-2 py-1 rounded-lg mb-1'><strong>Province :</strong> {user.province}</li>
                        <li className='bg-white_1 px-2 py-1 rounded-lg mb-1'><strong>Téléphone :</strong> {user.telephone}</li>
                        <li className='bg-white_1 px-2 py-1 rounded-lg mb-1'><strong>Nom d'utilisateur :</strong> {user.username}</li>
                        <li className='bg-white_1 px-2 py-1 rounded-lg mb-1'><strong>Ville :</strong> {user.ville}</li>
                    </ul>
                    <div className='edit-btn-container'>
                        <Link to={`/update-user/${user.id}`}>
                            <button className='custom-button'>Edit Info</button>
                        </Link>
                    </div>
                </div>
                <div className='info-commandes col-span-1 border rounded-2xl bg-sand_1 p-6 min-h-[500px]'>
                    <h2 className='text-2xl font-bold mb-6'>{t('mes_commandes')}</h2>
                    {/* Orders details here */}
                    
                </div>
                <div className='info-commandes col-span-1 border rounded-2xl bg-sand_1 p-6 min-h-[500px]'>
                    <h2 className='text-2xl font-bold mb-6'>{t('mes_factures')}</h2>
                    {/* Invoices details here */}
                </div>
                <div className='info-commandes col-span-1 border rounded-2xl bg-sand_1 p-6 min-h-[500px]'>
                    <h2 className='text-2xl font-bold mb-6'>{t('mes_reservations')}</h2>
                    {/* Reservations details here */}
                </div>
            </div>
        </div>
    )
}

export default Client;