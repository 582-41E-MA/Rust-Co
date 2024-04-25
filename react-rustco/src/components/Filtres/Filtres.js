import React, { useState, useEffect} from 'react';
import './Filtres.css';
import modelesParMarque from '../../modelesParMarque.json'
import { t } from 'i18next';

function Filtres(props) {
  //filtres par marque pour modeles
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



   
  return (  
    
      <form method='get' className='flex flex-wrap text-sm form-filtres rounded-2xl justify-center items-center mb-8 bg-aged_2 py-2' onSubmit={(e) =>{
        e.preventDefault(); 
        const marque = e.target["filtre-marque"].value;
        const modele = e.target["filtre-modele"].value;
        const annee = e.target["filtre-annee"].value;
        props.handleFiltres(marque, modele, annee);
        }}>

        <div className='select-wrapper'>
          <select id="filtre-marque" defaultValue="" onChange={handleMarqueChange}>
            <option disabled value="">-- {t('marque')} --</option>
            <option value="tous">{t('tous')}</option>
            {
            Object.keys(modelesParMarque).map((marque) => (
              <option key={marque} value={marque}>{capitalizeFirst(marque)}</option>
            ))
          }
          </select>
        </div>

        <div className='select-wrapper'>
          <select id='filtre-modele' defaultValue="">
            <option disabled value="">-- {t('modele')} --</option>
            <option value="tous">{t('tous')}</option>
            {modeles.map(modele => (
              <option key={modele} value={modele}>{modele}</option>
            ))}
          </select>
        </div>

        <div className='select-wrapper'>
          <select id='filtre-annee' defaultValue="">
            <option disabled value="">-- {t('annee')} --</option>
            <option value="tous">{t('tous')}</option>
            {annees.map(annee => (
              <option key={annee} value={annee}>{annee}</option>
            ))}
          </select>
        </div>

        <input className='submit-btn rounded py-1 px-12 w-200 bg-blue_1 text-white hover:bg-blue_3 hover:cursor-pointer' type='Submit' value={t('filtrer')} />
        
      </form>
    
  );
}

export default Filtres;
