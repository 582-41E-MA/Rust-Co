import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import { useContext } from "react";
import "./Entete.css";
import { AppContext } from "../App/App";
import i18next from 'i18next';
import { t } from "i18next";


function Entete(props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, toggleLang } = useContext(AppContext);
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [menuW, setMenuW] = useState(window.innerWidth);



  
  
    const toggleMenu = () => {
      setMenuOpen(!menuOuvert);
    };
  //icon
      let langIcon = lang == 'fr' ? 'uk' : 'france';

  return (
    <header className="justify-between">
      <div className="header-right flex items-center">
        <div className={`header-logo ${menuW ? 'flex' : 'hidden'} items-center`}>
          <a href="/" className="flex items-center">
            <img src="/logo/rustcologo-ps.png" alt="Rust&Co Logo" className="logo"/>
            <span className="text-2xl ml-2 logo-font">Rust&Co</span>
          </a>
        </div>

        <button onClick={toggleMenu} className="md:hidden">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        <div className={`header-main-menu ml-40 md:flex space-x-8 ${menuOuvert ? 'flex' : 'hidden'}`}>
          <ul className="header-ul-main flex flex-col md:flex-row">
            <li><a href="/liste-voitures" className="hover:text-orange-100">{t('autos_menu')}</a></li>
            <li><a href="/a-propos" className="hover:text-orange-100">{t('aPropos_menu')}</a></li>
          </ul>
        </div>

      </div>

      <nav className="header-nav flex justify-between">

        <div className="header-left flex space-x-8">
          <ul className="header-ul-left flex space-x-8">
            <li><a href="/login" className="hover:text-orange-100">{t('connexion_menu')}</a></li>
            <li><a href="/admin" className="hover:text-orange-100">Admin</a></li>
          </ul>
          {/* <LangBtn lang={lang}/> */}
          <div onClick={() => {toggleLang(); i18next.changeLanguage(lang == 'fr' ? 'en' : 'fr')}} className='lang-btn w-6 hover:cursor-pointer'>
            <img src={`/icons/${langIcon}.png`} />
          </div>
        </div>

      </nav>
    </header>

  );
}

export default Entete;
