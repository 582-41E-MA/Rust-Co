import { NavLink } from "react-router-dom";
import "./Entete.css";
import React, { useState } from "react";
//import { useContext } from "react";
//import { AppContext } from "../App/App";

function Entete(props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <nav className="header-nav flex">
        <div className="header-right flex ">
          <div className="header-brandname">
            <div className="header-logo">
              <img src="/logo/rustcologo-ps.png" />
            </div>
            <a href="#">Rust&Co</a>
          </div>
          <div className="header-main-menu">
            <ul className="header-ul-main flex space-x-4">
              <li><a href="/home">Home</a></li>
              <li><a href="/cars">Cars</a></li>
            </ul>
          </div>
        </div>
        <div className="header-left">
          <ul className="header-ul-left flex space-x-4">
            <li><a href="/login">Login</a></li>
            <li><a href="/create-account">Create Account</a></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Entete;
