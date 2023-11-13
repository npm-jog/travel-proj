<template>
	<ion-app>
		<side-menu />
		<nav-bar />

		<ion-router-outlet id="main-content" />
	</ion-app>
</template>

<script lang="ts">
	import { useAuth0 } from "@auth0/auth0-vue";
	import { IonApp, IonRouterOutlet } from "@ionic/vue";
	import { defineComponent, ref, watchEffect, toRaw } from "vue";
	import { App as CapApp } from "@capacitor/app";
	import { Browser } from "@capacitor/browser";
	import { useStore } from "vuex";
	import axios from "axios";

	export default defineComponent({
		name: "App",
		components: {
			IonApp,
			IonRouterOutlet,
		},
		setup() {
			const { handleRedirectCallback, user, isLoading } = useAuth0();
			const store = useStore();

			// Handle the 'appUrlOpen' event and call `handleRedirectCallback`
			CapApp.addListener("appUrlOpen", async ({ url }) => {
				if (
					url.includes("state") &&
					(url.includes("code") || url.includes("error"))
				) {
					await handleRedirectCallback(url);
				}
				// No-op on Android
				await Browser.close();
			});

			// Use watchEffect to observe changes in user and isLoading
			watchEffect(() => {
				if (!isLoading.value && user.value) {
					const userInfo = toRaw(user.value);
					axios
						.get(
							`https://travel-app-api-8nj9.onrender.com/api/users?email=${userInfo.email}`
						)
						.then((res: any) => {
							console.log("Sucessfully found user")
							store.commit("setUsername", res.data.user.username);
							store.commit("setUserEmail", res.data.user.email);
							store.commit("setUserId", res.data.user._id);
							store.commit("setUserForename", res.data.user.forename);
							store.commit("setUserSurname", res.data.user.surname);
							store.commit("setUserAvatar", res.data.user.avatar_url);
							store.commit("setUserVisitedLocations", res.data.user.visited_locations);
							store.commit("setUserWishlist", res.data.user.wishlist);
							store.commit("setUserAlbums", res.data.user.albums);
						})
						.catch((err: any) => {
							if (err.response.data.msg === "User does not exist") {
								console.log("user did not exist, posting a new user...", )
								console.log(userInfo.nickname)
								axios
									.post("https://travel-app-api-8nj9.onrender.com/api/users", {
										forename: userInfo.given_name, 
										surname: userInfo.family_name || "Surname",
										email: userInfo.email,
										username: userInfo.nickname || `${userInfo.given_name}${userInfo.email.slice(0,2)}`,
									})
									.then((res: any) => {
										console.log("new user posted, setting new user");
										store.commit("setUsername", res.data.user.username);
										store.commit("setUserEmail", res.data.user.email);
										store.commit("setUserId", res.data.user._id);
										store.commit("setUserForename", res.data.user.forename);
										store.commit("setUserSurname", res.data.user.surname);
										store.commit("setUserAvatar", res.data.user.avatar_url);
										store.commit("setUserVisitedLocations", res.data.user.visited_locations);
										store.commit("setUserWishlist", res.data.user.wishlist);
										store.commit("setUserAlbums", res.data.user.albums);
									})
									.catch((err: any) => {});
							} else {
								console.log("get user failed with different message: " + err);
							}
						});
				} else {
					// User information is not available yet
					console.log("User information is still loading...");
				}
			});

			return {
				user,
				isLoading,
			};
		},
	});
</script>
