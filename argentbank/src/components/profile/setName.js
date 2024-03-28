import { useState } from 'react';
import { updateUserProfileApi } from '../../service/apiServices';

const SetName = ({ user, onSave, onCancel }) => {
	const [firstName, setFirstName] = useState(user.firstName);
	const [lastName, setLastName] = useState(user.lastName);
	const [error, setError] = useState('');

	const handleInputChange = (setter) => (e) => {
		setter(e.target.value);
	};

	const handleSave = async () => {
		try {
			const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
			const response = await updateUserProfileApi({ firstName, lastName }, token);
			console.log('Success:', response);
			onSave({ firstName, lastName });
		} catch (error) {
			if (error.response) {
				switch (error.response.status) {
					case 400:
						setError('Invalid request. Please check the data.');
						break;
					case 401:
						setError('Unauthorized. Please log in again.');
						break;
					case 404:
						setError('Profile not found. Please try again.');
						break;
					case 500:
						setError('Server error. Please try again later.');
						break;
					default:
						setError('An unexpected error occurred.');
				}
			} else {
				setError('Network error. Please check your internet connection.');
			}
			console.error('Error:', error);
		}
	};

	return (
		<div className='set-name-container'>
			{error && <p className='error'>{error}</p>}
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
