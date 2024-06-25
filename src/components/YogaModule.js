// YogaModule.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './YogaModule.css'; // Import the CSS file

const YogaModule = ({ match }) => {

    const [module, setModule] = useState(null);
    const { module_id } = useParams();
    const apiUrl =process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetch(`${apiUrl}/modules/${module_id}/`)
            .then(response => response.json())
            .then(data => setModule(data))
            .catch(error => console.error('Error fetching module:', error));
    }, [apiUrl,module_id]);

    if (!module) {
       return <div>Loading...</div>;
    }

    return (
        <div className="yoga-module">

            <div className="module-container">
  <h1>{module.name}</h1>
  <h3>{module.short_description}</h3>
  <img src={module.image_url} alt={module.name} />
</div>

            <img src="https://raw.githubusercontent.com/graceJZ/hellograceimages/main/spandahall-banner.svg" alt="spandahall banner" />
            <div>
                {module.description.split('\n').map((line, index) => (
                    <p key={index}>{line}</p>
                ))}
            </div>

            <h2>Benefits</h2>
            <img src="https://raw.githubusercontent.com/graceJZ/hellograceimages/main/divider-yoga.svg" alt="divider yoga" />
            <div>
                <ul>
                    {module.benefits.split('\n').map((line, index) => (
                        <li key={index}>{line}</li>
                    ))}
                </ul>
            </div>
            <img src="https://raw.githubusercontent.com/graceJZ/hellograceimages/main/divider-yoga.svg" alt="divider yoga" />
            
            <div className="video-container">
                <iframe
                    src={module.promotion_video}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Promotion Video"
                ></iframe>
            </div>
            <h2>Program Guidelines</h2>
            <img src="https://raw.githubusercontent.com/graceJZ/hellograceimages/main/divider-yoga.svg" alt="divider yoga" />
            <div>
                {module.program_guidelines.split('\n').map((line, index) => (
                    <p key={index}>{line}</p>
                ))}
            </div>
            <h2>Registration Guidelines</h2>
            <img src="https://raw.githubusercontent.com/graceJZ/hellograceimages/main/divider-yoga.svg" alt="divider yoga" />
            <p>{module.registration_guidelines}</p>
        </div>
    );
};

export default YogaModule;
