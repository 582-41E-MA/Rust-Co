import './CreateUser.css'

function CreateUser(props){
console.log(props);

    function test(e){
        e.preventDefault();
        const formData = new FormData(e.target)
        const data = {};
        for (let key of formData.keys()) {
            data[key] = formData.get(key);
        }
        console.log(data);
    }

    function titreCreate(){
        if(props.userType == "employe"){
            return(<h1 className='text-4xl font-bold'>Créer Employé</h1>)
        }else{
            return(<h1 className='text-4xl font-bold'>Créer Compte Client</h1>)
        }
    }

    
    
    return(
        <div>
            {titreCreate()}
            <form className='form-create-user' onSubmit={test}>
                <div className='mt-5'>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" />
                </div>
                <div className='mt-5'>
                    <label htmlFor="nom">Prénom:</label>
                    <input type="text" id="nom" name="nom" />
                </div>
                <div>
                    <label htmlFor="nom">Nom de Famille:</label>
                    <input type="text" id="nom" name="nom" />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" />
                </div>
                <div>
                    <label htmlFor="telephone">Telephone:</label>
                    <input type="tel" id="telephone" name="telephone" />
                </div>
                <br></br>
                <div>
                    <label htmlFor="adresse">Adresse + app:</label>
                    <input type="text" id="adresse" name="adresse" />
                </div>
                <div>
                    <label htmlFor="ville">Ville:</label>
                    <input type="text" id="ville" name="ville" />
                </div>
                <div>
                    <label htmlFor="codepostal">Code Postal:</label>
                    <input type="text" id="codepostal" name="codepostal" />
                </div>
                <div>
                    <label htmlFor="province">Province:</label>
                    <select id="province" name="province">
                        <option value="alberta">Alberta</option>
                        <option value="colombie-britannique">Colombie-Britannique</option>
                        <option value="manitoba">Manitoba</option>
                        <option value="nouveau-brunswick">Nouveau-Brunswick</option>
                        <option value="terre-neuve-et-labrador">Terre-Neuve-et-Labrador</option>
                        <option value="territoires-du-nord-ouest">Territoires du Nord-Ouest</option>
                        <option value="nouvelle-ecosse">Nouvelle-Écosse</option>
                        <option value="nunavut">Nunavut</option>
                        <option value="ontario">Ontario</option>
                        <option value="ile-du-prince-edouard">Île-du-Prince-Édouard</option>
                        <option value="quebec">Québec</option>
                        <option value="saskatchewan">Saskatchewan</option>
                        <option value="yukon">Yukon</option>
                    </select> 
                </div>
                <br></br>
                <div className='hidden'>
                    <label htmlFor="privilege">Privilege:</label>
                    <select id="privilege" name="privilege" value={props.userType ? props.userType : 'client'}>
                        <option value="employe">Employe</option>
                        <option value="client">Client</option>
                    </select>
                </div><br></br>
                <button type="submit" className='custom-button'>Submit</button>
            </form>

        </div>
        

    )
}

export default CreateUser