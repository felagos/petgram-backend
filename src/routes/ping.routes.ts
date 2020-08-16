import express, { Router } from 'express';
import { PingController } from '@controllers';
import { inject, injectable } from 'inversify';

@injectable()
export class PingRoutes {

    private _router: Router;

    constructor(@inject(PingController) private controller: PingController) {
        this._router = express.Router();
        this.initRoutes();
    }

    private initRoutes() {
        this._router.get("/", this.controller.doPing);
    }

    public get router(): Router {
        return this._router;
    }

}
