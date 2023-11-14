<template>
	<ion-header class="questions-header">
		<h1>Upload an image</h1>
	</ion-header>
	<ion-content class="ion-padding">
		<form class="img-upload-form">
			<ion-input
				label="Album:"
				placeholder="Enter Album name to upload to"
			></ion-input>
			<ion-input
				type="file"
				label="Image:"
				placeholder="Select an image"
			></ion-input>
		</form>
	</ion-content>

	<!-- Toolbar -->
	<ion-toolbar>
		<ion-buttons slot="start">
			<ion-button
				color="medium"
				@click="cancel"
				>Cancel</ion-button
			>
		</ion-buttons>
		<ion-buttons slot="end">
			<ion-button
				@click="confirm"
				:strong="true"
				>Confirm
			</ion-button>
		</ion-buttons>
	</ion-toolbar>
</template>

<script lang="ts">
	import { mapGetters } from "vuex";
	import axios from "axios";

	export default defineComponent({
		data() {
			return {
				album: "",
				selectedFile: null,
			};
		},
		methods: {
			onFileSelected(event: any) {
				this.selectedFile = event.target.files[0];
			},
			onUpload() {
				axios.post("https://ik.imagekit.io/pinpin");
			},
		},
		computed: {
			// Use mapGetters to access the getUser getter from the store
			...mapGetters(["getUserInfo"]),

			// Use a computed property to get the user from the store
			userInfo() {
				return this.getUserInfo;
			},
		},
	});
</script>

<script lang="ts" setup>
	import {
		IonContent,
		IonHeader,
		IonToolbar,
		IonButtons,
		IonButton,
		IonInput,
		modalController,
	} from "@ionic/vue";
	import { defineComponent, ref } from "vue";

	const request = ref();
	const cancel = () => modalController.dismiss(null, "cancel");
	const confirm = () => modalController.dismiss(request.value, "confirm");
</script>

<style scoped>
	.img-upload-form {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
	}
</style>
