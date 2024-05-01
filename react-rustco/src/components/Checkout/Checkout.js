import React, { useCallback, useState, useEffect } from "react";
import {loadStripe} from '@stripe/stripe-js';
import { useStripe, useElements, CardElement, Elements } from "@stripe/react-stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation
} from "react-router-dom";

const stripePromise = loadStripe("pk_test_51P9BJJHYV1SpE1i892IVzRPGHRldCT7LrZOCaaVMAPUlHjeJ8Z2QN01j7vRVgLnaMVVVQr21kziWi8xGE63CapNq00KhJnyjFr");


const Checkout = (props) => {

  const [user, setUser] = useState({});
  const [error, setError] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const panier = props.items;
  const id = props.logging.id


// trucs de paiement dans le nouveau local storage
const urlUserInitial = `https://rustandco.onrender.com/api/utilisateurs/${id}`;

    useEffect(() => {
        async function userData(){
            try {
                const response = await fetch(urlUserInitial);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUser(data);
                setIsLoading(false);
            } catch (error) {
                setError("erreur du fetch");
                setIsLoading(false);
            }
        };
        userData();
    }, [id]);


    const infosPaiement = {
      taxes: user.province,
      expedition: location.state.expedition,
      methodeDePaiement: location.state.methodeDePaiement

    }





const infosStorage = localStorage.setItem('infosPaiement', JSON.stringify(infosPaiement));



    const fetchClientSecret = useCallback(() => {
      // Create a Checkout Session
      return fetch("http://localhost:5000/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({voitures: panier, taxes: user.province}) 
      })
        .then((res) => res.json())
        .then((data) => data.clientSecret);
    }, []);


    const options = {fetchClientSecret};
    console.log(stripePromise);

    return (
      <div id="checkout">
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={options}
        >
    
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    )
  }



export default Checkout;