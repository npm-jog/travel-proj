import express, { Request, Response } from "express";
import {
  getWishlistByUserId,
  postLocationByUserId,
  deleteLocationByCountryName,
} from "../controllers/wishlist.controller";

const wishlistRouter = express.Router();

wishlistRouter.get("/:user_id", getWishlistByUserId);
wishlistRouter.post("/:user_id", postLocationByUserId);
wishlistRouter.delete("/:user_id/:country_name", deleteLocationByCountryName);

export default wishlistRouter;
