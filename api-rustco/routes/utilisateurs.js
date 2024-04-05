const express = require("express");
const router = express.Router();
const db = require("../config/db.js");
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


module.exports = router;