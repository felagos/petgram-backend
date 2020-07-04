import express, { Router } from "express";
import { UsuarioMiddleware } from "@middlewares/usuario.middlware";
import { inject, injectable } from "inversify";
import { UsuarioController } from "@controllers/usuario.controller";

@injectable()
export class AuthRoutes {

    private _router: Router = express.Router();

    constructor(@inject(UsuarioController) private controller: UsuarioController) {
        this.initRoutes();
    }

    private initRoutes() {
        this._router.post("/existsEmail", UsuarioMiddleware.validateEmiailExists, this.controller.existsEmail);
        this._router.post("/doLogin", this.controller.doLogin);
        this._router.post("/register", this.controller.registerUser);
    }

    public get router(): Router {
        return this._router;
    }

}
