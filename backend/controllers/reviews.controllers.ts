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
		.catch((err: Error) => {
			next(err);
		});
}

function postReviewToLocation(req: Request, res: Response, next: NextFunction) {
	const reviewLocation: string | undefined = req.params.country_name as string | undefined
	res.status(201).send();
	/*addReviewToDb()
		.then((x) => {
			res.status(201).send();
		})
		.catch((err: Error) => {
			next(err);
		});*/
}

function deleteReviewById(req: Request, res: Response, next: NextFunction) {
	removeReviewFromDb()
		.then((x) => {
			res.status(204).send();
		})
		.catch((err: Error) => {
			next(err);
		});
}

function patchReviewById(req: Request, res: Response, next: NextFunction) {
	editReviewInDb()
		.then((x) => {
			res.status(200).send();
		})
		.catch((err: Error) => {
			next(err);
		});
}

export {
	getReviewsByLocation,
	postReviewToLocation,
	deleteReviewById,
	patchReviewById,
};
