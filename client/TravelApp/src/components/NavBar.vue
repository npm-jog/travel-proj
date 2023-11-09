<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start" @click="logger('Button works')">
        <ion-menu-button></ion-menu-button>
      </ion-buttons>
      <ion-title>Menu</ion-title>
      <ion-searchbar
        placeholder="Search for country"
        v-if="path"></ion-searchbar>
    </ion-toolbar>
  </ion-header>
</template>

<script lang="ts">
import {
  IonSearchbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    IonSearchbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonToolbar,
  },
  data() {
    return {
      path: this.$route.path === "/map",
    };
  },
  methods: {
    logger(msg: string): void {
      console.log(msg);
    },
  },
  watch: {
    $route(to, from) {
      this.path = to.path === "/map";
    },
  },
});
</script>

<style scoped>
/* Your styles remain unchanged */
</style>
