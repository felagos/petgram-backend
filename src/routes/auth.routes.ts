import express, { Router } from "express";

class AuthRoutes {

    private _router: Router = express.Router();

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
    }

    public get router(): Router {
        return this._router;
    }


}

export default new AuthRoutes();