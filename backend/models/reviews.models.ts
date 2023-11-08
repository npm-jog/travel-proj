import Review from "./../../Database/models/review";
import { Types } from "mongoose";

async function fetchReviewsByLocation(countryName: string | undefined) {
	try{
			const reviews = await Review.find({country: countryName})
			return reviews;
	}
	catch (err){
		return err;
	}
}
//countryName: string | undefined
async function addReviewToDb() {
	try{
		//{country: countryName}
		const reviews = await Review.find()
		return reviews;
}
catch (err){
	return err;
}
}

function removeReviewFromDb() {
	const myPromise: Promise<string> = new Promise((resolve, reject) => {
		resolve("hello" + "world");
	});
	return myPromise;
}

function editReviewInDb() {
	const myPromise: Promise<string> = new Promise((resolve, reject) => {
		resolve("hello" + "world");
	});
	return myPromise;
}

export {
	fetchReviewsByLocation,
	addReviewToDb,
	removeReviewFromDb,
	editReviewInDb,
};
