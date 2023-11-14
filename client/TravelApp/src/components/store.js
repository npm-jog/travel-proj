import { createStore } from "vuex";

const store = createStore({
	state() {
		return {
			userInfo: null,
		};
	},
	mutations: {
		setUserInfo(state, userInfo) {
			state.userInfo = userInfo;
		},
	},
	getters: {
		getUserInfo(state) {
			return state.userInfo;
		},
	},
});

export default store;
