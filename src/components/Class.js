import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaPhone, FaEnvelope, FaDollarSign } from 'react-icons/fa';
import './Class.css'; // Import the CSS file

const Class = () => {
    const [classInfo, setClassInfo] = useState(null);
    const { class_id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the JSON file
                const response = await fetch('/class.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                // Find the specific class by class_id
                const classInfo = data.find(cls => cls.class_id === class_id);

                // Set the fetched class info to state
                setClassInfo(classInfo || null);
            } catch (error) {
                console.error('Error fetching class:', error);
                setClassInfo(null);
            }
        };

        fetchData();
    }, [class_id]);

    if (!classInfo) {
        return <div>Loading...</div>;
    }

    const {
        yoga_id, name, start_date, sessions,
        street_1, street_2, city, state, zipcode, fee,
        phone, email, description, guidelines, prerequisites, video
    } = classInfo;

    const DateHeader = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(start_date));
    console.log(DateHeader);
    const googleMapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(street_1 + ' ' + city + ' ' + state + ' ' + zipcode)}`;
    const ReadMoreLink = `/#/yoga/${yoga_id}`;
    return (
        <div className="yoga-class">

            <h1> {name} </h1>
            <h4> {DateHeader} </h4>
            <img src="https://raw.githubusercontent.com/graceJZ/hellograceimages/main/spandahall-banner.svg" alt="spandahall banner" />

            <div className="container">


                <div className="yoga-details">
                    <h3>Description</h3>
                    <div>
                        {description.split('\n').map((line, index) => (
                            <p key={index}>{line}</p>
                        ))}
                    </div>

                    <div className="links">
                        <a href={video} target="_blank" rel="noopener noreferrer">Watch Video</a> | <a href={ReadMoreLink}>Read More</a>
                    </div>

                    <h3>Guidelines</h3>
                    <div>
                        {guidelines.split('\n').map((line, index) => (
                            <p key={index}>{line}</p>
                        ))}
                    </div>
                    <h3>Prerequisites</h3>
                    <div>
                        {prerequisites.split('\n').map((line, index) => (
                            <p key={index}>{line}</p>
                        ))}
                    </div>

                </div>
                <div className="class-details">

                    <h2>Class Detail</h2>

                    <img src="https://raw.githubusercontent.com/graceJZ/hellograceimages/main/divider-yoga.svg" alt="divider yoga" />

                    <p>
                        <FaCalendarAlt className="icon" />
                        {sessions.split('\n').map((line, index) => (
                            <React.Fragment key={index}>
                                {line}
                                <br />
                            </React.Fragment>
                        ))}
                    </p>
                    <p>
                        <FaMapMarkerAlt className="icon" />
                        <a href={googleMapLink} target="_blank" rel="noopener noreferrer">
                            {street_1 && <div>{street_1}</div>}
                            {street_2 && <div>{street_2}</div>}
                            {city && <div>{city}</div>}
                            {state && <div>{state}</div>}
                            {zipcode && <div>{zipcode}</div>}
                        </a>
                    </p><p><FaPhone className="icon" /> <a href={`tel:${phone}`}>{phone}</a></p>
                    <p><FaEnvelope className="icon" /> <a href={`mailto:${email}`}>{email}</a></p>

                    <p><FaDollarSign className="icon" /> {fee}</p>
                    <button className="register-button">Register</button>
                </div>
            </div>
        </div>
    );
};

export default Class;
