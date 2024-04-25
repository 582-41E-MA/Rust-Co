import { NavLink } from "react-router-dom";
import "./Footer.css";
//import { useContext } from "react";
//import { AppContext } from "../App/App";
import i18next from 'i18next';
import { t } from "i18next";


function Footer(props) {
  //const context = useContext(AppContext);

  return (
    <footer className="footer relative ">
        <section className="relative pt-20 pb-8 overflow-hidden text-white_1 w-full ">
        
        <div className="relative container px-4 mx-auto w-full flex-col ">
          <div className="mb-24 sm:mb-52 pr-8 sm:pr-0 w-full">
            <div className="flex items-center m-10">
              <img src="/logo/rustcologotest.png" className="footer-logo w-28 sm:w-40 sm:block mr-4" />
              <h1 className="font-heading text-4xl  sm:text-6xl font-semibold text-white_1 mb-20">
                <span className="logo-font">Rust<span className="text-rust_2">&</span>Co</span>
              </h1>
            </div>
            <div className="sm:flex items-center ml-12">
              <div className="flex mb-12 sm:mb-0 sm:mr-12 items-center">
                <div className="flex mb-3 mb-0 mr-3 items-center justify-center w-12 h-12 bg-white_1 rounded-full">
                  <img src="/icons/placeholder.png" alt="" className="w-8"/>
                </div>
                <div>
                  <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.8275559783997!2d-112.28381058716909!3d34.58322967284882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872d21839be3bcc9%3A0x6482407671b215ff!2s10530%20E%20Valley%20Rd%2C%20Prescott%20Valley%2C%20AZ%2086314%2C%20USA!5e0!3m2!1sfr!2sca!4v1713468153951!5m2!1sfr!2sca"
                  width="300"
                  height="200"
                  style={{ border: '0', borderRadius:'10px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex mb-3 mb-0 mr-3 items-center justify-center w-12 h-12 bg-white_1 rounded-full">
                  <img src="/icons/mail-line.svg" alt="" className="w-8"/>
                </div>
                <div>
                  <span className="block">
                    <a href="mailto:rustco@urmum.org" className="inline-block text-white_1 hover:text-rust_2">
                      rustco@urmum.org
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-10 border-t-2 border-rust_2 w-full">
            <div className="sm:flex items-center justify-between">
              <span className="inline-block mb-4 sm:mb-0 text-white_1">© {t('droits_footer')}</span>
              <div className="flex flex-col sm:flex sm:flex-row mb-6 sm:mb-0 items-center">
                <a className="inline-block mb-2 sm:mb-0 sm:mr-12 text-white_1 hover:text-rust_2" href="/termes-et-conditions">{t('termes_footer')}</a>
                <a className="inline-block text-white_1 hover:text-rust_2" href="/politique">{t('politique_footer')}</a>
              </div>
            </div>
          </div>
        </div> 
  
       <div className="footer-bend"></div>
      </section>
    </footer>
  );
}

export default Footer;
