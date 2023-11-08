import { Request, Response, NextFunction } from "express";
import {
  fetchWishlistByUserId,
  addLocationByUserId,
  removeLocationByCountryName,
} from "../models/wishlist.models";

function getWishlistByUserId(req: Request, res: Response, next: NextFunction) {
  // fetchWishlistByUserId().then(x => {
  //   res.status(200).send()
  // })
  // .catch((err: Error) => {
  //   next(err)
  // })
}

function postLocationByUserId(req: Request, res: Response, next: NextFunction) {
  // addLocationByUserId().then(x => {
  //   res.status(201).send()
  // })
  // .catch((err: Error) => {
  //   next(err)
  // })
}

function deleteLocationByCountryName(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // removeLocationByCountryName().then(x => {
  //   res.status(204).send()
  // })
  // .catch((err: Error) => {
  //   next(err)
  // })
}

export {
  getWishlistByUserId,
  postLocationByUserId,
  deleteLocationByCountryName,
};
