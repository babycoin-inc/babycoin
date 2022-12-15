const { query } = require('express');
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

exports.addUserAchievement = async (id, achievement) => {
  //Add validation to make sure achievement has been obtained
  try {
    await db.query(`INSERT INTO trader_achievements (trader_id, achievement_id) VALUES ($1, $2)`, [id, achievement]);
  } catch (err) {
    return err;
  }



  // try {
    // if (achievement === 2) {
    //   console.log('nice')
    //   const check = await db.query(`
    //     SELECT (SELECT COUNT(order_type) FROM transactions WHERE order_type = buy) = 1`);
    //     console.log(check);
    //   if (check.rows[0]) {
    //     const granted = await db.query (`
    //       INSERT INTO trader_achievements(trader_id, achievement_id) 
    //       VALUES ($1, $2)`, [id, achievement.id]);
    //       console.log('granted');
    //     return granted.rows;
    //   } else {
    //     console.log('denied');
    //     return rows;
    //   }
    // }
  // } catch (err) {
  //   return err;
  // }

};
