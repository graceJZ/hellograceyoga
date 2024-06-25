import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt,FaInstagram, FaFacebook } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-section">
      <h2>Contact Us</h2>
      <div className="contact-info">
        <div><FaPhone /> +1 412-862-5007</div>
        <div><FaEnvelope /> hellograceyoga@gmail.com</div>
        <div><FaMapMarkerAlt /> Pittsburgh, Pennsylvania, USA</div>
        <div><FaInstagram /> @hello.grace.yoga</div>
        <div><FaFacebook /> @hellograceyoga</div>
      </div>
    </div>
  );
};

export default Contact;
