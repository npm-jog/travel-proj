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
        @ionInput="handleSearch(countries, filteredCountries)"
      ></ion-searchbar>
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
import { defineComponent, ref } from "vue";

import { countries } from "../../API.js";

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
      filteredCountries: ref(),
    };
  },
  methods: {
    logger(msg: string): void {
      console.log(msg);
    },

    handleSearch(arr: any, filteredArr: any) {
      filteredArr = arr.filter((country: any) =>
        country.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      let selectedCountry = filteredArr[0];
      return selectedCountry;
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
