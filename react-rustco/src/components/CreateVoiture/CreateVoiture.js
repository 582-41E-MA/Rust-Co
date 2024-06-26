import './CreateVoiture.css';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import modelesParMarque from '../../modelesParMarque.json';
import { t } from 'i18next';
import {
    Checkbox,
    FileInput,
    Label,
    RangeSlider,
    Select,
    Textarea,
    TextInput,
  } from "flowbite-react";


function CreateVoiture(props){
    const [filtres, setFiltres] = useState([]);
    const [marqueSelectionnee, setMarqueSelectionnee] = useState('');
    const [modeles, setModeles] = useState([]);
    // annee
    const anneeCourrante = new Date().getFullYear();
    const annees = Array.from({ length: (anneeCourrante - 1920) + 1 }, (_, index) => anneeCourrante - index);

    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        marque: '',
        modele: '',
        annee: '',
        condition: '',
        prix_achete: '',
        profit: '',
        description_en: '',
        description_fr: '',
        image: ''
    });

// POUR POGNER JUSTE LE FILENAME POUR LES PHOTOS. SOLUTION TEMPORAIRE
    function extractFilename(path) {
        return path.split('\\').pop();
    }


   function handleInputChange(event){
        const { name, value, type, files } = event.target;
       setFormData({
            ...formData,
            [name]: extractFilename(value)
        });
       console.log(formData);
    };
// [name]: type === 'file' ? IMAGE[0]: value


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
            navigate('/liste-voitures')
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

                console.log(formData.image.name)

    return(
        <div>
            <h1 className='text-4xl font-bold mb-8'>Create Voiture</h1>
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
                    <option disabled value="" selected>-- {t('condition')} --</option>
                        <option value="detruit">{t('detruit')}</option>
                        <option value="endommage">{t('EndommagE')}</option>
                        <option value="moyenne">{t('Moyenne')}</option>
                        <option value="presque-parfaite">{t('presque_parfaite')}</option>
                        <option value="parfaite">{t('parfaite')}</option>
                    </select> 
                </div>
               
                <div>
                    <label for="prix_achete">{t('prix_achete')} : </label>
                    <input type='text' id="prix_achete" name="prix_achete" required maxLength={7} onChange={handleInputChange}/>
                </div>

                <div>
                    <label for="profit">{t('marge_de_profit')} (%) : </label>
                    <input type='text' id="profit" name="profit" required maxLength={7} onChange={handleInputChange}/>
                </div>

                <div className='textarea-container flex items-center'>
                    <label for="description_en">Description EN : </label>
                    <textarea id="description_en" name="description_en" className='textarea' required maxLength={400} onChange={handleInputChange}/>
                </div>

                <div className='textare-container flex items-center'>
                    <label for="description_fr">Description FR : </label>
                    <textarea id="description_fr" name="description_fr" className='textarea' required maxLength={400} onChange={handleInputChange}/>
                </div>

                <div>
                    <label for="image">Image : </label>
                    <input type='file' id="image" name="image" filename={formData.image} onChange={handleInputChange} required/>
                </div>

                <br></br>
                <button type="submit" className='custom-button'>{t('soumettre')}</button>
            </form>
        </div>
    )
}

export default CreateVoiture;