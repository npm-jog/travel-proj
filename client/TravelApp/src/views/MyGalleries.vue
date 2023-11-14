<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<h1 class="my-galleries-title">My Galleries</h1>
			<ion-card
				v-if="userInfo"
				class="album-div"
				v-for="x in albumNames"
				@click="navigateTo(x.albumName)"
			>
				<ion-card-title v-if="userInfo"
					>{{ userInfo.username }}'s Album of {{ x.albumName }}
				</ion-card-title>
				<ion-img
					v-if="userInfo"
					class="album-card-image"
					:src="x.firstImage"
				>
				</ion-img>
			</ion-card>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
	import { mapGetters } from "vuex";
	import router from "@/router";
	import {
		IonPage,
		IonCard,
		IonCardTitle,
		IonImg,
		IonContent,
	} from "@ionic/vue";
	export default defineComponent({
		components: {
			IonPage,
			IonCard,
			IonCardTitle,
			IonImg,
			IonContent,
		},
		data() {
			return {
				albumNames: [],
			};
		},
		methods: {
			navigateTo(x: { albumName: string; firstImage: string }) {
				router.push({ path: `/mygalleries/${x}` });
			},
			uniqueCountries() {
				const addedAlbums = new Set();

				if (this.userInfo && this.userInfo.albums) {
					this.userInfo.albums.forEach(
						(image: { albumName: string; url: string }) => {
							if (!addedAlbums.has(image.albumName)) {
								this.albumNames.push({
									albumName: image.albumName,
									firstImage: image.url,
								});
								addedAlbums.add(image.albumName);
							}
						}
					);
				}
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
		mounted() {
			this.uniqueCountries();
		},
	});
</script>

<script setup lang="ts">
	import { defineComponent } from "vue";
</script>

<style>
	.my-galleries-title {
		text-align: center;
	}

	.album-div {
		text-align: center;
		height: 10rem;
	}

	.album-card-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
