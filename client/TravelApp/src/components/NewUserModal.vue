<template>
	<ion-header>
		<ion-toolbar>
			<ion-buttons slot="start">
				<ion-button
					color="medium"
					@click="cancel"
					>Cancel</ion-button
				>
			</ion-buttons>
			<h5 class="new-user-title">Create Account</h5>
			<ion-buttons slot="end">
				<ion-button
					@click="confirm"
					:strong="true"
					>Confirm</ion-button
				>
			</ion-buttons>
		</ion-toolbar>
	</ion-header>
	<ion-content class="ion-padding">
		<form class="new-user-form">
			<ion-item class="new-user-input">
				<ion-input
					label-placement="stacked"
					label="Enter your email"
					type="email"
					placeholder="email@domain.com"
				></ion-input>
			</ion-item>
			<ion-item class="new-user-input">
				<ion-input
					label-placement="stacked"
					label="Enter your forename"
					placeholder="Forename"
				></ion-input>
			</ion-item>
			<ion-item class="new-user-input">
				<ion-input
					label-placement="stacked"
					label="Enter your surname"
					placeholder="Surname"
				></ion-input>
			</ion-item>
			<ion-item class="new-user-input">
				<ion-input
					label-placement="stacked"
					label="Choose a username"
					placeholder="Username"
				></ion-input>
			</ion-item>
			<ion-item class="new-user-input">
				<ion-input
					label-placement="stacked"
					label="Choose your password"
					placeholder="Password"
				></ion-input>
			</ion-item>
			<ion-item class="new-user-input">
				<ion-input
					label-placement="stacked"
					label="Confirm password"
					placeholder="Password"
				></ion-input>
			</ion-item>
		</form>
	</ion-content>
</template>

<script lang="ts" setup>
	import {
		IonContent,
		IonHeader,
		IonTitle,
		IonToolbar,
		IonButtons,
		IonButton,
		IonItem,
		IonInput,
		modalController,
	} from "@ionic/vue";
	import { defineComponent, ref } from "vue";
	const name = ref();

	const cancel = () => modalController.dismiss(null, "cancel");
	const confirm = () => modalController.dismiss(name.value, "confirm");
</script>

<style>
	.new-user-form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 100%;
	}

	.new-user-input {
		margin-top: 1rem;
	}
	.new-user-title {
		text-align: center;
	}
</style>
