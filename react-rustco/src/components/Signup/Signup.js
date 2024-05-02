import { useState, useEffect } from "react";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { t } from "i18next";
import Entete from "../Entete/Entete";
import './Signup.css';


function Signup() {

  return (
    <h1 className="text-xl">{t('inscription_message')}</h1>
  );
}

export default Signup;
