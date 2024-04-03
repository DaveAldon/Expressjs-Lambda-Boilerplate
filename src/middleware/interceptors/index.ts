import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { urlencoded, json, RequestHandler } from "express";
require("dotenv").config();

export const interceptors: RequestHandler[] = [
  urlencoded({ extended: false }),
  json(),

  (_req, _res, next) => {
    next();
  },
  ClerkExpressRequireAuth({}),
];
