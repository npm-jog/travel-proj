<template>
  <ion-header class="questions-header">
    <h2>Upload an image/Create a new album</h2>
  </ion-header>
  <ion-content class="ion-padding">
    <form class="img-upload-form">
      <ion-searchbar class="album-search" placeholder="Search for country" v-model="searchQuery" @ionInput="handleSearch()">
        <ion-icon name="close-circle" slot="end" @click="clearSearchQuery()" class="search-clear-button"></ion-icon>
      </ion-searchbar>

      <IKUpload
        :tags="['tag1', 'tag2']"
        :responseFields="['tags']"
        @error="onError"
        @success="onSuccess"
        @progress="onProgress"
        customCoordinates="10,10,100,100"
      />
      <p v-if="progress">Progress: {{ progress }}%</p>
      <p v-if="uploadErr">Something went wrong!</p>
    </form>
    <ul class="filtered-countries" v-if="searchResult.length > 0">
      <li v-for="country in searchResult" :key="country.name" @click="manageSearch(country)">
        {{ country.name }}
      </li>
    </ul>
  </ion-content>

  <!-- Toolbar -->
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-button color="medium" @click="cancel">Cancel</ion-button>
    </ion-buttons>
    <ion-buttons slot="end">
      <ion-button @click="confirm" :strong="true" :disabled="!newURL">Upload </ion-button>
    </ion-buttons>
  </ion-toolbar>
</template>

<script lang="ts">
import { mapGetters, useStore } from "vuex";
import axios from "axios";
import { countries } from "../../API";

export default defineComponent({
  data() {
    return {
      album: "",
      store: useStore(),
      newURL: null,
      progress: null,
      uploadErr: false,
      countriesArr: countries,
      searchQuery: "",
      searchResult: [] as any,
    };
  },
  methods: {
    confirm() {
      const updatedUser = { ...this.userInfo };

      updatedUser.albums.push({
        country: this.searchQuery.length > 0 ? this.searchQuery : "All",
        url: this.newURL,
      });

      this.patchUserInfo(updatedUser)
        .then((res: any) => {
          this.store.commit("setUserInfo", res.data.user);
          modalController.dismiss(null, "confirm");
        })
        .catch((err) => {
          console.log(err);
          this.uploadErr = true;
          setTimeout(() => {
            this.uploadErr = false;
          }, 5000);
        });
      //reload the album
    },
    onSuccess(res: any) {
      this.newURL = res.url;
      this.progress = null;
    },
    onProgress(progress: any) {
      this.progress = progress;
    },
    onError(err: any) {
      console.log("Error" + err);
      this.uploadErr = true;
      setTimeout(() => {
        this.uploadErr = false;
      }, 5000);
    },
    patchUserInfo(update: object) {
      return axios.patch(`https://travel-app-api-8nj9.onrender.com/api/users/${this.userInfo._id}`, update);
    },
    handleSearch() {
      if (this.searchQuery === "") {
        this.searchResult = [];
      } else {
        this.searchResult = this.filteredCountries;
      }
    },
    clearSearchQuery() {
      this.searchQuery = "";
      this.searchResult = [];
    },
    manageSearch(result: any) {
      this.searchQuery = result.name;
      this.searchResult = [];
    },
  },
  computed: {
    // Use mapGetters to access the getUser getter from the store
    ...mapGetters(["getUserInfo"]),

    // Use a computed property to get the user from the store
    userInfo() {
      return this.getUserInfo;
    },
    filteredCountries() {
      return this.countriesArr.filter((country: any) => country.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    },
  },
});
</script>

<script lang="ts" setup>
import { IonContent, IonSearchbar, IonHeader, IonToolbar, IonButtons, IonButton, IonInput, modalController } from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { IKUpload } from "imagekit-vue3";

const request = ref();
const cancel = () => modalController.dismiss(null, "cancel");
</script>

<style scoped>
.img-upload-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}
.img-upload-form > * {
  margin: 1rem;
}
.filtered-countries {
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 10px;
  padding: 10px;
  width: 75%;
  list-style-type: none;
  z-index: 4;
  position: absolute;
  top: 70px;
  left: 80px;
  max-height: 40%;
  overflow-y: scroll;
}
.filtered-countries li {
  cursor: pointer;
}
</style>
