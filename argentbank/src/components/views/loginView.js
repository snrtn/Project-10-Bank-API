import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signIn } from '../../redux/slice/authSlice.js';
import { loginApi, fetchUserProfile } from '../../service/apiServices.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const LoginView = () => {
	const [credentials, setCredentials] = useState({
		userEmail: '',
		password: '',
		rememberMe: false,
	});
	const [loginError, setLoginError] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const savedRememberMe = localStorage.getItem('rememberMe') === 'true';
		const savedUserEmail = localStorage.getItem('userEmail');
		const savedPassword = localStorage.getItem('password');
		if (savedRememberMe && savedUserEmail && savedPassword) {
			setCredentials({
				userEmail: savedUserEmail,
				password: savedPassword,
				rememberMe: savedRememberMe,
			});
		}
	}, []);

	const handleChange = (e) => {
		const { name, value, checked, type } = e.target;
		setCredentials((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	const handleSignIn = async (e) => {
		e.preventDefault();
		const { userEmail, password, rememberMe } = credentials;

		try {
			// Attempts to login using the API and retrieves the authentication token.
			const authToken = await performLogin(userEmail, password);
			// If the user chose to remember, the token is stored in localStorage, otherwise in sessionStorage.
			storeAuthToken(authToken, rememberMe);
			// If "remember me" is activated, login information is saved in localStorage.
			if (rememberMe) {
				storeLoginInfo(userEmail, password);
			} else {
				// If "remember me" is not activated, login information is removed from localStorage.
				storeLoginInfoDelete();
			}
			// Retrieves user details using the token and updates the Redux store.
			const user = await fetchUserDetails(authToken);
			// Dispatches the signIn action with the token and user information.
			dispatch(signIn({ token: authToken, user }));
			navigate('/profile');
		} catch (error) {
			let errorMessage = 'An unexpected error has occurred.';
			if (error.response) {
				switch (error.response.status) {
					case 400:
						errorMessage = 'Please check your email and password.';
						break;
					case 500:
						errorMessage = 'Server problem, please try again later.';
						break;
					default:
						errorMessage = error.message || errorMessage;
				}
			}
			setLoginError(errorMessage);
			console.error('Login error:', error);
		}
	};

	// Function that calls the login API.
	async function performLogin(email, password) {
		// Calls the login API with the provided email and password.
		const response = await loginApi(email, password);
		// Extracts the authentication token from the API response.
		const authToken = response.data.body.token;
		// Checks the validity of the token format. Throws an exception if the format is incorrect.
		if (!authToken || authToken.split('.').length !== 3) {
			throw new Error('The token format is incorrect or missing.');
		}
		return authToken;
	}

	// Function that retrieves the connected user's details.
	async function fetchUserDetails(token) {
		// Retrieves user details from the authentication token.
		const userResponse = await fetchUserProfile(token);
		// Returns the user information contained in the response.
		return userResponse.data.body;
	}

	function storeAuthToken(token, rememberMe) {
		if (rememberMe) {
			localStorage.setItem('authToken', token);
			localStorage.setItem('rememberMe', 'true');
		} else {
			sessionStorage.setItem('authToken', token);
		}
	}

	function storeLoginInfo(email, password) {
		localStorage.setItem('userEmail', email);
		localStorage.setItem('password', password);
	}

	function storeLoginInfoDelete(email, password) {
		localStorage.removeItem('userEmail', email);
		localStorage.removeItem('password', password);
		localStorage.removeItem('rememberMe', 'false');
	}

	return (
		<main className='main bg-dark'>
			<section className='sign-in-content'>
				<FontAwesomeIcon icon={faUserCircle} className='sign-in-icon' />
				<h1>Sign In</h1>
				{loginError && <div className='login-error'>{loginError}</div>}
				<form>
					<div className='input-wrapper'>
						<label htmlFor='userEmail'>Email</label>
						<input type='email' id='userEmail' name='userEmail' value={credentials.userEmail} onChange={handleChange} />
					</div>
					<div className='input-wrapper'>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							id='password'
							name='password'
							value={credentials.password}
							onChange={handleChange}
							autoComplete='current-password'
						/>
					</div>
					<div className='input-remember'>
						<input
							type='checkbox'
							id='remember-me'
							name='rememberMe'
							checked={credentials.rememberMe}
							onChange={handleChange}
						/>
						<label htmlFor='remember-me'>Remember me</label>
					</div>
					<button type='button' onClick={handleSignIn} className='sign-in-button'>
						Sign In
					</button>
				</form>
			</section>
		</main>
	);
};

export default LoginView;
