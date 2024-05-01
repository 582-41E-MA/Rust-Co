const express = require("express");
const router = express.Router();
const db = require("../config/db.js");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const authAdmin = require("../middlewares/authAdmin.js");
const authEmploye = require("../middlewares/authEmploye.js");
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
        // TODO: Refait la validation
        check("username").escape().trim().notEmpty().isString(),
        check("password").escape().trim().notEmpty().isString(),
        check("prenom").escape().trim().notEmpty().isString(),
        check("nom_de_famille").escape().trim().notEmpty().isString(),
        check("courriel").escape().trim().notEmpty().isEmail(),
        check("telephone").escape().trim().notEmpty().matches(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/),
        check("anniversaire").escape().notEmpty().matches(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/),
        check("privilege").escape().trim().notEmpty().isString(),
        check("province").escape().trim().notEmpty().isString(),
        check("ville").escape().trim().notEmpty().isString(),
        check("code_postal").escape().trim().notEmpty().isString(),
        check("adresse").escape().trim().notEmpty().isString()
    ],
    
    async (req, res) => {

        const validation = validationResult(req);       

        if (validation.errors.length > 0) {
            res.statusCode = 400;
            return res.json({message: "Données non comforme"})
        }

        
    //VALIDATION EXISTENCE DANS LA DB

    //PROVINCES
    //---------------------------------------------------------------------------------------------------
        const docRefProvince = await db.collection("provinces").where("province", "==", req.body.province).get();
        const provinces = [];

        docRefProvince.forEach((doc)=>{
            provinces.push(doc.data());
        })

        //Si oui, erreur
        if (provinces.length <= 0) {
            res.statusCode = 400;
            return res.json({message: "La province n'éxiste pas"});
        }
    //---------------------------------------------------------------------------------------------------

    //VILLE
    //---------------------------------------------------------------------------------------------------
    const docRefVille = await db.collection("villes").where("ville", "==", req.body.ville).get();
    const villes = [];

    docRefVille.forEach((doc)=>{
        villes.push(doc.data());
    })

    //Si oui, erreur
    if (villes.length == 0) {
        res.statusCode = 400;
        return res.json({message: "La ville n'éxiste pas"});
    }else if (villes[0].province != req.body.province){
        res.statusCode = 400;
        return res.json({message: "La ville n'est pas dans cette province"});
    }
    //---------------------------------------------------------------------------------------------------

    //PRIVILÈGES
    //---------------------------------------------------------------------------------------------------
    const docRefPrivilege = await db.collection("privileges").where("privilege", "==", req.body.privilege).get();
    const privileges = [];

    docRefPrivilege.forEach((doc)=>{
        privileges.push(doc.data());
    })

    //Si oui, erreur
    if (privileges.length == 0) {
        res.statusCode = 400;
        return res.json({message: "Le privilège n'éxiste pas"});
    }
    //---------------------------------------------------------------------------------------------------

    //COURRIEL  +   Création de l'utilisateur
    //---------------------------------------------------------------------------------------------------

        //Récupe info du body
        const {courriel, password} = req.body;

        // Vérifie si courriel existe 
        // Met le username en minuscule car les nom d'utilisateurs sont en minuscule dans la db. C'est fait comme ça car sinon, il croit que "volf" n'est pas égale à "Volf"
        const docRefUtilisateur = await db.collection("utilisateurs").where("courriel", "==", courriel).get();
        const utilisateurs = [];

        docRefUtilisateur.forEach((doc)=>{
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
        check("username").escape().trim().notEmpty().isString(),
        check("password").escape().trim().notEmpty().isString(),
        check("prenom").escape().trim().notEmpty().isString(),
        check("nom_de_famille").escape().trim().notEmpty().isString(),
        check("courriel").escape().trim().notEmpty().isEmail(),
        check("telephone").escape().trim().notEmpty().matches(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/),
        check("anniversaire").escape().notEmpty().matches(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/),
        check("privilege").escape().trim().notEmpty().isString(),
        check("province").escape().trim().notEmpty().isString(),
        check("ville").escape().trim().notEmpty().isString(),
        check("code_postal").escape().trim().notEmpty().isString(),
        check("adresse").escape().trim().notEmpty().isString() 
    ],
    
    async (req, res) => {

        const validation = validationResult(req);       

        if (validation.errors.length > 0) {
            res.statusCode = 400;
            return res.json({message: "Données non comforme"})
        }


        const idUtilisateur = req.params.id;
        const docRefUtilisateurOriginal = await db.collection("utilisateurs").where("id", "==", idUtilisateur).get();

        const utilisateurOriginal = [];

        docRefUtilisateurOriginal.forEach((doc)=>{
            utilisateurOriginal.push(doc.data());
        })

    //VALIDATION EXISTENCE DANS LA DB

    //PROVINCES
    //---------------------------------------------------------------------------------------------------
        const docRefProvince = await db.collection("provinces").where("province", "==", req.body.province).get();
        const provinces = [];

        docRefProvince.forEach((doc)=>{
            provinces.push(doc.data());
        })

        //Si oui, erreur
        if (provinces.length <= 0) {
            res.statusCode = 400;
            return res.json({message: "La province n'éxiste pas"});
        }
    //---------------------------------------------------------------------------------------------------

    //VILLE
    //---------------------------------------------------------------------------------------------------
        const docRefVille = await db.collection("villes").where("ville", "==", req.body.ville).get();
        const villes = [];

        docRefVille.forEach((doc)=>{
            villes.push(doc.data());
        })

        //Si oui, erreur
        if (villes.length == 0) {
            res.statusCode = 400;
            return res.json({message: "La ville n'éxiste pas"});
        }else if (villes[0].province != req.body.province){
            res.statusCode = 400;
            return res.json({message: "La ville n'est pas dans cette province"});
        }
    //---------------------------------------------------------------------------------------------------

    //PRIVILÈGES
    //---------------------------------------------------------------------------------------------------
        const docRefPrivilege = await db.collection("privileges").where("privilege", "==", req.body.privilege).get();
        const privileges = [];

        docRefPrivilege.forEach((doc)=>{
            privileges.push(doc.data());
        })

        //Si oui, erreur
        if (privileges.length == 0) {
            res.statusCode = 400;
            return res.json({message: "Le privilège n'éxiste pas"});
        }
    //---------------------------------------------------------------------------------------------------

    //COURRIEL  +   Création de l'utilisateur
    //---------------------------------------------------------------------------------------------------

        //Récupe info du body
        const {courriel, password} = req.body;

        // Vérifie si courriel existe 
        // Met le username en minuscule car les nom d'utilisateurs sont en minuscule dans la db. C'est fait comme ça car sinon, il croit que "volf" n'est pas égale à "Volf"
        const docRefUtilisateur = await db.collection("utilisateurs").where("courriel", "==", courriel).get();
        const utilisateurs = [];

        docRefUtilisateur.forEach((doc)=>{
            utilisateurs.push(doc.data());
        })

        //Si oui, erreur
        if (utilisateurs.length > 0 && utilisateurOriginal[0].courriel != courriel) {
            res.statusCode = 400;
            return res.json({message: "Le courriel est déjà utilisé"});
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
router.delete("/:id", authEmploye, async (req, res)=>{
    //params est tout les : dans ton url. Par exemple, :id, :user etc
    const idUtilisateur = req.params.id;
    const resultat = await db.collection("utilisateurs").doc(idUtilisateur).delete();

    res.json("La donnée a été supprimé");
});

//-------------------------------------------------------------------------------------

//CONNEXION
router.post("/connexion", async (req, res)=>{

    //Récupe info du body
    const {courriel, password} = req.body;

    //Vérifie si courriel existe
    const docRef = await db.collection("utilisateurs").where("courriel", "==", courriel).get();
    const utilisateurs = [];
    docRef.forEach((utilisateur)=>{
        utilisateurs.push({ id: utilisateur.id, ...utilisateur.data()});
    })

    //Si il n'y en a aucun, erreur
    if (utilisateurs.length == 0) {
        res.statusCode = 400;
        return res.json({message: "Le courriel n'existe pas"});
    }

    const utilisateurAValider = utilisateurs[0];
    const estValide = await bcrypt.compare(password, utilisateurAValider.password)

    //compare
    if (estValide === false){
        res.statusCode = 400;
        return res.json({message: "Mot de passe incorrecte"});
    }

    //Retourne les infos de l'utilisateur sans le mot de passe
    delete utilisateurs[0].mdp;

    //Données à passer au front-end sur l'utilisateur
    const donneesJeton = {
        id: utilisateurs[0].id,
        courriel: utilisateurs[0].courriel,
        privilege: utilisateurs[0].privilege
    }

    //Options d'expirations 1d = 1 day
    const option = {
        expiresIn: "1d"
    }
    
    //Génération du jeton
    const jeton = jwt.sign( donneesJeton, process.env.JWT_SECRET, option );
    
    res.statusCode = 200;
    res.json(jeton);

});

module.exports = router;