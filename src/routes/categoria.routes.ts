import express, { Router } from 'express';
import { CategoriaController } from '@controllers/categoria.controller';
import { inject, injectable } from 'inversify';
import { UsuarioMiddleware } from '@middlewares/usuario.middlware';

@injectable()
export class CategoriaRouter {
    
    private _router: Router = express.Router();

    constructor(@inject(CategoriaController) private controller: CategoriaController,
    @inject(UsuarioMiddleware) private tokenMiddleware: UsuarioMiddleware) {
        this.initRoutes();
    }

    private initRoutes() {
        this._router.get("/", this.tokenMiddleware.validateToken, this.controller.getAll);
    }

    public get router() {
        return this._router;
    }
}
