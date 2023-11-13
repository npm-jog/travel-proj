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
							store.commit("setUsername", res.data.user.username);
							store.commit("setUserEmail", res.data.user.email);
							store.commit("setUserId", res.data.user._id);
						})
						.catch((err) => {
							if (err.response.data.msg === "User does not exist") {
								axios
									.post("https://travel-app-api-8nj9.onrender.com/api/users", {
										forename: userInfo.given_name,
										surname: userInfo.family_name,
										email: userInfo.email,
										username: userInfo.nickname,
									})
									.then((res: any) => {
										console.log("new user posted, setting new user");
										store.commit("setUsername", res.data.user.username);
										store.commit("setUserEmail", res.data.user.email);
										store.commit("setUserId", res.data.user._id);
									})
									.catch((err) => {});
							} else {
								console.log("get user failed with differnt message: " + err);
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
