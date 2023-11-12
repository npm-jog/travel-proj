import axios, { AxiosResponse, AxiosError } from "axios";
import { PublicHolidays, RequestError, WeatherData, SafetyData, TravelAdvisoryResponse } from "../types/types";

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

export { fetchWeatherData, fetchPublicHolidays, fetchSafetyData };
