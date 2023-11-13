<template>
  <ion-header class="reviews-header">
    <h1 class="reviews-heading">Answers{{ question }}</h1>
  </ion-header>
  <ion-content class="ion-padding">
    <div class="dummy-reviews">
      <!-- Dummy Reviews Section -->
      <ion-card
        class="review-card"
        v-for="review in dummyReviews"
        :key="review.id">
        <ion-card-content>
          <ion-avatar slot="start">
            <ion-img :src="review.userAvatar" alt="User Avatar"></ion-img>
          </ion-avatar>
          <ion-card-title>{{ review.username }}</ion-card-title>
          <ion-card-subtitle>{{ review.date }}</ion-card-subtitle>
          <p>{{ review.comment }}</p>
        </ion-card-content>
      </ion-card>
    </div>
  </ion-content>
  <form class="Review form">
    <ion-item class="userRev">
      <ion-input
        label-placement="stacked"
        label=""
        type="review"
        placeholder="Write your review here:">
      </ion-input>
    </ion-item>
  </form>
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-button color="medium" @click="cancel">cancel</ion-button>
    </ion-buttons>
    <ion-buttons slot="end">
      <ion-button @click="confirm" :strong="true">Confirm </ion-button>
    </ion-buttons>
  </ion-toolbar>
</template>
console.log()
<script lang="ts" setup>
import { setupConfig } from "@ionic/core";
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
import { emit } from "process";
import { DefineComponent, ref } from "vue";
const name = ref();
const cancel = () => modalController.dismiss(null, "cancel");
const confirm = () => modalController.dismiss(name.value, "confirm");

// example data
const dummyReviews = [
  {
    id: 1,
    username: "Lawrence1234",
    date: "Nov 13, 2023",
    userAvatar: "url-to-avatar-image",
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 2,
    username: "Dave1234",
    date: "Nov 11, 2023",
    userAvatar: "url-to-avatar-image",
    comment:
      "Lorem ipsum do.  ipsum dolor sit amet, consectetur adipiscing   ipsum dolor sit amet, consectetur adipiscing   ipsum dolor sit amet, consectetur adipiscing ",
  },
  {
    id: 2,
    username: "Dean1234",
    date: "Nov 10, 2023",
    userAvatar: "url-to-avatar-image",
    comment:
      "Lorem ipsum do.  ipsum dolor sit amet, consectetur adipiscing   ipsum dolor sit amet, consectetur adipiscing   ipsum dolor sit amet, consectetur adipiscing ",
  },
];

// export default {
//   props: { msg: String },
//   setup(props, { emit }) {
//     const message = ref(props.msg || "Test");
//     const closeModal = () => {
//       emit("close");
//     };
//   },
// };
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
</style>
