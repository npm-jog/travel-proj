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
          <ion-avatar slot="start">
            <ion-img :src="question.userAvatar" alt="User Avatar"></ion-img>
          </ion-avatar>
          <ion-card-title>{{ question.username }} <span>{{question.created_at}}</span></ion-card-title>
          <ion-card-subtitle>About {{ question.topic }}</ion-card-subtitle>
          <p>{{ question.body }}</p>
          <p display="hidden">{{ question._id }}</p>

          <!-- Reply Button -->
          <!-- <ion-button @click="toggleReplyForm(question.id)" expand="full">
            Reply
          </ion-button> -->

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
import { defineComponent, ref, defineProps, reactive, toRaw } from "vue";
import AnswersModal from "./AnswersModal.vue";
import axios from 'axios';

const name = ref();
const cancel = () => modalController.dismiss(null, "cancel");
const state = reactive({
  body: "",
  title: '',
  topic: ''
});

let { questionsArray } = defineProps(["questionsArray"]);
console.log(questionsArray, "this is props");

async function getQuestions() {
  try {
    const { data } = await axios.get("https://travel-app-api-8nj9.onrender.com/api/questions?country=Italy");
    console.log(data.questions) 
    data.questions.forEach((question) => {
      questionsArray.push(question);
    });
    console.log(questionsArray)
  } catch (err) {}
}
getQuestions();

const confirm = async () => {
  console.log("Submit button clicked");
  const questionData = {
    username: "David",
    title: state.title,
    body: state.body,
    topic: state.topic,
    country: "Italy",
  };
  try {
    const questions = await axios.post("https://travel-app-api-8nj9.onrender.com/api/questions", questionData);
    console.log(questions);
    getQuestions();
    await modalController.dismiss();
  } catch (err) {}
};

// Example data
const dummyQuestions = [
  {
    id: 1,
    username: "Alice1234",
    date: "Nov 13, 2023",
    userAvatar: "url-to-avatar-image",
    questionText: "What are the best places to visit in summer?",
    showReplyForm: false,
  },
  // Add more dummy questions as needed
];

const openSecondModal = async (questionId, questionTitle) => {
  console.log('parent here', questionId, 'logged this', questionTitle)
  const secondModal = await modalController.create({
    component: AnswersModal, // Replace with the component you want for the second modal
    cssClass: "second-modal-css", // Add styling if needed
    componentProps: {
      question: questionTitle,
      questionId: questionId
      // You can pass data to the second modal if needed
    },
  });

  await secondModal.present();
};

/*
          <!-- Reply Form -->
          <form v-if="question.showReplyForm" class="Reply-form">
            <ion-item class="userReply">
              <ion-input
                label-placement="stacked"
                label=""
                type: any = "reply"
                placeholder="Write your question here:"></ion-input>
            </ion-item>
            <!--<ion-button @click="submitReply(question.id)" expand="full">
              Submit Reply
            </ion-button>-->
          </form>
*/
</script>

<style scoped>
.questions-header {
  display: flex;
  justify-content: center;
}

.questions-heading {
}

.question-card {
  margin-bottom: 5%;
}

.Reply-form {
  margin-top: 10px;
}
</style>
