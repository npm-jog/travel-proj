<template>
	<ion-button
		class="logout-button ion-padding"
		@click="onLogout"
		>Log out</ion-button
	>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { useAuth0 } from "@auth0/auth0-vue";
	import { Browser } from "@capacitor/browser";
	import { IonButton } from "@ionic/vue";

	export default defineComponent({
		components: {
			IonButton,
		},
		setup() {
			const { logout } = useAuth0();

			const onLogout = async () => {
				console.log("logout function activated");
				await logout({
					logoutParams: {
						returnTo: "http://localhost:8100/login",
					},
					openUrl: (url: string) =>
						Browser.open({
							url,
							windowName: "_self",
						}),
				});
			};

			return {
				onLogout,
			};
		},
	});
</script>

<style>
	.logout-button {
		width: 100%;
	}
</style>
