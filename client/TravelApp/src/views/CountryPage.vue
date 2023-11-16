<!-- Commit 12:04 -->

<template>
	<ion-page>
		<ion-content
			:fullscreen="true"
			id="main-content"
		>
			<main>
				<div class="title-div center">
					<h1>{{ currentCountry }}</h1>
				</div>
				<Carousel :pics="picsArray" />
				<div class="buttons-container">
					<div class="list-buttons">
						<VisitedButton :country="currentCountry" />
						<WishlistButton :country="currentCountry" />
					</div>
					<div class="list-buttons">
						<ion-button
							class="review-button"
							@click="openModal"
							>Reviews</ion-button
						>

						<ion-button
							class="questions-button"
							@click="openQuestionsModal"
							>Questions</ion-button
						>
					</div>
				</div>
				<div class="country-info-container axios-content">
					<h2 class="country-info-header">Country info</h2>
					<p class="country-info">
						{{ safetyData.message }}
						<br />
					</p>
				</div>
				<br />
				<div class="weather-container axios-content">
					<h2 class="country-info-header">Current Weather</h2>
					<p class="temp">
						{{ currentCountry }}s current weather condition is
						{{ condition.toLowerCase() }} with a temperature of
						{{ temp }} degrees celcius.
					</p>
				</div>
				<div class="public-holidays-div center axios-content">
					<h2>Public Holidays</h2>
					<div class="public-info">
						<p
							v-for="(holiday, index) in holidays"
							:key="index"
						>
							{{ holiday }}
						</p>
					</div>
				</div>
			</main>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
	import Vue, { ref, defineComponent, VueElement, reactive } from "vue";
	import {
		IonPage,
		IonContent,
		IonButton,
		IonModal,
		modalController,
	} from "@ionic/vue";
	import ReviewModal from "../components/ReviewModal.vue";
	import QuestionsModal from "../components/QuestionsModal.vue";
	import AnswersModal from "@/components/AnswersModal.vue";
	import router from "@/router";
	import axios from "axios";
	import WishlistButton from "@/components/WishlistButton.vue";
	import VisitedButton from "@/components/VisitedButton.vue";

	import { mapGetters } from "vuex";

	import * as countriesData from "../../countryData";

	export default defineComponent({
		data() {
			return {
				currentCountry: this.$route.params.country,
				countryData: {} as any,
				message: ref(
					"this modal example uses the modalController to present and dismiss modals"
				),
				holidays: [] as string[],
				reviewsArray: ref([]),
				questionsArray: ref([]),
				picsArray: [] as any,
				safetyData: { message: "" },
				temp: "",
				condition: "",
				commentsArray: ref([]),
			};
		},
		methods: {
			async openModal() {
				const modal = await modalController.create({
					component: ReviewModal,
					componentProps: {
						reviewsArray: this.reviewsArray,
					},
				});
				modal.present();
			},
			setCountry() {
				this.countryData = countriesData.jsonData.find((countryData: any) => {
					return countryData.country === this.currentCountry;
				});
			},
			async openQuestionsModal() {
				const modal = await modalController.create({
					component: QuestionsModal,
					componentProps: {
						questionsArray: this.questionsArray,
						commentsArray: this.commentsArray,
					},
				});
				modal.present();
			},
			async getHolidays() {
				try {
					const currentYear = new Date().getFullYear();
					const { data } = await axios.get(
						"https://travel-app-api-8nj9.onrender.com/api/country_data/public_holidays",
						{
							params: {
								country_code: this.countryData?.iso,
								year: currentYear,
							},
						}
					);
					return data.publicHolidays;
				} catch (err) {}
			},
			async getAllData() {
				// safety info
				try {
					const { data } = await axios.get(
						`https://travel-app-api-8nj9.onrender.com/api/country_data/country_safety/${this.countryData?.iso}`
					);
					this.safetyData = data.safetyData;
				} catch (err) {}

				try {
					const { data } = await axios.get(
						`https://travel-app-api-8nj9.onrender.com/api/country_data/images/${this.currentCountry}`
					);
					data.images.forEach(({ src }: any) => {
						this.picsArray.push(src.medium);
					});
				} catch (err) {}
				try {
					const { data } = await axios.get(
						`https://travel-app-api-8nj9.onrender.com/api/country_data/weather/${this.countryData?.capital}`
					);
					const weatherData = data.weather.weather;
					this.temp = weatherData.temp_c;
					this.condition = weatherData.condition;
				} catch (err) {}
			},
		},
		mounted() {
			this.setCountry();
			this.getAllData();
			this.getHolidays().then((returnedHolidays: object[]) => {
				returnedHolidays.forEach((holiday: any) => {
					this.holidays.push(`${holiday.date} ${holiday.name}`);
				});
			});
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
	// let totalRating = 0;
	import Carousel from "../components/Carousel.vue";

	// const metrics = [
	//   { name: "Safety", rating: ref(0) },
	//   { name: "Food", rating: ref(0) },
	//   { name: "Activities", rating: ref(0) },
	//   { name: "Cost", rating: ref(0) },
	//   { name: "Scenery", rating: ref(0) },
	// ];

	// totalRating = computed(() => {
	//   return metrics.reduce((sum, metric) => sum + metric.rating.value, 0) / 4;
	// });

	// function rateCountry(metric, stars) {
	//   metric.rating.value = stars;

	//   metric.highlighted = true;
	//   console.log(totalRating.value);
	// }

	// let submitted = ref(false);

	// function submitRating() {
	//   // Check if already submitted
	//   if (submitted.value) {
	//     console.warn("Rating already submitted!");
	//     return;
	//   }

	//   // You can send the totalRating to your backend here using an HTTP request
	//   console.log("Submitting Total Rating:", totalRating.value);

	//   // Example: Send a POST request to your backend
	//   axios
	//     .post("https://your-backend-api/submit-rating", {
	//       totalRating: totalRating.value,
	//       // Include any other data you want to send to the backend
	//     })
	//     .then((response) => {
	//       console.log("Rating submitted successfully:", response.data);
	//       // You can handle success actions here

	//       // Update the submitted state
	//       submitted.value = true;
	//     })
	//     .catch((error) => {
	//       console.error("Error submitting rating:", error);
	//       // You can handle error actions here
	//     });
	// }
</script>

<style scoped>
	main {
		margin-top: 1rem;
		padding: 3rem 1rem 1rem !important;
		display: grid;
		grid-gap: 1rem;
		grid-template-columns: 100%;
		grid-template-rows: 4rem 15rem 7rem 2rem 2rem;
		height: 90vh;
		height: 90dvh;
	}
	* {
		box-sizing: border-box;
	}
	.title-div {
		justify-self: center;
		align-self: center;
	}

	.review-button {
		font-size: 0.8rem;
		width: 50%;
	}

	.questions-button {
		font-size: 0.8rem;
		max-width: 50%;
	}

	.country-info-container {
		margin-top: 15px;
		justify-self: center;
		align-self: center;
	}
	.country-info-header {
		text-align: center;
		padding-top: 20px;
	}
	.country-info {
		width: 80%;
		margin: 0 auto;
	}
	.public-holidays-div {
		justify-self: center;
		align-self: center;
	}
	.public-holidays-div > h2 {
		text-align: center;
	}
	.weather-container > p {
		width: 80%;
		margin: 0 auto;
	}

	.buttons-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		justify-self: center;
		align-self: center;
		width: 70%;
	}
	.public-info {
		max-height: 300px;
		overflow-y: scroll;
	}
	.list-buttons {
		display: flex;
		width: 100%;
	}

	.buttons-container ion-button {
		font-size: 0.8rem;
		width: 50%;
	}
</style>
