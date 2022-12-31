import React, { useState, useEffect } from 'react';
import Profiles from './Profiles.jsx';
import axios from 'axios';

function Leaderboard() {
	const [duration, setDuration] = useState('current_realized_gains');
	const [coin, setCoin] = useState('usd');
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState('');

	const [idCount, setIdCount] = useState(0);

	const [leaderboard, setLeaderboard] = useState([]);
	const [isLeaderboardLoaded, setIsLeaderboardLoaded] = useState(0);

	useEffect(() => {
		getLeaderboard();
	}, []);

	const handleDurationChange = (event) => {
		if (duration !== event.target.id) {
			setPage(1);
			setDuration(event.target.id);
			getLeaderboard(event.target.id, coin, 1, search);
		}
		console.log(event.target.id);
	}
	const handleCoinChange = (event) => {
		setPage(1);
		setCoin(event.target.value);
		getLeaderboard(duration, event.target.value, 1, search);
	}
	const handlePageChange = (event) => {
		setPage(event.target.value);
		getLeaderboard(duration, coin, event.target.value, search);

	}

	const handleSearchChange = (event) => {
		setPage(1);
		setSearch(event.target.value);
		event.preventDefault();
	}
	const handleSearchSubmit = (event) => {
		setPage(1);
		getLeaderboard(duration, coin, 1, search);
		event.preventDefault();
	}

	const getLeaderboard = async (duration, coin, page) => {
		setIsLeaderboardLoaded(0);
		try {
			const response = await axios.get('/leaderboard', {
				params: {
					duration: duration,
					coin: coin,
					page: page,
					search: search
				}
			})
			setLeaderboard(response.data[1]);
			setIdCount(response.data[0][0]['idcount']);
			setIsLeaderboardLoaded(1);
		} catch {
			(err) => {
				console.log(err);
				setIsLeaderboardLoaded(0);
			}
		}
	}

	const pageOptions = [];
	for (var i = 1; i <= Math.ceil(idCount / 10); i++) {
		pageOptions.push(<option value={i}>{i}</option>);
	}

	return (
		<div className='Board'>
			<div className=''>
				<div className='flex flex-row'>
					<div className='w-1/3'> </div>
					<div className='w-1/3 flex flex-col'>
						<div className='flex flex-row w-full'>
							<div className='w-full'>
								<button id='current_realized_gains' onClick={handleDurationChange}>Current</button>
							</div>
							<div className='w-full'>
								<button id='alltime_realized_gains' onClick={handleDurationChange}>All Time</button>
							</div>
						</div>
						<div>
							<label>
								CryptoCurrency:{'   '}
								<select className='ml-4 text-zinc-800' onChange={handleCoinChange} value={coin}>
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
								</select >
							</label>
						</div>
					</div>
				</div>
			</div>
			<div className='flex flex-row w-full'>
				<div className='w-1/3 text-center'>
					<h1 className='bg-zinc-700 rounded-t-xl pt-2.5 px-5 w-fit'>Leaderboard</h1>
				</div>
				<div className='w-1/3'>
				</div>
				<div className='mb-0 mr-0'>
						<form value={search} onSubmit={handleSearchSubmit}>
							<label>
								Search:{'   '}
								<input type="text" className="text-zinc-800 pl-2" value={search} onChange={handleSearchChange} />
							</label>
							<input type="submit" value='&#128269;' />
						</form>
				</div>
			</div>
			{isLeaderboardLoaded ? <Profiles duration={duration} profiles={leaderboard} /> : <></>}
			{pageOptions.length > 1 ?
				<label>
					Page:
					<select value={page} onChange={handlePageChange}>
						{pageOptions}
					</select>
				</label> : <></>
			}
		</div>
	)
}

export default Leaderboard;
