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
  
  export interface SafetyData {
    score: number;
    sources_active: number;
    message: string;
    updated: string;
    source: string;
  }
  
  export interface TravelAdvisoryResponse {
    iso_alpha2: string;
    name: string;
    continent: string;
    advisory: SafetyData;
  }

  export interface ImageResponse {
    id: number;
    width: number;
    height: number;
    url: string;
    photographer: string;
    photographer_url: string;
    photographer_id: number;
    avg_color: string;
    src: object;
    liked: boolean;
    alt: string;
  }