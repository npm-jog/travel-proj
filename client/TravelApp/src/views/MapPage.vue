<template>
  <ion-page>
    <ion-content>
      <ion-searchbar
        class="home-search"
        placeholder="Search for country"
        v-model="searchQuery"
        @ionInput="handleSearch()"
        @keyup.enter="resetMap(searchResult[0])"
      >
        <ion-icon name="close-circle" slot="end" @click="clearSearchQuery()" class="search-clear-button"></ion-icon>
      </ion-searchbar>
      <ul class="filtered-countries" v-if="searchResult.length > 0">
        <li v-for="country in searchResult" :key="country.name" @click="resetMap(country)">
          {{ country.name }}
        </li>
      </ul>
      <div v-if="searchResult.length === 0">
        <p>No results found</p>
      </div>
      <div>
        <capacitor-google-map ref="mapRef" style="display: inline-block; width: 100vw; height: 100vh"> </capacitor-google-map>
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
      searchResult: [],
      countriesArr: countries,
      mapRef: ref<HTMLElement>(),
      newMap: null as any,
      newZoom: null as any,
      newCoordinates: null as any,
    };
  },
  computed: {
    filteredCountries() {
      return this.countriesArr.filter((country: any) => country.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    },
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

    handleSearch() {
      if (this.searchQuery === "") {
        this.searchResult = [];
      } else {
        this.searchResult = this.filteredCountries;
      }
    },

    async resetMap(result: any) {
      console.log(toRaw(result.coordinates));
      this.searchQuery = result.name;
      this.searchResult = [];
      if (result) {
        this.newCoordinates = toRaw(result.coordinates);
        if (this.newMap) {
          await this.newMap.setCamera({ coordinate: this.newCoordinates });
        }
      }
    },
    clearSearchQuery() {
      this.searchQuery = "";
      this.searchResult = [];
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
.filtered-countries {
  margin-top: 10px;
  width: 75%;
  float: right;
  list-style-type: none;
  padding: 0;
  background-color: none;
  z-index: 4;
}
.filtered-countries li {
  cursor: pointer;
}
</style>
