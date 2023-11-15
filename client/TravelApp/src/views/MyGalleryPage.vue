<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<main>
				<div class="title-div center">
					<h1>Gallery Name Here</h1>
					<Carousel />
					<div class="buttons-div">
						<ion-button
							class="ion-padding"
							expand="block"
						>
							<ion-icon
								slot="icon-only"
								:icon="trashOutline"
							></ion-icon>
						</ion-button>
						<ion-button
							class="ion-padding"
							expand="block"
						>
							<ion-icon
								slot="icon-only"
								:icon="addOutline"
							></ion-icon>
						</ion-button>
					</div>
				</div>
			</main>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
	import { mapGetters } from "vuex";
	import Carousel from "@/components/Carousel.vue";
	import { IonPage, IonContent, IonButton, IonIcon } from "@ionic/vue";

	export default defineComponent({
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
	});
</script>

<script setup lang="ts">
	import axios from "axios";
	import { addOutline, trashOutline } from "ionicons/icons";
	import { defineComponent } from "vue";
</script>

<style>
	main {
		margin-top: 1rem;
		padding: 3rem 1rem 1rem !important;
		display: grid;
		grid-gap: 1rem;
		grid-template-columns: 100%;
		grid-template-rows: 1fr 5fr 0.5fr minmax(3rem, 5rem);
		height: 90vh;
		height: 90dvh;
	}
	* {
		box-sizing: border-box;
	}

	h1 {
		text-align: center;
	}

	/* Position the image container (needed to position the left and right arrows) */
	.container {
		position: relative;
	}

	.image-div {
		color: #f2f2f2;
		height: 100%;
		width: 100%;
		font-size: 12px;
		padding: 8px 12px;
		position: absolute;
		top: 0;
	}

	.carousel-image {
		height: 100%;
		object-fit: cover;
	}

	/* Add a pointer when hovering over the thumbnail images */
	.cursor {
		cursor: pointer;
	}

	/* Next & previous buttons */
	.prev,
	.next {
		cursor: pointer;
		position: absolute;
		top: 55%;
		width: auto;
		padding: 16px;
		margin-top: -50px;
		color: white;
		font-weight: bold;
		font-size: 20px;
		border-radius: 0 3px 3px 0;
		user-select: none;
		-webkit-user-select: none;
	}

	/* Position the "next button" to the right */
	.next {
		right: 0;
		border-radius: 3px 0 0 3px;
	}

	/* On hover, add a black background color with a little bit see-through */
	.prev:hover,
	.next:hover {
		background-color: rgba(0, 0, 0, 0.8);
	}

	/* Number text (1/3 etc) */
	.numbertext {
		color: #f2f2f2;
		font-size: 12px;
		padding: 8px 12px;
		position: absolute;
		top: 0;
	}

	.row {
		z-index: 1;
		bottom: 0;
	}

	.row:after {
		content: "";
		display: table;
		clear: both;
	}

	/* Six columns side by side */
	.column {
		height: 100%;
		float: left;
		width: 16.66%;
	}

	/* Add a transparency effect for thumnbail images */
	.demo {
		opacity: 0.6;
	}

	.active,
	.demo:hover {
		opacity: 1;
	}

	.buttons-div {
		display: flex;
		justify-content: space-evenly;
	}

	.buttons-div ion-button {
		width: 40%;
		height: 20%;
		color: black;
	}
</style>
