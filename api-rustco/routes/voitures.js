const express = require("express");
const router = express.Router();
const db = require("../config/db.js");
const authEmploye = require("../middlewares/authEmploye.js");
const { check, validationResult } = require("express-validator");

//TODO: Authentification

router.get("/initialize", async (req, res) => {
     const donneesTest = require("../data/mockVoitures.js");
     donneesTest.forEach(async (film) => {
         console.log(film)
         await db.collection("voitures").add(film);
     });

    res.statusCode = 200;
     res.json({ message: "Données initialisées" });
});


/**
 * PREND TOUTE LES VOITURES
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
 * PREND UNE VOITURE AVEC SON ID
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
        res.json({ message: "Voiture non trouvé" });
    }
    
});


/**
 * CRÉATION
 * Cette route permet de créer un film
 * @route POST /films
 */
//TODO:Validation de Conditions_id
router.post("/",
    [
        //TODO: Refait la validation
        check("marque").escape().trim().notEmpty().isString(),
        check("annee").escape().trim().notEmpty().matches(/^\d{4}$/),
        check("modele").escape().trim().notEmpty().isString(),
        check("prix_achete").escape().trim().notEmpty().matches(/^\d+(,\d{1,2})?$/),
        check("description_en").escape().trim().notEmpty().isString(),
        check("description_fr").escape().trim().notEmpty().isString(),
        check("image").escape().trim().notEmpty().isString(),
    ],
    
    async (req, res) => {

        const validation = validationResult(req);
        const donneesConditions = await db.collection("conditions").get();
        const tableauConditions = [];

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
                voiture.profit = req.body.profit;
                voiture.description_en = req.body.description_en;
                voiture.description_fr = req.body.description_fr;
                voiture.image = req.body.image;
                voiture.condition = req.body.condition;
                voiture.reserve = "false";

                await db.collection("voitures").doc(docRef.id).update(voiture);

            })        

            res.statusCode = 201;
            res.json({message: "La donnée a été ajoutée"});
        } catch {
            res.statusCode = 500;
            res.json({message: "error"})
        }
    }
);


//MODIFICATION
//TODO:Validation de Conditions_id
router.put("/:id", [
    
        //TODO: Refait la validation
        // check("marque").escape().trim().notEmpty().isString(),
        // check("annee").escape().trim().notEmpty().matches(/^\d{4}$/),
        // check("modele").escape().trim().notEmpty().isString(),
        // check("prix_achete").escape().trim().notEmpty().matches(/^\d+(,\d{1,2})?$/),
        // check("description_en").escape().trim().notEmpty().isString(),
        // check("description_fr").escape().trim().notEmpty().isString(),
        // check("image").escape().trim().notEmpty().isString(),

], async (req, res)=>{

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

    const id = req.params.id;
    const resultat = await db.collection("voitures").doc(id).delete();

    const voiture = {};
    voiture.id = id;
    voiture.marque = req.body.marque;
    voiture.annee = req.body.annee;
    voiture.modele = req.body.modele;
    voiture.prix_achete = req.body.prix_achete;
    voiture.profit = req.body.profit;
    voiture.description_en = req.body.description_en;
    voiture.description_fr = req.body.description_fr;
    voiture.image = req.body.image;
    voiture.condition = req.body.condition;
    voiture.reserve = resultat.reserve;

    await db.collection("voitures").doc(id).update(voiture);
    
    res.status = 200;
    res.json({message: "Les données ont été modifiées"})
});


//SUPPRIMER
router.delete("/:id", authEmploye, async (req, res)=>{
    //params est tout les : dans ton url. Par exemple, :id, :user etc
    const id = req.params.id;
    const resultat = await db.collection("voitures").doc(id).delete();

    res.json("La donnée a été supprimé");
});


//TOGGLE RESERVATION
router.post("/reservation", [
    check("voitures").notEmpty().isArray()
], async (req, res)=>{

const validation = validationResult(req);

if (validation.errors.length > 0) {
    res.statusCode = 400;
    return res.json({message: "Données non comforme"})
}

for (let i = 0, l = req.body.voitures.length; i < l; i++) {

    let idVoiture = req.body.voitures[i].id;
    let voitureRef = await db.collection("voitures").doc(idVoiture).get();
    let reservation = ""

    if (voitureRef.data().reserve == true) {
        reservation = false
    } else {
        reservation = true
    }

    console.log(voitureRef.data())

    const voiture = {};
    voiture.id = idVoiture;
    voiture.marque = voitureRef.data().marque;
    voiture.annee = voitureRef.data().annee;
    voiture.modele = voitureRef.data().modele;
    voiture.prix_achete = voitureRef.data().prix_achete;
    voiture.profit = voitureRef.data().profit;
    voiture.description_en = voitureRef.data().description_en;
    voiture.description_fr = voitureRef.data().description_fr;
    voiture.image = voitureRef.data().image;
    voiture.condition = voitureRef.data().condition;
    voiture.reserve = reservation

    await db.collection("voitures").doc(idVoiture).update(voiture);
}

res.status = 200;
res.json({message: "Les données ont été modifiées"})
});

module.exports = router;
