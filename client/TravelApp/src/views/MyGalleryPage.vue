<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<main>
				<div class="title-div center">
					<h1>Gallery Name Here</h1>
				</div>
				<!-- Container for the image gallery -->
				<div class="container">
					<!-- Full-width images with number text -->
					<div
						class="image-div"
						v-if="slides[0].toShow.value"
					>
						<div class="numbertext">1 / 6</div>
						<img
							class="carousel-image"
							src="https://images.pexels.com/photos/461755/pexels-photo-461755.jpeg?auto=compress&cs=tinysrgb&w=400"
							style="width: 100%"
						/>
					</div>

					<div
						class="image-div"
						v-if="slides[1].toShow.value"
					>
						<div class="numbertext">2 / 6</div>
						<img
							class="carousel-image"
							src="https://images.pexels.com/photos/206648/pexels-photo-206648.jpeg?auto=compress&cs=tinysrgb&w=400"
							style="width: 100%"
						/>
					</div>

					<div
						class="image-div"
						v-if="slides[2].toShow.value"
					>
						<div class="numbertext">3 / 6</div>
						<img
							class="carousel-image"
							src="https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
							style="width: 100%"
						/>
					</div>

					<div
						class="image-div"
						v-if="slides[3].toShow.value"
					>
						<div class="numbertext">4 / 6</div>
						<img
							class="carousel-image"
							src="https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=400"
							style="width: 100%"
						/>
					</div>

					<div
						class="image-div"
						v-if="slides[4].toShow.value"
					>
						<div class="numbertext">5 / 6</div>
						<img
							class="carousel-image"
							src="https://images.pexels.com/photos/4101555/pexels-photo-4101555.jpeg?auto=compress&cs=tinysrgb&w=400"
							style="width: 100%"
						/>
					</div>

					<div
						class="image-div"
						v-if="slides[5].toShow.value"
					>
						<div class="numbertext">6 / 6</div>
						<img
							class="carousel-image"
							src="https://images.pexels.com/photos/23547/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400"
							style="width: 100%"
						/>
					</div>

					<!-- Next and previous buttons -->
					<a
						class="prev"
						@click="plusSlides(-1)"
						>&#10094;</a
					>
					<a
						class="next"
						@click="plusSlides(1)"
						>&#10095;</a
					>

					<!-- Thumbnail images -->
				</div>
				<div class="row">
					<div class="column">
						<img
							class="demo cursor carousel-image"
							src="https://images.pexels.com/photos/461755/pexels-photo-461755.jpeg?auto=compress&cs=tinysrgb&w=400"
							style="width: 100%"
							@click="currentSlide(1)"
							alt="The Woods"
						/>
					</div>
					<div class="column">
						<img
							class="demo cursor carousel-image"
							src="https://images.pexels.com/photos/206648/pexels-photo-206648.jpeg?auto=compress&cs=tinysrgb&w=400"
							style="width: 100%"
							@click="currentSlide(2)"
							alt="Cinque Terre"
						/>
					</div>
					<div class="column">
						<img
							class="demo cursor carousel-image"
							src="https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
							style="width: 100%"
							@click="currentSlide(3)"
							alt="Mountains and fjords"
						/>
					</div>
					<div class="column">
						<img
							class="demo cursor carousel-image"
							src="https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=400"
							style="width: 100%"
							@click="currentSlide(4)"
							alt="Northern Lights"
						/>
					</div>
					<div class="column">
						<img
							class="demo cursor carousel-image"
							src="https://images.pexels.com/photos/4101555/pexels-photo-4101555.jpeg?auto=compress&cs=tinysrgb&w=400"
							style="width: 100%"
							@click="currentSlide(5)"
							alt="Nature and sunrise"
						/>
					</div>
					<div class="column">
						<img
							class="demo cursor carousel-image"
							src="https://images.pexels.com/photos/23547/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400"
							style="width: 100%"
							@click="currentSlide(6)"
							alt="Snowy Mountains"
						/>
					</div>
				</div>
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
			</main>
		</ion-content>
	</ion-page>
</template>

<script setup lang="ts">
	import { IonPage, IonContent, IonButton, IonIcon } from "@ionic/vue";

	import { addOutline, trashOutline } from "ionicons/icons";

	import { ref, defineComponent } from "vue";

	let slideIndex = 1;

	const slides = [
		{ toShow: ref(true) },
		{ toShow: ref(false) },
		{ toShow: ref(false) },
		{ toShow: ref(false) },
		{ toShow: ref(false) },
		{ toShow: ref(false) },
	];
	const dots = [
		{ className: "" },
		{ className: "" },
		{ className: "" },
		{ className: "" },
		{ className: "" },
		{ className: "" },
	];
	showSlides(slideIndex);

	// Next/previous controls
	function plusSlides(n: number) {
		showSlides((slideIndex += n));
	}

	// Thumbnail image controls
	function currentSlide(n: number) {
		showSlides((slideIndex = n));
	}

	function showSlides(n: number) {
		let i;
		if (n > slides.length) {
			slideIndex = 1;
		}
		if (n < 1) {
			slideIndex = slides.length;
		}
		for (i = 0; i < slides.length; i++) {
			slides[i].toShow.value = false;
		}
		for (i = 0; i < dots.length; i++) {
			dots[i].className = "";
		}
		slides[slideIndex - 1].toShow.value = true;
		dots[slideIndex - 1].className = "active";
	}
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
