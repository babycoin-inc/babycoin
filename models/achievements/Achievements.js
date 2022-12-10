const db = require('../../db/index.js');

exports.getAchievements = () => {
  return db.query('SELECT * FROM achievements');
};

exports.getUserAchievements = (id) => {
  return db.query('SELECT * FROM trader_achievements WHERE trader_id = $1', [id]);
};

exports.addUserAchievement = (id, achievement) => {
  return db.query('INSERT INTO trader_achievements(trader_id, achievement_id) VALUES ($1, $2)', [id, achievement]);
};
