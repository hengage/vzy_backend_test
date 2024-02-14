import express, { Express } from "express";

import { Server } from "http";

import { DBConfig } from "./config";
import { DB_URL } from "./config/secrets.config";
import { routes } from "./routes";
import { centralErrorHandler } from "./middleware";
import { webHookRoutes } from "./features/payments";

class App {
  public app: Express;
  private dbConfig: DBConfig;
  constructor() {
    this.app = express();
    this.dbConfig = new DBConfig(`${DB_URL}`);

    this.connectDB();
    this.stripeWebHookRoutes();
    this.initializeMiddleware();
    this.initializeRoutes();
    this.initializeCentralErrorMiddleware();
  }

  private initializeMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private connectDB = async () => {
    try {
      await this.dbConfig.connect();
      console.log("conected to db");
    } catch (error) {
      console.error(error);
    }
  };

  private stripeWebHookRoutes() {
    /*Separate routes for webhook as stripe needs to send the req body as 
    a raw string or buffer
    */
    this.app.use("/stripe/webhook", webHookRoutes.router);
  }

  private initializeRoutes() {
    this.app.use("/api", routes.router);
  }

  private initializeCentralErrorMiddleware() {
    this.app.use(
      centralErrorHandler.handle404Error,
      centralErrorHandler.handle404OrServerError
    );
  }

  public listenToPort(port: string | number, node_env: string): Server {
    return this.app.listen(`${port}`, () => {
      console.log(`Server started at port ${port}. Current ENV is ${node_env}`);
    });
  }
}

export const app = new App();
