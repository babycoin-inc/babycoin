import React, { useState, useEffect } from 'react';
import Header from './Header.jsx';
import Card from './Card.jsx';
import Footer from './Footer.jsx';
import axios from 'axios';

const Achievements = function ( {achievements, userAchievements }) {

    const [filter, setFilter] = useState('all');
    const [ap, setAp] = useState(0);

    return (
        <div className="flex flex-col smooth-scroll fixed-scroll">
            <Header setFilter={setFilter} ap={ap}/>
            { achievements?.length ? achievements.map((achievement) => {

                const status = userAchievements.some(userAchievement => (
                    userAchievement.achievement_id === achievement.id
                ));

                if (filter === 'all') return (<Card key={achievement.id} achievement={achievement} status={status} />);
                if (filter === 'complete' && status) return (<Card key={achievement.id} achievement={achievement} status={status} />);
                if (filter === 'incomplete' && !status) return (<Card key={achievement.id} achievement={achievement} status={status} />);

            }) : null }

            <Footer /> 
        </div>
    );
};

export default Achievements;