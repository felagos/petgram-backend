import express, { Router } from 'express';
import MascotaController from '@controllers/mascota.controller';
import { MascotaMiddleware } from '@middlewares/mascota.middleare';

class MascotaRouter {
    private _router: Router = express.Router();

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this._router.get("/getByCategoriId", MascotaMiddleware.validateGetCategoriaById, MascotaController.getMascotaByCategoriId);
    }

    public get router() {
        return this._router;
    }
}

export default new MascotaRouter();