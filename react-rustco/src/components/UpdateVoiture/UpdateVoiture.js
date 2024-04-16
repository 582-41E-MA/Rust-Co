import './UpdateVoiture.css';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import modelesParMarque from '../../modelesParMarque.json';
import { t } from 'i18next';

function UpdateVoiture(){
    const { id } = useParams();
    const [error, setError] = useState([]);
    const [voiture, setVoiture] = useState(null);
    const [marqueSelectionnee, setMarqueSelectionnee] = useState('');
    const [modeles, setModeles] = useState([]);

    const urlVoitureInitial = `https://rustandco.onrender.com/api/voitures/${id}`
    const [urlVoiture, setUrlVoiture] = useState(urlVoitureInitial)

    // annee
    const anneeCourrante = new Date().getFullYear();
    const annees = Array.from({ length: (anneeCourrante - 1920) + 1 }, (_, index) => anneeCourrante - index);

  

    const [formData, setFormData] = useState({
        marque:'',
        modele: '',
        annee: '',
        condition: '',
        prix_achete: '',
        profit: '',
        description_en: '',
        description_fr: '',
        image: 'test.png' 
    });
    

   // console.log(id);
   //pour fetch le data de la voiture pour preremplir
   useEffect(() => {
    async function voitureData(){
      try {
        const response = await fetch(urlVoiture);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        setVoiture(data); 
        setMarqueSelectionnee(data.marque);
        setModeles(modelesParMarque[voiture.marque])
        setFormData({
            marque: data.marque,
            modele: data.modele,
            annee: data.annee,
            condition: data.condition,
            prix_achete: data.prix_achete,
            profit: data.profit,
            description_en: data.description[0],
            description_fr: data.description[1],
            image: 'test.png' 
        });
    
      } catch (error) {
        setError("erreur du fetch");
      }
    };
    voitureData();
}, [urlVoiture]);



// setFormData({
//     marque: voiture.marque,
//     modele: voiture.modele,
//     annee: voiture.annee,
//     condition: voiture.condition,
//     prix_achete: voiture.prix_achete,
//     profit: voiture.profit,
//     description_en: voiture.description[0],
//     description_fr: voiture.description[1],
//     image: 'test.png' 
// })



   function handleInputChange(e){
        const { name, value, type, files } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === 'file' ? files[0] : value
        }));
      console.log(formData);
    };

    async function handleSubmit(e){
        e.preventDefault(); 
        console.log(formData);
        // try {
        //     const reponse = await fetch(`https://rustandco.onrender.com/api/voitures/${id}`, {
        //         method: 'PUT',
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify(formData)
        //     });
        //     console.log(reponse);
        //     if (!reponse.ok) throw new Error('Network response was not ok.');
          
        //     console.log('Data successfully sent to the server');
        // } catch (error) {
        //     console.error('Error:', error);
        // }
    };


// le change input pour nom de marque (avec systemem filtres)
    const handleChange = (e) => {
        handleMarqueChange(e);
        handleInputChange(e);
    };

            /////////////////////////////// FILTRES //////////////////////////////
            useEffect(() => {
                if (marqueSelectionnee && marqueSelectionnee !== "tous") {
                setModeles(modelesParMarque[marqueSelectionnee]);
                } else {
                setModeles([]);
                }
            }, [marqueSelectionnee]);
            
            const handleMarqueChange = (e) => {
                setMarqueSelectionnee(e.target.value);
            };
            
            const capitalizeFirst = (string) => {
                return string.charAt(0).toUpperCase() + string.slice(1);
            };
            ///////////////////////////////////////////////////////////////////////////////////////////


    return(
        <div>
            <h1 className='text-4xl font-bold mb-5'>Update Voiture</h1>
            <form className='form-create-user' method='PUT' onSubmit={handleSubmit}>
                
                <div className='select-wrapper'>
                    <select id="filtre-marque"  name='marque' defaultValue={voiture ? voiture.marque : ''} onChange={handleChange}>
                        <option disabled value="">-- {t('marque')} --</option>
                        {Object.keys(modelesParMarque).map((marque) => (
                            <option key={marque} value={marque}>{capitalizeFirst(marque)}</option>
                        ))}
                    </select>
                </div>

                <div className='select-wrapper'>
                    <select id='filtre-modele' defaultValue={voiture ? voiture.modele : ''} name="modele" onChange={handleInputChange}>
                        <option disabled value="">-- {t('modele')} --</option>
                        {/* {modeles.map(modele => (
                            <option key={modele} value={modele}>{modele}</option>
                        ))} */}
                    </select>
                </div>

                <div className='select-wrapper'>
                    <select id='filtre-annee' defaultValue={voiture ? voiture.annee : ''} name='annee' onChange={handleInputChange}>
                        <option disabled value="">-- {t('annee')} --</option>
                        {annees.map(annee => (
                            <option key={annee} value={annee}>{annee}</option>
                        ))}
                    </select>
                </div>

                <div className='mt-5'>
                    <select name='condition' defaultValue="{voiture.condition}" required onChange={handleInputChange}>
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
                    <input type='text' id="prix_achete" name="prix_achete" required maxLength={7} onChange={handleInputChange} defaultValue={voiture ? voiture.prix_achete : ""}/>
                </div>

                <div>
                    <label for="profit">Marge de profit (%) : </label>
                    <input type='text' id="profit" name="profit" required maxLength={7} onChange={handleInputChange} defaultValue={voiture ? voiture.profit : ''}/>
                </div>

                <div className='textarea-container flex items-center'>
                    <label for="description_en">D&eacute;scription EN : </label>
                    <textarea id="description_en" name="description_en" className='textarea px-1' required maxLength={400} onChange={handleInputChange} defaultValue={voiture ? voiture.description[0] : ""}/>
                </div>

                <div className='textare-container flex items-center'>
                    <label for="description_fr">D&eacute;scription FR : </label>
                    <textarea id="description_fr" name="description_fr" className='textarea px-1' required maxLength={400} onChange={handleInputChange} defaultValue={voiture ? voiture.description[1] : ""}/>
                </div>

                <div>
                    <label for="image">Image : </label>
                    <input type='file' id="image" name="image" filename={formData.image} onChange={handleInputChange} />
                </div>

                <br></br>
                <button type="submit" className='custom-button'>Submit</button>
            </form>
        </div>
    )
}

export default UpdateVoiture;