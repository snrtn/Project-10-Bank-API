import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile } from '../../redux/action/authAction.js';
import AccountSection from '../profile/accountSection.js';
import SetName from '../profile/setName.js';

const ProfileView = () => {
	const [editing, setEditing] = useState(false);
	// Uses the useSelector hook to access the current user object in the Redux store's auth state.
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();
	// Uses the useSelector hook to access the isAuthenticated boolean value in the Redux store's auth state, indicating if the user is authenticated.
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	const handleSaveName = (updatedUserData) => {
		dispatch(updateUserProfile(updatedUserData)); // Dispatches the updateUserProfile action to update the user's data.
		setEditing(false); // Uses setEditing to set the editing state to false and disable the name editing mode.
	};

	return (
		<main className='main bg-dark'>
			<div className='header'>
				<h1>
					Welcome back
					<br />
					{isAuthenticated ? (
						editing ? (
							<SetName user={user} onSave={handleSaveName} onCancel={() => setEditing(false)} />
						) : (
							<>
								{`${user.firstName} ${user.lastName}`}
								<button className='edit-button' onClick={() => setEditing(true)}>
									Edit name
								</button>
							</>
						)
					) : (
						'Guest'
					)}
				</h1>
			</div>
			<h2 className='sr-only'>Accounts</h2>
			<AccountSection title='Argent Bank Checking (x8349)' amount='$2,082.79' description='Available Balance' />
			<AccountSection title='Argent Bank Savings (x6712)' amount='$10,928.42' description='Available Balance' />
			<AccountSection title='Argent Bank Credit Card (x8349)' amount='$184.30' description='Current Balance' />
		</main>
	);
};

export default ProfileView;
