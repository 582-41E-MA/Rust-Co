import './Admin.css';
import React, { useState } from 'react';
import VoituresTable from '../VoituresTable/VoituresTable'
import CommandesTable from '../CommandesTable/CommandesTable'
import UtilisateursTable from '../UtilisateursTable/UtilisateursTable'
import JournalTable from '../JournalTable/JournalTable'
import { useContext } from "react";
import { AppContext } from "../App/App";
import { t } from "i18next";



function Admin(props){

    const context = useContext(AppContext)


    ////// Pour changer les tables avec les bouttons///////////
    const [table, setTable] = useState('');
    const showVoitures = () => setTable('Voitures');
    const showEmployes = () => setTable('Employes');
    const showClients = () => setTable('Clients');
    const showJournal = () => setTable('Journal');
    const showCommandes = () => setTable('Commandes');
    const renderTable = () => {
        switch (table) {
            case 'Voitures':
                return <VoituresTable />;
            case 'Employes':
                return <UtilisateursTable userType={"employe"}/>;
            case 'Clients':
                return <UtilisateursTable userType={"client"}/>;
            case 'Journal':
                return <JournalTable />;
            case 'Commandes':
                return <CommandesTable />;
            default:
                return <div></div>; 
        }
    };
/////////////////////////////////////////////////////////////////
const privilege = context.logging.privilege

    return (
        <div>
            <h1 className='text-2xl'>{t('bienvenue_admin')}</h1><br></br>
            <button className='custom-button mr-5 mb-5 admin-edit' onClick={showVoitures}>{t('voiture')}s</button>
            {privilege == 'admin'?
                <button className='custom-button mr-5 mb-5 admin-edit' onClick={showEmployes}>{t('employé')}s</button>
                : <></>
            }
            <button className='custom-button mr-5 mb-5 admin-edit' onClick={showClients}>{t('client')}s</button>
            <button className='custom-button mr-5 mb-5 admin-edit' onClick={showJournal}>Journaux</button>
            <button className='custom-button mr-5 mb-5 admin-edit' onClick={showCommandes}>{t('commande')}s</button>
            <div className='tables'>
                {renderTable()}
            </div>
        </div>
    )

}

export default Admin;