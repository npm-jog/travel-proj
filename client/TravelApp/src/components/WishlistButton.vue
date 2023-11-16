<template>
	<ion-button
		class="wishlist-button"
		v-if="!inWishlist"
		@click="addToWishlist"
		>Add to wishlist
		<ion-icon
			slot="end"
			icon="flag"
		></ion-icon
	></ion-button>
	<ion-button
		class="wishlist-button"
		v-else
		@click="removeFromWishlist"
		>Remove from wishlist
		<ion-icon
			slot="end"
			icon="flag"
		></ion-icon
	></ion-button>
</template>

<script lang="ts">
	import { defineComponent, defineProps, ref } from "vue";
	import { IonButton, IonIcon } from "@ionic/vue";
	import { mapGetters, useStore } from "vuex";
	import axios from "axios";
	import { flag } from "ionicons/icons";

	export default defineComponent({
		props: {
			country: String,
		},
		data() {
			return {
				store: useStore(),
				flag,
				inWishlist: false,
			};
		},
		components: {
			IonButton,
			IonIcon,
		},
		methods: {
			addToWishlist() {
				console.log(this.country);
				const updatedUser = { ...this.userInfo };

				updatedUser.wishlist.push(this.country);

				this.patchUserInfo(updatedUser)
					.then((res: any) => {
						this.store.commit("setUserInfo", res.data.user);
						this.checkWishlist();
					})
					.catch((err) => {
						console.log(err);
					});
				//reload the album
			},
			removeFromWishlist() {
				console.log(this.country);
				const updatedUser = { ...this.userInfo };
				const index = updatedUser.wishlist.indexOf(this.country);

				if (index !== -1) {
					// Remove the country using splice
					updatedUser.wishlist.splice(index, 1);
				}

				this.patchUserInfo(updatedUser)
					.then((res: any) => {
						this.store.commit("setUserInfo", res.data.user);
						this.checkWishlist();
					})
					.catch((err) => {
						console.log(err);
					});
				//reload the album
			},
			patchUserInfo(update: object) {
				return axios.patch(
					`https://travel-app-api-8nj9.onrender.com/api/users/${this.userInfo._id}`,
					update
				);
			},
			checkWishlist() {
				if (this.userInfo.wishlist.includes(this.country)) {
					this.inWishlist = true;
				} else {
					this.inWishlist = false;
				}
			},
		},
		mounted() {
			this.checkWishlist();
		},
		watch: {
			userInfo: "checkWishlist",
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

<style scoped>
	.wishlist-button {
		width: 100%;
	}
</style>
