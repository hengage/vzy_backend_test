import express, { Express } from "express";

import { Server } from "http";

import { DBConfig } from "./config";
import { DB_URL } from "./config/secrets.config";

class App {
  public app: Express;
  private dbConfig: DBConfig;
  constructor() {
    this.app = express();
    this.dbConfig = new DBConfig(`${DB_URL}`);

    this.connectDB();
  }

  private connectDB = async () => {
    try {
      await this.dbConfig.connect();
      console.log("conected to db");
    } catch (error) {
      console.error(error);
    }
  };

  public listenToPort(port: string | number, node_env: string): Server {
    return this.app.listen(`${port}`, () => {
      console.log(`Server started at port ${port}. Current ENV is ${node_env}`);
    });
  }
}

export const app = new App();
