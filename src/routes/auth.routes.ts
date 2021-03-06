import express, { Router } from "express";
import { AuthMiddleware } from "@middlewares";
import { inject, injectable } from "inversify";
import { UserController } from "@controllers";

@injectable()
export class AuthRoutes {

    private _router: Router = express.Router();

    constructor(@inject(UserController) private controller: UserController,
        @inject(AuthMiddleware) private middleware: AuthMiddleware) {
        this.initRoutes();
    }

    private initRoutes() {
        this._router.post("/existsEmail", this.middleware.validateEmiailExists, this.controller.existsEmail);
        this._router.post("/doLogin", this.controller.doLogin);
        this._router.post("/register", this.controller.registerUser);
        this._router.get("/token", this.middleware.validateRefreshToken, this.controller.generateToken);
    }

    public get router(): Router {
        return this._router;
    }

}
