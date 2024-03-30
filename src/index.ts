import express, { Request, Response } from "express";
import { log } from "./utils/logger";
import { interceptors } from "./middleware/interceptors";
import { myIPv4 } from "./utils/ipv4";
import { getControllers } from "./controllers/controllers";
import swaggerUi from "swagger-ui-express";
import getOpenapiSpecification from "./utils/swaggerJsdpc";
import http from "http";
import { getCurrentInvoke } from "@codegenie/serverless-express";
import cors from "cors";
import compression from "compression";

const app = express();
const port = process.env.PORT || 8080;

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

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(getOpenapiSpecification())
);

/* app.get("/", (req: Request, res: Response) => {
  const currentInvoke = getCurrentInvoke();
  const { event = {} } = currentInvoke;
  const { requestContext = {} } = event;
  const { domainName = "localhost:3000" } = requestContext;
  const apiUrl = `https://${domainName}/api-docs`;
  return res.render("index", {
    apiUrl,
  });
}); */

app.use("/v1", v1Router);

// Create an HTTP service
/* const httpServer = http.createServer(app);

httpServer.listen(port, () => {
  log(`⚡️ Server is running at http://${myIPv4()}:${port}/api-docs`);
}); */
log(`⚡️ Server is running at http://${myIPv4()}:${port}/api-docs`);
export { app };
