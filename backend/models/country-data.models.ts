import axios from 'axios';
//(year: Number, countryCode: String
async function fetchWeatherData() {
    try {
      //const axiosReq = await axios.get(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`)
      //console.log(axiosReq)
      //return axiosReq;
    } catch (err) {
        console.log(err)
        return err
      //return Promise.reject({ status: 400, msg: "unexpected error" });
    }
  }
  
  export { fetchWeatherData };