import { NavLink } from "react-router-dom";
import "./Footer.css";
//import { useContext } from "react";
//import { AppContext } from "../App/App";
import i18next from 'i18next';
import { t } from "i18next";


function Footer(props) {
  //const context = useContext(AppContext);

  return (
    <footer className="footer relative">
        <section className="relative pt-20 pb-8 overflow-hidden text-white">
        
        <div className="relative container px-4 mx-auto">
          <div className="max-w-3xl mb-24 sm:mb-52 pr-8 sm:pr-0">
            <div className="flex items-center m-10 ">
            <img src="/logo/rustcologotest.png" className="footer-logo hidden sm:w-40 sm:block mr-12" />
            <h1 className="font-heading text-4xl xs:text-5xl md:text-6xl font-semibold text-white mb-20">
              <span>Rust&Co</span>
            </h1>
            </div>
            <div className="sm:flex items-center">
              <div className="sm:flex mb-6 sm:mb-0 sm:mr-12 items-center">
                <div className="flex mb-3 sm:mb-0 sm:mr-3 items-center justify-center w-12 h-12 bg-white rounded-full">
                  <img src="/icons/placeholder.png" alt="" className="w-8"/>
                </div>
                <div>
                  <span className="block text-orange-50">1929, Bancangan, Sambit,</span>
                  <span className="block text-orange-50">Texas, Qc</span>
                </div>
              </div>
              <div className="sm:flex items-center">
                <div className="flex mb-3 sm:mb-0 sm:mr-3 items-center justify-center w-12 h-12 bg-white rounded-full">
                  <img src="/icons/envelope.png" alt="" className="w-8"/>
                </div>
                <div>
                  <span className="block"><a href="mailto:rustco@yourdomain.com" className="inline-block text-white hover:text-orange-100">rustco@yourdomain.com</a></span>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-10 border-t-2 border-orange-400 border-opacity-50">
            <div className="sm:flex items-center justify-between">
              <span className="inline-block mb-4 sm:mb-0 text-gray-50">©{t('droits_footer')}</span>
              <div className="sm:flex mb-6 sm:mb-0 items-center"><a className="inline-block mr-6 sm:mr-12 text-white hover:text-orange-100" href="/termes-et-conditions">{t('termes_footer')}</a><a className="inline-block text-white hover:text-orange-100" href="/politique">{t('politique_footer')}</a></div>
            </div>
          </div>
        </div> 
       <div className="footer-bend"></div>
      </section>
    </footer>
  );
}

export default Footer;
