<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button color="medium" @click="close()">close</ion-button>
      </ion-buttons>
      <ion-title>{{ marker }}</ion-title>
    </ion-toolbar>
  </ion-header>
  <Carousel :pics="picsArray" />
  <div class="list-buttons">
    <VisitedButton :country="marker" />
    <WishlistButton :country="marker" />
  </div>
  <ion-button @click="navigateToGallery(marker)">Visit Gallery</ion-button>
  <ion-button @click="navigateToCountry(marker)">Visit Page</ion-button>
</template>

<script lang="ts">
export default defineComponent({
  components: {
    WishlistButton,
    VisitedButton,
  },
});
</script>

<script setup lang="ts">
import { IonButton, modalController, IonHeader, IonToolbar, IonButtons, IonTitle } from "@ionic/vue";
import { useRouter } from "vue-router";
import Carousel from "../components/Carousel.vue";
import WishlistButton from "../components/WishlistButton.vue";
import VisitedButton from "@/components/VisitedButton.vue";
import { defineComponent } from "vue";

const props = defineProps<{
  marker: any;
  picsArray: any;
}>();

const router = useRouter();

const navigateToCountry = (country: any) => {
  router.push({ path: `/country/${country}` });
  close();
};

const navigateToGallery = (country: any) => {
  router.push({ path: `/mygalleries/${country}` });
  close();
};

const close = () => modalController.dismiss(null, "close");
</script>

<style scoped>
.carouselContainer {
  height: 25%;
  margin-top: 200px;
}

.carouselPic {
  height: 400px;
  width: 300px;
}

.list-buttons {
  display: flex;
  width: 100%;
}
</style>
