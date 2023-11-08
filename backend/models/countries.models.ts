import Country from "./../../Database/models/country";

async function fetchAllCountries() {
  try {
    const countries = await Country.find();

    return countries;
  } catch (err) {
    return err;
  }
}

export { fetchAllCountries };
