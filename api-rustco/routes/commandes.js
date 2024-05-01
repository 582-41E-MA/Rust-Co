const express = require("express");
const router = express.Router();
const db = require("../config/db.js");
const bcrypt = require("bcrypt");
const authAdmin = require("../middlewares/authAdmin.js");
const authEmploye = require("../middlewares/authEmploye.js");
const { check, validationResult } = require("express-validator");

// router.get("/initialize", async (req, res) => {
//     const donneesTest = require("../data/mockUtilisateurs.js");
//     donneesTest.forEach(async (utilisateur) => {
//         console.log(utilisateur)
//         await db.collection("utilisateurs").add(utilisateur);
//     });

//     res.statusCode = 200;
//     res.json({ message: "Données initialisées" });
// });

//-------------------------------------------------------------------------------------

/**
 * PREND TOUTE LES COMMANDES
 * Cette route permet de récupérer la liste des commandes
 * @route GET 
 */
router.get("/", async (req, res) => {

    try{

        const donneesCommandes = await db.collection("commandes").get();
        const donneesFinale = [];

        donneesCommandes.forEach((doc)=>{
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
 * PREND UNE COMMANDE AVEC SON ID
 * Cette route permet de récupérer une commande
 * @route GET
 */
router.get("/:id", async (req, res) => {
    try{
        const idCommande = req.params.id;

        const donneeRef = await db.collection("commandes").doc(idCommande).get();

        const donnee = donneeRef.data();

        if (donnee) {
            res.statusCode = 200;
            res.json(donnee);
        } else {
            res.statusCode = 500;
            res.json({ message: "Commande non trouvé" });
        }

    }catch (error){
        res.statusCode = 500;
        res.json({ message: "Commande non trouvé" });
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
        //TODO: Refait la validation
        // check("marque").escape().trim().notEmpty().isString(),
        // check("annee").escape().trim().notEmpty().isNumeric(),
        // check("modele").escape().trim().notEmpty().isString(),
        // check("prix_achete").escape().trim().notEmpty().isString(),
        // check("description_en").escape().trim().notEmpty().isString(),
        // check("description_fr").escape().trim().notEmpty().isString(),
        // check("image").escape().trim().notEmpty().isString(),
    ],
    
    async (req, res) => {

        const validation = validationResult(req);


        /**
         * Vérification de la condition 
         * TODO: Finir la validation
         */
        // validationConditions.forEach((condition)=>{
        //     // tableauConditions.push(condition.data());
        // })
        

        if (validation.errors.length > 0) {
            res.statusCode = 400;
            return res.json({message: "Données non comforme"})
        }

        // const voitures = [];

        // for (let i = 0, l = req.body.voitures.length; i < l; i++) {
        //     voitures.push(req.body.voitures[i]);
        // }

        // for (let i = 0, l = req.body.voitures.length; i < l; i++) {

        //     const donneeRef = await db.collection("voitures").doc(req.body.voitures[i].id).get();

        //     console.log(req.body.voitures[i].id)

        //     donneeRef.forEach((doc)=>{
        //         voitures.push(doc.data());
        //     })

        // }



        //Génère date d'aujourd'hui
        const dateMilisecondes = Date.now()

        const date_time = new Date(dateMilisecondes);
        const date = date_time.getDate();
        const month = date_time.getMonth() + 1;
        const year = date_time.getFullYear();

        const dateToday = year + "-" + month + "-" + date

        try{

            //Créer un champ de valeur dans firebase. (Ceci éxiste pour créer un champ avec un ID et récupérer son id pour la vrai valeur)
            let createField = {};
            await db.collection("commandes").add(createField)


            /**
             * Ajout des vraies données en modifiant le champ vide créer
             */
            .then(async function(docRef) {

                const commande = {};
                commande.id = docRef.id;
                commande.date = dateToday;
                commande.expedition = req.body.expedition;
                commande.methode_de_paiement = req.body.methode_de_paiement;
                commande.prix = req.body.prix;
                commande.status = req.body.status;
                commande.taxes = req.body.taxes;
                commande.voitures = req.body.voitures
                commande.utilisateur = req.body.utilisateur;

                await db.collection("commandes").doc(docRef.id).update(commande);

            })        

            res.statusCode = 201;
            res.json({message: "La donnée a été ajoutée"});
        } catch {
            res.statusCode = 500;
            res.json({message: "error"})
        }
    }
);

//-------------------------------------------------------------------------------------

/**
 * MODIFICATION
 * Cette route permet de modifier un utilisateur
 * @route POST 
 */
router.put("/:id", authEmploye,
    [
        //TODO: Fait la validation
    ],
    
    async (req, res) => {

        //const validation = validationResult(req);       

        // if (validation.errors.length > 0) {
        //     res.statusCode = 400;
        //     return res.json({message: "Données non comforme"})
        // }

        try{
            const idCommande = req.params.id;
            const commande = {};
            commande.id = docRef.id;
            commande.date = req.body.date;
            commande.expedition = req.body.expedition;
            commande.methode_de_paiement = req.body.methode_de_paiement;
            commande.prix = req.body.prix;
            commande.status = req.body.status;
            commande.taxes = req.body.taxes;
            commande.utilisateur = req.body.utilisateur;

            await db.collection("commandes").doc(idCommande).update(commande);

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
    const idCommande = req.params.id;
    const resultat = await db.collection("commandes").doc(idCommande).delete();

    res.json("La donnée a été supprimé");
});

//-------------------------------------------------------------------------------------


module.exports = router;