const { query } = require('../../db/index.js');

const getLeaderboard = async (duration, coin, page, search) => {
	const Duration = duration || 'current_realized_gains';
	const Coin = coin || 'usd';
	const Page = page-1 || 0;
	let Search = `%`;
	if(search !== undefined) {
		Search = `%${search}%`;
	}

	let response = [];

	const getCount =
	`
	SELECT
		count(*) as idCount
	FROM
		leaderboard
		LEFT JOIN trader on leaderboard.trader_id = trader.id
		LEFT JOIN coins on leaderboard.coin_id = coins.id
	WHERE
		coins.acronym = '${Coin}' AND username LIKE '${Search}'
	`;
try {
	const ret = await query(getCount);
	response.push(ret.rows);
} catch (err) {
	console.log(err);
}

	const Query =
		`
		SELECT *
		FROM
			(SELECT
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
			ORDER BY ${Duration} DESC) as RANKED
		WHERE ranked.username LIKE '${Search}'
		LIMIT 10
		OFFSET 10 * ${Page}
		`;
	try {
		const ret = await query(Query);
		ret.rows.map((row) => {
			row[Duration] = Number(row[Duration]).toFixed(2);
		})
		response.push(ret.rows);
		return response;
	} catch (err) {
		console.log(err);
	}
};


module.exports.getLeaderboard = getLeaderboard;