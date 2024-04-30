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
  Navigate
} from "react-router-dom";

const stripePromise = loadStripe("pk_test_51P9BJJHYV1SpE1i892IVzRPGHRldCT7LrZOCaaVMAPUlHjeJ8Z2QN01j7vRVgLnaMVVVQr21kziWi8xGE63CapNq00KhJnyjFr");


const Checkout = (props) => {



//   const Return = () => {
//     const [status, setStatus] = useState(null);
//     const [customerEmail, setCustomerEmail] = useState('');
  
//     useEffect(() => {
//       const queryString = window.location.search;
//       const urlParams = new URLSearchParams(queryString);
//       const sessionId = urlParams.get('session_id');
  
//       fetch(`http://localhost:5000/session-status?session_id=${sessionId}`)
//         .then((res) => res.json())
//         .then((data) => {
//           setStatus(data.status);
//           setCustomerEmail(data.customer_email);
//         });
//     }, []);
  
//     if (status === 'open') {
//       return (
//         <Navigate to="/checkout" />
//       )
//     }
  
//     if (status === 'complete') {
//       return (
//         <section id="success">
//           <p>
//             We appreciate your business! A confirmation email will be sent to {customerEmail}.
  
//             If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
//           </p>
//         </section>
//       )
//     }
//     return null;
// }





  const panier = props.items;
  console.log(JSON.stringify(panier))

    const fetchClientSecret = useCallback(() => {
      // Create a Checkout Session
      return fetch("https://rustandco.onrender.com/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(panier)
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