const db = require('../../db/index.js');

exports.getAchievements = () => {
  return db.query('SELECT * FROM achievements');
};

exports.getUserAchievements = (id) => {
  return db.query(`
    SELECT ta.*, a.* FROM trader_achievements ta 
    JOIN achievements a ON ta.achievement_id = a.id 
    WHERE ta.trader_id = $1
    ORDER by created_at DESC`, [id]);
};

exports.addUserAchievement = (id, achievement) => {
  return db.query('INSERT INTO trader_achievements(trader_id, achievement_id) VALUES ($1, $2)', [id, achievement]);
};
