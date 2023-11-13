<template>
	<ion-page>
		<ion-content
			:fullscreen="true"
			id="main-content"
			ion-padding
		>
			<div class="wishlist-section">
				<h1 v-if="username">{{ username }} Wishlist</h1>
				<h1 v-if="userId">{{ userId }} Wishlist</h1>
				<h1 v-if="userEmail">{{ userEmail }} Wishlist</h1>
				<!-- <h1 v-if="user">{{ user?.name }} Wishlist</h1> -->
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
	// import { useAuth0 } from "@auth0/auth0-vue";
	import { mapGetters } from "vuex";
	export default defineComponent({
		components: {},
		computed: {
			// Use mapGetters to access the getUser getter from the store
			...mapGetters(["getUsername", "getUserEmail", "getUserId"]),

			// Use a computed property to get the user from the store
			username() {
				return this.getUsername;
			},
			userId() {
				return this.getUserId;
			},
			userEmail() {
				return this.getUserEmail;
			},
		},
	});
</script>

<script setup lang="ts">
	import { ref, onMounted, defineProps, defineComponent } from "vue";
	import { IonPage, IonContent } from "@ionic/vue";

	// const { user } = useAuth0();
	// console.log(user);
</script>

<style>
	.wishlist-section {
		margin-top: 3.5rem;
	}
</style>
