const { Leaderboard } = require('../../../models/models.js');

const getLeaderboard = async (req, res) => {
	console.log(req.query.coin);
	const result = await Leaderboard.getLeaderboard(req.query.coin);
	res.send(result);
};

module.exports.getLeaderboard = getLeaderboard;