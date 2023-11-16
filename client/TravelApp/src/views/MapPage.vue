<template>
  <ion-page id="map-content" class="mapppp">
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
      <div>
        <capacitor-google-map ref="mapRef" style="display: inline-block; width: 100vw; height: 100vh"> </capacitor-google-map>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { ref, defineComponent, nextTick, toRaw } from "vue";
import { countries } from "../../API";
import { polygons, countriesList, initCountry } from "../../Polygons";
import { IonSearchbar, IonPage, IonContent, IonIcon, modalController, IonPopover } from "@ionic/vue";
import { GoogleMap, Marker } from "@capacitor/google-maps";
import apiKey from "@/components/APIKey.js";
import MapModal from "@/components/MapModal.vue";
import axios from "axios";
import { mapGetters } from "vuex";

const openModal = async (marker: any, picsArray: any) => {
  const modal = await modalController.create({
    component: MapModal,
    componentProps: { marker, picsArray },
  });
  modal.present();
  const { data, role } = await modal.onWillDismiss();
};

const fetchCarouselPictures = async (country: any) => {
  const picsArray: any = [];
  try {
    const { data } = await axios.get(`https://travel-app-api-8nj9.onrender.com/api/country_data/images/${country}}`);
    data.images.forEach(({ src }: any) => {
      picsArray.push(src.large);
      if (picsArray.length === data.images.length) {
        openModal(country, picsArray);
      }
    });
  } catch (err) {}
};

export default defineComponent({
  components: { IonSearchbar, IonPage, IonContent, IonIcon },
  data() {
    return {
      searchQuery: "",
      searchResult: [] as any,
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
    // Use mapGetters to access the getUser getter from the store
    ...mapGetters(["getUserInfo"]),

    // Use a computed property to get the user from the store
    userInfo() {
      return this.getUserInfo;
    },
  },
  watch: {
    userInfo: "awaitUserInfo", // Watch userInfo changes and call createMap
  },
  methods: {
    awaitUserInfo() {
      //nextTick(() => {
      this.createMap();
      //});
    },
    async createMap() {
      if (!this.$refs.mapRef) return;
      if (this.newMap) {
        await this.newMap.destroy();
      }
      this.newMap = await GoogleMap.create({
        id: "Travel-Map",
        element: this.$refs.mapRef as HTMLElement,
        apiKey: apiKey.mapsKey,
        config: {
          center: {
            lat: 54,
            lng: -2,
          },
          zoom: 3,
        },
      });

      initCountry();
      console.log("polygon length, countries length", polygons.length, countriesList.length);

      await this.newMap.addMarkers(this.createMarkerData(toRaw(this.countriesArr)));
      await this.newMap.addPolygons(polygons);
      let polygonClickTimer: any = null;

      await this.newMap.setOnPolygonClickListener(async (polygon: any) => {
        if (polygonClickTimer) {
          clearTimeout(polygonClickTimer);
          polygonClickTimer = null;
        }

        polygonClickTimer = setTimeout(async () => {
          clearTimeout(polygonClickTimer);
          polygonClickTimer = null;

          fetchCarouselPictures(countriesList[Number(polygon.polygonId) % 249]);
        }, 200);
      });
      // Get the bounds after the map is fully loaded
      google.maps.event.addListenerOnce(this.newMap, "idle", () => {
        const bounds = this.newMap.getBounds();
      });
    },
    createMarkerData(arr: any) {
      const markers: Marker[] = [];
      for (let i = 0; i < arr.length; i++) {
        markers.push({
          coordinate: arr[i].coordinates,
          title: arr[i].name,
          snippet: "placeholder",
          iconUrl: "./assets/pin.png",
          iconSize: new google.maps.Size(20, 20),
          iconAnchor: new google.maps.Point(10, 20),
        });
      }
      return markers;
    },

    handleSearch() {
      if (this.searchQuery === "") {
        this.searchResult = [];
      } else {
        this.searchResult = this.filteredCountries;
      }
    },
    async resetMap(result: any) {
      this.searchQuery = result.name;
      this.searchResult = [];
      if (result) {
        this.newCoordinates = toRaw(result.coordinates);
        if (this.newMap) {
          await this.newMap.setCamera({
            coordinate: this.newCoordinates,
            zoom: 6,
          });
        }
      }
    },
    clearSearchQuery() {
      this.searchQuery = "";
      this.searchResult = [];
    },
    convertToRaw(passedData: any) {
      return toRaw(passedData);
    },
  },
  mounted() {
    const mapElements = document.getElementsByClassName("mapppp")[0];
    mapElements.classList.remove("ion-page-invisible");
    // nextTick(() => {
    this.createMap();
    // });
  },
});
</script>

<style scoped>
.home-search {
  width: 85%;
  float: right;
}
.filtered-countries {
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 10px;
  padding: 10px;
  width: 75%;
  float: right;
  list-style-type: none;
  z-index: 4;
  position: absolute;
  top: 40px;
  left: 20%;

  max-height: 50%;
  overflow-y: scroll;
}
.filtered-countries li {
  cursor: pointer;
}
</style>
