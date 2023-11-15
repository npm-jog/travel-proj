<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <h1 class="my-galleries-title">My Galleries</h1>
      <ion-card v-if="userInfo" class="album-div" v-for="x in countries" @click="navigateTo(x.country)">
        <ion-card-title v-if="userInfo">Album of {{ x.country }} </ion-card-title>
        <ion-img v-if="userInfo" class="album-card-image" :src="x.firstImage"> </ion-img>
      </ion-card>
      <ion-button class="ion-padding mygalleries-add-button" expand="block" @click="openModal">
        <ion-icon slot="icon-only" :icon="addOutline"></ion-icon>
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import router from "@/router";
import { IonPage, IonCard, IonCardTitle, IonImg, IonContent, IonButton, IonIcon } from "@ionic/vue";

import { addOutline } from "ionicons/icons";
import { modalController } from "@ionic/vue";
import UploadImageModal from "../components/UploadImageModal.vue";

export default defineComponent({
  components: {
    IonPage,
    IonCard,
    IonCardTitle,
    IonImg,
    IonContent,
    IonButton,
    IonIcon,
  },
  data() {
    return {
      countries: [] as any,
    };
  },
  watch: {
    userInfo: "awaitUserInfo", // Watch userInfo changes and call createMap
  },
  methods: {
    awaitUserInfo() {
      console.log("userInfo loaded, creating new map");
      this.uniqueCountries();
    },
    navigateTo(x: { country: string; firstImage: string }) {
      router.push({ path: `/mygalleries/${x}` });
    },
    async openModal() {
      const modal = await modalController.create({
        component: UploadImageModal,
      });
      modal.present();
    },
    uniqueCountries() {
      const addedAlbums = new Set();

      if (this.userInfo && this.userInfo.albums) {
        this.userInfo.albums.forEach((image: { country: string; url: string }) => {
          if (!addedAlbums.has(image.country)) {
            this.countries.push({
              country: image.country,
              firstImage: image.url,
            });
            addedAlbums.add(image.country);
          }
        });
      }
    },
  },
  computed: {
    // Use mapGetters to access the getUser getter from the store
    ...mapGetters(["getUserInfo"]),

    // Use a computed property to get the user from the store
    userInfo() {
      return this.getUserInfo;
    },
  },
  mounted() {
    this.uniqueCountries();
  },
});
</script>

<script setup lang="ts">
import { defineComponent } from "vue";
</script>

<style>
.my-galleries-title {
  text-align: center;
}

.album-div {
  text-align: center;
  height: 10rem;
}

.album-card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.mygalleries-add-button {
  width: 8rem;
  position: fixed;
  bottom: 0;
  left: 50%;
  margin-left: -4rem;
}
</style>
