import express, { Router } from 'express';
import { AuthMiddleware } from '@middlewares';
import { inject, injectable } from 'inversify';
import { FavoriteController } from '@controllers';

@injectable()
export class FavoriteRouter {

    private _router: Router = express.Router();

    constructor(@inject(FavoriteController) private controller: FavoriteController,
        @inject(AuthMiddleware) private authMiddleware: AuthMiddleware) {
        this.initRoutes();
    }

    private initRoutes() {
        this._router.put("/", this.authMiddleware.validateToken, this.controller.addFavorite);
        this._router.delete("/:petId", this.authMiddleware.validateToken, this.controller.deleteFavorite);
        this._router.get("/:page?", this.controller.getAll);
    }

    public get router() {
        return this._router;
    }
}
