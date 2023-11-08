<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start" @click="logger('Button works')">
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

function logger(msg: string): void {
  console.log(msg);
}

import { defineComponent } from "vue";

export default defineComponent({
  components: {
    IonButtons,
    IonHeader,
    IonMenuButton,
    IonTitle,
    IonToolbar,
  },
  methods: { logger },
});
</script>

<style scoped>
ion-buttons {
  width: 50px;
  height: 50px;
  border: solid 1px;
}
</style>
