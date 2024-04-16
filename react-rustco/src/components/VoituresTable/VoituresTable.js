import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { t } from "i18next"
import modelesParMarque from '../../modelesParMarque.json';
import './VoituresTable.css'

function VoituresTable(){

    const urlListeVoitures = "https://rustandco.onrender.com/api/voitures";
    const [listeVoitures, setListeVoitures] = useState([]);
    const [editVoitureToggle, setEditVoitureToggle] = useState(false);
    const [voiture, setVoiture] = useState({});
    const [modeles, setModeles] = useState([]);
    const [marqueSelectionnee, setMarqueSelectionnee] = useState('');
    const [formData, setFormData] = useState({
        marque:'',
        modele: '',
        annee: '',
        condition: '',
        prix_achete: '',
        profit: '',
        description_en: '',
        description_fr: '',
        image: 'test.png' 
    });

    const anneeCourrante = new Date().getFullYear();
    const annees = Array.from({ length: (anneeCourrante - 1920) + 1 }, (_, index) => anneeCourrante - index);


    useEffect(() => {
        // useEffect est juste quand il y a CHANGEMENT
        fetch(urlListeVoitures)
          .then((reponse) => reponse.json())
          .then((data) => {
            setListeVoitures(data)
          });
      }, []);
    

    /// DELETE
    function deleteVoiture(id){
        const bonId = id.trim();
        fetch(`${urlListeVoitures}/${bonId}`, {
            method: 'DELETE',
        })
        .then((reponse) => {
            if (reponse.ok) { 
                setListeVoitures(listeVoitures.filter(voiture => voiture.id !== id));
            } 
        })
        .catch((error) => {
            console.error('Erreur:', error);
        });
    };






    ////////////////////// UPDATE/////////////////////////////////////////////
    function handleEditVoitureClick(voiture){
        console.log(voiture);
        setEditVoitureToggle(true);
        console.log(voiture.prix_achete);

    }

    //------------------------------------------------------------------//

    function handleInputChange(e){
        const { name, value, type, files } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === 'file' ? files[0] : value
        }));
      console.log(formData);
    };

    const handleChange = (e) => {
        handleMarqueChange(e);
        handleInputChange(e);
    };

                /////////////////////////////// FILTRES //////////////////////////////
                useEffect(() => {
                
                    setModeles(modelesParMarque[voiture.modele]);
                 
                }, [marqueSelectionnee]);
                
                const handleMarqueChange = (e) => {
                    setMarqueSelectionnee(e.target.value);
                };
                
                const capitalizeFirst = (string) => {
                    return string.charAt(0).toUpperCase() + string.slice(1);
                };
                ///////////////////////////////////////////////////////////////////////////////////////////





////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////
  const liVoiture = listeVoitures.map((voiture, index) => {
   // console.log(voiture);
    return (
       <tr key={index}>
        <td>
            {voiture.id}
        </td>
        <td>
            {voiture.marque}
        </td>
        <td>
            {voiture.modele}
        </td>
        <td>
            {voiture.annee}
        </td>
        <td>
            {voiture.condition}
        </td>
        <td>
            {voiture.prix_achete}
        </td>
        <td>
            {voiture.profit}
        </td>
        <td className="flex border-none justify-around">
            {/* <Link to={`/update-voiture/${voiture.id.trim()}`}> */}
                <img className="w-8 mx-2 cursor-pointer" src="/icons/edit.png" onClick={()=>{handleEditVoitureClick(voiture)}}/>
                {/* </Link> */}
            <img className="w-8 mx-2 cursor-pointer" src="/icons/delete.png" onClick={(e) => { e.preventDefault(); deleteVoiture(voiture.id);}}></img>
        </td>
      </tr> 
    ); 
  });

    return (
        <div>
            <a href="/create-voiture"><button className="custom-button mt-5">+ Créer une Voiture</button></a>


        {(!editVoitureToggle) ?
            <table className="voitures-table mt-5">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Marque</th>
                        <th>Modele</th>
                        <th>Annee</th>
                        <th>Condition</th>
                        <th>Prix à l'achat</th>
                        <th>Profit (%)</th>
                        <th>Opérations</th>
                    </tr>
                </thead>
                <tbody>
                    {liVoiture}
                </tbody>  
            </table>

            : 

            <div>
                 <h1 className='text-4xl font-bold mb-5'>Update Voiture</h1>
            <form className='form-create-user' method='PUT'>
                
                {/* <div className='select-wrapper'>
                    <select id="filtre-marque"  name='marque' defaultValue={voiture ? voiture.marque : ''} onChange={handleChange}>
                        <option disabled value="">-- {t('marque')} --</option>
                        {Object.keys(modelesParMarque).map((marque) => (
                            <option key={marque} value={marque}>{capitalizeFirst(marque)}</option>
                        ))}
                    </select>
                </div>

                <div className='select-wrapper'>
                    <select id='filtre-modele' defaultValue={voiture ? voiture.modele : ''} name="modele" onChange={handleInputChange}>
                        <option disabled value="">-- {t('modele')} --</option>
                        {modeles.map(modele => (
                            <option key={modele} value={modele}>{modele}</option>
                        ))}
                    </select>
                </div>

                <div className='select-wrapper'>
                    <select id='filtre-annee' defaultValue={voiture ? voiture.annee : ''} name='annee' onChange={handleInputChange}>
                        <option disabled value="">-- {t('annee')} --</option>
                        {annees.map(annee => (
                            <option key={annee} value={annee}>{annee}</option>
                        ))}
                    </select>
                </div> */}

                {/* <div className='mt-5'>
                    <select name='condition' defaultValue="{voiture.condition}" required onChange={handleInputChange}>
                    <option disabled value="" selected>-- condition --</option>
                        <option value="detruit">Détruit</option>
                        <option value="endommage">Endommagé</option>
                        <option value="moyenne">Moyenne</option>
                        <option value="presque-parfaite">Prèsque Parfaite</option>
                        <option value="parfaite">Parfaite</option>
                    </select> 
                </div>
                */}
                <div>
                    <label for="prix_achete">Prix Achet&eacute; : </label>
                    <input type='text' id="prix_achete" name="prix_achete" required maxLength={7} onChange={handleInputChange} defaultValue={voiture ? voiture.prix_achete : ""}/>
                </div>

                <div>
                    <label for="profit">Marge de profit (%) : </label>
                    <input type='text' id="profit" name="profit" required maxLength={7} onChange={handleInputChange} defaultValue={voiture ? voiture.profit : ''}/>
                </div>

                <div className='textarea-container flex items-center'>
                    <label for="description_en">D&eacute;scription EN : </label>
                    <textarea id="description_en" name="description_en" className='textarea px-1' required maxLength={400} onChange={handleInputChange} defaultValue={voiture ? voiture.description_en : ""}/>
                </div>

                <div className='textare-container flex items-center'>
                    <label for="description_fr">D&eacute;scription FR : </label>
                    <textarea id="description_fr" name="description_fr" className='textarea px-1' required maxLength={400} onChange={handleInputChange} defaultValue={voiture ? voiture.description_fr : ""}/>
                </div>

                <div>
                    <label for="image">Image : </label>
                    <input type='file' id="image" name="image" filename={formData.image} onChange={handleInputChange} />
                </div>

                <br></br>
                <button type="submit" className='custom-button'>Submit</button>
            </form>
            </div>
            }


        </div>
        
    )

}

export default VoituresTable;