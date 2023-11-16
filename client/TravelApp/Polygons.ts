import { jsonData } from "./countryData";
import { Polygon } from "@capacitor/google-maps";
import store from "../TravelApp/src/components/store";

export let polygons: Polygon[] = [];
export let countriesList: string[] = [];

export function initCountry() {
  // Reset arrays at the beginning
  polygons = [];
  countriesList = [];

  jsonData.forEach((country) => {
    let countryCoords: any[];
    let ca: string[];
    let co: string[];
    if ("multi" in country) {
      const ccArray: any = [];
      for (const t in country.xml.Polygon) {
        countryCoords = [];
        co = country.xml.Polygon[t].outerBoundaryIs.LinearRing.coordinates.split(" ");
        for (const i in co) {
          ca = co[i].split(",");
          countryCoords.push({ lat: Number(ca[1]), lng: Number(ca[0]) });
        }
        ccArray.push(countryCoords);
      }
      createCountry(ccArray, country);
    } else {
      countryCoords = [];
      co = country.xml.outerBoundaryIs.LinearRing.coordinates.split(" ");
      for (const j in co) {
        ca = co[j].split(",");
        countryCoords.push({ lat: Number(ca[1]), lng: Number(ca[0]) });
      }
      createCountry(countryCoords, country);
    }
  });
}

function createCountry(coords: any, country: any) {
  const userInfo = store.getters.getUserInfo || null;

  const polygon = {
    paths: coords,
    strokeColor: "#fffffff",
    strokeWeight: 1,
    fillColor: "#D7D7D5",
    fillOpacity: 0.6,
  };
  if (userInfo) {
    userInfo.wishlist.forEach((wish) => {
      if (String(wish) === String(country.country)) {
        polygon.fillColor = "#D69F1F";
        polygon.fillOpacity = 0.8;
      }
    });

    userInfo.visited_locations.forEach((visited) => {
      if (String(visited) === String(country.country)) {
        polygon.fillColor = "#598C2C";
        polygon.fillOpacity = 0.8;
      }
    });
  }

  countriesList.push(country.country);
  polygons.push(polygon);
}
