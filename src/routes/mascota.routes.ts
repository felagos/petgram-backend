import express, { Router } from 'express';
import MascotaController from '@controllers/mascota.controller';

class MascotaRouter {
    private _router: Router = express.Router();

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this._router.get("/getByCategoriId", MascotaController.getMascotaByCategoriId);
    }

    public get router() {
        return this._router;
    }
}

export default new MascotaRouter();