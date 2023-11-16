<template>
	<ion-button
		class="visited-button add-button"
		v-if="!inVisited"
		color="success"
		@click="addTovisited"
		>+ visited
	</ion-button>
	<ion-button
		class="visited-button remove-button"
		color="danger"
		v-else
		@click="removeFromvisited"
		>- visited</ion-button
	>
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
				inVisited: false,
			};
		},
		components: {
			IonButton,
			IonIcon,
		},
		methods: {
			addTovisited() {
				console.log(this.country);
				const updatedUser = { ...this.userInfo };

				updatedUser.visited_locations.push(this.country);

				this.patchUserInfo(updatedUser)
					.then((res: any) => {
						this.store.commit("setUserInfo", res.data.user);
						this.checkVisited();
					})
					.catch((err) => {
						console.log(err);
					});
			},
			removeFromvisited() {
				console.log(this.country);
				const updatedUser = { ...this.userInfo };
				const index = updatedUser.visited_locations.indexOf(this.country);

				if (index !== -1) {
					updatedUser.visited_locations.splice(index, 1);
				}

				this.patchUserInfo(updatedUser)
					.then((res: any) => {
						this.store.commit("setUserInfo", res.data.user);
						this.checkVisited();
					})
					.catch((err) => {
						console.log(err);
					});
			},
			patchUserInfo(update: object) {
				return axios.patch(
					`https://travel-app-api-8nj9.onrender.com/api/users/${this.userInfo._id}`,
					update
				);
			},
			checkVisited() {
				if (this.userInfo.visited_locations.includes(this.country)) {
					this.inVisited = true;
				} else {
					this.inVisited = false;
				}
			},
		},
		mounted() {
			this.checkVisited();
		},
		watch: {
			userInfo: "checkVisited",
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
	.visited-button {
		width: 50%;
	}
</style>
