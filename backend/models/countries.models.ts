import Country from "./../../Database/models/country";

async function fetchAllCountries() {
  try {
    const countries = await Country.find();

    return countries;
  } catch (err) {
    return Promise.reject({ status: 400, msg: "unexpected error" });
  }
}

export { fetchAllCountries };
