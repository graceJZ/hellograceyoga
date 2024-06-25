import React from 'react';
import './Programs.css';

const programs = [
  { id: 1, title: 'Upa Yoga', description: 'Gentle Yoga, Start Your Journey', image: 'https://raw.githubusercontent.com/graceJZ/hellograceimages/main/1.UpaYoga.jpeg' },
  { id: 2, title: 'Bhuta Shuddhi', description: 'Cleansing Yoga, Purification of the Elements', image: 'https://raw.githubusercontent.com/graceJZ/hellograceimages/main/2.BhutaShuddhi.jpeg' },
  { id: 3, title: 'Angamardana', description: 'Fitness Yoga, Complete Mastery of the Limbs', image: 'https://raw.githubusercontent.com/graceJZ/hellograceimages/main/3.Angarmadana.jpg' },
  { id: 4, title: 'Suriya Kriya', description: 'Meditation in Motion, an Ancient and Potent Yogic Practice', image: 'https://raw.githubusercontent.com/graceJZ/hellograceimages/main/4.SuriyaKriya.jpg' },
  { id: 5, title: 'Yogasanas', description: 'Stillness Through Postures, Reach Higher Level of Conciousness', image: 'https://raw.githubusercontent.com/graceJZ/hellograceimages/main/5.Yogasanas.jpg' },
  { id: 6, title: 'Yoga for Children', description: 'Grow with Yoga: Fun, Love, Joy', image: 'https://raw.githubusercontent.com/graceJZ/hellograceimages/main/6.Children.jpg' },
];

const Programs = () => {
  return (
    <div className="program-offerings">
      <h2>Our Programs</h2>
      <div className="program-grid">
        {programs.map(program => (
          <div key={program.id} className="program-card">
            <img src={program.image} alt={program.title} />
            <h3>{program.title}</h3>
            <p>{program.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Programs;
