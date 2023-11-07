import { Request, Response, NextFunction } from "express";
import {
	fetchReviewsByLocation,
	addReviewToDb,
	removeReviewFromDb,
	editReviewInDb,
} from "../models/reviews.models";

function getReviewsByLocation(req: Request, res: Response, next: NextFunction) {
	fetchReviewsByLocation()
		.then((x) => {
			res.status(200).send();
		})
		.catch((err: Error) => {
			next(err);
		});
}

function postReviewToLocation(req: Request, res: Response, next: NextFunction) {
	addReviewToDb()
		.then((x) => {
			res.status(201).send();
		})
		.catch((err: Error) => {
			next(err);
		});
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
