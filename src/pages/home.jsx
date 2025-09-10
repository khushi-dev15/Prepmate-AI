import React from "react";
import Navbar from "../components/Navbar";
import {Link} from "react-router-dom";
import "./Home.css";

const Home = ()=>{
    return (
        <>
        <Navbar />
        <div className="hero">
            <h1 className="hero-title">Your AI Interview Partner</h1>
            <p className="hero-subtitle">Practice | Improve | Succeed</p>
           <Link to = "auth">
           <button className="Start-btn">Get Started</button>
           </Link>
        </div>
        </>
    );
};

export default Home;