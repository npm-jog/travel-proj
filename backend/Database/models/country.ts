import mongoose, { Document } from "mongoose";

export interface CountryDocument extends Document {
  name: string;
}

const countrySchema = new mongoose.Schema<CountryDocument>({
  name: { type: String, required: true },
});

const Country = mongoose.model<CountryDocument>("country", countrySchema);

export default Country;
