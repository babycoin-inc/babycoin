const { query } = require('../../db/index.js');

const getLeaderboard = async (coin) => {
	const dbQuery =
	`
	SELECT trader_id, current_gains, highest_total_gains, coins.acronym as coin
	FROM leaderboard
	LEFT JOIN coins
	ON leaderboard.coin_id = coins.id
	WHERE coins.acronym = '${coin}';
	`;
	const ret = await query(dbQuery);
	return ret;
};


module.exports.getLeaderboard = getLeaderboard;