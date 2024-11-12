import React from "react";
import "../styles/navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="header">
            <nav className="menu-bar">
                <NavLink className="navbar-brand" to="/">AI Buddy</NavLink>
                <div className="navbar-links">
                    <NavLink className="nav-link secondary-button" to="/login">Sign In</NavLink>
                    <NavLink className="nav-link primary-button" to="/register">Sign Up</NavLink>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
