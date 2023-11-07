<template>
  <ion-page>
    <side-menu />
    <nav-bar />

    <ion-content :fullscreen="true" id="main-content">Country</ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from "@ionic/vue";
</script>
