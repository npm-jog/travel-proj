import mongoose, { Document } from "mongoose";

export interface CountryDocument extends Document {
  name: string;
  coordinates: { lat: Number; lng: Number };
}

const countrySchema = new mongoose.Schema<CountryDocument>({
  name: { type: String, required: true },
  coordinates: { lat: { type: Number }, lng: { type: Number } },
});

const Country = mongoose.model<CountryDocument>("country", countrySchema);

export default Country;
