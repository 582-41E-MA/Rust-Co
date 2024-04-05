import { NavLink } from "react-router-dom";
import "./Footer.css";
//import { useContext } from "react";
//import { AppContext } from "../App/App";

function Footer(props) {
  //const context = useContext(AppContext);

  return (
    <footer className="footer">
        <div className="container">
            <span>© 2024 Rust&Co. All rights reserved.</span>
        </div>
    </footer>
  );
}

export default Footer;
