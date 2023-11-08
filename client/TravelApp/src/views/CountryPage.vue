<template>
	<ion-page>
		<ion-content
			:fullscreen="true"
			id="main-content"
		>
			<main>
				<div class="title-div center">
					<h1>Country Name Here</h1>
				</div>
				<div class="carousel-div center">Carousel Here</div>
				<div class="events-div center">events here</div>
				<div class="rating-wishlist-div center">
					rate country and add to wishlist buttons here
				</div>
				<div class="questions-reviews-div center">
					questions and reviews buttons here
				</div>
			</main>
		</ion-content>
	</ion-page>
</template>

<script setup lang="ts">
	import { IonPage, IonContent } from "@ionic/vue";
</script>

<style scoped>
	main {
		margin-top: 1rem;
		display: grid;
		grid-gap: 1rem;
		grid-template-columns: 100%;
		grid-template-rows: 4rem 17rem 7rem 4rem 4rem;
		height: 90vh;
		height: 90dvh;
		padding: 3rem;
		background-color: blue;
	}
</style>
