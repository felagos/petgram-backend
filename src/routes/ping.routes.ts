import express, { Router } from 'express';
import PingController from '@controllers/ping.controller';

class PingRoutes {
    private _router: Router;

    constructor() {
        this._router = express.Router();
        this.initRoutes();
    }

    private initRoutes() {
        this._router.get("/", PingController.doPing);
    }

    public get router(): Router {
        return this._router;
    }

}


export default new PingRoutes;