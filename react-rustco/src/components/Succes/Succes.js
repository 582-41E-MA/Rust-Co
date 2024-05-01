import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Succes(props){
    const navigate = useNavigate();

    const userId = props.logging.id
    const lien = `/client/${userId}`;


    const data = {
        expedition: 'livraison-locale',
        methode_de_paiement: 'credit',
        prix: 1004,
        status: 'livre',
        taxes: 'ontario',
        utilisateur: userId,
        voitures: JSON.parse(props.panier).length > 0 ? JSON.parse(props.panier) : ['testfailarr']

    }

    console.log(data)


   async function commandeCreate(){
            const reponse = await fetch('https://rustandco.onrender.com/api/commandes', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem('logged-user')}`
                },
                body: JSON.stringify(data)
            });

            console.log(reponse);
            navigate('/liste-voitures')
            if (!reponse.ok) throw new Error('Network response was not ok.');
          
            console.log('Data successfully sent to the server');
        }



    useEffect(() => {
       commandeCreate();
        
    }, []);

    return(
        <div className="bg-white max-w-full p-6 rounded-2xl flex flex-col items-center">
            <div className=''><h1 className='mb-6 text-2xl'>Achat éffectué avec succes !</h1>
            <img className='w-8' src='/icons/check.png'></img></div>
            <img src='/logo/brasbon.png' className='w-60 mb-6'></img>
            <p className='mb-6'>-- choissez une redirection --</p>
            <div>
                <Link className='custom-button' to={lien}>
                    Votre Compte
                </Link>
                <Link className='custom-button' to='/'>
                    Acceuil
                </Link>
                <Link className='custom-button' to='/voitures'>
                   Voitures
                </Link>
            </div>
        </div>
    )
}

export default Succes