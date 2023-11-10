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
					<input
						class="log-in-input"
						type="email"
						placeholder="Enter email"
					/>
					<input
						class="log-in-input"
						type="password"
						placeholder="Enter password"
					/>
					<ion-button
						>Sign In<ion-icon
							slot="end"
							:icon="logInOutline"
						></ion-icon
					></ion-button>
					<ion-button @click="openModal"
						>Create Account<ion-icon
							slot="end"
							:icon="personAddOutline"
						></ion-icon
					></ion-button>
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
		methods: {
			async openModal() {
				const modal = await modalController.create({
					component: NewUserModal,
				});
				modal.present();
			},
		},
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
		IonButton,
		IonIcon,
		modalController,
	} from "@ionic/vue";

	import NewUserModal from "../components/NewUserModal.vue";
	import { ref, defineComponent } from "vue";

	import { logInOutline, personAddOutline } from "ionicons/icons";
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
	}

	.log-in-input {
		border-radius: 0.5rem;
		width: 100%;
		margin-left: auto;
		margin-right: auto;
		height: 2.5rem;
		text-align: center;
	}
</style>
