import express, { Express } from "express";
import "express-async-errors";
import cors from "cors";
import { config } from "dotenv";

import { routes } from "./routes";

import { AsyncErrors } from "./errors";

config({ path: __dirname + "/.env" });

const app = express();

app.use(cors());
app.use(express.json() as Express);
app.use(routes);

const port = process.env.PORT || 3333;

app.listen(port);

app.use(AsyncErrors);
