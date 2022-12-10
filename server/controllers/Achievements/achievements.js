const { Achievements } = require("../../../models/models.js");

exports.getAchievements = async (req, res) => {
    try {
        const achievements = await Achievements.getAchievements();
        res.send(achievements.rows);
    } catch (error) {
        console.log('Error achievement:', error);
        res.status(404).end();
    }
};

exports.getUserAchievements = async (req, res) => {
    const { trader_id } = req.params;

    try {
        const achievements = await Achievements.getUserAchievements(trader_id);
        res.send(achievements.rows);
    } catch (error) {
        console.log('Error achievement:', error);
        res.status(404).end();
    }
};

exports.addUserAchievement = async (req, res) => {
    const { trader_id } = req.params;
    const { achievement } = req.body;
    
    try {
        await Achievements.addUserAchievement(trader_id, achievement);
        res.status(201).end();
    } catch (error) {
        console.log('Error achievement:', error);
        res.status(404).end();
    }
};
