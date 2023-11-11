export interface PublicHolidays {
  date: string;
  localName: string;
  name: string;
  countryCode: String;
  fixed: Boolean;
  global: Boolean;
  countries: any;
  launchYear: any;
  types: String[];
}

export interface WeatherData {
  name: string;
  country: string;
  localtime: string;
  weather: {
    temp_c: number;
    condition: string;
    icon: string;
    precip_mm: number;
  };
}

export interface PublicHolidaysArray extends Array<PublicHolidays> {}

export interface RequestError {
  status: number;
  msg: string;
}
