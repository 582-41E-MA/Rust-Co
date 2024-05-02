import { useContext } from 'react';
import { AppContext } from '../App/App';
import Signature from '../Signature/Signature';
import './Politique.css';

function Politique() {

    let context = useContext(AppContext);

    if(context.lang == 'fr'){

        return (  
            <div className=''>
                <h1 className='text-4xl font-bold my-6'>Politique de Confidentialité</h1>
                <p>
                Chez Rust&Co, l'une de nos principales priorités est la vie privée de nos visiteurs. Cette Politique de Confidentialité contient des types d'informations qui sont collectées et enregistrées par Rust&Co et comment nous les utilisons.<br/>Si vous avez des questions supplémentaires ou nécessitez plus d'informations sur notre Politique de Confidentialité, n'hésitez pas à nous contacter.
                </p>
                
                <h2 className='text-4xl font-bold my-6'>Acceptation des Termes</h2>
                <p>
                    En accédant et en utilisant Rust&Co, vous acceptez de vous conformer à ces termes et conditions, qui entrent en vigueur immédiatement à partir de votre première utilisation du site. Si vous n'êtes pas d'accord avec une partie quelconque des termes et conditions, vous ne devez pas utiliser notre site ou nos services.
                </p>

                <h2 className='text-4xl font-bold my-6'>Description du Service</h2>
                <p>
                    Rust&Co fournit une plateforme en ligne qui facilite la vente de véhicules considérés comme de la ferraille. Ces véhicules sont vendus "tels quels" et sans garantie de fonctionnement ou de sécurité. Les acheteurs doivent évaluer l'état des véhicules à leur propre discrétion.
                </p>

                <h2 className='text-4xl font-bold my-6'>Conditions de Vente</h2>
                <ul>
                    <li>Les acheteurs doivent être âgés d'au moins 18 ans et posséder la capacité juridique de conclure des contrats.</li>
                    <li>Toutes les ventes sont finales. Aucun remboursement ou échange ne sera accordé une fois qu'une vente est conclue.</li>
                    <li>Les paiements doivent être effectués intégralement avant la livraison ou le retrait du véhicule.</li>
                    <li>Les acheteurs sont responsables du retrait des véhicules achetés dans un délai spécifié après la vente.</li>
                </ul>

                <h2 className='text-4xl font-bold my-6'>Limitation de Responsabilité</h2>
                <p>
                    Rust&Co n'est pas responsable des dommages, pertes ou blessures résultant de l'utilisation des véhicules vendus sur notre site. Les acheteurs assument l'entière responsabilité pour toute utilisation des véhicules achetés.
                </p>
                
                <h2 className='text-4xl font-bold my-6'>Modifications des Termes et Conditions</h2>
                <p>
                    Rust&Co se réserve le droit de modifier ces termes et conditions à tout moment. Les modifications entreront en vigueur dès leur publication sur le site. Il est de votre responsabilité de vérifier régulièrement les termes et conditions pour vous assurer que vous êtes informé de toute modification.
                </p>

                <h2 className='text-4xl font-bold my-6'>Loi Applicable</h2>
                <p>
                    Ces termes et conditions sont régis et interprétés conformément aux lois du pays ou de la région où opère Rust&Co. Tout litige découlant de ou en relation avec ces termes et conditions sera soumis à la juridiction exclusive des tribunaux de cette juridiction.
                </p>
                
                <h3 className='text-4xl font-bold my-6'>Contactez-Nous</h3>
                <p>
                    Pour toute question ou préoccupation concernant ces termes et conditions, veuillez nous contacter à rustco@yourdomain.com.
                </p>
                
                <Signature />
            </div>
        );

    }else{
        return (  
            <div className=''>
                <h1 className='text-4xl font-bold my-6'>Privacy Policy</h1>
                <p>
                At Rust&Co, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that are collected and recorded by Rust&Co and how we use it.<br/>If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
                </p>

                <h2 className='text-4xl font-bold my-6'>Acceptance of Terms</h2>
                <p>
                By accessing and using Rust&Co, you agree to comply with these terms and conditions, which take effect immediately upon your first use of the site. If you do not agree with any part of the terms and conditions, you must not use our site or services.
                </p>
                
                <h2 className='text-4xl font-bold my-6'>Service Description</h2>
                <p>
                Rust&Co provides an online platform that facilitates the sale of vehicles considered as scrap. These vehicles are sold "as is" without any warranty of operation or safety. Buyers must assess the condition of the vehicles at their own discretion.
                </p>

                <h2 className='text-4xl font-bold my-6'>Conditions of Sale</h2>
                <ul>
                    <li>Buyers must be at least 18 years old and possess the legal capacity to enter into contracts.</li>
                    <li>All sales are final. No refunds or exchanges will be given once a sale is concluded.</li>
                    <li>Payments must be made in full before the delivery or collection of the vehicle.</li>
                    <li>Buyers are responsible for the removal of purchased vehicles within a specified period after the sale.</li>
                </ul>

                <h2 className='text-4xl font-bold my-6'>Limitation of Liability</h2>
                <p>
                Rust&Co is not responsible for any damages, losses, or injuries resulting from the use of vehicles sold on our site. Buyers assume full responsibility for any use of the vehicles purchased.
                </p>

                <h2 className='text-4xl font-bold my-6'>Modifications to Terms and Conditions</h2>
                <p>
                Rust&Co reserves the right to modify these terms and conditions at any time. Changes will take effect immediately upon their posting on the site. It is your responsibility to regularly check the terms and conditions to ensure you are aware of any changes.
                </p>

                <h2 className='text-4xl font-bold my-6'>Applicable Law</h2>
                <p>
                These terms and conditions are governed and interpreted in accordance with the laws of the country or region where Rust&Co operates. Any dispute arising out of or related to these terms and conditions will be subject to the exclusive jurisdiction of the courts of that jurisdiction.
                </p>

                <h3 className='text-4xl font-bold my-6'>Contact Us</h3>
                <p>
                For any questions or concerns regarding these terms and conditions, please contact us at rustco@yourdomain.com.
                </p>
                <Signature />
            </div>
        );
    }

}

export default Politique;
