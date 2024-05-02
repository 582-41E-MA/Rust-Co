const express = require("express");
const path = require("path");
const cors = require("cors");
const db = require("./config/db.js");

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
app.use("/api/commandes", require("./routes/commandes.js"));
app.use("/api/factures", require("./routes/factures.js"));


// ===== STRIPE
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = require('stripe')('sk_test_51P9BJJHYV1SpE1i8Uxmh0mWK8UdrCo8paENPHP01oUEEvar1dcKA2a3n0GN8HJ7c0XS0xZkgEw60ntxBlz8zP8Ip00cYH9223B');
app.use(express.static('public'));

// const YOUR_DOMAIN = 'https://rustandco.onrender.com';
const YOUR_DOMAIN = 'http://localhost:5000';

/**
 * CECI CRÉÉ LE PRODUIT SUR STRIPE EN ACCUMULANT LES DONNÉES DES VOITURES DANS LA DB
 */
const calculateOrderAmount = async (items) => {
  console.log(items);
    let prixAvecProfit = 0
    let prixTotal = 0
    const orderId = Date.now();

    for (let i = 0, l = items.length; i < l; i++) {
      
        const donneeRef = await db.collection("voitures").doc(items[i].id).get();

        let prix = Number(donneeRef.data().prix_achete)

        let profit = Number(donneeRef.data().profit)

        prixAvecProfit = (Number(prix)*((100+Number(profit))/100))
 
        //On doit le refaire en Number car le code le remet en string ce qui va briser le prix
        prixTotal = Number(prixTotal) + Number(prixAvecProfit.toFixed(2));
        
        // prices.push(donneeRef.data().prix_achete)
    }


    const prixTotalUnit = (prixTotal * 100);

    const prixFinal = await stripe.prices.create({
        currency: 'cad',
        unit_amount: prixTotalUnit,
        product_data: {
            name: orderId
        },
    });

    
    // return prixFinal.id;
    return prixFinal.id;
  };

//Route pour checkout
app.post('/create-checkout-session', async (req, res) => {
 const userId = req.body.userLogged
 console.log(userId)
    const voitures = [] 

    for (let i = 0, l = req.body.voitures.length; i < l; i++) {
      
        voitures.push(req.body.voitures[i])
    }

    const order = await calculateOrderAmount(voitures)

    // const price = await stripe.prices.retrieve('price_1P9CZ9HYV1SpE1i8sSIB26WR');

  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    // amount: calculateOrderAmount(voitures),
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: order,
        quantity: 1,
      },
    ],
    mode: 'payment',
    return_url: `http://localhost:3000/succes`, //TODO: a modifier
  });

  res.send({clientSecret: session.client_secret});
});

app.get('/session-status', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email
  });
});

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
