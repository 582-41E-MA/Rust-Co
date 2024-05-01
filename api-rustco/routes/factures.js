const express = require("express");
const router = express.Router();
const db = require("../config/db.js");
const bcrypt = require("bcrypt");
const authAdmin = require("../middlewares/authAdmin.js");
const authEmploye = require("../middlewares/authEmploye.js");
const { check, validationResult } = require("express-validator");

//-------------------------------------------------------------------------------------

/**
 * PREND TOUTE LES FACTURES
 * Cette route permet de récupérer la liste des factures
 * @route GET 
 */
router.get("/", async (req, res) => {

    try{

        const donneesCommandes = await db.collection("factures").get();
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
 * PREND UNE FACTURE AVEC SON ID
 * Cette route permet de récupérer une facture
 * @route GET
 */
router.get("/:id", async (req, res) => {
    try{
        const idFacture = req.params.id;

        const donneeRef = await db.collection("factures").doc(idFacture).get();

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
 * Cette route permet de créer une facture
 * @route POST
 */
router.post("/",
    [
        check("expedition").escape().trim().notEmpty().isString(),
        check("methode_de_paiement").escape().trim().notEmpty().isString(),
        check("total").escape().trim().notEmpty().isNumeric(),
        check("taxes").escape().trim().notEmpty().isString(),
        check("utilisateur").escape().trim().notEmpty().isString(),
        check("voitures").escape().trim().notEmpty().isArray()
    ],
    
    async (req, res) => {

        const validation = validationResult(req);

        if (validation.errors.length > 0) {
            res.statusCode = 400;
            return res.json({message: "Données non comforme"})
        }


        //VALIDATION EXISTENCE DANS LA DB

        //EXPÉDITIONS
        //---------------------------------------------------------------------------------------------------
        const docRefExpedition = await db.collection("expeditions").where("expedition", "==", req.body.expedition).get();
        const provinces = [];

        docRefExpedition.forEach((doc)=>{
            expeditions.push(doc.data());
        })

        //Si oui, erreur
        if (expeditions.length <= 0) {
            res.statusCode = 400;
            return res.json({message: "La méthode d'expédition n'éxiste pas"});
        }
        //---------------------------------------------------------------------------------------------------

        //MÉTHODES DE PAIEMENT
        //---------------------------------------------------------------------------------------------------
        const docRefMethode = await db.collection("methodes").where("methode", "==", req.body.methode_de_paiement).get();
        const methodes = [];

        docRefMethode.forEach((doc)=>{
            methodes.push(doc.data());
        })

        //Si oui, erreur
        if (methodes.length <= 0) {
            res.statusCode = 400;
            return res.json({message: "La méthode de paiement n'éxiste pas"});
        }
        //---------------------------------------------------------------------------------------------------

        //TAXES
        //---------------------------------------------------------------------------------------------------
        const docRefTaxes = await db.collection("taxes").where("taxe", "==", req.body.taxes).get();
        const taxes = [];

        docRefTaxes.forEach((doc)=>{
            taxes.push(doc.data());
        })

        //Si oui, erreur
        if (methodes.length <= 0) {
            res.statusCode = 400;
            return res.json({message: "La/Les taxe n'éxiste pas"});
        }
        //---------------------------------------------------------------------------------------------------

        const voitures = [];

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
            await db.collection("factures").add(createField)


            /**
             * Ajout des vraies données en modifiant le champ vide créer
             */
            .then(async function(docRef) {

                const facture = {};
                facture.id = docRef.id;
                facture.date = dateToday;
                facture.expedition = req.body.expedition;
                facture.methode_de_paiement = req.body.methode_de_paiement;
                facture.total = req.body.total;
                facture.taxes = req.body.taxes;
                facture.voitures = req.body.voitures
                facture.utilisateur = req.body.utilisateur;

                await db.collection("factures").doc(docRef.id).update(facture);

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
 * Cette route permet de modifier une facture
 * @route PUT
 */
router.put("/:id", authEmploye,
    [
        check("date").escape().trim().notEmpty().matches(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/),
        check("expedition").escape().trim().notEmpty().isString(),
        check("methode_de_paiement").escape().trim().notEmpty().isString(),
        check("total").escape().trim().notEmpty().isNumeric(),
        check("taxes").escape().trim().notEmpty().isString(),
        check("utilisateur").escape().trim().notEmpty().isString(),
        check("voitures").escape().trim().notEmpty().isArray()
    ],
    
    async (req, res) => {

        const validation = validationResult(req);       

        if (validation.errors.length > 0) {
            res.statusCode = 400;
            return res.json({message: "Données non comforme"})
        }


        //VALIDATION EXISTENCE DANS LA DB

        //EXPÉDITIONS
        //---------------------------------------------------------------------------------------------------
        const docRefExpedition = await db.collection("expeditions").where("expedition", "==", req.body.expedition).get();
        const provinces = [];

        docRefExpedition.forEach((doc)=>{
            expeditions.push(doc.data());
        })

        //Si oui, erreur
        if (expeditions.length <= 0) {
            res.statusCode = 400;
            return res.json({message: "La méthode d'expédition n'éxiste pas"});
        }
        //---------------------------------------------------------------------------------------------------

        //MÉTHODES DE PAIEMENT
        //---------------------------------------------------------------------------------------------------
        const docRefMethode = await db.collection("methodes").where("methode", "==", req.body.methode_de_paiement).get();
        const methodes = [];

        docRefMethode.forEach((doc)=>{
            methodes.push(doc.data());
        })

        //Si oui, erreur
        if (methodes.length <= 0) {
            res.statusCode = 400;
            return res.json({message: "La méthode de paiement n'éxiste pas"});
        }
        //---------------------------------------------------------------------------------------------------

        //TAXES
        //---------------------------------------------------------------------------------------------------
        const docRefTaxes = await db.collection("taxes").where("taxe", "==", req.body.taxes).get();
        const taxes = [];

        docRefTaxes.forEach((doc)=>{
            taxes.push(doc.data());
        })

        //Si oui, erreur
        if (methodes.length <= 0) {
            res.statusCode = 400;
            return res.json({message: "La/Les taxe n'éxiste pas"});
        }
        //---------------------------------------------------------------------------------------------------

        try{
            const idFacture = req.params.id;
            const facture = {};
            facture.id = docRef.id;
            facture.date = dateToday;
            facture.expedition = req.body.expedition;
            facture.methode_de_paiement = req.body.methode_de_paiement;
            facture.prix = req.body.prix;
            facture.taxes = req.body.taxes;
            facture.voitures = voitures
            facture.utilisateur = req.body.utilisateur;

            await db.collection("factures").doc(idFacture).update(facture);

            res.statusCode = 201;
            res.json({message: "La donnée a été modifiée"});
        } catch {
            res.statusCode = 500;
            res.json({message: "error"})
        }
    }
);

//-------------------------------------------------------------------------------------

/**
 * SUPPRIMER
 * Cette route permet de supprimer une facture
 * @route DEL
 */
router.delete("/:id", async (req, res)=>{
    //params est tout les : dans ton url. Par exemple, :id, :user etc
    const idCommande = req.params.id;
    const resultat = await db.collection("commandes").doc(idCommande).delete();

    res.json("La donnée a été supprimé");
});

//-------------------------------------------------------------------------------------

module.exports = router;