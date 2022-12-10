import React from 'react';

function Profiles(props) {

	const anonymousPhoto = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

	const profiles = props.data.sort((a,b) => {
	if (a.current_gain > b.current_gain) {
		return 1;
	} else if (a.current_gain < b.current_gain) {
		return -1;
	} else {
		return 0;
	}
	})
	.map((user, index) => {
		return (
			<div className='Profiles'>
				<div className='flex Profile'>
					{index + 1}
					<img src={anonymousPhoto} height='64' width='64'></img>
					<div className='Profile-name'>{user.user_id}</div>
					<div className='Profile-score'>${user.current_gain}</div>
				</div>
			</div>
		)
	});

	return (
		<>
		<div class='flex w-4'>
			<div>Rank</div>
			<div>User</div>
			<div>Gains</div>
		</div>
		<div>
				{profiles}
		</div>
		</>
	)
}

export default Profiles;