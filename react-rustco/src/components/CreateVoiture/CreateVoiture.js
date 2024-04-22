import './CreateVoiture.css';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import modelesParMarque from '../../modelesParMarque.json';
import { t } from 'i18next';

function CreateVoiture(props){
    const [filtres, setFiltres] = useState([]);
    const [marqueSelectionnee, setMarqueSelectionnee] = useState('');
    const [modeles, setModeles] = useState([]);
    // annee
    const anneeCourrante = new Date().getFullYear();
    const annees = Array.from({ length: (anneeCourrante - 1920) + 1 }, (_, index) => anneeCourrante - index);


    const [formData, setFormData] = useState({
        marque: '',
        modele: '',
        annee: '',
        condition: '',
        prix_achete: '',
        profit: '',
        description_en: '',
        description_fr: '',
        image: 'test.png'
    });


   function handleInputChange(event){
        const { name, value, type, files } = event.target;
       setFormData({
            ...formData,
            [name]: type === 'file' ? files[0] : value
        });
       console.log(formData);
    };

    async function handleSubmit(event){
        event.preventDefault(); 
        try {
            const reponse = await fetch('https://rustandco.onrender.com/api/voitures', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem('logged-user')}`
                },
                body: JSON.stringify(formData)
            });
            console.log(reponse);
            if (!reponse.ok) throw new Error('Network response was not ok.');
          
            console.log('Data successfully sent to the server');
        } catch (error) {
            console.error('Error:', error);
        }
    };


// le change input pour nom de marque (avec systemem filtres)
    const handleChange = (event) => {
        handleMarqueChange(event);
        handleInputChange(event);
    };


                /////////////////////////////// FILTRES //////////////////////////////
                useEffect(() => {
                    if (marqueSelectionnee && marqueSelectionnee !== "tous") {
                    setModeles(modelesParMarque[marqueSelectionnee]);
                    } else {
                    setModeles([]);
                    }
                }, [marqueSelectionnee]);
                
                const handleMarqueChange = (event) => {
                    setMarqueSelectionnee(event.target.value);
                };
                
                const capitalizeFirst = (string) => {
                    return string.charAt(0).toUpperCase() + string.slice(1);
                };

                async function filtre(marque,modele, annee) {
                    let newMarque,newModele, newAnnee;
                    marque == 'tous' ? newMarque = '' : newMarque = marque;
                    modele == 'tous' ? newModele = '' : newModele = modele;
                    annee == 'tous' ? newAnnee = '' : newAnnee = annee;
                    setFiltres([newMarque, newModele, newAnnee]);
                }
                ///////////////////////////////////////////////////////////////////////////////////////////


    return(
        <div>
            <h1 className='text-4xl font-bold'>Create Voiture</h1>
            <form className='form-create-user' method='POST' onSubmit={handleSubmit}>
                
                <div className='select-wrapper'>
                    <select id="filtre-marque" defaultValue="" name='marque' onChange={handleChange}>
                        <option disabled value="">-- {t('marque')} --</option>
                        {Object.keys(modelesParMarque).map((marque) => (
                            <option key={marque} value={marque}>{capitalizeFirst(marque)}</option>
                        ))}
                    </select>
                </div>

                <div className='select-wrapper'>
                    <select id='filtre-modele' defaultValue="" name="modele" onChange={handleInputChange}>
                        <option disabled value="">-- {t('modele')} --</option>
                        {modeles.map(modele => (
                            <option key={modele} value={modele}>{modele}</option>
                        ))}
                    </select>
                </div>

                <div className='select-wrapper'>
                    <select id='filtre-annee' defaultValue="" name='annee' onChange={handleInputChange}>
                        <option disabled value="">-- {t('annee')} --</option>
                        {annees.map(annee => (
                            <option key={annee} value={annee}>{annee}</option>
                        ))}
                    </select>
                </div>

                <div className='mt-5'>
                    <select name='condition' required onChange={handleInputChange}>
                    <option disabled value="" selected>-- condition --</option>
                        <option value="detruit">Détruit</option>
                        <option value="endommage">Endommagé</option>
                        <option value="moyenne">Moyenne</option>
                        <option value="presque-parfaite">Prèsque Parfaite</option>
                        <option value="parfaite">Parfaite</option>
                    </select> 
                </div>
               
                <div>
                    <label for="prix_achete">Prix Achet&eacute; : </label>
                    <input type='text' id="prix_achete" name="prix_achete" required maxLength={7} onChange={handleInputChange}/>
                </div>

                <div>
                    <label for="profit">Marge de profit (%) : </label>
                    <input type='text' id="profit" name="profit" required maxLength={7} onChange={handleInputChange}/>
                </div>

                <div className='textarea-container flex items-center'>
                    <label for="description_en">D&eacute;scription EN : </label>
                    <textarea id="description_en" name="description_en" className='textarea' required maxLength={400} onChange={handleInputChange}/>
                </div>

                <div className='textare-container flex items-center'>
                    <label for="description_fr">D&eacute;scription FR : </label>
                    <textarea id="description_fr" name="description_fr" className='textarea' required maxLength={400} onChange={handleInputChange}/>
                </div>

                <div>
                    <label for="image">Image : </label>
                    <input type='file' id="image" name="image" filename={formData.image} onChange={handleInputChange}/>
                </div>

                <br></br>
                <button type="submit" className='custom-button'>Submit</button>
            </form>
        </div>
    )
}

export default CreateVoiture;