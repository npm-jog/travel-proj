import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      username: null,
      userEmail: null,
      userId: null,
      userForename: null,
      userSurname: null,
      userAvatar: null,
      userVisitedLocations: null,
      userWishlist: null,
      userAlbums: null,
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
    setUserForename(state, userForename) {
      state.userForename = userForename;
    },
    setUserSurname(state, userSurname) {
      state.userSurname = userSurname;
    },
    setUserAvatar(state, userAvatar) {
      state.userAvatar = userAvatar;
    },
    setUserVisitedLocations(state, userVisitedLocations) {
      state.userVisitedLocations = userVisitedLocations;
    },
    setUserWishlist(state, userWishlist) {
      state.userWishlist = userWishlist;
    },
    setUserAlbums(state, userAlbums) {
      state.userAlbums = userAlbums;
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
    getUserForename(state) {
      return state.userForename;
    },
    getUserSurname(state) {
      return state.userSurname;
    },
    getUserAvatar(state) {
      return state.userAvatar;
    },
    getUserVisitedLocations(state) {
      return state.userVisitedLocations;
    },
    getUserWishlist(state) {
      return state.userWishlist;
    },
    getUserAlbums(state) {
      return state.userAlbums;
    },
  },
});

export default store;
