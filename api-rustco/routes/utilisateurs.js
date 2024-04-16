const express = require("express");
const router = express.Router();
const db = require("../config/db.js");
const bcrypt = require("bcrypt");
const auth = require("../middlewares/auth.js");
const { check, validationResult } = require("express-validator");


router.get("/initialize", async (req, res) => {
    const donneesTest = require("../data/mockUtilisateurs.js");
    donneesTest.forEach(async (utilisateur) => {
        console.log(utilisateur)
        await db.collection("utilisateurs").add(utilisateur);
    });

   res.statusCode = 200;
    res.json({ message: "Données initialisées" });
});

//-------------------------------------------------------------------------------------

/**
 * PREND TOUTE LES UTILISATEURS
 * Cette route permet de récupérer la liste des utilisateurs
 * @route GET 
 */
router.get("/", async (req, res) => {

    try{

        const donneesUtilisateurs = await db.collection("utilisateurs").get();
        const donneesFinale = [];

        donneesUtilisateurs.forEach((doc)=>{
            donneesFinale.push(doc.data());
        })

        res.statusCode = 200;
        res.json(donneesFinale);

    
    } catch (erreur){
        console.log(erreur)
        res.statusCode = 500;
        res.json({message: "Une erreur est survenue."})
    }
});

//-------------------------------------------------------------------------------------

/**
 * PREND UN UTILISATEUR AVEC SON ID
 * Cette route permet de récupérer un utilisateur
 * @route GET
 */
router.get("/:id", async (req, res) => {
    try{
        const idUtilisateur = req.params.id;

        const donneeRef = await db.collection("utilisateurs").doc(idUtilisateur).get();

        const donnee = donneeRef.data();

        if (donnee) {
            res.statusCode = 200;
            res.json(donnee);
        } else {
            res.statusCode = 500;
            res.json({ message: "Utilisateur non trouvé" });
        }

    }catch (error){
        res.statusCode = 500;
        res.json({ message: "Utilisateur non trouvé" });
    }
    
});

//-------------------------------------------------------------------------------------

/**
 * CRÉATION
 * Cette route permet de créer un film
 * @route POST /films
 */
//TODO:Validation de Conditions_id
router.post("/",
    [
        //TODO: Fait la validation
    ],
    
    async (req, res) => {

        //const validation = validationResult(req);       

        // if (validation.errors.length > 0) {
        //     res.statusCode = 400;
        //     return res.json({message: "Données non comforme"})
        // }

        //Récupe info du body
        const {courriel, password} = req.body;

        //Vérifie si courriel existe 
        //Met le username en minuscule car les nom d'utilisateurs sont en minuscule dans la db. C'est fait comme ça car sinon, il croit que "volf" n'est pas égale à "Volf"
        const docRef = await db.collection("utilisateurs").where("courriel", "==", courriel).get();
        const utilisateurs = [];

        docRef.forEach((doc)=>{
            utilisateurs.push(doc.data());
        })

        //Si oui, erreur
        if (utilisateurs.length > 0) {
            res.statusCode = 400;
            return res.json({message: "Le courriel est déjà utilisé"});
        }

        //Encrypte le mot de passe
        const hash = await bcrypt.hash(password, 10);

        try{

            //Créer un champ de valeur dans firebase. (Ceci éxiste pour créer un champ avec un ID et récupérer son id pour la vrai valeur)
            let createField = {};
            await db.collection("utilisateurs").add(createField)

            /**
             * Ajout des vraies données en modifiant le champ vide créer
             */
            .then(async function(docRef) {

                const utilisateur = {};
                utilisateur.id = docRef.id;
                utilisateur.prenom = req.body.prenom;
                utilisateur.nom_de_famille = req.body.nom_de_famille;
                utilisateur.anniversaire = req.body.anniversaire;
                utilisateur.adresse = req.body.adresse;
                utilisateur.code_postal = req.body.code_postal;
                utilisateur.telephone = req.body.telephone;
                utilisateur.courriel = req.body.courriel;
                utilisateur.username = req.body.username.toLowerCase();
                utilisateur.password = hash;
                utilisateur.province = req.body.province;
                utilisateur.ville = req.body.ville;
                utilisateur.privilege = req.body.privilege;

                await db.collection("utilisateurs").doc(docRef.id).update(utilisateur);

            })        
            .catch(function(error) {
                res.statusCode = 500;
                return res.json({message: "error"})
            });

            res.statusCode = 201;
            res.json({message: "La donnée a été ajoutée"});
        } catch {
            res.statusCode = 500;
            res.json({message: "error 2"})
        }
    }
);

//-------------------------------------------------------------------------------------

/**
 * MODIFICATION
 * Cette route permet de modifier un utilisateur
 * @route POST 
 */
router.put("/:id",
    [
        //TODO: Fait la validation
    ],
    
    async (req, res) => {

        //const validation = validationResult(req);       

        // if (validation.errors.length > 0) {
        //     res.statusCode = 400;
        //     return res.json({message: "Données non comforme"})
        // }


        const idUtilisateur = req.params.id;

        //Récupe info du body
        const {courriel, password} = req.body;

        
        const oldUserData = await db.collection("utilisateurs").doc(idUtilisateur).get();

        //Vérifie si courriel existe 
        //Met le username en minuscule car les nom d'utilisateurs sont en minuscule dans la db. C'est fait comme ça car sinon, il croit que "volf" n'est pas égale à "Volf"
        const docRef = await db.collection("utilisateurs").where("courriel", "==", courriel).get();
        const utilisateurs = [];

        docRef.forEach((doc)=>{
            utilisateurs.push(doc.data());
        })

        //Check si le nom d'utilisateur n'est pas identique à un autre utilisateur et qu'il n'est pas le même que celui avant la modification
        //Si oui, erreur
        if (utilisateurs.length > 0 && courriel !== oldUserData.data().courriel) {
            res.statusCode = 400;
            return res.json({message: "Le nom d'utilisateur est déjà utilisé"});
        }

        //Encrypte le mot de passe
        const hash = await bcrypt.hash(password, 10);

        try{

            const utilisateur = {};
            utilisateur.id = idUtilisateur;
            utilisateur.prenom = req.body.prenom;
            utilisateur.nom_de_famille = req.body.nom_de_famille;
            utilisateur.anniversaire = req.body.anniversaire;
            utilisateur.adresse = req.body.adresse;
            utilisateur.code_postal = req.body.code_postal;
            utilisateur.telephone = req.body.telephone;
            utilisateur.courriel = req.body.courriel;
            utilisateur.username = req.body.username.toLowerCase();
            utilisateur.password = hash;
            utilisateur.province = req.body.province;
            utilisateur.ville = req.body.ville;
            utilisateur.privilege = req.body.privilege;

            await db.collection("utilisateurs").doc(idUtilisateur).update(utilisateur);

            res.statusCode = 201;
            res.json({message: "La donnée a été modifiée"});
        } catch {
            res.statusCode = 500;
            res.json({message: "error"})
        }
    }
);

//-------------------------------------------------------------------------------------

//SUPPRIMER
router.delete("/:id", async (req, res)=>{
    //params est tout les : dans ton url. Par exemple, :id, :user etc
    const idUtilisateur = req.params.id;
    const resultat = await db.collection("utilisateurs").doc(idUtilisateur).delete();

    res.json("La donnée a été supprimé");
});

//-------------------------------------------------------------------------------------

// //CONNEXION
// router.post("/connexion", async (req, res)=>{

//     //Récupe info du body
//     const {username, mdp} = req.body;
// });

module.exports = router;