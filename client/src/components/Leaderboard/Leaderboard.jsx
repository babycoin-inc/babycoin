import React, { useState, useEffect } from 'react';
import Profiles from './Profiles.jsx';
import axios from 'axios';

function Leaderboard() {
	const [duration, setDuration] = useState('realized_gains');
	const [coin, setCoin] = useState('usd');
	const [page, setPage] = useState(1);
	const [sort, setSort] = useState(true);
	const [isLeaderboardLoaded, setIsLeaderboardLoaded] = useState(0);
	const [leaderboard, setLeaderboard] = useState([{
        "username": "dummy",
        "coin": "usd",
        "realized_gains": "0.00",
        "row_number": "1"
    },
    {
        "username": "user2",
        "coin": "usd",
        "realized_gains": "0.00",
        "row_number": "2"
    }]);

	useEffect(() => {
		getLeaderboard();
	}, []);

	const handleDurationChange = (event) => {
		if(duration === event.target.id) {
			setSort(!sort);
			console.log(sort);
		} else {
			setDuration(event.target.id);
			getLeaderboard(event.target.id, coin, page);
		}

	}
	const handleCoinChange = async (event) => {
		setCoin(event.target.value);
		getLeaderboard(duration, event.target.value, page);
	}

	const getLeaderboard = async (duration, coin, page) => {
		setIsLeaderboardLoaded(0);
		try {
			const response = await axios.get('/leaderboard', {
				params: {
					duration: duration,
					coin: coin,
					page: page
				}
			})
			console.log('axios request');
			setLeaderboard(response.data);
			setIsLeaderboardLoaded(1);
		} catch {
			(err) => {
				console.log(err);
				setIsLeaderboardLoaded(0);
			}
		}
	}

	return (
		<div className='Board'>
			<h1 className='content-center header-title'>Leaderboard</h1>
			<div className='content-center header-display'>
				<button id='realized_gains' onClick={handleDurationChange}>Current</button>
				<button id='highest_realized_gains' onClick={handleDurationChange}>All Time</button>
				<div>
					<label>
						CryptoCurrency:
						<select onChange={handleCoinChange} value={coin}>
							<option value='usd'>US Dollar</option>
							<option value='btc'>BTC</option>
							<option value='eth'>ETH</option>
							<option value='usdt'>USDT</option>
							<option value='bnb'>BNB</option>
							<option value='ada'>ADA</option>
							<option value='xrp'>XRP</option>
							<option value='sol'>SOL</option>
							<option value='doge'>DOGE</option>
							<option value='matic'>MATIC</option>
							<option value='dot'>DOT</option>
						</select>
					</label>
				</div>
			</div>
			{isLeaderboardLoaded ? <Profiles sort={sort} duration={duration} profiles={leaderboard}/> : <></>}
		</div>
	)
}

export default Leaderboard;