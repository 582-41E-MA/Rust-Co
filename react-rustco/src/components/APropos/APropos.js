import { useContext } from 'react';
import { AppContext } from '../App/App';
import './APropos.css';
import Signature from '../Signature/Signature'


function APropos() {



   let context = useContext(AppContext);



   if(context.lang == 'fr'){

    return (  
      <div className='bg-aged_2 p-4 rounded-2xl max-w-4xl custom_shadow'>
        <h1 className='text-4xl font-bold my-6'>Bienvenue chez Rust&Co</h1>
        <p>
          Le leader incontesté dans la vente de voitures pour la ferraille. Fondée sur la passion de redonner vie aux trésors oubliés, notre entreprise s'est rapidement imposée comme une référence dans le domaine de la revalorisation automobile. Chez Rust&Co, nous croyons que chaque véhicule a une histoire à raconter et un potentiel à explorer, même au-delà de son apparence rouillée.
        </p>
        
        <h2 className='text-xl font-bold'>Notre Mission</h2>
        <p>
          Notre mission chez Rust&Co est de fournir une seconde vie aux véhicules destinés à la ferraille, en offrant à nos clients des options économiques et écologiquement responsables pour leurs besoins automobiles. Nous sommes fiers de contribuer à la réduction des déchets industriels en réhabilitant ce qui était autrefois considéré comme perdu. En choisissant Rust&Co, nos clients investissent non seulement dans leur avenir mais aussi dans celui de la planète.
        </p>
        
        <h2 className='text-xl font-bold'>Notre Équipe</h2>
        <p>
          Depuis notre création, nous avons toujours mis un point d'honneur à établir une relation de confiance avec nos clients. Notre équipe d'experts est passionnée et dédiée, prête à partager son savoir-faire et à accompagner chacun dans sa quête du véhicule parfaitement adapté à ses besoins. Chez Rust&Co, nous sommes plus qu'une entreprise ; nous sommes une communauté d'enthousiastes, unis par notre amour pour la rénovation et la préservation de la beauté cachée des véhicules en fin de vie.
        </p>
        
        <h2 className='text-xl font-bold'>Notre Boutique</h2>
        <p>
          Située au cœur de la ville, notre boutique propose une large sélection de véhicules de toutes marques et modèles, chacun avec son caractère et son histoire uniques. De la consultation initiale à la livraison finale, nous nous engageons à offrir une expérience transparente et satisfaisante, garantissant que chaque client reparte avec le sentiment d'avoir fait un choix éclairé et respectueux de l'environnement.
        </p>
        <Signature />
      </div>
    );

  }else{

    return (  
      <div className='bg-aged_2 p-4 rounded-2xl max-w-4xl custom_shadow'>
      <h1 className='text-2xl font-bold'>Welcome to Rust&Co</h1>
      <p>
        The undisputed leader in the sale of cars for scrap. Founded on the passion of giving new life to forgotten treasures, our company quickly established itself as a benchmark in the field of automotive revaluation. At Rust&Co, we believe that every vehicle has a story to tell and potential to explore, even beyond its rusty appearance.
      </p>
      
      <h2 className='text-xl font-bold'>Our Mission</h2>
      <p>
        Our mission at Rust&Co is to provide a second life to vehicles destined for scrap, offering our clients economical and environmentally responsible options for their automotive needs. We are proud to contribute to the reduction of industrial waste by rehabilitating what was once considered lost. By choosing Rust&Co, our clients invest not only in their future but also in that of the planet.
      </p>
      
      <h2 className='text-xl font-bold'>Our Team</h2>
      <p>
        Since our inception, we have always made it a point of honor to establish a trustful relationship with our clients. Our team of experts is passionate and dedicated, ready to share their know-how and to accompany each one in their quest for the vehicle perfectly adapted to their needs. At Rust&Co, we are more than a company; we are a community of enthusiasts, united by our love for the renovation and preservation of the hidden beauty of end-of-life vehicles.
      </p>
      
      <h2 className='text-xl font-bold'>Our Shop</h2>
      <p>
        Located in the heart of the city, our shop offers a wide selection of vehicles of all brands and models, each with its unique character and history. From the initial consultation to the final delivery, we commit to providing a transparent and satisfying experience, ensuring that every customer leaves with the feeling of having made an informed and environmentally respectful choice.
      </p>
      <Signature />
    </div>
    );
  }
}

export default APropos;
