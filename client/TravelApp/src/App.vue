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

	export default defineComponent({
		name: "App",
		components: {
			IonApp,
			IonRouterOutlet,
		},
		setup() {
			const { handleRedirectCallback, user, isLoading } = useAuth0();

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
					console.log(userInfo.name);
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
