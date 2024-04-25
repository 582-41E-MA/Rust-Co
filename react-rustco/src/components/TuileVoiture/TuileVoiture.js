import i18next from 'i18next';
import { t } from "i18next";


import './TuileVoiture.css';
import Loader from '../Loader/Loader';

function TuileVoiture(props) {
  //console.log(props.data);

  const prix = props.data.prix_achete;
  let nombreNettoye = prix.replace(/[^0-9.]/g, "");
  let prixVente = (nombreNettoye*1.25).toFixed(2);

   
  return (  
      <article className="tuile-voiture flex flex-col justify-between rounded-2xl bg-aged_2">
        <img src={`voitures/${props.data.image}`} alt={props.data.modele} className='m-2 rounded-2xl'/>

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
