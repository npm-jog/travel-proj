import axios from 'axios';
import {PublicHolidays, RequestError} from '../types/country-data.interfaces';
async function fetchPublicHolidays(year: string, countryCode: string) {
    try {
      const response: any = await axios.get(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`)
      const holidays: PublicHolidays[] = response.data
      if(!holidays) return Promise.reject({status: 400, msg: 'Invalid country code'})
      return holidays;
    } catch (err: any) {
      const msg: string = err.response.data.status === 400 ? 'Bad query request' : 'Invalid country code';
      const queryError: RequestError = {status: err.response.data.status, msg}
      return Promise.reject(queryError)
    }
  }
  
  export { fetchPublicHolidays };