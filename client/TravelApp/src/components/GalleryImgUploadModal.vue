<template>
	<ion-header class="questions-header">
		<h2>Upload an image/Create a new album</h2>
	</ion-header>
	<ion-content class="ion-padding">
		<form class="img-upload-form">
			<IKUpload
				:tags="['tag1', 'tag2']"
				:responseFields="['tags']"
				@error="onError"
				@success="onSuccess"
				@progress="onProgress"
				customCoordinates="10,10,100,100"
			/>
			<p v-if="progress">Progress: {{ progress }}%</p>
			<p v-if="uploadErr">Something went wrong!</p>
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
				:disabled="!newURL"
				>Upload
			</ion-button>
		</ion-buttons>
	</ion-toolbar>
</template>

<script lang="ts">
	import { mapGetters, useStore } from "vuex";
	import axios from "axios";

	export default defineComponent({
		data() {
			return {
				album: this.$route.params.country,
				store: useStore(),
				newURL: null,
				progress: null,
				uploadErr: false,
			};
		},
		methods: {
			confirm() {
				const updatedUser = { ...this.userInfo };

				updatedUser.albums.push({
					country: this.album.length > 0 ? this.album : "All",
					url: this.newURL,
				});

				this.patchUserInfo(updatedUser)
					.then((res: any) => {
						this.store.commit("setUserInfo", res.data.user);

						modalController.dismiss(null, "confirm");
					})
					.catch((err) => {
						console.log(err);
						this.uploadErr = true;
						setTimeout(() => {
							this.uploadErr = false;
						}, 5000);
					});
			},
			onSuccess(res: any) {
				this.newURL = res.url;
				this.progress = null;
			},
			onProgress(progress: any) {
				this.progress = progress;
			},
			onError(err: any) {
				console.log("Error" + err);
				this.uploadErr = true;
				setTimeout(() => {
					this.uploadErr = false;
				}, 5000);
			},
			patchUserInfo(update: object) {
				return axios.patch(
					`https://travel-app-api-8nj9.onrender.com/api/users/${this.userInfo._id}`,
					update
				);
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
		modalController,
	} from "@ionic/vue";
	import { defineComponent } from "vue";
	import { IKUpload } from "imagekit-vue3";

	const cancel = () => modalController.dismiss(null, "cancel");
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
