<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start" @click="logger('Button works')">
        <ion-menu-button></ion-menu-button>
      </ion-buttons>
      <ion-title>Menu</ion-title>
      <!-- <ion-input placeholder="Seach for country" slot="end"></ion-input> -->
      <ion-searchbar
        placeholder="Seach for country"
        v-if="true"></ion-searchbar>
    </ion-toolbar>
  </ion-header>
</template>

<script lang="ts">
import {
  IonSearchbar,
  IonInput,
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

// const currentUrl = window.location.href;
// const urlArray = currentUrl.split("/");
// const URL = urlArray[urlArray.length - 1];
// console.log(URL, "this is the url");

export default defineComponent({
  components: {
    IonSearchbar,
    IonInput,
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
ion-searchbar {
  margin-bottom: 10px;
}

ion-buttons {
  width: 3%;
  height: 2%;
  border: solid 1px;
}

ion-input {
  text-align: center;
  color: black;
  background-color: white;
  margin: auto;
  height: 1px;
  width: 200px;
  border: solid red 1px;
  border-radius: 50px;
  margin-bottom: 20%;
}
</style>
