<template>
  <ion-page>
    <NavBar />
    <ion-content :fullscreen="true">CountryPage</ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
} from "@ionic/vue";
import NavBar from "@/components/NavBar.vue";
</script>
