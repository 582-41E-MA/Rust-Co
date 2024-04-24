import { createContext, useState, useEffect } from "react";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation
} from "react-router-dom";
import Entete from "../Entete/Entete";
import Footer from "../Footer/Footer";
import Accueil from "../Accueil/Accueil";
import ListeVoitures from "../ListeVoitures/ListeVoitures";
import Voiture from "../Voiture/Voiture";
import Termes from "../Termes/Termes";
import Politique from "../Politique/Politique";
import APropos from "../APropos/APropos";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import CreateUser from "../CreateUser/CreateUser";
import Admin from "../Admin/Admin";
import CreateVoiture from "../CreateVoiture/CreateVoiture";
import UpdateVoiture from "../UpdateVoiture/UpdateVoiture";
import UpdateUser from "../UpdateUser/UpdateUser";
import Client from "../Client/Client";
import Panier from "../Panier/Panier";
import './App.css';

import { useTranslation} from 'react-i18next';
import { jwtDecode } from "jwt-decode";

export const AppContext = React.createContext();


function App() {

    //////// LOGGING STUFF ///////////////
  //const navigate = useNavigate();
  const [logging, setLogging] = useState({ estLog: false, utilisateur: "", privilege : '', id: '' });
  const [userId, setUserId] = useState(''); 
  


  /*de code jwt */
  function parseJwt (token) {
    if(localStorage.getItem('logged-user')){
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
      }
    }

  const { t } = useTranslation();
  

  ///// LANGUAGE STUFF Custom/////
  const [lang, setLang] = useState(localStorage.getItem('siteLang') || 'fr'); // Default lang
  const toggleLang = () => {
    setLang((current) => (current == 'fr' ? 'en' : 'fr'));
  }; 
  useEffect(() => {
    localStorage.setItem('siteLang', lang);
    document.documentElement.lang = lang;
  }, [lang]); 
  document.documentElement.lang = lang;
  ////////////////////////////


  useEffect(() =>{
    if(localStorage.getItem('logged-user')){
    const token = localStorage.getItem('logged-user');
    const parseTok = parseJwt(token)
    setLogging({ estLog: true, utilisateur: parseTok.courriel, privilege : parseTok.privilege, id: parseTok.id })
    }
  }, [])
 


  async function login(e) {

    e.preventDefault();
    const form = e.target;
    const body = {
      courriel: form.courriel.value,
      password: form.mdp.value,

    };
    const data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    //                                      METTRE PORT DE NODE ICI!!!!!!!!!!
    const reponse = await fetch(
      "https://rustandco.onrender.com/api/utilisateurs/connexion",
      data
    );
   
    const token = await reponse.json(); // je recois un reponse, deconstruit (async), ensuit metre dans var reponse
    
    const privilegeTest = localStorage.getItem('logged-user') ? parseJwt(token).privilege : '';
    const idTest = localStorage.getItem('logged-user') ? parseJwt(token).id : '';


    if (reponse.status == 200) {
      //storer le jeton dans le localstorge
      localStorage.setItem("logged-user", token);
      setLogging({ estLog: true, utilisateur: body.courriel, privilege: privilegeTest, id: idTest});
      document.location.href = '/';
    }
    form.reset(); //pour vider le champ

  }



  function jetonValide() {
    try {
      const token = localStorage.getItem("logged-user");
      const decode = jwtDecode(token);
      if (Date.now() < decode.exp * 1000) {
        return true;
      } else {
        localStorage.removeItem("logged-user");
      }
    } catch (erreur) {}
  }


  
  function logout() {
    setLogging({
      estLog: false,
      utilisateur: "",
      privilege: '',
      id: ''
    });
    localStorage.removeItem("logged-user");
    localStorage.removeItem("panier");
    //document.location.href = '/';
  }


  return (
    <AppContext.Provider value={{ lang, toggleLang, logging }}>
   
      <div className="flex flex-col min-h-screen">
        <Entete handleLogout={logout} logging={logging} />
        <main className="flex-grow min-h-screen main max-w-6xl mx-auto p-4"> 
  
          <Router>
            <Routes >
              <Route path="/" element={<Accueil />} />
              <Route path="/liste-voitures" element={<ListeVoitures />} />
              <Route path="/a-propos" element={<APropos />} />
              <Route path="/login" element={<Login handleLogin={login} logging={logging} />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/termes-et-conditions" element={<Termes />} />
              <Route path="/politique" element={<Politique />} />
              <Route path="/Voiture/:id" element={<Voiture />} />
              <Route path="/create-user" element={<CreateUser />} />
              <Route path="/create-voiture" element={<CreateVoiture />} />
              <Route path="/update-voiture/:id" element={<UpdateVoiture />} />
              <Route path="/update-user/:id" element={<UpdateUser />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/client/:id" element={<Client logging={logging}/>} />
              <Route path="/panier" element={<Panier />} />
            </Routes>
          </Router>
        </main>
        <Footer className="mt-auto" />
        
      </div>
    </AppContext.Provider>
  );
}



export default App;



// import React, { useCallback, useState, useEffect } from "react";
// import {loadStripe} from '@stripe/stripe-js';
// import {
//   EmbeddedCheckoutProvider,
//   EmbeddedCheckout
// } from '@stripe/react-stripe-js';
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate
// } from "react-router-dom";

// // Make sure to call `loadStripe` outside of a component’s render to avoid
// // recreating the `Stripe` object on every render.
// // This is a public sample test API key.
// // Don’t submit any personally identifiable information in requests made with this key.
// // Sign in to see your own test API key embedded in code samples.
// const stripePromise = loadStripe("pk_test_A7jK4iCYHL045qgjjfzAfPxu");

// const CheckoutForm = () => {
//   const fetchClientSecret = useCallback(() => {
//     // Create a Checkout Session
//     return fetch("/create-checkout-session", {
//       method: "POST",
//     })
//       .then((res) => res.json())
//       .then((data) => data.clientSecret);
//   }, []);

//   const options = {fetchClientSecret};

//   return (
//     <div id="checkout">
//       <EmbeddedCheckoutProvider
//         stripe={stripePromise}
//         options={options}
//       >
//         <EmbeddedCheckout />
//       </EmbeddedCheckoutProvider>
//     </div>
//   )
// }

// const Return = () => {
//   const [status, setStatus] = useState(null);
//   const [customerEmail, setCustomerEmail] = useState('');

//   useEffect(() => {
//     const queryString = window.location.search;
//     const urlParams = new URLSearchParams(queryString);
//     const sessionId = urlParams.get('session_id');

//     fetch(`/session-status?session_id=${sessionId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setStatus(data.status);
//         setCustomerEmail(data.customer_email);
//       });
//   }, []);

//   if (status === 'open') {
//     return (
//       <Navigate to="/checkout" />
//     )
//   }

//   if (status === 'complete') {
//     return (
//       <section id="success">
//         <p>
//           We appreciate your business! A confirmation email will be sent to {customerEmail}.

//           If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
//         </p>
//       </section>
//     )
//   }

//   return null;
// }

// const App = () => {
//   return (
//     <div className="App">
//       <Router>
//         <Routes>
//           <Route path="/checkout" element={<CheckoutForm />} />
//           <Route path="/return" element={<Return />} />
//         </Routes>
//       </Router>
//     </div>
//   )
// }

// export default App;