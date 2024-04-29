import React from 'react';
import { Link } from 'react-router-dom';

function Succes(props){
    const userId = props.logging.id
    const lien = `/client/${userId}`
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