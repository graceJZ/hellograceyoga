import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './YogaModule.css'; // Import the CSS file

const YogaModule = () => {
    const [module, setModule] = useState(null);
    const { yoga_id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the JSON file
                const response = await fetch('/yoga.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                // Find the specific module by yoga_id
                const module = data.find(mod => mod.yoga_id === yoga_id);

                // Set the fetched module to state
                setModule(module || null);
            } catch (error) {
                console.error('Error fetching module:', error);
                setModule(null);
            }
        };

        fetchData();
    }, [yoga_id]);

    if (!module) {
        return <div>Loading...</div>;
    }

    return (
        <div className="yoga-module">

            <div className="module-container">
                <h1>{module.name}</h1>
                <h3>{module.tagline}</h3>
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
                    src={module.video}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Promotion Video"
                ></iframe>
            </div>

            <img src="https://raw.githubusercontent.com/graceJZ/hellograceimages/main/divider-yoga.svg" alt="divider yoga" />


        </div>

    );
};

export default YogaModule;
