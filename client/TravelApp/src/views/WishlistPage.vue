<template>
	<ion-page>
		<ion-content
			:fullscreen="true"
			id="main-content"
			ion-padding
		>
			<div class="wishlist-section">
				<h1>Your Wishlist</h1>
			</div>

			<ion-card
				v-for="(country, index) in userInfo.wishlist"
				:key="index"
				class="card"
			>
				<ion-card-title class="title">{{ country }}</ion-card-title>
				<img
					:src="`${imagesCountry[index]}`"
					class="image-country"
				/>
				<div class="button-container">
					<ion-button
						@click="navigateTo(`/country/${country}`)"
						class="button"
						>View more</ion-button
					>

					<ion-button
						class="button"
						color="danger"
						@click="patchUser(`${country}`)"
						>Remove</ion-button
					>
				</div>
			</ion-card>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
	import router from "@/router";
	import { mapGetters, useStore } from "vuex";
	import { defineComponent } from "vue";
	import {
		IonPage,
		IonContent,
		IonCard,
		IonButton,
		IonCardTitle,
	} from "@ionic/vue";
	import axios from "axios";
	export default defineComponent({
		components: {
			IonPage,
			IonContent,
			IonCard,
			IonCardTitle,
			IonButton,
		},
		data() {
			return {
				imagesCountry: [] as any,
				store: useStore(),
			};
		},
		computed: {
			// Use mapGetters to access the getUser getter from the store
			...mapGetters(["getUserInfo"]),

			// Use a computed property to get the user from the store
			userInfo() {
				return this.getUserInfo;
			},
		},
		methods: {
			navigateTo(x: any) {
				router.push({ path: x });
			},
			async loadImages() {
				const imagePromises = this.userInfo.wishlist.map((wish: any) => {
					return axios.get(
						`https://travel-app-api-8nj9.onrender.com/api/country_data/images/${wish}`
					);
				});

				try {
					const countriesImages = await Promise.all(imagePromises);
					countriesImages.forEach((country) => {
						this.imagesCountry.push(country.data.images[0].src.original);
					});
				} catch (err) {
					console.log(err);
				}
			},

			async patchUser(country: string) {
				const newWishlist = [] as any;
				this.userInfo.wishlist.forEach((wish: string) => {
					if (wish !== country) {
						newWishlist.push(wish);
					}
				});

				const newUserInfo = {
					_id: this.userInfo._id,
					forename: this.userInfo.forename,
					surname: this.userInfo.surname,
					username: this.userInfo.username,
					email: this.userInfo.email,
					avatar_url: this.userInfo.avatar_url,
					visited_locations: this.userInfo.visited_locations,
					wishlist: newWishlist,
					albums: this.userInfo.albums,
				};

				this.store.commit("setUserInfo", newUserInfo);
				try {
					await axios.patch(
						`https://travel-app-api-8nj9.onrender.com/api/users/${this.userInfo._id}`,
						newUserInfo
					);
				} catch (err) {
					console.log(err);
				}
			},
		},
		mounted() {
			this.loadImages();
		},
	});
</script>

<style scoped>
	.card {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.card > * {
		margin: 0.5rem;
	}
	.image-country {
		width: 30%;
		height: 30%;
	}
	.wishlist-section {
		margin-top: 3.5rem;
		text-align: center;
	}

	.button {
		padding: 0.3rem;
		width: 48%;
	}
</style>
