<template>
  <div>
    <capacitor-google-map
      ref="mapRef"
      style="display: inline-block; width: 100vw; height: 86vh">
    </capacitor-google-map>
  </div>
</template>

<script setup lang="ts">
import { onMounted, nextTick, ref, onUnmounted } from "vue";
import { GoogleMap } from "@capacitor/google-maps";
import apiKey from "@/components/APIKey.js";

const props = defineProps<{
  markerData: { coordinate: any; title: string; snippet: string }[];
}>();
// EVENTS
const emits = defineEmits<{
  (event: "onMarkerClicked", info: any): void;
  (event: "onMapClicked"): void;
}>();

const mapRef = ref<HTMLElement>();
const markerIds = ref<string[] | undefined>();
let newMap: GoogleMap;

onMounted(async () => {
  console.log("mounted ", mapRef.value);
  await nextTick();
  await createMap();
});

// remove markers on unmount
onUnmounted(() => {
  console.log("onunmounted");
  newMap.removeMarkers(markerIds?.value as string[]);
});

const addSomeMarkers = async (newMap: GoogleMap) => {
  markerIds?.value && newMap.removeMarkers(markerIds?.value as string[]);

  // Plot each point on the map
  let markers = props.markerData.map(({ coordinate, title, snippet }) => {
    return {
      coordinate,
      title,
      snippet,
    };
  });

  markerIds.value = await newMap.addMarkers(markers);
};

async function createMap() {
  if (!mapRef.value) return;

  // render map using capacitor plugin
  newMap = await GoogleMap.create({
    id: "my-cool-map",
    element: mapRef.value,
    apiKey: apiKey.mapsKey,
    config: {
      center: {
        lat: 30,

        lng: 0,
      },
      zoom: 2.5,
    },
  });

  // add markers to map
  addSomeMarkers(newMap);

  // Set Event Listeners...
  // Handle marker click, send event back to parent
  newMap.setOnMarkerClickListener((event) => {
    emits("onMarkerClicked", event);
  });

  // Handle map click, send event back to parent
  newMap.setOnMapClickListener(() => {
    emits("onMapClicked");
  });
}
</script>
