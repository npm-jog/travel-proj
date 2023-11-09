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
				<div class="carousel-div center">
					<!-- Slideshow container -->
					<div class="slideshow-container">
						<!-- Full-width images with number and caption text -->
						<div
							class="fade"
							v-if="slides[0].toShow.value"
						>
							<div class="image-div">
								<img
									class="carousel-image"
									src="https://images.pexels.com/photos/461755/pexels-photo-461755.jpeg?auto=compress&cs=tinysrgb&w=400"
								/>
							</div>
						</div>

						<div
							class="fade"
							v-if="slides[1].toShow.value"
						>
							<div class="image-div">
								<img
									class="carousel-image"
									src="https://images.pexels.com/photos/206648/pexels-photo-206648.jpeg?auto=compress&cs=tinysrgb&w=400"
								/>
							</div>
						</div>

						<div class="fade">
							<div
								class="image-div"
								v-if="slides[2].toShow.value"
							>
								<img
									class="carousel-image"
									src="https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
								/>
							</div>
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
					</div>
					<br />

					<!-- The dots/circles -->
					<div
						class="dot-div"
						style="text-align: center"
					>
						<span
							class="dot"
							v-bind:class="dots[0].className"
							@click="currentSlide(1)"
						></span>
						<span
							class="dot"
							v-bind:class="dots[1].className"
							@click="currentSlide(2)"
						></span>
						<span
							class="dot"
							v-bind:class="dots[2].className"
							@click="currentSlide(3)"
						></span>
					</div>
				</div>
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
	import { ref } from "vue";
	import { IonPage, IonContent } from "@ionic/vue";

	let slideIndex = 1;
	const slides = [
		{ toShow: ref(true) },
		{ toShow: ref(false) },
		{ toShow: ref(false) },
	];
	const dots = [{ className: "" }, { className: "" }, { className: "" }];
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

<style scoped>
	main {
		margin-top: 1rem;
		padding: 3rem 1rem 1rem !important;
		display: grid;
		grid-gap: 1rem;
		grid-template-columns: 100%;
		grid-template-rows: 4rem 19rem 5rem 4rem 4rem;
		height: 90vh;
		height: 90dvh;
	}
	* {
		box-sizing: border-box;
	}

	/* Slideshow container */
	.slideshow-container {
		width: 100%;
		height: 80%;
		position: relative;
		margin: auto;
	}

	.hideSlide {
		display: none;
	}

	.showSlide {
		display: block;
		width: 100%;
		height: 100%;
	}

	/* Next & previous buttons */
	.prev,
	.next {
		cursor: pointer;
		position: absolute;
		top: 50%;
		width: auto;
		margin-top: -22px;
		padding: 16px;
		color: white;
		font-weight: bold;
		font-size: 18px;
		transition: 0.6s ease;
		border-radius: 0 3px 3px 0;
		user-select: none;
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

	/* Caption text */
	.text {
		color: #f2f2f2;
		font-size: 15px;
		padding: 8px 12px;
		position: absolute;
		bottom: 8px;
		width: 100%;
		text-align: center;
	}

	/* Number text (1/3 etc) */
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

	.dot-div {
	}

	/* The dots/bullets/indicators */
	.dot {
		cursor: pointer;
		height: 15px;
		width: 15px;
		margin: 0 2px;
		background-color: #bbb;
		border-radius: 50%;
		display: inline-block;
		transition: background-color 0.6s ease;
	}

	.active,
	.dot:hover {
		background-color: #717171;
	}

	/* Fading animation */
	.fade {
		animation-name: fade;
		animation-duration: 1.5s;
	}

	@keyframes fade {
		from {
			opacity: 0.4;
		}
		to {
			opacity: 1;
		}
	}
</style>
