const { Leaderboard } = require('../../../models/models.js');

const getLeaderboard = async (req, res) => {
	try {
		console.log(req.query.search);
		const result = await Leaderboard.getLeaderboard(req.query.duration,req.query.coin,req.query.page, req.query.search);
		res.send(result);
	}catch  (err) {
		console.log(err);
	}
};

module.exports.getLeaderboard = getLeaderboard;