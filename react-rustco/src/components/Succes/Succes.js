import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Success(props) {
    const navigate = useNavigate();
    const userId = props.logging.id;
    const lien = `/client/${userId}`;

    const panier = JSON.parse(props.panier)

    let prixTotal = 0;

    panier.map((voiture)=>{
        prixTotal += Number(voiture.prix)
    })

    console.log(prixTotal)
    const data = {
        expedition: 'livraison-locale',
        methode_de_paiement: 'credit',
        total: prixTotal,
        status: 'livre',
        taxes: 'ontario',
        utilisateur: userId,
        voitures: JSON.parse(props.panier).length > 0 ? JSON.parse(props.panier) : ['testfailarr']
    };

    const hasCommandeBeenCreated = useRef(false);  // This ref will track if the command has been sent

    useEffect(() => {
        if(userId){
        
        async function commandeCreate() {   
            if (!hasCommandeBeenCreated.current) {  // Check if the command hasn't been sent yet
                const response = await fetch('http://localhost:5000/api/commandes', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${localStorage.getItem('logged-user')}`
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {    

                    console.log('Data successfully sent to the server');
                } else {
                    throw new Error('Network response was not ok.');
                }
                
                hasCommandeBeenCreated.current = true;  // Mark as sent
            }
        }
        async function factureCreate() {
            if (!hasCommandeBeenCreated.current) {  // Check if the command hasn't been sent yet
                const response = await fetch('http://localhost:5000/api/factures', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${localStorage.getItem('logged-user')}`
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    console.log('Data successfully sent to the server');
                } else {
                    throw new Error('Network response was not ok.');
                }
                
                hasCommandeBeenCreated.current = true;  // Mark as sent
            }
        }
       
        factureCreate();
        commandeCreate();
    }
    }, [userId]);  // The empty dependency array ensures this effect runs only once after the initial render

    return(
        <div className="bg-white max-w-full p-6 rounded-2xl flex flex-col items-center">
       
            <div className=''><h1 className='mb-6 text-2xl'>Achat effectué avec succès !</h1>
            <img className='w-8' src='/icons/check.png' alt="Check icon"></img></div>
            <img src='/logo/brasbon.png' className='w-60 mb-6' alt="Brand logo"></img>
            <p className='mb-6'>-- choisissez une redirection --</p>
            <div>
                <Link className='custom-button' to={lien}>
                    Votre Compte
                </Link>
                <Link className='custom-button' to='/'>
                    Accueil
                </Link>
                <Link className='custom-button' to='/voitures'>
                   Voitures
                </Link>
            </div>
        </div>
    );
}

export default Success;