<template>
  <ion-header class="questions-header">
    <h1 class="questions-heading">User Questions</h1>
  </ion-header>
  <ion-content class="ion-padding">
    <div class="dummy-questions">
      <!-- Dummy Questions Section -->
      <ion-card
        class="question-card"
        v-for="question in questionsArray"
        :key="question.id">
        <ion-card-content test="test" :questionId=question._id>
          <ion-card-title>{{ question.username }} </ion-card-title>
          <ion-card-subtitle>{{ question.created_at }}</ion-card-subtitle>
          <ion-card-subtitle>About {{ question.topic }}</ion-card-subtitle>
          <p>{{ question.body }}</p>

          <ion-button @click="openSecondModal(question._id, question.body)" expand="full">
            See responses
          </ion-button>
        </ion-card-content>
      </ion-card>
    </div>
  </ion-content>
  <!-- Input form -->
  <form class="Review form">
    <ion-item class="userRev">
      <ion-input
        v-model = "state.title"
        label-placement="stacked"
        label=""
        type: any ="review"
        placeholder="Title">
      </ion-input>
    </ion-item>
    <ion-item class="userRev">
      <ion-input
        v-model = "state.topic"
        label-placement="stacked"
        label=""
        type: any ="review"
        placeholder="Topic">
      </ion-input>
    </ion-item>
    <ion-item class="userRev">
      <ion-input
        v-model = "state.body"
        label-placement="stacked"
        label=""
        type: any ="review"
        placeholder="Write your question here:">
      </ion-input>
    </ion-item>
  </form>

  <!-- Toolbar -->
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-button color="medium" @click="cancel">Cancel</ion-button>
    </ion-buttons>
    <ion-buttons slot="end">
      <ion-button @click="confirm" :strong="true">Confirm </ion-button>
    </ion-buttons>
  </ion-toolbar>
</template>

<script lang="ts" setup>
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonItem,
  IonInput,
  modalController,
  IonCard,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
} from "@ionic/vue";
import {  ref, defineProps, reactive } from "vue";
import AnswersModal from "./AnswersModal.vue";
import axios from 'axios';
import { useStore } from "vuex";

const name = ref();
const cancel = () => modalController.dismiss(null, "cancel");
const state = reactive({
  body: "",
  title: '',
  topic: ''
});

const currentUrl = window.location.href;
const splitURL = currentUrl.split("/");
const currentCountry = splitURL[splitURL.length - 1];
const store = useStore();

let {questionsArray, commentsArray} = defineProps(["questionsArray", "commentsArray"]);

async function getQuestions() {
  questionsArray.length = 0;
  try {
    const { data } = await axios.get(`https://travel-app-api-8nj9.onrender.com/api/questions?country=${currentCountry}`);
    data.questions.forEach((question: any) => {
      const dateString = question.created_at;
      const dateObject = new Date(dateString);
      const day = dateObject.getDay();
      const month = dateObject.getMonth() + 1;
        const year = dateObject.getFullYear();
      const formattedDate = `The ${day} / ${month} / ${year}`;
      question.created_at = formattedDate;

      questionsArray.push(question);
    });
  } catch (err) {}
}
getQuestions();

const confirm = async () => {
  const questionData = {
    username: store.state.userInfo.username,
    title: state.title,
    body: state.body,
    topic: state.topic,
    country: currentCountry,
  };
  try {
    const questions = await axios.post("https://travel-app-api-8nj9.onrender.com/api/questions", questionData);
    getQuestions();
    await modalController.dismiss();
  } catch (err) {}
};


const openSecondModal = async (questionId, questionTitle) => {

  const secondModal = await modalController.create({
    component: AnswersModal, // Replace with the component you want for the second modal
    cssClass: "second-modal-css", // Add styling if needed
    componentProps: {
      question: questionTitle,
      questionId: questionId,
      commentsArray: commentsArray
      // You can pass data to the second modal if needed
    },
  });

  await secondModal.present();
};

</script>

<style scoped>
.questions-header {
  display: flex;
  justify-content: center;
}

.question-card {
  margin-bottom: 5%;
}

.Reply-form {
  margin-top: 10px;
}
</style>
