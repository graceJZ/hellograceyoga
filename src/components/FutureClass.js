import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

import './FutureClass.css';

const FutureClass = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch('/class.json')
      .then(response => response.json())
      .then(data => {
        const currentDate = new Date();
        const futureClasses = data.filter(cls => new Date(cls.start_date) > currentDate);
        setClasses(futureClasses);
      })
      .catch(error => console.error('Error fetching the classes:', error));
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  };

  return (
    <div id= "future-class" className="class-offerings">
      <h2>Upcoming Classes</h2>
      <div className="class-grid">
        {classes.map(cls => (
          <div key={cls.class_id} className="class-card">
            <h3>{cls.name}</h3>
            <div className="spacer"></div>
            <h4 className="class-date">
              <FaCalendarAlt className="icon" />
              {formatDate(cls.start_date)}
              {formatDate(cls.start_date) !== formatDate(cls.end_date) && ` - ${formatDate(cls.end_date)}`}
            </h4>
            <p className="class-location">
              <FaMapMarkerAlt className="icon" />
              {cls.city}, {cls.state}
            </p>
            <div className="class-buttons">
              <a href={`/#/class/${cls.class_id}`} className="button learn-more">Learn More</a>
              <a href={`/#/register/${cls.class_id}`} className="button register">Register</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FutureClass;
