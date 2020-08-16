import express, { Router } from 'express';
import { CategoryController } from '@controllers';
import { inject, injectable } from 'inversify';
import { UserMiddleware } from '@middlewares';

@injectable()
export class CategoryRouter {
    
    private _router: Router = express.Router();

    constructor(@inject(CategoryController) private controller: CategoryController,
    @inject(UserMiddleware) private tokenMiddleware: UserMiddleware) {
        this.initRoutes();
    }

    private initRoutes() {
        this._router.get("/", this.controller.getAll);
    }

    public get router() {
        return this._router;
    }
}
