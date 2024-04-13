import { useState, useEffect } from "react";
import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Entete from "../Entete/Entete";
import './Login.css';
import { t } from 'i18next'


function Login(props) {


  return (
    <div>
      <h1 className="text-xl font-bold">LOGIN</h1>
      <form onSubmit={props.handleLogin} className="form-login">
        <input type="text" name="courriel" placeholder="Usager"></input>
        <input type="password" name="mdp" placeholder="mot de passe"></input>
        <button className="custom-button">Connexion</button>
      </form>
      <p>
        Vous n'avez pas encore de compte? créez en un <a className="text-blue-500 font-bold text-xl" href="/create-user">ICI</a>.
      </p>
    </div>
  );
}

export default Login;
