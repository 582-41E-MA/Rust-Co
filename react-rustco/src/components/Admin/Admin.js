import './Admin.css';
import React, { useState } from 'react';
import VoituresTable from '../VoituresTable/VoituresTable'
import EmployesTable from '../EmployesTable/EmployesTable'
import UsersTable from '../UsersTable/UsersTable'


function Admin(){

    ////// Pour changer les tables avec les bouttons///////////
    const [table, setTable] = useState('');
    const showVoitures = () => setTable('Voitures');
    const showEmployes = () => setTable('Employes');
    const showUsers = () => setTable('Users');
    const renderTable = () => {
        switch (table) {
            case 'Voitures':
                return <VoituresTable />;
            case 'Employes':
                return <EmployesTable />;
            case 'Users':
                return <UsersTable />;
            default:
                return <div></div>; 
        }
    };
/////////////////////////////////////////////////////////////////




    return (
        <div>
            <p>Admin</p>

            <button className='custom-button mr-5' onClick={showVoitures}>Edit Voitures</button>
            <button className='custom-button mr-5' onClick={showEmployes}>Edit Employes</button>
            <button className='custom-button mr-5' onClick={showUsers}>Edit Users</button>
            <div className='tables'>
                {renderTable()}
            </div>
        </div>
    )

}

export default Admin;