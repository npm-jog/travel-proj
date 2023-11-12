<template>
	<ion-page>
		<ion-content
			:fullscreen="true"
			id="main-content"
			ion-padding
		>
			<div class="wishlist-section">
				<h1 v-if="user">{{ user?.name }} Wishlist</h1>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
	import { useAuth0 } from "@auth0/auth0-vue";
	export default defineComponent({
		components: {},
	});
</script>

<script setup lang="ts">
	import { ref, onMounted, defineProps, defineComponent } from "vue";
	import { IonPage, IonContent } from "@ionic/vue";

	const { user } = useAuth0();
	console.log(user);
</script>

<style>
	.wishlist-section {
		margin-top: 3.5rem;
	}
</style>
