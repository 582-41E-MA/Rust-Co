const express = require("express");
const router = express.Router();
const db = require("../config/db.js");


// ===== STRIPE
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = require('stripe')('sk_test_51P9BJJHYV1SpE1i8Uxmh0mWK8UdrCo8paENPHP01oUEEvar1dcKA2a3n0GN8HJ7c0XS0xZkgEw60ntxBlz8zP8Ip00cYH9223B');

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
  
        prixAvecProfit = (prix*((100+profit)/100))
   
        //On doit le refaire en Number car le code le remet en string ce qui va briser le prix
        prixTotal = Number(prixTotal + prixAvecProfit.toFixed(2));
          
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



router.get("/create-checkout-session", async (req, res) => {

    const voitures = [] 

    for (let i = 0, l = req.body.length; i < l; i++) {
        voitures.push(req.body[i])
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



router.get('/session-status', async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  
    res.send({
      status: session.status,
      customer_email: session.customer_details.email
    });
});

module.exports = router;