import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import './Navigation.css'; // Make sure to create this file

const Navigation = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">
                    <img src="https://raw.githubusercontent.com/graceJZ/hellograceimages/main/logo512.png" alt="Logo" />
                </Link>
            </div>
            <ul className="navbar-links">
            <li><HashLink to="/#intro">About</HashLink></li>
                <li><HashLink to="/#offerings">Offerings</HashLink></li>
                <li><HashLink to="/#future-class">Upcoming Classes</HashLink></li>
                <li><HashLink to="/#contact">Contact</HashLink></li>
            </ul>
        </nav>
    );
};

export default Navigation;

