import { useContext } from 'react';
import { AppContext } from '../App/App';
import Signature from '../Signature/Signature'
import './Termes.css';

function Termes() {

    let context = useContext(AppContext);

    if(context.lang == 'fr'){

        
        return (  
            <div className='bg-aged_2 p-4 rounded-2xl'>
                <h1 className='mt-12 mb-12 text-4xl font-bold'>Termes et Conditions</h1>
        
                <h2 className='text-xl font-bold'>Acceptation des Termes</h2> 
                <p>
                    En accédant et en utilisant Rust&Co, vous acceptez de vous conformer à ces termes et conditions, qui entrent en vigueur immédiatement à partir de votre première utilisation du site. Si vous n'êtes pas d'accord avec une partie quelconque des termes et conditions, vous ne devez pas utiliser notre site ou nos services.
                </p>
        
                <h2 className='text-xl font-bold'>Description du Service</h2>
                <p>
                    Rust&Co fournit une plateforme en ligne qui facilite la vente de véhicules considérés comme de la ferraille. Ces véhicules sont vendus "tels quels" et sans garantie de fonctionnement ou de sécurité. Les acheteurs doivent évaluer l'état des véhicules à leur propre discrétion.
                </p>
        
                <h2 className='text-xl font-bold'>Conditions de Vente</h2>
                <ul>
                    <li>Les acheteurs doivent être âgés d'au moins 18 ans et posséder la capacité juridique de conclure des contrats.</li>
                    <li>Toutes les ventes sont finales. Aucun remboursement ou échange ne sera accordé une fois qu'une vente est conclue.</li>
                    <li>Les paiements doivent être effectués intégralement avant la livraison ou le retrait du véhicule.</li>
                    <li>Les acheteurs sont responsables du retrait des véhicules achetés dans un délai spécifié après la vente.</li>
                </ul>
                
                <h2 className='text-xl font-bold'>Limitation de Responsabilité</h2>
                <p>
                    Rust&Co n'est pas responsable des dommages, pertes ou blessures résultant de l'utilisation des véhicules vendus sur notre site. Les acheteurs assument l'entière responsabilité pour toute utilisation des véhicules achetés.
                </p>
                
                <h2 className='text-xl font-bold'>Modifications des Termes et Conditions</h2>
                <p>
                    Rust&Co se réserve le droit de modifier ces termes et conditions à tout moment. Les modifications entreront en vigueur dès leur publication sur le site. Il est de votre responsabilité de vérifier régulièrement les termes et conditions pour vous assurer que vous êtes informé de toute modification.
                </p>
        
                <h2 className='text-xl font-bold'>Loi Applicable</h2>
                <p>
                    Ces termes et conditions sont régis et interprétés conformément aux lois du pays ou de la région où opère [Nom du Site]. Tout litige découlant de ou en relation avec ces termes et conditions sera soumis à la juridiction exclusive des tribunaux de cette juridiction.
                </p>
        
                <h2 className='text-xl font-bold'>Contactez-Nous</h2>
                <p>
                    Pour toute question ou préoccupation concernant ces termes et conditions, veuillez nous contacter à rustco@yourdomain.com.
                </p>
                <Signature />
            </div>
        );
        
    }else{
        return (  
            <div className='bg-aged_2 p-4 rounded-2xl'>
                <h1 className='mt-12 mb-12 text-4xl font-bold'>Terms and Conditions</h1>
        
                <h2 className='text-xl font-bold'>Acceptance of Terms</h2> 
                <p>
                    By accessing and using Rust&Co, you agree to comply with these terms and conditions, which take effect immediately upon your first use of the site. If you do not agree with any part of the terms and conditions, you must not use our site or services.
                </p>
        
                <h2 className='text-xl font-bold'>Service Description</h2>
                <p>
                    Rust&Co provides an online platform that facilitates the sale of vehicles considered as scrap. These vehicles are sold "as is" and without warranty of operation or safety. Buyers must assess the condition of the vehicles at their own discretion.
                </p>
        
                <h2 className='text-xl font-bold'>Sales Conditions</h2>
                <ul>
                    <li>Buyers must be at least 18 years old and have the legal capacity to enter into contracts.</li>
                    <li>All sales are final. No refunds or exchanges will be granted once a sale is concluded.</li>
                    <li>Payments must be made in full before delivery or pickup of the vehicle.</li>
                    <li>Buyers are responsible for the removal of purchased vehicles within a specified timeframe after the sale.</li>
                </ul>
                
                <h2 className='text-xl font-bold'>Limitation of Liability</h2>
                <p>
                    Rust&Co is not liable for damages, losses, or injuries resulting from the use of vehicles sold on our site. Buyers assume full responsibility for any use of the purchased vehicles.
                </p>
                
                <h2 className='text-xl font-bold'>Modifications to Terms and Conditions</h2>
                <p>
                    Rust&Co reserves the right to modify these terms and conditions at any time. Modifications will take effect immediately upon their publication on the site. It is your responsibility to regularly check the terms and conditions to ensure that you are informed of any changes.
                </p>
        
                <h2 className='text-xl font-bold'>Applicable Law</h2>
                <p>
                    These terms and conditions are governed and interpreted in accordance with the laws of the country or region where [Site Name] operates. Any dispute arising out of or in connection with these terms and conditions shall be subject to the exclusive jurisdiction of the courts of that jurisdiction.
                </p>
        
                <h2 className='text-xl font-bold'>Contact Us</h2>
                <p>
                    For any questions or concerns regarding these terms and conditions, please contact us at rustco@yourdomain.com.
                </p>
                <Signature />
            </div>
        );
    }        
}

export default Termes;
