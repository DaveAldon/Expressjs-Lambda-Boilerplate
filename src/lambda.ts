import "source-map-support/register";
import serverlessExpress from "@codegenie/serverless-express";
import { app } from "./index.staging";

export const handler = serverlessExpress({ app });
