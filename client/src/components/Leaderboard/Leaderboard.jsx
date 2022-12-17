import React, { useState, useEffect } from 'react';
import Profiles from './Profiles.jsx';
import axios from 'axios';

function Leaderboard() {
	const [duration, setDuration] = useState('realized_gains');
	const [coin, setCoin] = useState('usd');
	const [page, setPage] = useState(1);
	const [isLeaderboardLoaded, setIsLeaderboardLoaded] = useState(0);
	const [leaderboard, setLeaderboard] = useState([]);

	useEffect(() => {
		getLeaderboard();
	}, []);

	const handleDurationChange = (event) => {
		if(duration !== event.target.id) {
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
			<div className='text-center'>
				<button className='px-8 w-4' id='realized_gains' onClick={handleDurationChange}>Current</button>
				<button className='px-8 w-4' id='highest_realized_gains' onClick={handleDurationChange}>All Time</button>
				<div>
					<label>
						CryptoCurrency:
						<select onChange={handleCoinChange} value={coin}>
							<option value='usd'>US Dollar</option>
							<option value='btc'>BTC</option>
							<option value='eth'>ETH</option>
							<option value='usdt'>USDT</option>
							<option value='bnb'>BNB</option>
							<option value='xrp'>XRP</option>
							<option value='ada'>ADA</option>
							<option value='doge'>DOGE</option>
							<option value='matic'>MATIC</option>
							<option value='dot'>DOT</option>
							<option value='sol'>SOL</option>
						</select>
					</label>
				</div>
			</div>
			<h1 className='bg-zinc-700 rounded-t-xl pt-2.5 px-5 w-fit'>Leaderboard</h1>
			{isLeaderboardLoaded ? <Profiles duration={duration} profiles={leaderboard}/> : <></>}
		</div>
	)
}

export default Leaderboard;