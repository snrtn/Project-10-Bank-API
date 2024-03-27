import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/common/navigation/header.js';
import Footer from './components/common/navigation/footer.js';
import NotFound from './components/common/error/notFound.js';
import Home from './components/views/homeView.js';
import Login from './components/views/loginView.js';
import Profile from './components/views/profileView.js';
import { useSelector } from 'react-redux';

const Layout = () => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/login' element={<Login />} />
			<Route path='/profile' element={isAuthenticated ? <Profile /> : <Navigate replace to='/login' />} />
			<Route path='*' element={<NotFound />} />
		</Routes>
	);
};

const App = () => (
	<Router>
		<Header />
		<Layout />
		<Footer />
	</Router>
);

export default App;
