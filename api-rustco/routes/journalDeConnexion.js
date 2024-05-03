const express = require("express");
const router = express.Router();
const db = require("../config/db.js");
const bcrypt = require("bcrypt");
const authAdmin = require("../middlewares/authAdmin.js");
const authEmploye = require("../middlewares/authEmploye.js");
const { check, validationResult } = require("express-validator");

/**
 * PREND TOUTE LES COMMANDES
 * Cette route permet de récupérer la liste des commandes
 * @route GET 
 */
router.get("/", async (req, res) => {

    try{

        const donneesJournalDeConnexion = await db.collection("journal_de_connexion").get();
        const donneesFinale = [];

        donneesJournalDeConnexion.forEach((doc)=>{
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
 * CRÉATION
 * Cette route permet de créer un film
 * @route POST /films
 */
//TODO:Validation de Conditions_id
router.post("/",
    [
        check("addressIP").escape().trim().notEmpty().isString(),
        check("userId").escape().trim().notEmpty().isString()
    ],
    
    async (req, res) => {

        const validation = validationResult(req);

        if (validation.errors.length > 0) {
            res.statusCode = 400;
            return res.json({message: "Données non comforme"})
        }

        //Génère date d'aujourd'hui
        const dateMilisecondes = Date.now()

        const date_time = new Date(dateMilisecondes);

        const seconds = date_time.getSeconds();
        const minutes = date_time.getMinutes();
        const hours = date_time.getHours();
        const date = date_time.getDate();
        const month = date_time.getMonth() + 1;
        const year = date_time.getFullYear();
        
        const dateToday = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds

        try{

            //Créer un champ de valeur dans firebase. (Ceci éxiste pour créer un champ avec un ID et récupérer son id pour la vrai valeur)
            let createField = {};
            await db.collection("journal_de_connexion").add(createField)

            /**
             * Ajout des vraies données en modifiant le champ vide créer
             */
            .then(async function(docRef) {

                const journalDeConnexion = {};
                journalDeConnexion.id = docRef.id;
                journalDeConnexion.utilisateur = req.body.userId;
                journalDeConnexion.addressIP = req.body.adresseIP;
                journalDeConnexion.date = dateToday;

                await db.collection("journal_de_connexion").doc(docRef.id).update(journalDeConnexion);

            })        

            res.statusCode = 201;
            res.json({message: "La donnée a été ajoutée"});
        } catch {
            res.statusCode = 500;
            res.json({message: "error"})
        }


    }
);

module.exports = router;