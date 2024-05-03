import './UpdateUser.css';
import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader'
import villes from '../../villes.json'
import { t } from 'i18next';

function UpdateUser(props){
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    const urlUserInitial = `http://localhost:5000/api/utilisateurs/${id}`
    const [urlUser, setUrlUser] = useState(urlUserInitial)
    const [formData, setFormData] = useState({
        prenom: '',
        nom_de_famille: '',
        username: '',
        courriel: '',
        password: '',
        telephone: '',
        adresse:'',
        code_postal: '',
        ville: '',
        province: '',
        anniversaire: '',
        privilege: '',
    });
    const [cities, setCities] = useState([]);
    const filterCitiesByProvince = (province) => {
        const filteredCities = villes[province] || [];
        setCities(filteredCities);
    };
    useEffect(() => {
        filterCitiesByProvince(formData.province);
    }, [formData.province]);




   //pour fetch le data du user pour preremplir
   useEffect(() => {
    async function userData(){
      try {
        const response = await fetch(urlUser);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUser(data); 
        setIsLoading(false);
      } catch (error) {
        setError("erreur du fetch");
        setIsLoading(false);
      }
    };
    userData();
}, [id]);

    useEffect(() => {
        if (user) {
            setFormData({
                prenom: user.prenom,
                nom_de_famille: user.nom_de_famille,
                username: user.username,
                courriel: user.courriel,
                password: '',
                telephone: user.telephone,
                adresse: user.adresse,
                code_postal: user.code_postal,
                ville: user.ville,
                province: user.province,
                anniversaire: user.anniversaire,
                privilege: user.privilege,
            });
        }
    }, [user]);



   function handleInputChange(e){
        const { name, value, type, files } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }));
      console.log(formData);
    };

    async function handleSubmit(e){
        e.preventDefault(); 
        console.log(formData);
        try {
            const reponse = await fetch(`http://localhost:5000/api/utilisateurs/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem('logged-user')}`
                },
                body: JSON.stringify(formData)
            });
            console.log(reponse);
            if (!reponse.ok) throw new Error('Network response was not ok.');
          
            console.log('Data successfully sent to the server');

        } catch (error) {
            console.error('Error:', error);
        }
        if(props.logging.privilege == 'client'){
            navigate(`/client/${props.logging.id}`)
        }else{
            navigate('/admin')
        }
        
    };


    function capitalizeString(str) {
        return str.toLowerCase().split(/(?:^|-)\b/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
    }

        const capitalizeFirst = (string) => {
            return string.charAt(0).toUpperCase() + string.slice(1);
        };
        ///////////////////////////////////////////////////////////////////////////////////////////
  // rajouter ville nunavut a la bd


    if (isLoading) {
        return <div><Loader /></div>;  
    }

    return(
        <div>
            <h1 className='text-4xl font-bold mb-5'>{t('mis_a_jour')} {t('utilisateur')}</h1>
            <form className='form-create-user' onSubmit={handleSubmit}>
               
                <div>
                    <label for="prenom">{t('prenom')} : </label>
                    <input type='text' id="prenom" name="prenom" required maxLength={60} onChange={handleInputChange} defaultValue={user ? user.prenom : ""} />
                </div>

                <div>
                    <label for="nom_de_famille">{t('nom_de_famille')} : </label>
                    <input type='text' id="nom_de_famille" name="nom_de_famille" required maxLength={70} onChange={handleInputChange} defaultValue={user ? user.nom_de_famille : ''}/>
                </div>

                <div>
                    <label for="utilisateur">{t('utilisateur')} : </label>
                    <input type='text' id="username" name="username" required maxLength={70} onChange={handleInputChange} defaultValue={user ? user.username : ''}/>
                </div>
                <div>
                    <label for="courriel">{t('courriel')} : </label>
                    <input type='email' id="courriel" name="courriel" required maxLength={70} onChange={handleInputChange} defaultValue={user ? user.courriel : ''}/>
                </div>
                <div>
                    <label for="password">{t('mdp')} : </label>
                    <input type='password' id="password" name="password" required maxLength={20} onChange={handleInputChange} />
                </div>
                <div>
                    <label for="telephone">{t('telephone')} : </label>
                    <input type='text' id="telephone" name="telephone" required maxLength={12} onChange={handleInputChange} defaultValue={user ? user.telephone : ''}/>
                </div>
                <div>
                    <label for="adresse">{t('adresse')} : </label>
                    <input type='text' id="adresse" name="adresse" required maxLength={12} onChange={handleInputChange} defaultValue={user ? user.adresse : ''}/>
                </div>
                <div>
                    <label for="code_postal">{t('code_postal')} : </label>
                    <input type='text' id="code_postal" name="code_postal" required maxLength={12} onChange={handleInputChange} defaultValue={user ? user.code_postal : ''}/>
                </div>
                <div>
                    <label for="province">Province : </label>  
                    <select id="province" name="province" onChange={handleInputChange} required defaultValue={user ? user.province : ''} className='custom-select'>
                        <option value='' disabled selected>{t('selectione')} province</option>
                        <option value="alberta">{t('alberta')}</option>
                        <option value="colombie-britannique">{t('colombie-britannique')}</option>
                        <option value="manitoba">{t('manitoba')}</option>
                        <option value="nouveau-brunswick">{t('nouveau-brunswick')}</option>
                        <option value="terre-neuve-et-labrador">{t('terre-neuve-et-labrador')}</option>
                        <option value="territoires-du-nord-ouest">{t('territoires-du-nord-ouest')}</option>
                        <option value="nouvelle-ecosse">{t('nouvelle-ecosse')}</option>
                        <option value="nunavut">{t('nunavut')}</option>
                        <option value="ontario">{t('ontario')}</option>
                        <option value="ile-du-prince-edouard">{t('ile-du-prince-edouard')}</option>
                        <option value="quebec">{t('quebec')}</option>
                        <option value="saskatchewan">{t('saskatchewan')}</option>
                        <option value="yukon">{t('yukon')}</option>
                    </select> 
                </div>
                <div>
                    <label for="ville">{t('ville')} : </label>
                    <select id="ville" name="ville" onChange={handleInputChange} required defaultValue={user ? user.ville : ''} className='custom-select'>
                        <option value='' disabled selected>{t('selectione')} {t('ville')}</option>
                        {cities.map((city, index) => (
                        <option key={index} value={city}>{t(city)}</option>
                    ))}
                        
                    </select> 
                </div>
                <div>
                    <label for="anniversaire">{t('anniversaire')} : </label>
                    <input type='date' id="anniversaire" name="anniversaire" required onChange={handleInputChange} />
                    
                </div>
                {
                    props.logging.privilege == 'admin' ? 
                    <div>
                        <label for="privilege">{t('privilège')} : </label>
                        <select name='privilege' defaultValue={user ? user.privilege : ''} required onChange={handleInputChange}>
                            <option value="employe">{t('employé')}</option>
                            <option value="client">{t('client')}</option>
                        </select>
                    </div>
                    :
                    <></>
                }
                

                <br></br>
                <button type="submit" className='custom-button'>{t('Soumettre')}</button>
            </form>
        </div>
    )
}

export default UpdateUser;