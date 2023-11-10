import axios from "axios";

async function fetchWeatherData(apiUrl: string) {
  try {
    const { data } = await axios.get(apiUrl);
    const weather = {
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
    return weather;
  } catch (err) {
    return Promise.reject({ status: 400, msg: "unexpected error" });
  }
}

export { fetchWeatherData };
