import React, { useState, useEffect} from 'react';
import './Filtres.css';
import modelesParMarque from '../../modelesParMarque.json'
import i18next from 'i18next';
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


  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the form from causing a page reload
    // Call the handleFiltres function passed via props with the selected value
    props.handleFiltres(event.target.elements.filtreConstructeur.value);
  };
   
  return (  
    
      <form method='get' className='flex text-sm form-filtres'>
        <div className='select-wrapper'>
          <select id="filtre-constructeur" defaultValue="" onChange={handleMarqueChange}>
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
      </form>
    
  );
}

export default Filtres;
