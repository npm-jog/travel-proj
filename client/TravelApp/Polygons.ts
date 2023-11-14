import { jsonData } from "./countryData";
import { Polygon } from "@capacitor/google-maps";

export const polygons: Polygon[] = [];
export const countriesList: string[] = [];

function initCountry() {
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
  const polygon = {
    paths: coords,
    strokeColor: "#fffffff",
    strokeWeight: 1,
    fillColor: "#71ACD6",
    fillOpacity: 0.55,
  };

  polygons.push(polygon);
  countriesList.push(country.country);
}

initCountry();
