import './CreateUser.css'
import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import i18next from 'i18next';
import { t } from "i18next";

function CreateUser(props){

    const navigate = useNavigate();

    function test(e){
        e.preventDefault();
        const formData = new FormData(e.target)
        const data = {};
        for (let key of formData.keys()) {
            data[key] = formData.get(key);
        }
        console.log(data);
    }

    
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        prenom: '',
        nom_de_famille: '',
        anniversaire: '',
        email: '',
        telephone: '',
        adresse: '',
        ville: '',
        code_postal: '',
        province: '',
        privilege: '',
    });


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
            navigate('/admin')
        } catch (error) {
            console.error('Error:', error);
        }
    };


    function titreCreate(){
        if(props.userType == "employe"){
            return(<h1 className='text-4xl font-bold'>Créer Employé</h1>)
        }else{
            return(<h1 className='text-4xl font-bold'>Créer Compte Client</h1>)
        }
    }

    
    
    return(
        <div>
            {titreCreate()}
            <form className='form-create-user' onSubmit={handleSubmit}>
                <div className='mt-5'>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" onChange={handleInputChange}/>
                </div>
                <div className='mt-5'>
                    <label htmlFor="prenom">Prénom:</label>
                    <input type="text" id="prenom" name="prenom" onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="nom_de_famille">Nom de Famille:</label>
                    <input type="text" id="nom_de_famille" name="nom_de_famille" onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="courriel">Courriel:</label>
                    <input type="courriel" id="courriel" name="courriel" onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="telephone">Telephone:</label>
                    <input type="tel" id="telephone" name="telephone" onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="anniversaire">Anniversaire:</label>
                    <input type="tel" id="anniversaire" name="anniversaire" onChange={handleInputChange} />
                </div>
                <br></br>
                <div>
                    <label htmlFor="adresse">Adresse :</label>
                    <input type="text" id="adresse" name="adresse" onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="ville">Ville :</label>
                    <input type="text" id="ville" name="ville" onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="code_postal">Code Postal:</label>
                    <input type="text" id="code_postal" name="codepostal" onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="province">Province:</label>
                    <select id="province" name="province" onChange={handleInputChange}>
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
                <br></br>
                <div className='hidden'>
                    <label htmlFor="privilege">Privilege:</label>
                    <select id="privilege" name="privilege" value={props.userType ? props.userType : 'client'} onChange={handleInputChange}>
                        <option value="employe">Employe</option>
                        <option value="client">Client</option>
                    </select>
                </div><br></br>
                <button type="submit" className='custom-button'>Submit</button>
            </form>

        </div>
        

    )
}

export default CreateUser