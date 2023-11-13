import { createStore } from "vuex";

const store = createStore({
	state() {
		return {
			username: null,
			userEmail: null,
			userId: null,
		};
	},
	mutations: {
		setUsername(state, username) {
			state.username = username;
		},
		setUserEmail(state, userEmail) {
			state.userEmail = userEmail;
		},
		setUserId(state, userId) {
			state.userId = userId;
		},
	},
	getters: {
		getUsername(state) {
			return state.username;
		},
		getUserEmail(state) {
			return state.userEmail;
		},
		getUserId(state) {
			return state.userId;
		},
	},
});

export default store;
