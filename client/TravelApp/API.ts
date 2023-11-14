import axios from "axios";

export const countries: any = [];

async function fetchCountries() {
  try {
    const { data } = await axios.get("https://travel-app-api-8nj9.onrender.com/api/countries");
    data.countries.forEach((countrie: any) => {
      countries.push(countrie);
    });
  } catch (err) {
    console.log(err);
  }
}

fetchCountries();
