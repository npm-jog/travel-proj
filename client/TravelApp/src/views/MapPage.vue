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
import { GoogleMap, Marker } from "@capacitor/google-maps";
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
      newMap: null as any,
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
          center: {
            lat: 54,
            lng: -2,
          },
          zoom: 6,
        },
      });
      this.addCustomMarkers(this.createMarkerData(toRaw(this.countriesArr)));
    },
    createMarkerData(arr: any) {
      const markers: Marker[] = [];
      for (let i = 0; i < arr.length; i++) {
        markers.push({
          coordinate: arr[i].coordinates,
          title: arr[i].name,
          snippet: "placeholder",
        });
      }
      return markers;
    },
    async addCustomMarkers(markers: any) {
      console.log(markers);
      await this.newMap.addMarkers(markers);
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
        if (this.newMap) {
          await this.newMap.setCamera({ coordinate: this.newCoordinates });
        }
      }
    },
    convertToRaw(passedData: any) {
      console.log(toRaw(passedData));
      return toRaw(passedData);
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
