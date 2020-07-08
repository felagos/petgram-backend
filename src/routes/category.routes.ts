import express, { Router } from 'express';
import { CategoryController } from '@controllers/category.controller';
import { inject, injectable } from 'inversify';
import { UserMiddleware } from '@middlewares/user.middlware';

@injectable()
export class CategoryRouter {
    
    private _router: Router = express.Router();

    constructor(@inject(CategoryController) private controller: CategoryController,
    @inject(UserMiddleware) private tokenMiddleware: UserMiddleware) {
        this.initRoutes();
    }

    private initRoutes() {
        this._router.get("/", this.tokenMiddleware.validateToken, this.controller.getAll);
    }

    public get router() {
        return this._router;
    }
}
