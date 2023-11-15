<template>
	<ion-app>
		<template v-if="!user">
			<LoginPage />
		</template>
		<template v-else-if="!userRetrieved && user">
			<ion-loading
				isOpen="user"
				message="Loading..."
				spinner="circles"
			></ion-loading>
		</template>

		<template v-else>
			<side-menu />
			<nav-bar />

			<ion-router-outlet id="main-content" />
		</template>
	</ion-app>
</template>

<script lang="ts">
	import { useAuth0 } from "@auth0/auth0-vue";
	import { IonApp, IonRouterOutlet, IonLoading } from "@ionic/vue";
	import { defineComponent, ref, watchEffect, toRaw, reactive } from "vue";
	import { App as CapApp } from "@capacitor/app";
	import { Browser } from "@capacitor/browser";
	import { useStore } from "vuex";
	import axios from "axios";
	import LoginPage from "@/views/LoginPage.vue";

	export default defineComponent({
		name: "App",
		components: {
			IonApp,
			IonRouterOutlet,
			LoginPage,
			IonLoading,
		},
		setup() {
			const { handleRedirectCallback, user, isLoading } = useAuth0();
			const store = useStore();
			const userRetrieved = ref(false);

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

			// watching for user information being retrieved from our database
			watchEffect(() => {
				if (store.state.userInfo) {
					userRetrieved.value = true;
				}
			});

			// Use watchEffect to observe changes in user and isLoading
			watchEffect(() => {
				if (!isLoading.value && user.value) {
					const userTemp = toRaw(user.value);
					axios
						.get(
							`https://travel-app-api-8nj9.onrender.com/api/users?email=${userTemp.email}`
						)
						.then((res: any) => {
							console.log("Sucessfully found user");
							store.commit("setUserInfo", res.data.user);
						})
						.catch((err: any) => {
							if (err.response.data.msg === "User does not exist") {
								console.log("user did not exist, posting a new user...");
								console.log(userTemp.nickname);
								axios
									.post("https://travel-app-api-8nj9.onrender.com/api/users", {
										forename: userTemp.given_name,
										surname: userTemp.family_name || "Surname",
										email: userTemp.email,
										username:
											userTemp.nickname ||
											`${userTemp.given_name}${userTemp.email.slice(0, 2)}`,
									})
									.then((res: any) => {
										console.log("new user posted, setting new user");
										console.log(res.data.user);
										store.commit("setUserInfo", res.data.user);
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
				userRetrieved,
			};
		},
	});
</script>
