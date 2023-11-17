<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<main>
				<h1>{{ countryRoute }}</h1>
				<Carousel :pics="countryPics" />

				<div class="buttons-div">
					<ion-button
						@click="navigateTo('/mygalleries')"
						class="button galleries-button"
						>Galleries</ion-button
					>
					<ion-button
						class="button"
						@click="openModal"
						>+</ion-button
					>
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
	import router from "@/router";
	import GalleryImgUploadModal from "@/components/GalleryImgUploadModal.vue";

	export default defineComponent({
		data() {
			return {
				countryRoute: this.$route.params.country,
				countryPics: null,
			};
		},
		methods: {
			navigateTo(x: any) {
				router.push({ path: x });
			},
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
		align-items: center;
		justify-content: center;
	}
	.buttons-div > * {
		width: 20%;
	}

	Carousel {
		grid-row: 2 / 3;
	}

	.country-album-back-button {
		margin-top: 4rem;
		margin-left: -1.5rem;
		text-align: center;
		--background: transparent;
		--border: none;
	}

	.galleries-button {
		font-size: 0.7rem;
	}
</style>
