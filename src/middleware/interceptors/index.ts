import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import { urlencoded, json, RequestHandler } from "express";
require("dotenv").config();

export const interceptors: RequestHandler[] = [
  urlencoded({ extended: false }),
  json(),

  (_req, _res, next) => {
    console.log(_req);
    next();
  },
  ClerkExpressWithAuth({}),
];
