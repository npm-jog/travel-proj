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
      <div>
        <capacitor-google-map ref="mapRef" style="display: inline-block; width: 100vw; height: 100vh"> </capacitor-google-map>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { ref, defineComponent, nextTick, toRaw } from "vue";
import { countries } from "../../API";
import { jsonData } from "../../countryData";
import { IonSearchbar, IonPage, IonContent, IonIcon, modalController, IonPopover } from "@ionic/vue";
import { GoogleMap, Marker } from "@capacitor/google-maps";
import apiKey from "@/components/APIKey.js";
import MapModal from "@/components/MapModal.vue";

const openModal = async (marker: any) => {
  const modal = await modalController.create({
    component: MapModal,
    componentProps: { marker },
  });
  modal.present();
  const { data, role } = await modal.onWillDismiss();
};

export default defineComponent({
  components: { IonSearchbar, IonPage, IonContent, IonIcon },
  data() {
    return {
      searchQuery: "",
      searchResult: [],
      countriesArr: countries,
      countriesData: jsonData,
      countries: [] as google.maps.Polygon[],
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
      await this.newMap.setOnMarkerClickListener(async (marker: any) => {
        openModal(marker);
      });
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
          await this.newMap.setCamera({
            coordinate: this.newCoordinates,
            zoom: 5,
          });
          this.newMap.addListener("load", () => {
            const bounds = this.newMap.getBounds();
            // Add markers to the map.
            this.addCustomMarkers(bounds);
          });
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
    initCountry() {
      this.countriesData.forEach((country) => {
        let countryCoords: any[];
        let ca: string[];
        let co: string[];

        if ("multi" in country) {
          const ccArray = [];

          for (const t in country.xml.Polygon) {
            countryCoords = [];

            co = country.xml.Polygon[t].outerBoundaryIs.LinearRing.coordinates.split(" ");

            for (const i in co) {
              ca = co[i].split(",");
              countryCoords.push({ lat: Number(ca[1]), lng: Number(ca[0]) });
            }

            ccArray.push(countryCoords);
          }
          this.createCountry(ccArray, country);
        } else {
          countryCoords = [];

          co = country.xml.outerBoundaryIs.LinearRing.coordinates.split(" ");

          for (const j in co) {
            ca = co[j].split(",");
            countryCoords.push({ lat: Number(ca[1]), lng: Number(ca[0]) });
          }
          this.createCountry(countryCoords, country);
        }
      });

      this.showCountries();
    },

    showCountries() {
      for (let i = 0; i < countries.length; i++) {
        countries[i].setMap(this.newMap);

        google.maps.event.addListener(countries[i], "mouseover", function () {
          this.countrie[i].setOptions({ fillColor: "#f5c879", fillOpacity: 0.5 });
        });

        google.maps.event.addListener(countries[i], "mouseout", function () {
          this.countrie[i].setOptions({ fillColor: "#f5c879", fillOpacity: 0 });
        });

        google.maps.event.addListener(countries[i], "click", function () {
          alert(`${this.countrie[i].title} (${this.countrie[i].code})`);
        });
      }
    },
    createCountry(coords: any, country: any) {
      const currentCountry = new google.maps.Polygon({
        paths: coords,
        strokeOpacity: 0,
        fillColor: country.color,
        fillOpacity: 0,
      });

      this.countries.push(currentCountry);
      console.log("country", this.countries);
    },
  },
  mounted() {
    nextTick(() => {
      this.createMap();
      this.initCountry();
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
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  padding: 10px;
  width: 75%;
  float: right;
  list-style-type: none;
  z-index: 4;
  position: absolute;
  top: 40px;
  left: 20%;
}
.filtered-countries li {
  cursor: pointer;
}
</style>
