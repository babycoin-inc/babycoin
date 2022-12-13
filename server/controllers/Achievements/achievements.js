const { Achievements } = require("../../../models/models.js");

exports.getAchievements = async (req, res) => {
    try {
        const achievements = await Achievements.getAchievements();
        res.send(achievements);
    } catch (error) {
        console.log('Error:', error);
        res.status(500).end();
    }
};

exports.getUserAchievements = async (req, res) => {
    const { id } = req.params;
    try {
        const achievements = await Achievements.getUserAchievements(id);
        res.send(achievements);
    } catch (error) {
        console.log('Error:', error);
        res.status(500).end();
    }
};

exports.addUserAchievement = async (req, res) => {
    const { id } = req.params;
    const { achievementId } = req.params;
    try {
        await Achievements.addUserAchievement(id, achievementId);
        res.status(201).end();
    } catch (error) {
        console.log('Error:', error);
        res.status(500).end();
    }
};
