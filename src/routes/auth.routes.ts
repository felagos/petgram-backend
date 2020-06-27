import express, { Router } from "express";
import { UsuarioMiddleware } from "@middlewares/usuario.middlware";
import UsuarioController from "@controllers/usuario.controller";

class AuthRoutes {

    private _router: Router = express.Router();

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this._router.post("/existsEmail", UsuarioMiddleware.validateEmiailExists, UsuarioController.existsEmail);
    }

    public get router(): Router {
        return this._router;
    }


}

export default new AuthRoutes();