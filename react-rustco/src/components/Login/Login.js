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


function Login() {


  return (

   <h1 className="text-xl">This is the LOGIN page. (there will be a create account link here if inexistant user.)</h1>


  );
}

export default Login;
