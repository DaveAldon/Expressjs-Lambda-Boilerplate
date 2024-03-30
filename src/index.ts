import express from "express";
import { interceptors } from "./middleware/interceptors";
import { getControllers } from "./controllers/controllers";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import compression from "compression";

const app = express();
const swaggerSpec = require("./swagger-spec.json");

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

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/v1", v1Router);

export { app };
