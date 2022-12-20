const { query } = require('../../db/index.js');

const getLeaderboard = async (duration, coin, page) => {
	const Duration = duration || 'realized_gains';
	const Coin = coin || 'usd';
	const Page = page-1 || 0;

	const Query =
		`
		SELECT
			trader.id,
			trader.username,
			coins.acronym as coin,
			${Duration} / 1.0 as ${Duration},
			ROW_NUMBER () OVER (ORDER BY ${Duration} DESC)
		FROM
			leaderboard
		LEFT JOIN trader on leaderboard.trader_id = trader.id
		LEFT JOIN coins on leaderboard.coin_id = coins.id
		WHERE
			coins.acronym = '${Coin}'
		ORDER BY ${Duration} DESC
		LIMIT 10
		OFFSET 10 * ${Page};
		`;
	try {
		const ret = await query(Query);
		ret.rows.map((row) => {
			row[Duration] = Number(row[Duration]).toFixed(2);
		})
		return ret.rows;
	} catch { (err) => {
		console.log(err);
	}}
};


module.exports.getLeaderboard = getLeaderboard;