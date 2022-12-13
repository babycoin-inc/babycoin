const home = require('./Home/home.js');
const trade = require('./Trade/trade.js');
const leaderboard = require('./Leaderboard/leaderboard.js')
const nf = require('./newsfeed/newsfeed.js');
const achievements = require('./Achievements/achievements.js');
const market = require('./MarketWatch/marketWatch.js');


module.exports = {
  home, nf, trade, achievements,leaderboard, market
}