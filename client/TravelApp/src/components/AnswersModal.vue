<template>
  <ion-header class="reviews-header">
    <h1 class="reviews-heading">{{ question }}</h1>
  </ion-header>
  <ion-content class="ion-padding">
    <div class="dummy-reviews">
      <!-- Dummy Reviews Section -->
      <ion-card
        class="review-card"
        v-for="comment in commentsArray"
        :key="comment.id">
        <ion-card-content>
          <ion-card-title>{{ comment.username }}</ion-card-title>
          <ion-card-subtitle>{{ comment.created_at }}</ion-card-subtitle>
          <p>{{ comment.body }}</p>
        </ion-card-content>
      </ion-card>
    </div>
  </ion-content>
  <form class="Review form">
    <ion-item class="userRev">
      <ion-input
        v-model = "state.body"
        label-placement="stacked"
        label=""
        type: any ="review"
        placeholder="Write your answer here:">
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
import { defineComponent, ref, reactive } from "vue";
import {useStore} from 'vuex';
import axios from "axios";

const store = useStore();
const userInfo = store.state.userInfo.username;

//get props
import { defineProps } from 'vue';
const props = defineProps(['question', 'questionId', 'commentsArray']);
//get props

const name = ref();
const cancel = () => modalController.dismiss(null, "cancel");

const state = reactive({
  body: '',
});

async function getComments(){
  try {
    //6553666e2561daa8212b0fc8
    props.commentsArray.length = 0;
    const { data } = await axios.get(`https://travel-app-api-8nj9.onrender.com/api/questions/${props.questionId}/comments`);
    data.comments.forEach((comment) => {
      const dateString = comment.created_at;
      const dateObject = new Date(dateString);

      const day = dateObject.getDay();
const month = dateObject.getMonth() + 1; // Months are zero-indexed, so add 1
const year = dateObject.getFullYear();

const formattedDate = `The ${day} / ${month} / ${year}`;
comment.created_at = formattedDate;

      props.commentsArray.push(comment);
     });
    //console.log(commentsArray)
  } catch (err) {}
}
getComments();

const currentUrl = window.location.href.split('/');
const currentCountry = currentUrl[currentUrl.length - 1]

const confirm = async () => {
  console.log("Submit button clicked");
  const commentData = {
    country: currentCountry,
    username: userInfo,
    body: state.body,
  };
  try {
    const comment = await axios.post(`https://travel-app-api-8nj9.onrender.com/api/questions/${props.questionId}/comments`, commentData);
    console.log(comment);
    getComments();
    await modalController.dismiss();
  } catch (err) {}
};

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
