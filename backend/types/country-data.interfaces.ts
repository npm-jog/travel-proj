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

export interface PublicHolidaysArray extends Array<PublicHolidays>{}

export interface RequestError {
    status: number,
    msg: string
}