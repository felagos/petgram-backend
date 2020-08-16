import express, { Router } from 'express';
import { PetMiddleware, AuthMiddleware } from '@middlewares';
import { inject, injectable } from 'inversify';
import { PetController } from '@controllers';

@injectable()
export class PetRouter {

    private _router: Router = express.Router();

    constructor(@inject(PetController) private controller: PetController,
        @inject(PetMiddleware) private middleware: PetMiddleware,
        @inject(AuthMiddleware) private authMiddleware: AuthMiddleware) {
        this.initRoutes();
    }

    private initRoutes() {
        this._router.get("/getByCategoriId/:categoriaId/:page?", this.middleware.validateGetCategoriaById, this.controller.getMascotaByCategoriId);
        this._router.get("/getAllPets/:page?", this.controller.getAllPets);
        this._router.put("/favorite", this.authMiddleware.validateToken, this.controller.addFavorite);
    }

    public get router() {
        return this._router;
    }
}
