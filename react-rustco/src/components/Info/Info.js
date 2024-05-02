import React from "react";
import { useContext } from 'react';
import { AppContext } from '../App/App';
import './Info.css';

function Info() {

  let context = useContext(AppContext);

  if(context.lang == 'fr'){
    return (
    <div className="info-wrapper top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="info-background bg-white_1 bg-opacity-10 rounded-lg p-8 pb-6 pt-0">
        <div className="info-grid grid grid-cols-1 gap-12 text-center lg:grid-cols-4 xl:gap-16 2xl:gap-32">
          <div className="info-containers mx-4 w-64 md:w-96 lg:w-56 xl:w-72 2xl:w-80">
            <img src="/icons/car.png" alt="Char" className="object-cover rounded-full" />
            <h1 className="text-3xl mt-4">Voitures</h1>
            <p className="mt-6">Nos voitures vous couperont le souffle, que ce soit une bonne chose ou non, nous vous laisserons en juger. Aucune vérification de crédit nécessaire! Paiement en espèces uniquement.</p>
          </div>
          <div className="info-containers mx-4 w-64 md:w-96 lg:w-56 xl:w-72 2xl:w-80">
            <img src="/icons/logo.png" alt="Logo" className="object-cover rounded-full" />
            <h1 className="text-3xl mt-4">Compagnie</h1>
            <p className="mt-6">Notre entreprise familiale est restée dans la même génération depuis... des générations, témoignant de notre engagement indéfectible envers l'excellence et la tradition.</p>
          </div>
          <div className="info-containers mx-4 w-64 md:w-96 lg:w-56 xl:w-72 2xl:w-80">
            <img src="/icons/folk.png" alt="Client" className="object-cover rounded-full" />
            <h1 className="text-3xl mt-4">Clientèle</h1>
            <p className="mt-6">Peu importe à quel point nos clients sont génétiquement rapprochés, nous visons continuellement à répondre à leurs besoins de manière plus approfondie. Nous sommes dédiés à une amélioration constante, garantissant que chaque interaction dépasse les attentes.</p>
          </div>
          <div className="info-containers mx-4 w-64 md:w-96 lg:w-56 xl:w-72 2xl:w-80">
            <img src="/icons/warranty.png" alt="Garantie" className="object-cover rounded-full" />
            <h1 className="text-3xl mt-4">Garantie</h1>
            <p className="mt-6">Peu importe son état usé ou rouillé, nous nous engageons à vous le vendre. Les remboursements ne sont pas possibles, mais nous garantissons la présence de rouille sur chaque article.</p>
          </div>
        </div>
      </div>
    </div>
    );
  }else{
    return ( 
      <div className="info-wrapper top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="info-background bg-white_1 bg-opacity-10 rounded-lg p-8 pb-6 pt-0">
        <div className="info-grid grid grid-cols-1 gap-12 text-center lg:grid-cols-4 xl:gap-16 2xl:gap-32">
          <div className="info-containers mx-4 w-64 md:w-96 lg:w-56 xl:w-72 2xl:w-80">
            <img src="/icons/car.png" alt="Char" className="object-cover rounded-full" />
            <h1 className="text-3xl mt-4">Our Cars</h1>
            <p className="mt-6">Our cars will take your breath away, whether that's a good thing or not, we'll let you be the judge of that.<br/>No credit check needed! Cash only.</p>
          </div>
          <div className="info-containers mx-4 w-64 md:w-96 lg:w-56 xl:w-72 2xl:w-80">
            <img src="/icons/logo.png" alt="Logo" className="object-cover rounded-full" />
            <h1 className="text-3xl mt-4">Our Brand</h1>
            <p className="mt-6">Our family-owned business has been stuck in the same generation for... generations, a testament to our enduring commitment to excellence and tradition.</p>
          </div>
          <div className="info-containers mx-4 w-64 md:w-96 lg:w-56 xl:w-72 2xl:w-80">
            <img src="/icons/folk.png" alt="Client" className="object-cover rounded-full" />
            <h1 className="text-3xl mt-4">Our Clients</h1>
            <p className="mt-6">Regardless of how closely genetically related our client's are, we continuously aim higher in fulfilling their needs. We're dedicated to constant improvement, ensuring every interaction exceeds expectations</p>
          </div>
          <div className="info-containers mx-4 w-64 md:w-96 lg:w-56 xl:w-72 2xl:w-80">
            <img src="/icons/warranty.png" alt="Garantie" className="object-cover rounded-full" />
            <h1 className="text-3xl mt-4">Our Warranty</h1>
            <p className="mt-6">No matter how worn or rusty it may appear, we stand by our commitment to sell it to you. Refunds aren't an option, but we guarantee rust on every item.</p>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default Info;
