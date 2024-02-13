import { Router } from "express";
import { usersRoutes } from "./features/users";

class Routes {
    public router = Router();

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.use("/users", usersRoutes.router)
    }
}

export const routes = new Routes();