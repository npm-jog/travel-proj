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
	import { defineComponent, ref } from "vue";
	import { App as CapApp } from "@capacitor/app";
	import { Browser } from "@capacitor/browser";
	import { Auth0Client } from "@auth0/auth0-spa-js";

	export default defineComponent({
		name: "App",
		components: {
			IonApp,
			IonRouterOutlet,
		},
		data() {
			return {
				user: {},
				isLoading: {},
			};
		},
		setup() {
			const { handleRedirectCallback } = useAuth0();
			const { user, isLoading } = useAuth0();
			console.log(user);

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
		},
	});
</script>
