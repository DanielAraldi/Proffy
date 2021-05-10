import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { routes } from "./routes";

config({ path: __dirname + "/.env" });

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 3333;

app.listen(port);
