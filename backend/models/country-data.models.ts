import axios from "axios";
import { PublicHolidays, RequestError, WeatherData } from "../types/country-data.interfaces";

async function fetchPublicHolidays(year: string, countryCode: string) {
  try {
    const response: any = await axios.get(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`);
    const holidays: PublicHolidays[] = response.data;
    if (!holidays) return Promise.reject({ status: 400, msg: "Invalid country code" });
    return holidays;
  } catch (err: any) {
    const msg: string = err.response.data.status === 400 ? "Bad query request" : "Invalid country code";
    const queryError: RequestError = { status: err.response.data.status, msg };
    return Promise.reject(queryError);
  }
}

async function fetchWeatherData(apiUrl: string) {
  try {
    const { data }: any = await axios.get(apiUrl);
    const weather: WeatherData = {
      name: data.location.name,
      country: data.location.country,
      localtime: data.location.localtime,
      weather: {
        temp_c: data.current.temp_c,
        condition: data.current.condition.text,
        icon: data.current.condition.icon,
        precip_mm: data.current.precip_mm,
      },
    };
    if (!weather) return Promise.reject({ status: 400, msg: "Invalid city name" });
    return weather;
  } catch (err) {
    return Promise.reject({ status: 400, msg: "unexpected error" });
  }
}

export { fetchWeatherData, fetchPublicHolidays };
