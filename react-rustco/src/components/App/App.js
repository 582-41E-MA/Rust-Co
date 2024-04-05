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
import Footer from "../Footer/Footer";
import Home from "../Home/Home";
import './App.css';


function App() {


  return (
<div>
  <Entete />
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
    
    </Routes>
  </Router>
  <Footer />
</div>

  );
}

export default App;
