const db = require("../../db/index.js");

exports.getAchievements = () => {
  return db.query("SELECT * FROM achievements");
};
