import express from "express";

import { ClassesController } from "./controllers/ClassesController";
import { ConnectionsController } from "./controllers/ConnectionsController";

import { ApiError } from "./errors/ApiError";

const routes = express.Router();

const classesControllers = new ClassesController();
const connectionsController = new ConnectionsController();

routes.get("/classes", classesControllers.index);
routes.get("/classes/all", classesControllers.show);
routes.post("/classes", classesControllers.create);

routes.get("/connections", connectionsController.index);
routes.post("/connections", connectionsController.create);

routes.all("*", () => {
  throw new ApiError("Not Found Page", 404);
});

export { routes };
