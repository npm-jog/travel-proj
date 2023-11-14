<!-- Commit 12:04 -->

<template>
  <ion-page>
    <ion-content :fullscreen="true" id="main-content">
      <main>
        <div class="title-div center">
          <h1>Country Name Here</h1>
        </div>
        <Carousel :pics='picsArray'/>
        <div class="rating-wishlist-div center"></div>
        <div class="country-info-container">
          <h4 class="country-info-header">Country info</h4>
          <p class="country-info">
            {{ safetyData.message }}
            <br />
          </p>
        </div>
        <br />
        <div class="public-holidays-div center">
          <h2>Public Holidays</h2>
          <div v-for="(holiday, index) in holidays" :key="index">
            <!-- Your element content goes here -->
            {{ holiday }}
          </div>
        </div>
        <ion-content> </ion-content>
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

let safetyData: any;
// safety info
try {
  const { data } = await axios.get("https://travel-app-api-8nj9.onrender.com/api/country_data/country_safety/GB");
  safetyData = data.safetyData;
} catch (err) {}

const picsArray: any = [];
try {
  const { data } = await axios.get("https://travel-app-api-8nj9.onrender.com/api/country_data/images/brazil");
  data.images.forEach(({src}: any) => {
    picsArray.push(src.medium)
  })
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
      const { data } = await axios.get("https://travel-app-api-8nj9.onrender.com/api/country_data/public_holidays", {params: {country_code: 'GB', year: 2022}});
      console.log(data.publicHolidays)
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
  margin-top: 1%;
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
