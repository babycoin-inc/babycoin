import React, { useState, useEffect } from 'react';
import Header from './Header.jsx';
import Card from './Card.jsx';
import Footer from './Footer.jsx';
import axios from 'axios';

const Achievements = function () {

    const [achievements, setAchievements] = useState([]);

    useEffect(() => {
        getAchievements();
    }, []);

    const getAchievements = async () => {
        const { data } = await axios.get('/achievements');
        setAchievements(data);
    } 

    return (
        <div className="flex flex-col">
            <Header />
            { achievements.length ? achievements.map((achievement) => (
                <Card key={achievement.id} data={achievement} />
            )) : null }
            <Footer /> 
        </div>
    );
};

export default Achievements;