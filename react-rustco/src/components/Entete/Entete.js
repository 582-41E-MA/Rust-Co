
import React, { useState } from "react";
import { useContext } from "react";
import "./Entete.css";
import { AppContext } from "../App/App";
import i18next from 'i18next';
import { t } from "i18next";
import { NavLink } from "react-router-dom";
import { Link } from 'react-router-dom';

function Entete(props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, toggleLang } = useContext(AppContext);
  const [menuOuvert, setMenuOuvert] = useState(false);

  const context = useContext(AppContext)
  
    const toggleMenu = () => {
      setMenuOuvert(!menuOuvert);
    };
  //icon lang
      let langIcon = lang == 'fr' ? 'uk' : 'france';
      let userId = context.logging.id;



  return (
    <header className="justify-between bg-black text-white_1">
      <div className="header-right flex items-center">
        <div className={`header-logo items-center hidden md:block`}>
          <a href="/" className="flex items-center">
            <img src="/logo/rustcologo-ps.png" alt="Rust&Co Logo" className="logo"/>
            <span className="text-2xl ml-2 logo-font">Rust&Co</span>
          </a>
        </div>

        <button onClick={toggleMenu} className="md:hidden">
          <img className='w-8' src="/icons/burger.png"></img>
        </button>

        <div className='header-main-menu ml-20 md:flex hidden'>
          <ul className="header-ul-main flex flex-col md:flex-row space-x-6">
            <li><a href="/liste-voitures" className="hover:text-orange-100">{t('autos_menu')}</a></li>
            <li><a href="/a-propos" className="hover:text-orange-100">{t('aPropos_menu')}</a></li>
          </ul>
        </div>

    { menuOuvert ? 
      <div className='header-main-menu-drop mt-40 bg-black z-30 p-8'>
        <ul className="header-ul-main flex flex-col md:flex-row">
          <li className="py-8"><a href="/liste-voitures" className="hover:text-orange-100">{t('autos_menu')}</a></li>
          <li className="py-6"><a href="/a-propos" className="hover:text-orange-100">{t('aPropos_menu')}</a></li>
        </ul>
      </div>
        :
      <div></div>
    }
      

      </div>

      

      <nav className="header-nav flex justify-between text-xs">
        <div className="header-left flex space-x-6">
          <ul className="header-ul-left flex space-x-6">
            
           {localStorage.getItem('logged-user') ?
            <li onClick={props.handleLogout} className="hover:text-orange-100 hover:cursor-pointer">logout</li>
           :
            <li><a href="/login" className="hover:text-orange-100">{t('connexion_menu')}</a></li>
            }

            {
            context.logging.privilege == 'admin' || context.logging.privilege == 'employe' ?
              <li><a href="/admin" className="hover:text-orange-100">Admin</a></li>
              :
              context.logging.privilege == 'client' ?
              <div className="flex space-x-6">
                <li><a href={`/client/${userId.trim()}`} className="hover:text-orange-100">Ma Page Client</a></li>
                <div className="cursor-pointer">
                  <a href='/panier' className="cursor-pointer">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V15H18.4433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16ZM6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23ZM18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z" fill="white"/>
                    </svg>
                  </a>
                </div>
              </div>
              : 
              <div></div>
            }
            
          </ul>
          
          <div onClick={() => {toggleLang(); i18next.changeLanguage(lang == 'fr' ? 'en' : 'fr')}} className='lang-btn w-6 hover:cursor-pointer'>
            <img src={`/icons/${langIcon}.png`} />
          </div>
        </div>
      </nav>
    </header>

  );
}

export default Entete;

