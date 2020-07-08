import express, { Router } from 'express';
import { PetMiddleware } from '@middlewares/pet.middleare';
import { inject, injectable } from 'inversify';
import { PetController } from '@controllers/pet.controller';

@injectable()
export class PetRouter {

    private _router: Router = express.Router();

    constructor(@inject(PetController) private controller: PetController,
        @inject(PetMiddleware) private middleware: PetMiddleware) {
        this.initRoutes();
    }

    private initRoutes() {
        this._router.get("/getByCategoriId", this.middleware.validateGetCategoriaById, this.controller.getMascotaByCategoriId);
    }

    public get router() {
        return this._router;
    }
}
