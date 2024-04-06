
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
          <p>Annee : {props.data.annee}</p>
          <p className='whitespace-nowrap'>Marque : {props.data.marque}</p>
          <p>Prix : {prixVente} $</p>
        </div>
      </article>
  );
}

export default TuileVoiture;
