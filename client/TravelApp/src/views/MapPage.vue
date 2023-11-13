<template>
  <ion-page>
    <ion-content>
      <ion-searchbar
        class="home-search"
        placeholder="Search for country"
        v-model="searchQuery"
        @ionInput="handleSearch(countriesArr)"
        @keyup.enter="resetMap(searchResult[0])"
      ></ion-searchbar>
      <div>
        <capacitor-google-map
          ref="mapRef"
          style="display: inline-block; width: 100vw; height: 100vh"
        >
        </capacitor-google-map>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { ref, defineComponent, nextTick, toRaw } from "vue";
import { countries } from "../../API";
import { IonSearchbar, IonPage, IonContent } from "@ionic/vue";
import { GoogleMap } from "@capacitor/google-maps";
import apiKey from "@/components/APIKey.js";

export default defineComponent({
  components: { IonSearchbar, IonPage, IonContent },
  data() {
    return {
      path: this.$route.path === "/home",
      searchQuery: "",
      searchResult: "",
      countriesArr: countries(),
      mapRef: ref<HTMLElement>(),
      newMap: GoogleMap,
      newZoom: null as any,
      newCoordinates: null as any,
    };
  },
  methods: {
    async createMap() {
      if (!this.$refs.mapRef) return;
      this.newMap = await GoogleMap.create({
        id: "Travel-Map",
        element: this.$refs.mapRef,
        apiKey: apiKey.mapsKey,
        config: {
          center: this.newCoordinates || {
            lat: 30,

            lng: 0,
          },
          zoom: this.newZoom || 3,
        },
      });
    },
    handleSearch(arr: any) {
      this.searchResult = arr.filter((country: any) => {
        return this.searchQuery.toLowerCase() === country.name.toLowerCase();
      });
    },

    async resetMap(result: any) {
      console.log(toRaw(result.coordinates));
      if (result) {
        this.newCoordinates = toRaw(result.coordinates);
        this.newZoom = 6;
        if (this.newMap) {
          await this.newMap.removeAllMapListeners();
          await this.newMap.destroy();
        }
        await this.createMap();
      }
    },
  },
  watch: {
    $route(to, from) {
      this.path = to.path === "/home";
    },
  },
  mounted() {
    nextTick(() => {
      this.createMap();
    });
  },
});
</script>

<style scoped>
.home-search {
  width: 85%;
  float: right;
}
</style>
