import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Intro from './components/Intro';
import Programs from './components/Programs';
import Contact from './components/Contact';
import YogaModule from './components/YogaModule';
import Class from './components/Class';


const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={
                        <>
                            <Intro />
                            <Programs />
                            <Contact />
                        </>
                    } />
                    <Route path="/yoga/:yoga_id" element={<YogaModule />} />
                    <Route path="/class/:class_id" element={<Class />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;