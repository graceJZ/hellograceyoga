import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Intro from './components/Intro';
import Programs from './components/Programs';
import Contact from './components/Contact';
import YogaModule from './components/YogaModule';


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
                    <Route path="/module/:module_id" element={<YogaModule />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;