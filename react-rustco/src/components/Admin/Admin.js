import './Admin.css';
import React, { useState } from 'react';
import VoituresTable from '../VoituresTable/VoituresTable'
import UtilisateursTable from '../UtilisateursTable/UtilisateursTable'



function Admin(){


    ////// Pour changer les tables avec les bouttons///////////
    const [table, setTable] = useState('');
    const showVoitures = () => setTable('Voitures');
    const showEmployes = () => setTable('Employes');
    const showClients = () => setTable('Clients');
    const renderTable = () => {
        switch (table) {
            case 'Voitures':
                return <VoituresTable />;
            case 'Employes':
                return <UtilisateursTable userType={"employe"}/>;
            case 'Clients':
                return <UtilisateursTable userType={"client"}/>;
            default:
                return <div></div>; 
        }
    };
/////////////////////////////////////////////////////////////////


    return (
        <div>
            <h1 className='text-2xl'>Bienvenue sur votre page d'administrateur</h1><br></br>
            <button className='custom-button mr-5 mb-5 admin-edit' onClick={showVoitures}>Edit Voitures</button>
            <button className='custom-button mr-5 mb-5 admin-edit' onClick={showEmployes}>Edit Employes</button>
            <button className='custom-button mr-5 mb-5 admin-edit' onClick={showClients}>Edit Clients</button>
            <div className='tables'>
                {renderTable()}
            </div>
        </div>
    )

}

export default Admin;