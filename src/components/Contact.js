// src/Contact.js
import React from 'react';
import ContactForm from './ContactForm';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaFacebook } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-us">
      <h2>Contact Us</h2>
      <div className="contact-container">
        <div className="contact-form card">
          <ContactForm />
        </div>
        <div className="contact-info card">
          <h3>More Ways To Reach Us</h3>
          <div><FaPhone /> +1 412-862-5007</div>
          <div><FaEnvelope /> info@hellograceyoga.com</div>
          <div><FaMapMarkerAlt /> Pittsburgh, Pennsylvania, USA</div>
          <div><FaInstagram /> @hello.grace.yoga</div>
          <div><FaFacebook /> @hellograceyoga</div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
