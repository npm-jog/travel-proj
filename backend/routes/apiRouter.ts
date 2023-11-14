import express from "express";
import { getAllEndpoints, getImgKit } from "../controllers/api.controllers";

const apiRouter = express.Router();

apiRouter.get("/", getAllEndpoints);
apiRouter.get("/img_kit", getImgKit);

export default apiRouter;
