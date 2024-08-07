import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Intro from './components/Intro';
import Offerings from './components/Offerings';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Yoga from './components/Yoga';
import Class from './components/Class';
import FutureClass from './components/FutureClass';
import RegistrationForm from './components/RegistrationForm';
import CancellationPolicy from './components/CancellationPolicy';
import Event from './components/Event';



const App = () => {
    return (
        <Router>
            <div className="App">
                <Navigation />
                <Routes>
                    <Route path="/" element={
                        <>
                            <Intro />
                            <Offerings />
                            <FutureClass />
                            <Contact />
                            <Footer />
                        </>
                    } />
                    <Route path="/yoga/:yoga_id" element={
                        <>
                            <Yoga />
                            <FutureClass />
                        </>
                    } />
                    <Route path="/class/:class_id" element={<Class />} />
                    <Route path="/register/:class_id" element={<RegistrationForm />} />
                    <Route path="/event/:event_id" element={
                        <>
                            <Event />
                            <FutureClass />
                        </>
                    } />
                    <Route path="/cancellation" element={<CancellationPolicy />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;