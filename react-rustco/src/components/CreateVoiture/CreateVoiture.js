import './CreateVoiture.css';
import { useState, useEffect } from "react";
import modelesParMarque from '../../modelesParMarque.json';
import { t } from 'i18next';

function CreateVoiture(props){
    const [filtres, setFiltres] = useState([]);
    const [marqueSelectionnee, setMarqueSelectionnee] = useState('');
    const [modeles, setModeles] = useState([]);
    // annee
    const anneeCourrante = new Date().getFullYear();
    const annees = Array.from({ length: (anneeCourrante - 1920) + 1 }, (_, index) => anneeCourrante - index);

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

    return(
        <div>
            <h1 className='text-4xl font-bold'>Create Voiture</h1>
            <form className='form-create-user'>
                
                <div className='mt-5'>
                    <select defaultValue="">
                    <option disabled value="">-- condition --</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select> 
                </div>
               
                <div className='select-wrapper'>
                    <select id="filtre-marque" defaultValue="" onChange={handleMarqueChange}>
                        <option disabled value="">-- {t('marque')} --</option>
                        {Object.keys(modelesParMarque).map((marque) => (
                            <option key={marque} value={marque}>{capitalizeFirst(marque)}</option>
                            ))}
                    </select>
                </div>

                <div className='select-wrapper'>
                    <select id='filtre-modele' defaultValue="">
                        <option disabled value="">-- {t('modele')} --</option>
                        {modeles.map(modele => (
                        <option key={modele} value={modele}>{modele}</option>
                        ))}
                    </select>
                </div>

                <div className='select-wrapper'>
                    <select id='filtre-annee' defaultValue="">
                        <option disabled value="">-- {t('annee')} --</option>
                        {annees.map(annee => (
                        <option key={annee} value={annee}>{annee}</option>
                        ))}
                    </select>
                </div>
                <br></br>
                <button type="submit" className='custom-button'>Submit</button>
            </form>
        </div>
    )
}

export default CreateVoiture;