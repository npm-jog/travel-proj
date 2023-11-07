<template>
  <ion-header content-id="main-content">
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button></ion-menu-button>
      </ion-buttons>
      <ion-title>Menu</ion-title>
    </ion-toolbar>
  </ion-header>
</template>

<script lang="ts">
import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";

import { defineComponent } from "vue";

export default defineComponent({
  components: {
    IonButtons,
    IonHeader,
    IonMenuButton,
    IonTitle,
    IonToolbar,
  },
});
</script>

<style scoped>
ion-buttons {
  width: 50px;
  height: 50px;
  border: solid 1px;
}
</style>
