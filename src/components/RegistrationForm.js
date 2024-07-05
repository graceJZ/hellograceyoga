import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './RegistrationForm.css';
import disclaimerText from './disclaimerText';
import { FaCalendarAlt, FaMapMarkerAlt, FaPhone, FaEnvelope, FaDollarSign } from 'react-icons/fa';


const RegistrationForm = () => {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthYear: '',
    zipCode: '',
    physicalCondition: '',
    physicalConditionDetails: '',
    mentalCondition: '',
    mentalConditionDetails: '',
    familyHistory: '',
    waiver: '',
    cancellationPolicy: '',
    guidelines: '',
  });

  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [birthYearError, setBirthYearError] = useState('');
  const [zipCodeError, setZipCodeError] = useState('');

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
    name, sessions,
    street_1, street_2, city, state, zipcode, fee,
    phone, email, payment_link_id
  } = classInfo;
  const googleMapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(street_1 + ' ' + city + ' ' + state + ' ' + zipcode)}`;
  const classGuidlineLink = `/#/class/${class_id}`;
  const cancellationLink = `/#/cancellation`;

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

  const validateBirthYear = (birthYear) => {
    const currentYear = new Date().getFullYear();
    if (birthYear < 1900 || birthYear > currentYear) {
      setBirthYearError(`Please enter a valid year between 1900 and ${currentYear}.`);
      return false;
    } else {
      setBirthYearError('');
      return true;
    }
  };

  const validateZipCode = (zipCode) => {
    const usZipCodeRegex = /^\d{5}(-\d{4})?$/;
    const canadaZipCodeRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    if (!usZipCodeRegex.test(zipCode) && !canadaZipCodeRegex.test(zipCode)) {
      setZipCodeError('Please enter a valid US or Canadian zipcode.');
      return false;
    } else {
      setZipCodeError('');
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail(formData.email);
    const isPhoneValid = validatePhone(formData.phone);
    const isBirthYearValid = validateBirthYear(formData.birthYear);
    const isZipCodeValid = validateZipCode(formData.zipCode);

    if (!isEmailValid || !isPhoneValid || !isBirthYearValid || !isZipCodeValid) {
      return; // Prevent form submission if any field is invalid
    }

    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSeSCuVRj-7OJOA9XByWEdG6IQc6uhr7-7488QeG7-mrchyqeg/formResponse';

    const data = new FormData();
    data.append('entry.947421956', class_id);
    data.append('entry.1968033008', formData.firstName);
    data.append('entry.724836611', formData.lastName);
    data.append('entry.1887235951', formData.email);
    data.append('entry.695587170', formData.phone);
    data.append('entry.672458910', formData.birthYear);
    data.append('entry.801788652', formData.zipCode);
    data.append('entry.499192358', formData.physicalCondition);
    data.append('entry.582173075', formData.physicalConditionDetails);
    data.append('entry.1168889563', formData.mentalCondition);
    data.append('entry.1244635542', formData.mentalConditionDetails);
    data.append('entry.2015640313', formData.familyHistory);
    data.append('entry.469948123', formData.waiver);
    data.append('entry.951181303', formData.guidelines);
    data.append('entry.1145256917', formData.cancellationPolicy);


    fetch(formUrl, {
      method: 'POST',
      body: data,
      mode: 'no-cors'
    })
      .then(() => {
        window.location.href = `https://book.stripe.com/${payment_link_id}?prefilled_email=${formData.email}`;
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
      });
  };

  return (
    <div className="class-registration">

      <div className="class-info">

        <h2>{name}</h2>
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


      </div>


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
            />
            {phoneError && <p className="error">{phoneError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor='birthYear'>Year Of Birth</label>
            <input
              type="number"
              id='birthYear'
              name="birthYear"
              value={formData.birthYear}
              onChange={handleChange}
              required
            />
            {birthYearError && <p className="error">{birthYearError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor='zipCode'>Zipcode</label>
            <input
              type="text"
              id='zipCode'
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              required
            />
            {zipCodeError && <p className="error">{zipCodeError}</p>}
          </div>
        </div>
        <div className="form-group ">
          <label>Do you have any physical condition(s) that may limit your participation in the class?</label>
          <div className='inline-group'>
            <input
              type="radio"
              id="physicalConditionYes"
              name="physicalCondition"
              value="Yes"
              checked={formData.physicalCondition === "Yes"}
              onChange={handleChange}
              required
            />
            <label htmlFor="physicalConditionYes">Yes</label>
          </div>
          <div className='inline-group'>
            <input
              type="radio"
              id="physicalConditionNo"
              name="physicalCondition"
              value="No"
              checked={formData.physicalCondition === "No"}
              onChange={handleChange}
              required
            />
            <label htmlFor="physicalConditionNo">No</label>
          </div>
        </div>
        {formData.physicalCondition === "Yes" && (
          <div className="form-group">
            <label htmlFor='physicalConditionDetails'>If yes, please provide details.</label>
            <textarea
              name="physicalConditionDetails"
              id='physicalConditionDetails'
              value={formData.physicalConditionDetails}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>
        )}

        <div className="form-group">
          <label>Do you have any mental condition(s) that may limit your participation in the class?</label>
          <div className='inline-group'>
            <input
              type="radio"
              id="mentalConditionYes"
              name="mentalCondition"
              value="Yes"
              checked={formData.mentalCondition === "Yes"}
              onChange={handleChange}
              required
            />
            <label htmlFor="mentalConditionYes">Yes</label>
          </div>
          <div className='inline-group'>
            <input
              type="radio"
              id="mentalConditionNo"
              name="mentalCondition"
              value="No"
              checked={formData.mentalCondition === "No"}
              onChange={handleChange}
              required
            />
            <label htmlFor="mentalConditionNo">No</label>
          </div>
        </div>
        {formData.mentalCondition === "Yes" && (
          <div className="form-group">
            <label htmlFor='mentalConditionDetails'>If yes, please provide details.</label>
            <textarea
              name="mentalConditionDetails"
              id='mentalConditionDetails'
              value={formData.mentalConditionDetails}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor='familyHistory'>Is there any family history of physical or mental ailments that we should be aware of?</label>
          <textarea
            name="familyHistory"
            id='familyHistory'
            value={formData.familyHistory}
            onChange={handleChange}
            rows="4"
          />
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
            I have read and agree with the
            <a href={classGuidlineLink} target="_blank" rel="noopener noreferrer"> class registration guidelines</a>
            .
          </label>
        </div>

        <div className="form-group inline-group">
          <input
            type="checkbox"
            id="cancellationPolicy"
            name="cancellationPolicy"
            checked={formData.cancellationPolicy === "Yes"}
            onChange={handleChange}
            required
          />
          <label htmlFor="cancellationPolicy">
            I have read and agree with the
            <a href={cancellationLink} target="_blank" rel="noopener noreferrer"> cancellation policy</a>
            .
          </label>
        </div>
        <label>click on the BOOK button to be directed to our Stripe payment page.</label>
        <button type="submit" className="submit-button">BOOK</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
