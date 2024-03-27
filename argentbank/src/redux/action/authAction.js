import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi, updateUserProfileApi } from '../../service/apiServices';
import { signIn, updateUser } from '../slice/authSlice.js';

// Creates an asynchronous action to handle user login.
export const login = createAsyncThunk(
	'auth/login', // Defines the type of the action.
	async (userData, { dispatch, rejectWithValue }) => {
		// The asynchronous function executing the business logic.
		try {
			// Calls the login API with the user's data.
			const response = await loginApi(userData.email, userData.password);
			// Dispatches the signIn action to update the state with the user's information and token.
			dispatch(signIn({ token: response.data.token, user: response.data.user }));
			// Returns the user's information.
			return response.data.user;
		} catch (error) {
			// In case of error, returns an error message.
			return rejectWithValue(error.message);
		}
	},
);

// Creates an asynchronous action to handle updating the user profile.
export const updateUserProfile = createAsyncThunk(
	'auth/updateUserProfile', // Defines the type of the action.
	async (updatedProfile, { getState, dispatch, rejectWithValue }) => {
		// The asynchronous function executing the business logic.
		try {
			// Gets the token from the current state or localStorage.
			const token = getState().auth.token || localStorage.getItem('authToken');
			// Calls the update profile API with the new information and token.
			const response = await updateUserProfileApi(updatedProfile, token);
			// Dispatches the updateUser action to update the state with the new user's information.
			dispatch(updateUser(response.data.body));
			// Returns the new user's information.
			return response.data.body;
		} catch (error) {
			// In case of error, returns an error message.
			return rejectWithValue(error.message);
		}
	},
);
