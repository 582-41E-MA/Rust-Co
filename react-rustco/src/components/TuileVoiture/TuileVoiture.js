
import './TuileVoiture.css';

function TuileVoiture(props) {
   
  return (  
      <article className="tuile-voiture">
        <img src={`img/${props.data.image}`} alt={props.data.modele} />
      </article>
  );
}

export default TuileVoiture;
