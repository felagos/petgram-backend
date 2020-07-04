import express, { Router } from 'express';
import { CategoriaController } from '@controllers/categoria.controller';
import { inject, injectable } from 'inversify';

@injectable()
export class CategoriaRouter {
    
    private _router: Router = express.Router();

    constructor(@inject(CategoriaController) private controller: CategoriaController) {
        this.initRoutes();
    }

    private initRoutes() {
        this._router.get("/", this.controller.getAll);
    }

    public get router() {
        return this._router;
    }
}
