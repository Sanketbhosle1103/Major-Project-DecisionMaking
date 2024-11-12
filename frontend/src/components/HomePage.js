import React from "react";
import Navbar from "../components/Navbar";
import "../styles/HomePage.css";
import { NavLink } from "react-router-dom";
import Fade from "react-reveal/Fade";

// Import images
import img1 from "../images/img1.jpeg";
import img2 from "../images/img2.jpeg";

const HomePage = () => {
    return (
        <div className="body_Homepage">
            <Navbar className="HomepageNavbar" />
            <Fade bottom distance="10%" duration={1500}>
                <header>
                    <div className="container header-section flex">
                        <div className="header-left">
                            <h1>Your Personal AI Assistant for Smarter Decisions</h1>
                            <p>Meet our cutting-edge AI assistant designed to help you make informed decisions with ease. Whether you're planning a trip, managing tasks, or seeking advice, we've got you covered.</p>
                            <NavLink to="/get-started" className="primary-button-homepage">Get Started</NavLink>
                        </div>
                        <div className="header-right">
                            <img src={img1} alt="AI Assistant" style={{ maxWidth: '100%', borderRadius: '10px' }} />
                        </div>
                    </div>
                </header>
            </Fade>
        </div>
    );
};

export default HomePage;
