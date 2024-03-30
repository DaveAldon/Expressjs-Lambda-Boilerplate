import { urlencoded, json, RequestHandler } from "express";

export const interceptors: RequestHandler[] = [
  urlencoded({ extended: false }), // Enables URL-encoded parsing for the request body
  json(), // Enables JSON parsing for the request body

  (_req, _res, next) => {
    next(); // Passes the request to the next middleware
  },
  // We can insert additional interceptor functions here
];
