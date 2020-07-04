import express, { Router } from 'express';
import { MascotaMiddleware } from '@middlewares/mascota.middleare';
import { inject, injectable } from 'inversify';
import { MascotaController } from '@controllers/mascota.controller';

@injectable()
export class MascotaRouter {
    
    private _router: Router = express.Router();

    constructor(@inject(MascotaController) private controller: MascotaController) {
        this.initRoutes();
    }

    private initRoutes() {
        this._router.get("/getByCategoriId", MascotaMiddleware.validateGetCategoriaById, this.controller.getMascotaByCategoriId);
    }

    public get router() {
        return this._router;
    }
}
