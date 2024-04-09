import { RootController } from "./root-controller";
import { Controller } from "./index";
import { ExampleController } from "./example-controller/example-controller";

export const getControllers = (): Array<Controller> => [
  new RootController(),
  new ExampleController(),
];
