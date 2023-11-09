import { Request, Response, NextFunction } from "express";
import {
	fetchReviewsByLocation,
	addReviewToDb,
	removeReviewFromDb,
	editReviewInDb,
} from "../models/reviews.models";
import { Types } from "mongoose";

function getReviewsByLocation(req: Request, res: Response, next: NextFunction) {
	const reviewLocation: string | undefined = req.params.country_name as string | undefined
	fetchReviewsByLocation(reviewLocation)
		.then((reviews: any) => {
			res.status(200).send({reviews});
		})
		.catch((err) => {
			next(err);
		});
}

function postReview(req: Request, res: Response, next: NextFunction) {
	addReviewToDb(req.body)
		.then((postedReview) => {
			res.status(201).send({postedReview});
		})
		.catch((err) => {
			next(err);
		});
}

function deleteReviewById(req: Request, res: Response, next: NextFunction) {
	removeReviewFromDb(req.params.review_id)
		.then((x) => {
			res.status(204).send(x);
		})
		.catch((err) => {
			next(err);
		});
}

function patchReviewById(req: Request, res: Response, next: NextFunction) {
	editReviewInDb(req.params.review_id, req.body)
		.then((review) => {
			res.status(200).send({review});
		})
		.catch((err: Error) => {
			next(err);
		});
}

export {
	getReviewsByLocation,
	postReview,
	deleteReviewById,
	patchReviewById,
};
