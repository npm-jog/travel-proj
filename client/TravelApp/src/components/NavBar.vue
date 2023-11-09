<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start" @click="logger('Button works')">
        <ion-menu-button></ion-menu-button>
      </ion-buttons>
      <ion-title>Menu</ion-title>
      <ion-searchbar
        placeholder="Search for country"
        v-if="path"
        v-model="searchQuery"
        @ionInput="handleSearch()"></ion-searchbar>
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
  IonHeader,
  IonInput,
} from "@ionic/vue";
import { defineComponent } from "vue";

import { countries } from "../../API.js";
console.log(countries());

export default defineComponent({
  components: {
    IonSearchbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonInput,
  },
  data() {
    return {
      path: this.$route.path === "/map",
      searchQuery: "",
      countries: countries(),
    };
  },
  methods: {
    logger(msg: string): void {
      console.log(msg);
    },

    handleSearch() {
      const filteredCountries = this.countries.filter((country) =>
        country.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      console.log(filteredCountries[0].name);
      if (filteredCountries.length === 1) {
        const coordinates = filteredCountries[0].coordinates;
      }
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
