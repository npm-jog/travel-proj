<template>
  <ion-header class="questions-header">
    <h1 class="questions-heading">User Questions</h1>
  </ion-header>
  <ion-content class="ion-padding">
    <div class="dummy-questions">
      <!-- Dummy Questions Section -->
      <ion-card
        class="question-card"
        v-for="question in dummyQuestions"
        :key="question.id">
        <ion-card-content>
          <ion-avatar slot="start">
            <ion-img :src="question.userAvatar" alt="User Avatar"></ion-img>
          </ion-avatar>
          <ion-card-title>{{ question.username }}</ion-card-title>
          <ion-card-subtitle>{{ question.date }}</ion-card-subtitle>
          <p>{{ question.questionText }}</p>

          <!-- Reply Button -->
          <!-- <ion-button @click="toggleReplyForm(question.id)" expand="full">
            Reply
          </ion-button> -->

          <ion-button @click="openSecondModal" expand="full">
            See responses
          </ion-button>

          <!-- Reply Form -->
          <form v-if="question.showReplyForm" class="Reply-form">
            <ion-item class="userReply">
              <ion-input
                label-placement="stacked"
                label=""
                type="reply"
                placeholder="Write your reply here:"></ion-input>
            </ion-item>
            <ion-button @click="submitReply(question.id)" expand="full">
              Submit Reply
            </ion-button>
          </form>
        </ion-card-content>
      </ion-card>
    </div>
  </ion-content>
  <!-- Input form -->
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
import { defineComponent, ref } from "vue";
import AnswersModal from "./AnswersModal.vue";
const name = ref();
const cancel = () => modalController.dismiss(null, "cancel");
const confirm = () => modalController.dismiss(name.value, "confirm");

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

const openSecondModal = async () => {
  const secondModal = await modalController.create({
    component: AnswersModal, // Replace with the component you want for the second modal
    cssClass: "second-modal-css", // Add styling if needed
    componentProps: {
      question: "What is the best place to go out here?",
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

.questions-heading {
}

.question-card {
  margin-bottom: 5%;
}

.Reply-form {
  margin-top: 10px;
}
</style>
