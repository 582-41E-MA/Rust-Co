import './Panier.css';
import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AppContext } from "../App/App";


function Panier(){

    let context = useContext(AppContext);
    let [items, setItems] = useState(JSON.parse(localStorage.getItem('panier')) || []);
    useEffect(() => {
        console.log(items);
    }, [items]);



const deleteItem = function(itemId){
    const itemsRestants = items.filter(item => item.id !== itemId);
    setItems(itemsRestants);
    localStorage.setItem('panier', JSON.stringify(itemsRestants));
    
}



    const afficherItems = function() {
        return items.map((item, index) => (
            <li key={index} className="mb-4 border border-green-500">
                <div className="flex items-center space-x-4 justify-between px-6">
                    <img src={`/img/${item.image}`} alt={item.modele} className="w-24 h-24 object-cover"/>
                    <div>
                        <h3 className="text-lg font-bold">{item.marque} {item.modele}</h3>
                        <p>Année: {item.annee}</p>
                        <p>Condition: {item.condition}</p>
                        <p>Prix: ${item.prix}</p>
                    </div>
                <img className="w-8 mx-2 cursor-pointer" src="/icons/delete.png" onClick={(e) => { e.preventDefault(); deleteItem(item.id); }}></img>
                </div>
            </li>
        ));
    }





    const checkout = function(){
        console.log('checkout')
    }



    const shippingInfo = function(){

    if(context.lang == 'fr'){

        return(
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto my-8 border border-black">
                <h1 className="text-3xl font-bold text-center mb-6">Informations sur l'Expédition et le Retrait</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Détails de l'Expédition</h2>
                        <p className="mb-2">Nous offrons une expédition nationale à des tarifs compétitifs. Toutes les voitures subissent une inspection approfondie avant d'être expédiées pour garantir leur qualité et sécurité.</p>
                        <ul className="list-disc pl-5">
                            <li>Délai de livraison : Généralement de 3 à 5 jours ouvrables selon la localisation.</li>
                            <li>Frais d'expédition : Varient selon la distance et le modèle de voiture, à partir de 299 $.</li>
                            <li>Les informations de suivi seront fournies une fois que la voiture sera expédiée.</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Détails du Retrait</h2>
                        <p className="mb-2">Vous préférez retirer votre nouvelle voiture ? Nous proposons un service de retrait sûr et pratique depuis nos divers emplacements à travers le pays.</p>
                        <ul className="list-disc pl-5">
                            <li>Lieux de retrait : Disponibles dans toutes les grandes villes du pays.</li>
                            <li>Aucun frais supplémentaire pour le retrait.</li>
                            <li>Horaires de retrait flexibles pour s'adapter à votre emploi du temps.</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-6">
                    <h2 className="text-xl font-semibold">Services Supplémentaires</h2>
                    <p>Nous offrons également les services suivants pour améliorer votre expérience d'achat :</p>
                    <ul className="list-disc pl-5 mb-4">
                        <li>Garanties prolongées jusqu'à 5 ans.</li>
                        <li>Options de financement personnalisables pour s'adapter à votre budget.</li>
                        <li>Évaluations de reprise en ligne ou en personne.</li>
                    </ul>
                </div>
            </div>
        )
}else{
    return(
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto my-8 border border-black">
        <h1 className="text-3xl font-bold text-center mb-6">Shipping & Pickup Information</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h2 className="text-xl font-semibold mb-2">Shipping Details</h2>
                <p className="mb-2">We offer nationwide shipping at competitive rates. All cars undergo a thorough inspection before being shipped to ensure quality and safety.</p>
                <ul className="list-disc pl-5">
                    <li>Shipping time: Typically 3-5 business days depending on location.</li>
                    <li>Shipping fee: Varies by distance and car model, starting at $299.</li>
                    <li>Tracking information will be provided once the car is shipped.</li>
                </ul>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-2">Pickup Details</h2>
                <p className="mb-2">Prefer to pick up your new car? We offer a safe and convenient pickup service from our various locations nationwide.</p>
                <ul className="list-disc pl-5">
                    <li>Pickup locations: Available at all major cities across the country.</li>
                    <li>No additional fee for pickup.</li>
                    <li>Flexible pickup times to accommodate your schedule.</li>
                </ul>
            </div>
        </div>
        <div className="mt-6">
            <h2 className="text-xl font-semibold">Additional Services</h2>
            <p>We also offer the following services to enhance your buying experience:</p>
            <ul className="list-disc pl-5 mb-4">
                <li>Extended warranties for up to 5 years.</li>
                <li>Customizable financing options to suit your budget.</li>
                <li>Trade-in evaluations online or in-person.</li>
            </ul>
        </div>
    </div>
    )

}
}

return(
    <div>
        <h1 className='text-4xl font-bold mb-6'>Mon Panier</h1>
        <div className='flex flex-col mb-6 md:flex-row md:items-start gap-4'>
            <div className='info-panier flex-1'>
                <h2 className='text-2xl font-bold mb-6'>Mes Items</h2>
                <ul>
                    {afficherItems()}
                </ul>
            </div>
            <div className='info-paiement flex-1'>
                <h2 className='text-2xl font-bold mb-6'>Paiement</h2>
                {/* Simulated long content */}
                <p>Loregdfsssssssssssss fdsgfds gapfdg fdsgfd
                    sdsf gapfdsgdsg descriptiongdsg descriptiongdsgfd
                    s gapfdsgdsgdsg descripti
                    ongdsgfdsg fdsgfdssg 
                    gapfdsgdsg
                    dsgd gapfdsgdsgdsgdsg 
                    screengfs gapfdsgdsgdsf gapfdsgdsgfds gapfds
                    gdsg Loregdfsssssssssssss fdsgfds gapfdsgdsgdsgd gapfdsgdsgds
                    gdsg fds
                    gfds gapfdsgdsg</p>
                    <buton className='custom-button cursor-pointer' onClick={checkout} >PAYER</buton>
            </div>
        </div>


       {shippingInfo()}

    </div>
);
}



export default Panier;