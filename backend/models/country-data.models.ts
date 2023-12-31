import axios, { AxiosResponse, AxiosError } from "axios";
import { RequestError } from "../interfaces/response.interfaces";
import {PublicHolidays, WeatherData, SafetyData, TravelAdvisoryResponse, ImageResponse} from '../interfaces/axios-response.interfaces';

async function fetchPublicHolidays(year: string, countryCode: string) {
  try {
    const response: AxiosResponse<any, any> = await axios.get(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`);
    const holidays: PublicHolidays[] = response.data;
    if (!holidays) return Promise.reject({ status: 400, msg: "Invalid country code" });
    return holidays;
  } catch (err: AxiosError | any) {
    if (axios.isAxiosError(err))  {
      const status: number = err?.response?.data.status;
      const msg: string = status === 400 ? "Bad query request" : "Invalid country code";
      const queryError: RequestError = { status, msg };
      return Promise.reject(queryError);
    } 
    return err
  }
}

async function fetchWeatherData(apiUrl: string) {
  try {
    const { data }: AxiosResponse<any, any> = await axios.get(apiUrl);
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
  } catch (err: AxiosError | any) {
    if (axios.isAxiosError(err))  {
      return Promise.reject({ status: 400, msg: "unexpected error" });
    } 
    return err
  }
}

async function fetchSafetyData(countryCode: string) {
  try {
    const response: AxiosResponse<any, any> = await axios.get(`https://www.travel-advisory.info/api?countrycode=${countryCode}`);
    const travelAdvisoryResponse: TravelAdvisoryResponse = response.data.data[countryCode]
    if (!travelAdvisoryResponse) return Promise.reject({ status: 400, msg: "Invalid country code" });
    const safetyData: SafetyData = travelAdvisoryResponse.advisory;
    return safetyData;
  } catch (err: AxiosError | any) {
    if (axios.isAxiosError(err))  {
      return Promise.reject({ status: 400, msg: "Axios request failed" });
    } 
    return err
  }
}

async function fetchCountryImages(country: string) {
  try {
    const options = {
      method: 'GET',
      url: `https://api.pexels.com/v1/search?query=${country}%20scenery&per_page=10`,
      headers: {
        Authorization: process.env.IMAGES_API
      }
    }
    const response: AxiosResponse<any, any> = await axios.request(options);
    const images: ImageResponse[] = response.data.photos
    return images;
  } catch (err: AxiosError | any) {
    if (axios.isAxiosError(err))  {
      return Promise.reject({ status: 400, msg: "Axios request failed" });
    } 
    return err
  }
}

export { fetchWeatherData, fetchPublicHolidays, fetchSafetyData, fetchCountryImages };
