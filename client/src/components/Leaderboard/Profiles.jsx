import React from 'react';
import { useState } from 'react';


function Profiles(props) {
	const anonymousPhoto = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

	const [sortGains, setSortGains] = useState(0);
	const [sortUser, setSortUser] = useState(0);


	const handleSortChange = (event) => {
		if (event.target.id === 'gains') {
			setSortUser(2);
			setSortGains((sortGains + 1) % 2);

		}
		if (event.target.id === 'user') {
			setSortGains(2);
			setSortUser((sortUser + 1) % 3);

		}
	}

	let sorted = [];

	if (sortUser === 0) {
		sorted = props.profiles
			.sort((a, b) => {
				if (a.username > b.username) {
					return 1;
				} else {
					return -1;
				}
			})
	} else if (sortUser === 1) {
		sorted = props.profiles
			.sort((a, b) => {
				if (a.username < b.username) {
					return 1;
				} else {
					return -1;
				}
			})
	} else if (sortUser === 2 || sortGains === 2) {
		sorted = props.profiles;
	}

	if (sortGains === 0) {
		sorted = props.profiles
			.sort((a, b) => {
				if (Number(a.row_number) > Number(b.row_number)) {
					return 1;
				} else {
					return -1;
				}

			})
	} else if (sortGains === 1) {
		sorted = props.profiles
			.sort((a, b) => {
				if (Number(a.row_number) < Number(b.row_number)) {
					return 1;
				} else {
					return -1;
				}

			})
	}


	let profiles = [];
	if (Array.isArray(sorted)) {
		profiles = sorted
			.map((user, index) => {
				return (
					<tbody className='bg-zinc-500'>
						<tr className='border-t border-zinc-600 hover:bg-zinc-400'>
							<th>{user.row_number}</th>
							<th className='Profile-user'>
								<div>
									<img src={anonymousPhoto} height='64' width='64'></img>
									{user.username}

								</div>
							</th>
							<th className='Profile-score'>${user[props.duration]}</th>
						</tr>
					</tbody>
				)
			});
	}

	let columnName = 'Realized Gains';
	if (props.duration === 'highest_realized_gains') {
		columnName = 'Highest Realized Gains';
	}

	return (
		<table className='w-full mx-auto table-auto'>
			<thead className='bg-zinc-600 sticky top-0'>
				<tr>
					<th onClick={handleSortChange} id='gains'>Rank</th>
					<th onClick={handleSortChange} id='user'>User</th>
					<th onClick={handleSortChange} id='gains'>{columnName} in USD($)</th>
				</tr>
			</thead>
			{profiles}
		</table>

	)
}

export default Profiles;
