import React, { useState, useEffect } from 'react';
import Header from './Header.jsx';
import Card from './Card.jsx';
import Footer from './Footer.jsx';
import axios from 'axios';

const Achievements = function ( {achievements, userAchievements, achievementsStatus }) {

    const [filter, setFilter] = useState('all');

    return (
        <div className="flex flex-col h-full py-1">
            <Header userAchievements={userAchievements} setFilter={setFilter}/>
            <div>
                {filter === 'all' || filter === 'complete' ? userAchievements.map((achievement) => {
                    return (<Card key={achievement.id} achievement={achievement} status={true} />)
                }) : null}

                {filter === 'all' || filter === 'incomplete' ? 
                    achievements?.length ? achievements.map((achievement) => {
                        const status = userAchievements.some(userAchievement => (userAchievement.achievement_id === achievement.id));
                        if (!status) {
                            return (<Card key={achievement.id} achievement={achievement} status={status} />);
                        }}) : null 
                : null }
            </div>
            <Footer />
        </div>
    );
};

export default Achievements;