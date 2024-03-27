import { useSelector, useDispatch } from 'react-redux';
import logo from '../../assets/argentBankLogo.png';
import { Link } from 'react-router-dom';
import { signOut } from '../../../redux/slice/authSlice.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
	// Uses the useSelector hook to access the authentication state from the redux store
	const { isAuthenticated, user } = useSelector((state) => state.auth);
	// Uses the useDispatch hook to obtain the dispatch function to send actions
	const dispatch = useDispatch();

	// Defines the handleSignOut function, which will be called upon logout
	const handleSignOut = () => {
		sessionStorage.removeItem('authToken');
		localStorage.removeItem('authToken');
		// Dispatches the signOut action to update the redux store
		dispatch(signOut());
	};

	const AuthLinks = () => (
		<>
			<Link to='/profile' className='main-nav-item'>
				<FontAwesomeIcon icon={faUserCircle} />
				{user?.firstName || 'User'}
			</Link>
			<Link to='/' onClick={handleSignOut} className='main-nav-item'>
				<FontAwesomeIcon icon={faSignOutAlt} /> Logout
			</Link>
		</>
	);

	const UnauthLinks = () => (
		<Link to='/login' className='main-nav-item'>
			<FontAwesomeIcon icon={faUserCircle} />
			Login
		</Link>
	);

	return (
		<header>
			<nav className='main-nav'>
				<Link to='/' className='main-nav-logo'>
					<img className='main-nav-logo-image' src={logo} alt='Argent Bank' />
					<h1 className='sr-only'>Argent Bank</h1>
				</Link>
				{/* Conditionally renders AuthLinks or UnauthLinks based on isAuthenticated */}
				<div>{!isAuthenticated ? <UnauthLinks /> : <AuthLinks />}</div>
			</nav>
		</header>
	);
};

export default Header;
