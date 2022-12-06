import React from 'react';
import Header from './Header.jsx';
import Card from './Card.jsx';
import Footer from './Footer.jsx';

const Achievements = function () {

    return (
        <div className="flex flex-col">
            <Header />
            <Card />
            <Card />
            <Card />
            <Footer />
        </div>
    );
};

export default Achievements;