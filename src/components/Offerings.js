import React, { useEffect, useState } from 'react';
import './Offerings.css';

const Offerings = () => {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    fetch('/yoga.json')
      .then(response => response.json())
      .then(data => setPrograms(data))
      .catch(error => console.error('Error fetching the programs:', error));
  }, []);

  return (
    <div className="program-offerings">
      <h2>Our Offerings</h2>
      <div className="program-grid">
        {programs.map(program => (
             <a key={program.yoga_id} href={`/#/yoga/${program.yoga_id}`} className="program-card">
            <img src={program.image_url} alt={program.name} />
            <h3>{program.name}</h3>
            <p>{program.tagline}</p>
            </a>
        ))}
      </div>
    </div>
  );
};

export default Offerings;
  

