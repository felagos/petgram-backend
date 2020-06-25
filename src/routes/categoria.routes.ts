import express, { Router } from 'express';
import CategoriaController from '@controllers/categoria.controller';

class CategoriaRouter {
    private _router: Router = express.Router();

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this._router.get("/", CategoriaController.getAll);
    }

    public get router() {
        return this._router;
    }
}

export default new CategoriaRouter();