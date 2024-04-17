import './UpdateUser.css';
import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader'
import { t } from 'i18next';

function UpdateUser(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    const urlUserInitial = `https://rustandco.onrender.com/api/utilisateurs/${id}`
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



   // console.log(id);
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
                password: user.password,
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
            const reponse = await fetch(`https://rustandco.onrender.com/api/utilisateurs/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            console.log(reponse);
            if (!reponse.ok) throw new Error('Network response was not ok.');
          
            console.log('Data successfully sent to the server');

        } catch (error) {
            console.error('Error:', error);
        }
        navigate('/admin')
    };



            const capitalizeFirst = (string) => {
                return string.charAt(0).toUpperCase() + string.slice(1);
            };
            ///////////////////////////////////////////////////////////////////////////////////////////

    console.log(formData);


    if (isLoading) {
        return <div><Loader /></div>;  
    }

    return(
        <div>
            <h1 className='text-4xl font-bold mb-5'>Update User</h1>
            <form className='form-create-user' onSubmit={handleSubmit}>
               
                <div>
                    <label for="prenom">Prénom : </label>
                    <input type='text' id="prenom" name="prenom" required maxLength={60} onChange={handleInputChange} defaultValue={user ? user.prenom : ""}/>
                </div>

                <div>
                    <label for="nom_de_famille">Nom de Famille : </label>
                    <input type='text' id="nom_de_famille" name="nom_de_famille" required maxLength={70} onChange={handleInputChange} defaultValue={user ? user.nom_de_famille : ''}/>
                </div>

                <div>
                    <label for="username">UserName : </label>
                    <input type='text' id="username" name="username" required maxLength={70} onChange={handleInputChange} defaultValue={user ? user.username : ''}/>
                </div>
                <div>
                    <label for="courriel">Courriel : </label>
                    <input type='email' id="courriel" name="courriel" required maxLength={70} onChange={handleInputChange} defaultValue={user ? user.courriel : ''}/>
                </div>
                <div>
                    <label for="password">Password : </label>
                    <input type='password' id="password" name="password" required maxLength={20} onChange={handleInputChange} defaultValue={user ? user.password : ''}/>
                </div>
                <div>
                    <label for="telephone">Telephone : </label>
                    <input type='text' id="telephone" name="telephone" required maxLength={12} onChange={handleInputChange} defaultValue={user ? user.telephone : ''}/>
                </div>
                <div>
                    <label for="adresse">Adresse : </label>
                    <input type='text' id="adresse" name="adresse" required maxLength={12} onChange={handleInputChange} defaultValue={user ? user.adresse : ''}/>
                </div>
                <div>
                    <label for="code_postal">Code Postal : </label>
                    <input type='text' id="code_postal" name="code_postal" required maxLength={12} onChange={handleInputChange} defaultValue={user ? user.code_postal : ''}/>
                </div>
                <div>
                    <label for="ville">Ville : </label>
                    <input type='text' id="ville" name="ville" required maxLength={12} onChange={handleInputChange} defaultValue={user ? user.ville : ''}/>
                </div>
                <div>
                    <label for="province">Province : </label>
                    <input type='text' id="province" name="province" required maxLength={12} onChange={handleInputChange} defaultValue={user ? user.province : ''}/>
                </div>
                <div>
                    <label for="anniversaire">Date de Naissance : </label>
                    <input type='text' id="anniversaire" name="anniversaire" required maxLength={12} onChange={handleInputChange} defaultValue={user ? user.anniversaire : ''}/>
                </div>
                
                <div>
                    <label for="privilege">Privilège : </label>
                    <select name='privilege' defaultValue={user ? user.privilege : ''} required onChange={handleInputChange}>
                        <option value="employe">Employé</option>
                        <option value="client">Client</option>
                    </select>
                </div>

                <br></br>
                <button type="submit" className='custom-button'>Submit</button>
            </form>
        </div>
    )
}

export default UpdateUser;