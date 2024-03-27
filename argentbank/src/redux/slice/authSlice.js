import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isAuthenticated: false,
	token: null,
	user: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		// Reducers to modify the state
		signIn: (state, action) => {
			// Called when a user logs in
			state.isAuthenticated = true; // Updates the authentication state to true
			state.token = action.payload.token; // Updates the token with the one provided in the action
			state.user = action.payload.user; // Updates the user's information with the ones provided in the action
		},
		signOut: (state) => {
			// Called when a user logs out
			state.isAuthenticated = false; // Updates the authentication state to false
			state.token = null; // Resets the token
			state.user = null; // Resets the user's information
		},
		updateUser: (state, action) => {
			// Called to update the user's information
			state.user = action.payload; // Updates the user's information with the ones provided in the action
		},
	},
});

// Exports the action creators created by the slice.
// These functions can be used in components to dispatch actions.
export const { signIn, signOut, updateUser } = authSlice.actions;

// Exports the slice's reducer.
// This reducer will be used by the Redux store.
export default authSlice.reducer;
