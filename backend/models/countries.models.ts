import Country from "../Database/models/country";
import { CountryType } from '../types/types';

async function fetchAllCountries() {
  try {
    const countries: CountryType[] = await Country.find();

    return countries;
  } catch (err) {
    return Promise.reject({ status: 400, msg: "unexpected error" });
  }
}

export { fetchAllCountries };
