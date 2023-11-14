import { Request, Response, NextFunction } from "express";
import * as api from "../endpoints.json";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  urlEndpoint: "https://ik.imagekit.io/pinpin",
  publicKey: "public_w3xAdF/JzWrdmQNjNT/NTcF2nlM=",
  privateKey: "private_txceh/0SEmvGl2mxCvvMSNRIteg=",
});

function getAllEndpoints(req: Request, res: Response, next: NextFunction) {
  res.status(200).send({ api });
}

function getImgKit(req: Request, res: Response, next: NextFunction) {
  const result = imagekit.getAuthenticationParameters();
  res.status(200).send(result);
}

export { getAllEndpoints, getImgKit };
