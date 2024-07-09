import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-image-wide">
                    <img src="https://raw.githubusercontent.com/graceJZ/hellograceimages/main/Hatha_Logo_Full_Black.png"
                    alt="Hatha Logo" />
                </div>
                <div className="footer-image-square">
                    <img src="https://raw.githubusercontent.com/graceJZ/hellograceimages/main/Sadhguru_square_photo.jpg" alt="Sadhguru Logo" />
                    <p>Classical Hatha Yoga<br />Structured by Sadhguru</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
