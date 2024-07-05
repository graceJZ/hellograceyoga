import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    message: ''
  });
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

  const resetForm = () => {
    setFormData({
      email: '',
      phone: '',
      message: ''
    });
    setEmailError('');
    setPhoneError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail(formData.email);
    const isPhoneValid = validatePhone(formData.phone);

    if (!isEmailValid || !isPhoneValid) {
      return; // Prevent form submission if email or phone is invalid
    }

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
        resetForm(); // Reset form fields after successful submission
        alert('We will soon get back to you!');
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
        {emailError && <p className="error">{emailError}</p>}
      </div>
      <div className="form-group">
        <label>Phone (required):</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        {phoneError && <p className="error">{phoneError}</p>}
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
