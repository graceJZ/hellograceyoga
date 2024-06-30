// src/CustomForm.js
import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdxNSQnd8dOE1YJ3gOndRaBinKHlIA-AX2Ybut1WW5t3mi_Vw/formResponse';
    const data = new FormData();
    data.append('entry.1056457430', formData.email);
    data.append('entry.101555147', formData.phone);
    data.append('entry.1618178446', formData.message);

    fetch(formUrl, {
      method: 'POST',
      body: data,
      mode: 'no-cors'
    })
      .then(() => {
        alert('Form submitted successfully!');
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="custom-form">
      <div className="form-group">
        <label>Email (required):</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Phone:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Message (required):</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="10"
          required
        ></textarea>
      </div>
      <button type="submit" className="submit-button">Submit</button>
    </form>
  );
};

export default ContactForm;