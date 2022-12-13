const db = require('../../db/index.js');

exports.getAchievements = async () => {
  try {
    const { rows } = await db.query('SELECT * FROM achievements');
    return rows;
  } catch (err) {
    return err;
  }
};

exports.getUserAchievements = async (id) => {
  try {
    const { rows } = await db.query(`
      SELECT ta.*, a.* FROM trader_achievements ta 
      JOIN achievements a ON ta.achievement_id = a.id 
      WHERE ta.trader_id = $1
      ORDER by created_at DESC`, [id]);
    return rows;
  } catch(err) {
    return err;
  }
};

exports.addUserAchievement = async (id, achievementId) => {
  //Add validation to make sure achievement has been obtained
  try {
    const { rows } = await db.query(`
      INSERT INTO trader_achievements(trader_id, achievement_id) 
      VALUES ($1, $2)`, [id, achievementId]);
    return rows;
  } catch(err) {
    return err;
  }
};
