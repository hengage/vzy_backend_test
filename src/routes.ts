import { Router } from "express";
import { usersRoutes } from "./features/users";
import { paymentsRoutes } from "./features/payments";

class Routes {
    public router = Router();

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.use("/users", usersRoutes.router)
        this.router.use("/payments", paymentsRoutes.router)
    }
}

export const routes = new Routes();