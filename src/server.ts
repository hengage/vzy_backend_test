import dotenv from "dotenv";
dotenv.config();

import { app } from "./app";
import { NODE_ENV, PORT } from "./config/secrets.config";

app.listenToPort(PORT, NODE_ENV)