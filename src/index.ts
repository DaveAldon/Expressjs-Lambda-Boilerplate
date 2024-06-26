import express, { NextFunction, Request, Response } from "express";
import { interceptors } from "./middleware/interceptors";
import { getControllers } from "./controllers/controllers";
import cors from "cors";
import compression from "compression";

const app = express();
const v1Router = express.Router();
v1Router.use(compression());
v1Router.use(cors());
v1Router.use(express.json());
v1Router.use(express.urlencoded({ extended: true }));

for (let i = 0; i < interceptors.length; i++) {
  v1Router.use(interceptors[i]);
}
getControllers().forEach((controller) => {
  controller.initialize(v1Router);
});

v1Router.use(
  (_err: Error, _req: Request, res: Response, _next: NextFunction): void => {
    res.status(401).send("Unauthenticated!");
  }
);

app.use("/v1", v1Router);

export { app };
