<template>
  <ion-menu content-id="main-content" side="start">
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu Content</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">This is the menu content.</ion-content>
  </ion-menu>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonMenu,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";

import { defineComponent } from "vue";

export default defineComponent({
  components: {
    IonContent,
    IonHeader,
    IonMenu,
    IonPage,
    IonTitle,
    IonToolbar,
  },
});
</script>
