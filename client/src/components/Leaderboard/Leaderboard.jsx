import React, {useState} from 'react';
import Profiles from './Profiles.jsx';

function Leaderboard() {
	const [duration, setDuration] = useState('current');
	const [coin, setCoin] = useState('US_Dollar');

	const handleDurationChange = (event) => {
		setDuration(event.target.id);
	}
	const handleCoinChange = (event) => {
		setCoin(event.target.value);
		//Axios GET leaderboard coin
	}

	const data = [
		{
			user_id: 'Abdiel',
			current_gain: Math.floor(Math.random() * 9999),
			// highest_total_gains: 548321,
			coin_name: 'USDollar'
		},
		{
			user_id: 'Alex',
			current_gain: Math.floor(Math.random() * 9999),
			// highest_total_gains: 241378,
			coin_name: 'USDollar'
		},
		{
			user_id: 'David',
			current_gain: Math.floor(Math.random() * 9999),
			// highest_total_gains: 915926,
			coin_name: 'USDollar'
		},
		{
			user_id: 'Duke',
			current_gain: Math.floor(Math.random() * 9999),
			// highest_total_gains: 481031,
			coin_name: 'USDollar'
		},
		{
			user_id: 'Dongning',
			current_gain: Math.floor(Math.random() * 9999),
			// highest_total_gains: 973931,
			coin_name: 'USDollar'
		},
		{
			user_id: 'Fiona',
			current_gain: Math.floor(Math.random() * 9999),
			// highest_total_gains: 960904,
			coin_name: 'USDollar'
		},
		{
			user_id: 'Morgan',
			current_gain: Math.floor(Math.random() * 9999),
			// highest_total_gains: 645224,
			coin_name: 'USDollar'
		},
		{
			user_id: 'Nicholas',
			current_gain: Math.floor(Math.random() * 9999),
			// highest_total_gains: 934270,
			coin_name: 'USDollar'
		}
	];

	return (
		<div className='Board'>
			<h1 className='content-center header-title'>Leaderboard</h1>
			<div className='content-center header-display'>
				<button id='current' onClick={handleDurationChange}>Current</button>
				<button id='all-time'onClick={handleDurationChange}>All Time</button>
				<div>
					<label>
						CryptoCurrency:
						<select onChange={handleCoinChange}>
							<option value='USDollar'>US Dollar</option>
							<option value='Bitcoin'>BTC</option>
							<option value='Ethereum'>ETH</option>
							<option value='Tether'>USDT</option>
							<option value='BNB'>BNB</option>
							<option value='Cardano'>ADA</option>
							<option value='XRP'>XRP</option>
							<option value='Solana'>SOL</option>
							<option value='Dogecoin'>DOGE</option>
							<option value='Polygon'>MATIC</option>
							<option value='Polkadot'>DOT</option>
						</select>
					</label>
				</div>
			</div>

			<Profiles data={data}/>

		</div>
  )
}

export default Leaderboard;