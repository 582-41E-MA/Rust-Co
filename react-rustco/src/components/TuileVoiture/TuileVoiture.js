import i18next from 'i18next';
import { t } from "i18next";


import './TuileVoiture.css';
import Loader from '../Loader/Loader';

function TuileVoiture(props) {


  let nombreNettoye = props.data.prix_achete.replace(/[^0-9.]/g, "");
  const prix = Number(nombreNettoye);
  const profit = Number(props.data.profit);
  const prixFinal = (prix*((100+profit)/100)).toFixed(2)
  

   
  return (  
      <article className="tuile-voiture flex flex-col justify-between rounded-2xl custom-shadow_2 bg-aged_2">
        <img src={`voitures/${props.data.image}`} alt={props.data.modele} className='m-2 rounded-2xl'/>

        <div className='info text-xs'>
          <p>{t('annee')} : {props.data.annee}</p>
          <p>{t('modele')} : {props.data.modele}</p>
          <p className='whitespace-nowrap'>{t('marque')} : {props.data.marque}</p>
          <p>{t('prix')} : {prixFinal} $</p>
        </div>
      </article>
  );
}

export default TuileVoiture;
