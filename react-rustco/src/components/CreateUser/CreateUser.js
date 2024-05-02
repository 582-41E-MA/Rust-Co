import './CreateUser.css'
import React, { useState } from "react";
import { AppContext } from "../App/App";
import { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import i18next from 'i18next';
import { t } from "i18next";
import villes from '../../villes.json'

function CreateUser(props){

    const navigate = useNavigate();
    const context = useContext(AppContext);


    // function test(e){
    //     e.preventDefault();
    //     const formData = new FormData(e.target)
    //     const data = {};
    //     for (let key of formData.keys()) {
    //         data[key] = formData.get(key);
    //     }
    
    // }

    
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        prenom: '',
        nom_de_famille: '',
        anniversaire: '',
        courriel: '',
        telephone: '',
        adresse: '',
        ville: '',
        code_postal: '',
        province: '',
        privilege: context.logging.privilege == 'admin' ? 'employe' : 'client'
    });




    const [cities, setCities] = useState([]);
    const filterCitiesByProvince = (province) => {
        const filteredCities = villes[province] || [];
        setCities(filteredCities);
    };
    
    useEffect(() => {
        filterCitiesByProvince(formData.province);
    }, [formData.province]);





   function handleInputChange(event){
        const { name, value, type, files } = event.target;
       setFormData({
            ...formData,
            [name]: value
        });
       console.log(formData);
    };

    async function handleSubmit(event){
        event.preventDefault(); 

        try {
      
            const reponse = await fetch('https://rustandco.onrender.com/api/utilisateurs', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            console.log(reponse);
            if (!reponse.ok) throw new Error('Network response was not ok.');
          
            console.log('Data successfully sent to the server');
            navigate('/')
        } catch (error) {
            console.error('Error:', error);
        }
    };


    function titreCreate(){
        if(props.userType == "employe"){
            return(<h1 className='text-4xl font-bold'>{t('cree')} {t('employé')}</h1>)
        }else{
            return(<h1 className='text-4xl font-bold'>{t('cree')} {t('compte')} {t('client')}</h1>)
        }
    }


    console.log(formData)
    return(
        <div>
            {titreCreate()}
            <form className='form-create-user' onSubmit={handleSubmit}>
                <div className='mt-6'>
                    <label htmlFor="courriel">{t('courriel')}:</label>
                    <input type="courriel" id="courriel" name="courriel" onChange={handleInputChange} required/>
                </div>
                <div>
                    <label htmlFor="password">{t('mdp')}:</label>
                    <input type="password" id="password" name="password" onChange={handleInputChange} required/>
                </div>
                <div>
                    <label htmlFor="username">{t('utilisateur')}:</label>
                    <input type="text" id="username" name="username" onChange={handleInputChange} required/>
                </div>
                <div className='mt-6'>
                    <label htmlFor="prenom">{t('prenom')}:</label>
                    <input type="text" id="prenom" name="prenom" onChange={handleInputChange} required/>
                </div>
                <div>
                    <label htmlFor="nom_de_famille">{t('nom_de_famille')}:</label>
                    <input type="text" id="nom_de_famille" name="nom_de_famille" onChange={handleInputChange} required/>
                </div>
                <div>
                    <label htmlFor="telephone">{t('telephone')}:</label>
                    <input type="tel" id="telephone" name="telephone" onChange={handleInputChange} required/>
                </div>
                <div>
                    <label htmlFor="anniversaire">{t('anniversaire')}:</label>
                    <input type="date" id="anniversaire" name="anniversaire" onChange={handleInputChange} required/>
                </div>
                <br></br>
                <div>
                    <label htmlFor="adresse">{t('adresse')} :</label>
                    <input type="text" id="adresse" name="adresse" onChange={handleInputChange} required/>
                </div>
                <div>
                    <label htmlFor="code_postal">{t('code_postal')} :</label>
                    <input type="text" id="code_postal" name="code_postal" onChange={handleInputChange} required/>
                </div>
                <div>
                    <label htmlFor="province">Province:</label>
                    <select id="province" name="province" className='custom-select' onChange={handleInputChange} required>
                        <option value='' disabled selected>Select a province</option>
                        <option value="alberta">Alberta</option>
                        <option value="colombie-britannique">Colombie-Britannique</option>
                        <option value="manitoba">Manitoba</option>
                        <option value="nouveau-brunswick">Nouveau-Brunswick</option>
                        <option value="terre-neuve-et-labrador">Terre-Neuve-et-Labrador</option>
                        <option value="territoires-du-nord-ouest">Territoires du Nord-Ouest</option>
                        <option value="nouvelle-ecosse">Nouvelle-Écosse</option>
                        <option value="nunavut">Nunavut</option>
                        <option value="ontario">Ontario</option>
                        <option value="ile-du-prince-edouard">Île-du-Prince-Édouard</option>
                        <option value="quebec">Québec</option>
                        <option value="saskatchewan">Saskatchewan</option>
                        <option value="yukon">Yukon</option>
                    </select> 
                </div>  
                <div>
                    <label for="ville">{t('ville')} : </label>
                    <select id="ville" name="ville" onChange={handleInputChange} required className='custom-select'>
                        <option value='' disabled selected>Select a city</option>
                        {cities.map((city, index) => (
                        <option key={index} value={city}>{t(city)}</option>
                    ))}
                        
                    </select> 
                </div>
                <br></br>
                <button type="submit" className='custom-button'>{t('soumettre')}</button>
            </form>

        </div>
        

    )
}

export default CreateUser