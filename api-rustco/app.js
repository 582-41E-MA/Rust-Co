const express = require("express");
const path = require("path");
const cors = require("cors");

//Configuration
require("dotenv").config();


// ===== INITIALISATION DU SERVEUR
const app = express();
const port = process.env.PORT || 5000;

app.set("views", path.join(__dirname, "views"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== MIDDLEWARES
// Ajoute un dossier public pour les fichiers statiques (css, js, images).
// Doit être défini avant les routes
app.use(express.static(path.join(__dirname, "public")));

// ===== ROUTES
// Toutes les routes non statiques doivent être définies après les middlewares
app.use("/api/voitures", require("./routes/voitures.js"));
app.use("/api/utilisateurs", require("./routes/utilisateurs.js"));

// ===== PAGE 404
// Si aucune route n'est trouvée, alors on retourne une erreur 404
app.use((req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 404;
    res.json({ message: "Impossible de trouver la ressouces demandée" });
});

// ===== DÉMARRAGE DU SERVEUR
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});