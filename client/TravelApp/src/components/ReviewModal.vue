<template>
  <ion-header class="reviews-header">
    <h1 class="reviews-heading">User Reviews</h1>
  </ion-header>

  <ion-content>
    <div class="dummy-reviews">
      <ion-card class="review-card" v-for="review in reviewsArray" :key="review.id">
        <ion-card-content>
          <ion-card-title>{{ review.username }}</ion-card-title>
          <ion-card-subtitle>{{ review.date }}</ion-card-subtitle>
          <p>{{ review.body }}</p>
          <p>
            Ratings: safety: {{ review.ratings.safety }}* food: {{ review.ratings.food }}* activities: {{ review.ratings.activities }}* cost:
            {{ review.ratings.cost }}* scenery: {{ review.ratings.scenery }}*
          </p>
        </ion-card-content>
      </ion-card>
    </div>

    <!-- Rate country card -->
    <div class="rating-card">
      <h2>Rate your experience:</h2>
      <div class="rating-items">
        <div v-for="metric in metrics" :key="metric.name">
          <p>{{ metric.name }}</p>

          <div class="star-rating">
            <span
              v-for="star in 5"
              :key="star"
              class="star"
              :class="{
                highlighted: star <= metric.rating.value && metric.highlighted,
              }"
              @click="rateCountry(metric, star)"
            >
              &#9733;
            </span>
          </div>
        </div>
      </div>
    </div>
  </ion-content>
  <!-- Review form and submit buttons -->
  <ion-toolbar>
    <form class="Review form">
      <ion-item class="userRev">
        <ion-input v-model="state.reviewText" label-placement="stacked" label="" type="text" placeholder="Write your review here:"></ion-input>
      </ion-item>
    </form>
    <ion-buttons slot="start">
      <ion-button color="medium" @click="cancel">cancel</ion-button>
    </ion-buttons>
    <ion-buttons slot="end">
      <ion-button @click="confirm" :strong="true">Submit </ion-button>
    </ion-buttons>
  </ion-toolbar>
</template>
<script lang="ts" setup>
import {
  IonContent,
  IonHeader,
  IonFooter,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonItem,
  IonInput,
  modalController,
  IonCard,
  IonAvatar,
  IonImg,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
} from "@ionic/vue";
import { DefineComponent, reactive, ref, defineProps } from "vue";
import axios from "axios";
import { useStore } from "vuex";
let { reviewsArray } = defineProps(["reviewsArray"]);

const name = ref();
const state = reactive({
  reviewText: "",
});

const currentUrl = window.location.href;
const splitURL = currentUrl.split("/");
const currentCountry = splitURL[splitURL.length - 1];
const store = useStore();

const cancel = () => modalController.dismiss(null, "cancel");

async function getReviews() {
  try {
    const { data } = await axios.get(`https://travel-app-api-8nj9.onrender.com/api/reviews/${currentCountry}`);
    if (reviewsArray.length) {
      reviewsArray.length = 0;
    }

    data.reviews.forEach((review: any) => {
      reviewsArray.push(review);
    });
  } catch (err) {}
}

getReviews();

const confirm = async () => {
  const ratings = {
    safety: 0,
    food: 0,
    activities: 0,
    cost: 0,
    scenery: 0,
  };
  metrics.forEach((metric) => {
    ratings[metric.name.toLowerCase()] = metric.rating.value;
  });
  const reviewData = {
    username: store.state.userInfo.username,
    body: state.reviewText,
    ratings: ratings,
    pictures: [],
    country: currentCountry,
    reported_count: 0,
  };
  try {
    const reviews = await axios.post(`https://travel-app-api-8nj9.onrender.com/api/reviews/${currentCountry}`, reviewData);
    console.log(reviews);
    getReviews();
    await modalController.dismiss();
  } catch (err) {}
};

const metrics = [
  { name: "Safety", rating: ref(0) },
  { name: "Food", rating: ref(0) },
  { name: "Activities", rating: ref(0) },
  { name: "Cost", rating: ref(0) },
  { name: "Scenery", rating: ref(0) },
];

function rateCountry(metric, stars) {
  metric.rating.value = stars;

  metric.highlighted = true;
}
</script>
<style scoped>
.reviews-header {
  display: flex;
  justify-content: center;
}

.reviews-heading {
}

.review-card {
  margin-bottom: 5%;
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

.rating-items {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
}
</style>
