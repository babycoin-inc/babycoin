const { Achievements } = require("../../../models/models.js");

exports.getAchievements = async (req, res) => {
    const achievements = await Achievements.getAchievements();
    res.send(achievements.rows);
}