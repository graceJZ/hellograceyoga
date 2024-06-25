import React from 'react';
import './Intro.css'; // Assume you have a CSS file for specific styles

const Intro = () => {
  return (
    <div className="intro-section" style={{ backgroundImage: `url('https://raw.githubusercontent.com/graceJZ/hellograceimages/main/background.jpg')` }}>
      <div className="overlay">
        <h1>Hello Grace Yoga</h1>
        <p>Classical Yoga For Modern Life</p>
        {/* <button className="cta-button">Join Now</button> */}
      </div>
    </div>
  );
};

export default Intro;
