import { useState } from 'react';
import { updateUserProfileApi } from '../../service/apiServices';

const SetName = ({ user, onSave, onCancel }) => {
	const [firstName, setFirstName] = useState(user.firstName);
	const [lastName, setLastName] = useState(user.lastName);

	// Defines a function to handle input changes, updating the state with the new value.
	const handleInputChange = (setter) => (e) => {
		setter(e.target.value);
	};

	// Defines an asynchronous function to handle saving changes.
	const handleSave = async () => {
		try {
			// Retrieves the authentication token from localStorage or sessionStorage.
			const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
			// Calls updateUserProfileApi to update the profile with the new first and last names, using the token.
			const response = await updateUserProfileApi({ firstName, lastName }, token);
			console.log('Success:', response.data);
			// Calls the onSave function passed as a prop with the new first and last names.
			onSave({ firstName, lastName });
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<div className='set-name-container'>
			<div className='set-name-input'>
				<input type='text' placeholder='First Name' value={firstName} onChange={handleInputChange(setFirstName)} />
				<input type='text' placeholder='Last Name' value={lastName} onChange={handleInputChange(setLastName)} />
			</div>
			<div className='set-name-btn'>
				<button onClick={handleSave}>Save</button>
				<button onClick={onCancel}>Cancel</button>
			</div>
		</div>
	);
};

export default SetName;
