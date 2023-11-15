<!-- Commit 12:04 -->

<template>
  <ion-page>
    <ion-content :fullscreen="true" id="main-content">
      <main>
        <div class="title-div center">
          <h1>Country Name Here</h1>
        </div>
        <Carousel :pics='picsArray'/>
        <div class="buttons-container">
          <div class="review-button-container">
            <ion-button class="review-button" @click="openModal"
              >Reviews</ion-button
            >
          </div>
          <div class="view-questions-container">
            <ion-button class="questions-button" @click="openQuestionsModal"
              >View questions</ion-button
            >
          </div>
        </div>
        <div class="rating-wishlist-div center"></div>
        <div class="country-info-container axios-content">
          <h2 class="country-info-header">Country info</h2>
          <p class="country-info">
            {{ safetyData.message }}
            <br />
          </p>
        </div>
        <br />
        <div class="public-holidays-div center axios-content">
          <h2>Public Holidays</h2>
          <div v-for="(holiday, index) in holidays" :key="index">
            {{ holiday }}
          </div>
        </div>
        <div class="weather-container axios-content">
          <h2 class="country-info-header">Current Weather</h2>
          <p class="temp">{{ currentCountry }}s current weather condition is {{ condition.toLowerCase() }} with a temperature of {{ temp }} degrees celcius.</p>
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
import { toggle } from "ionicons/icons";
import ReviewModal from "../components/ReviewModal.vue";
import QuestionsModal from "../components/QuestionsModal.vue";
import AnswersModal from "@/components/AnswersModal.vue";
import axios from "axios";
import * as countriesData from "../../countryData";

const currentUrl = window.location.href;
const splitURL = currentUrl.split('/');
const currentCountry = splitURL[splitURL.length - 1]
const foundCountry = countriesData.jsonData.find(countryData => {return countryData.country?.toLowerCase() === currentCountry})

let safetyData: any;
let temp: any;
let condition: any;
// safety info
try {
  const { data } = await axios.get(`https://travel-app-api-8nj9.onrender.com/api/country_data/country_safety/${foundCountry?.iso}`);
  safetyData = data.safetyData;
} catch (err) {}

const picsArray: any = [];
try {
  const { data } = await axios.get(`https://travel-app-api-8nj9.onrender.com/api/country_data/images/${currentCountry}`);
  data.images.forEach(({src}: any) => {
    picsArray.push(src.medium)
  })
} catch (err) {}
try {
  const { data } = await axios.get(`https://travel-app-api-8nj9.onrender.com/api/country_data/weather/${foundCountry?.capital}`);
  const weatherData = data.weather.weather;
  temp = weatherData.temp_c;
  condition = weatherData.condition;
} catch (err) {}
//
export default defineComponent({
  data() {
    return {
      message: ref(
        "this modal example uses the modalController to present and dismiss modals",
      ),
      holidays: [] as string []
    };
  },
  methods: {
    async openModal() {
      const modal = await modalController.create({
        component: ReviewModal,
      });
      modal.present();
    },
    async openQuestionsModal() {
      const modal = await modalController.create({
        component: QuestionsModal,
      });
      modal.present();
    },
    async getHolidays() {
      try {
      const currentYear = new Date().getFullYear();
      const { data } = await axios.get("https://travel-app-api-8nj9.onrender.com/api/country_data/public_holidays", {params: {country_code: foundCountry?.iso, year: currentYear}});
      return data.publicHolidays;
    } catch (err) {}
    }
  },
  mounted() {
    this.getHolidays().then((returnedHolidays) => {
      returnedHolidays.forEach((holiday: any) => {
        this.holidays.push(`${holiday.date} ${holiday.name}`)
      })
    })
  }
});
</script>

<script setup lang="ts">
import Carousel from '../components/Carousel.vue';
/*
<div class="rating-card">
          <h2>Rate Country</h2>
          <div v-for="metric in metrics" :key="metric.name">
            <p>{{ metric.name }}</p>
            <div class="star-rating">
              <span
                v-for="star in 5"
                :key="star"
                class="star"
                :class="{ highlighted: star <= metric.rating }"
                @click="rateCountry(metric, star)"
              >
                &#9733;
              </span>
            </div>
          </div>
        </div>
        */
const metrics = [
  { name: "Food", rating: ref(0) },
  { name: "Safety", rating: ref(0) },
  { name: "Activities", rating: ref(0) },
  { name: "Cost", rating: ref(0) },
];

function rateCountry(metric, stars) {
  metric.rating.value = stars;
  console.log(`Rating ${metric.name}: ${stars} stars`);
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

.star-rating {
  font-size: 24px;
}

.star {
  cursor: pointer;
  color: #ccc;
  transition: color 0.3s ease-in-out;
}

.star:hover {
  color: gold;
}

.star.highlighted {
  color: gold;
}

.review-button {
  margin-top: 0.5vh;
  width: 80vw;
  height: 2vh;
}

.questions-button {
  grid-column: 4/5;
  margin-top: 0.2vh;
  width: 80vw;
  height: 2vh;
}

.country-info-container {
  margin-bottom: 4vh;
  padding-bottom: 3vh;
}

.buttons-container {
  margin-top: 300px;
}

.star-rating {
  font-size: 24px;
  cursor: pointer;
}

.star {
  margin-right: 5px;
}

.highlighted {
  color: gold;
}
.carouselContainer{
		height: 25%;
		margin-top: 200px;
	}

  .carouselPic{
    height: 400px;
    width: 300px;
  }
</style>
