import express, { Router } from 'express';
import { PetMiddleware } from '@middlewares';
import { inject, injectable } from 'inversify';
import { PetController } from '@controllers';

@injectable()
export class PetRouter {

    private _router: Router = express.Router();

    constructor(@inject(PetController) private controller: PetController,
        @inject(PetMiddleware) private middleware: PetMiddleware) {
        this.initRoutes();
    }

    private initRoutes() {
        this._router.get("/getByCategoriId/:categoriaId/:page?", this.middleware.validateGetCategoriaById, this.controller.getPeyByCategoryId);
        this._router.get("/getAllPets/:page?", this.controller.getAllPetsWithFav);
        this._router.post("/", this.controller.savePet);
    }

    public get router() {
        return this._router;
    }
}
