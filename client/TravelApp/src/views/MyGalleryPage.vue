<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<main>
				<div class="title-div center">
					<h1>{{ countryRoute }}</h1>
				</div>
				<Carousel :pics="countryPics" />

				<div class="buttons-div">
					<!-- <ion-button
						class="ion-padding"
						expand="block"
					>
						<ion-icon
							slot="icon-only"
							:icon="trashOutline"
						></ion-icon>
					</ion-button> -->
					<ion-button
						class="ion-padding"
						expand="block"
						@click="openModal"
					>
						<ion-icon
							slot="icon-only"
							:icon="addOutline"
						></ion-icon>
					</ion-button>
				</div>
			</main>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
	import { mapGetters } from "vuex";
	import Carousel from "@/components/Carousel.vue";
	import { IonPage, IonContent, IonButton, IonIcon } from "@ionic/vue";
	import { modalController } from "@ionic/vue";
	import GalleryImgUploadModal from "@/components/GalleryImgUploadModal.vue";

	export default defineComponent({
		data() {
			return {
				countryRoute: this.$route.params.country,
				countryPics: null,
			};
		},
		methods: {
			setGallery() {
				this.countryPics = this.userInfo.albums
					.filter((pic: any) => pic.country === this.countryRoute)
					.map((pic: any) => pic.url);
			},
			async openModal() {
				const modal = await modalController.create({
					component: GalleryImgUploadModal,
				});
				modal.present();
			},
		},
		components: {
			IonPage,
			IonContent,
			IonButton,
			IonIcon,
		},
		computed: {
			// Use mapGetters to access the getUser getter from the store
			...mapGetters(["getUserInfo"]),

			// Use a computed property to get the user from the store
			userInfo() {
				return this.getUserInfo;
			},
		},
		mounted() {
			this.setGallery();
		},
		watch: {
			userInfo: "setGallery", // Watch userInfo to update gallery on change
		},
	});
</script>

<script setup lang="ts">
	import axios from "axios";
	import { addOutline, trashOutline } from "ionicons/icons";
	import { defineComponent } from "vue";
</script>

<style scoped>
	main {
		margin-top: 1rem;
		padding: 3rem 1rem 1rem !important;
		display: grid;
		grid-gap: 1rem;
		grid-template-columns: 100%;
		grid-template-rows: 0.5fr 5fr minmax(3rem, 5rem);
		height: 90vh;
		height: 90dvh;
	}
	* {
		box-sizing: border-box;
	}

	h1 {
		text-align: center;
	}

	.title-div {
		grid-row: 1 / 2;
	}

	.buttons-div {
		display: flex;
		justify-content: space-evenly;
		grid-row: 3 / 4;
	}

	.buttons-div ion-button {
		width: 40%;
		height: 20%;
		color: black;
	}

	Carousel {
		grid-row: 2 / 3;
	}
</style>
