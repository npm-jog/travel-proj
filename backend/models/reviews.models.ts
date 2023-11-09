import { Types } from "mongoose";
import Review from "./../../Database/models/review";

async function fetchReviewsByLocation(countryName: string | undefined) {
	try{
		const reviews = await Review.find({country: countryName})
		return reviews;
	} 	catch (err){
		return err;
	}
}
async function addReviewToDb(reviewToCreate: Document) {
	try{
		const newReview = await Review.create(reviewToCreate)
		return newReview;
	}   catch (err){
		return Promise.reject({status: 400, msg: 'Bad request: model validation failed'})
	}
}

async function removeReviewFromDb(requestReviewId: string) {
	try{
		const reviewId: Types.ObjectId = new Types.ObjectId(requestReviewId)
		const deletedReviewResponse = await Review.findByIdAndDelete(reviewId)
		return deletedReviewResponse;
	}   catch (err){
		return Promise.reject({status: 400, msg: 'Invalid Id. Id must be a 24 character hex string, 12 byte Uint8Array, or an integer'})
	}
}
async function editReviewInDb(requestReviewId: string, review: any) {
	try{
		const reviewDataToUpdate: Document = review;
		const options = {
			new: true,
		  };
		const reviewId: Types.ObjectId = new Types.ObjectId(requestReviewId)
		const updatedReviewResponse = await Review.findByIdAndUpdate(reviewId, reviewDataToUpdate, options)
		if(updatedReviewResponse === null) return Promise.reject({status: 404, msg: 'Id does not exist'})
		return updatedReviewResponse;
	}   catch (err){
		return Promise.reject({status: 400, msg: 'Invalid Id. Id must be a 24 character hex string, 12 byte Uint8Array, or an integer'})
	}
}

export {
	fetchReviewsByLocation,
	addReviewToDb,
	removeReviewFromDb,
	editReviewInDb,
};
