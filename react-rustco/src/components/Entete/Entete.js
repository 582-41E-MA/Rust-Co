
import React, { useState, useEffect } from "react";
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

  const [hoverIcon, setHoverIcon] = useState(false);
  const hoverColor = ""

  const context = useContext(AppContext)
  
    const toggleMenu = () => {
      setMenuOuvert(!menuOuvert);
    };
   
  //icon lang
      let langIcon = lang == 'fr' ? 'uk' : 'france';
      let userId = context.logging.id;


    /*dropdown stuff*/
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
      useEffect(() => {
        // Function to update and log screen width
        const handleResize = () => {
          setScreenWidth(window.innerWidth);
          if(screenWidth>768){setMenuOuvert(false);} 
        };
        window.addEventListener('resize', handleResize);
      }, []);




  return (
    <header>
      <div className="header justify-between bg-black text-white_1 relative z-20">
      <div className="header-right flex items-center">
        <div className={`header-logo items-center hidden md:block`}>
          <a href="/" className="flex items-center">
            <img src="/logo/rustcologo-ps.png" alt="Rust&Co Logo" className="logo"/>
            <span className="text-2xl ml-2 logo-font">Rust<span className="text-rust_2">&</span>Co</span>
          </a>
        </div>

        <button onClick={toggleMenu} className="md:hidden">
          <img className='w-8' src="/icons/burger.png"></img>
        </button>

        <div className={`header-main-menu ${menuOuvert ? 'open' : '' }ml-20 md:flex hidden`}>
          <ul className="header-ul-main flex flex-col md:flex-row space-x-6">
            <li><a href="/liste-voitures" className="hover:text-rust_2">{t('autos_menu')}</a></li>
            <li><a href="/a-propos" className="hover:text-rust_2">{t('aPropos_menu')}</a></li>
          </ul>
        </div>

     
      </div>

      <nav className="header-nav flex justify-between text-s">
        <div className="header-left flex space-x-6 items-center">
          <ul className="header-ul-left flex space-x-6">
            
           {localStorage.getItem('logged-user') ?
            <li onClick={props.handleLogout} className="hover:cursor-pointer">
              <img className='logout_img'src="data:image/svg+xml,%3Csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' stroke-width='1.5' width='24' height='24' color='%23ECEEF1'%3E%3Cdefs%3E%3Cstyle%3E.cls-63ce7424ea57ea6c8380055a-1%7Bfill:none%3Bstroke:currentColor%3Bstroke-miterlimit:10%3B%7D%3C/style%3E%3C/defs%3E%3Cpolyline class='cls-63ce7424ea57ea6c8380055a-1' points='13.89 15.82 13.89 22.5 1.48 22.5 1.48 1.5 13.89 1.5 13.89 8.18'%3E%3C/polyline%3E%3Cline class='cls-63ce7424ea57ea6c8380055a-1' x1='8.16' y1='12' x2='21.52' y2='12'%3E%3C/line%3E%3Cpolyline class='cls-63ce7424ea57ea6c8380055a-1' points='16.75 16.77 21.52 12 16.75 7.23'%3E%3C/polyline%3E%3C/svg%3E"alt="logout" />
            </li>
           :
          <li className="logout_img">
            <a href="/login" className="hover:cursor-pointer">
            <img src="data:image/svg+xml,%3Csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' stroke-width='1.5' width='24' height='24' color='%23ECEEF1'%3E%3Cdefs%3E%3Cstyle%3E.cls-63ce7424ea57ea6c8380055a-1%7Bfill:none%3Bstroke:currentColor%3Bstroke-miterlimit:10%3Btransition: stroke 0.3s ease-out%3B%7D%3C/style%3E%3C/defs%3E%3Cpolyline class='cls-63ce7424ea57ea6c8380055a-1' points='13.89 15.82 13.89 22.5 1.48 22.5 1.48 1.5 13.89 1.5 13.89 8.18'%3E%3C/polyline%3E%3Cline class='cls-63ce7424ea57ea6c8380055a-1' x1='8.16' y1='12' x2='21.52' y2='12'%3E%3C/line%3E%3Cpolyline class='cls-63ce7424ea57ea6c8380055a-1' points='16.75 16.77 21.52 12 16.75 7.23'%3E%3C/polyline%3E%3C/svg%3E" alt="logout" />
            </a>
          </li>
            }

            {
            context.logging.privilege == 'admin' || context.logging.privilege == 'employe' ?

              <li>
                <a href="/admin" className="hover:cursor-pointer">
                  <img src="data:image/svg+xml,%3Csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' stroke-width='1.5' width='24' height='24' color='%23ECEEF1'%3E%3Cdefs%3E%3Cstyle%3E.cls-6374f8d9b67f094e4896c670-1%7Bfill:none%3Bstroke:currentColor%3Bstroke-miterlimit:10%3B%7D%3C/style%3E%3C/defs%3E%3Ccircle class='cls-6374f8d9b67f094e4896c670-1' cx='12' cy='7.25' r='5.73'%3E%3C/circle%3E%3Cpath class='cls-6374f8d9b67f094e4896c670-1' d='M1.5,23.48l.37-2.05A10.3,10.3,0,0,1,12,13h0a10.3,10.3,0,0,1,10.13,8.45l.37,2.05'%3E%3C/path%3E%3C/svg%3E" alt="Admin"/>
                </a>
              </li>
              :
              context.logging.privilege == 'client' ?
              <div className="flex space-x-6">
                <li>
                  <a href={`/client/${userId.trim()}`} className="hover:cursor-pointer">
                    <img src="data:image/svg+xml,%3Csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' stroke-width='1.5' width='24' height='24' color='%23ECEEF1'%3E%3Cdefs%3E%3Cstyle%3E.cls-6374f8d9b67f094e4896c670-1%7Bfill:none%3Bstroke:currentColor%3Bstroke-miterlimit:10%3B%7D%3C/style%3E%3C/defs%3E%3Ccircle class='cls-6374f8d9b67f094e4896c670-1' cx='12' cy='7.25' r='5.73'%3E%3C/circle%3E%3Cpath class='cls-6374f8d9b67f094e4896c670-1' d='M1.5,23.48l.37-2.05A10.3,10.3,0,0,1,12,13h0a10.3,10.3,0,0,1,10.13,8.45l.37,2.05'%3E%3C/path%3E%3C/svg%3E" alt="Client"/>
                  </a>
                </li>
                <div className="">
                  <a href='/panier' className="hover:cursor-pointer">
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' stroke-width='1.5' width='24' height='24' color='%23ECEEF1'%3E%3Cdefs%3E%3Cstyle%3E.cls-6375f1aeb67f094e4896ca2a-1%7Bfill:none%3Bstroke:currentColor%3Bstroke-miterlimit:10%3B%7D%3C/style%3E%3C/defs%3E%3Cg id='cart'%3E%3Ccircle class='cls-6375f1aeb67f094e4896ca2a-1' cx='10.07' cy='20.59' r='1.91'%3E%3C/circle%3E%3Ccircle class='cls-6375f1aeb67f094e4896ca2a-1' cx='18.66' cy='20.59' r='1.91'%3E%3C/circle%3E%3Cpath class='cls-6375f1aeb67f094e4896ca2a-1' d='M.52,1.5H3.18a2.87,2.87,0,0,1,2.74,2L9.11,13.91H8.64A2.39,2.39,0,0,0,6.25,16.3h0a2.39,2.39,0,0,0,2.39,2.38h10'%3E%3C/path%3E%3Cpolyline class='cls-6375f1aeb67f094e4896ca2a-1' points='7.21 5.32 22.48 5.32 22.48 7.23 20.57 13.91 9.11 13.91'%3E%3C/polyline%3E%3C/g%3E%3C/svg%3E"alt="Pannier"/>
                  </a>
                </div>
              </div>
              : 
              <></>
            }
            
          </ul>
          
          <div onClick={() => {toggleLang(); i18next.changeLanguage(lang == 'fr' ? 'en' : 'fr')}} className='lang-btn w-6 hover:cursor-pointer'>
            <img src={`/icons/${langIcon}.png`} />
          </div>
        </div>
      </nav>
      </div>
      { menuOuvert ? 
        <div className={`header-main-menu-drop ${menuOuvert ? 'open' : '' } z-10 bg-black_1 text-white px-8 absolute top-16 left-0 w-screen opacity-95`}>
          <ul className="header-ul-main flex flex-col py-6">
            <li className="p-6 flex justify-center items-center hover:bg-black rounded-xl"><a href="/">{t('accueil')}</a></li>
            <li className="p-6 flex justify-center items-center hover:bg-black rounded-xl"><a href="/liste-voitures">{t('autos_menu')}</a></li>
            <li className="p-6 flex justify-center items-center hover:bg-black rounded-xl"><a href="/a-propos">{t('aPropos_menu')}</a></li>
          </ul>
        </div>
          :
        <></>
      }  
      
    </header>

  );
}

export default Entete;

