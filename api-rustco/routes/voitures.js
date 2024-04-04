const express = require("express");
const router = express.Router();
const db = require("../config/db.js");
const { check, validationResult } = require("express-validator");


// router.get("/initialize", async (req, res) => {
//     const donneesTest = require("../data/mockVoitures.js");
//     donneesTest.forEach(async (film) => {
//         console.log(film)
//         await db.collection("voitures").add(film);
//     });

//     res.statusCode = 200;
//     res.json({ message: "Données initialisées" });
// });

/**
 * Cette route permet de récupérer la liste des films
 * @route GET /films
 */
router.get("/", async (req, res) => {

    try{

        const donneesVoitures = await db.collection("voitures").get();
        const donneesFinale = [];

        donneesVoitures.forEach((doc)=>{
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


/**
 * Cette route permet de récupérer une voiture
 * @route GET /films/{id}
 */
router.get("/:id", async (req, res) => {
    try{
        const idVoiture = req.params.id;

        const donneeRef = await db.collection("voitures").doc(idVoiture).get();

        const donnee = donneeRef.data();

        if (donnee) {
            res.statusCode = 200;
            res.json(donnee);
        } else {
            res.statusCode = 500;
            res.json({ message: "Voiture non trouvé" });
        }

    }catch (error){
        res.statusCode = 500;
        res.json({ message: "Vous êtes un pas bon, film non trouvé" });
    }
    
});


/**
 * Cette route permet de créer un film
 * @route POST /films
 */
router.post("/",
    [
        check("marque").escape().trim().notEmpty().isString(),
        check("annee").escape().trim().notEmpty().isNumeric(),
        check("modele").escape().trim().notEmpty().isString(),
        check("prix_achete").escape().trim().notEmpty().isString(),
        check("description").escape().trim().notEmpty().isString(),
        check("image").escape().trim().notEmpty().isString(),
        check("annee").escape().trim().notEmpty().isString(),
    ],
    
    async (req, res) => {

        const validation = validationResult(req);
        const donneesConditions = await db.collection("conditions").get();
        const tableauConditions = [];

        donneesConditions.forEach((condition)=>{
            tableauConditions.push(condition.data());
        })

        if (validation.errors.length > 0) {
            res.statusCode = 400;
            return res.json({message: "Données non comforme"})
        }

        try{

            //Créer un champ de valeur dans firebase. (Ceci éxiste pour créer un champ avec un ID et récupérer son id pour la vrai valeur)
            let createField = {};
            await db.collection("voitures").add(createField)

            /**
             * Ajout des vraies données en modifiant le champ vide créer
             */
            .then(async function(docRef) {

                const voiture = {};
                voiture.id = docRef.id;
                voiture.marque = req.body.marque;
                voiture.annee = req.body.annee;
                voiture.modele = req.body.modele;
                voiture.prix_achete = req.body.prix_achete;
                voiture.description = req.body.description;
                voiture.image = req.body.image;
                voiture.Conditions_id = req.body.Conditions_id;

                await db.collection("voitures").doc(docRef.id).update(voiture);

            })
            .catch(function(error) {
                res.statusCode = 500;
                res.json({message: "error"})
            });
        
            res.statusCode = 201;
            res.json({message: "La donnée a été ajoutée"});
        } catch {
            res.statusCode = 500;
            res.json({message: "error"})
        }
    }
);

module.exports = router;