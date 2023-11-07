<template>
  <side-menu />
  <Ion-page>
    <nav-bar />
    <ion-content :fullscreen="true">Map</ion-content>
  </Ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from "@ionic/vue";
</script>
