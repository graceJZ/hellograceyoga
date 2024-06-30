import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Intro from './components/Intro';
import Offerings from './components/Offerings';
import Contact from './components/Contact';
import Yoga from './components/Yoga';
import Class from './components/Class';
import FutureClass from './components/FutureClass'; 


const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={
                        <>
                            <Intro />
                            <Offerings />
                            <FutureClass/>
                            <Contact />
                        </>
                    } />
                    <Route path="/yoga/:yoga_id" element={
                        
                        <>
                        <Yoga />
                        <FutureClass />
                    </>
                    
                    } />
                    <Route path="/class/:class_id" element={<Class />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;