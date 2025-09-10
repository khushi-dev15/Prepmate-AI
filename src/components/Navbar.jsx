import React from "react";
import"./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = ()=>{
    return(
        <nav className="navbar">
            <div className="navbar-logo">Prepmate-AI</div>
            <ul className="nav-links">
                <li>HOME</li>
                <li>ABOUT</li>
                <li>FEATURES</li>
                <li> <Link to = "/auth">LOGIN / REGISTER</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;