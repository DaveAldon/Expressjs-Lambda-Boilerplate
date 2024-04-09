import { Controller } from "../index";
import { Router } from "express";
import getExample from "./getExample";

/**
 * @swagger
 * tags:
 *   name: Example
 *   description: Example management
 */
export class ExampleController implements Controller {
  initialize(router: Router): void {
    router.get("/example/getExample", getExample);
  }
}
