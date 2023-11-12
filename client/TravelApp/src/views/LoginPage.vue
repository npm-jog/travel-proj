<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title class="ion-text-center">Sign in to begin</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content class="ion-padding">
			<div class="login-form-div">
				<form class="sign-in-form">
					<LoginButton />
				</form>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
	export default defineComponent({
		data() {
			return {
				message: ref(
					"This modal example uses the modalController to present and dismiss modals."
				),
			};
		},
		methods: {},
		components: {},
	});
</script>

<script setup lang="ts">
	import {
		IonPage,
		IonHeader,
		IonToolbar,
		IonTitle,
		IonContent,
		modalController,
	} from "@ionic/vue";

	import LoginButton from "../components/LoginButton.vue";
	import { ref, defineComponent } from "vue";
</script>

<style>
	.login-form-div {
		height: 115%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-image: url("../../login-background.jpg");
		background-size: cover;
		background-position: right;
		margin: -10% -10%; /* old browsers fallback */
		margin: calc(50% - 30vh) calc(50% - 50vw);
	}

	.sign-in-form {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr 1fr;
		grid-gap: 1rem;
		width: 50%;
	}
</style>
