import React, { useEffect, useState } from 'react';
import './Offerings.css';

const Offerings = () => {
  const [programs, setPrograms] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch('/yoga.json')
      .then(response => response.json())
      .then(data => setPrograms(data))
      .catch(error => console.error('Error fetching the programs:', error));
  }, []);

  const displayedPrograms = showAll ? programs : programs.slice(0, 6);

  return (
    <div id="offerings" className="program-offerings">
      <h2>Our Offerings</h2>
      <div className="program-grid">
        {displayedPrograms.map(program => (
             <a key={program.yoga_id} href={`/#/yoga/${program.yoga_id}`} className="program-card">
            <img src={program.image_url} alt={program.name} />
            <h3>{program.name}</h3>
            <p>{program.tagline}</p>
            </a>
        ))}
      </div>
      {programs.length > 6 && (
        <div className="show-more-container">
          <button 
            className="show-more-button" 
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : 'Show More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Offerings;
