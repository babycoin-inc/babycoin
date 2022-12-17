import React from 'react';

function Profiles(props) {
	const anonymousPhoto = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
	let profiles = [];
	if (Array.isArray(props.profiles)) {
		profiles = props.profiles
		.sort((a,b) => {
			if (props.sort===true) {
				if(Number(a.row_number) > Number(b.row_number)) {
					return 1;
				} else {
					return -1;
				}
			} else {
				if(Number(a.row_number) < Number(b.row_number)) {
					return 1;
				} else {
					return -1;
				}
			}
		})
		.map((user, index) => {
			return (
				<tr>
					<th>{user.row_number}</th>
					<th className='Profile-user'>
						<img src={anonymousPhoto} height='64' width='64'></img>
						{user.username}
					</th>
					<th className='Profile-score'>${user[props.duration]}</th>
				</tr>
			)
		});
	}

	return (
		<table>
			<tr>
				<th>Rank</th>
				<th>User</th>
				<th>Realized Gains in USD($)</th>
			</tr>
			{profiles}
		</table>

	)
}

export default Profiles;
