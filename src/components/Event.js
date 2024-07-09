import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import disclaimerText from './disclaimerText';
import './Event.css';

const Event = () => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        otherGuests: '',
        waiver: '',
        guidelines: '',
        RSVP: '',
    });

    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [eventInfo, setEventInfo] = useState(null);
    const { event_id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the JSON file
                const response = await fetch('/event.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                // Find the specific class by class_id
                const classInfo = data.find(cls => cls.event_id === event_id);

                // Set the fetched class info to state
                setEventInfo(classInfo || null);
            } catch (error) {
                console.error('Error fetching class:', error);
                setEventInfo(null);
            }
        };

        fetchData();
    }, [event_id]);

    if (!eventInfo) {
        return <div>Loading...</div>;
    }

    const {
        name, date, description, guidelines, prerequisites
    } = eventInfo;
    const DateHeader = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(date));
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address.');
            return false;
        } else {
            setEmailError('');
            return true;
        }
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
        if (!phoneRegex.test(phone)) {
            setPhoneError('Please enter a valid 10-digit phone number.');
            return false;
        } else {
            setPhoneError('');
            return true;
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? (checked ? 'Yes' : '') : value
        });
    };

    const resetForm = () => {
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            otherGuests: '',
            waiver: '',
            guidelines: '',
            RSVP: '',

        });
        setEmailError('');
        setPhoneError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isEmailValid = validateEmail(formData.email);
        const isPhoneValid = validatePhone(formData.phone);

        if (!isEmailValid || !isPhoneValid) {
            alert('Please correct the errors in the form.');
            return; // Prevent form submission if any field is invalid
        }

        const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSc1RBXGOU57ea7F-wd0GjlRal3onruFYpxLBDsy6KIukQHXMQ/formResponse';

        const data = new FormData();
        data.append('entry.2030439280', event_id);
        data.append('entry.559352220', formData.firstName);
        data.append('entry.1591623156', formData.lastName);
        data.append('entry.293863213', formData.email);
        data.append('entry.1179695408', formData.phone);
        data.append('entry.924523986', formData.otherGuests);
        data.append('entry.494056872', formData.waiver);
        data.append('entry.1313926931', formData.guidelines);
        data.append('entry.1446042095', formData.RSVP);


        fetch(formUrl, {
            method: 'POST',
            body: data,
            mode: 'no-cors'
        })
            .then(() => {
                resetForm(); // Reset form fields after successful submission
                alert('Thank you for your RSVP!');
            })
            .catch((error) => {
                console.error('Error submitting form:', error);
            });
    };

    return (
        <div className="event-class">

            <h1> {name} </h1>
            <h4> {DateHeader} </h4>
            <img src="https://raw.githubusercontent.com/graceJZ/hellograceimages/main/spandahall-banner.svg" alt="spandahall banner" />

            <div className="container">
                <div className="event-details">
                    <h3>Description</h3>
                    <div>
                        {description.split('\n').map((line, index) => (
                            <p key={index}>{line}</p>
                        ))}
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

                <div className="event-form">
                    <form onSubmit={handleSubmit} className="custom-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor='email'>Email</label>
                                <input
                                    type="email"
                                    id='email'
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                    required
                                />
                                {emailError && <p className="error">{emailError}</p>}
                            </div>
                            <div className="form-group">
                                <label htmlFor='phone'>Phone</label>
                                <input
                                    type="tel"
                                    id='phone'
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    autoComplete="tel"
                                    required
                                />
                                {phoneError && <p className="error">{phoneError}</p>}
                            </div>

                            <div className="form-group">
                                <label htmlFor='otherGuests'>Name of Other Guests You're Bringing</label>
                                <input
                                    type="text"
                                    id='otherGuests'
                                    name="otherGuests"
                                    value={formData.otherGuests}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>


                        <div className="form-group">
                            <label htmlFor='disclaimer'>DISCLAIMER; LIABILITY WAIVER; RELEASE; ARBITRATION</label>
                            <textarea
                                id="disclaimer"
                                value={disclaimerText}
                                rows="10"
                                readOnly
                            />
                        </div>

                        <div className="form-group inline-group">
                            <input
                                type="checkbox"
                                id="waiver"
                                name="waiver"
                                checked={formData.waiver === "Yes"}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="waiver">
                                I have read and agree with the disclaimer.
                            </label>

                        </div>

                        <div className="form-group inline-group">
                            <input
                                type="checkbox"
                                id="guidelines"
                                name="guidelines"
                                checked={formData.guidelines === "Yes"}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="guidelines">
                                I have read and agree with the guidelines and prerequisites.
                            </label>
                        </div>

                        <div className="form-group ">
                            <label> RSVP </label>
                            <div className='inline-group'>
                                <input
                                    type="radio"
                                    id="RSVPYes"
                                    name="RSVP"
                                    value="Yes"
                                    checked={formData.RSVP === "Yes"}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="RSVPYes">Yes, I plan to attend</label>
                            </div>
                            <div className='inline-group'>
                                <input
                                    type="radio"
                                    id="RSVPNo"
                                    name="RSVP"
                                    value="No"
                                    checked={formData.RSVP === "No"}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="RSVPNo">I'm intested, but can't attend this time</label>
                            </div>
                        </div>

                        <button type="submit" className="submit-button">Submit</button>
                    </form>
                </div>
            </div>
        </div>


    );
};

export default Event;
