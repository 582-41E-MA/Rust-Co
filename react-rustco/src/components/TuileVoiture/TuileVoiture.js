import i18next from 'i18next';
import { t } from "i18next";

import './TuileVoiture.css';

function TuileVoiture(props) {
  //console.log(props.data);

  const prix = props.data.prix_achete;
  let nombreNettoye = prix.replace(/[^0-9.]/g, "");
  let prixVente = (nombreNettoye*1.25).toFixed(2);

   
  return (  
      <article className="tuile-voiture">
        <img src={`img/${props.data.image}`} alt={props.data.modele} />
        <div className='info text-xs'>
          <p>{t('annee')} : {props.data.annee}</p>
          <p>{t('modele')} : {props.data.modele}</p>
          <p className='whitespace-nowrap'>{t('marque')} : {props.data.marque}</p>
          <p>{t('prix')} : {prixVente} $</p>
        </div>
      </article>
  );
}

export default TuileVoiture;
